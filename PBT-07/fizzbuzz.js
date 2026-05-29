console.log("--- VERSION 1: CLASSIC FIZZBUZZ (1-100) ---");

for (let i = 1; i <= 100; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    console.log(output || i);
}

console.log("\n--- VERSION 2: CUSTOM FIZZBUZZ ---");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";

        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }

        console.log(`${i} = ${output || i}`);
    }
}

customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);