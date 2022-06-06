import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import { createPengolahanBeras } from "../../redux/modal/ModalAction";

const ModalPengolahan = (props) => {
  const { idModal, idBerasKelola, handleClose2nd } = props;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [harga, setHarga] = useState();
  const [error, setError] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setError([]);
    setKeterangan("");
    setHarga();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Tambah Modal
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
                value={keterangan}
                onChange={(e) => {
                  const value = e.target.value;
                  setKeterangan(value);
                }}
              />
            </Form.Group>
            {error?.keterangan &&
              error.keterangan.map((el, idx) => (
                <span style={{ color: "red" }} key={idx + "keterangan"}>
                  {el}
                </span>
              ))}
            <Form.Group
              style={{
                marginTop: "1rem",
              }}
            >
              <Form.Label>Harga / Kilo gram Beras</Form.Label>
              <CurrencyInput
                thousandSeparator="."
                precision={0}
                className="form-control"
                value={harga}
                onChangeEvent={(e, value, name) => {
                  let int = value.replace(/[$.]+/g, "");
                  setHarga(Number(int));
                }}
              />
              {error?.harga &&
                error.harga.map((el, idx) => (
                  <span style={{ color: "red" }} key={idx + "harga"}>
                    {el}
                  </span>
                ))}
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
                dispatch(
                  createPengolahanBeras(idModal, {
                    keterangan,
                    harga,
                    idBerasKelola,
                  })
                )
                  .then((msg) => {
                    alertSuccess(msg);
                    handleClose();
                    handleClose2nd();
                  })
                  .catch((err) => {
                    setError(err);
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

export default ModalPengolahan;
