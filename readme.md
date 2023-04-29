# Favorites API

This api provide a service of storage of favorites items in a postgres database. We develop an athentication and authorization service to protect the favorites lists of the differents users that could use our application.

## Features

- A login to authenticate a user with an email and password both validated with internal process to ensure the feature.
- An Authorization process to keep identify the user through all the usage of the app using JWT as a source and mechanism of this objective.
- A registration process to allow usage of the app with a previous identification to create a single space in our database to storage the favorites items of the user.

## Technologies

## Tech

- [Node.js](https://nodejs.org/en/) - Evented I/O for the backend.
- [Express](https://expressjs.com/es/) - Framework to develop the backend.
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Postgres](https://www.postgresql.org/) - Is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [Prisma](https://www.prisma.io/) - Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.
- [JWT](https://jwt.io/) - Is a compact URL-safe means of representing claims to be transferred between two parties.
- [ARGON](https://argon2.online/) - Hash Generator & Verifier.

## Installation

It requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies to start the server.

```sh
pnpm i
pnpm run dev
```

## Testing

To test the application just run :

```sh
pnpm run test
```

We provide another scripts to interact with prisma studio in a development environment. To use it run:

```sh
pnpm run prisma:migrate
```

with the above script you will migrate all the database runs to create what is needed to start your development process.

Then, you will need to run a seeder to have the initial user if you want. However you can create a user throught the register process

```sh
pnpm run prisma:seeders
```

To see your data added in a UI you can use the prisma studio like this:

```sh
pnpm run prisma:studio
```

## DOCS

If you desired you can use the JSON file at doc folder to import it into your postman environment. This JSON file will provide you with all the routes and body formats to test your development process

PLEASE REMEMBER CREATE YOUR OWN .ENV FILE AT THE ROOT OF THE PROJECT OTHERWISE THE PROJECT WILL NOT WORK. WE PROVIDE YOU WITH A .ENV.EXAMPLE WHO CONTAINS THE NECESSARY KEYS

We're building the final test at diferents services of the application so please be kind with us, we're working constantly.
