
'use server';
/**
 * @fileOverview An AI agent that evaluates a user's answer to a quiz question,
 * providing a score (0-5), detailed explanations, and suggesting images for clarity. Considers an optional PDF for context.
 *
 * - evaluateAnswer - A function that handles the answer evaluation.
 * - EvaluateAnswerInput - The input type for the evaluateAnswer function.
 * - EvaluateAnswerOutput - The return type for the evaluateAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';
import { EducationLevels, SupportedLanguages, type EducationLevel, type SupportedLanguage } from './types';

const EvaluateAnswerInputSchema = z.object({
  question: z.string().describe('The quiz question that was asked.'),
  userAnswer: z.string().describe("The user's answer to the question."),
  topic: z.string().describe('The general topic of the quiz.'),
  educationLevel: EducationLevels.describe('The target education level for the quiz.'),
  language: SupportedLanguages.optional().describe('The language for the explanation. Defaults to English.'),
  pdfDataUri: z.string().optional().nullable().describe("A PDF document provided by the user, as a data URI. Expected format: 'data:application/pdf;base64,<encoded_data>'."),
});
export type EvaluateAnswerInput = z.infer<typeof EvaluateAnswerInputSchema>;

const EvaluateAnswerOutputSchema = z.object({
  awardedScore: z.number().min(0).max(5).describe('The score awarded to the user answer, on a scale of 0 to 5. 0: incorrect, 1-2: basic/partially correct, 3: mostly correct with minor issues, 4: very good, 5: excellent/fully comprehensive for the level.'),
  explanation: z.string().describe('A detailed, teacher-like explanation for the score, tailored to the education level and specified language. This should always be provided and aim to help the student understand the underlying concept thoroughly. Provide the explanation in PLAIN TEXT, without Markdown formatting for bold, italics, or tables. Use natural language for structure.'),
  imageSuggestion: z.string().optional().describe("A one or two-word search term for an image that could visually clarify the explanation, if applicable. Max two words. E.g., 'photosynthesis diagram' or 'volcano eruption'.")
});
export type EvaluateAnswerOutput = z.infer<typeof EvaluateAnswerOutputSchema>;

export async function evaluateAnswer(input: EvaluateAnswerInput): Promise<EvaluateAnswerOutput> {
  console.log("evaluateAnswer: Input received:", JSON.stringify(input, null, 2));
  return evaluateAnswerGenkitFlow(input);
}

const evaluateAnswerPrompt = ai.definePrompt({
  name: 'evaluateAnswerPrompt',
  input: {schema: EvaluateAnswerInputSchema},
  output: {schema: EvaluateAnswerOutputSchema},
  prompt: `You are an expert AI educator evaluating a student's answer to a quiz question. Your goal is to provide a fair score (0-5) and a comprehensive, teacher-like explanation to help the student understand the concept in their chosen language.
{{#if pdfDataUri}}
The student may have been referring to the following document for context. If the question or answer relates to it, ensure your evaluation, score, and explanation are consistent with this document: {{media url=pdfDataUri}}.
{{/if}}

Topic: {{{topic}}}
Education Level: {{{educationLevel}}}
Language for explanation: {{#if language}}{{language}}{{else}}English{{/if}}.

Question (this question was presented to the user in {{#if language}}{{language}}{{else}}English{{/if}}): {{{question}}}
User's Answer: {{{userAnswer}}}

Please provide your response in {{#if language}}{{language}}{{else}}English{{/if}}.
1.  \`awardedScore\`: An integer score from 0 to 5 based on the correctness and completeness of the user's answer relative to the question, topic, education level{{#if pdfDataUri}}, and provided document context{{/if}}.
    *   **Adapt your scoring strictness to the student's \`educationLevel\`.**
        *   For lower levels (e.g., Preschool, ElementarySchool, MiddleSchool), be more lenient. Focus on whether the core concept is grasped, even if the answer is simple or uses basic language. A partially correct or very simple but relevant answer might still earn a 2 or 3.
        *   For higher levels (e.g., College, Graduate, PhD), be stricter. Expect more depth, precision, use of specific terminology, and comprehensive understanding. Minor inaccuracies or lack of detail will result in a lower score compared to the same answer at a lower education level.
    *   General Scoring Guide (apply with education level in mind):
        *   0: Completely incorrect, irrelevant, or nonsensical.
        *   1: Shows minimal understanding, perhaps a relevant keyword but fundamentally flawed or very incomplete.
        *   2: Basic understanding, some correct points but significant inaccuracies or omissions for the level.
        *   3: Partially correct; understands the main concepts but has some inaccuracies or lacks depth/detail expected for the level.
        *   4: Mostly correct and well-understood; minor inaccuracies or could be slightly more detailed/clearer for the level.
        *   5: Fully correct, comprehensive for the education level, and clearly articulated.
2.  \`explanation\`: A detailed, teacher-like explanation.
    *   Regardless of the score, explain the reasoning behind it in {{#if language}}{{language}}{{else}}English{{/if}}.
    *   If the score is less than 5, clearly explain the misunderstanding, errors, or omissions, keeping the student's \`educationLevel\` in mind. Provide the correct information and explain the reasoning behind it in an age-appropriate manner.
    *   If the score is 5, reinforce why the answer is excellent, perhaps adding a bit more relevant detail or context suitable for the \`educationLevel\`.
    *   The explanation MUST be tailored to the student's specified education level and language ({{#if language}}{{language}}{{else}}English{{/if}}). It should help them understand the concept better. Use analogies or simpler terms if appropriate for the level and language.
    *   IMPORTANT: The explanation should be in **PLAIN TEXT** only. Do NOT use Markdown formatting like \`**bold**\`, \`*italics*\`, or table structures. Use natural language and paragraphs for clear separation of ideas.
3.  \`imageSuggestion\`: If a simple image, diagram, or pictorial could significantly help in understanding the explanation (e.g., for visual concepts like a cell structure, a historical map, a type of rock), provide a one or two-word search term for such an image. Examples: "cell mitosis", "roman aqueduct", "igneous rock". If no image is particularly helpful, omit this field. Maximum two words. These terms should be in English or a broadly understandable format for image search.

Ensure your output strictly adheres to the requested JSON format and that the explanation is thorough, pedagogical, plain text, and in the specified language ({{#if language}}{{language}}{{else}}English{{/if}}).
`,
});

const evaluateAnswerGenkitFlow = ai.defineFlow(
  {
    name: 'evaluateAnswerGenkitFlow',
    inputSchema: EvaluateAnswerInputSchema,
    outputSchema: EvaluateAnswerOutputSchema,
  },
  async (input: EvaluateAnswerInput) => {
    const {output} = await evaluateAnswerPrompt(input);
    if (!output || typeof output.awardedScore !== 'number' || !output.explanation) {
        console.error('AI output for evaluateAnswerFlow was invalid or incomplete:', output);
        // Determine the language for the error message
        const langForMessage = input.language || 'English';
        let errorMessageText = `Could not determine the score or provide a detailed explanation in ${langForMessage} at this time. Please ensure your answer is clear.`;
        if (langForMessage === 'Spanish') {
          errorMessageText = `No se pudo determinar la puntuación ni proporcionar una explicación detallada en ${langForMessage} en este momento. Por favor, asegúrese de que su respuesta sea clara.`;
        } else if (langForMessage === 'French') {
          errorMessageText = `Impossible de déterminer le score ou de fournir une explication détaillée en ${langForMessage} pour le moment. Veuillez vous assurer que votre réponse est claire.`;
        }
        // Add more languages as needed

        return { 
            awardedScore: 0, 
            explanation: errorMessageText,
            imageSuggestion: undefined
        };
    }
    return output;
  }
);


    