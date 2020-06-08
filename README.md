# Teachers and students

## Tech Stack:

- Node.js
- TypeScript
- Express
- MySQL

## Instructions:

1. Clone this repository
2. Run `npm install`
3. Configure MySQL database credentials in **`config.cnf`** and **`database.ts`**
4. Run `npm run setup-db`
5. Run `npm run dev` to start development server
6. App will be served on [localhost:3000/api](http://localhost:3000/api)

## User Stories:

1. As a teacher, I want to register one or more students to a specified teacher. (DONE)
2. As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers). (DONE)
3. As a teacher, I want to suspend a specified student. (DONE)
4. As a teacher, I want to retrieve a list of students who can receive a given notification. (DONE)

## Pending tasks:

1. Add unit tests
2. Add local **`.eslintrc`** file
3. Deploy API
