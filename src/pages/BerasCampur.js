import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalJual from "../components/forms/ModalJual";
import ListModalKelola from "../components/popup/ListModalKelola";
import { getBerasCampuran } from "../redux/modal/ModalAction";

const BerasCampur = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { berasCampuran } = useSelector((state) => state.ModalReducer);
  const totalHargaBeras = (arr) => {
    let temp = 0;
    for (const key in arr) {
      temp += Number(arr[key]["harga"]);
    }
    return temp;
  };

  const cekStatusPenjualan = (arr) => {
    let temp = false;
    for (const key in arr) {
      if (arr[key]["status"] === "pending") {
        temp = true;
        break;
      }
    }
    return temp;
  };

  useEffect(() => {
    dispatch(getBerasCampuran({ status: "ready", limit: 100, stock: "ada" }));
  }, []);

  console.log(berasCampuran);

  return (
    <>
      <Button
        onClick={() => {
          navigate("/penjualan");
        }}
        variant="success"
        style={{ marginBottom: "2rem" }}
      >
        Kembali
      </Button>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Beras Campur</h3>
        </div>
        <div className="card-body">
          <Table
            style={{ marginTop: "2rem" }}
            striped
            bordered
            hover
            responsive
            className="text-nowrap"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Keterangan</th>
                <th>Harga</th>
                <th>Berat</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {berasCampuran.data?.data.map(
                (el, idx) =>
                  el.stock !== 0 && (
                    <tr key={el.id + "beras_campuran"}>
                      <td>{idx + 1}</td>
                      <td>{el.keterangan}</td>
                      <td>
                        Rp.{" "}
                        {(
                          Number(el.harga) + totalHargaBeras(el.modal_kelola)
                        ).toLocaleString("id-ID")}{" "}
                        /Kg
                      </td>
                      <td>{Number(el.berat).toLocaleString("id-ID")} Kg</td>
                      <td>{Number(el.stock).toLocaleString("id-ID")} Kg</td>
                      <td>
                        <ModalJual
                          cekStatus={cekStatusPenjualan(el.penjualan)}
                          harga_modal={
                            Number(el.harga) + totalHargaBeras(el.modal_kelola)
                          }
                          idBerasKelola={el.id}
                          stock={Number(el.stock)}
                        />
                        <ListModalKelola
                          tipe={el.tipe}
                          berat={el.berat}
                          data={el.modal_kelola}
                          idBerasKelola={el.id}
                          status={el.status}
                        />
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BerasCampur;
