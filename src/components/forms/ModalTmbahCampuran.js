import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";

import CurrencyInput from "react-currency-input";
import { createCampuran } from "../../redux/modal/ModalAction";
import { useNavigate } from "react-router-dom";

function ModalTambahCampuran(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [berat, setBerat] = useState(0);
  const [perbandingan, setPerbandingan] = useState(0);
  const { id, data, kategori, idModal } = props;
  const [category, setCategory] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setBerat(0);
    setCategory(JSON.parse(kategori));
  };
  console.log(id, data);
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Pilih
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Berat</Form.Label>
              <CurrencyInput
                thousandSeparator="."
                precision={0}
                className="form-control"
                value={berat}
                onChangeEvent={(e, value, name) => {
                  let int = value.replace(/[$.]+/g, "");
                  setBerat(int);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Perbandingan</Form.Label>
              <CurrencyInput
                thousandSeparator="."
                precision={0}
                className="form-control"
                value={perbandingan}
                onChangeEvent={(e, value, name) => {
                  let int = value.replace(/[$.]+/g, "");
                  setPerbandingan(int);
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
              const payload = {
                idBerasKelola: id,
                idBerasCampur: data.id,
                idModal: idModal,
                idKategori: category.id,
                kategori: category.nama,
                harga: data.harga,
                berat: berat,
                perbandingan: perbandingan,
              };
              const result = await alertSure();
              if (berat > 0) {
                if (result.value) {
                  dispatch(createCampuran(payload))
                    .then((msg) => {
                      alertSuccess(msg);
                      handleClose();
                      navigate("/campuran");
                    })
                    .catch((err) => {
                      if (err.ganda) {
                        alertError(err.ganda);
                      } else {
                        alertError("terjadi kesalahan");
                      }
                      handleClose();
                      navigate("/campuran");
                    });
                }
              } else {
                alertError("berat tidak boleh 0");
                handleClose();
              }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTambahCampuran;
