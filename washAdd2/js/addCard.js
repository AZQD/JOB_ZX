$(function(){
    $('.wrapper .cardBox .add_card').unbind('click').click(function(){
       $('.alertWrap').show();
       $('html,body').css('overflow','hidden');
    });
    $('.alertWrap .alertBox .btns .cancel').unbind('click').click(function(){
        $('.alertWrap').hide();
        $('html,body').css('overflow','auto');
    });
    $('.alertWrap .alertBox .btns .confirm').unbind('click').click(function(){

        var cardIpt = $.trim($('#cardIpt').val());
        console.log(cardIpt);
        $('.wrapper .cardBox .cardList').append(
            '<div class="card_item">\n' +
            '    <div class="item_id">卡号：66666666666</div>\n' +
            '    <div class="item_price">金额：100元</div>\n' +
            '    <div class="item_date">时间：2018年9月14日00:24</div>\n' +
            '    <div class="item_state">状态：已绑定</div>\n' +
            '</div>'
        );

        $('.alertWrap').hide();
        $('html,body').css('overflow','auto');
    });
});