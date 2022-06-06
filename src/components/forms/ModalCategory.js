import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";
import { addCategory } from "../../redux/category/CategoryAction";

const ModalCategory = (props) => {
  const { show, handleClose, page, perPage } = props;
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  useEffect(() => {}, []);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Category</Modal.Title>
      </Modal.Header>
      <Form
        style={{
          padding: "2rem",
        }}
      >
        <Form.Group>
          <Form.Label>Nama Category</Form.Label>
          <Form.Control
            onChange={(e) => {
              const value = e.target.value;
              setNama(value);
            }}
          />
        </Form.Group>
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
              dispatch(
                addCategory({
                  nama: nama,
                })
              )
                .then((data) => {
                  alertSuccess("Data berhasil di tambahkan");
                })
                .catch((err) => {
                  if (err.nama) {
                    alertError(err.nama[0]);
                  }
                });
              page();
              perPage();
              handleClose();
            }
          }}
        >
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCategory;
