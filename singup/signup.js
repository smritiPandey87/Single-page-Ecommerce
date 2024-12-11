

function saveUser(email, password) {
  const user = { email, password };
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

 
  const isEmailTaken = existingUsers.some((u) => u.email === email);
  if (isEmailTaken) {
    return false; 
  }

  existingUsers.push(user);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  return true; 
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function redirectToProducts() {
  window.location.href = "/index.html";
}

document.querySelector(".signupbtn").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='psw']").value;
  const repeatPassword = document.querySelector(
    "input[name='psw-repeat']"
  ).value;

  if (password !== repeatPassword) {
    alert("Passwords do not match!");
    return;
  }

  const isUserSaved = saveUser(email, password);

  if (!isUserSaved) {
   alert ("This email is already registered! Try with another email.");

    return;
  }

  alert("Sign-up successful!");
  redirectToProducts();
});
