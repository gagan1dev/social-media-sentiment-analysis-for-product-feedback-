# Contributing Guide

Thank you for your interest in contributing! This guide explains how to contribute to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/social-media-sentiment-analysis-for-product-feedback-.git
   ```
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   bun install
   ```

## Development Process

### 1. Make Your Changes

- Keep changes focused on a single feature or bug fix
- Follow the existing code style and conventions
- Write clear, descriptive code with comments

### 2. Code Standards

**TypeScript/React:**
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused

**Naming Conventions:**
- Components: PascalCase (e.g., `UserDashboard.tsx`)
- Functions: camelCase (e.g., `getUserData()`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- Types: PascalCase (e.g., `UserReview`)

**CSS/Styling:**
- Use Tailwind CSS utility classes
- Use shadcn/ui components when possible
- Avoid inline styles
- Keep component-specific styles in the same file

### 3. Testing Your Changes

```bash
# Run linter
bun run lint

# Check TypeScript
npx tsc --noEmit

# Start dev server and test manually
bun run dev
```

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Add: new feature description"
```

**Commit Message Guidelines:**
- Use present tense: "Add" not "Added"
- Use imperative mood: "Move cursor to..." not "Moves cursor to..."
- Limit first line to 50 characters
- Reference issues when applicable: "Fixes #123"

**Commit Types:**
- `Add:` New feature or component
- `Fix:` Bug fix
- `Refactor:` Code restructuring without behavior change
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting, etc.)
- `Test:` Adding or updating tests

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what changed and why
- Link to related issues
- Screenshots for UI changes

## Pull Request Guidelines

### PR Title
```
[Type] Short description
```

Examples:
- `[Add] CSV upload progress indicator`
- `[Fix] Sentiment chart rendering issue`
- `[Refactor] Extract API calls to service`

### PR Description Template
```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Code refactor
- [ ] Documentation

## Testing
How to test the changes:
1. Step 1
2. Step 2

## Screenshots (if applicable)
Include before/after screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No breaking changes
- [ ] Documentation updated
```

## Code Review Process

1. **Automated Checks**: GitHub Actions will run linting and tests
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

## Feature Contribution Ideas

### Easy (Good for beginners)
- [ ] Add new UI components
- [ ] Improve documentation
- [ ] Fix typos and formatting
- [ ] Add code comments

### Medium
- [ ] Add new features to dashboard
- [ ] Improve error handling
- [ ] Enhance CSV upload
- [ ] Add new chart types

### Hard
- [ ] Implement new analysis algorithms
- [ ] Add real-time features
- [ ] Optimize performance
- [ ] Add testing suite

## Reporting Issues

Found a bug? Please report it:

1. Check if issue already exists
2. Provide detailed steps to reproduce
3. Include expected and actual behavior
4. Add screenshots/logs if applicable
5. Use clear, descriptive title

### Bug Report Template
```markdown
## Description
Clear description of the bug.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: (Windows/Mac/Linux)
- Browser: (if applicable)
- Version: (commit hash or version number)

## Screenshots
Add any relevant screenshots.
```

## Project Structure for Contributors

- **`src/components/`** - Add new components here
- **`src/pages/`** - Add new pages/routes here
- **`src/auth/`** - Authentication logic
- **`src/types/`** - TypeScript type definitions
- **`src/lib/`** - Utility functions
- **`docs/`** - Documentation files

## Getting Help

- Check existing documentation in `docs/`
- Review similar components for patterns
- Ask questions in PR discussions
- Open a discussion for major changes

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help other contributors
- Report inappropriate behavior

## Recognition

Contributors who make significant contributions will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Recognized in README

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🙏
