"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nhl_1 = __importDefault(require("./routers/nhl"));
const APIErrors_1 = require("./errorHandlers/APIErrors");
const nhlApp = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
nhlApp.use("/api/nhl/", nhl_1.default);
nhlApp.use(APIErrors_1.apiErrorHandler);
nhlApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
