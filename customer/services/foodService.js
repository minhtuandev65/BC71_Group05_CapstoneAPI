import { getListValue } from "../../admin/services/foodServices.js";
import { renderFoodList } from "../model/productModel.js";
import { offLoadingCustomer, onLoadingCustomer } from "../utils/loadingUtils.js";
import { filterProductsByType } from "../controller/selectTypeController.js";

export const fetchFoodItems = async () => {
    onLoadingCustomer();
    try {
        const response = await getListValue(); // Lấy dữ liệu từ API
        
        if (!response || !response.data) {
            throw new Error('Dữ liệu không hợp lệ từ API');
        }

        const foodList = response.data;
        window.foodList = foodList;

        renderFoodList(foodList);

        const types = [...new Set(foodList.map(item => String(item.type)))];
        const filterDropdown = document.getElementById('product-filter');
        filterDropdown.innerHTML = '<option value="all">All</option>';

        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            filterDropdown.appendChild(option);
        });

        offLoadingCustomer();

        // Gắn sự kiện onchange cho dropdown sau khi dữ liệu đã được tải
        filterDropdown.addEventListener('change', filterProductsByType);

        return foodList;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        offLoadingCustomer();
        return [];
    }
};



// Fetch food items when the script is loaded
fetchFoodItems();
