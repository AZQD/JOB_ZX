$(function(){
    //分享给好友
    $('.wrapper .ewmWrap .shareBtn').unbind('click').click(function(ev){
        ev.stopPropagation();
       $('.opacityBg').fadeIn();
       $('.wrapper .shareTo').slideDown();
    });
    //取消分享
    $('.wrapper .shareTo .cancelShareBtn').unbind('click').click(function(ev){
        ev.stopPropagation();
        $('.opacityBg').fadeOut();
        $('.wrapper .shareTo').slideUp();
    });
});