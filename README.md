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
  - [x] Add hero image with title in blog posts
  - [x] Blog posts can have videos
  - [x] Blog posts can have cloudinary images
  - [x] Render about content
  - [x] Render resume content
  - [x] Visual editor shows blogpost
  - [x] Tweak inline code snippets in posts
  - [x] Redesign post card
  - [x] Tweak styles of blogpost links
  - [x] Sticky header
  - [x] Add remaining blog posts
  - [x] Setup analytics and tracking
  - [x] Setup cookie popup
  - [x] Setup SEO
    - [x] Robots
    - [x] Sitemap
  - [x] Fix horizontal scrollbar
  - [x] Style nicely italics and bolds in posts
  - [x] Refactor sticky header
  - [x] Make post list nicer and less flashy. Less colorful. Something basic
  - [x] Setup favicon
  - [x] Add dark mode
  - [x] Production fetches published content from storyblok
  - [x] Deploy to netlify
  - [x] Show draft in Storyblok context
    - [x] Production: doesn't show drafts. Might need to rebuild site (SSG)
    - [x] Development: shows drafts immediately as they are creatd, without need to rebuild site (SSR)
  - [ ] Use types everywhere
    - https://nextjs.org/docs/basic-features/typescript
  - [ ] Use SWR for data fetching
  - [ ] Mobile menu
  - [x] Fix environment pill mobile style, and don't show in production
  - [ ] Update my resume
  - [ ] Configure netlify/plugin-lighthouse
  - [ ] Improve post loading and error states

- Components I need
  - [x] Video component
  - [x] Rich text component
  - [ ] Add twittable sentences

## Documentation

- [Storyblok client api](https://github.com/storyblok/storyblok-js-client#class-storyblok)

## Developer

- This project uses Storyblok as a headless CMS for the blog posts. When developing open the following sites:

- http://app.storyblok.com/
- https://github.com/storyblok/storyblok-react : reference to use the `@storyblok/react` library
- https://github.com/storyblok/storyblok-js-client : reference for the Storyblok client
- https://www.storyblok.com/docs/api/content-delivery : Storyblok content deliver API docs

Trigger deploy