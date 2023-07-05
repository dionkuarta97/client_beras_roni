import { LinearProgress, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge, Button, Table, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { alertError, alertSuccess, alertSure } from "../assets/js/Sweetalert";
import ModalTambahModal from "../components/forms/ModalTambahModal";
import { getModal, updateStatusModal } from "../redux/modal/ModalAction";

const ProdukModal = () => {
  const { id } = useParams();
  const { state } = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ModalReducer);
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getModal({
        page: page + 1,
        limit: rowsPerPage,
        category: id,
      })
    );
  }, [page]);

  useEffect(() => {
    dispatch(
      getModal({
        page: page + 1,
        limit: rowsPerPage,
        category: id,
      })
    );
  }, [rowsPerPage]);

  useEffect(() => {
    dispatch(getModal({ category: id }));
  }, []);

  const totalModalDatang = (arr, berat) => {
    let temp = 0;
    for (const key in arr) {
      temp += Number(arr[key]["harga"]) * Number(berat);
    }
    return temp;
  };

  const totalModalKelola = (arr) => {
    let temp = 0;
    for (const key in arr) {
      let { modal_campuran, modal_kelola } = arr[key];
      let temp1 = 0;
      for (const val in modal_kelola) {
        temp1 += Number(modal_kelola[val]["harga"]) * Number(arr[key]["berat"]);
      }
      let temp2 = 0;
      for (const v in modal_campuran) {
        temp2 +=
          Number(modal_campuran[v]["harga"]) *
          Number(modal_campuran[v]["berat"]);
      }

      temp += temp1 + temp2;
    }
    return temp;
  };

  const totalPenjualan = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += Number(arr[key]["bobot"]) * Number(arr[key]["harga_jual"]);
    }
    return temp;
  };

  const totalModal = (arr) => {
    let temp = 0;
    let temp2 = 0;
    for (const key in arr) {
      let { modal_penjualan } = arr[key];
      temp2 += Number(arr[key]["harga_modal"]) * Number(arr[key]["bobot"]);
      for (const i in modal_penjualan) {
        temp2 +=
          Number(arr[key]["bobot"]) * Number(modal_penjualan[i]["harga"]);
      }
    }
    return temp + temp2;
  };

  console.log(modal);

  return (
    <>
      <Button
        style={{
          marginBottom: "1rem",
        }}
        onClick={() => navigate("/modal")}
        variant="success"
      >
        Kembali
      </Button>
      {modal.loading && <LinearProgress color="inherit" />}

      <div className="card">
        <div className="card-header">
          <h2>
            <b>Tabel {state.category}</b>
          </h2>
        </div>
        <div className="card-body">
          <ModalTambahModal
            id={id}
            params={{ category: id, stock: "ada", status: status }}
          />

          <Table striped bordered hover responsive className="text-nowrap">
            <thead>
              <tr>
                <th>No</th>
                <th>Keterangan</th>
                <th>Tanggal Masuk</th>
                <th>Stock</th>
                <th>Nilai Aset</th>
                <th>Penjualan</th>
                <th>Keuntungan</th>
                <th>User</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modal.data?.data.map((el, idx) => (
                <tr key={el.id}>
                  <td>
                    {modal.data?.current_page * modal.data?.per_page -
                      modal.data?.per_page +
                      (idx + 1)}
                  </td>
                  <td>{el.keterangan}</td>
                  <td>
                    {new Date(el.created_at).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {el.stock === 0 ? (
                      <Badge bg="danger">Habis</Badge>
                    ) : el.stock <= 10 ? (
                      <Badge bg="warning">
                        {el.stock.toLocaleString("id-ID")}
                      </Badge>
                    ) : (
                      <Badge bg="success">
                        {el.stock.toLocaleString("id-ID")}
                      </Badge>
                    )}
                  </td>
                  <td>
                    Rp.{" "}
                    {(
                      Number(el.harga) +
                      totalModalDatang(el.modal_datang, el.berat) +
                      totalModalKelola(el.beras_kelola)
                    ).toLocaleString("id-ID")}
                  </td>
                  <td>
                    Rp.{" "}
                    {Number(
                      totalPenjualan(el.penjualan).toFixed(2)
                    ).toLocaleString("id-ID")}
                  </td>
                  <td>
                    Rp.{" "}
                    {(
                      totalPenjualan(el.penjualan) - totalModal(el.penjualan)
                    ).toLocaleString("id-ID")}
                  </td>
                  <td>{el.nama_pembuat}</td>

                  <td>
                    {el.status === "ready" ? (
                      <Badge bg="dark">ready</Badge>
                    ) : el.status === "active" ? (
                      <Badge bg="success">active</Badge>
                    ) : (
                      <Badge bg="danger">inactive</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() =>
                        navigate("/modal/detail", {
                          state: {
                            idModal: el.id,
                            category: state.category,
                            id: id,
                          },
                        })
                      }
                    >
                      Detail
                    </Button>

                    {el.status === "active" ? (
                      <Button
                        style={{ marginLeft: "0.5rem" }}
                        size="sm"
                        variant="danger"
                        onClick={async () => {
                          const result = await alertSure();
                          if (result.value) {
                            setStatus("");
                            dispatch(
                              updateStatusModal(
                                { status: "inactive", id: el.id },
                                id
                              )
                            )
                              .then(() => {
                                alertSuccess("data berhasil di inactive kan");
                              })
                              .catch(() => {
                                alertError("terjadi kesalahan");
                              });
                          }
                        }}
                      >
                        Hide
                      </Button>
                    ) : el.status === "inactive" ? (
                      <Button
                        style={{ marginLeft: "0.5rem" }}
                        size="sm"
                        variant="success"
                        onClick={async () => {
                          const result = await alertSure();
                          if (result.value) {
                            setStatus("");
                            dispatch(
                              updateStatusModal(
                                { status: "active", id: el.id },
                                id
                              )
                            )
                              .then(() => {
                                alertSuccess("data berhasil di active kan");
                              })
                              .catch(() => {
                                alertError("terjadi kesalahan");
                              });
                          }
                        }}
                      >
                        Active
                      </Button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div align="center">
            <TablePagination
              count={modal.data?.total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdukModal;
