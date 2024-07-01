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
import Unauthorized from "./components/Unauth";
import AddUser from "./pages/AddUser";

function App() {
  const user = useUser();

  return (
    <>
      {!user?.user ? (
        <>
          <Routes>
            {/* Protected Rooutes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
                {/* Intern */}
                {user.user.role === "INTERN" &&
                  <>
                    <Route path="/inventory" element={<Inventory />} />
                    {/* Unauthorized */}
                    <Route path="/*" element={<Unauthorized />} />
                  </>
                }

                {/* Manager */}
                {(user.user.role === "MANAGER" ||
                  user.user.role === "ADMIN") && (
                  <>
                    <Route path="/inventory" element={<Inventory />} />
                    <Route
                      path="/inventory/update/:id"
                      element={<UpdateItem />}
                    />
                     <Route path="/*" element={<Unauthorized />} />
                  </>
                )}

                {/* Admin */}
                {user.user.role === "ADMIN" && (
                  <>
                    <Route path="/adduser" element={<AddUser />} />
                  </>
                )}
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
