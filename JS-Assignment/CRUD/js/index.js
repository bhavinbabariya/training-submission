const ProductForm = {
    p_name: document.getElementById("p_name"),
    p_price: document.getElementById("p_price"),
    p_desc: document.getElementById("p_desc"),
    p_img: document.getElementById("p_img"),
    add_p: document.getElementById("add_p"),
    form: document.getElementById("add_p_form"),
    err_name: document.getElementById("err_name"),
    err_price: document.getElementById("err_price"),
    err_desc: document.getElementById("err_desc"),
    err_img: document.getElementById("err_img"),
};

// Generate Unique String
const uid = function () {
    const max = 99999;
    const min = 10000;
    return (
        Date.now().toString().slice(3) +
        Math.ceil(Math.random() * (max - min) + min).toString()
    );
};

// Check if products array available in localstorage or not
// If yes then nothing else set empty array in localstorage

if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify([]));
}

// Clear Form Data
const clearFormData = () => {
    ProductForm.p_name.value = "";
    ProductForm.p_price.value = "";
    ProductForm.p_desc.value = "";
    ProductForm.p_img.value = "";
};

const addData = () => {
    const product = {};
    product.name = ProductForm.p_name.value;
    product.price = ProductForm.p_price.value;
    product.desc = ProductForm.p_desc.value;
    product.img_name = ProductForm.p_img.value;
    product.id = uid();

    // Parse and Stringify

    const products = JSON.parse(localStorage.getItem("products"));
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    window.alert("Data Added Succesfully");
};

// below function validates the form
const validateForm = () => {
    let flag = true;

    if (ProductForm.p_name.value == "") {
        ProductForm.err_name.innerText = "Please Enter Product Name";
        flag = false;
    } else ProductForm.err_name.innerText = "";

    if (ProductForm.p_price.value == "") {
        ProductForm.err_price.innerText = "Please Enter Product Price";
        flag = false;
    } else ProductForm.err_price.innerText = "";

    if (ProductForm.p_desc.value == "") {
        ProductForm.err_desc.innerText = "Please Enter Product Description";
        flag = false;
    } else ProductForm.err_desc.innerText = "";

    if (ProductForm.p_img.value == "") {
        ProductForm.err_img.innerText = "Please Enter Product Image URL";
        flag = false;
    } else ProductForm.err_img.innerText = "";

    return flag;
};

// Handle Submit Event
ProductForm.add_p.addEventListener("click", () => {
    try {
        if (validateForm()) {
            addData();
            showData();
            clearFormData();
        }
    } catch (err) {
        console.error(err);
    }
});

const data_table = document.getElementById("data-table");
const not_found = document.querySelector(".not-found");

const clearTableData = () => {
    // data_table.replaceChildren();
    // data_table.insertAdjacentHTML(
    //     "afterbegin",
    //     `<tr>
    //     <th>ID</th>
    //     <th>Product Name</th>
    //     <th>Price</th>
    //     <th>Description</th>
    //     <th>Image</th>
    //     <th>Edit</th>
    //     <th>Delete</th>
    //     <th>View</th>
    // </tr>`
    // );

    // Remove Element except first 2
    // 1.Text
    // 2.tr th
    while (data_table.childNodes.length > 2) {
        data_table.removeChild(data_table.lastChild);
    }
};

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Handle Edit Button
const handleEdit = (id) => {
    localStorage.setItem("update_product_id", id);
    window.location.replace("/edit.html");
};

const handleView = (id) => {
    localStorage.setItem("view_product_id", id);
    window.location.replace("/view.html");
};

const handleCancle = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const deleteProduct = () => {
    const id = localStorage.getItem("delete_product_id");
    const products = JSON.parse(localStorage.getItem("products"));

    const index = products.findIndex((p) => p.id === id);
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    handleCancle();
    showData();
};

const handleDelete = (id) => {
    localStorage.setItem("delete_product_id", id);

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    window.scrollTo({ behavior: "smooth", top: 0 });
};

const putDataToTable = (products) => {
    clearTableData();

    if (products.length === 0) {
        data_table.style.display = "none";
        not_found.style.display = "inline";
        return;
    }

    not_found.style.display = "none";
    data_table.style.display = "block";
    products.forEach((p) => {
        data_table.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.desc}</td>
            <td><img src="./images/${p.img_name}" alt="" width=100 height=100></td>
            <td><button class="btn_ btn-edit" onClick='handleEdit(${p.id})'>Edit</button></td>
            <td><button class="btn_ btn-delete" onClick='handleDelete(${p.id})'>Delete</button></td>
            <td><button class="btn_ btn-view"onClick='handleView(${p.id})'>View</button></td>
        </tr>`
        );
    });
};
// Load data and put it to table
const showData = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    putDataToTable(products);
};

window.onload = showData;

const handleFilter = (e) => {
    // console.log(e.value);
    const products = JSON.parse(localStorage.getItem("products"));

    const result = products.filter((p) => p.id.startsWith(e.value));
    putDataToTable(result);
};

const sortData = (sortBy, mode = 0) => {
    const products = JSON.parse(localStorage.getItem("products"));

    if (sortBy === "id") {
        products.sort((a, b) => {
            return mode === 0
                ? Number(a.id) - Number(b.id)
                : Number(b.id) - Number(a.id);
        });
    } else if (sortBy === "name") {
        products.sort((a, b) => {
            return mode === 0 ? a.name < b.name : a.name > b.name;
        });
    } else if (sortBy === "price") {
        products.sort((a, b) => {
            return mode === 0
                ? Number(a.price) - Number(b.price)
                : Number(b.price) - Number(a.price);
        });
    }

    // console.log(products);
    putDataToTable(products);
};

const p = new Person("bhavin");

function Person(name) {
    this.name = name;
}

class Student {
    constructor(name) {
        this.name = name;
    }
}
