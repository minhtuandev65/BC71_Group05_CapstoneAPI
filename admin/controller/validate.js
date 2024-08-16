
import { getListValue } from "../services/foodServices.js"

const blank = ''
const superWrong = false
const superRight = true




// TEN SP

export let validateName = () => {
  let nameSp = document.getElementById("TenSP").value
 

  
  if (nameSp == blank ) {
    alert("Bạn cần phải điền tên sản phẩm")
    return    superWrong
}


return superRight


 }







function trung() {
  getListValue()
  .then(function (res) {
   let value = res.data
    let ValCheckName = validateSameName(value)      
    console.log("🚀 ~ ValCheckName:", ValCheckName)

    
     })
     
     
   .catch(function (err) {
     // thất bại
     console.log(err);
   });
   return ValCheckName

}


// validate trung 
 export let validateSameName = (num) => { 
 console.log("🚀 ~ validateSameName ~ num:", num)

let nameSp = document.getElementById("TenSP").value

  for (let i = 0; i < num.length; i++  ) {
    var takingName = num[i].name
     if (nameSp === takingName) {
    alert(" Tên đã bị trùng vui lòng thay đổi")
    return superWrong
      }

      }
return superRight

}

























// GIA SP

export let validatePrice = () => {
  let price = document.getElementById("GiaSP").value
 let checkNum = parseInt(price)
  if (price == blank ) {
    alert("Bạn cần phải điền giá sản phẩm")
   return  superWrong


}
else if (!checkNum) {
  alert("chỉ được nhập số ở ô giá cả")
  return superWrong
}

return superRight

}


// ANH SP


export let validateImg = () => {
  let image = document.getElementById("HinhSP").value
  if (image == blank ) {
    alert("Bạn cần phải điền hình ảnh sản phẩm")
   return superWrong
}
return superRight

}




// MO TA SP

export let validateDes = () => {
  let description = document.getElementById("MoTaSP").value
  if (description == blank ) {
    alert("Bạn cần phải điền mô tả sản phẩm")
  return superWrong
  }
   return superRight
}



export let validateType = () => {
  let type = document.getElementById("TypeSP").value
  if (type == blank ) {
    alert("Bạn cần phải điền type sản phẩm")
  return superWrong
  }
   return true
}