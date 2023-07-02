function findFacto(n: number): number {
    if (n === 1) return 1;
    return n * findFacto(n - 1);
}

class Calculator {
    public input: HTMLInputElement;
    public output: HTMLDivElement;
    public stack: number[];

    constructor(inputEle: HTMLInputElement, outputEle: HTMLDivElement) {
        this.input = inputEle;
        this.output = outputEle;
        this.input.value = "";
        this.stack = [];
    }

    calculate() {
        try {
            // closeTrigonometry();
            closeFunction();
            let str: string = this.input.value;
            // Factorial Logic
            const factoReg: RegExp = /\d+\!/g;
            let newstr: string = str.replace(factoReg, (x: string): string => {
                let n: number = parseInt(x.slice(0, -1));
                return findFacto(n).toString();
            });

            // 10^x Logic
            const tenxReg: RegExp = /\d+\^\d+/g;
            newstr = newstr.replace(tenxReg, (x: string): string => {
                let pos: number = x.indexOf("^");
                let num1: number = parseInt(x.slice(0, pos));
                let num2: number = parseInt(x.slice(pos + 1));
                return `Math.pow(${num1},${num2})`;
            });

            // replace log to Math.log10
            newstr = newstr.replaceAll("log", (): string => {
                return "Math.log10";
            });
            // replace ln to Math.log
            newstr = newstr.replaceAll("ln", (x: string): string => {
                return "Math.log";
            });
            // replace E to 2.72
            newstr = newstr.replaceAll("e", (x: string): string => {
                return "Math.E";
            });
            // replace Exp to exp
            newstr = newstr.replaceAll("Math.Exp", (x: string): string => {
                return "Math.exp";
            });
            // replace π to 3.14
            newstr = newstr.replaceAll("π", (x: string): string => {
                return "Math.PI";
            });
            // replace sqrt to Math.sqrt
            newstr = newstr.replaceAll("sqrt", (x: string): string => {
                return "Math.sqrt";
            });
            this.output.innerText = eval(newstr) || "0";
        } catch (err: unknown) {
            let ch1: string = this.input.value.at(-1) as string;
            let ch2: string = this.input.value.at(-2) as string;
            if (
                (ch1 == "+" || ch1 == "-" || ch1 == "*" || ch1 == "/") &&
                (ch2 == "+" || ch2 == "-" || ch2 == "*" || ch2 == "/")
            )
                this.output.innerText = "ERROR";
        }
    }

    clear() {
        this.input.value = "";
        this.output.innerText = "";
    }

    appendNumbers(ch: string) {
        if (ch === "×") ch = "*";
        else if (ch === "÷") ch = "/";

        this.input.focus();
        let pos: number = this.input.selectionStart as number;
        let str: string = this.input.value;

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
        ).toString();
        this.input.value = "sin(" + `${this.input.value || 0}` + ")";
    }

    computeCos() {
        this.output.innerText = Math.cos(
            Number(eval(this.input.value)) || 0
        ).toString();
        this.input.value = "cos(" + `${this.input.value || 0}` + ")";
    }

    computeTan() {
        this.output.innerText = Math.tan(
            Number(eval(this.input.value)) || 0
        ).toString();
        this.input.value = "tan(" + `${this.input.value || 0}` + ")";
    }

    computeCosec() {
        this.output.innerText = (
            1 / Math.sin(Number(eval(this.input.value)) || 0)
        ).toString();
        this.input.value = "cosec(" + `${this.input.value || 0}` + ")";
    }

    computeSec() {
        this.output.innerText = (
            1 / Math.cos(Number(eval(this.input.value)) || 0)
        ).toString();
        this.input.value = "sec(" + `${this.input.value || 0}` + ")";
    }

    computeCot() {
        this.output.innerText = (
            1 / Math.tan(Number(eval(this.input.value)) || 0)
        ).toString();
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
        let n: number = parseInt(this.output.innerText);
        this.stack.push(n);
    }

    memoryRestore() {
        let n: number = this.stack.pop() as number;
        if (n) this.input.value = n.toString();
    }

    memoryClear() {
        this.stack.length = 0;
    }

    memoryPlus() {
        let n: number = parseInt(this.output.innerText);
        this.stack[this.stack.length - 1] =
            this.stack[this.stack.length - 1] + n;
    }

    memoryMinus() {
        let n: number = parseInt(this.output.innerText);
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
        ).toString();
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
        ).toString();
        this.input.value = "ceil(" + `${this.input.value || 0}` + ")";
    }

    // Floor
    computeFloor() {
        this.output.innerText = Math.floor(
            Number(eval(this.input.value)) || 0
        ).toString();
        this.input.value = "floor(" + `${this.input.value || 0}` + ")";
    }

    // Random Number
    generateRand() {
        this.output.innerText = Math.random().toString();
        this.input.value = "rand()";
    }

    // ABS
    computeAbs() {
        this.output.innerText = Math.abs(
            Number(eval(this.input.value)) || 0
        ).toString();
        this.input.value = "abs(" + `${this.input.value || 0}` + ")";
    }

    // +/-
    plusMinus() {
        this.input.value = (Number.parseInt(this.input.value) * -1).toString();
        this.calculate();
    }
}

// class end ---------

const IO = {
    input: document.getElementById("user-input") as HTMLInputElement,
    output: document.getElementById("output") as HTMLDivElement,
};

const BtnGroup: {
    [index: string]: HTMLElement | NodeListOf<Element>;
} = {
    clear: document.getElementById("clear")!,
    equal: document.getElementById("equal")!,
    deleteButton: document.getElementById("delete")!,
    elements: document.querySelectorAll(".key")!,
    sin: document.getElementById("sin")!,
    cos: document.getElementById("cos")!,
    tan: document.getElementById("tan")!,
    hyp: document.getElementById("hyp")!,
    sec: document.getElementById("sec")!,
    cosec: document.getElementById("cosec")!,
    cot: document.getElementById("cot")!,
    Ceil: document.getElementById("Ceil")!,
    Floor: document.getElementById("Floor")!,
    Rand: document.getElementById("Rand")!,
    log: document.getElementById("log")!,
    ln: document.getElementById("ln")!,
    exp: document.getElementById("exp")!,
    facto: document.getElementById("facto")!,
    pie: document.querySelectorAll(".pie")!,
    ms: document.getElementById("ms")!,
    mr: document.getElementById("mr")!,
    mc: document.getElementById("mc")!,
    mplus: document.getElementById("mplus")!,
    mminus: document.getElementById("mminus")!,
    tenX: document.getElementById("10x")!,
    XY: document.getElementById("xy")!,
    sroot: document.getElementById("sroot")!,
    x2: document.getElementById("x2")!,
    x3: document.getElementById("x3")!,
    OnebyX: document.getElementById("OnebyX")!,
    plusMinus: document.getElementById("plusMinus")!,
    Abs: document.getElementById("Abs")!,
    mod: document.getElementById("mod")!,
    deg: document.getElementById("deg")!,
    trigonometry: document.getElementById("trigonometry")!,
    trigonometrySection: document.getElementById("trigonometry-section")!,
    func: document.getElementById("function")!,
    funcSection: document.getElementById("function-section")!,
};

// // make object of Calculator
const calc: Calculator = new Calculator(IO.input, IO.output);

(<HTMLElement>BtnGroup.clear).addEventListener("click", calc.clear.bind(calc));

(<NodeListOf<Element>>BtnGroup.elements).forEach((ele) => {
    ele.addEventListener("click", (e: Event): void => {
        if (e.target) {
            let ch: string = (e.target as HTMLElement).innerText;
            calc.appendNumbers(ch);
        }
    });
});

(<HTMLElement>BtnGroup.equal).addEventListener("click", () => {
    calc.input.value = calc.output.innerText;
});

IO.input.addEventListener("keyup", calc.calculate.bind(calc));

(<HTMLElement>BtnGroup.deleteButton).addEventListener("click", () => {
    calc.delete();
    calc.calculate();
});

// All Trigonometry Function --------------->

(<HTMLElement>BtnGroup.sin).addEventListener(
    "click",
    calc.computeSin.bind(calc)
);
(<HTMLElement>BtnGroup.cos).addEventListener(
    "click",
    calc.computeCos.bind(calc)
);
(<HTMLElement>BtnGroup.tan).addEventListener(
    "click",
    calc.computeTan.bind(calc)
);
(<HTMLElement>BtnGroup.cot).addEventListener(
    "click",
    calc.computeCot.bind(calc)
);
(<HTMLElement>BtnGroup.cosec).addEventListener(
    "click",
    calc.computeCosec.bind(calc)
);
(<HTMLElement>BtnGroup.sec).addEventListener(
    "click",
    calc.computeSec.bind(calc)
);

// Ceil, Floor and Random Function

(<HTMLElement>BtnGroup.Ceil).addEventListener(
    "click",
    calc.computeCeil.bind(calc)
);
(<HTMLElement>BtnGroup.Floor).addEventListener(
    "click",
    calc.computeFloor.bind(calc)
);
(<HTMLElement>BtnGroup.Rand).addEventListener(
    "click",
    calc.generateRand.bind(calc)
);

// Toggle Disply

function ToggleDisplay(element: HTMLElement): void {
    if (element.classList.contains("display-no")) {
        element.classList.remove("display-no");
        element.classList.add("display-yes");
    } else {
        element.classList.remove("display-yes");
        element.classList.add("display-no");
    }
}

// Trigonometry DropDown

(<HTMLElement>BtnGroup.trigonometry).addEventListener("click", (): void => {
    closeFunction();
    ToggleDisplay(BtnGroup.trigonometrySection as HTMLElement);
});

function closeTrigonometry() {
    if (
        (<HTMLElement>BtnGroup.trigonometrySection).classList.contains(
            "display-yes"
        )
    ) {
        (<HTMLElement>BtnGroup.trigonometrySection).classList.remove(
            "display-yes"
        );
        (<HTMLElement>BtnGroup.trigonometrySection).classList.add("display-no");
    }
}

// Function DropDown Menu

(<HTMLElement>BtnGroup.func).addEventListener("click", (): void => {
    closeTrigonometry();
    ToggleDisplay(BtnGroup.funcSection as HTMLElement);
});

function closeFunction() {
    if ((<HTMLElement>BtnGroup.funcSection).classList.contains("display-yes")) {
        (<HTMLElement>BtnGroup.funcSection).classList.remove("display-yes");
        (<HTMLElement>BtnGroup.funcSection).classList.add("display-no");
    }
}

// Add ! to input

(<HTMLElement>BtnGroup.facto).addEventListener(
    "click",
    calc.addFacto.bind(calc)
);

// Add log,ln,exp to input

(<HTMLElement>BtnGroup.log).addEventListener("click", calc.addLog.bind(calc));
(<HTMLElement>BtnGroup.ln).addEventListener("click", calc.addLn.bind(calc));
(<HTMLElement>BtnGroup.exp).addEventListener("click", calc.addExp.bind(calc));

// for PI and E

(<NodeListOf<Element>>BtnGroup.pie).forEach((ele: Element): void => {
    ele.addEventListener("click", (e: Event): void => {
        if (e.target) {
            calc.appendNumbers((e.target as HTMLElement).innerText);
            // calc.appendNumbers(e.target.innerText);
        }
    });
});

// Memory Store, Restore, Clear, M+, M-

(<HTMLElement>BtnGroup.ms).addEventListener(
    "click",
    calc.memoryStore.bind(calc)
);
(<HTMLElement>BtnGroup.mr).addEventListener(
    "click",
    calc.memoryRestore.bind(calc)
);
(<HTMLElement>BtnGroup.mc).addEventListener(
    "click",
    calc.memoryClear.bind(calc)
);
(<HTMLElement>BtnGroup.mplus).addEventListener(
    "click",
    calc.memoryPlus.bind(calc)
);
(<HTMLElement>BtnGroup.mminus).addEventListener(
    "click",
    calc.memoryMinus.bind(calc)
);

// 10X, XY, Sroot, X2, X3, OnebyX, plusMinus, mod, deg

(<HTMLElement>BtnGroup.tenX).addEventListener("click", calc.addTenX.bind(calc));
(<HTMLElement>BtnGroup.XY).addEventListener("click", calc.addXY.bind(calc));
(<HTMLElement>BtnGroup.sroot).addEventListener(
    "click",
    calc.computeSqrt2.bind(calc)
);
(<HTMLElement>BtnGroup.x2).addEventListener("click", calc.addX2.bind(calc));
(<HTMLElement>BtnGroup.x3).addEventListener("click", calc.addX3.bind(calc));
(<HTMLElement>BtnGroup.OnebyX).addEventListener(
    "click",
    calc.addOneByX.bind(calc)
);
(<HTMLElement>BtnGroup.plusMinus).addEventListener(
    "click",
    calc.plusMinus.bind(calc)
);
(<HTMLElement>BtnGroup.Abs).addEventListener(
    "click",
    calc.computeAbs.bind(calc)
);
(<HTMLElement>BtnGroup.mod).addEventListener("click", calc.addMod.bind(calc));

(<HTMLElement>BtnGroup.deg).addEventListener("click", (): void => {
    (<HTMLElement>BtnGroup.deg).innerHTML =
        (<HTMLElement>BtnGroup.deg).innerHTML === "RAD" ? "DEG" : "RAD";
});
