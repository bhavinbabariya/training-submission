
const ProductForm ={
    p_id : document.getElementById('p_id'),
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

const updateData = ()=>{

    console.log(ProductForm.p_img.files)

    const newProduct = {};
    newProduct.name = ProductForm.p_name.value;
    newProduct.price = ProductForm.p_price.value;
    newProduct.desc = ProductForm.p_desc.value;
    newProduct.img_name = ProductForm.p_img.files[0].name;
    newProduct.id = ProductForm.p_id.value;
    
    // Parse and Stringify

    const id = localStorage.getItem('update_product_id');
    const products = JSON.parse(localStorage.getItem('products'));

    let p_index= products.findIndex((p)=>p.id===id);
    products[p_index] = newProduct;

    localStorage.setItem('products',JSON.stringify(products));
    console.log('Data Updated Succesfully')
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
            updateData();
        }
    }
    catch(err)
    {
        console.error(err)
    }
})


const getandSetProductData = ()=>{
    const id = localStorage.getItem('update_product_id');
    const products = JSON.parse(localStorage.getItem('products'));

    const product = products.find((p)=>p.id===id);
    ProductForm.p_id.value = product.id;

    ProductForm.p_name.value = product.name;
    ProductForm.p_price.value = product.price; 
    ProductForm.p_desc.value = product.desc;
}


window.onload = getandSetProductData();   