let allData;
let currentData;

fetch("./products.json")
  .then(function (resp) {
    return resp.json();
  })
  .then((data) => {
    allData = data;
    currentData = data;
    disp(currentData);
  });

function FilterSize(size) {
  currentData = allData.filter(function (element) {
    element.size == size;
    currentPage = 1;
    return element.size == size;
  });
}
// add size tag after choose
let tagSize = document.getElementById("tagSize");
tagSize.innerHTML = "all sizes";
document.getElementById("size").onchange = function () {
  let size = event.target.value;
  if (size == "-1") {
    currentData = allData;
    disp(allData);
    tagSize.innerHTML = "All sizes";
  } else {
    FilterSize(size);
    disp(currentData);
    tagSize.innerHTML = "size:" + size;
  }
};
// add filter color
const colorBtn = document.querySelectorAll("input[type=checkbox]");
for (const button of colorBtn) {
  button.addEventListener("click", function (event) {
    var get = event.target.value;
    var color = document.getElementById(get);
    if (color.checked) {
      console.log("ok - checked");
      console.log(color);
      FilterColor(color.value);
      disp(currentData);
      console.log(currentData);
    }
    console.log(event.target.value);
  });
}

function FilterColor(color) {
  currentData = allData.filter(function (element) {
    element.color == color;
    return element.color == color;
  });
}
//add filter price
const priceSlider = document.getElementById("slider").value;
console.log(priceSlider);
document.getElementById("slider").onchange = function () {
  let priceSlider = event.target.value;
  console.log(priceSlider);
};

function disp(data) {
  DisplayList(data, productBlock, rows, currentPage);
  SetupPagination(data, pagination_element, rows);
  return data;
}

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
