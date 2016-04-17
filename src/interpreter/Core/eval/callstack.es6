export default class CheddarCallStack {
    constructor(exec_instruct) {
        this.InStack = exec_instruct._Tokens;
        this.CallStack = [];
    }

    get stack() { return this.CallStack }

    push(n) {
        return this.CallStack(n);
    }

    pop(n) {
        return this.CallStack.splice(-n, n);
    }

    next() {
        return this.InStack.shift();
    }

    close() {
        return this.CallStack[this.CallStack.length - 1];
    }
}