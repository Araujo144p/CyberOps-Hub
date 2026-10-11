# CyberOps Hub — Agent Guidelines

## 1. Project Overview

CyberOps Hub is a security incident management platform.

The system allows authorized users to register, investigate, track, and close security incidents while managing affected assets, evidence metadata, and audit records.

## 2. Architecture

- Frontend: React + TypeScript.
- Backend: Node.js + NestJS + TypeScript.
- Database: MongoDB.
- Local environment: Docker Compose.
- API style: REST.
- Frontend and backend must remain separate applications inside `apps/`.

## 3. Security Rules

- Never commit secrets, passwords, tokens, or private keys.
- Never disable authentication or authorization to make a feature work.
- Validate all external input.
- Apply role-based access control where required.
- Follow the principle of least privilege.
- Do not expose sensitive information in API responses or logs.
- Treat incident evidence and user-provided content as untrusted input.
- Destructive or critical actions must be explicitly authorized.
- AI agents must not perform critical actions autonomously.

## 4. Development Rules

- Use TypeScript for frontend and backend code.
- Keep modules focused on a single responsibility.
- Prefer clear, maintainable code over unnecessary complexity.
- Do not introduce dependencies without a clear reason.
- Keep configuration separate from application logic.
- Never modify generated files manually unless the task explicitly requires it.

## 5. Testing and Quality

- New features must include appropriate tests.
- Run relevant tests before proposing changes.
- Run the build and type checks before merging changes.
- Never change tests merely to make failing code appear correct.
- Fix the underlying problem when a test fails.

## 6. Git and Pull Requests

- Use descriptive branch names.
- Make small, focused commits.
- Use clear commit messages.
- Do not commit directly to `main` for feature development.
- Pull Requests must describe the changes, tests performed, and security considerations.

## 7. AI-Assisted Development

- Review generated code before accepting it.
- Never provide real credentials or secrets to AI tools.
- Do not trust generated security recommendations without verification.
- AI-generated changes must follow the same testing and review requirements as other changes.

## 8. Implementation Workflow

For each significant feature:

1. Define the requirement.
2. Write the specification and acceptance criteria.
3. Break the work into tasks.
4. Implement the feature.
5. Add or update tests.
6. Run quality checks.
7. Review security implications.
8. Document the changes and submit a Pull Request.

## 9. Scope Management

- Implement the MVP before advanced AI, agents, MCP, or AWS integrations.
- Do not introduce unnecessary infrastructure before the local application works.
- Update documentation as the architecture evolves.