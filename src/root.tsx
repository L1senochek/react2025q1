import React from 'react';
import { Provider } from 'react-redux';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { store } from '@/store/store.ts';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/rick-and-morty.svg" />
        <title>Rick and Morty Api</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <div id="root">{children}</div>{' '}
          </ThemeProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
