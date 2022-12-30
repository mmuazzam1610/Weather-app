import Head from "next/head";
import React, { FC } from "react";

export const HeaderMeta: FC = () => {
  return (
    <Head>
      <title>Weather App</title>
      <meta property="og:title" content="weather-app" key="title" />
      <meta charSet="UTF-8" />
      <meta key="description" name="description" content="this is a weather app" />
    </Head>
  );
};
