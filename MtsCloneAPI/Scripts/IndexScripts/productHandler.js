
function WriteResponse(products) {
    var strResult='';
    $.each(products, function (index, product) {
        strResult += '<div class="productSammary">' + '<div class="productImageContainer">'
            + '<img src="' + product.ProductImageLocation + '" class="productImage"/>' +
            '</div>' + '<div class="productInfoContainer">'+'<div class="BrandName">' + product.Brand.Name + '</div>' +
             '<div class="ModelName">' + product.ModelName + '</div>' +
             '<div class="productDescription">'+product.Description +'</div>'+ '</div>'+'</div>'
        
    });
    $("#products").html(strResult);
}
function GetAllProducts() {
    $.ajax({
        url: 'api/product',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponse(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    })
}
$(document).ready(GetAllProducts);