+++
title = "Web Accessibility Guidelines 2022 Update"
description = "Some steps you can follow to make your site accessible"
date = 2022-09-13

[extra]
featured_image = "cover-saito200-a-time-and-space-beyond-space-and-time-beautiful-co.webp"
show_featured_image = true
+++

> [!NOTE]
> This is an extended version of [my previous post](@/blog/a11y/index.md), which was slightly outdated.

![Charlie in the Chocolate Factory meme: So you want to make your website accessible? Tell me again how many times you've used a screen reader](/blog/web-accessibility-guidelines-2022-update/so-you-want-a11y.webp)

So you want to make your website accessible, or "a11y"? (accessible and a11y are the same thing).

Good for you!

Ideally, applying a11y guidelines should be a part of the development process, rather than an afterthought. I'm going to go over some steps you can follow to make your site a11y.

But first... If you are not familiar with the concept of accessibility, you should at least read [a basic intro](https://a11y.coffee/).

Okay, we're good? We're good. Let's continue.

## Steps to perform an a11y audit

### Automatic testing

There are a handful of these types of tools. All of them run an audit check and provide a list of things to change. Some of these tools are described here in more detail: https://a11y.coffee/start-testing

- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org): in my opinion it is the tool that gives a quickest and most visual overview. I’d start here. It shows landmarks, a11y features, and a11y errors, among other things.
- Additional tools that provide similar information:

  - Firefox a11y audit in Firefox developer tools (also recommended)

    - In a11y dev tools tab, select: “All issues”, and “show tabbing order”. You can also simulate color deficiency.
  - [Axe Chrome extension](https://www.deque.com/axe/browser-extensions/)
  - [Chrome's lighthouse](https://developers.google.com/web/tools/lighthouse) audit in chrome developer tools
  - [Accessibility insights](https://accessibilityinsights.io)
  - [Axe cli](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/cli/README.md). Yes! You can run a11y tests from the command line like so: `axe luis-martinez.net/blog/a11y`

My recommendation is to use the [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org) to get a quick, visual idea of the a11y issues in the page, and then fix them.

### A11y checklist

Use an a11y checklist to discover issues that automated tools might have overlooked: [https://www.a11yproject.com/checklist](https://www.a11yproject.com/checklist), [https://webaim.org/standards/wcag/checklist](https://webaim.org/standards/wcag/checklist) or [https://www.wuhcag.com/wcag-checklist/](https://www.wuhcag.com/wcag-checklist/)

Go through one of the checklists and make sure your website passes every item.

### Manual testing

Lastly, cross-check the following use cases:

- Interactive elements should follow ARIA guidelines. Explore the list of [WAI ARIA patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and make sure the ones you use in your page follow these guidelines
- Add a "skip to content link", if suitable. Suggested read: [https://webaim.org/techniques/skipnav](https://webaim.org/techniques/skipnav)
- Navigate each page with the keyboard. Tab through the site and make sure every interactive element is focusable and has a distinct focus state. Suggested reads: [https://web.dev/how-to-review/#start-with-the-keyboard, https://webaim.org/techniques/keyboard/](<https://web.dev/how-to-review/#start-with-the-keyboard, https://webaim.org/techniques/keyboard/>)
- Each page should be screen reader navigable (see [screen readers](#about-screen-readers) section)
- If you are building custom widgets, make sure they are a11y (see [Custom widgets](#custom-widgets) section)
- Touch points (interactive elements on mobile devices) should have appropriate dimensions on touch device sizes: at minimum 48x48 pt for touchable areas, and 32 pt of space in between touchable elements.
- View the site in both grayscale and high contrast and make sure it is readable. I recommend the [High Contrast chrome extension](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph), which will enable you to select a handful of color modes. On Firefox, you can use the accessibility tab in the dev tools. Otherwise, google "website grayscale + your browser" and see what you find.
- View the site at 200% magnification and make sure everything still works. For this, simply use the native zoom of the browser, usually `ctrl`/`cmd` and the `+` key.

## About screen readers

A screen reader is a software that reads the content of the screen for users that, for example, are visually impaired. Become familiar with at least one screen reader.

Depending on the operative system, there are different screen readers available:

- Windows users have [NVDA](https://www.nvaccess.org/)
- Mac uses have [VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html)
- Ubuntu users have [Orca](https://docs.oracle.com/cd/E36784_01/html/E36850/ats-2.html#scrolltoc)
- For chrome, there is the [Screen Reader extension](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn/related?hl=en), which is like a lite version of the above. If you use this extension, you can listen to the screen reader announce the interactive elements by tabbing. If you want the screen reader to read non focusable content, you will have to select it by clicking with your mouse.

If for some reason you can't use a screen reader, you still have the accessibility tree view: it is what screen readers read when navigating a site. You can see it in the Chrome dev tools, by clicking on the button with an icon of a person, in the `Elements` tab.

![Accessibility tree in Google Chrome dev tools](/blog/web-accessibility-guidelines-2022-update/a11y-tree-view.webp)

In Firefox, the a11y tree is displayed in the "accessibility" tab of the dev tools.

I won't go into how screen readers work. Get familiar with one of them, and use it to test your page for a11y.

To give you an idea, the screen reader reads:

- The **role or type** of the element. For example, a link, an article...
- The **accessible name** of the element. For a link, it would normally be its text content
- The element's **value**, if there is any. For example, the current value in a text input
- The element's **state**, if there is any. For example, the checked state in a checkbox

Things to keep in mind:

- Screen reader users usually navigate a page using headings and landmarks, so review those. Use the `h1-h6` hierarchy and landmarks correctly. Use [accessible landmarks](https://www.scottohara.me/blog/2018/03/03/landmarks.html) as a reference.
- All images should have a descriptive `alt` text, which describes the image to someone who cannot see it. However, if they are only decorational, leave it empty: `alt=""`.
- All controls should have a label.
- All custom controls should have a role and any required ARIA attributes.
- As screen reader users navigate forms control to control, place any instructions inside the label of the associated control form.
- The keyboard navigation order should make sense.
- All visible content of the page should be accessible to screen readers (except anything that is only visually aesthetic).
- Handle content depending on its required visibility:

  - If content is hidden **both** from screen readers and visually, use `display: none` or `visibility: hidden`.
  - If content is visually present, but hidden from screen readers, use `aria-hidden="true"` and possibly `tabindex="-1"`, to prevent keyboard focus.
  - If content is visually hidden, but accessible to screen readers, use css similar to this (copied from [tailwind docs](https://tailwindcss.com/docs/screen-readers)):

```
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Custom widgets

Semantic html (`article`, `main`, `h1`, `input`, `button`, etc. as opposed to `div` and `span`) has by and large built-in accessibility, so try to use native html as much as possible. However, if you're building a custom widget without semantic html, you might need to take care of accessibility entirely on your own. Research online how to make the widget a11y, according to the [W3C specification](https://www.w3.org/TR/wai-aria/) and using the appropriate [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

[Automated tools](#automatic-testing) might not detect your custom widget, so you are entirely on your own.

Things that you will need to consider:

- What [role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles) does the widget fulfill?
- What [states and properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#states_and_properties) does the widget need?

Finding a similar widget in [WAI ARIA patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and using it as reference might be a good start. Then follow the checklists and manual steps described in this post.

## A11y libraries

If you have a site built on just html and css, the library [cypress-axe](https://github.com/component-driven/cypress-axe) lets you run a11y checks in cypress tests. Take a look at this repo to play with it yourself: [https://github.com/luismartinezs/axe-a11y-html](https://github.com/luismartinezs/axe-a11y-html)

If you use a frontend library, such as React or Vue, you can incorporate a11y libraries in your development process. For example, for React you can run automated a11y tests in cypress, or identify a11y issues with Storybook. Check out this repo to see it all working together with React: [https://github.com/luismartinezs/react-a11y-axe](https://github.com/luismartinezs/react-a11y-axe)

## What next?

There is much more to a11y than this post can encapsulate. You might start by reading about [all html elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element), to see what is actually possible in terms of native html. Then, take a look at [all ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) as well as [all ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).

Check also the list of resources at the bottom, in particular:

- Read the recommended readings
- Take the free [Udacity course on accessibility](https://www.udacity.com/course/web-accessibility--ud891)

## Resources

### Recommended readings

- [https://a11y.coffee](https://a11y.coffee) Quick intro to the concept of a11y
- [https://web.dev/how-to-review](https://web.dev/how-to-review) Great summary about a11y testing
- [https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name) What is an accessible name?
- [https://www.w3.org/WAI/ARIA/apg/practices/read-me-first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first) No ARIA is better than bad ARIA
- [https://webaim.org/techniques/formvalidation](https://webaim.org/techniques/formvalidation) Accessible form validation
- [https://www.scottohara.me/blog/2018/03/03/landmarks.html](https://www.scottohara.me/blog/2018/03/03/landmarks.html) Get familiar with what landmarks are
- [https://reactjs.org/docs/accessibility.html](https://reactjs.org/docs/accessibility.html) Good starting point if you work with React

### Other resources

- [https://www.w3.org/TR/wai-aria-practices/](https://www.w3.org/TR/wai-aria-practices/) Main resource for WAI-ARIA guidelines
- [https://webaim.org/techniques/skipnav](https://webaim.org/techniques/skipnav) Skip navigation link
- [https://webaim.org/techniques/css/invisiblecontent](https://webaim.org/techniques/css/invisiblecontent) Invisible content for screen readers
- [https://css-tricks.com/accessible-svgs](https://css-tricks.com/accessible-svgs) A11y for svg
- [https://www.w3.org/WAI/fundamentals/accessibility-principles](https://www.w3.org/WAI/fundamentals/accessibility-principles) W3C A11y principles
- [https://www.w3.org/WAI/standards-guidelines/aria](https://www.w3.org/WAI/standards-guidelines/aria) WAI-ARIA overview
- [https://developer.mozilla.org/en-US/docs/Web/HTML/Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) Reference for HTML elements
- [https://www.w3.org/WAI/tutorials/forms/labels](https://www.w3.org/WAI/tutorials/forms/labels) Different ways to label form inputs
- [https://webaim.org/techniques/forms/controls](https://webaim.org/techniques/forms/controls) A11y for form controls
- [https://www.w3.org/WAI/tutorials/forms/notifications](https://www.w3.org/WAI/tutorials/forms/notifications) A11y user feedback and notifications
- [https://webaim.org/techniques/keyboard](https://webaim.org/techniques/keyboard) Keyboard navigation
- [https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable\_JavaScript\_widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets) Making custom widgets a11y
- [https://www.w3.org/TR/wai-aria/#roles](https://www.w3.org/TR/wai-aria/#roles) List of WAI-ARIA roles
- [https://www.w3.org/TR/wai-aria/#states\_and\_properties](https://www.w3.org/TR/wai-aria/#states_and_properties) List of WAI-ARIA states and properties
- [https://www.w3.org/WAI/ARIA/apg/patterns](https://www.w3.org/WAI/ARIA/apg/patterns) Authoring practices for widgets
- [https://a11yproject.com/posts/what-is-color-contrast](https://a11yproject.com/posts/what-is-color-contrast) What is color contrast?
- [https://inclusive-components.design](https://inclusive-components.design) In-depth building of accessible components
- [https://www.tpgi.com/the-browser-accessibility-tree/](https://www.tpgi.com/the-browser-accessibility-tree/) About the web browser accessibility tree
- [https://www.adrianbolonio.com/blog/accessibility-with-storybook](https://www.adrianbolonio.com/blog/accessibility-with-storybook) A11y and Storybook
- [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) List of all ARIA attributes
- [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) List of all ARIA roles
- [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA\_Live\_Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) ARIA live regions

### Tools and extensions

- [https://wave.webaim.org/](https://wave.webaim.org/) Wave a11y evaluation tool
- [https://developers.google.com/web/tools/lighthouse](https://developers.google.com/web/tools/lighthouse) Chrome lighthouse
- [https://accessibilityinsights.io/](https://accessibilityinsights.io/) microsoft accessibility insights, can be also used to test a11y for desktop and mobile apps
- [Screen reader chrome extension](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn) (You can't "disable" it. Just remove it when you don't use it)
- [https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter) Axe VSCode extension
- [https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli) Axe-cli
- [https://github.com/dequelabs/axe-core](https://github.com/dequelabs/axe-core) Axe-core library for continuous integration environment
- [https://github.com/component-driven/cypress-axe](https://github.com/component-driven/cypress-axe) Axe library to use with Cypress testing library
- [https://github.com/dequelabs/axe-core-npm/blob/develop/packages/react/README.md](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/react/README.md) Test a React app with axe-core
- [https://colorable.jxnblk.com](https://colorable.jxnblk.com) Find colors that have enough contrast
- [https://github.com/jsx-eslint/eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) ESLint plugin to detect a11y issues in your code

### Screen readers

- [NVDA](https://www.nvaccess.org/) (Windows)
- [JAWS](https://www.freedomscientific.com/Products/software/JAWS/) (Windows)
- [VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html) (Mac)
- [Orca](https://docs.oracle.com/cd/E36784_01/html/E36850/ats-2.html#scrolltoc) (Ubuntu)
- [Screen Reader extension](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn/related?hl=en) for Chrome

### Checklists

- [https://www.a11yproject.com/checklist](https://www.a11yproject.com/checklist)
- [https://webaim.org/standards/wcag/checklist](https://webaim.org/standards/wcag/checklist)
- [https://www.wuhcag.com/wcag-checklist](https://www.wuhcag.com/wcag-checklist)

### Courses

- [https://www.udacity.com/course/web-accessibility--ud891](https://www.udacity.com/course/web-accessibility--ud891) (free)
