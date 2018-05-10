$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',//水平滑动
        loop: true, //循环播放
        autoplay: 2000, //自动播放
        autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        pagination: '.swiper-pagination'  // 分页器
    });

    //我的订单
    $('.wrapper .navBox .myOrder').unbind('click').click(function(){
        window.location.href = 'myOrder.html';
    });
    //派送招募
    $('.wrapper .navBox .zhaoMu').unbind('click').click(function(){
        window.location.href = 'zhaoMu.html';
    });
    //推荐有奖
    $('.wrapper .navBox .recommend').unbind('click').click(function(){
        window.location.href = 'recommend.html';
    });
    //衣仓
    $('.wrapper .navBox .clothStore').unbind('click').click(function(){
        window.location.href = 'clothStore.html';
    });

    //立即预约
    $('.wrapper .startBox .item_icon').unbind('click').click(function(){
        window.location.href = 'yuYue.html';
    });

    //底部菜单切换
    $('.wrapper .navBottom .item').unbind('click').click(function(){
        var index = $(this).index();
        if(index == 0){
            window.location.href = 'personal.html';
        }else if(index == 1){
            window.location.href = 'priceList.html';
        }else if(index == 2){
            window.location.href = 'mySelf.html';
        }
    });
});