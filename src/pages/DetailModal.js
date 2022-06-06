import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BerasKelola from "../components/BerasKelola";
import ModalEditBagI from "../components/forms/ModalEditBagI";
import ModalEditBagII from "../components/forms/ModalEditBagII";
import ModalTambahModalDatang from "../components/forms/ModalTambahModalDatang";
import PenjualanContent from "../components/PenjualanContent";
import {
  detailModal,
  getKelolaBeras,
  getModalDatang,
} from "../redux/modal/ModalAction";

const DetailModal = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.ModalReducer.detailModal);
  const { modalDatang, kelolaBeras } = useSelector(
    (state) => state.ModalReducer
  );

  const totalModalDatang = (arr, berat) => {
    let temp = 0;
    if (arr !== null && berat !== null) {
      for (const key in arr) {
        temp += arr[key].harga * berat;
      }
    }
    return temp;
  };

  const totalModalPengolahan = (arr) => {
    let temp = 0;
    for (const key in arr) {
      for (const i in arr[key]["modal_kelola"]) {
        temp += arr[key]["modal_kelola"][i]["harga"] * arr[key]["berat"];
      }
    }

    return temp;
  };

  const totalModalCampuran = (arr) => {
    let temp = 0;
    for (const key in arr) {
      for (const i in arr[key]["modal_campuran"]) {
        temp +=
          arr[key]["modal_campuran"][i]["harga"] *
          arr[key]["modal_campuran"][i]["berat"];
      }
    }

    return temp;
  };

  useEffect(() => {
    dispatch(detailModal(state.idModal));
    dispatch(getModalDatang(state.idModal, { status: "active" }));
    dispatch(getKelolaBeras(state.idModal, { status: "active" }));
  }, []);

  console.log(detail);

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
                <ModalEditBagI data={detail.data} />
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
                {new Date(detail.data?.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
                {new Date(detail.data?.updated_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
                  <ModalEditBagII data={detail.data} />
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
                        Rp. {Number(detail.data?.harga).toLocaleString("id-ID")}
                      </p>
                    </Col>
                    <Col md={6} xs={6}>
                      <strong>Modal Beras Datang</strong>
                    </Col>
                    <Col md={6} xs={6}>
                      <p className="text-muted" style={{ textAlign: "end" }}>
                        Rp.{" "}
                        {Number(
                          totalModalDatang(modalDatang.data, detail.data?.berat)
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
                          detail.data?.harga +
                            totalModalDatang(
                              modalDatang.data,
                              detail.data?.berat
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
                    <ModalTambahModalDatang idModal={state.idModal} />
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalDatang.data?.map((el, idx) => (
                        <tr key={el.id}>
                          <td>{el.keterangan}</td>
                          <td>
                            Rp. {Number(el.harga).toLocaleString("id-ID")} / Kg
                          </td>
                          <td>
                            Rp.{" "}
                            {Number(
                              el.harga * detail.data?.berat
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
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !modalDatang.loading && (
                    <div
                      style={{
                        marginTop: "3rem",
                        marginBottom: "3rem",
                      }}
                      align="center"
                    >
                      <h3 style={{ color: "red" }}>
                        Modal Ketika Beras Datang Tidak ada
                      </h3>
                    </div>
                  )
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
                <strong>Total Modal Ketika Beras Datang dalam Kilo gram</strong>

                <p className="text-muted">
                  Rp.{" "}
                  {Number(
                    (detail.data?.harga +
                      totalModalDatang(modalDatang.data, detail.data?.berat)) /
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
      <div className="card">
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
            data={kelolaBeras.data}
            realStock={detail.data?.stock}
            penjualan={detail.data?.penjualan}
            idModal={state.idModal}
            harga={
              (detail.data?.harga +
                totalModalDatang(modalDatang.data, detail.data?.berat)) /
              detail.data?.berat
            }
          />
        </div>
      </div>
    </>
  );
};

export default DetailModal;
