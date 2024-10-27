// Function to toggle the navbar
const toggleNavbar = () => {
  const navbar = document.getElementById('navbarSupportedContent');
  navbar.classList.toggle('show'); // Toggle the custom 'show' class
};

// Event listener for the toggle button
document.querySelector('.navbar-toggler').addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent the click from bubbling up to the document
  toggleNavbar(); // Call the toggle function
});

// Close the navbar when clicking outside of it
document.addEventListener('click', function(event) {
  const toggleButton = document.querySelector('.navbar-toggler');
  const navbarContent = document.getElementById('navbarSupportedContent');

  // If the click was outside the navbar and toggle button
  if (!navbarContent.contains(event.target) && !toggleButton.contains(event.target)) {
      navbarContent.classList.remove('show'); // Hide the navbar if clicked outside
  }
});

// Close the navbar when clicking on a menu item
document.querySelectorAll('.navbar-nav .nav-link').forEach(item => {
  item.addEventListener('click', () => {
      const navbarContent = document.getElementById('navbarSupportedContent');
      navbarContent.classList.remove('show'); // Hide the navbar
  });
});
