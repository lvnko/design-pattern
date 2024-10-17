/**
 * #＃ 觀察者模式
 * ---------------------------------------------------------------------------------
 * #### 定義：
 * 一群觀察者 (Observers）監聽/觀察某個被觀察的對象（Subject/Observed)。
 * 當被觀察者的狀態發生改變的時候，Subject 就會去通知所有觀察者資料被更新了。
 * 
 * 
 * +---------+         
 * |         |      訂閱       +------------+
 * |         | <============> | Observer_1 | (class / function / object)
 * |         |      發布       +------------+
 * | Subject |      ...
 * |         |      訂閱       +------------+
 * |         | <============> | Observer_n | (class / function / object)
 * |         |      發布       +------------+
 * +---------+ 
 * 
 * #### 優點：
 * - 比起讓 observer 每隔一段時間去詢問 subject 是否有更新；讓 subject 更新時直接通知更有效率。
 * - 將程式的關注點從 observer 分離出來，使得 subject 與 observer object 程式碼的耦合度（物件跟物件之間參雜在一起的程度）降低。
 * - 解決 pooling 輪詢這種低效的問題。
 */

/**
 * @param {string} id
 */
class Observer {
    id: string;

    constructor() {
        this.id = String(~~(Math.random() * 1000)).padStart(3, "0");
    }

    /**
     * 用來當 subject 發布消息時，可以透過這個 update 來給予消息
     * @param data any 保有 subject 發布消息給的內容可以是任意的
     */
    update = (data: any) => {
        console.log(`觀察者 ${this.id} 收到更新消息的內容：${data}`);
    }
}

class Subject {
    private queue = <Observer[]>[];

    // 註冊觀察者
    register = (observer: Observer) => {
        this.queue.push(observer);
    };

    // 移除觀察者
    remove = (observer: Observer) => {
        const queue = this.queue;
        var len = queue.length;
        for (let i=0; i<len; i++) {
            if (queue[i] === observer) {
                this.queue.splice(i, 1);
            }
        }
    }

    // 通知觀察者
    notify = (data: any) => {
        this.queue.forEach((observer) => observer.update(data));
    }
}

const subject = new Subject();

const observer1st = new Observer();
const observer2nd = new Observer();
const observer3rd = new Observer();
const observer4th = new Observer();
const observer5th = new Observer();

// 讓 observer 註冊 subject 主題
subject.register(observer1st);
subject.register(observer2nd);
subject.register(observer3rd);
subject.register(observer4th);
subject.register(observer5th);

subject.notify(JSON.stringify({ foo: "bar" }));

/**
 * subject {
 *  this.array = [] // 拿來存放 observer。
 *  notify = () => {} // 拿來對 array 當中所有的 observer 發布內容。
 * }
 * 
 * observer // 可以是一個 object，也可以是一個 function
 */