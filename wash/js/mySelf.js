$(function(){
    
    //我的账户
    $('.wrapper .menu .myAccount').unbind('click').click(function(){
       window.location.href = 'myAccount.html';
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