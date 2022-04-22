export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};
