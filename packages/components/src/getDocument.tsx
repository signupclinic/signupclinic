import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { Theme } from '@mui/material';
import defaultTheme from './theme';
import { iconUrl as defaultIconUrl } from './index';

export default function getDocument(
  {
    appName,
    description,
    theme,
    iconUrl = defaultIconUrl,
    homeUrl,
    pwa,
  }: {
    appName?: string;
    description?: string;
    theme?: Theme;
    iconUrl?: string;
    homeUrl?: string;
    pwa?: boolean;
  } = {
    appName: 'Jacob Clarke',
    description: 'App created by Jacob Clarke',
    theme: defaultTheme,
    iconUrl: 'https://j718-assets.s3.amazonaws.com/icon.svg',
    homeUrl: 'https://jacobaclarke.com',
    pwa: true,
  }
) {
  function Document() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={theme?.palette.primary.main || 'blue'}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" type="image/svg+xml" href={iconUrl} />

          <meta name="application-name" content={appName} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={appName} />
          <meta name="description" content={description} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta
            name="msapplication-TileColor"
            content={theme?.palette.primary.main || '#2B5797'}
          />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta
            name="theme-color"
            content={theme?.palette.primary.main || '#2B5797'}
          />

          <meta name="HandheldFriendly" content="true" />

          <link rel="apple-touch-icon" href={iconUrl} />

          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            color={theme?.palette.primary.main || '#2B5797'}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={homeUrl} />
          <meta name="twitter:title" content={appName} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={iconUrl} />
          <meta name="twitter:creator" content="@jacobaclarke" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={appName} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={appName} />
          <meta property="og:url" content={homeUrl} />
          <meta property="og:image" content={iconUrl} />
        </Head>
        <noscript>
          <iframe
            title="google tags"
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  return Document;
}
