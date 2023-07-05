import { Col, Row } from "react-bootstrap";
import InfoBoX from "./dashboardComponent/InfoBox";

const Dashboard = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Dashboard</h3>
        </div>
        <div className="card-body">
          <div align="center">
            <h3>Beras Masuk</h3>
          </div>
          <Row>
            <Col md={4} xs={4}>
              <InfoBoX title={"Beras Ready"} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
