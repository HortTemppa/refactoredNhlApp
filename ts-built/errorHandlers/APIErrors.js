"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const apiErrorHandler = (error, request, response, next) => {
    if (error.name == "CastError" && error.kind === "ObjectId") {
        return response.status(400).send({ error: "malformatted id" });
    }
    next(error);
};
exports.apiErrorHandler = apiErrorHandler;
