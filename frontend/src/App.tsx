import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Inventory from "./pages/inventory";
import Login from "./pages/Login";
import useUser from "./hooks/useUser";
import UpdateItem from "./components/inventory/UpdateItem";
import Register from "./pages/register";


function App() {
  const user = useUser();

  return (
    <>
      {!user?.user ? (
        <>
          <Routes>
            {/* Protected Rooutes */}
            <Route path="/" element={<Login />} />
          </Routes>
        </>
      ) : (
        <>
          <Header />
          <main className="">
            <Layout>
              <Routes>
                {/* Protected Rooutes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/update/:id" element={<UpdateItem />} />
              </Routes>
            </Layout>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
