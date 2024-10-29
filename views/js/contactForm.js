document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Gather form data

    try {
      const response = await fetch(this.action, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully!"); // Show success alert
        this.reset(); // Clear input fields
      } else {
        alert("Error: " + result.message); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later."); // Show error alert
    }
  });
