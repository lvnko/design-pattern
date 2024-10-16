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

interface Car {
    wheelNumber: number;
    carType: string;
    
    getType(): string;
    getName(): string;
}

class BMW implements Car {
    wheelNumber: number = 4;
    carType: string = "car";

    getType = (): string => this.carType;
    getName = (): string => this.constructor.name;
}

class MitsubishiFuso implements Car {
    wheelNumber: number = 4;
    carType: string = "truck";

    getType = (): string => this.carType;
    getName = (): string => this.constructor.name;
}

class RAV4 implements Car {
    wheelNumber: number = 4;
    carType: string = "rv";

    getType = (): string => this.carType;
    getName = (): string => this.constructor.name;
}

// 簡單工廠模式：

class SimpleFactory {
    static getCar = (type: string) => {
        switch (type) {
            case "BMW":
                return new BMW();
            case "mitsubishi":
                return new MitsubishiFuso();
            case "RAV":
                return new RAV4();
        }
    };
}

const car1st = SimpleFactory.getCar("BMW");
const car2nd = SimpleFactory.getCar("mitsubishi");
const car3rd = SimpleFactory.getCar("RAV");

console.log(`== Car Instances created by Simple Factory Mode: ==`);
console.log(`${car1st?.getName()} --> ${car1st?.getType()}`);
console.log(`${car2nd?.getName()} --> ${car2nd?.getType()}`);
console.log(`${car3rd?.getName()} --> ${car3rd?.getType()}`);

export { Car, BMW, MitsubishiFuso, RAV4 };