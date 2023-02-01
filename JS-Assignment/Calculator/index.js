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

            // Factorial Logic
            const factoReg = /\d+\!/g;
   
            let str = this.input.value;

            let newstr = str.replace(factoReg,(x)=>{
                let n = parseInt(x.slice(0,-1));
                return findFacto(n);
            })

            newstr = newstr.replaceAll('log',(x)=>{
                return 'Math.log10'
            })
            newstr = newstr.replaceAll('ln',(x)=>{
                return 'Math.log'
            })
            
            this.output.innerText = eval(newstr) || '';

        }
        catch(err)
        {
            let ch1 = this.input.value.at(-1);
            let ch2 = this.input.value.at(-2);
            
            if((ch1 == '+' || ch1 == '-' || ch1 == '*' || ch1 == '/') && (ch2 == '+' || ch2 == '-' || ch2 == '*' || ch2 == '/'))
                this.output.innerText = 'ERROR'
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
        else if(ch === 'π')
            ch = String(Math.PI);
        else if(ch === 'e')
            ch = String(Math.E);

        input.focus()
        let pos = this.input.selectionStart;
        let str = this.input.value;

        this.input.value = str.slice(0,pos)+ch+str.slice(pos);
        this.calculate();
    }

    delete()
    {
        this.input.value = this.input.value.slice(0,-1)
    }

    computeSin()
    {
        this.output.innerText = Math.sin(Number(this.input.value));
        this.input.value = 'sin('+this.input.value+')';
    }

    computeCos()
    {
        this.output.innerText = Math.cos(Number(this.input.value));
        this.input.value = 'cos('+this.input.value+')';
    }

    computeTan()
    {
        this.output.innerText = Math.tan(Number(this.input.value));
        this.input.value = 'tan('+this.input.value+')';
    }

    computeCosec()
    {
        this.output.innerText = 1/(Math.sin(Number(this.input.value)));
        this.input.value = 'cosec('+this.input.value+')';
    }

    computeSec()
    {
        this.output.innerText = 1/(Math.cos(Number(this.input.value)));
        this.input.value = 'sec('+this.input.value+')';
    }

    computeCot()
    {
        this.output.innerText = 1/(Math.tan(Number(this.input.value)));
        this.input.value = 'cot('+this.input.value+')';
    }

    addFacto()
    {
        calc.appendNumbers('!');
        this.calculate()
    }

    addLog()
    {
        this.appendNumbers('log()');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }

    addLn()
    {
        this.appendNumbers('ln()');
        this.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
        this.input.focus();
    }

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
}

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
    calc.calculate()
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
    // calc.input.setSelectionRange(calc.input.value.length, calc.input.value.length-1);
    // calc.input.focus();
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


// Trigonometry DropDown
const trigonometry = document.getElementById('trigonometry');
const trigonometrySection = document.getElementById('trigonometry-section');

trigonometry.addEventListener('click',()=>{
    const display = trigonometrySection.style.display;

    if(display === 'grid')
        trigonometrySection.style.display = 'none';
    else
        trigonometrySection.style.display = 'grid';
})

// Add ! to input
const facto = document.getElementById('facto')

facto.addEventListener('click',()=>{
    calc.addFacto()
})

// Add log and ln to input
const log = document.getElementById('log')
const ln = document.getElementById('ln')

log.addEventListener('click',()=>{
    calc.addLog();
})

ln.addEventListener('click',()=>{
    calc.addLn();
})

// for PI and E

const pie = document.querySelectorAll('.pie');

pie.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        calc.appendNumbers(e.target.innerText)
    })    
})

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

mc.addEventListener('click',()=>{
    calc.memoryClear();
})

mplus.addEventListener('click',()=>{
    calc.memoryPlus();
})

mminus.addEventListener('click',()=>{
    calc.memoryMinus();
})