var loginBtn = document.getElementById("loginBtn");
var loginEmail = document.getElementById("loginEmail");
var loginPass = document.getElementById("loginPass");
var userName = document.getElementById("userName");
var logoutBtn = document.querySelector(".nav-btn");

//welcome in home page
function sayWelcome() {
  var userNamee = localStorage.getItem("uName");
  if (userNamee) {
    userName.innerHTML = `<h1 >Welcome  ${userNamee}</h1>`;
  }
}
function isLoginEmpty() {
  if (loginEmail.value == "" || loginPass.value == "") {
    return true;
  } else {
    return false;
  }
}

function login() {
  if (isLoginEmpty()) {
    allInputReq();
    return true;
  }
  var password = loginPass.value;
  var email = loginEmail.value;
  for (var i = 0; i < userList.length; i++) {
    if (
      userList[i].email.toLowerCase() == email.toLowerCase() &&
      userList[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("uName", userList[i].name);
      sayWelcome();
      openHomePage();
      return;
    }
  }
  emailExistAlert();
}
loginBtn.addEventListener("click", login);

//move to signup page
signLink.addEventListener("click", function () {
  signupSection.classList.remove("d-none");
  loginSection.classList.add("d-none");
  title.innerText = "SignUp";
  favicon.setAttribute("href", "./img/add-user.png");
});

function emailExistAlert() {
  Swal.fire({
    title: "Oops !",
    text: "incorrect email or password",
    icon: "warning",
  });
}

function openHomePage() {
  header.classList.remove("d-none");
  loginSection.classList.add("d-none");
  title.innerText = "Home";
  favicon.setAttribute("href", "./img/house.png");
}

//logout
function logout() {
  localStorage.removeItem("uName");
  location.href = "./index.html";
}
logoutBtn.addEventListener("click", logout);
