const sinon = require("sinon");

class Calculator {
    add(a, b) {
        return a + b;
    }
}

const calc = new Calculator();

const addStub = sinon.stub(calc, "add").returns(100);
addStub.withArgs(0, 0).returns(10);

console.log(calc.add(0, 0)); // 10
console.log(calc.add(100, 200)); // 100
