// import foodServices

console.log("xinchao")
import { getDetailService, getListValue, deleteService, createService, updateDetailService, } from "../services/foodServices.js"

// import controller 

import { onLoading, offLoading , getData } from "../controller/controllerne.js"

// import validate

import { validateBlank } from "../controller/validate.js"
// import onlclick in main
window.addFood = addFood
window.deleteFood = deleteFood
window.updateFood = updateFood
window.editFood = editFood 


function fetchValue () {
    onLoading()
    getListValue()
    .then(function (res) {
        console.log("🚀 ~ res:", res)
        // res.data la data cua mockApi
    renderFood(res.data)
    offLoading()

    })
    .catch(function (err) {
    console.log("loi")
    offLoading()

    })
}


fetchValue()

function renderFood(food)  { 
    let contentHtml = ''
    // su dung vong lap de lay cac phan tu cua food
    for (i = 0; i < food.length; i++  ) {
        let string = ` <tr>
        <td>${food[i].id}</td>
        <td>${food[i].name}</td>
        <td>${food[i].price}</td>
        <td><img width=100 src="${food[i].img}"/></td>
        <td>${food[i].description}</td>
        <td class="d-flex">
        <button onclick="deleteFood('${food[i].id}')" class="btn btn-primary">Xóa</button>
        <button onclick="editFood('${food[i].id}')" class="btn btn-warning mx-2">Sửa</button>
        </td>
        </tr>`
        contentHtml += string
    }
    // show ra man hinh
    document.getElementById("tblDanhSachSP").innerHTML = contentHtml;
    console.log("🚀 ~ renderFood ~ contentHtml:", contentHtml)

}

// them
function addFood () {
    // dat bien cuisine de lay data tu function getData ben controller.js
    let cuisine = getData()
    // lay API ben foodService de dua data len he thong
    createService(cuisine)
    .then(function (res) {
        console.log(res )
        // dong modal 
        $("#myModal").modal("hide");
        // goi lai de cap nhat len he thong va render data
        fetchValue();
      })
      .catch(function (err) {
        // neu loi thi se in ra loi va se tat black screen
        offLoading();
        console.log("🚀 ~ err:", err);
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
    getDetailService(id)
    .then(function (res) {
        // dat food = res.data de lay data cua mockApi
        let food = res.data
     $("#myModal").modal("show");
     // dua data len
   document.getElementById("TenSP").value = food.name
   document.getElementById("GiaSP").value = food.price
   document.getElementById("HinhSP").value = food.img
   document.getElementById("MoTaSP").value = food.description
   // gan id vao modal title 
   document.getElementById("product-id").innerText = food.id
    document.getElementById("product-id").style.display = "none"
    })
    .catch (function (err) {
        console.log("loi")
    })
   
     
}

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

    })
    .catch(function (err){
        console.log(err)

    }) 
    }
