$(function(){

    // 音频播放暂停操作
    const audio = document.getElementById('music')
    const start = document.querySelector('.start')
    const end = document.querySelector('.end')
    const progressBar = document.querySelector('.progress-bar')
    const now = document.querySelector('.now')

    function conversion (value) {
        let minute = Math.floor(value / 60)
        minute = minute.toString().length === 1 ? ('0' + minute) : minute
        let second = Math.round(value % 60)
        second = second.toString().length === 1 ? ('0' + second) : second
        return `${minute}:${second}`
    }

    audio.onloadedmetadata = function () {
        end.innerHTML = conversion(audio.duration)
        start.innerHTML = conversion(audio.currentTime)
    }

    progressBar.addEventListener('click', function (event) {
        let coordStart = this.getBoundingClientRect().left
        let coordEnd = event.pageX
        let p = (coordEnd - coordStart) / this.offsetWidth
        now.style.width = p.toFixed(3) * 100 + '%'

        audio.currentTime = p * audio.duration
        audio.play()
        $('.container .listBox .listItem .ctrlInfo .icon_ctrl').attr('src', './image/list/icon_play.png');
    })

    setInterval(() => {
        start.innerHTML = conversion(audio.currentTime)
        now.style.width = audio.currentTime / audio.duration.toFixed(3) * 100 + '%'
    }, 1000)

    // 接口请求
    $.ajax({
        type: 'post',
        url: 'https://yb.720krpano.cn/api/spot/info',
        data: {id: getParamByUrl('id')},
        success: function (data) {
            if(data.code === 1) {
                console.log('详情数据：', data.data);
                $('.container .listBox .listItem .desc .left .icon').attr('src', data.data.small_music_img);
                document.title = data.data.title;
                $('.container .listBox .listItem .desc .right .desc1').html(data.data.title);
                $('#music').attr('src', data.data.music_file);
                $('.container .listBox .textInfo .title').html(data.data.content_title);
                $('.container .listBox .textInfo .author').html(data.data.content_author);
                $('.container .listBox .textInfo .desc').html(data.data.content);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    let $music = $('#music');
    let musicDom = $music[0]; /*jquery对象转换成js对象*/
    $('.container .listBox .listItem .ctrlInfo').unbind('click').bind('click', function(){
        if (musicDom.paused){ /*如果已经暂停*/
            $('.container .listBox .listItem .ctrlInfo .icon_ctrl').attr('src', './image/list/icon_play.png');
            musicDom.play(); /*播放*/
        }else {
            $('.container .listBox .listItem .ctrlInfo .icon_ctrl').attr('src', './image/list/icon_pause.png');
            musicDom.pause();/*暂停*/
        }
        musicDom.addEventListener('ended', function () {
            console.log('播音结束');
            $('.container .listBox .listItem .ctrlInfo .icon_ctrl').attr('src', './image/list/icon_pause.png');
        }, false);
    });
});

