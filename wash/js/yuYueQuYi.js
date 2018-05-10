$(function(){
    $('.wrapper .bottomBtn').unbind('click').bind('click', function(){
        window.location.href = 'myOrder.html';
    });
    // commonPopFun1('订单金额<span class="price">¥233</span>', '温馨提示', '付款', 'fun');
    commonPopFun2('您有正在洗护的订单<br/>是否合并订单', '温馨提示', '否', '是', 'fun1', 'fun2');
});