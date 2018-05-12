$(function(){
    $('.wrapper .toggleBox .part').unbind('click').click(function(){
       var index = $(this).index();
        $('.wrapper .toggleBox .part').removeClass('active').eq(index).addClass('active');
    });
});