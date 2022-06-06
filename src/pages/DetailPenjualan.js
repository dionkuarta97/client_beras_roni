import { LinearProgress, Stack } from "@mui/material";
import { useEffect } from "react";
import { Button, Row, Table, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { alertError, alertSuccess, alertSure } from "../assets/js/Sweetalert";
import ModalModalPenjualan from "../components/forms/ModalModalPenjualan";
import {
  getDetialPenjualan,
  updatePenjualan,
} from "../redux/penjualan/PenjualanAction";

const DetailPenjualan = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { detailPenjualan } = useSelector((state) => state.PenjualanReducer);

  useEffect(() => {
    dispatch(getDetialPenjualan(id, { tipe: state.tipe }));
  }, []);

  console.log(detailPenjualan);

  const totalModalPenjualan = (arr, bobot) => {
    let temp = 0;
    for (const key in arr) {
      temp += arr[key]["harga"] * bobot;
    }

    return temp;
  };

  return (
    <>
      <div align="center">
        <div className="card col-md-8" align="left">
          <div className="card-header">
            <h3 className="card-title">Detail Penjualan</h3>
          </div>
          <div className="card-body">
            {detailPenjualan.loading ? (
              <LinearProgress color="inherit" />
            ) : (
              <>
                <strong>Tipe Beras</strong>
                <p className="text-muted">
                  Beras{" "}
                  {detailPenjualan.data?.penjualan.tipe
                    ? detailPenjualan.data?.penjualan.tipe
                    : "biasa"}
                </p>
                <hr />
                <strong>Keterangan</strong>
                <p className="text-muted">
                  {detailPenjualan.data?.penjualan.keterangan}
                </p>
                <hr />
                <strong>Berat</strong>
                <p className="text-muted">
                  {Number(detailPenjualan.data?.penjualan.bobot).toLocaleString(
                    "id-ID"
                  )}{" "}
                  Kg
                </p>
                <hr />
                <strong>Harga Jual</strong>
                <p className="text-muted">
                  Rp.{" "}
                  {Number(
                    detailPenjualan.data?.penjualan.harga_jual
                  ).toLocaleString("id-ID")}
                </p>
                <hr />
                <strong>Harga Modal</strong>
                <p className="text-muted">
                  Rp.{" "}
                  {Number(
                    detailPenjualan.data?.penjualan.harga_modal
                  ).toLocaleString("id-ID")}
                </p>
                <hr />
                <strong>Modal Tambahan</strong>
                <br />
                {detailPenjualan.data?.penjualan.status === "pending" && (
                  <ModalModalPenjualan
                    idPenjualan={detailPenjualan.data?.penjualan.id}
                  />
                )}

                {detailPenjualan.data?.penjualan.modal_penjualan.length ===
                0 ? (
                  <div align="center" style={{ color: "red", padding: "3rem" }}>
                    <h5>Tidak Ada Modal Tambahan</h5>
                  </div>
                ) : (
                  <>
                    <Table
                      style={{ marginTop: "2rem" }}
                      responsive
                      className="text-nowrap"
                    >
                      <thead>
                        <tr>
                          <th>Keterangan</th>
                          <th>Harga</th>
                          <th>Total</th>
                          <th>Pembuat</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailPenjualan.data?.penjualan.modal_penjualan.map(
                          (el, idx) => (
                            <tr key={el.id}>
                              <td>{el.keterangan}</td>
                              <td>
                                Rp. {Number(el.harga).toLocaleString("id-ID")} /
                                Kg
                              </td>
                              <td>
                                Rp.{" "}
                                {Number(
                                  el.harga *
                                    detailPenjualan.data?.penjualan.bobot
                                ).toLocaleString("id-ID")}
                              </td>
                              <td>{el.nama_pembuat}</td>
                              <td>
                                <Button variant="warning">Edit</Button>
                                <Button
                                  style={{ marginLeft: "0.5rem" }}
                                  variant="danger"
                                >
                                  Sembunyikan
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </>
                )}
                <hr />
                <strong>Keuntungan</strong>
                <Row style={{ marginTop: "1rem" }}>
                  <Col md={6} xs={6}>
                    <strong>Total Jual</strong>
                  </Col>
                  <Col md={6} xs={6}>
                    <p className="text-muted">
                      Rp.{" "}
                      {(
                        detailPenjualan.data?.penjualan.harga_jual *
                        detailPenjualan.data?.penjualan.bobot
                      ).toLocaleString("id-ID")}
                    </p>
                  </Col>
                  <Col md={6} xs={6}>
                    <strong>Total Modal</strong>
                  </Col>
                  <Col md={6} xs={6}>
                    <p className="text-muted">
                      Rp.{" "}
                      {(
                        detailPenjualan.data?.penjualan.harga_modal *
                        detailPenjualan.data?.penjualan.bobot
                      ).toLocaleString("id-ID")}
                    </p>
                  </Col>
                  <Col md={6} xs={6}>
                    <strong>Total Modal Tambahan</strong>
                  </Col>
                  <Col md={6} xs={6}>
                    <p className="text-muted">
                      Rp.{" "}
                      {totalModalPenjualan(
                        detailPenjualan.data?.penjualan.modal_penjualan,
                        detailPenjualan.data?.penjualan.bobot
                      ).toLocaleString("id-ID")}
                    </p>
                  </Col>
                  <Col style={{ marginTop: "1rem" }} md={6} xs={6}>
                    <strong>Total Keuntungan</strong>
                  </Col>
                  <Col md={6} xs={6}>
                    <p className="text-muted">
                      Rp.{" "}
                      {(
                        detailPenjualan.data?.penjualan.harga_jual *
                          detailPenjualan.data?.penjualan.bobot -
                        detailPenjualan.data?.penjualan.harga_modal *
                          detailPenjualan.data?.penjualan.bobot -
                        totalModalPenjualan(
                          detailPenjualan.data?.penjualan.modal_penjualan,
                          detailPenjualan.data?.penjualan.bobot
                        )
                      ).toLocaleString("id-ID")}
                    </p>
                  </Col>
                </Row>
                <hr />
                <strong>Jenis Pembayaran</strong>
                <p style={{ color: "green" }}>
                  <b>{detailPenjualan.data?.penjualan.jenis_pembayaran}</b>
                </p>
                <hr />
                <strong>Status</strong>
                <h4>
                  {detailPenjualan.data?.penjualan.status === "pending" ? (
                    <Badge bg="warning">Pending</Badge>
                  ) : detailPenjualan.data?.penjualan.status === "success" ? (
                    <Badge bg="success">Success</Badge>
                  ) : (
                    <Badge bg="danger">Gagal</Badge>
                  )}
                </h4>
                <hr />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  justifyContent={"center"}
                  mb="3rem"
                  mt="3rem"
                >
                  {detailPenjualan.data?.penjualan.status === "pending" ? (
                    <>
                      <Button
                        variant="success"
                        onClick={async () => {
                          const result = await alertSure();
                          const payload = {
                            keuntungan:
                              detailPenjualan.data?.penjualan.harga_jual *
                                detailPenjualan.data?.penjualan.bobot -
                              detailPenjualan.data?.penjualan.harga_modal *
                                detailPenjualan.data?.penjualan.bobot -
                              totalModalPenjualan(
                                detailPenjualan.data?.penjualan.modal_penjualan,
                                detailPenjualan.data?.penjualan.bobot
                              ),
                            status: "success",
                            beras_kelola: detailPenjualan.data?.beras_kelola,
                            penjualan: detailPenjualan.data?.penjualan,
                          };
                          if (result.value) {
                            dispatch(updatePenjualan(payload))
                              .then(() => {
                                alertSuccess("Berhasil");
                                navigate("/penjualan");
                              })
                              .catch((err) => {
                                console.log(err);
                                alertError("Gagal");
                              });
                          }
                        }}
                      >
                        Konfirmasi
                      </Button>
                      <Button
                        variant="danger"
                        onClick={async () => {
                          const result = await alertSure();
                          const payload = {
                            status: "gagal",
                            beras_kelola: detailPenjualan.data?.beras_kelola,
                            penjualan: detailPenjualan.data?.penjualan,
                          };
                          if (result.value) {
                            dispatch(updatePenjualan(payload))
                              .then(() => {
                                alertSuccess("Berhasil");
                                navigate("/penjualan");
                              })
                              .catch((err) => {
                                console.log(err);
                                alertError("Gagal");
                              });
                          }
                        }}
                      >
                        Batalkan
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => navigate("/penjualan")}
                      >
                        Kembali Ke Penjualan
                      </Button>
                    </>
                  ) : (
                    <>
                      {state.from === "modal" ? (
                        <Button variant="primary" onClick={() => navigate(-1)}>
                          Kembali Ke Modal
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={() => navigate(-1)}>
                          Kembali Ke Penjualan
                        </Button>
                      )}
                    </>
                  )}
                </Stack>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPenjualan;
