const items = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

function calculateBill(order, isWednesday, tipIncluded) {
    let subTotal = 0;
    for (let i = 0; i < order.length; i++) {
        subTotal += order[i].price * order[i].quantity;
    }

    let discountPercent = 0;
    if (subTotal > 1000000) {
        discountPercent = 15;
    } else if (subTotal > 500000) {
        discountPercent = 10;
    }

    if (isWednesday) {
        discountPercent += 5;
    }

    const discountAmount = subTotal * (discountPercent / 100);
    const afterDiscount = subTotal - discountAmount;
    const vatAmount = afterDiscount * 0.08;
    const tipAmount = tipIncluded ? afterDiscount * 0.05 : 0;
    const total = afterDiscount + vatAmount + tipAmount;

    const formatCurrency = (num) => num.toLocaleString("vi-VN") + "đ";

    const printLine = (label, value) => {
        const left = `|| ${label}`;
        const right = `${value} ||`;
        const spaces = 40 - left.length - right.length;
        console.log(left + " ".repeat(Math.max(0, spaces)) + right);
    };

    console.log("=".repeat(40));
    console.log("||" + "HÓA ĐƠN NHÀ HÀNG".padStart(26, " ").padEnd(36, " ") + "||");
    console.log("=".repeat(40));

    for (let i = 0; i < order.length; i++) {
        const item = order[i];
        const name = `${i + 1}. ${item.name}`.padEnd(14, " ");
        const qty = `x${item.quantity}`.padEnd(4, " ");
        const price = `@${item.price / 1000}k`.padEnd(6, " ");
        const lineTotal = `= ${item.price * item.quantity / 1000}k`;

        const left = `|| ${name} ${qty} ${price}`;
        const right = `${lineTotal} ||`;
        const spaces = 40 - left.length - right.length;
        console.log(left + " ".repeat(Math.max(0, spaces)) + right);
    }

    console.log("=".repeat(40));
    printLine("Tổng cộng:", formatCurrency(subTotal));
    printLine(`Giảm giá (${discountPercent}%):`, formatCurrency(discountAmount));
    printLine("VAT (8%):", formatCurrency(vatAmount));
    printLine("Tip (5%):", formatCurrency(tipAmount));
    console.log("=".repeat(40));
    printLine("THANH TOÁN:", formatCurrency(total));
    console.log("=".repeat(40));
}

const todayIsWednesday = new Date().getDay() === 3;
calculateBill(items, todayIsWednesday, true);