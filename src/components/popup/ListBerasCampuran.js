import { useState } from "react";
import { Modal, Button, Table, Col, Row, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBerasKelola,
  setKelolaBEras,
  setSelectModal,
} from "../../redux/modal/ModalAction";
import ModalPengolahan from "../forms/ModalPengolahan";

const ListBerasCampuran = (props) => {
  const { campuran, id } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(campuran);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Lihat
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List Beras Campuran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            onClick={() => {
              navigate("/tambah_campuran", { state: { id: id } });
              dispatch(
                setSelectModal({ data: null, loading: false, error: null })
              );
              dispatch(
                setKelolaBEras({ data: null, loading: false, error: null })
              );
            }}
          >
            Campur Beras
          </Button>
          {campuran.length === 0 && (
            <div
              align="center"
              style={{
                marginTop: "5rem",
                marginBottom: "5rem",
              }}
            >
              <h5 style={{ color: "red" }}>Belum ada Beras yang di campur</h5>
            </div>
          )}
          <ListGroup style={{ marginTop: "1rem" }}>
            {campuran.map((el, idx) => (
              <ListGroup.Item key={el.id + "list"}>
                <Row>
                  <Col xs={3} md={3}>
                    {el.kategori}
                  </Col>
                  <Col xs={3} md={3}>
                    {el.berat.toLocaleString("id-ID")} Kg
                  </Col>
                  <Col xs={3} md={3}>
                    Rp. {el.harga.toLocaleString("id-ID")}/Kg
                  </Col>
                  <Col xs={3} md={3}>
                    {el.perbandingan}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListBerasCampuran;
