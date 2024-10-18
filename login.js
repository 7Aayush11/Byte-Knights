document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#loginForm');
  const signupForm = document.querySelector('#signupForm');
  const homeSection = document.querySelector('.home');
  const formContainer = document.querySelector('.form_container');
  const closeBtn = document.querySelector('.form_close');
  const signupLink = document.querySelector('#signup');
  const loginLink = document.querySelector('#login');

  // Show the form
  homeSection.classList.add('show');

  // Switch to signup form
  signupLink.addEventListener('click', function (e) {
    e.preventDefault();
    formContainer.classList.add('active');
  });

  // Switch to login form
  loginLink.addEventListener('click', function (e) {
    e.preventDefault();
    formContainer.classList.remove('active');
  });

  // Close the form
  closeBtn.addEventListener('click', function () {
    homeSection.classList.remove('show');
  });

  // Handling form submission and redirection
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Perform form validation or other actions here

    // Redirect to a new page after login (dummy dashboard page here)
    window.location.href = 'dashboard.html';
  });

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Perform form validation or other actions here

    // Redirect to a new page after signup (dummy welcome page here)
    window.location.href = 'welcome.html';
  });
});
