export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};

export const gtmVirtualPageView = (rest) => {
  window.dataLayer?.push({
    event: 'VirtualPageView',
    ...rest,
  });
};