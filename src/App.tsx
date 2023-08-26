import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import { AnimatePresence } from "framer-motion";
import Loading from "./pages/Loading/Loading";

function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<></>} />
              <Route path="loading" element={<Loading />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;

function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
