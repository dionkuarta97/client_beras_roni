import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorySelect } from "../redux/category/CategoryAction";
import SelectSearch from "react-select-search";
import {
  getKelolaBeras,
  getSelectModal,
  setKelolaBEras,
} from "../redux/modal/ModalAction";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import ModalTambahCampuran from "../components/forms/ModalTmbahCampuran";

const CampurBeras = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { categorySelect } = useSelector((state) => state.CategoryReducer);
  const { selectModal, kelolaBeras } = useSelector(
    (state) => state.ModalReducer
  );
  const [value, setValue] = useState("");
  const [valueModal, setValueModal] = useState("");

  const navigate = useNavigate();

  const totalHargaBeras = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += Number(arr[key]["harga"]);
    }
    return temp;
  };

  useEffect(() => {
    dispatch(getCategorySelect());
  }, []);

  console.log(kelolaBeras);

  useEffect(() => {
    if (value !== "") {
      const val = JSON.parse(value);
      dispatch(getSelectModal(val.id));
      dispatch(setKelolaBEras({ data: null, loading: false, error: null }));
      setValueModal(0);
    }
  }, [value]);

  useEffect(() => {
    if (valueModal > 0) {
      dispatch(getKelolaBeras(valueModal, { status: "ready", stock: "ada" }));
    }
  }, [valueModal]);

  return (
    <>
      <Button
        style={{
          marginBottom: "1rem",
        }}
        onClick={() => navigate("/campuran")}
        variant="success"
      >
        Kembali
      </Button>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Campur Beras</h3>
        </div>
        <div className="card-body">
          {categorySelect.loading && (
            <LinearProgress
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              color="inherit"
            />
          )}
          <label>Kategori Beras</label>
          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="form-control"
            style={{ width: "100%" }}
          >
            <option value={0}>---Pilih---</option>
            {categorySelect.data !== null &&
              categorySelect.data.map((el, idx) => (
                <option
                  key={el.id + "kategori"}
                  value={JSON.stringify({ id: el.id, nama: el.nama })}
                >
                  {el.nama}
                </option>
              ))}
          </select>
          {selectModal.loading && (
            <LinearProgress
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              color="inherit"
            />
          )}
          {selectModal.data !== null && (
            <>
              <label
                style={{
                  marginTop: "1rem",
                }}
              >
                Tanggal masuk beras
              </label>
              <select
                value={valueModal}
                onChange={(e) => {
                  setValueModal(e.target.value);
                }}
                className="form-control"
                style={{ width: "100%" }}
              >
                <option value={0}>---Pilih---</option>
                {selectModal.data !== null &&
                  selectModal.data.map((el, idx) => (
                    <option key={el.id + "kategori"} value={el.id}>
                      {el.keterangan}
                      {" : "}
                      {new Date(el.created_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </option>
                  ))}
              </select>
            </>
          )}

          {kelolaBeras.data && (
            <>
              {kelolaBeras.data?.length === 0 ? (
                <div
                  align="center"
                  style={{
                    color: "red",
                    marginTop: "5rem",
                    marginBottom: "5rem",
                  }}
                >
                  <h5>Belum ada beras yang di kelola</h5>
                </div>
              ) : (
                <Table
                  style={{ marginTop: "2rem" }}
                  responsive
                  className="text-nowrap"
                >
                  <thead>
                    <tr>
                      <th>Keterangan</th>
                      <th>Harga</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kelolaBeras.data?.map((el, idx) => (
                      <tr key={el.id + "mantap"}>
                        <td>{el.keterangan}</td>
                        <td>
                          Rp.{" "}
                          {(
                            Number(el.harga) + totalHargaBeras(el.modal_kelola)
                          ).toLocaleString("id-ID")}{" "}
                          /Kg
                        </td>
                        <td>{Number(el.stock).toLocaleString("id-ID")}</td>
                        <td>
                          <ModalTambahCampuran
                            data={el}
                            harga={
                              Number(el.harga) +
                              totalHargaBeras(el.modal_kelola)
                            }
                            id={state.id}
                            kategori={value}
                            idModal={valueModal}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CampurBeras;
