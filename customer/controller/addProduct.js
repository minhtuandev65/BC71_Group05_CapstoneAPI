
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
        cartItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã có trong giỏ hàng
    } else {
        cart.push({...product, quantity: 1 }); // Thêm sản phẩm mới vào giỏ hàng
    }

    updateCartUI();
    updateCartCount();
};

// Hàm để cập nhật giao diện giỏ hàng
const updateCartUI = () => {
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
};