$(function(){
    //下单时间格式化显示
    $('#orderBeginTime,#orderEndTime').datetimepicker({
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        timeFormat: 'hh:mm:ss',//样式可以自定义
        // timeFormat: '',//样式可以自定义
        dateFormat: 'yy-mm-dd'
    });        
});