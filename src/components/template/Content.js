const Content = (props) => {
  const { children, title } = props;
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">{children}</section>
      <section className="content">
        <br />
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default Content;
