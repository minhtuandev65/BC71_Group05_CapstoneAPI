// import { fetchFoodItems } from "../services/foodService.js";
import { renderFoodList } from "../model/productModel.js";


export const filterProductsByType = () => {
    const selectedType = document.getElementById('product-filter').value;

    // Kiểm tra xem foodList có được gán đúng cách không
    if (!window.foodList) {
        console.error('foodList chưa được tải.');
        return;
    }

    if (selectedType === 'all') {
        renderFoodList(window.foodList); // Hiển thị tất cả sản phẩm
    } else {
        const filteredList = window.foodList.filter(item => String(item.type) === String(selectedType));
        renderFoodList(filteredList); // Hiển thị sản phẩm theo loại được chọn
    }
};
