const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

const users = JSON.parse(localStorage.getItem("users")) || [];

loginButton.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("loggedInUser", email);

    window.location.href = "/index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

// function toggleNavbar(isLoggedIn) {
//   const navbar = document.getElementById("navbar");

//   if (isLoggedIn) {
//     // Show "Log Out" and welcome message
//     const loggedInUser = localStorage.getItem("loggedInUser");
//     navbar.innerHTML = `
//             <span>Welcome, ${loggedInUser}</span>
//             <a href="#" id="signOut-button">Log Out</a>
//         `;

//     // Handle Log Out
//     document.getElementById("signOut-button").addEventListener("click", () => {
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("loggedInUser");
//       toggleNavbar(false);
//     });
//   } else {
//     // Show "Log In"
//     navbar.innerHTML = `<a href="/login.html">Log In</a>`;
//   }
// }
