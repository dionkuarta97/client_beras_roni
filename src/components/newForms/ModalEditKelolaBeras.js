import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import {
  getModalDatang,
  updateBerasKelola,
  updateModalDatang,
} from "../../redux/modal/ModalAction";

const ModalEditKelolaBeras = (props) => {
  const { data, idModal } = props;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [keterangan, setKeterangan] = useState();
  const [berat, setBerat] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setKeterangan(data.keterangan);
    setBerat(data.berat);
  };

  return (
    <>
      <Button
        size="sm"
        style={{ marginLeft: "0.5rem" }}
        variant="warning"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
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
                value={berat}
                onChangeEvent={(e, value, name) => {
                  let int = value.replace(/[$.]+/g, "");
                  setBerat(Number(int));
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
                dispatch(
                  updateBerasKelola(
                    {
                      ...data,
                      keterangan: keterangan,
                      berat: berat,
                    },
                    idModal
                  )
                )
                  .then((msg) => {
                    alertSuccess(msg);
                    handleClose();
                  })
                  .catch((err) => {
                    alertError(err);
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

export default ModalEditKelolaBeras;
