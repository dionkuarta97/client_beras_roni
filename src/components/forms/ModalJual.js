import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertErrorDua,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import { createPenjualanCampuran } from "../../redux/penjualan/PenjualanAction";
import { useNavigate } from "react-router-dom";

const ModalJual = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBerasKelola, idKategori, idModal, harga_modal, cekStatus, tipe } =
    props;
  const [show, setShow] = useState(false);
  const [error, setError] = useState({
    keterangan: null,
    berat: null,
  });
  const [payload, setPayload] = useState({
    idBerasKelola: null,
    keterangan: null,
    bobot: null,
    harga_modal: null,
    harga_jual: null,
    jenis_pembayaran: null,
    nama_pembeli: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setError({ keterangan: null, berat: null });

    setPayload({
      idBerasKelola: idBerasKelola,
      keterangan: null,
      bobot: null,
      harga_modal: harga_modal,
      harga_jual: null,
      jenis_pembayaran: null,
      nama_pembeli: null,
      tipe: tipe ? "biasa" : "campuran",
      idModal: idModal ? idModal : null,
      idKategori: idKategori ? idKategori.id : null,
    });
  };

  console.log(cekStatus);

  return (
    <>
      <Button
        variant="success"
        onClick={() => {
          if (cekStatus) {
            alertErrorDua(
              "maaf masih ada status penjualan yang pending, silahkan selesaikan dahulu penjualan tersebut, atau bisa di batalkan"
            );
          } else {
            handleShow();
          }
        }}
      >
        Jual Beras
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Penjualan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              color: "green",
            }}
          >
            Harga Modal : Rp. {harga_modal}
          </span>
          <Form>
            <Form.Group>
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as={"textarea"}
                onChange={(e) => {
                  const value = e.target.value;
                  setPayload({ ...payload, keterangan: value });
                }}
              />
            </Form.Group>
            {error.keterangan &&
              error.keterangan.map((el, idx) => (
                <span style={{ color: "red" }} key={idx}>
                  {el}
                </span>
              ))}
            <Form.Group
              style={{
                marginTop: "1rem",
              }}
            >
              <Form.Label>Bobot (Kg)</Form.Label>
              <CurrencyInput
                thousandSeparator="."
                precision={0}
                className="form-control"
                value={payload.bobot}
                onChangeEvent={(e, value, name) => {
                  let int = value.replace(/[$.]+/g, "");
                  setPayload({ ...payload, bobot: Number(int) });
                }}
              />
            </Form.Group>
            {error.berat &&
              error.berat.map((el, idx) => (
                <span style={{ color: "red" }} key={idx}>
                  {el}
                </span>
              ))}
            <Form.Group
              style={{
                marginTop: "1rem",
              }}
            >
              <Form.Label>Harga Jual / Kg</Form.Label>
              <CurrencyInput
                thousandSeparator="."
                precision={0}
                className="form-control"
                value={payload.harga_jual}
                onChangeEvent={(e, value, name) => {
                  let int = value.replace(/[$.]+/g, "");
                  setPayload({ ...payload, harga_jual: Number(int) });
                }}
              />
            </Form.Group>
            <Form.Group
              style={{
                marginTop: "1rem",
              }}
            >
              <Form.Label>Jenis Pembayaran</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setPayload({ ...payload, jenis_pembayaran: e.target.value });
                }}
                size="lg"
              >
                <option value={false}>--Pilih--</option>
                <option value={"cash"}>Cash</option>
                <option value={"transfer"}>Transfer</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              style={{
                marginTop: "1rem",
              }}
            >
              <Form.Label>Nama Pembeli</Form.Label>
              <Form.Control
                placeholder="Kosong kan jika tidak ada"
                onChange={(e) => {
                  setPayload({ ...payload, nama_pembeli: e.target.value });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              const result = await alertSure();
              if (result.value) {
                dispatch(createPenjualanCampuran(payload))
                  .then((data) => {
                    console.log(data);
                    alertSuccess("data berhasil ditambahkan");
                    navigate("/penjualan/detail/" + data.id, {
                      state: { tipe: data.tipe },
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalJual;
