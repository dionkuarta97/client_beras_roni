import { useState } from "react";
import { Modal, Button, Table, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  alertError,
  alertSuccess,
  alertSure,
} from "../../assets/js/Sweetalert";
import { updateModalKelola } from "../../redux/modal/ModalAction";
import ModalPengolahan from "../forms/ModalPengolahan";
import ModalTambahModalKelolaCampuran from "../forms/ModalTambahModalKelolaCampuran";
import ModalEditModalKelola from "../newForms/ModalEditModalKelola";

const ListModalKelola = (props) => {
  const { data, idBerasKelola, idModal, berat, from, campuran, status } = props;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
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
      <Button size="sm" variant="info" onClick={handleShow}>
        {from ? "Lihat" : "Detail"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Pengolahan Beras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === "active" && (
            <>
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
            </>
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
                  {status !== "ready" && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((el, idx) => (
                  <tr key={el.id + "modal_kelola"}>
                    <td>{el.keterangan}</td>
                    <td>{el.harga}</td>
                    <td>{Number(el.harga * berat).toLocaleString("id-ID")}</td>
                    <td>{el.nama_pembuat}</td>
                    {status !== "ready" && (
                      <td>
                        {!from && (
                          <ModalEditModalKelola
                            data={el}
                            idModal={!from ? idModal : null}
                          />
                        )}

                        <Button
                          variant="danger"
                          onClick={async () => {
                            const result = await alertSure();
                            if (result.value) {
                              dispatch(
                                updateModalKelola(
                                  {
                                    keterangan: el.keterangan,
                                    id: el.id,
                                    harga: el.harga,
                                    status: "inactive",
                                  },
                                  idModal
                                )
                              )
                                .then((msg) => {
                                  alertSuccess(msg);
                                })
                                .catch((msg) => {
                                  alertError(msg);
                                });
                            }
                          }}
                          style={{ marginLeft: "0.5rem" }}
                        >
                          Sembunyikan
                        </Button>
                      </td>
                    )}
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
