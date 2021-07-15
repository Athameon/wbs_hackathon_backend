const getAllCities = (req, res, next) => {
  const cities = [
    { id: 42, name: "Hamburg" },
    { id: 10, name: "Munich" },
  ];

  res.send(cities);
};

const getRestaurantByCityId = (req, res, next) => {
  const { id } = req.params;

  const city = {
    id: 1,
    name: "Burger Fries",
    pos: [9.784575, 7.89658],
    tags: [
      { id: "1", tag: "nict" },
      { id: "3", tag: "veggy" },
    ],
    city: { id: 23, name: "Hamburg" },
    comments: [
      {
        id: 56,
        name: "Jugesh",
        rating: 2,
        comment: "To fast not good",
      },
    ],
    avRating: 2,
    picture:
      "https://media-cdn.tripadvisor.com/media/photo-s/01/e6/aa/f2/schloss-steinburg.jpg",
  };

  res.send(city);
};

const createNewCity = (req, res, next) => {
  console.log(req.body);

  res.send(req.body);
};

module.exports = {
  getRestaurantByCityId,
  getAllCities,
  createNewCity,
};
