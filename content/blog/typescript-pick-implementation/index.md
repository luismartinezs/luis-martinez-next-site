+++
title = "How to implement the Pick generic in Typescript"
description = "How to implement the Pick generic in TypeScript step by step"
date = 2022-10-29

[extra]
seo_title = "Implement Pick generic TypeScript - Luis Martinez Web Developer"
featured_image = "cover-saito200-one-armored-marine-a-swarm-of-zerg-in-the-distance.webp"
show_featured_image = true
+++

The TypeScript utility `Pick` constructs a type from a set of properties from another type. For example:

```
type Book {
  title: string;
  author: string;
  price: number;
}

// Here we "pick" title and author, but not price
type TitleOrAuthor = Pick<Book, 'title' | 'author'>

const titleOrAuthor: TitleOrAuthor = {
  title: 'The Lord of The Rings',
  author: 'J.R.R. Tokien'
}
```

Note how the type `TitleOrAuthor` does not have a `price` property.

How would we implement the generic type `Pick`?

Let's see how, step by step.

First, we know from the definition that the generic will accept two types:

```
type MyPick<T, K>
```

Then, we need to look at each property and compare it to `K`. So we start by mapping (or "looping over") `T`

```
type MyPick<T, K> = {
  [Key in keyof T]: any
}
```

Here `Key in keyof T` can be read as "I am looking at each key of `T`, and I will assign it to `Key`". Kind of like a loop.

The type of each property is going to be unchanged, which means: it's going to simply be the property `Key` of the object `T`. Or `T[Key]`:

```
type MyPick<T, K> = {
  [Key in keyof T]: T[Key]
}
```

With that, we basically end up with the same type. In other words:

```
type MyPick<T, K> = {
  [Key in keyof T]: T[Key]
}

type TypeA = {
  foo: 'bar'
}

type TypeB = MyPick<TypeA, any>
// TypeA and TypeB are the same type
```

Let's add the cherry on the cake that will make it work.

We need a way to say: "if the current `Key` is one of those in `K` pick it, otherwise, ignore it". If... In other words, we are going to need a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

Conditional types follow this syntax: `condition ? true expression : false expression`

In our case, the condition is `Key extends K`. If `K` is a union type, for example, `'title' | 'author'`, then, if `Key` is either `'title'` or `'author'` then the condition will be true.

For example:

`'title' extends 'title' | 'author'`, this is true.

`'age' extends 'title' | 'author'`, this is false.

Let's go to our type and plug this condition in there.

```
type MyPick<T, K> = {
  [Key in keyof T as Key extends K]: T[Key]
}
```

Notice the keyword `as`. This is necessary if we want to tell TypeScript that we want to do something with the `Key`. If we wanted to use the `Key` as it is, as key, we wouldn't need it. But in this case, we want to do something with it (compare it to `K`).

The above alone with not work though. We're missing the true and false expressions. Let's add them:

```
type MyPick<T, K> = {
  [Key in keyof T as Key extends K ? Key : ??? ]: T[Key]
}
```

For the true expression, it should be clear that we just want `Key`, because we want the same keys as the original object. But what for the false expression? What goes in there?

In the false expression, we want to tell TypeScript "since this `Key` is not one of `K`, just ignore it. Skip it!". TypeScript has a specific type for things that do not return any value. It is `never`. That's what we need there.

```
type MyPick<T, K> = {
  [Key in keyof T as Key extends K ? Key : never ]: T[Key]
}
```

It's similar to how functions with return type `never`, never reach the end of their execution.

![Giorno Gold Experience Requiem says: "Your Key will never reach the end of the iteration""](/blog/typescript-pick-implementation/giorno-ger.webp)

Now we're done. If we used the type, it would work!

```
type TitleOrAuthor = MyPick<Book, 'title' | 'author'>
```
