import { useState } from "react";
import { Modal, Button, Table, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalPengolahan from "../forms/ModalPengolahan";
import ModalTambahModalKelolaCampuran from "../forms/ModalTambahModalKelolaCampuran";

const ListPenjualan = (props) => {
  const { data, id, category, idModal } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Riwayat Penjualan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Riwayat penjualan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            style={{ marginTop: "2rem" }}
            responsive
            className="text-nowrap"
          >
            <thead>
              <tr>
                <th>Keterangan</th>
                <th>Harga Jual</th>
                <th>Bobot</th>
                <th>Total</th>
                <th>Dibuat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (el, idx) =>
                  el.status !== "gagal" && (
                    <tr key={el.id + "modal_kelola"}>
                      <td>{el.keterangan}</td>
                      <td>
                        Rp. {Number(el.harga_jual).toLocaleString("id-ID")}
                      </td>
                      <td>{Number(el.bobot).toLocaleString("id-ID")} Kg</td>
                      <td>
                        Rp.{" "}
                        {Number(el.harga_jual * el.bobot).toLocaleString(
                          "id-ID"
                        )}
                      </td>
                      <td>{el.nama_pembuat}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => {
                            navigate("/penjualan/detail/" + el.id, {
                              state: {
                                from: "modal",
                                id: id,
                                category: category,
                                idModal: idModal,
                              },
                            });
                          }}
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
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

export default ListPenjualan;
