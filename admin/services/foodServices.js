var urlApi = 'https://66b2dd6e7fba54a5b7eaa59e.mockapi.io/food'

function getListValue ()  {
 return  axios({
    url: urlApi,
    method: 'GET'

 })
}