// import { saveCart } from "../model/saveCart.js";

const cart = [];

// Hàm để thêm sản phẩm vào giỏ hàng
window.addToCart = (productId) => {
    const product = foodList.find(item => String(item.id) === String(productId));

    if (!product) {
        console.log('Sản phẩm không tồn tại');
        return;
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const cartItem = cart.find(item => String(item.id) === String(productId));
    if (cartItem) {
        cartItem.quantity += 1;
        saveCart(); // Tăng số lượng nếu sản phẩm đã có trong giỏ hàng
    } else {
        cart.push({ ...product, quantity: 1 });
        saveCart(); // Thêm sản phẩm mới vào giỏ hàng
    }

    updateCartUI();
    updateCartCount();

};

// Hàm để cập nhật giao diện giỏ hàng
export const updateCartUI = () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    // Xóa nội dung cũ
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <div class="cart-item-name">Name: ${item.name}</div>
            <div class="cart-item-price">Price: ${item.price} Vnđ</div>
            <div class="cart-item-quantity">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button class='checkout_remove' onclick='removeProduct(${item.id})'>Xóa</button>
             </div>
        `;

        cartItemsContainer.appendChild(cartItemDiv);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice;
};
const updateCartCount = () => {
    const cartCountElement = document.querySelector('.cart-count');
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalCount;
};
// Hàm để tăng số lượng sản phẩm
window.increaseQuantity = (productId) => {
    const cartItem = cart.find(item => String(item.id) === String(productId));
    if (cartItem) {
        cartItem.quantity += 1;
        updateCartUI();
        updateCartCount();
        saveCart(); 
        loadCart();
    }
};

// Hàm để giảm số lượng sản phẩm
window.decreaseQuantity = (productId) => {
    const cartItem = cart.find(item => String(item.id) === String(productId));
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else if (cartItem && cartItem.quantity === 1) {
        cart.splice(cart.indexOf(cartItem), 1); // Xóa sản phẩm khỏi giỏ hàng nếu số lượng là 1
    }
    updateCartUI();
    updateCartCount();
    saveCart();
    loadCart();
};

export let saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Tải giỏ hàng từ localStorage
export let loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.splice(0, cart.length, ...JSON.parse(savedCart)); // Load cart từ localStorage vào mảng cart
        updateCartUI(); // Cập nhật lại giao diện giỏ hàng
        updateCartCount(); // Cập nhật lại số lượng sản phẩm trong giỏ hàng
    }
}
// Thêm sự kiện cho nút "Clear Cart"
document.getElementById('clear-cart-button').addEventListener('click', clearCart);
// Xóa toàn bộ giỏ hàng
function clearCart() {
    cart.length = 0;
    updateCartUI();
    saveCart(); // Xóa giỏ hàng trong localStorage
}

window.removeProduct = (productId) => {
    cart.splice(0, cart.length, ...cart.filter(item => String(item.id) !== String(productId)));
    updateCartUI();
    updateCartCount();
    saveCart(); // Xóa sản phẩm kh��i gi�� hàng trong localStorage
}