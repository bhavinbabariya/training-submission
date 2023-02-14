const UpdateForm = {
    p_id: document.getElementById("p_id"),
    p_name: document.getElementById("p_name"),
    p_price: document.getElementById("p_price"),
    p_desc: document.getElementById("p_desc"),
    p_img: document.getElementById("p_img"),
    update_btn: document.getElementById("update_btn"),
    cancle_btn: document.getElementById("cancle_btn"),
    form: document.getElementById("update_p_form"),
    err_name: document.getElementById("err_name"),
    err_price: document.getElementById("err_price"),
    err_desc: document.getElementById("err_desc"),
    err_img: document.getElementById("err_img"),
};

const updateData = () => {
    const newProduct = {};
    newProduct.name = UpdateForm.p_name.value;
    newProduct.price = UpdateForm.p_price.value;
    newProduct.desc = UpdateForm.p_desc.value;
    newProduct.img_name = UpdateForm.p_img.value;
    newProduct.id = UpdateForm.p_id.value;

    // Parse and Stringify

    const id = localStorage.getItem("update_product_id");
    const products = JSON.parse(localStorage.getItem("products"));

    let p_index = products.findIndex((p) => p.id === id);
    products[p_index] = newProduct;

    localStorage.setItem("products", JSON.stringify(products));
    showAlert("Product Updated Succesfully");
};

// below function validates the form

const validateForm = () => {
    let flag = true;

    if (UpdateForm.p_name.value == "") {
        UpdateForm.err_name.innerText = "Please Enter Product Name";
        flag = false;
    } else UpdateForm.err_name.innerText = "";

    if (UpdateForm.p_price.value == "") {
        UpdateForm.err_price.innerText = "Please Enter Product Price";
        flag = false;
    } else if (UpdateForm.p_price.value <= 0) {
        UpdateForm.err_price.innerText =
            "Product Price must be greater than zero";
        flag = false;
    } else UpdateForm.err_price.innerText = "";

    if (UpdateForm.p_desc.value == "") {
        UpdateForm.err_desc.innerText = "Please Enter Product Description";
        flag = false;
    } else UpdateForm.err_desc.innerText = "";

    if (UpdateForm.p_img.value == "") {
        UpdateForm.err_img.innerText = "Please Enter Product Image URL :";
        flag = false;
    } else UpdateForm.err_img.innerText = "";

    return flag;
};

// Handle Submit Event
UpdateForm.update_btn.addEventListener("click", () => {
    if (validateForm()) {
        updateData();
        setTimeout(() => {
            window.location.replace("/");
        }, 2000);
    }
});

// Cancle Button
UpdateForm.cancle_btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("/");
});

// Initially call : get data and set to update form
const getandSetProductData = () => {
    const id = localStorage.getItem("update_product_id");
    const products = JSON.parse(localStorage.getItem("products"));

    const product = products.find((p) => p.id === id);
    UpdateForm.p_id.value = product.id;

    UpdateForm.p_name.value = product.name;
    UpdateForm.p_price.value = product.price;
    UpdateForm.p_desc.value = product.desc;
    UpdateForm.p_img.value = product.img_name;
};

window.onload = getandSetProductData();

const alert = document.querySelector(".alert");
const progress = document.querySelector(".progress");

let i = 0;
const startProgress = () => {
    if (i === 100) {
        progress.style.width = "0%";
        i = 0;
        return;
    }
    setTimeout(() => {
        progress.style.width = `${i * 1}%`;
        startProgress(i++);
    }, 20);
};

const showAlert = (msg) => {
    alert.style.display = "block";
    alert.childNodes[1].innerText = msg;
    startProgress();
    setTimeout(() => {
        alert.style.transform = "translateX(200%)";
        setTimeout(() => {
            alert.style.display = "none";
            alert.style.transform = "translateX(0%)";
        }, 1000);
    }, 2000);
};
