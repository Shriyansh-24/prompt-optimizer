# Prompt Optimizer - Next.js with Google Gemini API

## Project Description
A full-stack Next.js application that optimizes prompts using the Google Gemini API.
The system instructs Gemini to act as a Claude Prompt Engineer, converting user input
into Claude-optimized XML prompts.

## Tech Stack
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 3.4
- **API**: Google Gemini (@google/generative-ai)
- **Package Manager**: npm

## Key Features
- Backend API route for prompt optimization at `/api/optimize`
- Frontend form with Tailwind CSS styling
- Google Gemini integration with custom system instructions
- Claude-optimized XML prompt output

## Setup Instructions
1. Create `.env.local` file with your Google Gemini API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```
2. Dependencies are already installed.

## Build & Run
- Development: `npm run dev` (running on http://localhost:3000)
- Build: `npm run build`
- Production: `npm start`

## Project Structure
- `/app` - Next.js App Router pages and layouts
- `/app/api/optimize/route.ts` - Backend API endpoint for prompt optimization
- `/app/page.tsx` - Frontend home page with form
- `/app/globals.css` - Global Tailwind CSS styles

## Environment Variables
- `GOOGLE_API_KEY`: Your Google Gemini API key (required)
