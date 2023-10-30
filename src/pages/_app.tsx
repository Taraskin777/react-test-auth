import type { AppProps } from "next/app";
import GlobalStyles from "@/styles/GlobalStyles";
import { wrapper } from "../store/store";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={roboto.className}>
        <GlobalStyles />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default wrapper.withRedux(App);
