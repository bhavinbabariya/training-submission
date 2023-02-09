const p_name = document.getElementById('p_name');
const p_price = document.getElementById('p_price');
const p_desc = document.getElementById('p_desc');
const p_img = document.getElementById('p_img');
const add_p = document.getElementById('add_p');
const form = document.getElementById('add_p_form');

// Generate Unique String
const uid = function(){
    return Date.now().toString(36) + (Math.random()*100).toString(36);
}


// Check if products array available in localstorage or not
// If yes then nothing else set empty array in localstorage

if(!localStorage.getItem('products'))
{   
    localStorage.setItem('products',JSON.stringify([]));   
}

// Clear Form Data
const clearFormData = ()=>{
    form.reset();
}

const addData = ()=>{
    const product = {};
    product.name = p_name.value;
    product.price = p_price.value;
    product.desc = p_desc.value;
    product.img_name = p_img.files[0].name;
    product.id = uid();
    
    const products = JSON.parse(localStorage.getItem('products'));
    products.push(product);
    localStorage.setItem('products',JSON.stringify(products));
} 

add_p.addEventListener('click',()=>{
    addData()
    clearFormData();
})

p_desc.addEventListener('click',()=>{
    p_desc.focus();
    p_desc.value = null;
})
