function findFacto(n)
{
    if(n === 1)
        return 1;
    return n * findFacto(n-1);
}

class Calculator {

    constructor(inputEle,outputEle)
    {
        this.input = inputEle;
        this.output = outputEle;
        this.input.value = '';
        this.stack = [];
    }

    calculate(){
        try{

            closeTrigonometry();
            closeFunction();
            let str = this.input.value;
            
            // Factorial Logic
            const factoReg = /\d+\!/g;

            let newstr = str.replace(factoReg,(x)=>{
                let n = parseInt(x.slice(0,-1));
                return findFacto(n);
            })

            // 10^x Logic

            
            const tenxReg = /\d+\^\d+/g;

            newstr = newstr.replace(tenxReg,(x)=>{

                let pos = x.indexOf('^');
                let num1 = parseInt(x.slice(0,pos));
                let num2 = parseInt(x.slice(pos+1));

                return `Math.pow(${num1},${num2})`;
            })

            // replace log to Math.log10
            newstr = newstr.replaceAll('log',(x)=>{
                return 'Math.log10';
            })

            // replace ln to Math.log
            newstr = newstr.replaceAll('ln',(x)=>{
                return 'Math.log';
            })

            // replace E to 2.72
            newstr = newstr.replaceAll('e',(x)=>{
                return 'Math.E';
            })

            // replace Exp to exp
            newstr = newstr.replaceAll('Math.Exp',(x)=>{
                return 'Math.exp';
            })
            
            // replace π to 3.14
            newstr = newstr.replaceAll('π',(x)=>{
                return 'Math.PI';
            })
            
            // replace sqrt to Math.sqrt
            newstr = newstr.replaceAll('sqrt',(x)=>{
                return 'Math.sqrt';
            })
            
            this.output.innerText = eval(newstr) || '0';

        }
        catch(err)
        {
            let ch1 = this.input.value.at(-1);
            let ch2 = this.input.value.at(-2);
            
            if((ch1 == '+' || ch1 == '-' || ch1 == '*' || ch1 == '/') && (ch2 == '+' || ch2 == '-' || ch2 == '*' || ch2 == '/'))
                this.output.innerText = 'ERROR';

        }
    }

    clear(){
    
        this.input.value = '';
        this.output.innerText = ''
    }

    appendNumbers(ch){


        if(ch === '×')
            ch = '*';
        else if(ch === '÷')
            ch = '/';

        input.focus();
        let pos = this.input.selectionStart;
        let str = this.input.value;

        this.input.value = str.slice(0,pos)+ch+str.slice(pos);
        this.calculate();
    }

    // Backspace
    delete()
    {
        this.input.value = this.input.value.slice(0,-1)
    }

    // trigonometry
    computeSin()
    {
        this.output.innerText = Math.sin(Number(eval(this.input.value)) || 0);
        this.input.value = 'sin('+`${this.input.value || 0}`+')';
    }

    computeCos()
    {
        this.output.innerText = Math.cos(Number(eval(this.input.value)) || 0);
        this.input.value = 'cos('+`${this.input.value || 0}`+')';
    }

    computeTan()
    {
        this.output.innerText = Math.tan(Number(eval(this.input.value)) || 0);
        this.input.value = 'tan('+`${this.input.value || 0}`+')';
    }

    computeCosec()
    {
        this.output.innerText = 1/(Math.sin(Number(eval(this.input.value)) || 0));
        this.input.value = 'cosec('+`${this.input.value || 0}`+')';
    }

    computeSec()
    {
        this.output.innerText = 1/(Math.cos(Number(eval(this.input.value)) || 0));
        this.input.value = 'sec('+`${this.input.value || 0}`+')';
    }

    computeCot()
    {
        this.output.innerText = 1/(Math.tan(Number(eval(this.input.value)) || 0));
        this.input.value = 'cot('+`${this.input.value || 0}`+')';
    }

    // Factorial
    addFacto()
    {
        calc.appendNumbers('!');
        this.calculate()
    }

    // Log
    addLog()
    {
        this.appendNumbers('log()');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }

    // Ln
    addLn()
    {
        this.appendNumbers('ln()');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }
    
    // Exponential
    addExp()
    {
        this.appendNumbers('exp()');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }

    // OneByX
    addOneByX()
    {
        this.appendNumbers('(1/)');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }

    // Mod
    addMod()
    {
        if(this.input.value)
            this.appendNumbers('%');
    }

    // Memory Store, restore, Clear , M+, M-

    memoryStore()
    {
        let n = parseInt(this.output.innerText);
        this.stack.push(n);
        console.log(this.stack)

    }

    memoryRestore()
    {
        let n = this.stack.pop();
        this.input.value = n;
    }

    memoryClear()
    {
        this.stack.length = 0;
    }

    memoryPlus()
    {
        let n = parseInt(this.output.innerText);
        this.stack[this.stack.length-1] = this.stack[this.stack.length-1] + n;
        console.log(this.stack)
        
    }

    memoryMinus()
    {
        let n = parseInt(this.output.innerText);
        this.stack[this.stack.length-1] = this.stack[this.stack.length-1] - n;
        console.log(this.stack)
    }

    // 10X
    addTenX()
    {
        this.appendNumbers('(10^)');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }

    // XY
    addXY()
    {
        this.appendNumbers('^');
    }

    // Sqrt
    computeSqrt2()
    {
        this.output.innerText = Math.sqrt(parseInt(this.input.value) || 0);
        this.input.value = 'sqrt('+`${this.input.value || 0}`+')';
    }

    // X2
    addX2()
    {
        if(this.input.value)
            this.appendNumbers('^2');
    }

    // X3
    addX3()
    {
        if(this.input.value)
            this.appendNumbers('^3');
    }

    // Ceil
    computeCeil()
    {
        this.output.innerText = Math.ceil(Number(eval(this.input.value)) || 0);
        this.input.value = 'ceil('+`${this.input.value || 0}`+')';
    }

    // Floor
    computeFloor()
    {
        this.output.innerText = Math.floor(Number(eval(this.input.value)) || 0);
        this.input.value = 'floor('+`${this.input.value || 0}`+')';
    }
    
    // Random Number 
    generateRand()
    {
        this.output.innerText = Math.random()
        this.input.value = 'rand()';
    }

    // ABS
    computeAbs()
    {
        console.log('abs')
        this.output.innerText = Math.abs(Number(eval(this.input.value)) || 0);
        this.input.value = 'abs('+`${this.input.value || 0}`+')';
    }

    // +/-
    plusMinus()
    {
        this.input.value = this.input.value * (-1);
        this.calculate();
    }
}

// class end ---------


const input = document.getElementById('user-input')
const output = document.getElementById('output');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const elements = document.querySelectorAll('.key');

const sin = document.getElementById('sin');
const cos = document.getElementById('cos');
const tan = document.getElementById('tan');
const hyp = document.getElementById('hyp');
const sec = document.getElementById('sec');
const cosec = document.getElementById('cosec');
const cot = document.getElementById('cot');                                                         

// make object of Calculator
const calc = new Calculator(input,output);

clear.addEventListener('click',()=>{
    calc.clear();
})

elements.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{

        let ch = e.target.innerText;
        calc.appendNumbers(ch);
        
    })
})

equal.addEventListener('click',()=>{
    calc.input.value = calc.output.innerText;
})

input.addEventListener('keyup',()=>{
    calc.calculate();
})


deleteButton.addEventListener('click',()=>{
    calc.delete();
    calc.calculate();
})


// All Trigonometry Function --------------->

sin.addEventListener('click',()=>{
    calc.computeSin();
})  

cos.addEventListener('click',()=>{
    calc.computeCos();
})

tan.addEventListener('click',()=>{
    calc.computeTan();
})

cot.addEventListener('click',()=>{
    calc.computeCot();
})

cosec.addEventListener('click',()=>{
    calc.computeCosec();
})

sec.addEventListener('click',()=>{
    calc.computeSec();
})


// Ceil, Floor and Random Function
const Ceil = document.getElementById('Ceil');
const Floor = document.getElementById('Floor');
const Rand = document.getElementById('Rand');

Ceil.addEventListener('click',()=>{
    calc.computeCeil();
})

Floor.addEventListener('click',()=>{
    calc.computeFloor();
})

Rand.addEventListener('click',()=>{
    calc.generateRand();
})

// Toggle Disply

function ToggleDisplay(element)
{
    if(element.classList.contains('display-no'))
    {
        element.classList.remove('display-no');
        element.classList.add('display-yes');
    }
    else
    {
        element.classList.remove('display-yes');
        element.classList.add('display-no');
    }
}

// Trigonometry DropDown
const trigonometry = document.getElementById('trigonometry');
const trigonometrySection = document.getElementById('trigonometry-section');

trigonometry.addEventListener('click',()=>{
    closeFunction();
    ToggleDisplay(trigonometrySection);
})

function closeTrigonometry()
{   
    if(trigonometrySection.classList.contains('display-yes'))
    {
        trigonometrySection.classList.remove('display-yes');
        trigonometrySection.classList.add('display-no');

    }
}


// Function DropDown Menu

const func = document.getElementById('function');
const funcSection = document.getElementById('function-section');

func.addEventListener('click',()=>{
    closeTrigonometry();
    ToggleDisplay(funcSection);
})

function closeFunction()
{   
    if(funcSection.classList.contains('display-yes'))
    {
        funcSection.classList.remove('display-yes');
        funcSection.classList.add('display-no');

    }
}

// Add ! to input
const facto = document.getElementById('facto')

facto.addEventListener('click',()=>{
    calc.addFacto()
})

// Add log,ln,exp to input
const log = document.getElementById('log')
const ln = document.getElementById('ln')
const exp = document.getElementById('exp')

log.addEventListener('click',()=>{
    calc.addLog();
})

ln.addEventListener('click',()=>{
    calc.addLn();
})

exp.addEventListener('click',()=>{
    calc.addExp();
})

// for PI and E

const pie = document.querySelectorAll('.pie');

pie.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        calc.appendNumbers(e.target.innerText)
    })    
})


// Memory Store, Restore, Clear, M+, M-

const ms = document.getElementById('ms');
const mr = document.getElementById('mr');
const mc = document.getElementById('mc');
const mplus = document.getElementById('mplus');
const mminus = document.getElementById('mminus');

ms.addEventListener('click',()=>{
    calc.memoryStore();
})

mr.addEventListener('click',()=>{
    calc.memoryRestore();
})

mc.addEventListener('click',(e)=>{
    calc.memoryClear();
    // e.target.style.pointerEvents='none';
})

mplus.addEventListener('click',()=>{
    calc.memoryPlus();
})

mminus.addEventListener('click',()=>{
    calc.memoryMinus();
})

// 10X, XY, Sroot, X2, X3, OnebyX, plusMinus, mod, deg
const tenX = document.getElementById('10x');

tenX.addEventListener('click',()=>{
    calc.addTenX();
})

const XY = document.getElementById('xy');

XY.addEventListener('click',()=>{
    calc.addXY();
})

const sroot = document.getElementById('sroot');

sroot.addEventListener('click',()=>{
    calc.computeSqrt2();
})

const x2 = document.getElementById('x2');
x2.addEventListener('click',()=>{
    calc.addX2();
})

const x3 = document.getElementById('x3');
x3.addEventListener('click',()=>{
    calc.addX3();
})

const OnebyX = document.getElementById('OnebyX');
OnebyX.addEventListener('click',()=>{
    calc.addOneByX();
})

const plusMinus = document.getElementById('plusMinus');
plusMinus.addEventListener('click',()=>{
    calc.plusMinus();
})

const Abs = document.getElementById('Abs');
Abs.addEventListener('click',()=>{
    calc.computeAbs();
})


const mod = document.getElementById('mod');
mod.addEventListener('click',()=>{
    calc.addMod();
})

const deg = document.getElementById('deg');
deg.addEventListener('click',()=> deg.innerHTML = deg.innerHTML === "RAD" ? "DEG" : "RAD")