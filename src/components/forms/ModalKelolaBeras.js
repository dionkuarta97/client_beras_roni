import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import { createKelolaBeras } from "../../redux/modal/ModalAction";

const ModalKelolaBeras = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState({
    keterangan: null,
    berat: null,
  });
  const [payload, setPayload] = useState({
    idModal: null,
    keterangan: "",
    harga: null,
    berat: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setError({ keterangan: null, berat: null });
    setPayload({
      idModal: props.idModal,
      keterangan: "",
      harga: props.harga,
      berat: null,
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Kelola Beras
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                if (props.sisaStock < payload.berat) {
                  alertError(
                    "Sisa Stock yang bisa di kelola sebesar " + props.sisaStock
                  );
                  handleClose();
                } else {
                  dispatch(createKelolaBeras(payload))
                    .then((msg) => {
                      alertSuccess(msg);
                      handleClose();
                    })
                    .catch((err) => {
                      if (err.keterangan || err.berat) {
                        setError(err);
                      } else {
                        alertError("terjadi kesalahan");
                        handleClose();
                      }
                    });
                }
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

export default ModalKelolaBeras;
