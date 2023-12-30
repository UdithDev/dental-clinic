import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Inventory from "./pages/inventory";

function App() {
  return (
    <>
      <Header />
      <main className="">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </Layout>
      </main>
      <Footer />
    </>
  );
}

export default App;
