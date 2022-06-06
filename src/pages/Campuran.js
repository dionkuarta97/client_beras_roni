import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCampuran from "../components/forms/ModalCampuran";
import { getBerasCampuran } from "../redux/modal/ModalAction";
import TablePagination from "@mui/material/TablePagination";
import { Table } from "react-bootstrap";
import ListBerasCampuran from "../components/popup/ListBerasCampuran";
import ListModalKelola from "../components/popup/ListModalKelola";

const Campuran = () => {
  const dispatch = useDispatch();
  const { berasCampuran } = useSelector((state) => state.ModalReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useState(() => {
    dispatch(getBerasCampuran());
  }, []);

  const totalHargaBeras = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += arr[key]["harga"];
    }
    return temp;
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Campuran</h3>
        </div>
        <div className="card-body">
          <ModalCampuran />
          <Table
            style={{ marginTop: "2rem" }}
            striped
            bordered
            hover
            responsive
            className="text-nowrap"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Keterangan</th>
                <th>Harga</th>
                <th>Berat</th>
                <th>Stock</th>
                <th>Campuran</th>
                <th>Modal</th>
              </tr>
            </thead>
            <tbody>
              {berasCampuran.data?.data.map((el, idx) => (
                <tr key={el.id + "beras_campuran"}>
                  <td>{idx + 1}</td>
                  <td>{el.keterangan}</td>
                  <td>
                    Rp.{" "}
                    {(
                      el.harga + totalHargaBeras(el.modal_kelola)
                    ).toLocaleString("id-ID")}{" "}
                    /Kg
                  </td>
                  <td>{el.berat.toLocaleString("id-ID")} Kg</td>
                  <td>{el.stock.toLocaleString("id-ID")} Kg</td>
                  <td>
                    <ListBerasCampuran campuran={el.campuran} id={el.id} />
                  </td>
                  <td>
                    <ListModalKelola
                      data={el.modal_kelola}
                      idBerasKelola={el.id}
                      berat={el.berat}
                      campuran={el.campuran}
                      from={true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Campuran;
