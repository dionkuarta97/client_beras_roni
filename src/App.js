import Header from "./components/template/Header";
import Navbar from "./components/template/Navbar";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";
import Modal from "./pages/Modal";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import ProdukModal from "./pages/ProdukModal";
import DetailModal from "./pages/DetailModal";
import Dashboard from "./pages/Dashboard";
import Campuran from "./pages/Campuran";
import CampurBeras from "./pages/CampurBeras";
import Penjualan from "./pages/Penjualan";
import BerasCampur from "./pages/BerasCampur";
import DetailPenjualan from "./pages/DetailPenjualan";
import BerasBiasa from "./pages/BerasBiasa";
import Pelanggan from "./pages/Pelanggan";
function App() {
  const { login } = useSelector((state) => state.AuthReducer);
  return (
    <div className="wrapper">
      <Header />
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            login.data !== null ? (
              <Navigate to={"/"} />
            ) : (
              <Content title="Login">
                <Login />
              </Content>
            )
          }
        />
        <Route
          path="/"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Dashboard">
                <Dashboard />
              </Content>
            )
          }
        />
        <Route
          path="/modal"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Manajemen Modal">
                <Modal />
              </Content>
            )
          }
        />
        <Route
          path="/modal/:id"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="List Beras Masuk">
                <ProdukModal />
              </Content>
            )
          }
        />
        <Route
          path="/modal/detail"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Detail Beras Masuk">
                <DetailModal />
              </Content>
            )
          }
        />
        <Route
          path="/campuran"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Beras Campuran">
                <Campuran />
              </Content>
            )
          }
        />
        <Route
          path="/tambah_campuran"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Campur Beras">
                <CampurBeras />
              </Content>
            )
          }
        />
        <Route
          path="/penjualan"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Penjualan">
                <Penjualan />
              </Content>
            )
          }
        />
        <Route
          path="/penjualan/campur"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Beras Campur">
                <BerasCampur />
              </Content>
            )
          }
        />
        <Route
          path="/penjualan/pelanggan"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Pelanggan">
                <Pelanggan />
              </Content>
            )
          }
        />
        <Route
          path="/penjualan/biasa"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Beras Biasa">
                <BerasBiasa />
              </Content>
            )
          }
        />
        <Route
          path="/penjualan/detail/:id"
          element={
            login.data === null ? (
              <Navigate to={"/login"} />
            ) : (
              <Content title="Penjualan">
                <DetailPenjualan />
              </Content>
            )
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
