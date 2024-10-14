interface ITest {
    test1: string;
    test2: number;
    print: (arg: string[]) => boolean;
}

class Test implements ITest {
    public test1: string;
    public test2: number;
    constructor(test1: string, test2: number) {
        this.test1 = test1;
        this.test2 = test2;
    }
    print = (arg: string[]) => {
        console.log(this.test1, this.test2, arg);
        return !!arg.length; // OR Boolean(arg.length);
    }
}

const testIns = new Test('hello test interface!', 12345);
// console.log(testIns);

const validStrArr = ['3','6'];
const emptyStrArr = [''];

console.log('print result of validStrArr => ',testIns.print(['3','6']));
console.log('print result of emptyStrArr => ',testIns.print(emptyStrArr));
console.log('print result of empty array => ',testIns.print([]));