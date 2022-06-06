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
const ModalEditBagII = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [harga, setHarga] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setHarga(data.harga);
  };

  return (
    <>
      <Button variant="warning" className="float-right" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bag II</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              style={{
                marginTop: "1rem",
              }}
            >
              <Form.Label>Harga Beras</Form.Label>
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
                dispatch(updateModal({ ...data, harga }, { tipe: "II" }))
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

export default ModalEditBagII;
