$(document).ready(function() {
    // populate table here
    chrome.storage.local.get("blockingReceipts",function(items) {
        var receipts = items.blockingReceipts;
        var dataset = [];
        for(var username in receipts) {
            var receipt = receipts[username];
            dataset.push( [ username, receipt.type + ": " + receipt.connection, new Date(receipt.on).toString() ] );
        }
        $('#receiptsTable').dataTable({
            "data": dataset,
            "columns": [
                { "title": "Blocked User" },
                { "title": "Connection To" },
                { "title": "Date Blocked" }
            ]
        }); 
    });
});