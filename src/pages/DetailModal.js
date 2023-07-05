import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { alertError, alertSuccess, alertSure } from "../assets/js/Sweetalert";
import BerasKelola from "../components/BerasKelola";
import ModalEditBagI from "../components/forms/ModalEditBagI";
import ModalEditBagII from "../components/forms/ModalEditBagII";
import ModalTambahModalDatang from "../components/forms/ModalTambahModalDatang";
import ModalEditModalDatang from "../components/newForms/ModalEditModalDatang";
import PenjualanContent from "../components/PenjualanContent";
import {
  detailModal,
  getKelolaBeras,
  getModalDatang,
  updateModalDatang,
  updateStatusModal,
} from "../redux/modal/ModalAction";

const DetailModal = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [statusDatang, setStatusDatang] = useState("active");
  const detail = useSelector((state) => state.ModalReducer.detailModal);
  const { modalDatang, kelolaBeras } = useSelector(
    (state) => state.ModalReducer
  );

  const totalModalDatang = (arr, berat) => {
    let temp = 0;
    if (arr !== null && berat !== null) {
      for (const key in arr) {
        temp += Number(arr[key].harga) * Number(berat);
      }
    }
    return Number(temp);
  };

  const totalModalPengolahan = (arr) => {
    let temp = 0;
    for (const key in arr) {
      for (const i in arr[key]["modal_kelola"]) {
        temp +=
          Number(arr[key]["modal_kelola"][i]["harga"]) *
          Number(arr[key]["berat"]);
      }
    }

    return temp;
  };

  const totalModalCampuran = (arr) => {
    let temp = 0;
    for (const key in arr) {
      for (const i in arr[key]["modal_campuran"]) {
        temp +=
          Number(arr[key]["modal_campuran"][i]["harga"]) *
          Number(arr[key]["modal_campuran"][i]["berat"]);
      }
    }

    return Number(temp);
  };

  useEffect(() => {
    dispatch(detailModal(state.idModal));
    dispatch(getModalDatang(state.idModal, { status: "active" }));
    dispatch(getKelolaBeras(state.idModal));
  }, []);

  return (
    <>
      <Container>
        <Button
          style={{
            marginBottom: "1rem",
          }}
          onClick={() => navigate(-1)}
          variant="success"
        >
          Kembali
        </Button>

        <div
          className="card"
          style={{
            marginBottom: "5rem",
          }}
        >
          <div className="card-header">
            <h2>
              <b>{detail.data?.category.nama}</b>
            </h2>
          </div>
          <div className="card-body">
            <div align="left">
              <Row>
                <Col md={6} xs={6}>
                  <h3>Bagian I</h3>
                </Col>
                <Col md={6} xs={6}>
                  {detail.data?.status !== "ready" && (
                    <ModalEditBagI data={detail.data} />
                  )}
                </Col>
              </Row>
            </div>
            {detail.loading && (
              <LinearProgress style={{ marginTop: "1rem" }} color="inherit" />
            )}
            <Row>
              <Col md={6} xs={12}>
                <strong>Keterangan</strong>
                <p className="text-muted">{detail.data?.keterangan}</p>
                <hr />
              </Col>
              <Col md={6} xs={12}>
                <strong>Tanggal Masuk</strong>
                <p className="text-muted">
                  {new Date(detail.data?.created_at).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <hr />
              </Col>
              <Col md={6} xs={12}>
                <strong>Nama Pembuat</strong>
                <p className="text-muted">{detail.data?.nama_pembuat}</p>
                <hr />
              </Col>
              <Col md={6} xs={12}>
                <strong>Berat Beras</strong>
                <p className="text-muted">
                  {Number(detail.data?.berat).toLocaleString("id-ID")} Kg
                </p>
                <hr />
              </Col>

              <Col md={6} xs={12}>
                <strong>Edit Terakhir</strong>
                <p className="text-muted">
                  {new Date(detail.data?.updated_at).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <hr />
              </Col>
              <div
                style={{
                  marginTop: "1rem",
                }}
              >
                <hr style={{ border: "3px solid black" }} />
              </div>
              <div align="left">
                <Row>
                  <Col md={6} xs={6}>
                    <h3>Bagian II</h3>
                  </Col>
                  <Col md={6} xs={6}>
                    {detail.data?.status !== "ready" && (
                      <ModalEditBagII data={detail.data} />
                    )}
                  </Col>
                </Row>
              </div>
              <div
                align="center"
                style={{
                  marginTop: "2rem",
                }}
              >
                <Col md={12} xs={12}>
                  <strong>Detail Harga Beras</strong>
                  <div
                    align="left"
                    style={{
                      marginTop: "2rem",
                    }}
                  >
                    <Row>
                      <Col md={6} xs={6}>
                        <strong>Harga Beras</strong>
                      </Col>
                      <Col md={6} xs={6}>
                        <p className="text-muted" style={{ textAlign: "end" }}>
                          Rp.{" "}
                          {Number(detail.data?.harga).toLocaleString("id-ID")}
                        </p>
                      </Col>
                      <Col md={6} xs={6}>
                        <strong>Modal Beras Datang</strong>
                      </Col>
                      <Col md={6} xs={6}>
                        <p className="text-muted" style={{ textAlign: "end" }}>
                          Rp.{" "}
                          {Number(
                            totalModalDatang(
                              modalDatang.data,
                              Number(detail.data?.berat)
                            )
                          ).toLocaleString("id-ID")}
                        </p>
                      </Col>
                      <Col md={6} xs={6}>
                        <strong>Modal Pengolahan Beras</strong>
                      </Col>
                      <Col md={6} xs={6}>
                        <p className="text-muted" style={{ textAlign: "end" }}>
                          Rp.{" "}
                          {Number(
                            totalModalPengolahan(kelolaBeras.data)
                          ).toLocaleString("id-ID")}
                        </p>
                      </Col>
                      <Col md={6} xs={6}>
                        <strong>Modal Pengolahan Campuran</strong>
                      </Col>
                      <Col md={6} xs={6}>
                        <p className="text-muted" style={{ textAlign: "end" }}>
                          Rp.{" "}
                          {Number(
                            totalModalCampuran(kelolaBeras.data)
                          ).toLocaleString("id-ID")}
                        </p>
                      </Col>
                      <Col md={6} xs={6}>
                        <strong>Total Harga</strong>
                      </Col>
                      <Col md={6} xs={6}>
                        <p className="text-muted" style={{ textAlign: "end" }}>
                          Rp.{" "}
                          {Number(
                            Number(detail.data?.harga) +
                              totalModalDatang(
                                modalDatang.data,
                                Number(detail.data?.berat)
                              ) +
                              totalModalPengolahan(kelolaBeras.data) +
                              totalModalCampuran(kelolaBeras.data)
                          ).toLocaleString("id-ID")}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <hr />
                </Col>

                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <hr style={{ border: "3px solid black" }} />
                </div>
                <div align="left">
                  <Row>
                    <Col md={6} xs={6}>
                      <h3>Bagian III</h3>
                    </Col>
                    <Col md={6} xs={6}>
                      {detail.data?.status !== "ready" && (
                        <ModalTambahModalDatang idModal={state.idModal} />
                      )}
                    </Col>
                  </Row>
                </div>

                <Col md={12} xs={12}>
                  <strong>Modal Ketika Beras Datang</strong>
                  {modalDatang.loading && (
                    <LinearProgress
                      style={{ marginTop: "1rem" }}
                      color="inherit"
                    />
                  )}

                  {modalDatang.data?.length > 0 ? (
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
                          {detail.data?.status !== "ready" && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {modalDatang.data?.map((el, idx) => (
                          <tr key={el.id}>
                            <td>{el.keterangan}</td>
                            <td>
                              Rp. {Number(el.harga).toLocaleString("id-ID")} /
                              Kg
                            </td>
                            <td>
                              Rp.{" "}
                              {Number(
                                el.harga * detail.data?.berat
                              ).toLocaleString("id-ID")}
                            </td>
                            <td>{el.nama_pembuat}</td>
                            {detail.data?.status !== "ready" && (
                              <td>
                                <ModalEditModalDatang
                                  data={el}
                                  idModal={state.idModal}
                                />
                                {el.status === "active" ? (
                                  <Button
                                    style={{ marginLeft: "0.5rem" }}
                                    variant="danger"
                                    onClick={async () => {
                                      setStatusDatang("inactive");
                                      const result = await alertSure();
                                      if (result.value) {
                                        dispatch(
                                          updateModalDatang({
                                            id: el.id,
                                            keterangan: el.keterangan,
                                            harga: el.harga,
                                            idModal: state.idModal,
                                            status: "inactive",
                                          }),
                                          state.idModal
                                        )
                                          .then((msg) => {
                                            alertSuccess(msg);
                                          })
                                          .then(() => {
                                            dispatch(
                                              getModalDatang(state.idModal, {
                                                status: "inactive",
                                              })
                                            );
                                          })
                                          .catch((err) => {
                                            alertError(
                                              "terjadi kesalahan pada server"
                                            );
                                          });
                                      }
                                    }}
                                  >
                                    Hide
                                  </Button>
                                ) : (
                                  <Button
                                    style={{ marginLeft: "0.5rem" }}
                                    variant="success"
                                    onClick={async () => {
                                      setStatusDatang("active");
                                      const result = await alertSure();
                                      if (result.value) {
                                        dispatch(
                                          updateModalDatang({
                                            id: el.id,
                                            keterangan: el.keterangan,
                                            harga: el.harga,
                                            idModal: state.idModal,
                                            status: "active",
                                          }),
                                          state.idModal
                                        )
                                          .then((msg) => {
                                            alertSuccess(msg);
                                          })
                                          .then(() => {
                                            dispatch(
                                              getModalDatang(state.idModal, {
                                                status: "active",
                                              })
                                            );
                                          })
                                          .catch((err) => {
                                            alertError(
                                              "terjadi kesalahan pada server"
                                            );
                                          });
                                      }
                                    }}
                                  >
                                    active
                                  </Button>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    !modalDatang.loading && (
                      <div
                        style={{
                          marginTop: "3rem",
                          marginBottom: "10rem",
                        }}
                        align="center"
                      >
                        <h3 style={{ color: "red" }}>
                          Modal Ketika Beras Datang Tidak ada
                        </h3>
                      </div>
                    )
                  )}
                  {detail.data?.status !== "ready" && (
                    <>
                      <Button
                        variant="success"
                        style={{ marginTop: "5rem" }}
                        onClick={async () => {
                          const result = await alertSure();
                          if (result.value) {
                            dispatch(
                              updateStatusModal(
                                { status: "ready", id: state.idModal },
                                state.idModal
                              )
                            )
                              .then(() => {
                                alertSuccess("data berhasil di ready kan");
                                dispatch(detailModal(state.idModal));
                              })
                              .catch(() => {
                                alertError("terjadi kesalahan");
                              });
                          }
                        }}
                      >
                        Konfirmasi
                      </Button>
                      <div style={{ marginTop: "1rem" }}>
                        <span style={{ color: "red" }}>
                          * pastikan data kamu sudah benar sebelum konfirmasi,
                          karna setelah konfirmasi data modal ketika beras
                          datang tidak dapat diubah
                        </span>
                      </div>
                    </>
                  )}
                  <hr />
                </Col>
                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <hr style={{ border: "3px solid black" }} />
                </div>
                <Col md={8} xs={12}>
                  <strong>
                    Total Modal Ketika Beras Datang dalam Kilo gram
                  </strong>

                  <p className="text-muted">
                    Rp.{" "}
                    {Number(
                      (Number(detail.data?.harga) +
                        totalModalDatang(
                          modalDatang.data,
                          detail.data?.berat
                        )) /
                        detail.data?.berat
                    ).toLocaleString("id-ID")}{" "}
                    / Kg
                  </p>
                  <hr />
                </Col>
              </div>
            </Row>
          </div>
        </div>
        <div
          className="card"
          style={{
            marginBottom: "5rem",
          }}
        >
          <div className="card-header">
            <h4>
              <b>Penjualan</b>
            </h4>
          </div>
          <div className="card-body">
            {detail.loading && (
              <LinearProgress style={{ marginTop: "1rem" }} color="inherit" />
            )}
            <PenjualanContent
              data={detail.data?.penjualan}
              idModal={state.idModal}
              id={state.id}
              category={state.category}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>
              <b>Kelola Beras</b>
            </h2>
          </div>
          <div className="card-body">
            {kelolaBeras.loading && (
              <LinearProgress style={{ marginTop: "1rem" }} color="inherit" />
            )}
            <BerasKelola
              status={detail.data?.status}
              data={kelolaBeras.data}
              realStock={Number(detail.data?.stock)}
              realBerat={Number(detail.data?.berat)}
              penjualan={detail.data?.penjualan}
              idModal={state.idModal}
              id={state.id}
              category={state.category}
              harga={
                (Number(detail.data?.harga) +
                  totalModalDatang(
                    modalDatang.data,
                    Number(detail.data?.berat)
                  )) /
                Number(detail.data?.berat)
              }
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetailModal;
