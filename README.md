This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Notes:

- This project uses [Clerk](https://clerk.com/docs/quickstarts/nextjs) for authentication/authorization and user managemnt. To get this working locally, you'll need to create an account [here](https://dashboard.clerk.com/sign-up).

- The directions below assume you have LTS version of node.js installed on your machine.

## Getting Started

1. In your terminal, run `git clone https://github.com/KylerJohnsonDev/next-todos.git` to clone this repo into your current directory

2. Run `cd next-todos`to navigate into the project directory

3. Run `npm install` to install the project dependencies

4. Run `touch .env.local` to create a local config file and copy the contents of .env.local.example into it for now

5. Go to your Clerk account and create a new project called "next-todos"

6. By default, Clerk will redirect you to a clerk account portal to login. For development, we want that to be local to our project. To do that, select the "Paths" link in the left side bar.

7. For the `<SignIn />` section, select the option that says, "Sign-in page on development host," and in the input below, type `/sign-in`.

8. For the `<SignUp />` section, select the option that says, "Sign-up page on development host," and in the input below, type `/sign-up`.

9. For the `<UserButton />` section, select the option that says, "Page on development host," and in the input below, type `/sign-in`.

10. Now, in the Clerk portal, select the "API Keys" link in the left side bar. At the top of the page, you'll see a code section containing two keys. Copy each of those keys and paste them into their corresponding environment variable in your `.env.local` file.

11. Run `npm run dev` to run the dev server and navigate in to [http://localhost:3000](http://localhost:3000) in your browser to access the site.
