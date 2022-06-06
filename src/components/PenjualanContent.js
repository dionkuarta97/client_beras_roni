import { Col, Row } from "react-bootstrap";
import ListPenjualan from "./popup/ListPenjualan";

const PenjualanContent = (props) => {
  const { data, id, category, idModal } = props;
  const totalTerjualCampuran = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["status"] !== "gagal") {
        if (arr[key]["keterangan"] === "dari beras campuran")
          temp += Number(arr[key]["harga_jual"]) * Number(arr[key]["bobot"]);
      }
    }
    return temp;
  };

  const totalTerjualBiasa = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["status"] !== "gagal") {
        if (arr[key]["keterangan"] !== "dari beras campuran")
          temp += Number(arr[key]["harga_jual"]) * Number(arr[key]["bobot"]);
      }
    }
    return temp;
  };

  const totalModal = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["status"] !== "gagal") {
        temp += Number(arr[key]["harga_modal"]) * Number(arr[key]["bobot"]);
      }
    }
    return temp;
  };

  const totalModalPenjualan = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["status"] !== "gagal") {
        for (const value in arr[key]["modal_penjualan"]) {
          temp +=
            Number(arr[key]["modal_penjualan"][value]["harga"]) *
            arr[key]["bobot"];
        }
      }
    }
    return temp;
  };

  totalModalPenjualan(data);
  return (
    <Row>
      <Col xs={6} md={6}>
        <strong>Total Terjual Beras Campuran</strong>
      </Col>
      <Col xs={6} md={6}>
        <p className="text-muted">
          Rp. {totalTerjualCampuran(data).toLocaleString("id-ID")}
        </p>
      </Col>
      <Col xs={6} md={6}>
        <strong>Total Terjual Beras Biasa</strong>
      </Col>
      <Col xs={6} md={6}>
        <p className="text-muted">
          Rp. {totalTerjualBiasa(data).toLocaleString("id-ID")}
        </p>
      </Col>
      <Col xs={6} md={6}>
        <strong>Total Modal</strong>
      </Col>
      <Col xs={6} md={6}>
        <p className="text-muted">
          Rp.{" "}
          {(totalModal(data) + totalModalPenjualan(data)).toLocaleString(
            "id-ID"
          )}
        </p>
      </Col>
      <hr />
      <Col xs={6} md={6}>
        <strong>Profit</strong>
      </Col>
      <Col xs={6} md={6}>
        <p className="text-muted">
          Rp.{" "}
          {(
            totalTerjualCampuran(data) +
            totalTerjualBiasa(data) -
            (totalModal(data) + totalModalPenjualan(data))
          ).toLocaleString("id-ID")}
        </p>
      </Col>
      <div align={"center"}>
        <ListPenjualan
          data={data}
          id={id}
          category={category}
          idModal={idModal}
        />
      </div>
    </Row>
  );
};

export default PenjualanContent;
