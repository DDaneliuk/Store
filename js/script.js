fetch("./products.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        showPageData(data);
    })
    var pageCards = 6;
function showPageData(data, wrapper, pageBlocks, pages){
    var countElement = data.length;

    var currentPage = 1;
    console.log(countElement);
    

    data.forEach(element => {
        const newProduct = document.createElement('div');    //create product div
        newProduct.className = 'product';
        product_block.appendChild(newProduct);

        const newProductImage = document.createElement('div'); //create product image div
        newProductImage.className = 'product_image';
        newProduct.appendChild(newProductImage);

        const newProductInfo = document.createElement('div'); //create product information div
        newProductInfo.className = 'product_info';
        newProduct.appendChild(newProductInfo);

        const newImageTag = document.createElement("img");  //add img tag to Image block
        newProductImage.appendChild(newImageTag);

        const newImageAttrubute = document.createAttribute("src");    //add img to Tag 
        newImageTag.setAttribute("src", element.image);

        const newProductName = document.createElement("p"); //add name of product
        newProductName.innerHTML = element.name;
        newProductInfo.appendChild(newProductName);

        const newProductPrice = document.createElement("p"); //add price of product
        newProductPrice.innerHTML = element.price;
        newProductInfo.appendChild(newProductPrice);

        const newButton = document.createElement("button");
        newButton.className = 'product_buy';
        newButton.textContent = 'Order now';
        newProductInfo.appendChild(newButton);
    }); 
}
