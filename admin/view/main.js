// import foodServices

import { getDetailService, getListValue, deleteService, createService, updateDetailService } from "../services/foodServices.js"

// import controller 

import { onLoading, offLoading, getData } from "../controller/controllerne.js"

// import validate

import { validateName, validatePrice, validateDes, validateImg, validateType, validateSameName } from "../controller/validate.js"


// import onlclick in main
window.addFood = addFood
window.deleteFood = deleteFood
window.updateFood = updateFood
window.editFood = editFood


function fetchValue() {
    onLoading()
    getListValue()
        .then(function (res) {
            console.log("🚀 ~ res:", res)
            // res.data la data cua mockApi
            renderFood(res.data)
            offLoading()

        })
        .catch(function (err) {
            console.log("🚀 ~ fetchValue ~ err: 33", err)
            console.log("loi")
            offLoading()

        })
}


fetchValue()

function renderFood(food) {
    let contentHtml = ''
    // su dung vong lap de lay cac phan tu cua food
    for (let i = 0; i < food.length; i++) {
        let string = ` <tr>
        <td>${food[i].id}</td>
        <td>${food[i].name}</td>
        <td>${food[i].price}</td>
        <td><img width=100 src="${food[i].img}"/></td>
        <td>${food[i].description}</td>
        <td>${food[i].type}</td>
        <td class="d-flex">
        <button onclick="deleteFood('${food[i].id}')" class="btn btn-primary">Xóa</button>
        <button onclick="editFood('${food[i].id}')" class="btn btn-warning mx-2">Sửa</button>
        </td>
        </tr>`
        contentHtml += string
    }
    // show ra man hinh'
    document.getElementById("tblDanhSachSP").innerHTML = contentHtml;

}




function themMoi() {

}

// them
function addFood() {
    // Lấydanh sách sản phẩm hiện tại từ API
    document.getElementById("TenSP").setAttribute("readonly", false);
   

    getListValue()
        .then(function (res) {
            let productList = res.data;

            // Lấy dữ liệu từ form
            let cuisine = getData();
            // Validation

            let checkFail = false;

            // Xác thực tên sản phẩm trùng
            let ValSameName = validateSameName(productList);
            let valName = validateName();
            let valPrice = validatePrice();
            let valDes = validateDes();
            let valImg = validateImg();
            let valType = validateType();

            // Kiểm tra tất cả các validation đều đúng
            let checkALLTrueToShow = ValSameName && valName && valPrice && valDes && valImg && valType;

            if (checkALLTrueToShow !== checkFail) {
                // Gửi dữ liệu lên API để tạo mới sản phẩm
                createService(cuisine)
                    .then(function (res) {
                        console.log(res);
                        // Đóng modal
                        $("#myModal").modal("hide");
                        // Cập nhật danh sách sản phẩm
                        fetchValue();
                        document.getElementById("TenSP").value = ''
                        document.getElementById("GiaSP").value = ''
                        document.getElementById("HinhSP").value = ''
                        document.getElementById("MoTaSP").value = ''
                        document.getElementById("TypeSP").value = ''
                    })
                    .catch(function (err) {
                        // Nếu lỗi, hiển thị lỗi và tắt loading screen
                        offLoading();
                        console.log("🚀 ~ err 82:", err);
                    });
            }
        })
        .catch(function (err) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", err);
        });
}

// xoa



function deleteFood(id) {
    onLoading()
    deleteService(id)
        .then(function (res) {
            fetchValue() // refresh , load lai danh sach moi nhat sau khi xoa
            offLoading()
        })
        .catch(function (err) {
            offLoading()
            console.log(err)
        })
}

// sua
function editFood(id) {
    document.getElementById("updatene").style.display = "block"
    // $("#myModal").clickOutsideThisElement(function() {
    //     fetchValue()
    //     document.getElementById("TenSP").value = ''
    //     document.getElementById("GiaSP").value = ''
    //     document.getElementById("HinhSP").value = ''
    //     document.getElementById("MoTaSP").value = ''
    //     document.getElementById("TypeSP").value = ''
    //     document.getElementById("TenSP").setAttribute("readonly", false);
    // });
    

    getDetailService(id)
        .then(function (res) {
            // dat food = res.data de lay data cua mockApi
            let food = res.data
            $("#myModal").modal("show");
            // dua data len
            document.getElementById("TenSP").value = food.name
            document.getElementById("TenSP").setAttribute("readonly", true);
            document.getElementById("GiaSP").value = food.price
            document.getElementById("HinhSP").value = food.img
            document.getElementById("MoTaSP").value = food.description
            document.getElementById("TypeSP").value = food.type

            // gan id vao modal title 
            document.getElementById("product-id").innerText = food.id
            document.getElementById("product-id").style.display = "none"
        })
        .catch(function (err) {
            console.log("loi")
        })


}
document.getElementById("btnThemSP").addEventListener('click', () => {
    document.getElementById("TenSP").value = ''
            document.getElementById("GiaSP").value = ''
            document.getElementById("HinhSP").value = ''
            document.getElementById("MoTaSP").value = ''
            document.getElementById("TypeSP").value = ''
            document.getElementById("TenSP").removeAttribute("readonly");
})
// cap nhat
function updateFood() {

    
    // lay id tu product-id de dinh vi duoc vi tri
    let takeId = document.getElementById("product-id").innerText
    // lay data tu information 
    let takeInfo = getData()
    updateDetailService(takeInfo, takeId)
        .then(function (res) {

            $("#myModal").modal("hide");
            fetchValue()
            document.getElementById("TenSP").value = ''
            document.getElementById("GiaSP").value = ''
            document.getElementById("HinhSP").value = ''
            document.getElementById("MoTaSP").value = ''
            document.getElementById("TypeSP").value = ''
            document.getElementById("TenSP").setAttribute("readonly", false);


        })
        .catch(function (err) {
            console.log(err)

        })           
}


// tim san pham 

document.getElementById("findFoodName").addEventListener('change', () => {
    // Get the selected value
    const searchValue = document.getElementById("findFoodName").value;

    getListValue()
        .then(function (res) {
            let foodName = [];
            const value = res.data; // Assuming res.data is an array of food items

            console.log("🚀 ~ value:", value);

            // Iterate over the array and find matching food item
            for (let i = 0; i < value.length; i++) {
                const foodItem = value[i]; // Assuming each item has a 'type' property

                if (foodItem.type === searchValue) {
                    foodName.push(foodItem);
                    console.log("🚀 ~ foodName:", foodName)
                    console.log("🚀 ~ foodItem:", foodItem);
                    
                }
            }
            renderFood(foodName); // Call renderFood with the found foodName

            
     
        })
        .catch(function (err) {
            // Handle errors
            console.error(err);
        });
});


// sort san pham 



document.getElementById("sort").addEventListener('change', () => {
    let sortNe = document.getElementById("sort").value 
    
    console.log(sortNe)

    getListValue()
        .then(function (res) {
            const value = res.data; // Assuming res.data is an array of food items
            if (sortNe == 1) {
                value.sort((a, b) => b.price - a.price);
                console.log("🚀 ~ value:", value)
                renderFood(value); // Call renderFood with the found foodName
            }
            
            else if (sortNe == 2) {
                value.sort((a, b) => a.price - b.price);
                console.log("🚀 ~ value2:", value)
                renderFood(value); // Call renderFood with the found foodName
            }

            
     
        })
        .catch(function (err) {
            // Handle errors
            console.error(err);
        });
});
 













