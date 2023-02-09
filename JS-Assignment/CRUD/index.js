
const ProductForm ={
    p_name : document.getElementById('p_name'),
    p_price : document.getElementById('p_price'),
    p_desc : document.getElementById('p_desc'),
    p_img : document.getElementById('p_img'),
    add_p : document.getElementById('add_p'),
    form : document.getElementById('add_p_form'),
    err_name : document.getElementById('err_name'),
    err_price : document.getElementById('err_price'),
    err_desc : document.getElementById('err_desc'),
    err_img : document.getElementById('err_img'),

}
// Generate Unique String
const uid = function(){
    const max = 99999;
    const min = 10000;
    return Date.now().toString().slice(5) + (Math.ceil(Math.random()*(max-min) + min)).toString();
}


// Check if products array available in localstorage or not
// If yes then nothing else set empty array in localstorage

if(!localStorage.getItem('products'))
{   
    localStorage.setItem('products',JSON.stringify([]));   
}

// Clear Form Data
const clearFormData = ()=>{
    ProductForm.p_name.value = '';
    ProductForm.p_price.value = '';
    ProductForm.p_desc.value = '' ;
    ProductForm.p_img.value = '';
}

const addData = ()=>{

    const product = {};
    product.name = ProductForm.p_name.value;
    product.price = ProductForm.p_price.value;
    product.desc = ProductForm.p_desc.value;
    product.img_name = ProductForm.p_img.files[0].name;
    product.id = uid();
    
    // Parse and Stringify

    const products = JSON.parse(localStorage.getItem('products'));
    products.push(product);
    localStorage.setItem('products',JSON.stringify(products));

    console.log('Data Added Succesfully')
} 

// below function validates the form

const validateForm = ()=>{

    let flag = true;

    if(ProductForm.p_name.value == '')
    {
        ProductForm.err_name.innerText = 'Please Enter Product Name';
        flag = false;
    }
    else
        ProductForm.err_name.innerText = '';

    if(ProductForm.p_price.value == '')
    {
        ProductForm.err_price.innerText = 'Please Enter Product Price';
        flag = false;
    }
    else
        ProductForm.err_price.innerText = '';


    if(ProductForm.p_desc.value == '')
    {
        ProductForm.err_desc.innerText = 'Please Enter Product Description';
        flag = false;
    }
    else
        ProductForm.err_desc.innerText = '';

    if(ProductForm.p_img.value == '')
    {
        ProductForm.err_img.innerText = 'Please Uplaod Product Image';
        flag = false;
    }
    else
        ProductForm.err_img.innerText = '';

    return flag;
}

// Handle Submit Event 
ProductForm.add_p.addEventListener('click',()=>{
    try{
        if(validateForm())
        {
            addData();
            showData();
            clearFormData();
        }
    }
    catch(err)
    {
        console.error(err)
    }
})

function Temp(id)
{
    console.log("id : ",id);
}

const data_table = document.getElementById('data-table');

const clearTableData = ()=>{
    data_table.replaceChildren();
    data_table.insertAdjacentHTML('afterbegin',`<tr>
        <th>ID</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
        <th>View</th>
    </tr>`);
}
// Load data and put it to table    
const showData = ()=>{
    clearTableData();
    const products = JSON.parse(localStorage.getItem('products'));

    products.forEach((p) => {
        data_table.insertAdjacentHTML('beforeend',`<tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.desc}</td>
                <td><button class="btn_ btn-edit">Edit</button></td>
                <td><button class="btn_ btn-delete">Delete</button></td>
                <td><button class="btn_ btn-view">View</button></td>
            </tr>`
        );
    });
}

window.onload = showData;