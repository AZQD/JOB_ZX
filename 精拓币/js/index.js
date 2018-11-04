$(function(){

  var type = 0;//0:固定套餐包, 1:自定义套餐包;
  var countB = 0;
  var countC = 0;
  var totalMoney = 0;

  //partAItem切换状态
  $('.container .partBox .right .partAItem').unbind('click').bind('click', function(){
    $('.container .partBox .right .partBItem').removeClass('activeB');
    $('#countC').val('');
    var index = $(this).index();
    $('.container .partBox .right .partAItem').removeClass('activeA').eq(index).addClass('activeA');
    if(index === 0){
      $('.container .partBoxB').css('display','flex');
      $('.container .partBoxC').hide();
    }else if(index === 1){
      $('.container .partBoxB').hide();
      $('.container .partBoxC').css('display','flex');
    }
    totalMoney = 0;
    $('#totalMoney').html(totalMoney.toFixed(2));
  });

  //partBItem切换状态
  $('.container .partBox .right .partBItem').unbind('click').bind('click', function(){
    var index = $(this).index();
    $('.container .partBox .right .partBItem').removeClass('activeB').eq(index).addClass('activeB');
    countB = Number($(this).find('.num1').html())*Number($(this).find('.num2').html());
    countB = Number(countB.toFixed(2))*10000;
    console.log(countB);
    totalMoney = countB;
    $('#totalMoney').html(totalMoney.toFixed(2));
  });

  $('#countC').unbind('input').bind('input', function () {
    console.log($(this).val());
    if (!isNaN($(this).val()) && $(this).val() > 0) {
      countC = Number($(this).val())*1000;
    } else {
      $(this).val('');
      countC = 0;
    }
    totalMoney = countC;
    $('#totalMoney').html(totalMoney.toFixed(2));
  });
  
  
  
  $('#buyBtn').unbind('click').bind('click', function(){
      console.log(totalMoney);
  });


});