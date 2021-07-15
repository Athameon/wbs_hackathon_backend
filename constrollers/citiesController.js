const getAllCities = (req, res, next) => {
  const cities = [
    { id: 42, name: "Hamburg" },
    { id: 10, name: "Munich" },
  ];

  res.send(cities);
};

const getCityById = (req, res, next) => {
  const { id } = req.params;

  const city = { id: 42, name: "Hamburg" };

  res.send(city);
};

const createNewCity = (req, res, next) => {
  console.log(req.body);

  res.send(req.body);
};

module.exports = {
  getCityById,
  getAllCities,
  createNewCity,
};
