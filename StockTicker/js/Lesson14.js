$( window ).load(function() {
  $('#ButtonStop').prop('disabled', true);
});

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
            $("#stockTable tbody").empty();
            var arrayLength = data.list.resources.length;
            for (var i = 0; i < arrayLength; i++) {
                if (data.list.resources[i].resource.fields.change > 0) {
                    var tickerStyle = 'tickerUp';
                    var arrow = '▲';
                }
                else if (data.list.resources[i].resource.fields.change < 0) {
                    var tickerStyle = 'tickerDown';
                    var arrow = '▼';
                }
                $('#stockTable tbody:last-child').append('<tr><td>' + data.list.resources[i].resource.fields.name +
                '</td><td>' + parseFloat(data.list.resources[i].resource.fields.price).toFixed(2) +
                '</td><td class="' + tickerStyle + '"> ' + arrow +
                " " + parseFloat(data.list.resources[i].resource.fields.change).toFixed(2) +
                '</td><td class="' + tickerStyle + '"> ' +
                parseFloat(data.list.resources[i].resource.fields.chg_percent).toFixed(2) +
                '</td><td>' + parseFloat(data.list.resources[i].resource.fields.volume).toLocaleString() +
                '</td><td>' + data.list.resources[i].resource.fields.utctime +
                '</td></tr>');
            }
            $('.tickerDown').animate({ backgroundColor: 'rgba(255,0,0,0.6)' }, 'fast');
            $('.tickerDown').animate({ backgroundColor: 'white' }, 'fast');
            $('.tickerUp').animate({ backgroundColor: 'rgba(0,255,0,0.6)' }, 'fast');
            $('.tickerUp').animate({ backgroundColor: 'white' }, 'fast');
        };
    }
});