import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertError, alertSuccess } from "../assets/js/Sweetalert";
import { getLogin } from "../redux/auth/AuthAction";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div align="center">
      <Container>
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <h1>
                <b>Beras </b>RONI
              </h1>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <div className="input-group mb-3">
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    setUsername(value);
                  }}
                  className="form-control"
                  placeholder="Username"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                  }}
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-4">
                  <button
                    onClick={() => {
                      dispatch(
                        getLogin({
                          username,
                          password,
                        })
                      )
                        .then(() => {
                          alertSuccess("login success");
                        })
                        .catch((err) => {
                          let msg = "";
                          if (err.message) {
                            msg = err.message;
                          } else {
                            msg = "username dan password tidak boleh kosong";
                          }
                          alertError(msg);
                        });
                    }}
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
