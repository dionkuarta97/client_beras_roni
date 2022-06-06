import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";
import { editCategory } from "../../redux/category/CategoryAction";

const ModalEditCategory = (props) => {
  const { page, perPage, editNama, id } = props;
  const dispatch = useDispatch();
  const [nama, setNama] = useState(editNama);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
      >
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Form
          style={{
            padding: "2rem",
          }}
        >
          <Form.Group>
            <Form.Label>Nama Category</Form.Label>
            <Form.Control
              value={nama}
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
                  editCategory(
                    {
                      nama: nama,
                    },
                    id
                  )
                )
                  .then((data) => {
                    alertSuccess("Data berhasil di ubah");
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
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditCategory;
