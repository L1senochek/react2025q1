import type { AppProps } from 'next/app';

import '../src/App.css';
import '../src/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
