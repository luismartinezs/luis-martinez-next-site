+++
title = "Using default function parameters wrong and right in JavaScript"
description = "This is a short story of two **JavaScript functions**. What they do is not important. I want to illustrate something about **default function parameters**."
date = 2021-06-03

[extra]
seo_title = "Using default function parameters wrong and right in JavaScript - Luis Martinez Web Developer"
featured_image = "cover-saito200-castilla-la-mancha-beautiful-composition-wide-shot.webp"
show_featured_image = true
+++

This is a short story of two **JavaScript functions**.

What they do is not important. I want to illustrate something about **default function parameters**.

First, I had a function `getColorOnBackground`, which took the parameters `backgroundColor` and, optionally, `dark` and `light`. It returned either `dark` or `light`:

```
function getColorOnBackground (
  backgroundColor,
  dark = 'text-gray-900',
  light = 'text-white'
  // `dark` and `light` are CSS classes
  ) {
  // Do some logic
  // Return either the `dark` or `light` values
}
```

It needed to set **default parameters** for `dark` and `light`, otherwise, they couldn't be optional.

The other function is `getTitleColorFromData`, and it calls the first one, `getColorOnBackground`.

```
function getTitleColorFromData (data) {
  if (data.backgroundColor) {
    // here call the other function
    return getColorOnBackground(data.backgroundColor)
  }
  // do other things
}
```

This function has at least one limitation, the option to use custom values for `light` and `dark` is lost. So, naively, what we want is:

```
function getTitleColorFromData (data, dark, light) {
  if (data.backgroundColor) {
    // here call the other function
    return getColorOnBackground(data.backgroundColor, dark, light)
  }
  // do other things
}
```

This will work.

However, as the function does more things, I expect that the number of arguments might increase. When this happens, I like to turn the optional arguments into an **object**.

This was my (dumb) try:

```
function getTitleColorFromData (data, { dark = null, light = null }) {
  if (data.backgroundColor) {
    // here call the other function
    return getColorOnBackground(data.backgroundColor, dark, light)
  }
  // do other things
}
```

I replaced `dark, light` by `{ dark = null, light = null }`.

Here I was thinking: "if I don't pass `light` or `dark` values, just use the fallback set in the `getColorOnBackground` function". Setting the default values to `null` was a naive attempt to make them be `falsy` and thus fallback to the **default parameters**.

That was very wrong.

[Default parameters - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters#passing_undefined_vs._other_falsy_values) says:

> If default parameters exist, e.g. `function myFunction (value = 'default') {...}` they will only be used in two cases:
>
> - If **no value** is passed when we call the function
> - If a value is passed and is explicitly set to `undefined`

`null` is not the same as `undefined`, so default parameters are NOT used if the passed value is `null`!

So, in my (dumb) attempt above, the nested function `getColorOnBackground` would always return `null`. :(

How to fix it?

An obvious solution would be to set the **default parameters** to `undefined` explicitly:

```
function getTitleColorFromData (data, { dark = undefined, light = undefined }) {
  if (data.backgroundColor) {
    // here call the other function
    return getColorOnBackground(data.backgroundColor, dark, light)
  }
  // do other things
}
```

That's not a good solution though. It carries one problem: I'm forced to always pass a second argument, like so: `getTitleColorFromData(myData, {})`.

Otherwise I get an error:

```
Cannot destructure property 'dark' of 'undefined' as it is undefined.
```

Plus, it's also verbose.

Fortunately, there's a good solution to this small conundrum:

```
function getTitleColorFromData (data, { dark, light } = {}) {
  if (data.backgroundColor) {
    // here call the other function
    return getColorOnBackground(data.backgroundColor, dark, light)
  }
  // do other things
}
```

The `{ dark, light } = {}` means: "Use an empty object as a **default parameter** if no argument is provided". With this, `light` and `dark` will automatically be `undefined`.

Not only that works, but is also more flexible:

- The second argument is totally optional. This will work: `getTitleColorFromData(myData)`
- We can set the value of both parameters. This will also work: `getTitleColorFromData(myData, { dark: 'text-gray-900', light: 'text-gray-100' })`
- We can set a value for one of the parameters: `getTitleColorFromData(myData, { light: 'text-gray-100' })`

Isn't the power of **default function parameters** wonderful?
