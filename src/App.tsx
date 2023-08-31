import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import { AnimatePresence } from "framer-motion";
import Loading from "./pages/Loading/Loading";
import Main from "./pages/Main/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Layout>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Main />} />
              <Route path="loading" element={<Loading />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </Layout>
    </PersistQueryClientProvider>
  );
}

export default App;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <div className={styles.container}>{children}</div>
    </ReactLenis>
  );
}
