import { Button, Row, Table, Col } from "react-bootstrap";
import ModalKelolaBeras from "./forms/ModalKelolaBeras";
import ListModalKelola from "./popup/ListModalKelola";

const BerasKelola = (props) => {
  const { data, realStock, penjualan } = props;

  const totalStock = (arr) => {
    let temp = 0;
    if (arr !== null) {
      for (const key in arr) {
        temp += arr[key]["berat"];
      }
    }

    return temp;
  };

  const sisaStock = (arr) => {
    let temp = 0;
    if (arr !== null) {
      for (const key in arr) {
        temp += arr[key]["stock"];
      }
    }

    return temp;
  };

  const totalHargaBeras = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += arr[key]["harga"];
    }
    return temp;
  };

  const totalBerasCampuran = (arr) => {
    let temp = 0;
    for (const key in arr) {
      let campuran = arr[key]["beras_campuran"];
      for (const value in campuran) {
        temp += campuran[value]["berat"];
      }
    }
    return temp;
  };

  const totalBerasTerjual = (arr) => {
    let temp = 0;
    console.log(arr, "<<<<tes");
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
    console.log(arr);
    for (const key in arr) {
      if (arr[key]["keterangan"] === "dari beras campuran")
        temp += Number(arr[key]["bobot"]);
    }
    return temp;
  };

  return (
    <>
      <ModalKelolaBeras
        sisaStock={realStock - totalStock(data)}
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
            {(realStock - totalStock(data)).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras yang sudah di kelola</strong>
          <p className="text-muted">
            {totalStock(data).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras yang sudah di dicampur</strong>
          <p className="text-muted">
            {totalBerasCampuran(data).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras campur yang terjual</strong>
          <p className="text-muted">
            {totalBerasCampuranTerjual(penjualan).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Total Beras yang sudah terjual</strong>
          <p className="text-muted">
            {totalBerasTerjual(penjualan).toLocaleString("id-ID")}
          </p>
          <hr />
        </Col>
        <Col md={6} xs={12}>
          <strong>Sisa Stock</strong>
          <p className="text-muted">
            {sisaStock(data).toLocaleString("id-ID")}
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
                  el.harga + totalHargaBeras(el.modal_kelola)
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
                <ListModalKelola
                  tipe={el.tipe}
                  berat={el.berat}
                  data={el.modal_kelola}
                  idBerasKelola={el.id}
                  idModal={props.idModal}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BerasKelola;
