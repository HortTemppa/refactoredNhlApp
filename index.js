const express = require("express");

const nhlApp = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

nhlApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
