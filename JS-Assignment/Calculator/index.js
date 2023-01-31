/*

// Clear Function : Done 

const clear = document.getElementById('clear');

clear.addEventListener('click',()=>{
    const input = document.getElementById('user-input')
    const output = document.getElementById('output');

    input.value = '';
    output.innerText = ''
})

// -------------------------------------------------------------


// Calculate function

const calculate = function(){
    try{
        const output = document.getElementById('output');
        const input = document.getElementById('user-input')
        output.innerText = eval(input.value)
    }
    catch(err)
    {
        console.log(err)
    }
}

// -------------------------------------------------------------


// const input = document.getElementById('user-input')

// input.addEventListener('change',(e)=>{
//     console.log(e.target.value)
// })


// Add number in input when key is pressed

const elements = document.querySelectorAll('.key');

elements.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        console.log(e.target.innerText)

        let ch = e.target.innerText;

        if(ch === '×')
        {
            ch = '*'
        }
        else if(ch === '÷')
        {
            ch = '/'
        }
        const input = document.getElementById('user-input')
        input.value = input.value.concat(ch)

        calculate();
    })
})

*/
// -------------------------------------------------------------


class Calculator {

    constructor(inputEle,outputEle)
    {
        this.input = inputEle;
        this.output = outputEle;
        this.input.value = '';
    }

    calculate(){
        try{
            this.output.innerText = eval(this.input.value) || ''
        }
        catch(err)
        {
            this.output.innerText = 'ERROR'
        }
    }

    clear(){
    
        this.input.value = '';
        this.output.innerText = ''
    }

    appendNumbers(ch){

        if(ch === '×')
        {
            ch = '*'
        }
        else if(ch === '÷')
        {
            ch = '/'
        }
        // else if(ch === '.')
        // {
        //     // If once . is come and other try then don't try
        //     if(this.input.value.includes('.'))
        //     {
        //         return;
        //     }
        // }
        this.input.value = this.input.value.concat(ch)

        this.calculate();
    }

    delete()
    {
        this.input.value = this.input.value.slice(0,-1)
    }
}

const input = document.getElementById('user-input')
const output = document.getElementById('output');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const elements = document.querySelectorAll('.key');

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
    console.log('keyup')
    calc.calculate();
})


deleteButton.addEventListener('click',()=>{
    calc.delete();
    calc.calculate();
})
