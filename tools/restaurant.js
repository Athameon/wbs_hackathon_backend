const { Pool } = require("pg");
const pool = new Pool();

const getRestaurantTags = async (restaurants) => {
  for (let index = 0; index < restaurants.length; index++) {
    const querygetRestaurantTags = {
      text: `SELECT id, name 
      FROM restaurant_has_tag 
      JOIN tag 
        ON id_tag = id 
      WHERE id_restaurant = $1`,
      values: [restaurants[index].id],
    };

    const restaurantTags = await pool.query(querygetRestaurantTags);
    if (restaurantTags) {
      restaurants[index].tags = restaurantTags.rows;
    }
  }
};

const getRestaurantComments = async (restaurants) => {
  for (let index = 0; index < restaurants.length; index++) {
    const querygetRestaurantComments = {
      text: `SELECT * 
      FROM comment 
      WHERE restaurant_id = $1`,
      values: [restaurants[index].id],
    };

    const restaurantComments = await pool.query(querygetRestaurantComments);
    if (restaurantComments) {
      restaurants[index].comments = restaurantComments.rows;
    }
  }
};

const calculateAverageRating = async (restaurants) => {
  for (let index = 0; index < restaurants.length; index++) {
    if (restaurants[index].comments) {
      let ratingSum = 0;
      restaurants[index].comments.forEach((comment) => {
        ratingSum += comment.rating;
      });
      restaurants[index].avRating =
        ratingSum / restaurants[index].comments.length;
    }
  }
};

module.exports = {
  getRestaurantTags,
  getRestaurantComments,
  calculateAverageRating,
};
