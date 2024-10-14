// 任務：創作一個 按鈕 來做 開/關燈 的動作

class Lamp {
    private state: boolean = false;
    turnOn() {
        this.state = true;
        console.log(`開燈囉！`);
    }
    turnOff() {
        this.state = false;
        console.log(`關燈囉！`);
    }
    isOff() {
        return !this.state;
    }
}

class Button {
    private lamp = new Lamp();

    poll() {
        if (this.lamp.isOff()) this.lamp.turnOn();
        else this.lamp.turnOff();
    }
}

const btn = new Button();

export default ()=>{};

// 若今天需要把燈轉換成別的電器，
// 並因此需要改動 Button 這個 class 的代碼時，
// 我們便會跟第二原則 (開放封閉原則，OCP) 有所抵觸。
// 這時我們便要根據第五原則 (依賴反轉原則，DIP) 
// 把對於 Lamp 這個 class 的依賴，
// 反轉到比較抽象的 interface 上。
// 我們會在 positive.ts 操作這個優化練習。