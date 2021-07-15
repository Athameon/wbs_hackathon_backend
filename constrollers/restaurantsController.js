const User = require("../models/userModel");

const getAllRestaurants = (req, res, next) => {
  const restaurants = [
    {
      id: 1,
      name: "Burger Fries",
      pos: [9.784575, 7.89658],
      tags: [
        { id: 1, tag: "nict" },
        { id: 3, tag: "veggy" },
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
    },
    {
      id: 2,
      name: "Mc Donnalds",
      pos: [9.784585, 7.84658],
      tags: [
        { id: 1, tag: "nice" },
        { id: 2, tag: "fast" },
      ],
      city: { id: 23, name: "Hamburg" },
      comments: [
        {
          id: 4,
          name: "Ben",
          rating: 5.5,
          comment: "Nice people",
        },
        {
          id: 56,
          name: "Tim",
          rating: 1.5,
          comment: "Bad people",
        },
      ],
      avRating: 3.5,
    },
  ];

  res.send(restaurants);
};

const getRestaurantById = (req, res, next) => {
  const { id } = req.params;
  const restaurant = {
    id: 1,
    name: "Burger Fries",
    pos: [9.784575, 7.89658],
    tags: [
      { id: 1, tag: "nict" },
      { id: 3, tag: "veggy" },
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
  };
  res.send(restaurant);
};

const createNewRestaurant = (req, res, next) => {
  console.log(req.body);

  res.send(req.body);
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createNewRestaurant,
};
