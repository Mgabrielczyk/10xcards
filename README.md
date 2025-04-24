# 10x-cards

A web application for quickly generating, reviewing, and managing text-based educational flashcards powered by AI and spaced repetition.

<!-- TOC -->
## Table of Contents
1. [Project Description](#project-description)
2. [Tech Stack](#tech-stack)
3. [Getting Started Locally](#getting-started-locally)
4. [Available Scripts](#available-scripts)
5. [Project Scope](#project-scope)
6. [Project Status](#project-status)
7. [License](#license)
<!-- TOC -->

## Project Description

**10x-cards** is a web application designed to streamline the flashcard creation process using AI assistance and spaced repetition techniques. Users can generate flashcards from text snippets, review and edit suggestions, and save accepted cards to their personal collection.

## Tech Stack

- **Frontend**: Astro 5, React 19, TypeScript 5, Tailwind CSS 4, Shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth)
- **AI Integration**: Openrouter.ai
- **CI/CD**: GitHub Actions
- **Hosting**: Docker on DigitalOcean

## Getting Started Locally

### Prerequisites

- **Node.js** **v22.14.0** (see `.nvmrc`)
- **npm** (comes with Node.js)
- A Supabase project with necessary credentials
- An Openrouter.ai API key

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/10x-cards.git
   cd 10x-cards
   ```

2. Use the specified Node version:

   ```bash
   nvm install
   nvm use
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following variables:

   ```dotenv
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anonymous_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Start the Astro development server
- **`npm run build`**: Build the application for production
- **`npm run preview`**: Preview the production build locally
- **`npm run astro`**: Run Astro CLI
- **`npm run lint`**: Run ESLint
- **`npm run lint:fix`**: Run ESLint with auto-fix
- **`npm run format`**: Format code with Prettier

## Project Scope

### In-Scope Features (MVP)

1. **AI Flashcard Generation**: Generate a single flashcard (front ≤200 characters, back ≤500 characters).
2. **Review Interface**: Accept, edit, reject, or regenerate AI suggestions.
3. **Persistence**: Save accepted flashcards to the database.
4. **Manual Creation**: Create new flashcards via a modal form.
5. **Flashcard List**: View, edit, and delete saved flashcards.
6. **Authentication**: User registration, login, and logout.
7. **Spaced Repetition**: Integrate with an open-source spaced repetition library.
8. **Error Handling**: Friendly messages and retry options on AI failures.

### Out-of-Scope for MVP

- Advanced spaced repetition algorithms (e.g., SuperMemo, Anki)
- Importing flashcards from PDF, DOCX, or other formats
- Sharing flashcard sets between users
- Integrations with external educational platforms
- Mobile applications
- Advanced analytics or audit logs

## Project Status

**Status**: 🟡 In Development (Alpha/MVP)

This project is under active development. Core functionality for AI-based flashcard generation and basic spaced repetition integration is in progress.

## License

This project is licensed under the [MIT License](LICENSE.md).
