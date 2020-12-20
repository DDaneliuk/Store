var dataproduct;

let allData;
let currentData;

function disp(data) {
  console.log(data);
  DisplayList(data, productBlock, rows, currentPage);
  SetupPagination(data, pagination_element, rows);
  return data;
}

fetch("./products.json")
  .then(function (resp) {
    return resp.json();
  })
  .then((d) => {
    allData = d;
    currentData = d;
    disp(currentData);
  });

function FilterSize(size) {
  currentData = allData.filter(function (element) {
    return element.size == size;
  });
}

document.getElementById("size").onchange = function (ev) {
  let size = ev.target.value;

  // console.log(this);
  FilterSize(size);
  disp(currentData);
};

const productBlock = document.getElementById("product_block");
const pagination_element = document.getElementById("pagination");

let currentPage = 1;
let rows = 6;

function DisplayList(data, productBlock, rows, currentPage) {
  productBlock.innerHTML = "";
  currentPage--;

  let start = rows * currentPage;
  let end = start + rows;
  let paginatedItems = data.slice(start, end);
  // console.log(paginatedItems)

  paginatedItems.forEach((element) => {
    const newProduct = document.createElement("div"); //create product div
    newProduct.className = "product";
    product_block.appendChild(newProduct);

    const newProductImage = document.createElement("div"); //create product image div
    newProductImage.className = "product_image";
    newProduct.appendChild(newProductImage);

    const newProductInfo = document.createElement("div"); //create product information div
    newProductInfo.className = "product_info";
    newProduct.appendChild(newProductInfo);

    const newImageTag = document.createElement("img"); //add img tag to Image block
    newProductImage.appendChild(newImageTag);

    const newImageAttrubute = document.createAttribute("src"); //add img to Tag
    newImageTag.setAttribute("src", element.image);

    const newProductName = document.createElement("p"); //add name of product
    newProductName.innerHTML = element.name;
    newProductInfo.appendChild(newProductName);

    const newProductTags = document.createElement("div"); // add block with tags
    newProductTags.setAttribute("class", "productsTags");
    newProductInfo.appendChild(newProductTags);

    const newProductSize = document.createElement("p"); //add size of product
    newProductSize.innerHTML = "size:" + element.size;
    newProductTags.appendChild(newProductSize);
    const newProductSizeAttId = document.createAttribute("id"); // add id to size for filters
    newProductSize.setAttribute("id", "productSize");
    const newProductSizeAttClass = document.createAttribute("class"); // add class to size for tags
    newProductSize.setAttribute("class", "productTag");
    newProductSize.setAttribute("value", element.size); // add class to color for tags

    const newProductColor = document.createElement("p"); //add color of product
    newProductColor.innerHTML = "color:" + element.color;
    newProductTags.appendChild(newProductColor);
    newProductColor.setAttribute("id", "productColor"); // add id to color for filters
    newProductColor.setAttribute("class", "productTag");
    newProductColor.setAttribute("value", "productTag"); // add class to color for tags

    const newProductPrice = document.createElement("p"); //add price of product
    newProductPrice.innerHTML = element.price;
    newProductInfo.appendChild(newProductPrice);
    newProductPrice.setAttribute("id", "productPrice");

    const newButton = document.createElement("button");
    newButton.className = "product_buy";
    newButton.textContent = "Order now";
    newProductInfo.appendChild(newButton);
  });
}

function SetupPagination(data, productBlock, rows) {
  productBlock.innerHTML = "";

  let page_count = Math.ceil(data.length / rows);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, data);
    productBlock.appendChild(btn);
  }
}
function PaginationButton(page, data) {
  let button = document.createElement("button");
  button.innerText = page;

  if (currentPage == page) button.classList.add("activePage");
  if (currentPage != page) button.classList.add("buttonPage");

  button.addEventListener("click", function () {
    currentPage = page;
    DisplayList(data, productBlock, rows, currentPage);

    let current_btn = document.querySelector(".activePage");
    current_btn.classList.remove("activePage");
    current_btn.classList.add("buttonPage");

    button.classList.add("activePage");
  });

  return button;
}
