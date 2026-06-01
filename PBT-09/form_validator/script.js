const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");

let validName = false;
let validEmail = false;
let validPassword = false;
let validConfirm = false;
let validPhone = false;

nameInput.addEventListener("input",()=>{
    const value = nameInput.value.trim();
    if(value.length >= 2 && value.length <= 50){
        document.getElementById("nameStatus").textContent = "✅";
        validName = true;
    }else{
        document.getElementById("nameStatus").textContent = "❌";
        validName = false;
    }
    checkForm();
});

emailInput.addEventListener("input",()=>{
    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(emailInput.value)){
        document.getElementById("emailError").textContent = "";
        validEmail = true;
    }else{
        document.getElementById("emailError").textContent = "Email không hợp lệ";
        validEmail = false;
    }
    checkForm();
});

passwordInput.addEventListener("input",()=>{
    const pass = passwordInput.value;
    const fill = document.getElementById("strengthFill");
    const text = document.getElementById("strengthText");

    if(pass.length < 8){
        fill.style.width = "33%";
        fill.style.background = "red";
        text.textContent = "Yếu";
        validPassword = false;

    }else if(
        /[a-zA-Z]/.test(pass) &&
        /\d/.test(pass) &&
        !/[!@#$%^&*]/.test(pass)
    ){
        fill.style.width = "66%";
        fill.style.background = "orange";
        text.textContent = "Trung bình";
        validPassword = true;

    }else if(
        /[a-z]/.test(pass) &&
        /[A-Z]/.test(pass) &&
        /\d/.test(pass) &&
        /[!@#$%^&*]/.test(pass)
    ){
        fill.style.width = "100%";
        fill.style.background = "green";
        text.textContent = "Mạnh";
        validPassword = true;
    }
    validateConfirm();
    checkForm();
});

confirmInput.addEventListener("input",()=>{
    validateConfirm();
    checkForm();
});

function validateConfirm(){
    if(confirmInput.value === passwordInput.value
        && confirmInput.value !== ""){
        document.getElementById("confirmError").textContent = "";
        validConfirm = true;
    }else{
        document.getElementById("confirmError").textContent = "Mật khẩu không khớp";
        validConfirm = false;
    }
}

/* Phone Format */

phoneInput.addEventListener("input",()=>{

    let value = phoneInput.value.replace(/\D/g,'');

    value = value.substring(0,10);

    if(value.length > 4){
        value =
            value.slice(0,4) +
            "-" +
            value.slice(4);
    }

    if(value.length > 8){
        value =
            value.slice(0,8) +
            "-" +
            value.slice(8);
    }

    phoneInput.value = value;

    if(value.replace(/-/g,'').length === 10){
        document.getElementById("phoneError")
            .textContent = "";
        validPhone = true;
    }else{
        document.getElementById("phoneError")
            .textContent =
            "Số điện thoại phải đủ 10 số";
        validPhone = false;
    }
    checkForm();
});

function checkForm(){
    submitBtn.disabled = !(
        validName &&
        validEmail &&
        validPassword &&
        validConfirm &&
        validPhone
    );
}

document
.getElementById("registerForm")
.addEventListener("submit",(e)=>{
    e.preventDefault();
    const info = `
        <p><b>Họ tên:</b> ${nameInput.value}</p>
        <p><b>Email:</b> ${emailInput.value}</p>
        <p><b>Phone:</b> ${phoneInput.value}</p>
    `;

    document
        .getElementById("userInfo")
        .innerHTML = info;

    document
        .getElementById("modal")
        .style.display = "block";
});

document
.getElementById("closeModal")
.addEventListener("click",()=>{
    document
        .getElementById("modal")
        .style.display = "none";
});