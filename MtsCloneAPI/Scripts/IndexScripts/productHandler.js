//WRITE RESPONSE
function WriteResponse(products, method) {
    var strResult = '';
    if(Array.isArray(products))
        for (var i = 0; i < products.length; i++) {
            strResult += '<div class="product">' +
                '<a href="#" class="product-title">' + products[i].Brand.Name + ' ' + products[i].ModelName + '</a>' +
                '<a href="#" > <img class="productImage" width="200" height="200" src="' + products[i].ProductImageLocation + '"/> </a>' +
                '<div class="product-price">' + 'ЦЕНА: ' + products[i].Price + '$</div>' +
                '<a href="#" class="to-cart">В корзину</a>' +
                '</div>';
        }
    else {
        strResult += '<div class="product">' +
                '<a href="#" class="product-title">' + products.Brand.Name + ' ' + products.ModelName + '</a>' +
                '<a href="#" > <img class="productImage" width="200" height="200" src="' + products.ProductImageLocation + '"/> </a>' +
                '<div class="product-price">' + 'ЦЕНА: ' + products.Price + '$</div>' +
                '<a href="#" class="to-cart">В корзину</a>' +
                '</div>';
    }
        
    if (method == 'append'){    
        $("#right-block").append(strResult);        
    }else if(method=='prepend'){
        $("#right-block").prepend(strResult);
    } else if(method=="after") {
        $("#search-title").after(strResult);//костыль для поиска
    } else {
        $("#right-block").html(strResult);
    }
}
//GET ALL PRODUCTS
function GetAllProducts(callback) {    
    $.ajax({
        url: 'api/product',
        type: 'GET',
        dataType: 'json',
        success: function(data) {            
            callback(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    });
    
}
//SEARCH
function search() {
    var ID = null;    
    var name = $('#search-text').val();
    GetAllProducts(function (products){
        if (name != "" && name != null) {
            $("#right-block").html("<div class='search-title'>Результаты поиска: </div><div class='clear'></div>'");
            for (var i = 0; i < products.length; i++) {
                if (products[i].ModelName.search(name) != -1) {                   
                    ID = products[i].ID;
                    $.ajax({
                        url: 'api/product/' + ID,
                        type: 'Get',
                        dataType: 'json',
                        success: function (data) {
                            WriteResponse(data, 'append');
                        },
                        error: function (x, y, z) {
                        alert(x + '/n' + y + '/n' + z + '/n');
                    }
                    });
                }
            }
        }
    });    
    
}



//STARTER

function Starter() {
    GetAllProducts(function (products) { WriteResponse(products, 'prepend'); });    
    $("#search-button").click(search);
}
$(document).ready(Starter);

