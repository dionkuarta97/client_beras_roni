import { useState } from "react";
import { Modal, Button, Table, Col, Row } from "react-bootstrap";
import ModalPengolahan from "../forms/ModalPengolahan";
import ModalTambahModalKelolaCampuran from "../forms/ModalTambahModalKelolaCampuran";

const ListModalKelola = (props) => {
  const { data, idBerasKelola, idModal, berat, from, campuran } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPengolahanBeras = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += arr[key]["harga"] * berat;
    }

    return temp;
  };

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        {from ? "Lihat" : "Detail"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Pengolahan Beras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {from ? (
            <ModalTambahModalKelolaCampuran
              idBerasKelola={idBerasKelola}
              berat={berat}
              campuran={campuran}
            />
          ) : (
            <ModalPengolahan
              idBerasKelola={idBerasKelola}
              idModal={idModal}
              handleClose2nd={handleClose}
            />
          )}

          {data.length > 0 ? (
            <Table
              style={{ marginTop: "2rem" }}
              responsive
              className="text-nowrap"
            >
              <thead>
                <tr>
                  <th>Keterangan</th>
                  <th>Harga</th>
                  <th>Total</th>
                  <th>Dibuat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, idx) => (
                  <tr key={el.id + "modal_kelola"}>
                    <td>{el.keterangan}</td>
                    <td>{el.harga}</td>
                    <td>{Number(el.harga * berat).toLocaleString("id-ID")}</td>
                    <td>{el.nama_pembuat}</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" style={{ marginLeft: "0.5rem" }}>
                        Sembunyikan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h5 style={{ color: "red", marginTop: "3rem" }}>
              Modal Pengolahan Beras Belum Ada
            </h5>
          )}
          <div style={{ marginTop: "2rem" }}>
            <Row>
              <Col xs={6} md={6}>
                <span>Total Modal Pengolahan</span>
              </Col>
              <Col xs={6} md={6}>
                <span className="float-right">
                  Rp. {totalPengolahanBeras(data).toLocaleString("id-ID")}
                </span>
              </Col>
            </Row>
          </div>
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

export default ListModalKelola;
