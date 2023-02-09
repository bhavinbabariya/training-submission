
const ProductData ={
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


// Handle Submit Event 
ProductData.add_p.addEventListener('click',()=>{
    // Back Button
})


const data_table = document.getElementById('data-table');


// Load data and put it to table    
const getProductData = ()=>{
    
    const id = localStorage.getItem('view_product_id');
    const products = JSON.parse(localStorage.getItem('products'));

    const product = products.find((p)=>p.id===id);
    
    productData.p_id.value = product.id;

    productData.p_name.innerText = product.name;
    productData.p_price.innerText = product.price; 
    productData.p_desc.innerText = product.desc;
}

window.onload = getProductData;