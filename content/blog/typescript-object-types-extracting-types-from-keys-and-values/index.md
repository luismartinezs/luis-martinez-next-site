+++
title = "TypeScript Object Types: Extracting Types from Keys and Values"
description = "Discover how to extract specific types from objects in TypeScript, including types from both the keys and values of an object. Learn how to use TypeScript's keyof and typeof operators to build more robust and reliable TypeScript applications"
date = 2023-03-15

[extra]
featured_image = "cover-saito200-liurnia-long-exposure-cinematic-lighting-ultra-wide.webp"
show_featured_image = true
+++

As a TypeScript developer, you'll often find yourself in situations where you need to extract the types of the keys and values from an object. Fortunately, TypeScript provides some utility types that can help you achieve this.

Say, you're building an app that needs to display some user information, and you have an object that contains all the user data. You need to extract specific types from this object, including the types of both the keys and values.

How?

Enter TypeScript's `keyof` and `typeof` operators.

Here's an example of how you can use these operators to extract types from both keys and values of an object:

```typescript
const user = {
  name: 'John',
  age: 42
}

type UserKey = keyof typeof user; // "name" | "age"
type UserValue = typeof user[UserKey]; // string | number
```

In this example, we define an object `user` with two properties: `name` and `age`. We then use the `keyof` operator to extract the keys of the `user` object and assign it to the `UserKey` type. This results in a union type of `"name"` and `"age"`. Next, we use the `typeof user[UserKey]` expression to access all possible values of the `user` object. This results in a union type of `string` and `number`.

Let's take a closer look at `keyof` and `typeof` operators:

- `keyof`: This operator returns a union type of all the keys in an object. In the example above, we used `keyof user` to extract the keys from the `user` object.
- `typeof`: This operator returns the type of a value. In the example above, we used `typeof user[UserKey]` to extract a union of the types of the values in `user`.

Using `keyof` and `typeof` operators, you can extract specific types from objects and build more robust and reliable TypeScript applications.

Hope this helps!
