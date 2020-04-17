$(function () {
  $('.part-content').eq(0).show();
  let startTime = '2020/04/17 10:00:00';  //开始时间
  let endTime = new Date();    //结束时间
  let diffTime = endTime.getTime() - new Date(startTime).getTime();   //时间差的毫秒数
  let timer = setInterval(() => {
    diffTime = diffTime - 1000;
    if (diffTime > 0) {
      getYMDHMS(diffTime);
    } else {
      clearInterval(timer);
    }
  }, 1000);

});

function getYMDHMS (diffTime) {

  //计算出相差天数
  let days = Math.floor(diffTime / (24 * 3600 * 1000));

  //计算出小时数
  let leave1 = diffTime % (24 * 3600 * 1000);   //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));

  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000);       //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数
  let leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);

  console.log(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
  $('#days1').text(parseInt(days % 100 / 10));
  $('#days2').text(parseInt(days % 10));
  $('#hours1').text(parseInt(hours % 100 / 10));
  $('#hours2').text(parseInt(hours % 10));
  $('#minutes1').text(parseInt(minutes % 100 / 10));
  $('#minutes2').text(parseInt(minutes % 10));
  $('#seconds1').text(parseInt(seconds % 100 / 10));
  $('#seconds2').text(parseInt(seconds % 10));
}