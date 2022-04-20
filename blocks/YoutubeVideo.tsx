import { storyblokEditable } from "@storyblok/react";
import BlockWrapper from "components/BlockWrapper";
import ClientOnly from "components/ClientOnly";

const YoutubeVideo = ({ blok }) => {
  const { caption, timestamp, youtubeId } = blok;
  const baseUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  const baseQueryParams =
    "autoplay=0&amp;cc_load_policy=1&amp;cc_lang_pref=nl&amp;disablekb=1&amp;rel=0";
  const queryParams = timestamp
    ? `start=${timestamp}&${baseQueryParams}`
    : baseQueryParams;
  const videoUrl = `${baseUrl}?${queryParams}`;

  return (
    <ClientOnly>
      <BlockWrapper width="text">
        <div {...storyblokEditable(blok)} key={blok._uid}>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <iframe
                width="560"
                height="315"
                src={videoUrl}
                title={caption}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="mt-2 leading-loose prose md:prose-lg md:leading-normal prose-blue">
              <caption className="block text-left text-sm text-center text-gray-800">
                {caption}
              </caption>
            </div>
          </div>
        </div>
      </BlockWrapper>
    </ClientOnly>
  );
};

export default YoutubeVideo;