function onLoading() {
    document.getElementById("spinner").style.display = "block"
}


function offLoading() {
    document.getElementById("spinner").style.display = "none"
}



function getData() {
    var name = document.getElementById("TenSP").value;
    var price = document.getElementById("GiaSP").value;
    var img = document.getElementById("HinhSP").value;
    var description = document.getElementById("MoTaSP").value;

    let information = {
        // cach viet object cua es6 name: name => name, 
        name,             
        price,
        img,
        description, 
    }
    return information

}