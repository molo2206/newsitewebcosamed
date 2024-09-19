import { MetaHeadEmbed } from "@phntms/react-share";
import React from "react";

const Seo = ({ children }:any) => {
  return (
    <>
      <MetaHeadEmbed
        render={(meta: React.ReactNode) => <div>{meta}</div>}
        siteTitle="PHANTOM"
        pageTitle="Our Work"
        titleTemplate="[pageTitle] | [siteTitle]"
        description="Transforming challenges of all shapes and sizes into inventive, engaging and performance driven solutions that change the game."
        baseSiteUrl="https://phantom.land"
        pagePath="work"
        keywords={["creative-agency", "phantom", "work"]}
        imageUrl="https://admin.cdedrcongo.org/ressources/posts/aaaa.jpg"
        imageAlt="PHANTOM logo."
        twitter={{
          cardSize: "large",
          siteUsername: "@phntmLDN",
          creatorUsername: "@phntmLDN",
        }}
      />
      {children}
    </>
  );
};

export default Seo;
