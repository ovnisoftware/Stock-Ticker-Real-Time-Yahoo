//Used to control timer interval
var timerId = 0;

var quote;

$.ajaxSetup({
    'cache': true
});

$(document).ready(function () {
    $('#ButtonStart').click(function () {
        GetQuotes();
        timerId = window.setInterval(function () {
            GetQuotes();
        }, 5000);
    });
    function GetQuotes() {
        var tickers = $('#symbolBox').val();
        $.ajax({
            url: "http://finance.yahoo.com/webservice/v1/symbols/" + tickers + "/quote?format=json&view=detail",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "quote"
        });

        quote = function (data) {
            console.log(data);
            var arrayLength = data.list.resources.length;
             for (var i = 0; i < arrayLength; i++) {
                $('#stockTable tbody:last-child').append('<tr><td>' + data.list.resources[i].resource.fields.name +
                '</td><td>' + parseFloat(data.list.resources[i].resource.fields.price).toFixed(2) +
                '</td><td>' +
                parseFloat(data.list.resources[i].resource.fields.change).toFixed(2) +
                '</td><td>' +
                parseFloat(data.list.resources[i].resource.fields.chg_percent).toFixed(2) +
                '</td><td>' + parseFloat(data.list.resources[i].resource.fields.volume).toLocaleString() +
                '</td><td>' + data.list.resources[i].resource.fields.utctime +
                '</td></tr>');
            }
        };
    }
});