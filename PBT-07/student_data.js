const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 4. Đếm số SV mỗi xếp loại
let countGioi = 0;
let countKha = 0;
let countTB = 0;
let countYeu = 0;

// 5. Tìm SV có điểm TB cao nhất và thấp nhất
let maxStudent = null;
let minStudent = null;

// 6. Tính điểm TB toàn lớp cho từng môn
let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

// 7. Bonus: Tính điểm TB theo giới tính
let totalMaleGPA = 0;
let countMale = 0;
let totalFemaleGPA = 0;
let countFemale = 0;

const processedStudents = [];

for (let i = 0; i < students.length; i++) {
    let sv = students[i];

    // 1. Tính điểm trung bình (áp dụng hệ số)
    let gpa = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    // Làm tròn 1 chữ số thập phân cho đẹp
    gpa = Math.round(gpa * 10) / 10;

    // 2. Xếp loại dựa trên gpa
    let xepLoai = "";
    if (gpa >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (gpa >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (gpa >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    processedStudents[processedStudents.length] = {
        stt: i + 1,
        name: sv.name,
        gpa: gpa.toFixed(1),
        xepLoai: xepLoai
    };

    // 5. So sánh tìm max / min điểm trung bình
    if (maxStudent === null || gpa > maxStudent.gpa) {
        maxStudent = { name: sv.name, gpa: gpa };
    }
    if (minStudent === null || gpa < minStudent.gpa) {
        minStudent = { name: sv.name, gpa: gpa };
    }

    // 6. Cộng dồn điểm để tính TB môn
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    // 7. Thống kê theo giới tính
    if (sv.gender === "M") {
        totalMaleGPA += gpa;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleGPA += gpa;
        countFemale++;
    }
}

// 3. In bảng kết quả
console.log("3. BẢNG KẾT QUẢ:");
console.log("| STT | Tên     | TB  | Xếp loại   |");
console.log("|-----|---------|-----|------------|");
for (let i = 0; i < processedStudents.length; i++) {
    let p = processedStudents[i];
    let sttStr = (p.stt + "").padEnd(3);
    let nameStr = p.name.padEnd(7);
    let gpaStr = p.gpa.padEnd(3);
    let xlStr = p.xepLoai.padEnd(10);
    console.log(`| ${sttStr} | ${nameStr} | ${gpaStr} | ${xlStr} |`);
}
console.log("\n----------------------------------------\n");

// 4. In số lượng SV mỗi xếp loại
console.log("4. THỐNG KÊ XẾP LOẠI:");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu: ${countYeu} SV`);
console.log("\n----------------------------------------\n");

// 5. In SV có điểm TB cao nhất và thấp nhất
console.log("5. THỐNG KÊ ĐIỂM CAO NHẤT / THẤP NHẤT:");
console.log(`- SV có điểm TB cao nhất: ${maxStudent.name} (${maxStudent.gpa})`);
console.log(`- SV có điểm TB thấp nhất: ${minStudent.name} (${minStudent.gpa})`);
console.log("\n----------------------------------------\n");

// 6. Tính và in điểm TB toàn lớp cho từng môn
console.log("6. ĐIỂM TRUNG BÌNH MÔN TOÀN LỚP:");
console.log(`- Toán (Math): ${(totalMath / students.length).toFixed(2)}`);
console.log(`- Vật lý (Physics): ${(totalPhysics / students.length).toFixed(2)}`);
console.log(`- Tin học (CS): ${(totalCS / students.length).toFixed(2)}`);
console.log("\n----------------------------------------\n");

// 7. Bonus: Tính và in điểm TB theo giới tính
console.log("7. BONUS: ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH:");
console.log(`- Nam (M): ${(totalMaleGPA / countMale).toFixed(2)}`);
console.log(`- Nữ (F): ${(totalFemaleGPA / countFemale).toFixed(2)}`);