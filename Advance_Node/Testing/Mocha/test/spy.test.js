const sinon = require("sinon");

class Calculator {
    add(a, b) {
        return a + b;
    }
}

const calc = new Calculator();

const addSpy = sinon.spy(calc, "add");

console.log(calc.add(0, 0)); // Output: 0
console.log(calc.add(100, 200)); // Output: 300

console.log(addSpy.called); // Output: true
console.log(addSpy.callCount); // Output: 2
console.log(addSpy.getCall(0)); // Output: [0, 0]
console.log(addSpy.getCall(1)); // Output: [100, 200]
