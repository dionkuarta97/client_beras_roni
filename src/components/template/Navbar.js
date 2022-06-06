import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setLogin } from "../../redux/auth/AuthAction";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { login } = useSelector((state) => state.AuthReducer);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}

      <a className="brand-link">
        <img
          src="https://w7.pngwing.com/pngs/479/409/png-transparent-red-and-white-storage-illustration-computer-icons-online-shopping-e-commerce-retail-store-icon.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />

        <span className="brand-text font-weight-light"> BERAS RONI</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          {login.data !== null && (
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link
                  to={"/"}
                  className={
                    location.pathname === "/" ? "nav-link active" : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-home" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/penjualan"}
                  className={
                    location.pathname === "/penjualan"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-money-bill" />
                  <p>Penjualan</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/modal"}
                  className={
                    location.pathname === "/modal"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-archive" />
                  <p>Modal</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/campuran"}
                  className={
                    location.pathname === "/campuran"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-mouse-pointer" />
                  <p>Campuran</p>
                </Link>
              </li>
              <li className="nav-item" style={{ marginTop: "5rem" }}>
                <Link
                  to={"/"}
                  onClick={() => {
                    dispatch(
                      setLogin({ data: null, loading: false, error: null })
                    );
                  }}
                  className={"nav-link"}
                >
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>Sign Out</p>
                </Link>
              </li>
            </ul>
          )}
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Navbar;
