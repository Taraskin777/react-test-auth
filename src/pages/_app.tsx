import type { AppProps } from "next/app";
import GlobalStyles from "@/styles/GlobalStyles";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={roboto.className}>
        <GlobalStyles />
        <Component {...pageProps} />
      </main>
    </>
  );
}
