import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const elza = localFont({
  src: [
    {
      path: '../fonts/ElzaTrial-Black.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-elza'
});

const neueHaas = localFont({
  src: [
    {
      path: '../fonts/neuehaasgrotdispround-35thin-trial.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-45light-trial.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-65medium-trial.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-75bold-trial.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/neuehaasgrotdispround-95black-trial.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-neue-haas'
});

const neueHaasUnica = localFont({
  src: [
    {
      path: '../fonts/Neue_Haas_Unica_W1G_Light.otf',
      weight: '300',
      style: 'normal',
    }
  ],
  variable: '--font-neue-haas-unica'
});

export const metadata: Metadata = {
  title: "Product Dept.",
  description: "Where Great Ideas Become Exceptional Products. Full-Stack Product Creation.",
  icons: {
    icon: [
      {
        url: "/icon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
  },
};

import { Navigation } from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${elza.variable} ${neueHaas.variable} ${neueHaasUnica.variable} h-full antialiased overscroll-none`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateFavicon() {
                  try {
                    var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var svgHref = isDark ? '/icon-dark.svg' : '/icon-light.svg';
                    var icoHref = isDark ? '/favicon-dark.ico' : '/favicon-light.ico';
                    var links = document.querySelectorAll("link[rel*='icon']");
                    var hasSvg = false;
                    links.forEach(function(el) {
                      var rel = el.getAttribute('rel') || '';
                      if (rel.indexOf('apple-touch-icon') !== -1) return;
                      if (el.getAttribute('type') === 'image/svg+xml' || (el.href && el.href.indexOf('.svg') !== -1)) {
                        el.href = svgHref;
                        hasSvg = true;
                      } else {
                        el.href = icoHref;
                      }
                    });
                    if (!hasSvg) {
                      var newLink = document.createElement('link');
                      newLink.rel = 'icon';
                      newLink.type = 'image/svg+xml';
                      newLink.href = svgHref;
                      document.head.appendChild(newLink);
                    }
                  } catch (e) {}
                }
                updateFavicon();
                if (window.matchMedia) {
                  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground tracking-tight overflow-x-hidden overscroll-none">
        <Navigation />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
