/**
 * 實務上，時常需求不會只有一個 subject 即可完成任務，也不會所有的 observer 都有需求 register 同一個 subject。
 * 另外，觀察者模式中 observer 並沒有主動取消訂閱的能力，這為 observer 帶來了不便。
 *
 * > 因此從觀察者模式中派生了一個進階的設計模式：**發布/訂閱者模式**
 *
 * 發布/訂閱者模式引入了「信息調派中心」的概念，來管理所有的 subjects 與 observers。
 * Subscriber (訂閱者) 通過信息調度中心來實現「選擇主題訂閱 Publisher (發布者), 當 Publisher 有新資料要發布時, 也基於主題去「消息調派中心」通知此主題有消息的變更。
 *
 * 優點: 相比於觀察者模式，此模式可以完全將 Publisher 與 Subscriber 之間的關係解耦。
 *       並且可以基於不同主題來添加訂閱者，從而提高更為詳細的控制。
 *
 * #### 使用範例:
 * - Web Dom 的 addEventListener.
 * - VueJs 的 watch 功能.
 * - RxJs 的 PubSub 功能.
 * - NodeJs 的 EventEmitter 功能。
 *
 * 其模式架構會變成如下圖所示：
 *
 * +-----------+                +-----------+        訂閱       +-------------------------+
 * |           |                |           |  <============>  | Observer_1 (Subscriber) |
 * |           |     發佈消息    |           |        觸發       +-------------------------+
 * | Publisher | -------------> |  dispatch |        ...
 * | (Subject) |                |   center  |        訂閱       +------------------------+
 * |           |                |           |  <============>  | Observer_n (Subscriber)|
 * |           |                |           |        觸發       +------------------------+
 * +-----------+                +-----------+
 *
 *
 * 題目：請以「觀察者模式」為基礎實作「發布/訂閱者模式」的範例程式碼。
 *
 */

/** ======================= */
/** =={{{  INTERFACE  }}}== */
/** ======================= */
interface IPublisher {
    // 發布者的名字
    name: string;
    // 發佈消息的中心:
    // 我們應該將 dispatch center 在 constructor 時告訴 publisher 知道去哪裡增加主題、發布消息
    dispatchCenter: IDispatchCenter;
  
    // constructor(name: string, dispatchCenter: IDispatchCenter): void;
  
    // 去跟平台增加新的主題
    addTopic(topic: string): void;
  
    // 去找平台推送消息
    publish(topic: string, message: string): void;
}
  
interface ISubscriber {
    // 訂閱者的名字
    name: string;
  
    // 發佈消息的中心: 我們應該將 dispatch center 在 constructor 時告訴 subscriber 知道去哪裡訂閱
    dispatchCenter: IDispatchCenter;
  
    // constructor(name: string, dispatchCenter: IDispatchCenter): void;
  
    // 訂閱
    subscribe(topic: string): void;
    // 取消訂閱
    unsubscribe(topic: string): void;
    // 接收 dispatch 推送的消息
    update(topic: string, message: string): void;
}

interface ITopic {
    name: string;
    // constructor(name: string): void;
    subscribers: ISubscriber[];
    addSubscriber(subcriber: ISubscriber): void;
    removeSubscriber(subscriber: ISubscriber): void;
}

interface IDispatchCenter {

    // 發布者告訴平台要新增主題
    addTopic(topic: string): void;
  
    // 發布者告訴平台要移除主題
    removeTopic(topic: string): void;
  
    // 訂閱者來訂閱這個主題的消息
    subscribeTopic(topic: string, subscriber: ISubscriber): void;
  
    // 訂閱者取消訂閱者個主題的消息
    unsubscribeTopic(topic: string, subscriber: ISubscriber): void;
  
    // 平台通知訂閱者消息
    publish(topic: string, message: string): void;
}

/** ======================= */
/** =={{{   CLASSES   }}}== */
/** ======================= */

class Topic implements ITopic {
    
    name: string;
    subscribers = <ISubscriber[]>[];

    constructor(name: string) {
        this.name = name;
    }

    addSubscriber = (subcriber: ISubscriber): void => {
        this.subscribers.push(subcriber);
    }

    removeSubscriber = (subscriber: ISubscriber): void => {
        const subscriberList = this.subscribers;
        var len = subscriberList.length;
        for (let i=0; i<len; i++) {
            if (subscriberList[i] === subscriber) {
                this.subscribers.splice(i, 1);
            }
        }
    }

}
  
class DispatchCenter implements IDispatchCenter {
    // your code here.
    private topics = <ITopic[]>[];

    // 發布者告訴平台要新增主題
    addTopic = (topic: string): void => {
        this.topics.push(new Topic(topic));
    };
  
    // 發布者告訴平台要移除主題
    removeTopic = (topic: string): void => {
        const topics = this.topics;
        var len = topics.length;
        for (let i=0; i<len; i++) {
            if (topics[i].name === topic) {
                this.topics.splice(i, 1);
            }
        }
    };
  
    // 訂閱者來訂閱這個主題的消息
    subscribeTopic = (topic: string, subscriber: ISubscriber): void => {
        const [topicObject] = this.topics.filter(({name})=>name === topic);
        topicObject?.addSubscriber(subscriber);
    };
  
    // 訂閱者取消訂閱者個主題的消息
    unsubscribeTopic = (topic: string, subscriber: ISubscriber): void => {
        const [topicObject] = this.topics.filter(({name})=>name === topic);
        topicObject?.removeSubscriber(subscriber);
    };
  
    // 平台通知訂閱者消息
    publish = (topic: string, message: string): void => {
        const [topicObject] = this.topics.filter(({name})=>name === topic);
        topicObject?.subscribers.forEach((subscriber: ISubscriber):void => subscriber.update(topic, message));
    };
    
}

class Publisher implements IPublisher {
    
    name: string;
    dispatchCenter: IDispatchCenter;

    constructor(name: string, dispatcher: IDispatchCenter) {
        this.name = name;
        this.dispatchCenter = dispatcher;
    }

    addTopic = (topic: string): void => {
        this.dispatchCenter.addTopic(topic);
    };
  
    // 去找平台推送消息
    publish = (topic: string, message: string): void => {
        this.dispatchCenter.publish(topic, message);
    };

}

class Subscriber implements ISubscriber {
    // your code here.
    name: string;
    dispatchCenter: IDispatchCenter;

    constructor(name: string, dispatchCenter: IDispatchCenter) {
        this.name = name;
        this.dispatchCenter = dispatchCenter;
    }

    subscribe = (topic: string): void => {
        this.dispatchCenter.subscribeTopic(topic, this);
    };
    
    unsubscribe = (topic: string): void => {
        this.dispatchCenter.unsubscribeTopic(topic, this);
    };

    update = (topic: string, message: string): void => {
        console.log(`${topic} 的最新消息已經發布給 ${this.name} 了, 消息：${message}`)
    };
}

/** ======================= */
/** =={{{ UTILIZATION }}}== */
/** ======================= */
  
const dispatcher = new DispatchCenter();
  
const pub1 = new Publisher("發布者1", dispatcher);
const pub2 = new Publisher("發布者2", dispatcher);
  
pub1.addTopic("主題1");
pub1.addTopic("主題2");
pub2.addTopic("主題3");
  
var sub1 = new Subscriber("小明", dispatcher);
var sub2 = new Subscriber("小红", dispatcher);
var sub3 = new Subscriber("小張", dispatcher);

sub1.subscribe("主題1");

sub2.subscribe("主題1");
sub2.subscribe("主題2");
  
sub3.subscribe("主題1");
sub3.subscribe("主題2");
sub3.unsubscribe("主題2");
  
pub1.publish("主題1", "消息1");
pub1.publish("主題1", "消息1");
pub2.publish("主題2", "消息2");


/** ======================= */
/** =={{{   RESULT    }}}== */
/** ======================= */

// $ ts-node src/observer/homework.ts

// 主題1 的最新消息已經發布給 小明 了, 消息：消息1
// 主題1 的最新消息已經發布給 小红 了, 消息：消息1
// 主題1 的最新消息已經發布給 小張 了, 消息：消息1
// 主題1 的最新消息已經發布給 小明 了, 消息：消息1
// 主題1 的最新消息已經發布給 小红 了, 消息：消息1
// 主題1 的最新消息已經發布給 小張 了, 消息：消息1
// 主題2 的最新消息已經發布給 小红 了, 消息：消息2

export { IPublisher, ISubscriber, IDispatchCenter };
  