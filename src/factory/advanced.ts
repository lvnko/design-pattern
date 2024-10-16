/**
 * ## 光場模式
 * -----------------------------------------------------------
 * #### 定義：提供一個工廠介面，將產生 instance 的程式碼交由子類別各自實現
 * #### 講解：確保使用者不需要了解工廠內部的實際過程，僅需要給予關鍵字，
 *           即可獲得相對應的 instance
 * #### 使用場合或情境：
 *      - 一係列物件性質相近，僅有少部分差異的時候，很適合使用。
 *      - ex. 同值性高的商品，服務 ...etc
 * 
 * Hint：工廠模式巧面睇運用了多行的概念
 */

import { Car, BMW, MitsubishiFuso, RAV4 } from "./simple";


// 抽象工廠模式：

class AbstractFactory {
    static getCar() {};
}

class BMW_Factory implements AbstractFactory {
    static getCar() {
        return new BMW();
    }
}

class MitsubishiFuso_Factory implements AbstractFactory {
    static getCar() {
        return new MitsubishiFuso();
    }
}

class RAV4_Factory implements AbstractFactory {
    static getCar() {
        return new RAV4();
    }
}

const car1stAdv = BMW_Factory.getCar();
const car2ndAdv = MitsubishiFuso_Factory.getCar();
const car3rdAdv = RAV4_Factory.getCar();

console.log(`== Car Instances created by Advanced Factory Mode: ==`);
console.log(`${car1stAdv?.getName()} --> ${car1stAdv?.getType()}`);
console.log(`${car2ndAdv?.getName()} --> ${car2ndAdv?.getType()}`);
console.log(`${car3rdAdv?.getName()} --> ${car3rdAdv?.getType()}`);