const Token = require("../../models/token/token.model");


// Helper function to generate an eight-digit token
const generateEightDigitToken = () => {
  let token = "";
  const digits = "0123456789";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    token += digits[randomIndex];
  }

  return token;
};

// Generate and save a new token
const generateToken = async (req, res) => {
  try {
    const { price, meter } = req.body;
    //console.log(price);

    const tokenValueDays = Math.floor(price / 100);
    console.log(tokenValueDays);

    // Check if the token value exceeds the maximum (5 years)
    const maxTokenValueDays = 365 * 5;
    const tokenDays = Math.min(tokenValueDays, maxTokenValueDays);

    const token = generateEightDigitToken();

    const newToken = new Token({
      meterNumber:meter,
      token,
      tokenStatus: "NEW",
      tokenValueDays: tokenDays,
      amount:price,
    });

    //check if token has been already generated
    const tokenExists = await Token.findOne({ token });
    if(tokenExists.tokenStatus === "NEW"){
      token = generateEightDigitToken();
    }

    const generatedToken = await newToken.save();
    res.status(201).send(generatedToken);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get tokens by meter number
const getTokensByMeterNumber = async (req, res) => {
  const { meterNumber } = req.params;

  try {
    // Retrieve tokens from the database based on the meter number
    const tokens = await Token.find({ meterNumber });

    if (tokens.length === 0) {
      // No tokens found for the meter number
      return res.status(404).json({ error: "No tokens found" });
    }

    return res.status(200).json({ tokens });
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const validateToken = async (req, res) => {
  const { token } = req.body;

  try {
    // Retrieve the token from the database based on the entered token
    const tokenData = await Token.findOne({ token });

    if (!tokenData) {
      // Token doesn't exist in the database
      return res.status(400).json({ error: "Invalid token" });
    }

    if (
      tokenData.tokenStatus === "USED" ||
      tokenData.tokenStatus === "EXPIRED"
    ) {
      // Token is already used or expired
      return res.status(400).json({ error: "Token is invalid" });
    }

    const currentDate = new Date();
    const purchasedDate = tokenData.purchasedDate;
    const tokenValueDays = tokenData.tokenValueDays;

    // Calculate expiration date based on token value days
    const expirationDate = new Date(
      purchasedDate.getTime() + tokenValueDays * 24 * 60 * 60 * 1000
    );

    if (currentDate > expirationDate) {
      // Token has expired
      tokenData.tokenStatus = "EXPIRED";
      await tokenData.save();

      return res.status(400).json({ error: "Token has expired" });
    }

    // Token is valid
    const daysOfLighting = tokenValueDays;
    return res.status(200).json({ daysOfLighting });
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


module.exports = { generateToken, getTokensByMeterNumber, validateToken };

