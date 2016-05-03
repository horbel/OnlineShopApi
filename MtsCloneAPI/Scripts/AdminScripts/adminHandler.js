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
    $('#right-block').html(result);
}
$(document).ready(function () {
    GetAllProducts(function (products) { ShowAllProducts(products) });
})