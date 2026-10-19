+++
title = "Web Accessibility Guidelines"
description = "Applying a11y guidelines should be a part of the development process, these are the steps I suggest to make a website highly accessible"
date = 2022-02-20

[extra]
seo_title = "Web Accessibility Guidelines - Luis Martinez Web Developer"
featured_image = "cover-saito200-twelve-fingered-hand-one-hand-highly-detailed-vivid.webp"
show_featured_image = true
+++

> [!NOTE]
> Make sure to check my blogpost [Web Accessibility Guidelines 2022 Update](@/blog/web-accessibility-guidelines-2022-update/index.md)

Ideally, applying a11y (accessibility) guidelines should be a part of the development process, rather than an afterthought.

I propose the following steps:

## Steps to perform an a11y audit

**1/ Automatic testing**

There are a handful of these types of tools. All of them run an audit check and provide a list of things to change. These tools are described here in more detail: [https://a11y.coffee/start-testing](https://a11y.coffee/start-testing)

- **WAVE Web Accessibility Evaluation Tool**: in my opinion it is the tool that gives a quickest and most visual overview. I’d start here. [https://wave.webaim.org/](https://wave.webaim.org/)
- Additional tools that provide similar information:

  - **Firefox a11y audit** in Firefox developer tools (recommended)

    - In a11y dev tools tab, select: “All issues”, “show tabbing order”, and color deficiency simulations
  - Chrome's lighthouse audit in chrome developer tools
  - [Axe browser extension](https://www.deque.com/axe/) https://www.deque.com/axe/
  - [Accessibility insights](https://accessibilityinsights.io/)

In my opinion, running one of the above should be enough to cover this point.

**2/ A11y checklist**

Use an a11y checklist to discover issues that automated tools might have overlooked: [https://www.a11yproject.com/checklist](https://www.a11yproject.com/checklist) or [https://webaim.org/standards/wcag/checklist](https://webaim.org/standards/wcag/checklist)

3/ Manual testing

Cross-check the following use cases:

- Interactive elements should follow ARIA guidelines: [https://www.w3.org/TR/wai-aria-practices/](https://www.w3.org/TR/wai-aria-practices/)
- Each page should be keyboard navigable
- Each page should be screen reader navigable (navigate with closed eyes using keyboard and a screen reader)
- Focus styles should be apparent
- Touch points should have appropriate dimensions on touch device sizes: 48x48pt minimum for touchable areas, and 32pt of space in between touchable elements
- View site in grayscale, make sure it is readable (use nocoffee from the resources section)
- View site in high contrast mode, make sure it is readable (use nocoffee from the resources section)
- View site at 200% magnification

## Resources

### General resources

- [https://www.w3.org/TR/wai-aria-practices/](https://www.w3.org/TR/wai-aria-practices/) Main resource for WAI-ARIA guidelines
- [https://a11y.coffee](https://a11y.coffee) Quick intro to the concept of a11y
- [https://webaim.org/techniques/skipnav](https://webaim.org/techniques/skipnav) Skip navigation link
- [https://webaim.org/techniques/css/invisiblecontent](https://webaim.org/techniques/css/invisiblecontent) Invisible content for screen readers
- [https://css-tricks.com/accessible-svgs](https://css-tricks.com/accessible-svgs) A11y for svg

### Tools and extensions

- [https://wave.webaim.org/](https://wave.webaim.org/)
- [Chrome lighthouse](https://developers.google.com/web/tools/lighthouse)
- [AXE](https://www.deque.com/axe/)
- [Microsoft accessibility insights](https://accessibilityinsights.io/), can be also used to test a11y for desktop and mobile apps
- [https://accessgarage.wordpress.com/2013/02/09/458/](https://accessgarage.wordpress.com/2013/02/09/458/) (download chrome extension nocoffee and use it to simulate different levels of visual impairment)
- [https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn) Screen reader chrome extension (annoying, will force you to reinstall / uninstall each time to keep your sanity)
- [https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility) VSCode extension

### Checklists

- [https://www.a11yproject.com/checklist](https://www.a11yproject.com/checklist)
- [https://webaim.org/standards/wcag/checklist](https://webaim.org/standards/wcag/checklist)

### Courses

- [https://www.udacity.com/course/web-accessibility--ud891](https://www.udacity.com/course/web-accessibility--ud891)

> [!WARNING]
> The NoCoffee extension for Chrome seems gone. For high contrast mode, you can use this [High Contrast extension for Chrome](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph)
