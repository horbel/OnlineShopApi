//WRITE RESPONSE
function WriteResponse(product, method) {
    var strResult = '';
    
        strResult += '<div class="product">' +
                '<a href="#" class="product-title">' + product.Brand.Name + ' ' + product.ModelName + '</a>' +
                '<a href="#" > <img class="productImage" width="200" height="200" src="' + product.ProductImageLocation + '"/> </a>' +
                '<div class="product-price">' + 'ЦЕНА: ' + product.Price + '$</div>' +
                '<a href="#" class="to-cart">В корзину</a>' +
                '</div>';
    
        
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
function GetAllBrands(callback) {
    $.ajax({
        url: 'api/brand',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    })
}

function GetAllTypes(callback) {
    $.ajax({
        url: 'api/type',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    })
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

//Generation of category list
function showCategories() {       
    GetAllProducts(function (data) {
        products = data;
        GetAllTypes(function (types) {

            var strResult = '<ul class="cat-list">';
            for (var i = 0; i < types.length; i++) {
                strResult += '<li>' + '<div class="cat-title">' + types[i].Name + '</div>' +
                    '<ul class="brands">';
                for (var j = 0; j < products.length; j++) {
                    if (products[j].ProductType.Name == types[i].Name)
                        strResult += '<li><span class="brand-link">&raquo;&raquo;' + products[j].Brand.Name + '</span></li>';
                }
                strResult += '</ul>';
                strResult += '</li>';

            }
            strResult += '</ul>';

            $('#categories').html(strResult);
            $('.brands').hide();

            // click handler            
            $('.cat-title').click(function () {
                $(this).next().slideToggle('fast');                
            });
        })
    });   
    
}
//BRAND-LINK HANDLER. For sorting by brands
function showByBrand(){
    function GetAllProducts(products) {
        $('.brand-link').click(function () {
            alert('ntfgd');//realise me!
        })
    }
}
//STARTER

function Starter() {
    GetAllProducts(function (products) {
        for (var i = 0; i < products.length; i++) {
            WriteResponse(products[i], 'prepend');
        }        
    });
    $("#search-button").click(search);    
    showCategories();
    showByBrand();
}

$(document).ready(Starter);

