var urlApi = 'https://66a7890f53c13f22a3d01a64.mockapi.io/food'

function getListValue ()  {
 return  axios({
    url: urlApi,
    // method get dung de lay tat ca data tu mockapi xuong cu the o day la food' data
    method: 'GET'

 })
}

function createService(food) {
    return axios ({
      url:  urlApi,
      // method get dung de dua data len mockapi
      method: 'POST',
      data: food,
    })
}



function deleteService(id) {
    return axios ({
        // truyen urlApi tu mockApi va id tu food-store de tim ra vi tri can xoa 
        url: `${urlApi}/${id}`,
        // method dung de xoa data tren mockapi
        method: 'DELETE', 
    })
}




// sua san pham theo id
function getDetailService(id) {
    return axios ({
        url: `${urlApi}/${id}`,
        method: 'GET'
    })
}


// cap nhat san pham theo id 

function updateDetailService(food, id) {
    return axios ({
        url: `${urlApi}/${id}`,
    // cap nhat mockapi bang cach su sung method PUT
        method: 'PUT',
        data: food
    })
}
