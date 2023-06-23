const express = require("express");
const router = express.Router();
const {generateToken,getTokensByMeterNumber, validateToken} = require("../../controllers/token/token.controller");

router.get("/api/v1/", (req, res) => {
  res.send("WELCOME TO EUCL API!");
});

//generate a token
router.post("/api/v1/generateToken", generateToken);
//getting a token by meter number
router.get("/api/v1/tokens/:meterNumber", getTokensByMeterNumber);
//validating a token
router.post("/api/v1/tokens/validate", validateToken);



module.exports.TokenRouter = router;

