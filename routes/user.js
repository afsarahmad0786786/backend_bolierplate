require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const router = express.Router();
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      res.json({ message: "Login successful", qrCodeUrl: user.qrCodeUrl });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.findOne({ email: userData.email });

    if (user) {
      return res.status(401).json({ error: "Email is already register." });
    }

    const mfaSecret = speakeasy.generateSecret({
      length: 20,
      name: "employee-manager",
    });

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      country: userData.country,
      mfaSecret: mfaSecret.base32,
    });

    await newUser.save();

    // Generate a QR code for the user to scan
    const qrCode = await QRCode.toDataURL(mfaSecret.otpauth_url);
    res.status(200).json({ newUser, qrCodeUrl: qrCode });
    console.log("Secret Key:", mfaSecret.base32);
    console.log("QR Code Image URL:", qrCode);
  } catch (error) {
    console.error("Error creating a new user:", error);
    res.status(500).json({ error: "Failed to create a new user" });
  }
});

router.post("/mfa-verify", async (req, res) => {
  try {
    const { email, mfaToken } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(JSON.stringify(user));
    var token = speakeasy.totp({
      secret: user.mfaSecret,
      encoding: "base32",
    });
    console.log("Token is ", token);
    console.log(`mfaTOken is ${mfaToken} and secret is ${user.mfaSecret}`);
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token: mfaToken,
    });
    console.log("verified is ", verified);
    if (verified) {
      const jwtFToken = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, {
        expiresIn: "20m",
      });
      console.log("token", jwtFToken);
      res.json({ message: "Verification successful", jwtToken: jwtFToken });
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (errorundefined) {
    console.error("Error during verification:", errorundefined);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;
