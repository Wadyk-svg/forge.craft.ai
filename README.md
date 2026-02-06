# CraftForge AI

Production-ready generator for Minecraft Forge 1.20.1 mods. Users provide a text prompt, and the system generates Java code, Minecraft-style textures, builds with Gradle, and returns a ready-to-download `.jar`.

## Project structure

```
craftforge-ai/
  frontend/       React + Tailwind UI
  backend/        Node.js API
  generator/      Mod generation pipeline
  templates/      Reserved for future prompt templates
  forge_template/ Forge 1.20.1 Gradle template
```

## Requirements

- Node.js 18+
- Gradle (for building Forge mods)
- Java 17

## Quick start

### Backend

```
cd backend
npm install
npm run start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:4000` by default. Override with `VITE_API_URL` if needed.

## API

- `POST /api/generate` `{ prompt: string }`
- `GET /api/download/:jobId` -> `mod.jar`
- `GET /api/texture/:jobId` -> generated texture preview

## Notes

The backend runs `gradle build` in the generated project. Ensure Gradle and Java 17 are installed on the host.
