# Galvatron

This is an official starter Turborepo for the Galvatron project.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@galvatron/docs`: a [Next.js](https://nextjs.org/) app
- `@galvatron/web`: another [Next.js](https://nextjs.org/) app
- `@galvatron/ui`: a stub React component library shared by both `web` and `docs` applications
- `@galvatron/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@galvatron/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Install

To install all dependencies, run the following command:

```sh
cd galvatron
pnpm install
```

### Build

To build all apps and packages, run the following command:

```sh
cd galvatron
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd galvatron
pnpm dev
```

### Contributing

We welcome contributions to Galvatron! Please see our [Contributing Guide](CONTRIBUTING.md) for more information on how to get started.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```sh
cd galvatron
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)