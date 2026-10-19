+++
title = "Using createGetInitialProps with NextJS Functional Components"
description = "Learn how to use createGetInitialProps to get the initial props for your NextJS Document component when using a functional component instead of a class component. Follow this step-by-step guide with examples in TypeScript."
date = 2023-03-08

[extra]
featured_image = "cover-saito200-one-armored-marine-a-swarm-of-zerg-in-the-distance.webp"
show_featured_image = true
+++

[Mantine](https://mantine.dev/) is a UI component library I love.

The [Mantine docs](https://mantine.dev/guides/next/#generate-new-application) show how to use Mantine in combination with NextJS. You have to use a `createGetInitialProps` function in the `pages/_document.tsx`, but their example uses a React class component.

No one likes class components.

So I'll show you how to do it with a functional component.

> [!NOTE]
> I assume you're somewhat familiar with NextJS and are trying to configure Mantine. The `_document.tsx` file is just a part of the NextJS file structure (more info in the [NextJS docs](https://nextjs.org/docs/advanced-features/custom-document))

Using `createGetInitialProps` with a functional component is pretty straightforward. All you have to do is define a `getInitialProps` function inside your component.

Here's an example of how your `pages/_documents.tsx` file could look like:

```typescript
import { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

type Props = {
  initialProps: any;
};

function Document({ initialProps }: Props) {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = getInitialProps;

export default Document;
```

As you can see, the function `getInitialProps` returned by `createGetInitialProps()` is attached to the `Document` as a static method.

And that's it! You now have a `Document` functional component with `getInitialProps` support.

I hope this helps!
