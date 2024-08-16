import { fetchFoodItems } from "../services/foodService.js";
import { filterProductsByType } from "./selectTypeController.js";
export const initializePage = async () => {
    await fetchFoodItems(); // Tải dữ liệu và thiết lập dropdown

    // Gắn sự kiện onchange cho dropdown sau khi dữ liệu đã được tải
    document.getElementById('product-filter').addEventListener('change', filterProductsByType);
};

// Gọi hàm khởi tạo khi trang đã sẵn sàng
initializePage();
