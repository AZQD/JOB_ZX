$(function(){
    $('.wrapper .navBottom .item').unbind('click').click(function(){
        var index = $(this).index();
        $('.wrapper .navBottom .item').children('.item_name').removeClass('active').end().eq(index).children('.item_name').addClass('active');
        if(index == 0){
            window.location.href = 'http://jike.mguoguo.cc/mobile/store/index';
        }else if(index == 1){
            window.location.href = 'http://jike.mguoguo.cc/mobile/store/goodlist';
        }else if(index == 2){
            window.location.href = 'http://jike.mguoguo.cc/mobile/member/shopp';
        }else if(index == 3){
            window.location.href = 'http://jike.mguoguo.cc/mobile/member/index';
        }
    });
});