var checkData = [
    {
        secondName:'系统1',
        secondItem:['模块列表1','模块列表2','模块列表3','模块列表4']
    },
    {
        secondName:'系统2',
        secondItem:['模块列表3','模块列表4']
    }
];

$.ajax({
    type: "get",
    url: 'http://jike.mguoguo.cc/shop/member/getPermissionList',
    dataType:"json",
    success: function(data){
        console.log(data);
    },
    error:function(error){
        console.log(error);
    }
});

var str = '';
for(var i=0; i<checkData.length; i++){
    var str2 = '';
    for(var j=0; j<checkData[i].secondItem.length; j++){
        str2+=
            '<label class="rightItem"><input type="checkbox" onclick="checkThird(this)" first="0" second='+i+'><span class="itemName">'+checkData[i].secondItem[j]+'</span></span></label>'
    }
   str +=
       '<div class="secondItem">\n' +
       '    <div class="left">\n' +
       '        <label class=""><input type="checkbox" onclick="checkSecond(this)" first="0" second='+i+'><span class="itemName">'+checkData[i].secondName+'</span></label>\n' +
       '    </div>\n' +
       '    <div class="right">'+str2+'\n' +
       '    </div>\n' +
       '</div>'
}
$('.wrapperCheckbox .checkBox .second').append(str);

//全选
function checkAll(event){
    $("input[first=0]").prop("checked", $(event).is(":checked") == true ? "checked" : false);
}

function checkSecond(event){
    var second = $(event).attr("second");
    $("input[second='"+second+"']").prop("checked", $(event).is(":checked") == true ? "checked" : false);

    var firstChoose = true;
    for(var i=0; i<$(event).parents('.second').find(".secondItem").length; i++){
        if(!$($(event).parents('.second').find(".secondItem .left")[i]).find('input').is(":checked")){
            firstChoose = false;
            break
        }
    }
    if(firstChoose){
        $('.wrapperCheckbox .checkBox .first').find("input").prop("checked", true)
    }else {
        $('.wrapperCheckbox .checkBox .first').find("input").prop("checked", false)
    }



}
function checkThird(event){
    var secondChoose = true;
    for(var i=0; i<$(event).parent().parent().find("input").length; i++){
        if(!$($(event).parent().parent().find("input")[i]).is(":checked")){
            secondChoose = false;
            break
        }
    }
    if(secondChoose){
        $(event).parents('.secondItem').children('.left').find("input").prop("checked", true)
    }else {
        $(event).parents('.secondItem').children('.left').find("input").prop("checked", false)
    }

    var firstChoose = true;
    for(var i=0; i<$(event).parents('.second').find(".secondItem").length; i++){
        if(!$($(event).parents('.second').find(".secondItem .left")[i]).find('input').is(":checked")){
            firstChoose = false;
            break
        }
    }
    if(firstChoose){
        $('.wrapperCheckbox .checkBox .first').find("input").prop("checked", true)
    }else {
        $('.wrapperCheckbox .checkBox .first').find("input").prop("checked", false)
    }
    
}

$('.wrapperCheckbox .saveBox .saveBtn').unbind('click').click(function(){
    if($('.wrapperCheckbox .titleBox .titleIpt').val()){
        alert('保存');
    }else {
        alert('请填写用户组名称');
    }
});