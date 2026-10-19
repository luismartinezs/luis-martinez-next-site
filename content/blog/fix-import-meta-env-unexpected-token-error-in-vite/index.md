+++
title = "Fix import.meta.env Unexpected token error in Vite"
description = "How to fix vite error Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)"
date = 2022-08-01

[extra]
featured_image = "cover-saito200-three-brave-texas-rangers-watching-over-the-mojave.webp"
show_featured_image = true
+++

If you use Vite with environment variables which sometimes are undefined depending on the build and environment, you might be getting an error like this:

```bash
error during build:
Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)
```

And the cause is an environment variable that is not defined.

The code that triggered such error in my case was:

```typescript
const useEmulator = () => import.meta.env.VITE_FIREBASE_EMULATOR as string
```

To fix an error like this, change the above code into:

```typescript
const useEmulator = (): boolean => {
  return import.meta.env.VITE_FIREBASE_EMULATOR !== undefined && import.meta.env.VITE_FIREBASE_EMULATOR === 'true';
};
```

Happy coding!
