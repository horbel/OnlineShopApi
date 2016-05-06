function GetCart(callback) {
    $.ajax({
        url: 'api/cart',
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


function StarterCart() {
    alert("xyu");
    GetCart(function (cart) {
        
        var result = ''
        for (var i = 0; i < cart.Lines.length; i++) {
            result += '<tr><td>' + cart.Lines.Product.ModelName + '</td>' +
                '<td>' + cart.Lines.Quantity + '</td></tr>';
        }
        $('#cart-table-body').html(result);
    })
}
function alertF() {
    alert('xyu');
}
//$(this).ready(function () { alert('Hello from CART'); });