*   **`HeroTitle.tsx`**: Renders a hero title section. It can optionally display post metadata (creation date) and a featured image from Cloudinary if `isPost` is true and the image exists.
    *   **Props**:
        *   `blok`: Storyblok data object, containing `title` and `showFeaturedImage`.
        *   `postTitle`: Title of the post (used if `blok.title` is not available).
        *   `createdAt`: Creation date string for post metadata.
        *   `isPost` (boolean, default: `false`): Indicates if the component is used within a post context to show metadata and featured image.
        *   `featuredImage`: URL string for the featured image (used if `isPost` is true).

*   **`CloudinaryImage.tsx`**: Displays an image hosted on Cloudinary using `next/image`. It utilizes a custom Cloudinary loader.
    *   **Props**:
        *   `blok`: Storyblok data object, containing `src` (image URL), `alt` (alt text), and `preload` (boolean for priority loading).
        *   `...rest`: Accepts any other valid props for the `next/image` component (excluding `src`, `alt`, `loader`, `priority`).

*   **`SideNote.tsx`**: Displays a side note or warning block with an icon and styled background/border based on the `type`. It uses `RichTextRenderer` for the content.
    *   **Props**:
        *   `blok`: Storyblok data object, containing:
            *   `type`: String, either `"note"` or `"warning"`. Defaults to `"note"`.
            *   `content`: Rich text object for the note's content.

*   **`YoutubeVideo.tsx`**: Embeds a YouTube video using an iframe (`youtube-nocookie.com`). It supports an optional caption and timestamp (start time).
    *   **Props**:
        *   `blok`: Storyblok data object, containing:
            *   `youtubeId`: The ID of the YouTube video.
            *   `caption`: Optional text caption displayed below the video.
            *   `timestamp`: Optional start time for the video in seconds.
