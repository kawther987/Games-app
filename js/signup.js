var signupname = document.getElementById("signupname");
var signupEmail = document.getElementById("signupEmail");
var signupPass = document.getElementById("signupPass");
var signupBtn = document.getElementById("signupBtn");
var loginLink = document.querySelector("#signup a");
var title = document.querySelector("title");
var signLink = document.querySelector("#login a");
var signupSection = document.getElementById("signup");
var header = document.querySelector("header");
var loginSection = document.querySelector("#login");
var favicon = document.querySelector("[rel='shortcut icon']");

var userList = [];
if (localStorage.getItem("users") != null) {
  userList = JSON.parse(localStorage.getItem("users"));
}

// for check email is exist
function isEmailExist() {
  for (var i = 0; i < userList.length; i++) {
    if (userList[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function isEmpitySignup() {
  if (
    signupEmail.value == "" ||
    signupname.value == "" ||
    signupPass.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

function signup() {
  if (isEmpitySignup()) {
    allInputReq();
    return true;
  }
  if (validationName() && validationEmail() && validationPass()) {
    var user = {
      name: signupname.value,
      email: signupEmail.value,
      password: signupPass.value,
    };

    if (isEmailExist()) {
      emailAlreadyExists();
      clearData();
      signupname.classList.remove("is-valid");
      signupEmail.classList.remove("is-valid");
      signupPass.classList.remove("is-valid");
    } else {
      userList.push(user);
      localStorage.setItem("users", JSON.stringify(userList));
      successAlert();
      clearData();
      signupname.classList.remove("is-valid");
      signupEmail.classList.remove("is-valid");
      signupPass.classList.remove("is-valid");
    }
  }
}
signupBtn.addEventListener("click", signup);
function emailAlreadyExists() {
  Swal.fire({
    title: "Sorry !",
    text: "email already exists",
    icon: "warning",
  });
}
function successAlert() {
  Swal.fire({
    title: "Great work !",
    text: "Your email is added ...",
    icon: "success",
  });
}
function allInputReq() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "All inputs is required !",
  });
}

loginLink.addEventListener("click", function () {
  signupSection.classList.add("d-none");
  loginSection.classList.remove("d-none");
  title.innerText = "Login";
  favicon.setAttribute("href", "./img/permission.png");
});

function clearData() {
  signupname.value = "";
  signupEmail.value = "";
  signupPass.value = "";
}
function validationName() {
  var text = signupname.value;
  var regax = /^\w{3,8}$/gm;
  if (regax.test(text)) {
    signupname.classList.add("is-valid");
    signupname.classList.remove("is-invalid");
    return true;
  } else {
    signupname.classList.remove("is-valid");
    signupname.classList.add("is-invalid");
    return false;
  }
}

function validationEmail() {
  var text = signupEmail.value;
  var regax = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
  if (regax.test(text)) {
    signupEmail.classList.add("is-valid");
    signupEmail.classList.remove("is-invalid");
    return true;
  } else {
    signupEmail.classList.remove("is-valid");
    signupEmail.classList.add("is-invalid");
    return false;
  }
}

function validationPass() {
  var text = signupPass.value;
  var regax = /^\w{5,}$/;
  if (regax.test(text)) {
    signupPass.classList.add("is-valid");
    signupPass.classList.remove("is-invalid");
    return true;
  } else {
    signupPass.classList.remove("is-valid");
    signupPass.classList.add("is-invalid");
    return false;
  }
}
