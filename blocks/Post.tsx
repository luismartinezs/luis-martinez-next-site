import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from "@storyblok/react";

const Post = ({ blok }) => {
  const { body, ...postData } = blok;

  if (!body) {
    return null;
  }

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          {...postData}
          isPost={true}
        />
      ))}
    </div>
  );
};

export default Post;
