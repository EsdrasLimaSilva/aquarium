import "../styles/globals.css";
import type { AppProps } from "next/app";
import { storeWrapper } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
