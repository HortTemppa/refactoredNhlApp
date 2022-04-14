"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidRoute = void 0;
const invalidRoute = (req, res) => {
    res.status(404).send("Nothing here.");
};
exports.invalidRoute = invalidRoute;
