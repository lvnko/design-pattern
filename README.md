### 安裝步驟
1. 環境建置 ts-node 執行環境
```shell
$ npm install -g ts-node    # 全域安裝 ts-node 命令

```

2. 建立一個專案資料夾，並打開
```shell
$ mkdir design-pattern ; cd design-pattern
```

3. 此時為了能順利運行 node-ts 的指令，需要確認開發環境中運行的 node 版本為 v14
```shell
$ nvm use v14.21.1
```

4. 使用 npm 建立 node 專案
```shell
$ npm init
```

> Hint: 期間 npm 會詢問你一些問題，這部分可以視個人情況自行回答。

完成之後應該會在資料夾中看到 `package.json` 檔案，此為 nodeJs 管理依賴套件的設置文件。

5. 安裝 ts-node 相關套件
```shell
# 在本專案安裝 typescript 相關套件， -D 代表只裝在 develop 環境
$ npm install -D typescript
$ npm install -D tslib @types/node

# 安裝 nodeJs version 12 的基礎設定
$ npm install -D @tsconfig/node12
```

6. 我們建立一個 `tsconfig.json`，去擴充剛剛安裝的 tsconfig
```json
{
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

7. 大公告成！ 我們建立一個 `index.ts` 檔案來試試看。

在其中加入 `console.log('hello world')`。


並且在 `package.json` 中增加執行用的指令。

```json
scripts: {
  // ...,
  "start": "NODE_OPTIONS='--trace-deprecation --abort-on-uncaught-exception' ts-node ./index.ts"
}
```

8. 使用 `npm run start` 來跑看看。

```shell
$ npm run start
```

### 本週學習紀錄
#### 程式設計原則及核心模式
**A. SOLID Principles 程式設計五大原則 及其心訣**
1. Single Responsibility Principle 單一職責原則 (SRP)
> [!TIP]
> A class should have just one reason to change.
2. Open-Closed Principle 開放封閉原則 (OCP)
> [!TIP]
> Classes should be open for extension but closed for modification.
3. Liskov Substitution Principle 里氏替換原則 (LSP)
> [!TIP]
> When extending a class, remember that you should be able to pass objects of the subclass in place of objects of the parent class without breaking the client code.
4. Interface Segregation Principle 介面隔離原則 (ISP)
> [!TIP]
> Clients shouldn’t be forced to depend on methods they do not use.
5. Dependency Inversion Principle 依賴反轉原則 (DIP)
> [!TIP]
> Depend upon abstractions, not concretions.

**B. 五大核心設計模式**

1. 單列模式 (Singleton Pattern)
2. 工廠模式 (Factory Pattern)
3. 觀察者模式 (Observer Pattern)
4. 生產者/消費者模式 (Producer-Consumer Pattern)
5. 轉接器模式 (Adapter Pattern)

### 有用資源連結
- ts-node : 因應 Typescript 在 Node.js 上運行的交互介面 [github repo](https://github.com/TypeStrong/ts-node)
- 程式設計五大原則補充閱讀及例子 [SOLID Principles in TypeScript (5 Part Series)](https://dev.to/jmalvarez/single-responsibility-principle-in-typescript-859)
- Message Queue 任務排程 (簡介：[AMS](https://aws.amazon.com/message-queue/#:~:text=A%20message%20queue%20is%20a,once%2C%20by%20a%20single%20consumer.), [IBM](https://www.ibm.com/topics/message-queues))
  - **RabbitMQ** - One broker to queue them all ([LINK](https://www.rabbitmq.com/))
  - **Bull** - a Node library that implements a fast and robust queue system based on [**redis**](https://redis.io/), one of its main feature is: Minimal CPU usage due to a polling-free design. ([LINK](https://optimalbits.github.io/bull/))
  - **Celery** - written in Python, an open source asynchronous task queue or job queue which is based on distributed message passing, it supports scheduling, and focus on operations in real time. ([簡介](https://docs.celeryq.dev/en/stable/getting-started/introduction.html), [技術閱讀](https://medium.com/@v0220225/backend-%E6%8E%92%E7%A8%8B%E6%8E%92%E8%B5%B7%E4%BE%86-celery-7cd8ca964716))
