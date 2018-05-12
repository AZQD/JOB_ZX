$(function(){
    $('.specialTicketBox .menuToggle .part').unbind('click').bind('click', function(){
        var index = $(this).index();
        $('.specialTicketBox .menuToggle .part').removeClass('active').eq(index).addClass('active');
    });
});