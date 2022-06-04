module.exports = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json(err.message);
  } else res.status(err.statusCode).json(err);
};
