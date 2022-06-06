const Header = () => {
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}

          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" role="button">
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
