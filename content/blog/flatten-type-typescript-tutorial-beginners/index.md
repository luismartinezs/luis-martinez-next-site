+++
title = "Building the Flatten Type with Typescript: A Tutorial for Beginners"
description = "Learn how to build the Flatten type in typescript, a utility type that takes an array of arrays and flattens it into a single array. This tutorial is perfect for beginners looking to learn more about advanced types in typescript."
date = 2023-01-01

[extra]
featured_image = "cover-saito200-spacescape-a-sea-of-galaxies-beautiful-composition.webp"
show_featured_image = true
+++

Typescript learning can be challenging but rewarding. To improve your understanding and skills, you can try building types and analyzing them piece by piece.

In this post we'll build a `Flatten` type.

The `Flatten` type is a utility type that takes an array of arrays and flattens it into a single array. It can be used to simplify the process of working with nested arrays.

```typescript
type Flattened = Flatten<[1, 2, [3, 4], [[[5]]]]>
// [1, 2, 3, 4, 5]
```

We have to somehow look inside the input array recursively, and spread any elements we find to be arrays.

Let's see how to do it step by step:

First, define the `Flatten` type as a generic type. It needs to take a type parameter which is the array we will provide when using the type.

```typescript
type Flatten<T extends any[]> =
// implementation goes here
```

With `T extends any[]` we enforce the parameter `T` to be of type `any[]` .

Next, we're going to "look into" the array and get the values. We can do this with the `infer` keyword, which is used in the context of a conditional (`extends` keyword).

```typescript
type Flatten<T extends any[]> = T extends [...infer S] ? S : [];

type Test = Flatten<[1, 2]> // this is just going to be [1, 2]
```

The spread operator (the 3 dots in `...infer S` ) means that we are "grabbing" **all** values inside the array, not just one.

For the false branch let's simply return `[]`, as it is the case of `T` being an empty array.

Now, we want to look at the values inside the input array one by one, and check if they are arrays or not, because if they are arrays we want to flatten them. To do this, we can split the contents of the array into two inferred types: `First` and `Rest` :

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First
  : [];

type Test = Flatten<[1, 2]>; /* this will now be 1, as the type is only
returning the first value in the array */
```

Here we used [tuple destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#tuple-destructuring).

Now let's check if the first element is an array. We need a conditional, which in typescript is done with `extends` .

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? // true branch, First is an array
    : // false branch, First is not an array
  : [];
```

In the true branch, `First` is an array, so we want to recursively call the `Flatten` type (we want to flatten it):

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Flatten<First>
    : // false branch, First is not an array
  : [];
```

In the false branch, we could try to just use `First` without the need to flatten it. Let's try it:

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Flatten<First>
    : First
  : [];
```

You might be noticing something. Right now, all this type is doing is returning only the `First` element of the array. What about the `Rest` of the array? We're never doing anything with it. When `First` is an array, it makes sense to spread the `First` along with the `Rest` like so:

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Flatten<[...First, ...Rest]>
    : First
  : [];
```

What about when `First` is not an array? How to take into account the `Rest`

Can we do this?

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Flatten<[...First, ...Rest]>
    : [First, ...Rest]
  : [];
```

No. It is obvious that `[First, ...Rest]` will result in the same input array. This is not enough. `Rest` is the same input array minus the `First` element, which has already been processed. Even if the `First` element is not an array, we need to recursively check the `Rest` of the array elements to check which ones are arrays.

How can we continue flattening the `Rest` of array elements?

Any idea comes to mind?

Yes, we can just use the type we're creating!

```typescript
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Flatten<[...First, ...Flatten<Rest>]>
    : [First, ...Flatten<Rest>]
  : [];
```

This might look slightly convoluted at this point, but `Flatten<Rest>` is taking the first element of the `Rest` array and flattening it. This is done recursively until `Rest` is an empty array or, what is the same, until all elements of the `T` array have been processed.

Now we can verify that the type works, for example, with:

```typescript
type Flattened = Flatten<[1, 2, [3, 4], [[[5]]]]>
// [1, 2, 3, 4, 5]
```

I hope this tutorial has helped you understand how to build the Flatten type with typescript. Happy coding!
