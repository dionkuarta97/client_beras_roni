import { Button, Row, Table, Col, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { alertError, alertSuccess, alertSure } from "../assets/js/Sweetalert";
import { updateBerasKelola } from "../redux/modal/ModalAction";
import ModalKelolaBeras from "./forms/ModalKelolaBeras";
import ModalEditKelolaBeras from "./newForms/ModalEditKelolaBeras";
import ListModalKelola from "./popup/ListModalKelola";
import ListPenjualan from "./popup/ListPenjualan";

const BerasKelola = (props) => {
  const {
    data,
    realStock,
    penjualan,
    status,
    idModal,
    realBerat,
    id,
    category,
  } = props;
  const dispatch = useDispatch();

  const totalStock = (arr) => {
    let temp = 0;
    if (arr !== null) {
      for (const key in arr) {
        temp += Number(arr[key]["berat"]);
      }
    }
    console.log(arr);
    return temp;
  };

  const sisaStock = (arr) => {
    let temp = 0;
    if (arr !== null) {
      for (const key in arr) {
        temp += Number(arr[key]["stock"]);
      }
    }

    return temp;
  };

  const totalHargaBeras = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += Number(arr[key]["harga"]);
    }
    return temp;
  };

  const totalBerasCampuran = (arr) => {
    let temp = 0;
    for (const key in arr) {
      let campuran = arr[key]["beras_campuran"];
      for (const value in campuran) {
        temp += Number(campuran[value]["berat"]);
      }
    }
    return temp;
  };

  const totalBerasTerjual = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["status"] !== "gagal") {
        if (arr[key]["keterangan"] !== "dari beras campuran")
          temp += Number(arr[key]["bobot"]);
      }
    }

    return temp;
  };
  const totalBerasCampuranTerjual = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["keterangan"] === "dari beras campuran")
        temp += Number(arr[key]["bobot"]);
    }
    return temp;
  };

  return (
    <>
      <ModalKelolaBeras
        status={status}
        sisaStock={realStock}
        idModal={props.idModal}
        harga={props.harga}
      />
      <Row
        style={{
          marginTop: "2rem",
        }}
      >
        <Col md={6} xs={12}>
          <strong>Sisa Beras yang belum di kelola</strong>
          <p className="text-muted">
            {(realBerat - totalStock(data)).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras yang sudah di kelola</strong>
          <p className="text-muted">
            {Number(totalStock(data)).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras yang sudah di dicampur</strong>
          <p className="text-muted">
            {Number(totalBerasCampuran(data)).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras campur yang terjual</strong>
          <p className="text-muted">
            {Number(totalBerasCampuranTerjual(penjualan)).toLocaleString(
              "id-ID"
            )}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras yang sudah terjual</strong>
          <p className="text-muted">
            {Number(totalBerasTerjual(penjualan)).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Sisa Stock</strong>
          <p className="text-muted">
            {Number(realStock).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
      </Row>
      <Table style={{ marginTop: "2rem" }} responsive className="text-nowrap">
        <thead>
          <tr>
            <th>Keterangan</th>
            <th>Modal / Kg</th>
            <th>Nama Pembuat</th>
            <th>Berat</th>
            <th>Stock</th>
            <th>Dibuat</th>
            <th>Status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((el, idx) => (
            <tr key={el.id + "kelola_beras"}>
              <td>{el.keterangan}</td>
              <td>
                Rp.{" "}
                {Number(
                  Number(el.harga) + totalHargaBeras(el.modal_kelola)
                ).toLocaleString("id-ID")}
              </td>
              <td>{el.nama_pembuat}</td>
              <td>{Number(el.berat).toLocaleString("id-ID")}</td>
              <td>{Number(el.stock).toLocaleString("id-ID")}</td>
              <td>
                {new Date(el.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {el.status === "active" ? (
                  <Badge bg="warning">Belum Siap</Badge>
                ) : (
                  <Badge bg="success">Sudah Siap</Badge>
                )}
              </td>
              <td>
                <ListModalKelola
                  tipe={el.tipe}
                  berat={el.berat}
                  data={el.modal_kelola}
                  idBerasKelola={el.id}
                  idModal={props.idModal}
                  status={el.status}
                />
                {el.status === "active" ? (
                  <>
                    <Button
                      size="sm"
                      style={{ marginLeft: "0.5rem" }}
                      variant="danger"
                      onClick={async () => {
                        const result = await alertSure();
                        if (result.value) {
                          dispatch(
                            updateBerasKelola(
                              {
                                id: el.id,
                                keterangan: el.keterangan,
                                berat: el.berat,
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
                    >
                      Hapus
                    </Button>
                    <ModalEditKelolaBeras
                      data={{
                        id: el.id,
                        keterangan: el.keterangan,
                        berat: el.berat,
                        status: el.status,
                      }}
                      idModal={idModal}
                    />
                    <Button
                      size="sm"
                      style={{ marginLeft: "0.5rem" }}
                      variant="success"
                      onClick={async () => {
                        const result = await alertSure();
                        if (result.value) {
                          dispatch(
                            updateBerasKelola(
                              {
                                id: el.id,
                                keterangan: el.keterangan,
                                berat: el.berat,
                                status: "ready",
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
                    >
                      Konfirmasi
                    </Button>
                  </>
                ) : (
                  <ListPenjualan
                    data={el.penjualan}
                    id={id}
                    category={category}
                    idModal={idModal}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BerasKelola;
