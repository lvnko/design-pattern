/**
 * ## 單列模式 Singleton
 * ------------------------------------------------------------
 * #### 定義：一個class只有一個實例，並保證無論如何取值，皆只對這個實例取值。
 * #### 講解：確保 class 無論怎麼 new 或 get，都只拿到相同的 instance。
 * 
 * #### 使用場, 情境：
 * - 資料庫連接池
 * - API 收發工具, $ajax, axios, ...instance.// 實例：做 API 請求
 * - 遊戲的「世界」場景... etc.
 */

class Singleton {

    private static instance: Singleton;

    // 使用 getInstance 控管取得 instance 的方法
    // 當 instance 已經被建立，就直接 return 已經建立的 instance，
    // 反之，幫他建立一個 instance.
    public static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    private constructor() {
        // 將 constructor 給隱藏起來，不給使用者直接 new.
        // 若要取得，僅可以透過上方的 getInstance 獲
    }

    // ... 剩下的部分可以填充你自己需要的程式碼功能。
    someMethodA = () => {};
    someMethodB = () => {};
    someMethodC = () => {};
    someMethodD = () => {};
    someMethodE = () => {};
    someMethodF = () => {};
}

var sinInsA = Singleton.getInstance();
var sinInsB = Singleton.getInstance();

console.log(`Does sinInsA === sinInsB ? ${sinInsA === sinInsB}`);