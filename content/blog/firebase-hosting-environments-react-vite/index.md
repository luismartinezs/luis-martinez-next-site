+++
title = "How to use different firebase hosting environments with React and Vite"
description = "How to use different firebase hosting environments with React and Vite"
date = 2022-08-04

[extra]
seo_title = "How to use different firebase hosting environments"
featured_image = "cover-saito200-castilla-la-mancha-beautiful-composition-wide-shot.webp"
show_featured_image = true
+++

Imagine you're building a **React** app with **Vite** and powered by **Firebase**, and you use **Firebase hosting**.

For local development you can emulate Firebase, but you can also have a LIVE Firebase project for development.

For this, you need to create a new Firebase project, you need to build the app locally using the correct environment variables, and lastly you deploy it.

This is how you make it work:

1. Create a new Firebase project for development from the [Firebase Console](https://console.firebase.google.com/). You might call it *my-app-development*, *my-app-staging*, or whatever you want.
2. Inside the Firebase project, create a new web app and take note of the config values.
3. In the local project in your computer, add the new Firebase project, running this in the root of the project: `firebase use --add`, select the new project you just created and give it any alias you want (`dev` or whatever)
4. Create a file named `.env.[mode].local`, where `[mode]` is the name of the new environment. For example: `.env.development.local`, you can read more about [how Vite handles environment variables](https://vitejs.dev/guide/env-and-mode.html#env-files)
5. Add the config values from the Firebase app (and any other env variables you need) to the new env file
6. Add a build script to your `package.json` file looking like this: `"build-dev: "tsc && vite build --mode development"`. If your environment is named different than development (e.g. staging), then use it instead.
7. Run the build script you just created: `pnpm build-dev`
8. Deploy to Firebase: `firebase deploy -P dev`

   - You could also have a deploy script: `"fb:deploy-dev": "pnpm build-dev && firebase deploy -P dev"`

> [!NOTE]
> If you use the `firebase deploy` command, remember to `build` your project locally first! I spent 2 hours once trying to understand with my LIVE project wouldn't update after a deploy.

Congratulations, you did it!
