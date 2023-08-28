import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import { AnimatePresence } from "framer-motion";
import Loading from "./pages/Loading/Loading";
import Main from "./pages/Main/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;

function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
