let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function saveStudents() { 
    localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents(){
    studentList.innerHTML = "";
    if(students.length == 0){
        studentList.innerHTML = `
        <tr>
            <td colspan="7">Chưa có sinh viên nào</td>
        </tr>
        `;
        updateSummary();
        return;
    }
    students.forEach((student,index)=>{
        const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${student.msv}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.cl}</td>
            <td>${student.dtb}</td>
            <td>
                <button class="btn-edit" data-index="${index}">Sửa</button>
                <button class="btn-delete" data-index="${index}">Xóa</button>
            </td>
        </tr>
        `;
        studentList.innerHTML += row;
    });
    updateSummary();
}

function updateSummary(){
    document.getElementById("totalStudent").innerText = students.length;
    if(students.length == 0){
        document.getElementById("avgGPA")
        .innerText = 0;
        return;
    }
    const total = students.reduce((sum,student)=>{
        return sum + Number(student.dtb);
    },0);
    const avg = total / students.length;
    document.getElementById("avgGPA").innerText = avg.toFixed(2);
}

function resetForm(){
    document.getElementById("form-js").reset();
    document.querySelectorAll(".error")
    .forEach(error =>{
        error.textContent = "";
    });
    document.querySelectorAll("input,select")
    .forEach(input=>{
        input.classList.remove(
            "input-error"
        );
    });
}

var studentList = document.getElementById("studentList");

studentList.addEventListener("click",(e)=>{
    const index = e.target.dataset.index;
    if(
        e.target.classList.contains("btn-edit")
    ){
        editStudent(index);
    }
    if(
        e.target.classList.contains("btn-delete")
    ){
        deleteStudent(index);
    }
});

document.getElementById("btnAdd").addEventListener("click", openFormAdd);

function openFormAdd() {
    editIndex=-1;
    resetForm();
    document.getElementById("formTitle").innerText = "Thêm Sinh Viên";
    document.getElementById("modal").style.display = "flex";
}

function closeForm() {
    resetForm();
    document.getElementById("modal").style.display = "none";
}

function showMessage(text){
    document.getElementById("message").innerText = text;
    setTimeout(()=>{
        document.getElementById("message")
        .innerText = "";
    },3000);
}

document.getElementById('form-js').addEventListener('submit', function(event) {
    event.preventDefault();
    var isValid = true;
    var msv = document.getElementById('msv2');
    var name = document.getElementById('name2');
    var dob = document.getElementById('dbt2');
    var dtb = document.getElementById('dtb2');
    var email = document.getElementById('email2');
    var password = document.getElementById('password2');
    var pw = document.getElementById('pw2');
    var cl = document.getElementById('cl2');

    document.querySelectorAll('.error').forEach(e => e.textContent = '');

    if (!msv.value.trim()){
        isValid = false;
        document.getElementById('error-msv2').textContent = 'Không được để trống';
    }
    else if (!/^SV\d{6}$/.test(msv.value.trim())) {
        isValid = false;
        document.getElementById('error-msv2').textContent = 'MSV phải dạng SV123456';
    }

    if (!name.value.trim()) {
        isValid = false;
        document.getElementById('error-name2').textContent = 'Không được để trống';
    }
    else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(name.value.trim())) {
        isValid = false;
        document.getElementById('error-name2').textContent = 'Chỉ chứa chữ và khoảng trắng';
    }

    if (!dob.value) {
        isValid = false;
        document.getElementById('error-dbt2').textContent = 'Không được để trống';
    } else {
        var birth = new Date(dob.value);
        var today = new Date();
        var age = today.getFullYear() - birth.getFullYear();

        if (age < 18) {
            isValid = false;
            document.getElementById('error-dbt2').textContent = 'Phải đủ 18 tuổi';
        }
    }

    if (!cl.value) {
        isValid = false;
        document.getElementById('error-cl2').textContent = 'Phải chọn lớp';
    }

    if (!dtb.value.trim()) {
        isValid = false;
        document.getElementById('error-dtb2').textContent = 'Không được để trống';
    }
    else if (!/^\d+(\.\d{1,2})?$/.test(dtb.value) || dtb.value < 0 || dtb.value > 10) {
        isValid = false;
        document.getElementById('error-dtb2').textContent = 'Từ 0-10, tối đa 2 số thập phân';
    }

    if (!email.value.trim()) {
        isValid = false;
        document.getElementById('error-email2').textContent = 'Không được để trống';
    }
    else if (!/^[\w.-]+@student\.edu\.vn$/.test(email.value.trim())) {
        isValid = false;
        document.getElementById('error-email2').textContent = 'Email phải @student.edu.vn';
    }

    if (!password.value.trim()) {
        isValid = false;
        document.getElementById('error-password2').textContent = 'Không được để trống';
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password.value)) {
        isValid = false;
        document.getElementById('error-password2').textContent =
            'Ít nhất 8 ký tự, có hoa, thường, số, ký tự đặc biệt';
    }

    if (!pw.value.trim()) {
        isValid = false;
        document.getElementById('error-pw2')
        .textContent = 'Không được để trống';
    }
    else if (pw.value !== password.value) {
        isValid = false;
        document.getElementById('error-pw2').textContent = 'Không khớp mật khẩu';
    }

    if(isValid){
        const student = {
            msv: msv.value.trim(),
            name: name.value.trim(),
            dob: dob.value,
            cl: cl.value,
            dtb: dtb.value,
            email: email.value.trim(),
            password: password.value
        };
        if(editIndex === -1){
            students.push(student);
            showMessage("Thêm sinh viên thành công!");
        }else{
            students[editIndex] = student;
            showMessage("Cập nhật thành công!");
            editIndex = -1;
        }
        saveStudents();
        renderStudents();
        closeForm();
    }
});

function editStudent(index){
    editIndex = index;
    const student = students[index];

    document.getElementById("msv2").value =
    student.msv;

    document.getElementById("name2").value =
    student.name;

    document.getElementById("dbt2").value =
    student.dob;

    document.getElementById("cl2").value =
    student.cl;

    document.getElementById("dtb2").value =
    student.dtb;

    document.getElementById("email2").value =
    student.email;

    document.getElementById("password2").value =
    student.password;

    document.getElementById("pw2").value =
    student.password;
    
    document.getElementById("formTitle").innerText = "Sửa Sinh Viên";
    document.getElementById("modal").style.display = "flex";
}

function deleteStudent(index){
    const confirmDelete = confirm(
        "Bạn chắc chắn muốn xóa?"
    );
    if(confirmDelete){
        students.splice(index,1);
        saveStudents();
        renderStudents();
        showMessage("Xóa thành công!");
    }
}

renderStudents();