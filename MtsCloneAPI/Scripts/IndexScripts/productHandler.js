
function WriteResponse(products) {
    var strResult='';
    $.each(products, function (index, product) {
        strResult += '<div class="product">' + 
            '<a href="#" class="product-title">' + product.Brand.Name + ' ' + product.ModelName + '</a>'+
            '<a href="#" > <img class="productImage" width="200" height="200" src="' + product.ProductImageLocation + '"/> </a>' +
            '<div class="product-price">'+'ЦЕНА: '+product.Price+'$</div>'+
            '<a href="#" class="to-cart">В корзину</a>'+
            '</div>'        
    });
    $("#right-block").prepend(strResult);
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