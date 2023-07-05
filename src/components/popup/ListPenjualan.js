import { useEffect, useState } from "react";
import { Modal, Button, Table, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListPenjualan = (props) => {
  const { data, id, category, idModal } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [awal, setAwal] = useState(0);
  const [akhir, setAkhir] = useState(5);
  const navigate = useNavigate();

  const totalModalPenjualan = (arr, bobot) => {
    let temp = 0;

    for (const value in arr) {
      temp += Number(arr[value]["harga"]) * Number(bobot);
    }
    console.log(arr);
    return temp;
  };

  const totalBerat = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += Number(arr[key]["bobot"]);
    }
    return temp;
  };

  useEffect(() => {
    setAwal(0);
    setAkhir(5);
  }, []);

  return (
    <>
      <Button
        variant="warning"
        style={{ marginLeft: "0.5rem" }}
        size={"sm"}
        onClick={handleShow}
      >
        Riwayat Penjualan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Riwayat penjualan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div align="center">
            <span>Total Data : {data?.length}</span>
          </div>
          <div align="center">
            <span>
              Total Berat :{" "}
              {totalBerat(data ? data : [])
                .toFixed(2)
                .toLocaleString("id-ID")}{" "}
              Kg
            </span>
          </div>
          <Table
            style={{ marginTop: "2rem" }}
            responsive
            className="text-nowrap"
          >
            <thead>
              <tr>
                <th>Keterangan</th>
                <th>Harga Jual</th>
                <th>Profit</th>
                <th>Bobot</th>
                <th>Total</th>
                <th>Dibuat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.slice(awal, akhir).map(
                (el, idx) =>
                  el.status !== "gagal" && (
                    <tr key={el.id + "modal_kelola"}>
                      <td>{el.keterangan}</td>
                      <td>
                        Rp. {Number(el.harga_jual).toLocaleString("id-ID")}
                      </td>
                      <td>
                        Rp.{" "}
                        {(
                          Number(el.harga_jual) * Number(el.bobot) -
                          (Number(el.harga_modal) * Number(el.bobot) +
                            totalModalPenjualan(el.modal_penjualan, el.bobot))
                        ).toLocaleString("id-ID")}
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
          <div align="center">
            {awal > 0 && (
              <Button
                onClick={() => {
                  setAwal(awal - 5);
                  setAkhir(akhir - 5);
                }}
              >
                sebelumnya
              </Button>
            )}
            {akhir < data?.length && (
              <Button
                variant="success"
                onClick={() => {
                  setAwal(awal + 5);
                  setAkhir(akhir + 5);
                }}
                style={{ marginLeft: "1rem" }}
              >
                selanjutnya
              </Button>
            )}
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

export default ListPenjualan;
