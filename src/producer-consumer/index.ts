/**
 * ## 生產者/消費者模式
 * ---
 * ### 解說
 * 生產者和消費者在同一時間內「共同存取某一個資料空間」。
 *、生產者往空間內丟資料；消費者往空間內取走資料進行處理。
 * 兩者之間互不相干，也不需互相知道對方的存在。
 * 
 * +-------+                 +-------+                 +-------+
 * |       |       生產 　    |       |       消費 　    |       |
 * | 生產者 | --------------> | 緩衝區 | --------------> | 消費者 |
 * |       |                 |       |                 |       |
 * +-------+                 +-------+                 +-------+
 * 
 * ... ... ... ... ...
 *
 * ### 優點：
 * - 生產者與消質者之間完全解耦合。
 * - 在多線程的的程式架構中依然容易實作。
 * 
 * ### 實際案例
 * - Message Queue.（已經寫好的服務。這個模式的實現。），RabbitMQ：支持現在主流的程式語言：NodeJs,Golang,Java,C/C++，Python，••
 * - NodeJs 8J BullJob (Job Schedular.)
 * - Python 的 Celery
 */

// Redis: storage service: 儲存服務 in memory storage service.（快、輕、小)

/**
 * 作為緩衝區的 array
 */
const buffer = <any[]>[];

const MAX_BUFFER = 10;

class Producer {
    private buffer: any[];
    constructor(buffer: any[]){
        this.buffer = buffer;
    }
    random = () => String(~~(Math.random() * 1000)).padStart(3, "0");

    start = () => {
        // 以 setInterval 重複發布內容到 buffer 中
        setInterval(() => {

            if (this.buffer.length >= MAX_BUFFER) // 若緩衝區已充塞，便通知將暫緩接受新內容。
                return console.warn('\x1b[33m%s\x1b[0m', `緩衝區已滿，請稍等。`);

            const msg = `內容：${this.random()}`;
            console.log(`產生 => ${msg}`);
            this.buffer.push(msg);

        }, 1000);
    };
}

class Consumer {
    private buffer: any[];
    constructor(buffer: any[]){
        this.buffer = buffer;
    }

    start = () => {
        setInterval(() => {
            
            if (this.buffer.length <= 0) // 若緩衝區無內容，便通知 Consumer 等待。
                return console.warn('\x1b[35m%s\x1b[0m', `緩衝區已空，請稍等。`);
            
                // 將資料曲出來處理
            const msg = this.buffer.shift();
            console.log(`取出 => ${msg} 來處理。`);

        }, 1200);
    };
}

const bufferMonitor = setInterval(() => {
    console.log(`--> 緩衝區目前有：${buffer.length} 筆資料。`)
}, 500);

const producer = new Producer(buffer);
const consumer = new Consumer(buffer);

producer.start();
consumer.start();

// $ ts-node src/producer-consumer