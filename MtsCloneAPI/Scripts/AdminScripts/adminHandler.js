$(document).ready(function () {
    GetAllProducts(function (products) { ShowAllProducts(products) });

    $('#show-brands').click(function (event) {
        event.preventDefault();
        GetAllBrands(function (brands) { ShowAllBrands(brands) });
    });
    $('#show-products').click(function (event) {
        event.preventDefault();
        GetAllProducts(function (products) { ShowAllProducts(products) });
    });
    $('#show-categories').click(function (event) {
        event.preventDefault();
        GetAllTypes(function (types) { ShowAllTypes(types) });
    });
    //EDIT CLICK BTN EVENT!!!!!!!


});

//GET FUNCTIONS
function GetAllProducts(callback) {
    $.ajax({
        url: '/api/product',
        type: 'GET',
        dataType: 'json',
        success: function (data) {            
            callback(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    });
}

function GetAllBrands(callback) {
    $.ajax({
        url: '/api/brand',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    });
}
function GetAllTypes(callback) {
    $.ajax({
        url: '/api/type',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            callback(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }
    });
}
//SHOW FUNCTIONS
function ShowAllProducts(products) {
    var result = '<h2>Таблица продуктов</h2> <table id="product-table"><thead>'+
        '<tr><th>№</th><th>Категория</th><th>Бренд</th><th>Модель</th><th>Цена</th></tr>'+
        '</thead><tbody>';
    for (var i = 0; i < products.length; i++) {
        result +='<tr><td>'+(i+1)+'</td>'+
            '<td>' + products[i].ProductType.Name + '</td>' +
            '<td>' + products[i].Brand.Name + '</td>'+
            '<td>' + products[i].ModelName + '</td>'+
            '<td>' + products[i].Price + '$</td>'+
            '<td class="button-conteiner"><button id="edit-btn">Edit</button></td>' +
            '<td class="button-conteiner"><button id="delete-btn">Delete</button></td>' +
            '</tr>';
    }
    result += '</tbody></table>';
    $('#table-block').html(result);
}
function ShowAllBrands(brands) {
    var result = '<h2>Таблица брендов</h2> <table id="product-table"><thead>' +
        '<tr><th>№</th><th>Название</th></tr>' +
        '</thead><tbody>';
    for (var i = 0; i < brands.length; i++) {        
        result += '<tr><td>' + (i + 1) + '</td>' +     
            '<td>' + brands[i].Name + '</td>' +           
            '<td class="button-conteiner"><button data-item="'+brands[i].ID+'" onclick="EditItem(this)" id="edit-brand-form-btn">Edit</button></td>' +
            '<td class="button-conteiner"><button id="delete-btn">Delete</button></td>' +
            '</tr>';
    }
    result += '</tbody></table>';
    $('#table-block').html(result);
}

function ShowAllTypes(types) {
    var result = '<h2>Таблица категорий</h2> <table id="product-table"><thead>' +
        '<tr><th>№</th><th>Название</th></tr>' +
        '</thead><tbody>';
    for (var i = 0; i < types.length; i++) {
        result += '<tr><td>' + (i + 1) + '</td>' +
            '<td>' + types[i].Name + '</td>' +
            '<td class="button-conteiner"><button id="edit-btn">Edit</button></td>' +
            '<td class="button-conteiner"><button id="delete-btn">Delete</button></td>' +
            '</tr>';
    }
    result += '</tbody></table>';
    $('#table-block').html(result);
}

function ShowBrand(brand) {
    $('#table-block').css('display', 'none');
    $('#edit-brand-block').css('display', 'block');
    $('#edit-brand-id').val(brand.ID);
    $('#edit-brand-name').val(brand.Name);
    $('#edit-brand-button').click(function (event) {
        event.preventDefault();
        SaveBrandChange(brand);
    })
}
function SaveBrandChange(brand) {
    var newBrand = {
        ID: $('#edit-brand-id').val(),
        Name: $('#edit-brand-name').val()
    }
    $.ajax({
        url: '/api/brand/' + newBrand.ID,
        type: 'PUT',
        data: JSON.stringify(newBrand),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $('#edit-brand-block').css('display', 'none');
            $('#table-block').css('display', 'block');
            GetAllBrands(function (brands) { ShowAllBrands(brands) })
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}
//EDIT FUNCTIONS
function GetBrand(id) {
    $.ajax({
        url: '/api/brand/' + id,
        type: 'GET',
        dataType: 'json',
        success:function(data){
            ShowBrand(data);
        },
        error: function (x, y, z) {
            alert(x + '/n' + y + '/n' + z + '/n');
        }            
    })
}

function EditItem(el) {
    // получаем id редактируемого объекта
    var id = $(el).attr('data-item');
    GetBrand(id);
}