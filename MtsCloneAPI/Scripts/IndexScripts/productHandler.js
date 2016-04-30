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
        $("#products-area").append(strResult);
    }else if(method=='prepend'){
        $("#products-area").prepend(strResult);
    } else if(method=="after") {
        $("#search-title").after(strResult);//костыль для поиска
    } else {
        $("#products-area").html(strResult);
    }
}
//GET ALL PRODUCTS
function GetAllProducts(callback) {    
    $.ajax({
        url: 'api/product',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            data.productsPerPage = 6;
            data.totalPages = Math.ceil(data.length / data.productsPerPage);
            data.currentPage = 1;
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
            $("#products-area").html("<div class='search-title'>Результаты поиска: </div><div class='clear'></div>'");
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

            // list click handler            
            $('.cat-title').click(function () {
                $(this).next().slideToggle('fast');
                $(this).parent().siblings().find('.brands').slideUp('fast');

            });

            //BRAND-LINK HANDLER. For sorting by brands
            $('.brand-link').click(function () {
                var brandName = $(this).text();
                $('.brand-link').parent().removeClass('selectedBrand');
                $(this).parent().addClass('selectedBrand');
                
                brandName = brandName.substring(2);
                $("#products-area").html('');
                for (var i = 0; i < products.length; i++) {
                    if (products[i].Brand.Name == brandName) {
                        WriteResponse(products[i], 'append');
                    }
                }
            });
            
        })
    });   
    
}
//Show ALL Products
function showAllProducts(page) {
    GetAllProducts(function (products) {
        if (page) {
            products.currentPage = page;
        } else {
            products.currentPage = 1;
        }
        $('#navigation').html(function () {
            var result = '';
            for (var i = 0; i < products.totalPages; i++) {
                result += '<span>' + (i + 1) + '</span>'
            }
            return result;
        })

        $('#products-area').html('');

        for (var i = (products.currentPage - 1) * products.productsPerPage;
            i < products.currentPage * products.productsPerPage && i<products.length; i++) {
            WriteResponse(products[i], 'prepend');
        }


        //events
        //page click handler
        $('#navigation span').click(function () {
            var page = parseInt($(this).text());
            showAllProducts(page);
        })

        $("#search-button").click(search);
        $('#main-link').click(function () { showAllProducts(1); });
    });
}
//STARTER

function Starter() {
    showAllProducts(1);
    showCategories();
}

$(document).ready(Starter);

