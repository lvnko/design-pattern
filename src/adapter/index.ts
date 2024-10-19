/**
 * ## 轉接器模式
 * ---
 * ### 解說
 * 又成為 Wrapper Pattern, 本質上其實就是將 function, 或 class 外面「包一層」。
 * 以符合所需要的輸入、輸出
 *
 */

/**
 * 需求：輸入數字，可以輸出相對應的 ASCII
 */
const returnValueAsInput = (value: number) => value;

const adaptValueFromInputToAscii = (value: number) =>
    String.fromCharCode(returnValueAsInput(value));

const inputValue: number = 65;
const result = adaptValueFromInputToAscii(inputValue); // A

console.log(`Output value returned by adaptValueFromInputToAscii(${inputValue}) is => ${result}`);

// $ ts-node src/adapter
// Output value returned by adaptValueFromInputToAscii(65) is => A