const express = require("express");
const he = require("he");
const router = express.Router();
const { sendEmail } = require("../services/emailService");

// Handle contact form submission
router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Construct email content
  const subject = "New Contact Us Message";
  const html = `
    <h3>Contact Us Form Submission</h3>
    <p><strong>Name:</strong> ${he.encode(name)}</p>
    <p><strong>Email:</strong> ${he.encode(email)}</p>
    <p><strong>Phone:</strong> ${he.encode(phone)}</p>
    <p><strong>Message:</strong> ${he.encode(message)}</p>
  `;

  try {
    await sendEmail({
      to: process.env.USER_EMAIL,
      subject,
      html,
    });
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending message. Please try again later." });
  }
});

module.exports = router;
