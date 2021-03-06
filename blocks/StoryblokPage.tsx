import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const StoryblokPage = ({ blok }) => (
  <main className="px-6" {...storyblokEditable(blok)} key={blok._uid}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default StoryblokPage;
