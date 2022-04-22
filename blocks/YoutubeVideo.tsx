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
      <BlockWrapper width="text" noPadding>
        <div {...storyblokEditable(blok)} key={blok._uid}>
          <div className="max-w-3xl mx-auto">
            <iframe
              className="w-full aspect-video"
              src={videoUrl}
              title={caption}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="mt-2 leading-loose prose custom-prose md:leading-normal">
              <span className="block text-left text-sm text-center text-gray-800">
                {caption}
              </span>
            </div>
          </div>
        </div>
      </BlockWrapper>
    </ClientOnly>
  );
};

export default YoutubeVideo;
