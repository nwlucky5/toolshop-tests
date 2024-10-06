# Tests for Toolshop application

Toolshop tests project covers UI and API tests for an online store demo application. Created using Playwright and Typescript technologies. Project implements commonly required good practices and patterns.

## Concepts Included

- Page Object Model (pages, BasePage, components, views)
- factories (test data generation using Faker.js library)
- fixtures
- CRUD operations automation
- data parametrization
- session authorization
- static code analysis with ESLint and Prettier
- CI/CD pipeline

## Toolshop Application

Repository: https://github.com/testsmith-io/practice-software-testing

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky`
- prepare local env file: `cp .env-template .env`
- copy application main URL as value of `BASE_URL` variable in `.env` file
- copy application admin email as value of `ADMIN_USER_EMAIL` variable and admin password as value of `ADMIN_USER_PASSWORD` in `.env` file
- copy application user email as value of `USER_EMAIL` variable and user password as value of `USER_PASSWORD` in `.env` file

## Use

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep "@api"
```

Run all tests without tags:

```
npx playwright test --grep-invert "@api"
```

For more usage cases look in `package.json` scripts section.
