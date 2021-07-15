const getAllTags = (req, res, next) => {
  const tags = [
    {
      id: 1,
      tag: "nict",
    },
    {
      id: 2,
      tag: "good",
    },
    {
      id: 3,
      tag: "fast",
    },
  ];

  res.send(tags);
};

const getTagById = (req, res, next) => {
  const { id } = req.params;

  const tag = {
    id: 1,
    tag: "nict",
  };

  res.send(tag);
};

const createNewTag = (req, res, next) => {
  console.log(req.body);

  res.send(req.body);
};

module.exports = {
  getTagById,
  getAllTags,
  createNewTag,
};
