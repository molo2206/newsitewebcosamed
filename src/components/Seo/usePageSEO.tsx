import { useEffect } from "react";

interface props {
  title?: any;
  description?: any;
  image?: any;
  keywords?: any;
  ogTitle?: any;
  ogDescription?: any;
  ogImage?: any;
  ogUrl?: any;
}

const usePageSEO = ({
  title,
  image,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: props) => {
  useEffect(() => {
    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("name", "image", image);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("property", "og:title", ogTitle || title);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:url", ogUrl || window.location.href);

    return () => {};
  }, [title, description,image, keywords, ogTitle, ogDescription, ogImage, ogUrl]);

  const setMetaTag = (attr?:any, key?:any, content?:any) => {
    if (content) {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    }
  };
};

export default usePageSEO;
