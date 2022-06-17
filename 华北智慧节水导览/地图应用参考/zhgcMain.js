setTimeout(function(){


var current = $(".current");
var myaudio = $("audio")[0];
var total_m, total_s;
myaudio.oncanplay = function() {
	total_m = Math.floor(myaudio.duration / 60);
	total_s = Math.floor(myaudio.duration % 60);
	total_m = total_m < 10 ? "0" + total_m : total_m;
	total_s = total_s < 10 ? "0" + total_s : total_s;
	current.text(total_m + ":" + total_s)
};
myaudio.ontimeupdate = function() {
	y_m = Math.floor((myaudio.duration - myaudio.currentTime) / 60);
	y_s = Math.floor((myaudio.duration - myaudio.currentTime) % 60);
	y_m = y_m < 10 ? "0" + y_m : y_m;
	y_s = y_s < 10 ? "0" + y_s : y_s;
	current.text(y_m + ":" + y_s)
};
	$.ajax({
		url: "https://www.uobay.com/Wechat/Zhgc/zhgcmain_ajax",
		type: "post",
		data: {},
		success: function(info) {
			myaudio.onended = function() {
				current.text(total_m + ":" + total_s);
				myaudio.currentTime = 0;
				$("#player img").attr("src", "/Public/Wechat/zhgc/images/bwg_17.png");
				updata()
			};
			$(document).on("click", "#myMobal .close", function() {
				$("#myMobal").hide()
			});
			$(".mob_list li").on("click", function() {
				$("#myMobal").hide();
				classify($(this).data("pos"));
				marAnminate()
			});
			$(".view_switch").on("click", function() {
				$("#myMobal").show()
			});
			var data = JSON.parse(info);
			console.log(data);
			var audio = document.getElementById("audioID");
			var player = document.getElementById("player");
			var allmsg = data;
			var northeast_x = allmsg.imagepos.northeast[0],
				northeast_y = allmsg.imagepos.northeast[1],
				southwest_x = allmsg.imagepos.southwest[0],
				southwest_y = allmsg.imagepos.southwest[1],
				center = [(northeast_x + southwest_x) / 2, (northeast_y + southwest_y) / 2];
			var imageLayer = new AMap.ImageLayer({
				url: allmsg.senic_map,
				bounds: new AMap.Bounds(allmsg.imagepos.southwest, allmsg.imagepos.northeast),
				zooms: [15, 18]
			});
			var map = new AMap.Map("container", {
				resizeEnable: true,
				center: center,
				zoom: 15,
				zooms: [15, 18],
				layers: [imageLayer]
			});
			var southwest = map.lnglatTocontainer(allmsg.imagepos.southwest);
			var w = $("#img").width() / $("#img").height() * $("body").height();
			var h = $("body").height();
			var px = southwest.x + w;
			var py = southwest.y - h;
			var pixel = map.containTolnglat(new AMap.Pixel(px, py));
			data.imagepos = {
				southwest: [data.imagepos.southwest[0], data.imagepos.southwest[1]],
				northeast: [pixel.lng, pixel.lat]
			};
			imageLayer.setBounds(new AMap.Bounds(data.imagepos.southwest, data.imagepos.northeast));
			var arr_xy = data.imagepos.southwest;
			var arrx = [];
			arrx[0] = arr_xy[0] - 0.002;
			arrx[1] = arr_xy[1] - 0.002;
			var arr_yx = data.imagepos.northeast;
			var arry = [];
			arry[0] = arr_yx[0] + 0.002;
			arry[1] = arr_yx[1] + 0.002;
			map.setLimitBounds(new AMap.Bounds(arrx, arry));
			allmsg = data;
			var northeast_x = data.imagepos.northeast[0],
				northeast_y = data.imagepos.northeast[1],
				southwest_x = data.imagepos.southwest[0],
				southwest_y = data.imagepos.southwest[1],
				center = [(northeast_x + southwest_x) / 2, (northeast_y + southwest_y) / 2];
			map.panTo(center);
			var features = [];
			map.setFeatures(features);
			var infoWindow = new AMap.InfoWindow({
				autoMove: true,
				offset: new AMap.Pixel(10, -15)
			});
			var now_w, now_h, southwest, northeast;
			southwest = map.lnglatTocontainer(allmsg.imagepos.southwest);
			northeast = map.lnglatTocontainer(allmsg.imagepos.northeast);
			now_w = Math.abs(southwest.x - northeast.x);
			now_h = Math.abs(southwest.y - northeast.y);
			var mars = [],
				listmars = [];
			var sound_pre;
			var outside_mar;
			$.each(allmsg.markers, function(index, el) {
				var now_x, now_y, deg;
				now_x = now_w / $("#img").width() * el.markpos[0] * 1;
				now_x = now_x + southwest.x;
				now_y = now_h / $("#img").height() * el.markpos[1] * 1;
				now_y = now_y + northeast.y;
				deg = map.containTolnglat(new AMap.Pixel(now_x, now_y));
				var ctent = el.content;
				el.icon = "/Public/Wechat/zhgc/images/3.png";
				el.extData.varyIcon = "/Public/Wechat/zhgc/images/444.gif";
				el.extData.cmsg = "景点";
				if (ctent.indexOf("停车场") != -1) {
					el.icon = "/Public/Wechat/zhgc/images/5.png";
					el.extData.varyIcon = "/Public/Wechat/zhgc/images/6.png";
					el.extData.cmsg = "停车场"
				}
				if (ctent.indexOf("卫生间") != -1) {
					el.icon = "/Public/Wechat/zhgc/images/1.png";
					el.extData.varyIcon = "/Public/Wechat/zhgc/images/2.png";
					el.extData.cmsg = "卫生间"
				}
				var mar = new AMap.Marker({
					map: map,
					visible: false,
					icon: new AMap.Icon({
						size: new AMap.Size(49, 30),
						image: el.icon,
						imageSize: new AMap.Size(49, 30)
					}),
					position: [deg.lng, deg.lat],
					offset: new AMap.Pixel(-14, -35),
					zooms: [16, 18],
					extData: el.extData,
				});
				mars.push(mar);
				if (el.extData.ishasList == true) {
					var my_txt = "";
					for (var z = 0; z < el.extData.mylists.list.length; z++) {
						my_txt = my_txt + '<li class="hh" data-sound="' + el.extData.mylists.list[z].sound + '" data-url="' + el.extData.mylists.list[z].url + '">' + el.extData.mylists.list[z].msg + "</li>"
					}
					var my_cont = '<div class="mylists"><ul>' + my_txt + '</ul><i class="x_i"></i></div>';
					var mcd = new AMap.Marker({
						map: map,
						visible: false,
						content: my_cont,
						position: [deg.lng, deg.lat],
						offset: new AMap.Pixel(-38, -163),
						zooms: [17, 18],
						clickable: true,
						zIndex: 101,
						extData: el.extData
					});
					listmars.push(mcd)
				}
				mar.on("click", function(e) {
					if (mar.getExtData().cmsg == "景点") {
						infoWindow.setContent('<div class="tck mybg"><a class="box" href="' + mar.getExtData().url + '"><img src="' + mar.getExtData().image + '"><div class="mcon right"><p>' + mar.getExtData().extmsg + '</p><div class="cc">' + mar.getExtData().content + "</div></div></a></div>");
						infoWindow.open(map, mar.getPosition());
		               	var icon_click_obj = mar.getIcon();
		               	var icon_click;
		               	for( key in icon_click_obj){
		               	     icon_click = icon_click_obj[key].image;
		               	     if(icon_click!=undefined){
		               	         break;
		               	     }
		               	}
						$(".intro").text(mar.getExtData().extmsg);
						$(".intro").attr("data-zh", mar.getExtData().extmsgZ);
						$(".intro").attr("data-en", mar.getExtData().extmsgE);
						updata();
						if (icon_click.indexOf("1") != -1 || icon_click.indexOf("3") != -1 || icon_click.indexOf("5") != -1) {
							outside_mar = mar;
							mar.setIcon(new AMap.Icon({
								size: new AMap.Size(49, 30),
								image: mar.getExtData().varyIcon,
								imageSize: new AMap.Size(49, 30)
							}));
						}
						var sound = mar.getExtData().sound;
						if ($("#audioID").attr("src") != sound) {
							if (sound == "") {
								$("#ze_mobal .top").text("暂无语音!");
								$("#ze_mobal").fadeIn(600).fadeOut(600);
								return false
							}
							$("audio").attr("src", sound);
							audio.play();
							$("#player").find("img").attr("src", "/Public/Wechat/zhgc/images/bwg_18.png")
						} else {
							$("#player").click()
						}
					}
				})
			});
			if (sessionStorage.getItem("key") == null) {
				$(".bootanimation").css("opacity", 1);
				$(".k1").fadeIn(2000, function() {
					$(".bootanimation").delay(1500).fadeOut(1000, function() {
						$(".show").show();
						$(".choose").show();
						$(".about_view").show();
						$(".bar").show();
						$(".explain").show();
						classify("全部");
						marAnminate()
					})
				});
				sessionStorage.setItem("key", 1)
			} else {
				$(".bootanimation").css("display", "none");
				$(".show").show();
				$(".choose").show();
				$(".about_view").show();
				$(".bar").show();
				$(".explain").show();
				classify("全部");
				marAnminate()
			}
			map.on("zoomend", function() {
				console.log(map.getZoom());
				if (map.getZoom() >= 17) {
					for (var i = 0; i < listmars.length; i++) {
						listmars[i].show()
					}
				} else {
					for (var i = 0; i < listmars.length; i++) {
						listmars[i].hide()
					}
				}
			});

			function updata() {
				for (var i = 0; i < mars.length; i++) {
					mars[i].setIcon(new AMap.Icon({
						size: new AMap.Size(49, 30),
						image: allmsg.markers[i].icon,
						imageSize: new AMap.Size(49, 30)
					}));
				}
			}

			function classify(cls) {
				for (var i = 0; i < mars.length; i++) {
					if (cls != "全部") {
						mars[i].hide();
						if (mars[i].getExtData().cmsg == cls) {
							mars[i].show()
						}
					} else {
						mars[i].show()
					}
				}
			}
			$("#player").on("click", function() {
				if ($("audio").attr("src") == "") {
					$("#ze_mobal .top").text("暂无语音!");
					$("#ze_mobal").fadeIn(600).fadeOut(600);
					return false
				}
				if (audio.paused) {
					audio.play();
					$(this).find("img").attr("src", "/Public/Wechat/zhgc/images/bwg_18.png");
					if (outside_mar != undefined) {
						for (var i = 0; i < mars.length; i++) {
							if (mars[i].getExtData().extmsg == outside_mar.getExtData().extmsg) {
								mars[i].setIcon(new AMap.Icon({
									size: new AMap.Size(49, 30),
									image: mars[i].getExtData().varyIcon,
									imageSize: new AMap.Size(49, 30)
								}));
								$(".intro").text(mars[i].getExtData().extmsg);
								$(".intro").attr("data-zh", mars[i].getExtData().extmsgZ);
								$(".intro").attr("data-en", mars[i].getExtData().extmsgE);
								break;
							}
						}
					} else {
						for (var i = 0; i < mars.length; i++) {
							if (mars[i].getExtData().sound == $("audio").attr("src")) {
								console.log(123);
								mars[i].setIcon(new AMap.Icon({
									size: new AMap.Size(49, 30),
									image: mars[i].getExtData().varyIcon,
									imageSize: new AMap.Size(49, 30)
								}));
								$(".intro").text(mars[i].getExtData().extmsg);
								$(".intro").attr("data-zh", mars[i].getExtData().extmsgZ);
								$(".intro").attr("data-en", mars[i].getExtData().extmsgE);
								break;
							}
						}
					}
				} else {
					audio.pause();
					infoWindow.close();
					updata();
					$(this).find("img").attr("src", "/Public/Wechat/zhgc/images/bwg_17.png")
				}
			});
			$(".explain").on("click", function() {
				var c_audio = $("audio");
				updata();
				$("#player img").attr("src", "/Public/Wechat/zhgc/images/bwg_17.png");
				if ($(this).hasClass("english") == false) {
					for (var i = 0; i < mars.length; i++) {
						if (c_audio.attr("src") == mars[i].getExtData().sound) {
							$("audio").attr("src", mars[i].getExtData().soundE)
						}
						mars[i].getExtData().sound = mars[i].getExtData().soundE;
						mars[i].getExtData().content = mars[i].getExtData().contentE;
						mars[i].getExtData().url = mars[i].getExtData().urlE;
						mars[i].getExtData().extmsg = mars[i].getExtData().extmsgE
					}
					for (var j = 0; j < listmars.length; j++) {
						if (c_audio.attr("src") == listmars[j].getExtData().sound) {
							$("audio").attr("src", listmars[j].getExtData().soundE)
						}
						listmars[j].getExtData().sound = listmars[j].getExtData().soundE;
						listmars[j].getExtData().url = listmars[j].getExtData().urlE;
						var my_txt = "";
						for (var z = 0; z < listmars[j].getExtData().mylists.list.length; z++) {
							my_txt = my_txt + '<li class="hh" data-sound="' + listmars[j].getExtData().mylists.list[z].soundE + '" data-url="' + listmars[j].getExtData().mylists.list[z].urlE + '">' + listmars[j].getExtData().mylists.list[z].msgE + "</li>"
						}
						var my_cont = '<div class="mylists"><ul>' + my_txt + '</ul><i class="x_i"></i></div>';
						listmars[j].setContent(my_cont)
					}
					infoWindow.close();
					$(this).addClass("english");
					$(this).find(".v_p").text("Chinese");
					$("#ze_mobal .top").text("已切换成英文");
					$("#ze_mobal").stop(true, true);
					$("#ze_mobal").fadeIn(600).fadeOut(600);
					$("#myMobal .opt").each(function() {
						$(this).text($(this).data("en"))
					});
					$(".view_switch .right").text("Sift");
					$(".list_switch .left").text("List");
					$(".about_view .v_p").text("About");
					$(".about_view").attr("data-language", "en");
					$(".list_switch").attr("data-url", "https://www.uobay.com/Wechat/Zhgc/zghc_list?l=en-us");
					$(".intro").text($(".intro").data("en"));
					marAnminate();
					sessionStorage.setItem("english", 1)
				} else {
					for (var i = 0; i < mars.length; i++) {
						if (c_audio.attr("src") == mars[i].getExtData().sound) {
							$("audio").attr("src", mars[i].getExtData().soundZ)
						}
						mars[i].getExtData().sound = mars[i].getExtData().soundZ;
						mars[i].getExtData().content = mars[i].getExtData().contentZ;
						mars[i].getExtData().url = mars[i].getExtData().urlZ;
						mars[i].getExtData().extmsg = mars[i].getExtData().extmsgZ
					}
					for (var j = 0; j < listmars.length; j++) {
						if (c_audio.attr("src") == listmars[j].getExtData().sound) {
							$("audio").attr("src", listmars[j].getExtData().soundZ)
						}
						listmars[j].getExtData().sound = listmars[j].getExtData().soundZ;
						listmars[j].getExtData().url = listmars[j].getExtData().urlZ;
						var my_txt = "";
						for (var z = 0; z < listmars[j].getExtData().mylists.list.length; z++) {
							my_txt = my_txt + '<li class="hh" data-sound="' + listmars[j].getExtData().mylists.list[z].soundZ + '" data-url="' + listmars[j].getExtData().mylists.list[z].urlZ + '">' + listmars[j].getExtData().mylists.list[z].msgZ + "</li>"
						}
						var my_cont = '<div class="mylists"><ul>' + my_txt + '</ul><i class="x_i"></i></div>';
						listmars[j].setContent(my_cont)
					}
					infoWindow.close();
					$(this).removeClass("english");
					$(this).find(".v_p").text("英文讲解");
					$("#ze_mobal .top").text("已切换成中文");
					$("#ze_mobal").stop(true, true);
					$("#ze_mobal").fadeIn(600).fadeOut(600);
					$("#myMobal .opt").each(function() {
						$(this).text($(this).data("zh"))
					});
					$(".view_switch .right").text("景点筛选");
					$(".list_switch .left").text("讲解列表");
					$(".about_view  .v_p").text("关于景区");
					$(".about_view").attr("data-language", "zh");
					$(".list_switch").attr("data-url", "https://www.uobay.com/Wechat/Zhgc/zghc_list");
					$(".intro").text($(".intro").data("zh"));
					marAnminate();
					sessionStorage.setItem("english", 0)
				}
			});
			if (sessionStorage.getItem("english") == 1) {
				$(".explain").click()
			}
			$(".bot button").on("click", function() {
				$("#yw_mobal").hide()
			});
			document.addEventListener("touchstart", function(e) {
				var e = e || window.e;
				var mobj = e.srcElement || e.target;
				if ($(mobj).is(".hh,.hh *")) {
					console.log($(mobj).data("sound"));
					if ($(mobj).data("sound") == "") {
						// if ($(mobj).data("url") != "") {
						// 	window.location.href = $(mobj).data("url");
						// }
						window.location.href = $(mobj).parent().find('li').last().data("url");
					} else {
						$("audio").attr("src", $(mobj).data("sound"));
						$("#player").click()
					}
				}
			}, false);

			function marAnminate() {
				for (var i = 0; i < mars.length; i++) {
					mars[i].setAnimation("AMAP_ANIMATION_DROP")
				}
			}
			$(".about_view").on("click", function() {
				if ($(this).data("language") != "en") {
					window.location.href = "https://www.uobay.com/Wechat/Zhgc/about_zhgcsenic"
				} else {
					window.location.href = "https://www.uobay.com/Wechat/Zhgc/about_zhgcsenic?l=en-us"
				}
			});
			$(".ab_close").on("click", function() {
				$("#about_view_m").removeClass("active")
			});
			$(".list_switch").on("click", function() {
				window.location.href = $(this).data("url")
			})
		}
	})

}, 60);