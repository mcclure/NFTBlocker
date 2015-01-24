$(".ProfileNav .UserActions").append('<button class=" btn" type="button"><span id="blockAllUsers" class="button-text">Block All</span></button>');
var usersBlocked = 0,
    usersFound = 0,
    totalCount = 0,
    errors = 0;
$("#blockAllUsers").click(function() {
    showDialog();
    var scrollerInterval = setInterval(function() {
        window.scroll(0, $(document).height());
        if ($(".GridTimeline-end.has-more-items").length==0) {
            clearInterval(scrollerInterval);
            doBlocking();
            totalCount = $(".ProfileCard").length;
            $("#blockchain-dialog .totalCount").text(totalCount);
        }
    },500);
    var finderInterval = setInterval(function() {
        doBlocking();
        if (usersFound==totalCount && totalCount > 0)
            clearInterval(finderInterval);
    },1000);
    var blockerInterval = setInterval(function() {
        var user = userQueue.dequeue();
        if (typeof user !== "undefined") {
            $.ajax({
                url: "https://twitter.com/i/user/block",
                method: "POST",
                dataType: 'json',
                data: {
                    authenticity_token: $("#signout-form input.authenticity_token").val(),
                    block_user: true,
                    impression_id: "",
                    report_type: "",
                    screen_name: user.name,
                    user_id: user.id
                }
            }).done(function(response) {
                console.log(response);
            }).fail(function(xhr, text, err) {
                errors++;
                $("#blockchain-dialog .errorCount").text(errors);
                console.log(xhr);
            }).always(function() {
                usersBlocked++;
                $("#blockchain-dialog .usersBlocked").text(usersBlocked);
                if (usersBlocked == totalCount)
                    clearInterval(blockerInterval);
            });
        }
    },40);
});

var userQueue = new Queue();

function doBlocking() {
    $(".ProfileCard:not(.blockchain-added)").each(function(i,e) {
        $(e).addClass("blockchain-added");
        usersFound++;
        $("#blockchain-dialog .usersFound").text(usersFound);
        userQueue.enqueue({
            name: $(e).data('screen-name'),
            id: $(e).data('user-id')
        });
    });
    console.log($(".ProfileCard").length);
}

function showDialog() {
    $("body").append(
'<div id="blockchain-dialog" class="modal-container block-or-report-dialog block-selected report-user">'+
	'<div class="close-modal-background-target"></div>'+
	'<div class="modal modal-medium draggable" id="block-or-report-dialog-dialog" role="dialog" aria-labelledby="block-or-report-dialog-header" style="top: 240px; left: 470px;"><div class="js-first-tabstop" tabindex="0"></div>'+
	'<div class="modal-content" role="document">'+
		'<div class="modal-header">'+
			'<h3 class="modal-title report-title" id="blockchain-dialog-header">Block All Report</h3>'+
		'</div>'+
		'<div class="report-form">'+
            '<p>Found: <span class="usersFound"></span></p>'+
            '<p>Blocked: <span class="usersBlocked"></span></p>'+
            '<p>Total: <span class="totalCount"></span></p>'+
            '<p>Errors: <span class="errorCount"></span></p>'+
		'</div>'+
		'<div id="report-control" class="modal-body submit-section">'+
			'<div class="clearfix">'+
				'<button id="done" class="btn primary-btn report-tweet-next-button" type="button">Done</button>'+
			'</div>'+
		'</div>'+
	'</div>'+
	'<button type="button" class="modal-btn modal-close js-close" aria-controls="block-or-report-dialog-dialog">'+
		'<span class="Icon Icon--close Icon--medium">'+
			'<span class="visuallyhidden">Close</span>'+
		'</span>'+
	'</button>'+
	'<div class="js-last-tabstop" tabindex="0"></div>'+
'</div>'
    );
    $("#blockchain-dialog").show().find("button").click(function() {
        $("#blockchain-dialog").hide();
    });
}