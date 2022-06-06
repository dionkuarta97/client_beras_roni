import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import { updateModal } from "../../redux/modal/ModalAction";

const ModalEditBagI = (props) => {
  const { data } = props;
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
      <Button variant="warning" className="float-right" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bag I</Modal.Title>
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
                  updateModal(
                    { ...data, keterangan: keterangan, berat: berat },
                    { tipe: "I" }
                  )
                )
                  .then((msg) => {
                    alertSuccess(msg);
                    handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                    if (err.message) {
                      alertError(err.message);
                      handleClose();
                    }
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

export default ModalEditBagI;
