import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import { updateModalKelola } from "../../redux/modal/ModalAction";

const ModalEditModalKelola = (props) => {
  const { data, idModal } = props;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [keterangan, setKeterangan] = useState();
  const [harga, setHarga] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setKeterangan(data.keterangan);
    setHarga(data.harga);
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
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
              <Form.Label>Harga / Kg</Form.Label>
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
                  updateModalKelola(
                    {
                      keterangan: keterangan,
                      id: data.id,
                      harga: harga,
                      status: data.status,
                    },
                    idModal
                  )
                )
                  .then((msg) => {
                    alertSuccess(msg);
                  })
                  .catch((msg) => {
                    alertError(msg);
                  })
                  .finally(() => {
                    handleClose();
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

export default ModalEditModalKelola;
