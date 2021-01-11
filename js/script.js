// mobile menu - burder
function ShowMenu() {
  document.getElementById("hideMenu").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
// show card
function ShowCard() {
  document.getElementById();
}
let allData;
let currentColorData;
let currentSizeData;
let currentPriceData;
let currentData;
let changedData;
let choosedData;
let choosed;

fetch("./products.json")
  .then(function (resp) {
    return resp.json();
  })
  .then((data) => {
    allData = data;
    currentData = data;
    disp(currentData);
  });

// add size tag after choose
let itemPrice;
function FilterSize(size, color, price) {
  if (choosedData == undefined) {
    choosedData = allData.filter(function (item) {
      item.size == size;
      currentPage = 1;
      return item.size == size;
    });
  } else {
    TempArray = [];
    choosedData = allData.filter(function (item) {
      if (color.length == 0 && price == undefined) {
        console.log(item.color);
        item.size == size;
        return item.size == size;
      }
      if (price == undefined) {
        if (size.includes(item.size) && color.includes(item.color)) {
          TempArray.push(item);
          choosedData = TempArray;
          return choosedData;
        }
      }
      if (color.length == 0) {
        itemPrice = Number(price);
        if (size.includes(item.size) && item.price <= itemPrice) {
          TempArray.push(item);
          choosedData = TempArray;
          return choosedData;
        }
      } else {
        itemPrice = Number(price);
        if (
          size.includes(item.size) &&
          item.price <= itemPrice &&
          color.includes(item.color)
        ) {
          console.log(item);
          TempArray.push(item);
          choosedData = TempArray;
          return choosedData;
        }
      }
    });
    return choosedData;
  }
}
let tagSize = document.getElementById("tagSize");
tagSize.innerHTML = "size: all";
let size;
document.getElementById("size").onchange = function () {
  size = event.target.value;
  if (size == "-1") {
    disp(allData);
    tagSize.innerHTML = "All sizes";
  } else {
    FilterSize(size, colorArrValue, priceSlider);
    disp(choosedData);
    tagSize.innerHTML = "size:" + size;
    currentPage = 1;
  }
};
// add colors tag
let tagColor = document.getElementById("tagColor");
tagColor.innerHTML = "color: all";
// add filter color
const colorBtn = document.querySelectorAll("input[type=checkbox]");
let colorArrValue = [];
let colorData = [];
for (const button of colorBtn) {
  button.addEventListener("click", function (event) {
    var get = event.target.value;
    var color = document.getElementById(get);
    if (color.checked) {
      colorArrValue.push(color.value);
      tagColor.innerHTML = "color: " + colorArrValue.join(", ");
      console.log(colorArrValue);
      FilterColor(size, colorArrValue, priceSlider);
      disp(choosedData);
    }
    if (!color.checked) {
      console.log(color.value);
      const indexColor = colorArrValue.indexOf(color.value);
      if (indexColor > -1) {
        colorArrValue.splice(indexColor, 1);
      }
      tagColor.innerHTML = "color: " + colorArrValue.join(", ");
      FilterColor(size, colorArrValue, priceSlider);
      disp(choosedData);
    }
  });
}
let TempArray = [];
function FilterColor(size, color, price) {
  currentPage = 1;
  if (choosedData == undefined) {
    choosedData = [];
    ColorData = allData.map(function (item) {
      if (color.includes(item.color)) {
        choosedData.push(item);
      }
    });
  } else {
    TempArray = [];
    ColorData = allData.filter(function (item) {
      if (size == undefined && price == undefined) {
        if (color.includes(item.color)) {
          TempArray.push(item);
          choosedData = TempArray;
        }
      }
      if (size == undefined) {
        itemPrice = Number(price);
        if (color.includes(item.color) && item.price <= itemPrice) {
          TempArray.push(item);
          choosedData = TempArray;
          console.log(item);
        }
      }
      if (price == undefined) {
        if (color.includes(item.color) && size == item.size) {
          console.log(item.color);
          TempArray.push(item);
          choosedData = TempArray;
          console.log(item);
        }
      } else {
        itemPrice = Number(price);
        if (
          color.includes(item.color) &&
          size.includes(item.size) &&
          item.price <= itemPrice
        ) {
          TempArray.push(item);
          choosedData = TempArray;
          console.log(item);
        }
      }
    });
  }
  return choosedData;
}

const tagPrice = document.getElementById("tagPrice");
tagPrice.innerText = "price: all";
let slider = document.getElementById("slider");
slider.addEventListener("input", showSliderValue);
let priceSlider;
function showSliderValue() {
  priceSlider = event.target.value;
  tagPrice.innerText = "price < " + "$" + priceSlider;
  FilterPrice(size, colorArrValue, priceSlider);
  disp(choosedData);
}
function FilterPrice(size, color, price) {
  TempArray = [];
  itemPrice = Number(price);
  choosedData = allData.filter(function (item) {
    if (size == undefined && color.length == 0) {
      let elprice = Number(item.price);
      return elprice <= price;
    }
    if (color.length == 0) {
      if (size.includes(item.size) && item.price <= itemPrice) {
        TempArray.push(item);
        choosedData = TempArray;
        return choosedData;
      }
    }
    if (size == undefined) {
      if (color.includes(item.color) && item.price <= itemPrice) {
        TempArray.push(item);
        choosedData = TempArray;
        return choosedData;
      }
    } else {
      if (
        color.includes(item.color) &&
        item.price <= itemPrice &&
        size.includes(item.size)
      ) {
        TempArray.push(item);
        choosedData = TempArray;
        return choosedData;
      }
    }
  });
}
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
