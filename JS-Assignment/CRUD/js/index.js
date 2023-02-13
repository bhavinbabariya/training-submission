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

    showAlert("Product added succesfully !!");
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
    } else if (ProductForm.p_price.value <= 0) {
        ProductForm.err_price.innerText =
            "Product Price must be greater than zero";
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

// Handle View Button
function handleView(id) {
    localStorage.setItem("view_product_id", id);
    window.location.replace("/view.html");
}

// Handle Cancle Button in modal
const handleCancle = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// ACTUAL DELETE FUNCTION : DELETE PRODUCT DATA IN LOCALSTORAGE
const deleteProduct = () => {
    const id = localStorage.getItem("delete_product_id");
    const products = JSON.parse(localStorage.getItem("products"));

    const index = products.findIndex((p) => p.id === id);
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    handleCancle();
    showData();
    showAlert("Product deleted successfully!!");
};

// Handle Delete Button
const handleDelete = (id) => {
    localStorage.setItem("delete_product_id", id);

    //show modal and go to Top
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
            <td><img src="${p.img_name}" alt="" width=100 height=100></td>
            <td><button class="btn_ btn-edit" onClick='handleEdit(${p.id})'><i class="material-icons">edit</i></button>
            <button class="btn_ btn-delete" onClick='handleDelete(${p.id})'><i class="material-icons">delete</i></button>
            <button class="btn_ btn-view"onClick='handleView(${p.id})'><i class="material-icons">visibility</i></button></td>
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

// Debounce Function
const convertToDebounce = function (fn, delay = 500) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(null, arguments);
        }, delay);
    };
};

// FILTER FUNCTION
const filterData = (e) => {
    const products = JSON.parse(localStorage.getItem("products"));
    const result = products.filter((p) => p.id.startsWith(e.value));
    putDataToTable(result);
};

// Handle Filter
const handleFilter = convertToDebounce(filterData, 400);

const arrowBtnGroup = {
    id_up: document.querySelector(".id0"),
    id_down: document.querySelector(".id1"),

    name_up: document.querySelector(".name0"),
    name_down: document.querySelector(".name1"),

    price_up: document.querySelector(".price0"),
    price_down: document.querySelector(".price1"),
};

/* -----------Sorting Logic -------------*/

// 0 -> up & inactive
// 1 -> up & active
// 2 -> down & active

const sortBtnState = {
    id: 0,
    name: 0,
    price: 0,
};

/* Below function change element styling according to state*/

const runForAll = () => {
    if (sortBtnState["id"] === 0) {
        arrowBtnGroup.id_up.style.display = "none";
        arrowBtnGroup.id_down.style.display = "none";
        arrowBtnGroup.id_up.classList.remove("arrow-btn-active");
    } else {
        arrowBtnGroup.id_up.style.display =
            sortBtnState["id"] === 1 ? "inline-block" : "none";
        arrowBtnGroup.id_down.style.display =
            sortBtnState["id"] === 1 ? "none" : "inline-block";

        if (sortBtnState["id"] === 1) {
            arrowBtnGroup.id_up.classList.add("arrow-btn-active");
            arrowBtnGroup.id_down.classList.remove("arrow-btn-active");
        } else {
            arrowBtnGroup.id_down.classList.add("arrow-btn-active");
            arrowBtnGroup.id_up.classList.remove("arrow-btn-active");
        }
    }

    if (sortBtnState["name"] === 0) {
        arrowBtnGroup.name_up.style.display = "none";
        arrowBtnGroup.name_down.style.display = "none";
        arrowBtnGroup.name_up.classList.remove("arrow-btn-active");
    } else {
        arrowBtnGroup.name_up.style.display =
            sortBtnState["name"] === 1 ? "inline-block" : "none";
        arrowBtnGroup.name_down.style.display =
            sortBtnState["name"] === 1 ? "none" : "inline-block";

        if (sortBtnState["name"] === 1) {
            arrowBtnGroup.name_up.classList.add("arrow-btn-active");
            arrowBtnGroup.name_down.classList.remove("arrow-btn-active");
        } else {
            arrowBtnGroup.name_down.classList.add("arrow-btn-active");
            arrowBtnGroup.name_up.classList.remove("arrow-btn-active");
        }
    }
    if (sortBtnState["price"] === 0) {
        arrowBtnGroup.price_up.style.display = "none";
        arrowBtnGroup.price_down.style.display = "none";
        arrowBtnGroup.price_up.classList.remove("arrow-btn-active");
    } else {
        arrowBtnGroup.price_up.style.display =
            sortBtnState["price"] === 1 ? "inline-block" : "none";
        arrowBtnGroup.price_down.style.display =
            sortBtnState["price"] === 1 ? "none" : "inline-block";

        if (sortBtnState["price"] === 1) {
            arrowBtnGroup.price_up.classList.add("arrow-btn-active");
            arrowBtnGroup.price_down.classList.remove("arrow-btn-active");
        } else {
            arrowBtnGroup.price_down.classList.add("arrow-btn-active");
            arrowBtnGroup.price_up.classList.remove("arrow-btn-active");
        }
    }
};

runForAll();

// Below function change state of button
const changeSortState = (key, value) => {
    for (let key in sortBtnState) sortBtnState[key] = 0;

    sortBtnState[key] = value;
    runForAll();
};

// Sort Data
const sortData = (sortBy) => {
    let mode = sortBtnState[sortBy] === 1 ? 1 : 0;

    const products = JSON.parse(localStorage.getItem("products"));

    if (sortBy === "id") {
        products.sort((a, b) => {
            return mode === 0
                ? Number(a.id) - Number(b.id)
                : Number(b.id) - Number(a.id);
        });

        if (sortBtnState.id === 0) {
            changeSortState("id", 1);
        } else if (sortBtnState.id === 1) {
            changeSortState("id", 2);
        } else if (sortBtnState.id === 2) {
            changeSortState("id", 1);
        }
    } else if (sortBy === "name") {
        products.sort((a, b) => {
            let flag = a.name.localeCompare(b.name);
            return mode === 0 ? flag : flag * -1;
        });

        if (sortBtnState.name === 0) {
            changeSortState("name", 1);
        } else if (sortBtnState.name === 1) {
            changeSortState("name", 2);
        } else if (sortBtnState.name === 2) {
            changeSortState("name", 1);
        }
    } else if (sortBy === "price") {
        products.sort((a, b) => {
            return mode === 0
                ? Number(a.price) - Number(b.price)
                : Number(b.price) - Number(a.price);
        });
        if (sortBtnState.price === 0) {
            changeSortState("price", 1);
        } else if (sortBtnState.price === 1) {
            changeSortState("price", 2);
        } else if (sortBtnState.price === 2) {
            changeSortState("price", 1);
        }
    }

    putDataToTable(products);
};

/*--------Home made Alert Box-------------*/

const alert = document.querySelector(".alert");
const progress = document.querySelector(".progress");

// Progress Bar in Alert Box
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
