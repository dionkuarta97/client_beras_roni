const InfoBoX = (props) => {
  const { title } = props;
  return (
    <>
      <div class="info-box">
        <span class="info-box-icon bg-info elevation-1">
          <i class="fas fa-cog"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">{title}</span>
          <span class="info-box-number">Sabar dulu bos</span>
        </div>
      </div>
    </>
  );
};

export default InfoBoX;
