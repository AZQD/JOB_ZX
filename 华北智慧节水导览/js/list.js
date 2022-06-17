$(function(){
    let listData = [];
    $('.container .listBox').delegate('.listItem .ctrlInfo', 'click', function(ev){
        ev.stopPropagation();
        let $listItem = $(this).parents('.listItem');
        let index = $listItem.index();
        let $music = $listItem.children('.music');
        let musicDom = $music[0]; /*jquery对象转换成js对象*/
        for(var i = 0; i<$('.container .listBox .listItem').length; i++){
            if(i !== index) { // 过滤掉当前点击元素
                $('.container .listBox .listItem').eq(i).find('.icon_ctrl').attr('src', './image/list/icon_pause.png');
                $('.container .listBox .listItem').eq(i).find('.music')[0].pause();
            }

        }

        if (musicDom.paused){ /*如果已经暂停*/
            $listItem.find('.icon_ctrl').attr('src', './image/list/icon_play.png');
            musicDom.play(); /*播放*/
        }else {
            $listItem.find('.icon_ctrl').attr('src', './image/list/icon_pause.png');
            musicDom.pause();/*暂停*/
        }
        musicDom.addEventListener('ended', function () {
            console.log('播音结束');
            $listItem.find('.icon_ctrl').attr('src', './image/list/icon_pause.png');
        }, false);
    });

    $('.container .listBox').delegate('.listItem', 'click', function(){
        let index = $(this).index();
        window.location.href = 'detail.html?id=' + listData[index].id;
    });

    $.ajax({
        type: 'get',
        url: 'https://yb.720krpano.cn/api/spot/spotlist',
        success: function (data) {
            if(data.code === 1) {
                console.log('列表数据：', data.data);
                listData = data.data;
                for (let i = 0; i < data.data.length; i++) {
                    let item = data.data[i];
                    $('.container .listBox').append(
                        '<div class="listItem">\n' +

                        // '            <div class="logoInfo">\n' +
                        // '                <img class="logo1" src="./image/list/logo1.png" />\n' +
                        // '                <img class="logo2" src="./image/list/logo2.png" />\n' +
                        // '            </div>\n' +
                        '            <audio height="0" width="0" class="music" src='+item.music_file+'></audio>\n' +
                        '            <img class="img" src='+item.card_img+' />\n' +
                        '            <div class="desc">\n' +
                        '                <div class="left">\n' +
                        '                    <img class="icon" src="./image/list/icon_pet.png" />\n' +
                        '                </div>\n' +
                        '                <div class="right">\n' +
                        '                    <div class="desc1">'+item.title+'</div>\n' +
                        '                    <div class="desc2">'+item.desc+'</div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div class="ctrlInfo">\n' +
                        '                <img class="icon_ctrl" src="./image/list/icon_pause.png" />\n' +
                        '            </div>\n' +
                        '        </div>'
                    );
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});
