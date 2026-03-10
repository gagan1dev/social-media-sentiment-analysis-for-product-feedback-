# Setup Guide

Complete guide to setting up and running the Social Media Sentiment Analysis project.

## Prerequisites

- **Bun** 1.0+ or **Node.js** 16+ 
- **Git** for version control
- A code editor (VS Code recommended)
- Terminal/Command Prompt access

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/gagan1dev/social-media-sentiment-analysis-for-product-feedback-.git
cd vibe-analyzer-20-main
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

### 3. Start Development Server

```bash
bun run dev
```

The application will start at `http://localhost:5173`

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory if needed:

```env
VITE_API_URL=http://localhost:3000
```

### Build Configuration

- **Vite Config**: `vite.config.ts` - Handles build settings
- **TypeScript Config**: `tsconfig.json` - Type checking configuration
- **Tailwind Config**: `tailwind.config.ts` - Styling customization
- **ESLint Config**: `eslint.config.js` - Code quality rules

## Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run lint` | Run ESLint code quality checks |
| `bun run preview` | Preview production build locally |

## Development Workflow

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**: Edit files in `src/`

3. **Test Locally**: 
   ```bash
   bun run dev
   ```

4. **Check Code Quality**:
   ```bash
   bun run lint
   ```

5. **Commit & Push**:
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
bun run dev -- --port 3000
```

### Module Not Found
Clear node_modules and reinstall:
```bash
rm -rf node_modules bun.lockb
bun install
```

### Build Errors
Check TypeScript errors:
```bash
npx tsc --noEmit
```

## Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand project structure
- Check [FEATURES.md](FEATURES.md) for feature documentation
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
