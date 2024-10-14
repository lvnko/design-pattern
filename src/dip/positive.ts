// 任務：根據第五原則 (依賴反轉原則，DIP) 創作一個
// 按鈕 來做 開/關燈 的動作
// 以確保不會牴觸第二原則 (開放封閉原則，OCP)

interface ElectricalAppliance {
    turnOn(): void;
    turnOff(): void;
    isOff(): boolean;
}

// 低階物件 (e.g. Database)
class Lamp implements ElectricalAppliance {
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

class ThreeStageLamp implements ElectricalAppliance {
    private level: number = 0;
    private cap: number = 3;
    turnOn() {
        if (this.level < this.cap) {
            this.level += 1;
            console.log(`開燈到第${this.level}階囉！`);
        } else {
            this.level = 0;
            console.log(`亮度轉換重設到${this.level}階囉！`);
        }
        
    }
    turnOff() {
        this.level = 0;
        console.log(`關燈囉！`);
    }
    isOff() {
        return this.level < this.cap;
    }
}

// 高階物件 (e.g. Micro-request Handler)
class Button {
    private target: ElectricalAppliance;

    constructor(target: ElectricalAppliance) {
        this.target = target;
    }

    poll() {
        if (this.target.isOff()) this.target.turnOn();
        else this.target.turnOff();
    }
}

// 雖然沿用了 negative.ts 的範例，
// 但這次讓 Button class 多承接一個 argument:
// 一個 class 為 Lamp 的物件，而且在同一時間，
// 這個物件 class 是基於另一個外置的 interface :
// ElectricalAppliance 而建立
// 而在 Button class 裡，也對這個 argument 指定為
// 該是以 ElectricalAppliance 所建立的任何物件
const lamp = new Lamp();
const btn = new Button(lamp);

// 這代表著其他基於相同相同 interface 而建立的
// class instance 也都能被 button 這個物件接納為 argument
const threeStageLamp = new ThreeStageLamp();
const threeStageBtn = new Button(threeStageLamp);

export default ()=>{};