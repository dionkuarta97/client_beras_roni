import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCampuran from "../components/forms/ModalCampuran";
import {
  getBerasCampuran,
  updateBerasKelola,
} from "../redux/modal/ModalAction";
import TablePagination from "@mui/material/TablePagination";
import { Badge, Table, Button } from "react-bootstrap";
import ListBerasCampuran from "../components/popup/ListBerasCampuran";
import ListModalKelola from "../components/popup/ListModalKelola";
import { alertError, alertSuccess, alertSure } from "../assets/js/Sweetalert";

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
      temp += Number(arr[key]["harga"]);
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
                <th>status</th>
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
                      Number(el.harga) + totalHargaBeras(el.modal_kelola)
                    ).toLocaleString("id-ID")}{" "}
                    /Kg
                  </td>
                  <td>{Number(el.berat).toLocaleString("id-ID")} Kg</td>
                  <td>{Number(el.stock).toLocaleString("id-ID")} Kg</td>
                  <td>
                    <ListBerasCampuran campuran={el.campuran} id={el.id} />
                  </td>
                  <td>
                    <ListModalKelola
                      data={el.modal_kelola}
                      idBerasKelola={el.id}
                      berat={Number(el.berat)}
                      status={el.status}
                      campuran={el.campuran}
                      from={true}
                    />
                  </td>
                  <td>
                    {el.status === "active" ? (
                      <>
                        <Badge bg="warning">Belum Siap</Badge>
                        <Button
                          variant="success"
                          size="sm"
                          style={{ marginLeft: "0.5rem" }}
                          onClick={async () => {
                            const result = await alertSure();
                            if (result.value) {
                              dispatch(
                                updateBerasKelola({
                                  id: el.id,
                                  keterangan: el.keterangan,
                                  berat: el.berat,
                                  campuran: el.campuran,
                                  status: "ready",
                                })
                              )
                                .then((msg) => {
                                  alertSuccess(msg);
                                })
                                .catch((msg) => {
                                  alertError(msg);
                                });
                            }
                          }}
                        >
                          Konfirmasi
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ marginLeft: "0.5rem" }}
                          onClick={async () => {
                            const result = await alertSure();
                            if (result.value) {
                              dispatch(
                                updateBerasKelola({
                                  id: el.id,
                                  keterangan: el.keterangan,
                                  berat: el.berat,
                                  campuran: el.campuran,
                                  status: "inactive",
                                })
                              )
                                .then((msg) => {
                                  alertSuccess(msg);
                                })
                                .catch((msg) => {
                                  alertError(msg);
                                });
                            }
                          }}
                        >
                          Hide
                        </Button>
                      </>
                    ) : (
                      <Badge bg="success">Sudah Siap</Badge>
                    )}
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
