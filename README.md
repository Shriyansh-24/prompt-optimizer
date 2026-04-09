# Prompt Optimizer

A full-stack Next.js application that optimizes prompts for Claude using the Google Gemini API.

## Features

- **Backend API** (`/api/optimize`): Powered by Google Gemini 2.5 Flash with Claude Prompt Engineer system instructions
- **Frontend Form**: Clean, modern UI built with Tailwind CSS
- **Instant Optimization**: Transform prompts into Claude-optimized XML format
- **Copy to Clipboard**: Easily copy optimized prompts for use
- **Error Handling**: Real-time validation and error messages

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 3.4
- **API**: Google Gemini 2.5 Flash (@google/generative-ai)
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key (free tier available at [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository or navigate to the project directory
2. Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

3. Add your Google API key to `.env.local`:

```
GOOGLE_API_KEY=your_api_key_here
```

4. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The server may use an alternate port (3001, 3002, 3003, etc.) if 3000 is in use.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## How It Works

1. **Input**: User pastes a prompt into the form
2. **Processing**: The prompt is sent to the backend API route (`/api/optimize`)
3. **Gemini Processing**: Google Gemini 2.5 Flash, instructed as a Claude Prompt Engineer, transforms the prompt into an optimized XML format
4. **Output**: The optimized prompt is displayed and can be copied to clipboard

## System Instructions

The API uses a custom system instruction that tells Gemini to:

- Structure prompts using XML tags for clarity
- Include sections: objective, context, instructions, constraints, output_format
- Make prompts specific, detailed, and actionable
- Add examples when helpful
- Consider edge cases and ambiguities
- Optimize for Claude's strengths in reasoning, analysis, and creative writing

## API Endpoint

### POST `/api/optimize`

**Request:**

```json
{
  "userInput": "Your prompt here"
}
```

**Response:**

```json
{
  "optimizedPrompt": "Optimized XML-structured prompt..."
}
```

**Error Response (400):**

```json
{
  "error": "userInput is required and must be a string"
}
```

**Error Response (500):**

```json
{
  "error": "GOOGLE_API_KEY environment variable is not set"
}
```

## Project Structure

```
app/
├── api/
│   └── optimize/
│       └── route.ts          # API endpoint for prompt optimization
├── layout.tsx                 # Root layout
├── page.tsx                  # Home page (frontend)
└── globals.css               # Global Tailwind CSS styles

.github/
└── copilot-instructions.md   # Copilot customization

Configuration Files:
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── .eslintrc.json            # ESLint configuration
└── .env.local                # Environment variables (not committed)
```

## Environment Variables

- `GOOGLE_API_KEY`: Your Google Gemini API key (required)

## Available Models

The application is configured to use `gemini-2.5-flash`, which is the latest stable Gemini model. For alternatives, you can change the model name in `app/api/optimize/route.ts`:

```typescript
const model = client.getGenerativeModel({ 
  model: "gemini-2.5-flash"  // Change this to use a different model
});
```

Available models:
- `gemini-2.5-flash` (latest, recommended)
- `gemini-2.0-flash` (previous stable)
- Other models available via Google AI API

## License

MIT

