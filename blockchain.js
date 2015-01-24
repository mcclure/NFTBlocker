$(".ProfileNav .UserActions .user-actions").append('<button class="user-actions-follow-button btn" type="button"><span id="blockAllUsers" class="button-text blocked-text">Block All</span></button>');
var usersBlocked = 0,
    usersFound = 0,
    usersSkipped = 0,
    totalCount = 0,
    errors = 0;
var scrollerInterval = false,
    finderInterval = false,
    blockerInterval = false;
var userQueue = new Queue();

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (request.blockChainStart)
        startBlockChain();
    sendResponse({ack: true});
});
$("#blockAllUsers").click(startBlockChain);
function startBlockChain() {
    var result = confirm("Are you sure you want to block all users on this page that you aren't following?");
    if (!result)
        return;
    showDialog();
    var scrollerInterval = setInterval(function() {
        window.scroll(0, $(document).height());
        if ($(".GridTimeline-end.has-more-items").length==0) {
            clearInterval(scrollerInterval);
            scrollerInterval = false;
            doBlocking();
            totalCount = $(".ProfileCard").length;
            $("#blockchain-dialog .totalCount").text(totalCount);
        }
    },500);
    var finderInterval = setInterval(function() {
        doBlocking();
        if (usersFound==totalCount && totalCount > 0) {
            clearInterval(finderInterval);
            finderInterval = false;
        }
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
                //console.log(response);
            }).fail(function(xhr, text, err) {
                errors++;
                $("#blockchain-dialog .errorCount").text(errors);
                //console.log(xhr);
            }).always(function() {
                usersBlocked++;
                $("#blockchain-dialog .usersBlocked").text(usersBlocked);
                if ((usersBlocked == totalCount || usersBlocked == usersFound) && totalCount > 0) {
                    clearInterval(blockerInterval);
                    blockerInterval = false;
                }
            });
        }
    },40);
}

function doBlocking() {
    $(".ProfileCard:not(.blockchain-added)").each(function(i,e) {
        $(e).addClass("blockchain-added");
        if ($(e).find('.user-actions.following, .user-actions.blocked').length > 0) {
            usersSkipped++;
            $("#blockchain-dialog .usersSkipped").text(usersSkipped);
            return true;
        }
        usersFound++;
        $("#blockchain-dialog .usersFound").text(usersFound);
        userQueue.enqueue({
            name: $(e).data('screen-name'),
            id: $(e).data('user-id')
        });
    });
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
            '<p>Skipped: <span class="usersSkipped"></span></p>'+
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
        if (blockerInterval)
            clearInterval(blockerInterval);
            clearInterval(scrollerInterval);
            clearInterval(finderInterval);
        $("#blockchain-dialog").hide();
    });
}