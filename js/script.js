// mobile menu - burder
let card = document.getElementById("card");
let menu = document.getElementById("hideMenu");
let closeBtn = document.getElementById("closebtn");
let closeBtnCard = document.getElementById("closebtncard");
let mainBlock = document.getElementById("container");
function ShowMenu() {
  menu.style.width = "250px";
  mainBlock.style.marginRight = "250px";
  mainBlock.style.marginLeft = "-250px";
  mainBlock.style.position = "fixed";
  closeBtn.style.display = "block";
}
function closeNav() {
  menu.style.width = "0";
  mainBlock.style.marginLeft = "0";
  mainBlock.style.marginRight = "0";
  mainBlock.style.position = "relative";
  closeBtn.style.display = "none";
}
function ShowCard() {
  card.style.width = "350px";
  card.style.padding = "50px 30px 110px 30px";
  mainBlock.style.marginRight = "350px";
  mainBlock.style.marginLeft = "-350px";
  mainBlock.style.position = "fixed";
  closeBtnCard.style.display = "block";
}
function closeCard() {
  card.style.width = "0";
  card.style.padding = "0";
  mainBlock.style.marginRight = "0";
  mainBlock.style.marginLeft = "0";
  mainBlock.style.position = "relative";
  closeBtnCard.style.display = "block";
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
    disp(currentData, cartProducts);
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
  if (choosedData.length == 0) {
    choosedData = [];
    EmptyData();
    disp(choosedData);
  } else {
    productBlock.className = "product_block";
    disp(choosedData);
  }
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
function EmptyData() {
  console.log("empty");
  productBlock.className = "product_block";
  let h3 = document.createElement("h3");
  h3.innerHTML = "Sorry";
  console.log(h3);
  productBlock.appendChild(h3);
}
function disp(data) {
  DisplayList(data, productBlock, rows, currentPage, cartProducts);
  SetupPagination(data, pagination_element, rows);
  return data;
}

let productBlock = document.getElementById("product_block");
const pagination_element = document.getElementById("pagination");

let currentPage = 1;
let rows = 6;
function DisplayList(data, productBlock, rows, currentPage, callback) {
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
    newProductPrice.setAttribute("class", "productPrice");

    const newButton = document.createElement("button");
    newButton.className = "product_buy";
    newButton.textContent = "Order now";
    newProductInfo.appendChild(newButton);
  });
  cartProducts();
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
let bagData = [];
function cartProducts() {
  let buyBtn = document.querySelectorAll(".product_buy");
  console.log(buyBtn);
  buyBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      const item = {};
      let name = event.target.parentElement.firstElementChild.textContent;
      item.name = name;

      let price = event.target.parentElement.children[2].textContent;
      item.price = price;

      let fullPath =
        event.target.parentElement.previousSibling.firstElementChild.src;
      let pos = fullPath.indexOf("assets");
      let partPath = fullPath.slice(pos);
      item.image = partPath;
      console.log(item);

      const cartItem = document.createElement("div");

      cartItem.innerHTML = `
      <div class="bag_product">
      <img class="item_bag_photo" src="${item.image}">
      <div class="bag_text">
      <p>${item.name}</p>
      <p class = "bagCartPrice"> ${item.price}</p>
      </div>
      <a href="#">&times;</a>
      </div>`;

      const cart = document.getElementById("card");
      const total = document.querySelector(".cart-total");
      cart.insertBefore(cartItem, total);

      ShowTotal();
    });
  });
  function ShowTotal() {
    const total = [];
    const items = document.querySelectorAll(".bagCartPrice");
    items.forEach(function (item) {
      total.push(parseFloat(item.textContent));
    });
    console.log(total);
    const totalPrice = total.reduce(function (total, item) {
      console.log(item);
      console.log(total);

      total += item;
      return total;
    }, 0);
    document.getElementById("cart-total").textContent = totalPrice;
    // document.getElementById("cart_totals").textContent = finalPrice;
    // document.getElementById("cart_totals").textContent = finalPrice;
    console.log(totalPrice);
  }
}
