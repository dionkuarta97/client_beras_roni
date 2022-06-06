import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { alertSuccess, alertSure } from "../../assets/js/Sweetalert";
import CurrencyInput from "react-currency-input";
import { createModal } from "../../redux/modal/ModalAction";

const ModalTambahModal = (props) => {
  const { id, params } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState({
    keterangan: "",
    berat: null,
    harga: null,
    idCategory: id,
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setError({});
    setShow(true);
    setPayload({
      keterangan: "",
      berat: null,
      harga: null,
      idCategory: id,
      modal: {},
    });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginBottom: "2rem", marginTop: "1rem" }}
      >
        Tambah Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Modal Masuk</Modal.Title>
        </Modal.Header>
        <Form
          style={{
            padding: "2rem",
          }}
        >
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
            <Form.Label>Berat (Kg)</Form.Label>
            <CurrencyInput
              thousandSeparator="."
              precision={0}
              className="form-control"
              value={payload.berat}
              onChangeEvent={(e, value, name) => {
                let int = value.replace(/[$.]+/g, "");
                setPayload({ ...payload, berat: Number(int) });
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
            <Form.Label>Harga</Form.Label>
            <CurrencyInput
              thousandSeparator="."
              precision={0}
              className="form-control"
              value={payload.harga}
              onChangeEvent={(e, value, name) => {
                let int = value.replace(/[$.]+/g, "");
                setPayload({ ...payload, harga: Number(int) });
              }}
            />
          </Form.Group>
          {error.harga &&
            error.harga.map((el, idx) => (
              <span style={{ color: "red" }} key={idx}>
                {el}
              </span>
            ))}
        </Form>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              const result = await alertSure();
              if (result.value) {
                dispatch(createModal(payload, params))
                  .then((msg) => {
                    alertSuccess(msg);
                    handleClose();
                  })
                  .catch((err) => {
                    setError(err);
                  });
              }
            }}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTambahModal;
