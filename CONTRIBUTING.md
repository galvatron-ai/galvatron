# Contributing to Galvatron

We're excited that you're interested in contributing to Galvatron! This document outlines the process for contributing to this project.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```
   git clone https://github.com/galvatron-ai/galvatron.git
   cd galvatron
   ```
3. Install dependencies:
   ```
   pnpm install
   ```
4. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. Make your changes in the relevant files.
2. Run the development server to test your changes:
   ```
   pnpm dev
   ```
3. Ensure your code follows the project's coding standards:
   ```
   pnpm lint
   pnpm format
   ```
4. Write or update tests as necessary.
5. Run the tests to make sure everything passes:
   ```
   pnpm test
   ```

## Submitting Changes

1. Commit your changes with a clear and descriptive commit message:
   ```
   git commit -am "Add a brief description of your changes"
   ```
2. Push your changes to your fork:
   ```
   git push origin feature/your-feature-name
   ```
3. Create a pull request from your fork to the main Galvatron repository.

## Pull Request Guidelines

- Provide a clear title and description of your changes.
- Include any relevant issue numbers in the PR description.
- Ensure all tests pass and there are no linting errors.
- Update documentation if your changes require it.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Questions?

If you have any questions or need further clarification on the contribution process, please open an issue or reach out to the maintainers.

Thank you for contributing to Galvatron!