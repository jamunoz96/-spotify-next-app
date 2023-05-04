import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { SpotifyProvider } from "../context/SpotifyContext";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import "../styles/nonTailwind.css";

nProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps?.session}>
      <Provider store={store}>
        <SpotifyProvider>
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <>
              <Sidebar />
              <div className="flex flex-col ml-64">
                <Header />
                <main className="mt-4 ml-4">
                  <Component {...pageProps} />
                </main>
              </div>
            </>
          )}
        </SpotifyProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
