import { Stack, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alertError } from "../assets/js/Sweetalert";
import { setKelolaBEras, setSelectModal } from "../redux/modal/ModalAction";
import { getAllPenjual } from "../redux/penjualan/PenjualanAction";

const Penjualan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { penjualan } = useSelector((state) => state.PenjualanReducer);
  const [langganan, setLangganan] = useState(true);
  const [params, setParams] = useState({
    status: "",
    tipe: "biasa",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getAllPenjual({
        ...params,
        page: page + 1,
        limit: rowsPerPage,
      })
    ).catch(() => {
      alertError("Terjadi Kesalahan");
    });
  }, [page]);

  useEffect(() => {
    dispatch(
      getAllPenjual({
        ...params,
        page: page + 1,
        limit: rowsPerPage,
      })
    ).catch(() => {
      alertError("Terjadi Kesalahan");
    });
  }, [rowsPerPage]);
  useEffect(() => {
    setLangganan(true);
    dispatch(getAllPenjual(params));
  }, []);

  const tabel = () => {
    return (
      <>
        <Col md={6} xs={12} style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <Form>
            <Form.Select
              value={params.tipe}
              onChange={(e) => {
                setParams({ ...params, tipe: e.target.value });
                dispatch(getAllPenjual({ ...params, tipe: e.target.value }));
              }}
            >
              <option value={"biasa"}>Beras Biasa</option>
              <option value={"campuran"}>Beras Campuran</option>
            </Form.Select>
          </Form>
        </Col>
        <Table striped bordered hover responsive className="text-nowrap">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Keterangan</th>
              <th>Tanggal</th>
              <th>User</th>
              <th>Pembeli</th>
              <th>Berat</th>
              <th>Total Penjualan</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {penjualan.data?.data.map((el, idx) => (
              <tr key={el.id}>
                <td>
                  {penjualan.data?.current_page * penjualan.data?.per_page -
                    penjualan.data?.per_page +
                    (idx + 1)}
                </td>
                <td>
                  {el.category === null ? "Beras Campuran" : el.category.nama}
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
                <td>{el.nama_pembuat}</td>
                <td>
                  {el.nama_pembeli === null ? "Tanpa Nama" : el.nama_pembeli}
                </td>
                <td>{Number(el.bobot).toLocaleString("id-ID")} Kg</td>
                <td>
                  Rp. {Number(el.harga_jual * el.bobot).toLocaleString("id-ID")}
                </td>
                <td>
                  {el.status === "pending" ? (
                    <Badge bg="warning">Pending</Badge>
                  ) : el.status === "success" ? (
                    <Badge bg="success">Success</Badge>
                  ) : (
                    <Badge bg="danger">Gagal</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() =>
                      navigate("/penjualan/detail/" + el.id, {
                        state: { tipe: el.tipe },
                      })
                    }
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
            count={penjualan.data?.total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Penjualan</h3>
        </div>
        <div className="card-body">
          {langganan && (
            <>
              <Stack spacing={3} alignItems="center">
                <span>Apakah untuk langganan?</span>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <Button
                    variant="success"
                    onClick={() => {
                      navigate("/penjualan/pelanggan");
                    }}
                  >
                    YA
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setLangganan(false);
                    }}
                  >
                    TIDAK
                  </Button>
                </Stack>
              </Stack>
            </>
          )}

          {!langganan && (
            <>
              <Stack spacing={3} alignItems="center">
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate("/penjualan/biasa");
                      dispatch(
                        setSelectModal({
                          data: null,
                          loading: false,
                          error: null,
                        })
                      );
                      dispatch(
                        setKelolaBEras({
                          data: null,
                          loading: false,
                          error: null,
                        })
                      );
                    }}
                    variant="success"
                  >
                    Beras Biasa
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      navigate("/penjualan/campur");
                    }}
                  >
                    Beras Campur
                  </Button>
                </Stack>
                <Button
                  size="sm"
                  onClick={() => {
                    setLangganan(true);
                  }}
                >
                  Batal
                </Button>
              </Stack>
            </>
          )}
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">
          <h3 className="card-title">Riwayat Penjualan</h3>
        </div>
        <Tabs
          defaultActiveKey=""
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(key) => {
            setParams({ ...params, status: key, tipe: "biasa" });
            dispatch(getAllPenjual({ ...params, status: key, tipe: "biasa" }));
            setRowsPerPage(10);
            setPage(0);
          }}
        >
          <Tab eventKey="" title="Semua">
            <div className="card-body">{tabel()}</div>
          </Tab>
          <Tab eventKey="pending" title="Pending">
            <div className="card-body">{tabel()}</div>
          </Tab>
          <Tab eventKey="success" title="Success">
            <div className="card-body">{tabel()}</div>
          </Tab>
          <Tab eventKey="gagal" title="Gagal">
            <div className="card-body">{tabel()}</div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Penjualan;
