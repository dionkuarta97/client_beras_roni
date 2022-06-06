import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllLangganan } from "../redux/penjualan/PenjualanAction";

const Pelanggan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { langganan } = useSelector((state) => state.PenjualanReducer);
  useEffect(() => {
    dispatch(getAllLangganan());
  }, []);

  console.log(langganan);
  return (
    <>
      <Button
        style={{
          marginBottom: "1rem",
        }}
        onClick={() => navigate(-1)}
        variant="success"
      >
        Kembali
      </Button>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">List Pelanggan</h3>
        </div>
        <div className="card-body">
          <h1>Pelanggan</h1>
        </div>
      </div>
    </>
  );
};

export default Pelanggan;
