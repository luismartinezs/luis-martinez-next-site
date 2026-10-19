+++
title = "Fix: Cannot find module 'MyComponent.mdx' or its corresponding type declarations in React"
description = "Fix: Cannot find module 'MyComponent.mdx' or its corresponding type declarations in React"
date = 2022-08-01

[extra]
card_title = "Fix typescript error for mdx files in React"
featured_image = "cover-saito200-castilla-la-mancha-beautiful-composition-wide-shot.webp"
show_featured_image = true
+++

If you are trying to import `.mdx` files with Typescript in your React project, you might be getting an error looking like this:

```bash
Fix: Cannot find module 'MyComponent.mdx' or its corresponding type declarations in React
```

Here's how to fix it:

First, install `@types/mdx`:

```bash
pnpm i -D @types/mdx
```

Then, inside your project, add a types folder with a `mdx.d.ts` file (e.g. `./src/types/mdx.d.ts`), and paste this in the file:

```typescript
declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
```

Now open your `tsconfig.json` file, and do these two things:

1. Add `"mdx"` inside `"types"`:

```json
{
"compilerOptions": {
    ...
    "types": ["react/next", "react-dom/next", "mdx"]
    },
  ...
}
```

2. Make sure the path of the `mdx.d.ts` file is included. If you added it inside the `src` folder, this should be enough:

```json
{
  ...
  "include": ["src"],
  ...
}
```

It should work now. Good luck!
