# Expo Migration Blueprint

This document outlines the project files in the current Next.js application and provides guidance on how their functionality might be replicated or replaced when migrating to an Expo environment.

## File Breakdown and Migration Notes

### Top Level Files

*   **README.md**:
    *   **Current Functionality:** Provides a general overview and instructions for the project.
    *   **Expo Migration:** Keep the README.md file, updating it to reflect the Expo project setup, scripts, and any differences in how to run and build the application.

*   **components.json**:
    *   **Current Functionality:** Likely a configuration file for UI component libraries or frameworks (potentially related to Tailwind CSS or shadcn/ui).
    *   **Expo Migration:** This file is specific to the web-based UI library. You will need to replace or rebuild UI components using React Native components and styling. This file will not be directly used in an Expo project.

*   **next.config.ts**:
    *   **Current Functionality:** Configuration file for Next.js, handling aspects like routing, build settings, and plugins.
    *   **Expo Migration:** This file is specific to Next.js. Expo uses its own configuration file (`app.json` or `app.config.js`) for project settings, splash screen, icon, and linking. You will need to configure these aspects in the Expo config file.

*   **package-lock.json**:
    *   **Current Functionality:** Locks the versions of project dependencies.
    *   **Expo Migration:** Keep this file or generate a new one using `npm install` or `yarn install` in your new Expo project to manage dependencies.

*   **package.json**:
    *   **Current Functionality:** Lists project dependencies, scripts, and metadata.
    *   **Expo Migration:** This file is essential for managing dependencies. You will create a new `package.json` for your Expo project, adding the necessary Expo and React Native dependencies. You will also need to add scripts for running the Expo app (e.g., `expo start`). Dependencies from the Next.js project that have React Native equivalents or are pure JavaScript can be carried over.

*   **postcss.config.mjs**:
    *   **Current Functionality:** Configuration for PostCSS, often used with Tailwind CSS for processing CSS.
    *   **Expo Migration:** This is specific to web styling with PostCSS and Tailwind CSS. Expo uses React Native's styling system or libraries like `styled-components` or utility-first libraries built for React Native. This file will not be used.

*   **tailwind.config.ts**:
    *   **Current Functionality:** Configuration for Tailwind CSS, defining design tokens and utility classes.
    *   **Expo Migration:** Tailwind CSS is a web-specific CSS framework. You will need to replace Tailwind CSS styling with React Native styling methods or a React Native-compatible styling library. This file will not be used.

*   **tsconfig.json**:
    *   **Current Functionality:** Configuration for TypeScript.
    *   **Expo Migration:** Keep this file, adapting it as needed for the Expo project's file structure and dependencies. Expo projects typically use TypeScript, so this file is relevant.

### Configuration and Development Files

*   **.idx/dev.nix**:
    *   **Current Functionality:** Likely a configuration file related to a development environment or build system (possibly Nix).
    *   **Expo Migration:** This file is specific to your current development setup. You will likely not need this file for a standard Expo project. Expo provides its own development environment setup.

*   **.vscode/settings.json**:
    *   **Current Functionality:** User and workspace settings for Visual Studio Code.
    *   **Expo Migration:** This file is specific to your IDE setup. You can carry over relevant settings (like TypeScript configuration) but may need to add or modify settings related to Expo development and debugging.

### Documentation

*   **docs/blueprint.md**:
    *   **Current Functionality:** A documentation file, potentially a blueprint for the application's design or architecture.
    *   **Expo Migration:** Keep this file as documentation. You may want to update it to reflect changes made during the Expo migration.

### Source Files (src)

#### AI and Genkit

*   **src/ai/dev.ts**:
    *   **Current Functionality:** Development-specific code for the AI functionalities, likely related to Genkit setup or testing.
    *   **Expo Migration:** The AI backend logic (using Genkit) should ideally remain separate from the Expo mobile app. The Expo app will interact with the AI functionality through an API. This file will likely remain part of the backend setup and not be directly included in the Expo project.

*   **src/ai/genkit.ts**:
    *   **Current Functionality:** Core Genkit configuration and setup for the AI functionalities.
    *   **Expo Migration:** Similar to `src/ai/dev.ts`, this file is part of the AI backend. The Expo app will interact with the AI via an API, so this file will not be directly in the Expo project.

*   **src/ai/flows/adaptive-questioning.ts**:
    *   **Current Functionality:** Implements the AI flow for adaptive questioning using Genkit.
    *   **Expo Migration:** This is part of the AI backend logic. The Expo app will call an API endpoint that triggers this flow. The code for this flow will not be in the Expo project.

*   **src/ai/flows/ai-powered-advice.ts**:
    *   **Current Functionality:** Implements the AI flow for providing AI-powered advice.
    *   **Expo Migration:** Similar to other AI flows, this is backend logic. The Expo app will interact with this through an API.

*   **src/ai/flows/evaluate-answer-flow.ts**:
    *   **Current Functionality:** Implements the AI flow for evaluating user answers.
    *   **Expo Migration:** Backend logic, accessed by the Expo app via an API.

*   **src/ai/flows/get-topic-introduction-flow.ts**:
    *   **Current Functionality:** Implements the AI flow for generating topic introductions.
    *   **Expo Migration:** Backend logic, accessed by the Expo app via an API.

*   **src/ai/flows/knowledge-quiz-flow.ts**:
    *   **Current Functionality:** Implements the AI flow for generating knowledge quiz questions.
    *   **Expo Migration:** Backend logic, accessed by the Expo app via an API.

*   **src/ai/flows/quiz-summary-flow.ts**:
    *   **Current Functionality:** Implements the AI flow for summarizing quiz results.
    *   **Expo Migration:** Backend logic, accessed by the Expo app via an API.

*   **src/ai/flows/types.ts**:
    *   **Current Functionality:** Defines TypeScript types used within the AI flows.
    *   **Expo Migration:** These types might be useful for ensuring consistency between the Expo app (when making API calls) and the backend. You could potentially copy relevant type definitions to the Expo project if needed for API interaction.

#### App Structure (Next.js specific)

*   **src/app/favicon.ico**:
    *   **Current Functionality:** The favicon for the web application.
    *   **Expo Migration:** Expo uses icons specific to mobile platforms. You will need to provide app icons in various sizes and formats as required by Expo and the mobile platforms.

*   **src/app/globals.css**:
    *   **Current Functionality:** Global CSS styles for the Next.js application.
    *   **Expo Migration:** This is web-specific CSS. React Native uses a different styling system. You will need to recreate the styles using React Native's `StyleSheet` or a styling library.

*   **src/app/layout.tsx**:
    *   **Current Functionality:** The root layout component for the Next.js application, defining the basic HTML structure.
    *   **Expo Migration:** This is a Next.js-specific concept. In Expo, you'll define your root component and navigation structure using libraries like React Navigation. There is no direct equivalent.

*   **src/app/page.tsx**:
    *   **Current Functionality:** The main page component for the Next.js application's root route.
    *   **Expo Migration:** This component represents the content of your landing page. You will need to create a corresponding React Native component to render this content within your Expo app's navigation structure.

#### Hooks

*   **src/hooks/use-mobile.tsx**:
    *   **Current Functionality:** A custom hook to detect if the application is being viewed on a mobile device (likely for responsive design).
    *   **Expo Migration:** In a native mobile app, you are always on a "mobile" device. This hook might be adapted or removed depending on your responsive design strategy in React Native. You might use dimensions or other React Native APIs to handle layout variations based on screen size or orientation.

*   **src/hooks/use-toast.ts**:
    *   **Current Functionality:** A custom hook for displaying toast notifications (likely using a UI library like shadcn/ui).
    *   **Expo Migration:** You will need to find a React Native library for displaying toast notifications or implement your own. The hook's logic might be adaptable, but the underlying UI implementation will need to change.

#### Utility

*   **src/lib/utils.ts**:
    *   **Current Functionality:** Utility functions used throughout the application.
    *   **Expo Migration:** Pure JavaScript utility functions can likely be reused directly in the Expo project.

#### Components

*   **src/components/counselling/CounsellingSession.tsx**:
    *   **Current Functionality:** Component for the counselling session interface.
    *   **Expo Migration:** You will need to rewrite this component using React Native components (View, Text, Button, TextInput, etc.) and styling. The logic for managing the session and interacting with the AI will need to be adapted to work with API calls from the Expo app.

*   **src/components/counselling/ProgressTracker.tsx**:
    *   **Current Functionality:** Component to track progress in the counselling session.
    *   **Expo Migration:** Rewrite using React Native components and styling. The logic for tracking progress can likely be reused.

*   **src/components/landing/LandingPage.tsx**:
    *   **Current Functionality:** The landing page component.
    *   **Expo Migration:** Rewrite using React Native components and styling to create the mobile landing screen.

*   **src/components/quiz/KnowledgeQuizSession.tsx**:
    *   **Current Functionality:** Component for the knowledge quiz session interface.
    *   **Expo Migration:** Rewrite using React Native components and styling. The logic for the quiz flow and interaction with the AI (for generating questions and evaluating answers) will need to be adapted for API calls.

*   **src/components/quiz/ProgressTracker.tsx**:
    *   **Current Functionality:** Component to track progress in the knowledge quiz.
    *   **Expo Migration:** Rewrite using React Native components and styling. The logic for tracking progress can likely be reused.

#### UI Components (Likely from a UI Library like shadcn/ui)

All files within `src/components/ui/` likely represent UI components built using a web-focused library. These will need to be replaced with their equivalents in React Native. You can either:

1.  **Find a React Native UI library:** Use a library like NativeBase, React Native Paper, or another similar library that provides pre-built components (accordion, alert-dialog, button, calendar, etc.).
2.  **Build custom React Native components:** Implement the functionality of these UI components using core React Native components and styling.

For each file in `src/components/ui/`, you will need to find or build a corresponding React Native component:

*   **src/components/ui/accordion.tsx**: Replace with a React Native accordion component (from a library or custom built).
*   **src/components/ui/alert-dialog.tsx**: Replace with a React Native alert dialog component.
*   **src/components/ui/alert.tsx**: Replace with a React Native alert or notification component.
*   **src/components/ui/avatar.tsx**: Replace with a React Native avatar component.
*   **src/components/ui/badge.tsx**: Replace with a React Native badge component.
*   **src/components/ui/button.tsx**: Replace with a React Native `Button` or `TouchableOpacity`/`Pressable` component with appropriate styling.
*   **src/components/ui/calendar.tsx**: Replace with a React Native calendar component.
*   **src/components/ui/card.tsx**: Replace with a React Native `View` component with styling to achieve a card-like appearance.
*   **src/components/ui/chart.tsx**: Replace with a React Native charting library.
*   **src/components/ui/checkbox.tsx**: Replace with a React Native checkbox component.
*   **src/components/ui/dialog.tsx**: Replace with a React Native modal or dialog component.
*   **src/components/ui/dropdown-menu.tsx**: Replace with a React Native dropdown or select component.
*   **src/components/ui/form.tsx**: Adapt form handling using libraries like `react-hook-form` which supports React Native, but the input components will be React Native ones.
*   **src/components/ui/input.tsx**: Replace with a React Native `TextInput` component with appropriate styling.
*   **src/components/ui/label.tsx**: Replace with a React Native `Text` component used as a label.
*   **src/components/ui/menubar.tsx**: Replace with a React Native navigation bar or header component.
*   **src/components/ui/popover.tsx**: Replace with a React Native popover component.
*   **src/components/ui/progress.tsx**: Replace with a React Native progress bar component.
*   **src/components/ui/radio-group.tsx**: Replace with a React Native radio button group component.
*   **src/components/ui/scroll-area.tsx**: Replace with a React Native `ScrollView` component.
*   **src/components/ui/select.tsx**: Replace with a React Native select or picker component.
*   **src/components/ui/separator.tsx**: Replace with a React Native `View` component with styling to create a separator line.
*   **src/components/ui/sheet.tsx**: Replace with a React Native bottom sheet or side drawer component.
*   **src/components/ui/sidebar.tsx**: Replace with a React Native drawer navigator or a custom sidebar component.
*   **src/components/ui/skeleton.tsx**: Replace with a React Native skeleton loading component library or custom implementation.
*   **src/components/ui/slider.tsx**: Replace with a React Native `Slider` component.
*   **src/components/ui/switch.tsx**: Replace with a React Native `Switch` component.
*   **src/components/ui/table.tsx**: Replace with a React Native library for rendering tables or implement using `View` and `Text` components.
*   **src/components/ui/tabs.tsx**: Replace with a React Native tab navigation component.
*   **src/components/ui/textarea.tsx**: Replace with a multiline React Native `TextInput`.
*   **src/components/ui/toast.tsx**: Replace with a React Native toast notification implementation.
*   **src/components/ui/toaster.tsx**: The container for toasts, will be replaced by the React Native toast library's setup.
*   **src/components/ui/tooltip.tsx**: Replace with a React Native tooltip component.

This blueprint provides a starting point for understanding the scope of the migration. The actual implementation will require careful consideration of React Native best practices and the specific requirements of your application.