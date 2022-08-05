const { transform, transformSync, transformFileSync } = require("@babel/core");

const c_result = transformSync("const ABC = 'ABC'; const C = ABC ?? 'C';", {
    plugins: ["./my-plugin"]
});
if (c_result) {
    console.log(c_result.code);
}

// const f_result = transformFileSync('./index.js', {
//     filename: 'main.js',
//     ast: true,
//     code: false,
// })
// if (f_result) {
//     console.log(f_result.code, f_result.map, f_result.ast);
// }
