$(document).ready(function () {
    $('#ButtonStart').click(function () {
        GetQuotes();
    });
        function GetQuotes() {
        var tickers = $('#symbolBox').val();
        alert(tickers);
        };
});