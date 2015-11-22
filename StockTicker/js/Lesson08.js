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
 
        };
    }
});