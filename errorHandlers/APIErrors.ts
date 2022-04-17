export const apiErrorHandler = (error, req, res, next) => {
  if (error.name == "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  }

  if (error.name == "TypeError") {
    return res.status(400).send({
      error: "Something went wrong.",
    });
  }

  next(error);
};
