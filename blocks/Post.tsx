import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Post = ({ blok }) => {
  const { body, ...postData } = blok;
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          {...postData}
        />
      ))}
    </div>
  );
};

export default Post;
