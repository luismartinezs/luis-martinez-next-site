# Luis Martinez Website

I'm trying to use markdown in combination with react components

What I want:

- Able to dynamically import mdx files / content for a dynamic blog
- Able to use react in markdown: mdx allows that
- Able to have metadata in each post

Alternative:

- Instead of using markdown, I can setup storyblok and add content there. It will be more flexible, but also more wiring
- It might be worth setting up Storyblok, just for learning

Way forward

- Setup Storyblok and get the blog content from there
  - [x] Storyblok space
  - [x] Use storyblok in NextJS
  - [x] Render blog posts from Storyblok
  - [ ] Add hero image with title in blog posts
  - [ ] Render about content
  - [ ] Render resume content
  - [ ] Visual editor shows blogpost
- Components I need
  - [ ] Video component
  - [x] Rich text component

## Documentation

- [Storyblok client api](https://github.com/storyblok/storyblok-js-client#class-storyblok)

## Developer

- This project uses Storyblok as a headless CMS for the blog posts. When developing open the following sites:

- http://app.storyblok.com/
- https://github.com/storyblok/getting-started: reference to use the `@storyblok/react` library
- https://github.com/storyblok/storyblok-js-client: reference for the Storyblok client
- https://www.storyblok.com/docs/api/content-delivery: Storyblok content deliver API docs