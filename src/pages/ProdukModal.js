import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModalTambahModal from "../components/forms/ModalTambahModal";
import { getModal } from "../redux/modal/ModalAction";

const ProdukModal = () => {
  const { id } = useParams();
  const { state } = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ModalReducer);

  useEffect(() => {
    dispatch(getModal({ category: id, stock: "ada", status: "active" }));
  }, []);

  return (
    <>
      <Button
        style={{
          marginBottom: "1rem",
        }}
        onClick={() => navigate("/modal")}
        variant="success"
      >
        Kembali
      </Button>
      {modal.loading && <LinearProgress color="inherit" />}
      <div className="card">
        <div className="card-header">
          <h2>
            <b>Tabel {state.category}</b>
          </h2>
        </div>
        <div className="card-body">
          <ModalTambahModal
            id={id}
            params={{ category: id, stock: "ada", status: "active" }}
          />
          <Table striped bordered hover responsive className="text-nowrap">
            <thead>
              <tr>
                <th>No</th>
                <th>Keterangan</th>
                <th>Tanggal Masuk</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modal.data?.data.map((el, idx) => (
                <tr key={el.id}>
                  <td>
                    {modal.data?.current_page * modal.data?.per_page -
                      modal.data?.per_page +
                      (idx + 1)}
                  </td>
                  <td>{el.keterangan}</td>
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

                  <td>{el.nama_pembuat}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() =>
                        navigate("/modal/detail", {
                          state: {
                            idModal: el.id,
                            category: state.category,
                            id: id,
                          },
                        })
                      }
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProdukModal;
