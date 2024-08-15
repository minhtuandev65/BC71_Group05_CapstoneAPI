export function onLoading() {

    // hien thi black screen
    document.getElementById("spinner").style.display = "block"
}


export function offLoading() {
    // tat hien thi black screen
    document.getElementById("spinner").style.display = "none"
}



export function getData() {
    //lay thong tin tu modal
    let name = document.getElementById("TenSP").value;
    let price = document.getElementById("GiaSP").value;
    let img = document.getElementById("HinhSP").value;
    let description = document.getElementById("MoTaSP").value;
    let type = document.getElementById("TypeSP").value

    // tao object
    let information = {
        // cach viet object cua es6 name: name => name, 
        name,             
        price,
        img,
        description, 
        type,
    }
    return information

}