$(function(){
    $('.wrapper .btnBox .btnBottom').unbind('click').click(function(){
       $('.alertWrap').show();
       $('html,body').css('overflow','hidden');
    });
    $('.alertWrap .alertBox .btns .cancel').unbind('click').click(function(){
        $('.alertWrap').hide();
        $('html,body').css('overflow','auto');
    });
});