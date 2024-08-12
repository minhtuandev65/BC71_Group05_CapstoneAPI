function fetchValue () {
    getListValue()
    .then(function (res) {
        renderProduct(res.data)
    })
    .catch( function (err) {
        console.log("loi")
    })
}


fetchValue()

function renderProduct(food)  { 
    let contentHtml = ''
    for (i = 0; i < food.length; i++  ) {
        let string = ` <tr>
        <td>${food[i].id}</td>
        <td>${food[i].price}</td>
        <td>${food[i].name}</td>
        <td><img width=100 src="${food[i].img}"/> </td>
        <td>${food[i].description}</td>
        </tr>`
        contentHtml += string
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHtml;

}

renderProduct()