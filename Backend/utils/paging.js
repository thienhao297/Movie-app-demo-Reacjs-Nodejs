const Paging = (data, pageNum, gereName = null) => {
  const total_pages = Math.round(data.length / 20);
  const result = [];
  for (let i = 0; i < data.length; i += 20) {
    const chunk = data.slice(i, i + 20);
    result.push(chunk);
  }
  const pageN = pageNum ? pageNum : 1;
  return {
    results: result[pageN - 1],
    page: pageN ? pageN : 1,
    total_pages: total_pages,
    genre_name: gereName,
  };
};

module.exports = Paging;
