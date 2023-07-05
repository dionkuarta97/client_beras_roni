import { useEffect, useState } from "react";
import { Button, Table, Form, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertError, alertSuccess, alertSure } from "../assets/js/Sweetalert";
import ModalCategory from "../components/forms/ModalCategory";
import LinearProgress from "@mui/material/LinearProgress";
import { deleteCategory, getCategory } from "../redux/category/CategoryAction";
import TablePagination from "@mui/material/TablePagination";
import ModalEditCategory from "../components/forms/ModalEditCategory";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.CategoryReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getCategory({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [page]);

  useEffect(() => {
    dispatch(
      getCategory({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [rowsPerPage]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const totalBerat = (arr) => {
    let temp = 0;
    for (const i in arr) {
      temp += Number(arr[i]["berat"]);
    }
    return temp;
  };
  const totalHarga = (arr) => {
    let temp = 0;
    for (const i in arr) {
      temp += Number(arr[i]["harga"]);
    }
    return temp;
  };

  const totalStock = (arr) => {
    let temp = 0;
    for (const i in arr) {
      temp += Number(arr[i]["stock"]);
    }
    return temp;
  };

  const totalModalKelola = (ary) => {
    let temp = 0;

    for (const i in ary) {
      let arr = ary[i]["beras_kelola"];
      for (const key in arr) {
        let { modal_campuran, modal_kelola } = arr[key];
        let temp1 = 0;
        for (const val in modal_kelola) {
          temp1 +=
            Number(modal_kelola[val]["harga"]) * Number(arr[key]["berat"]);
        }
        let temp2 = 0;
        for (const v in modal_campuran) {
          temp2 +=
            Number(modal_campuran[v]["harga"]) *
            Number(modal_campuran[v]["berat"]);
        }

        temp += temp1 + temp2;
      }
    }

    return temp;
  };

  const totalModalDatang = (arr) => {
    let temp = 0;
    for (const i in arr) {
      let modal_datang = arr[i]["modal_datang"];
      for (const j in modal_datang) {
        temp += Number(modal_datang[j]["harga"]) * Number(arr[i]["berat"]);
      }
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

  console.log(category);
  return (
    <>
      {category.loading && <LinearProgress color="inherit" />}
      {!category.loading && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tabel Category</h3>
          </div>
          <div className="card-body">
            <Button
              onClick={handleShow}
              style={{
                marginBottom: "1rem",
              }}
            >
              Tambah Category
            </Button>
            <ModalCategory
              page={() => setPage(0)}
              perPage={() => setRowsPerPage(10)}
              show={show}
              handleClose={handleClose}
            />

            <Form.Group
              style={{
                marginBottom: "1rem",
              }}
            >
              <Form.Control
                value={search}
                placeholder="Pencarian"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                }}
              />
            </Form.Group>

            <Button
              variant="warning"
              style={{ marginRight: "1rem", marginBottom: "1rem" }}
              onClick={() => {
                dispatch(
                  getCategory({
                    page: 1,
                    limit: 10,
                    nama: search,
                  })
                ).catch(() => {
                  alertError("data tidak di temukan");
                  dispatch(
                    getCategory({
                      page: 1,
                      limit: 10,
                    })
                  );
                });
              }}
            >
              Cari
            </Button>

            <Button
              style={{ marginBottom: "1rem" }}
              variant="info"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Refersh
            </Button>

            <Table striped bordered hover responsive className="text-nowrap">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Berat</th>
                  <th>Stock</th>
                  <th>Nilai Aset</th>
                  <th>Penjualan</th>
                  <th>Keuntungan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.data?.data.map((el, idx) => (
                  <tr key={el.id}>
                    <td>
                      {category.data?.current_page * category.data?.per_page -
                        category.data?.per_page +
                        (idx + 1)}
                    </td>
                    <td>{el.nama}</td>
                    <td>{totalBerat(el.modal).toLocaleString("id-ID")} Kg</td>
                    <td>
                      {totalStock(el.modal) > 0 ? (
                        totalStock(el.modal).toLocaleString("id-ID") + " Kg"
                      ) : (
                        <Badge bg="danger">Habis</Badge>
                      )}
                    </td>
                    <td>
                      Rp.{" "}
                      {(
                        totalHarga(el.modal) +
                        totalModalKelola(el.modal) +
                        totalModalDatang(el.modal)
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
                    <td>
                      <Button
                        variant="danger"
                        style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                        onClick={async () => {
                          const result = await alertSure();
                          if (result.value) {
                            dispatch(deleteCategory(el.id))
                              .then((data) => {
                                alertSuccess(data.message);
                              })
                              .catch((err) => {
                                if (err.message) {
                                  alertError(err.message);
                                } else {
                                  alertError("terjadi kesalahan");
                                }
                              });
                            setPage(0);
                            setRowsPerPage(10);
                            setSearch("");
                          }
                        }}
                      >
                        Hapus
                      </Button>
                      <ModalEditCategory
                        id={el.id}
                        page={() => setPage(0)}
                        editNama={el.nama}
                        perPage={() => setRowsPerPage(10)}
                      />
                      <Button
                        style={{ marginTop: "0.5rem" }}
                        onClick={() => {
                          navigate("/modal/" + el.id, {
                            state: { category: el.nama },
                          });
                        }}
                        variant="info"
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div align="center">
              <TablePagination
                count={category.data?.total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
