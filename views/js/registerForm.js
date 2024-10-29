document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        document.getElementById("errorMessage").innerText =
          errorData.message || errorData.error;
      } else {
        const data = await response.json();
        // Redirect to another page or show success message
        window.location.href = "/welcome";
      }
    } catch (error) {
      document.getElementById("errorMessage").innerText =
        "An unexpected error occurred.";
    }
  });
