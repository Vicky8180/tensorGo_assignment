require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:3000", // Frontend origin
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, //
    },
  })
);

async function verifyToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Client ID from Google
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    throw new Error("Token verification failed");
  }
}

app.post("/auth/google/login", async (req, res) => {
  const { token } = req.body;

  try {
    const userData = await verifyToken(token);

    console.log(userData);
    req.session.user = userData;

    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Google login failed", error: error.message });
  }
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.session.user);
});

app.get("/communication-history", async (req, res) => {
  console.log(res.session);
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const response = await axios.get(
      "https://api.postmarkapp.com/messages/outbound",
      {
        headers: {
          "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch communication history" });
  }
});

app.post("/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res
      .status(400)
      .json({ message: "To, Subject, and Body are required." });
  }

  try {
    const response = await axios.post(
      "https://api.postmarkapp.com/email",
      {
        From: "", // Replace with your verified sender email
        To: to,
        Subject: subject,
        HtmlBody: body,
      },
      {
        headers: {
          "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY, // API key for Postmark
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Failed to send email",
      error: error.response?.data || error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
