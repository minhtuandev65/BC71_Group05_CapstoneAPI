// import { fetchFoodItems } from "../services/foodService";
// import {addToCart} from "../controller/addProduct.js"

export const renderFoodList = (foodList) => {
    const container = document.querySelector('.product-list');
    if (!container) {
        console.error('Container không tồn tại');
        return;
    }

    container.innerHTML = ''; // Xóa nội dung cũ

    foodList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <div class="product-image">
                <img src="${product.img}" width="200" alt="${product.name}">
            </div>
            <div class="product-details">
                <h3 class="product-name">Name: ${product.name}</h3>
                <p class="product-description">Description: ${product.description}</p>
                <div class="product-price">Price: ${product.price} Vnđ</div>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Thêm vào giỏ</button>
            </div>
        `;

        container.appendChild(productDiv);
    });
};
