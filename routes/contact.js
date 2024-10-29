const express = require("express");
const router = express.Router();
const { sendEmail } = require("../services/emailService"); // Adjust the path as needed

// Handle contact form submission
router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Construct email content
  const subject = "New Contact Us Message";
  const html = `
    <h3>Contact Us Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  try {
    await sendEmail({
      to: process.env.USER_EMAIL, // Replace with your email or use an environment variable
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
