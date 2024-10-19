import { IPublisher, ISubscriber, IDispatchCenter } from "./homework";

// [!] -- 以下是來自課堂素材的作業解答

class DispatchCenter implements IDispatchCenter {
    // your code here.
    private dispatcher: { [topic: string]: ISubscriber[] } = {};
  
    addTopic(topic: string) {
      this.dispatcher[topic] = [];
    }
    removeTopic(topic: string) {
      delete this.dispatcher[topic];
    }
    subscribeTopic(topic: string, subscriber: ISubscriber) {
      this.dispatcher[topic].push(subscriber);
    }
    unsubscribeTopic(topic: string, subscriber: ISubscriber) {
      const index = this.dispatcher[topic].findIndex((suber) => suber.name === subscriber.name);
      this.dispatcher[topic].splice(index, 1);
    }
    publish(topic: string, message: string) {
      this.dispatcher[topic]?.forEach((subscriber) => subscriber.update(topic, message));
    }
}

class Publisher implements IPublisher {
    // your code here.
    public name: string;
    public dispatchCenter: IDispatchCenter;
  
    constructor(name: string, dispatchCenter: IDispatchCenter) {
      this.name = name;
      this.dispatchCenter = dispatchCenter;
      return;
    }
    // 去跟平台增加新的主題
    addTopic(topic: string) {
      this.dispatchCenter.addTopic(topic);
    }
  
    // 去找平台推送消息
    publish(topic: string, message: string) {
      this.dispatchCenter.publish(topic, message);
    }
}

class Subscriber implements ISubscriber {
  // your code here.
  public name: string;
  public dispatchCenter: IDispatchCenter;
  constructor(name: string, dispatchCenter: IDispatchCenter) {
    this.name = name;
    this.dispatchCenter = dispatchCenter;
  }

  subscribe(topic: string) {
    this.dispatchCenter.subscribeTopic(topic, this);
  }
  unsubscribe(topic: string) {
    this.dispatchCenter.unsubscribeTopic(topic, this);
  }
  update(topic: string, message: string) {
    console.log(`${topic} 已經送到${this.name}家了, 消息：${message}`);
  }
}

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
pub1.publish("主題1", "消息2");
pub2.publish("主題2", "消息3");

// $ ts-node src/observer/model-answer.ts

// 主題1 已經送到小明家了, 消息：消息1
// 主題1 已經送到小红家了, 消息：消息1
// 主題1 已經送到小張家了, 消息：消息1
// 主題1 已經送到小明家了, 消息：消息2
// 主題1 已經送到小红家了, 消息：消息2
// 主題1 已經送到小張家了, 消息：消息2
// 主題2 已經送到小红家了, 消息：消息3