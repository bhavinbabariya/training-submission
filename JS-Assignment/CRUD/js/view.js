const ProductData = {
    p_id: document.getElementById("view_id"),
    p_name: document.getElementById("view_name"),
    p_price: document.getElementById("view_price"),
    p_desc: document.getElementById("view_desc"),
    p_img: document.getElementById("p_img"),
};

const goToHome = () => {
    window.location.replace("/");
};

const handleEdit = () => {
    localStorage.setItem(
        "update_product_id",
        localStorage.getItem("view_product_id")
    );
    window.location.replace("/edit.html");
};

const getandSetProductData = () => {
    const id = localStorage.getItem("view_product_id");
    const products = JSON.parse(localStorage.getItem("products"));

    const product = products.find((p) => p.id === id);

    console.log(product);
    ProductData.p_id.innerHTML = product.id;

    ProductData.p_name.innerHTML = product.name;
    ProductData.p_price.innerHTML = product.price;
    ProductData.p_desc.innerHTML = product.desc;
    ProductData.p_img.src = "images/" + product.img_name;
};

window.onload = getandSetProductData();
