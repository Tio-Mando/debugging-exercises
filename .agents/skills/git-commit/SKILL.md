---
name: git-commit
description: Convierte los cambios actuales en un commit detallado siguiendo una estructura específica con emojis y descripciones en inglés.
---

# Git Commit Skill

This skill ensures that every commit follows a standardized, detailed format in English, using specific labels and emojis.

## Commit Structure

Every commit message MUST follow this exact structure:

```text
<type> <emoji> <short_summary>
description: <detailed_explanation>
```

### Components

1.  **Type**: The category of change (following Conventional Commits).
    - `feat`: New features or exercises.
    - `fix`: Bug fixes in exercises or documentation.
    - `docs`: Documentation only changes.
    - `refactor`: Code changes that neither fix a bug nor add a feature.
    - `test`: Adding missing tests or correcting existing tests.
    - `chore`: Maintenance tasks.

2.  **Emoji**: Use specific emojis based on the type.
    - `:sparkles:` (for `feat`)
    - `:bug:` (for `fix`)
    - `:books:` (for `docs`)
    - `:recycle:` (for `refactor`)
    - `:white_check_mark:` (for `test`)
    - `:wrench:` (for `chore`)

3.  **Short Summary**: A concise title of the change in English.

4.  **Description Label**: Use the word `description:` followed by a detailed paragraph.

## Examples

### Adding a new exercise

```text
feat :sparkles: add inventory manager debugging exercise
description: implemented a new intermediate-level exercise focused on runtime errors. the exercise includes four functions with Three intentional bugs related to null references and input validation.
```

### Fixing a bug

```text
fix :bug: correct typo in calculator-error readme
description: fixed a spelling error in the user story section of the first exercise documentation to improve clarity for Spanish speakers.
```

## Workflow

1.  **Stage Changes**: `git add .` (or specific files).
2.  **Analyze Changes**: Understand what was done in English.
3.  **Draft Message**: Format the message according to the rules above.
4.  **Commit**: `git commit -m "..."`.

## Rules

- **Language**: The entire commit message (summary and description) MUST be in English.
- **Labels**: Always include the `description:` prefix for the body.
- **No Spanish**: Even though the project documentation is in Spanish, the git history remains in English as requested.
