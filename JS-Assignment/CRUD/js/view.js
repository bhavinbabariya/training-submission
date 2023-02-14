const ProductData = {
    p_id: document.getElementById("view_id"),
    p_name: document.getElementById("view_name"),
    p_price: document.getElementById("view_price"),
    p_desc: document.getElementById("view_desc"),
    p_img: document.getElementById("p_img"),
};

// Back Button
const goToHome = () => {
    window.location.replace("/");
};

// Update Button
const handleEdit = () => {
    localStorage.setItem(
        "update_product_id",
        localStorage.getItem("view_product_id")
    );
    window.location.replace("/edit.html");
};

// Get data and show data
const getandSetProductData = () => {
    const id = localStorage.getItem("view_product_id");
    const products = JSON.parse(localStorage.getItem("products"));

    const product = products.find((p) => p.id === id);

    ProductData.p_id.innerHTML = product.id;

    ProductData.p_name.innerHTML = product.name;
    ProductData.p_price.innerHTML = product.price;
    ProductData.p_desc.innerHTML = product.desc;
    ProductData.p_img.src = product.img_name;
};

window.onload = getandSetProductData();
