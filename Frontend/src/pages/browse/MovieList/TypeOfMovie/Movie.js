const Movie = (props) => {
  // Sử dụng onClick event để lấy trả về id của phim khi click vào hình ảnh
  return <img src={props.img} onClick={(e) => props.onDetail(e, props.id)} />;
};

export default Movie;
