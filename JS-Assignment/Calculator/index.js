function findFacto(n) {
	if (n === 1) return 1;
	return n * findFacto(n - 1);
}

class Calculator {
	constructor(inputEle, outputEle) {
		this.input = inputEle;
		this.output = outputEle;
		this.input.value = "";
		this.stack = [];
	}

	calculate() {
		try {
			closeTrigonometry();
			closeFunction();
			let str = this.input.value;

			// Factorial Logic
			const factoReg = /\d+\!/g;

			let newstr = str.replace(factoReg, (x) => {
				let n = parseInt(x.slice(0, -1));
				return findFacto(n);
			});

			// 10^x Logic

			const tenxReg = /\d+\^\d+/g;

			newstr = newstr.replace(tenxReg, (x) => {
				let pos = x.indexOf("^");
				let num1 = parseInt(x.slice(0, pos));
				let num2 = parseInt(x.slice(pos + 1));

				return `Math.pow(${num1},${num2})`;
			});

			// replace log to Math.log10
			newstr = newstr.replaceAll("log", (x) => {
				return "Math.log10";
			});

			// replace ln to Math.log
			newstr = newstr.replaceAll("ln", (x) => {
				return "Math.log";
			});

			// replace E to 2.72
			newstr = newstr.replaceAll("e", (x) => {
				return "Math.E";
			});

			// replace Exp to exp
			newstr = newstr.replaceAll("Math.Exp", (x) => {
				return "Math.exp";
			});

			// replace π to 3.14
			newstr = newstr.replaceAll("π", (x) => {
				return "Math.PI";
			});

			// replace sqrt to Math.sqrt
			newstr = newstr.replaceAll("sqrt", (x) => {
				return "Math.sqrt";
			});

			this.output.innerText = eval(newstr) || "0";
		} catch (err) {
			let ch1 = this.input.value.at(-1);
			let ch2 = this.input.value.at(-2);

			if (
				(ch1 == "+" ||
					ch1 == "-" ||
					ch1 == "*" ||
					ch1 == "/") &&
				(ch2 == "+" ||
					ch2 == "-" ||
					ch2 == "*" ||
					ch2 == "/")
			)
				this.output.innerText = "ERROR";
		}
	}

	clear() {
		this.input.value = "";
		this.output.innerText = "";
	}

	appendNumbers(ch) {
		if (ch === "×") ch = "*";
		else if (ch === "÷") ch = "/";

		this.input.focus();
		let pos = this.input.selectionStart;
		let str = this.input.value;

		this.input.value = str.slice(0, pos) + ch + str.slice(pos);
		this.calculate();
	}

	// Backspace
	delete() {
		this.input.value = this.input.value.slice(0, -1);
	}

	// trigonometry
	computeSin() {
		this.output.innerText = Math.sin(
			Number(eval(this.input.value)) || 0
		);
		this.input.value = "sin(" + `${this.input.value || 0}` + ")";
	}

	computeCos() {
		this.output.innerText = Math.cos(
			Number(eval(this.input.value)) || 0
		);
		this.input.value = "cos(" + `${this.input.value || 0}` + ")";
	}

	computeTan() {
		this.output.innerText = Math.tan(
			Number(eval(this.input.value)) || 0
		);
		this.input.value = "tan(" + `${this.input.value || 0}` + ")";
	}

	computeCosec() {
		this.output.innerText =
			1 / Math.sin(Number(eval(this.input.value)) || 0);
		this.input.value = "cosec(" + `${this.input.value || 0}` + ")";
	}

	computeSec() {
		this.output.innerText =
			1 / Math.cos(Number(eval(this.input.value)) || 0);
		this.input.value = "sec(" + `${this.input.value || 0}` + ")";
	}

	computeCot() {
		this.output.innerText =
			1 / Math.tan(Number(eval(this.input.value)) || 0);
		this.input.value = "cot(" + `${this.input.value || 0}` + ")";
	}

	// Factorial
	addFacto() {
		calc.appendNumbers("!");
		this.calculate();
	}

	// Log
	addLog() {
		this.appendNumbers("log()");
		this.input.setSelectionRange(
			calc.input.value.length,
			calc.input.value.length - 1
		);
		this.input.focus();
	}

	// Ln
	addLn() {
		this.appendNumbers("ln()");
		this.input.setSelectionRange(
			calc.input.value.length,
			calc.input.value.length - 1
		);
		this.input.focus();
	}

	// Exponential
	addExp() {
		this.appendNumbers("exp()");
		this.input.setSelectionRange(
			calc.input.value.length,
			calc.input.value.length - 1
		);
		this.input.focus();
	}

	// OneByX
	addOneByX() {
		this.appendNumbers("(1/)");
		this.input.setSelectionRange(
			calc.input.value.length,
			calc.input.value.length - 1
		);
		this.input.focus();
	}

	// Mod
	addMod() {
		if (this.input.value) this.appendNumbers("%");
	}

	// Memory Store, restore, Clear , M+, M-

	memoryStore() {
		let n = parseInt(this.output.innerText);
		this.stack.push(n);
	}

	memoryRestore() {
		let n = this.stack.pop();
		this.input.value = n;
	}

	memoryClear() {
		this.stack.length = 0;
	}

	memoryPlus() {
		let n = parseInt(this.output.innerText);
		this.stack[this.stack.length - 1] =
			this.stack[this.stack.length - 1] + n;
	}

	memoryMinus() {
		let n = parseInt(this.output.innerText);
		this.stack[this.stack.length - 1] =
			this.stack[this.stack.length - 1] - n;
	}

	// 10X
	addTenX() {
		this.appendNumbers("(10^)");
		this.input.setSelectionRange(
			calc.input.value.length,
			calc.input.value.length - 1
		);
		this.input.focus();
	}

	// XY
	addXY() {
		this.appendNumbers("^");
	}

	// Sqrt
	computeSqrt2() {
		this.output.innerText = Math.sqrt(
			parseInt(this.input.value) || 0
		);
		this.input.value = "sqrt(" + `${this.input.value || 0}` + ")";
	}

	// X2
	addX2() {
		if (this.input.value) this.appendNumbers("^2");
	}

	// X3
	addX3() {
		if (this.input.value) this.appendNumbers("^3");
	}

	// Ceil
	computeCeil() {
		this.output.innerText = Math.ceil(
			Number(eval(this.input.value)) || 0
		);
		this.input.value = "ceil(" + `${this.input.value || 0}` + ")";
	}

	// Floor
	computeFloor() {
		this.output.innerText = Math.floor(
			Number(eval(this.input.value)) || 0
		);
		this.input.value = "floor(" + `${this.input.value || 0}` + ")";
	}

	// Random Number
	generateRand() {
		this.output.innerText = Math.random();
		this.input.value = "rand()";
	}

	// ABS
	computeAbs() {
		this.output.innerText = Math.abs(
			Number(eval(this.input.value)) || 0
		);
		this.input.value = "abs(" + `${this.input.value || 0}` + ")";
	}

	// +/-
	plusMinus() {
		this.input.value = this.input.value * -1;
		this.calculate();
	}
}

// class end ---------

const IO = {
	input: document.getElementById("user-input"),
	output: document.getElementById("output"),
};

const BtnGroup = {
	clear: document.getElementById("clear"),
	equal: document.getElementById("equal"),
	deleteButton: document.getElementById("delete"),
	elements: document.querySelectorAll(".key"),
	sin: document.getElementById("sin"),
	cos: document.getElementById("cos"),
	tan: document.getElementById("tan"),
	hyp: document.getElementById("hyp"),
	sec: document.getElementById("sec"),
	cosec: document.getElementById("cosec"),
	cot: document.getElementById("cot"),
	Ceil: document.getElementById("Ceil"),
	Floor: document.getElementById("Floor"),
	Rand: document.getElementById("Rand"),
	log: document.getElementById("log"),
	ln: document.getElementById("ln"),
	exp: document.getElementById("exp"),
	facto: document.getElementById("facto"),
	pie: document.querySelectorAll(".pie"),
	ms: document.getElementById("ms"),
	mr: document.getElementById("mr"),
	mc: document.getElementById("mc"),
	mplus: document.getElementById("mplus"),
	mminus: document.getElementById("mminus"),
	tenX: document.getElementById("10x"),
	XY: document.getElementById("xy"),
	sroot: document.getElementById("sroot"),
	x2: document.getElementById("x2"),
	x3: document.getElementById("x3"),
	OnebyX: document.getElementById("OnebyX"),
	plusMinus: document.getElementById("plusMinus"),
	Abs: document.getElementById("Abs"),
	mod: document.getElementById("mod"),
	deg: document.getElementById("deg"),
	trigonometry: document.getElementById("trigonometry"),
	trigonometrySection: document.getElementById("trigonometry-section"),
	func: document.getElementById("function"),
	funcSection: document.getElementById("function-section"),
};

// make object of Calculator
const calc = new Calculator(IO.input, IO.output);

BtnGroup.clear.addEventListener("click", calc.clear.bind(calc));

BtnGroup.elements.forEach((ele) => {
	ele.addEventListener("click", (e) => {
		let ch = e.target.innerText;
		calc.appendNumbers(ch);
	});
});

BtnGroup.equal.addEventListener("click", () => {
	calc.input.value = calc.output.innerText;
});

IO.input.addEventListener("keyup", calc.calculate.bind(calc));

BtnGroup.deleteButton.addEventListener("click", () => {
	calc.delete();
	calc.calculate();
});

// All Trigonometry Function --------------->

BtnGroup.sin.addEventListener("click", calc.computeSin.bind(calc));
BtnGroup.cos.addEventListener("click", calc.computeCos.bind(calc));
BtnGroup.tan.addEventListener("click", calc.computeTan.bind(calc));
BtnGroup.cot.addEventListener("click", calc.computeCot.bind(calc));
BtnGroup.cosec.addEventListener("click", calc.computeCosec.bind(calc));
BtnGroup.sec.addEventListener("click", calc.computeSec.bind(calc));

// Ceil, Floor and Random Function

BtnGroup.Ceil.addEventListener("click", calc.computeCeil.bind(calc));
BtnGroup.Floor.addEventListener("click", calc.computeFloor.bind(calc));
BtnGroup.Rand.addEventListener("click", calc.generateRand.bind(calc));

// Toggle Disply

function ToggleDisplay(element) {
	if (element.classList.contains("display-no")) {
		element.classList.remove("display-no");
		element.classList.add("display-yes");
	} else {
		element.classList.remove("display-yes");
		element.classList.add("display-no");
	}
}

// Trigonometry DropDown

BtnGroup.trigonometry.addEventListener("click", () => {
	closeFunction();
	ToggleDisplay(BtnGroup.trigonometrySection);
});

function closeTrigonometry() {
	if (BtnGroup.trigonometrySection.classList.contains("display-yes")) {
		BtnGroup.trigonometrySection.classList.remove("display-yes");
		BtnGroup.trigonometrySection.classList.add("display-no");
	}
}

// Function DropDown Menu

BtnGroup.func.addEventListener("click", () => {
	closeTrigonometry();
	ToggleDisplay(BtnGroup.funcSection);
});

function closeFunction() {
	if (BtnGroup.funcSection.classList.contains("display-yes")) {
		BtnGroup.funcSection.classList.remove("display-yes");
		BtnGroup.funcSection.classList.add("display-no");
	}
}

// Add ! to input

BtnGroup.facto.addEventListener("click", calc.addFacto.bind(calc));

// Add log,ln,exp to input

BtnGroup.log.addEventListener("click", calc.addLog.bind(calc));
BtnGroup.ln.addEventListener("click", calc.addLn.bind(calc));
BtnGroup.exp.addEventListener("click", calc.addExp.bind(calc));

// for PI and E

BtnGroup.pie.forEach((ele) => {
	ele.addEventListener("click", (e) => {
		calc.appendNumbers(e.target.innerText);
	});
});

// Memory Store, Restore, Clear, M+, M-

BtnGroup.ms.addEventListener("click", calc.memoryStore.bind(calc));
BtnGroup.mr.addEventListener("click", calc.memoryRestore.bind(calc));
BtnGroup.mc.addEventListener("click", calc.memoryClear.bind(calc));
BtnGroup.mplus.addEventListener("click", calc.memoryPlus.bind(calc));
BtnGroup.mminus.addEventListener("click", calc.memoryMinus.bind(calc));

// 10X, XY, Sroot, X2, X3, OnebyX, plusMinus, mod, deg

BtnGroup.tenX.addEventListener("click", calc.addTenX.bind(calc));
BtnGroup.XY.addEventListener("click", calc.addXY.bind(calc));
BtnGroup.sroot.addEventListener("click", calc.computeSqrt2.bind(calc));
BtnGroup.x2.addEventListener("click", calc.addX2.bind(calc));
BtnGroup.x3.addEventListener("click", calc.addX3.bind(calc));
BtnGroup.OnebyX.addEventListener("click", calc.addOneByX.bind(calc));
BtnGroup.plusMinus.addEventListener("click", calc.plusMinus.bind(calc));
BtnGroup.Abs.addEventListener("click", calc.computeAbs.bind(calc));
BtnGroup.mod.addEventListener("click", calc.addMod.bind(calc));

BtnGroup.deg.addEventListener(
	"click",
	() => (deg.innerHTML = deg.innerHTML === "RAD" ? "DEG" : "RAD")
);
