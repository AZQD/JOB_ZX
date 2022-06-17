<?php

namespace Wechat\Controller;
use Think\Controller;

/**
 * 微信端公共控制器
 * 为防止多分组Controller名称冲突，公共Controller名称统一使用分组名称
 */
class ZhgcController extends Controller {
	private $signPackage;
	protected function _initialize(){
		if (!strpos($_SERVER['HTTP_USER_AGENT'],"MicroMessenger")) {
			//$this->display('my');exit();
		}
      	//die;
		$jssdk = new JSSDKController(C('WECHAT.appId'), C('WECHAT.appSecret'));
        $this->signPackage = $jssdk->GetSignPackage();
    }
    public function index(){
    	M('senic_region')->where(array('senic_id' =>145))->setInc('pv', 1);
    	$pv = M('senic_region')->where(array('senic_id' =>145))->getField('pv');
    	$senic_info = M('senic_region')->field('map,sound,name,relate_senic_id,thumbnail')->where(array('senic_id'=>145))->find();
    	$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    $relate_senic_id = $relate_senic_arr['english'];
	    $relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    $ensound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    $english_sound = '/Uploads/Download/'.$ensound_info['savepath'].$ensound_info['savename'];
	    $relate_senic_info['sound'] = $english_sound;
    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    $senic_info['sound'] = $sound;
    	$senic_map = M('picture')->where(array('id'=>$senic_info['map']))->getField('path');
    	$real_path = ROOT_PATH.substr($senic_map, 1);
    	$img_info = getimagesize($real_path);
    	$senic_info['img_width'] = $img_info[0];
    	$senic_info['img_height'] = $img_info[1];
    	$signPackage = $this->signPackage;
        $signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_map', $senic_map);
    	$this->assign('senic_info', $senic_info);
    	$this->assign('relate_senic_info', $relate_senic_info);
    	$this->assign('pv', $pv);
        $this->display('zhgcMain');
    }
    public function about_zhgcsenic(){
    	$language = I('l');
    	$senic_info = M('senic_region')->field('long_description,name,relate_senic_id,thumbnail')->where(array('senic_id'=>145))->find();
    	if ($language=='en-us') {
    		$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,long_description')->where(array('id'=>$relate_senic_id))->find();
	    	$senic_info['name'] = $relate_senic_info['name'];
	    	$senic_info['long_description'] = $relate_senic_info['long_description'];
    	}
    	$this->assign('senic_info', $senic_info);
    	$this->display('viewdes');
    }
    //郑韩故城 首页请求数据
    public function zhgcmain_ajax(){
    	$zhgc = array();
    	$senic_info = M('senic_region')->field('map')->where(array('senic_id'=>145))->find();
    	$senic_map = M('picture')->where(array('id'=>$senic_info['map']))->getField('path');
    	$zhgc['senic_map'] = $senic_map;
    	$zhgc['imagepos']['southwest'][] = 111.692619;
    	$zhgc['imagepos']['southwest'][] = 33.932028;
    	$zhgc['imagepos']['northeast'][] = 111.692619;
    	$zhgc['imagepos']['northeast'][] = 33.932028;
    	$spot_list = M('senic_spot')->field('name,sound,cate_id,x,y,relate_spot_id,image,spot_id')->where(array('senic_id'=>145))->select();
    	$markers = array();
    	foreach ($spot_list as $key => $value) {
    		$markers[$key]['icon'] = "";
    		$markers[$key]['position'] = "";
    		$markers[$key]['visible'] = true;
    		$markers[$key]['content'] = $value['name'];
    		$markers[$key]['extData']['varyIcon'] = "";
    		$relate_spot_arr = unserialize($value['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name')->where(array('id'=>$relate_spot_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
	    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$ensound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
	    	$english_sound = '/Uploads/Download/'.$ensound_info['savepath'].$ensound_info['savename'];
	    	$markers[$key]['extData']['sound'] = $sound;
	    	$markers[$key]['extData']['soundE'] = $english_sound;
	    	$markers[$key]['extData']['soundZ'] = $sound;
	    	if ($value['cate_id']==21) {
	    		$markers[$key]['extData']['extmsg'] = "卫生间";
	    		$markers[$key]['extData']['extmsgE'] = "toilet";
	    		$markers[$key]['extData']['extmsgZ'] = "卫生间";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}elseif ($value['cate_id']==20) {
	    		$markers[$key]['extData']['extmsg'] = "停车场";
	    		$markers[$key]['extData']['extmsgE'] = "parking lot";
	    		$markers[$key]['extData']['extmsgZ'] = "停车场";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}else{
	    		$markers[$key]['extData']['extmsg'] = $value['name'];
	    		$markers[$key]['extData']['extmsgE'] = $relate_spot_info['name'];
	    		$markers[$key]['extData']['extmsgZ'] = $value['name'];
	    		$markers[$key]['extData']['url'] = "/Wechat/Zhgc/zhgcdes/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['urlE'] = "/Wechat/Zhgc/zhgcdes/id/".$value['spot_id'].".html?l=en-us";
	    		$markers[$key]['extData']['urlZ'] = "/Wechat/Zhgc/zhgcdes/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['content'] = "点击查看更多";
	    		$markers[$key]['extData']['contentE'] = "view details";
	    		$markers[$key]['extData']['contentZ'] = "点击查看更多";
	    	}
	    	$markers[$key]['extData']['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
	    	$markers[$key]['markpos'][] = $value['x'];
	    	$markers[$key]['markpos'][] = $value['y'];
	    	if ($value['spot_id']==315) {
	    		$markers[$key]['extData']['ishasList'] = true;
	    		for ($i=0; $i < 4 ; $i++) { 
	    			$markers[$key]['extData']['mylists']['list'][$i]['sound'] = "";
	    			$markers[$key]['extData']['mylists']['list'][$i]['soundE'] = "";
	    			$markers[$key]['extData']['mylists']['list'][$i]['soundZ'] = "";
	    			if ($i==0) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "郑公大墓";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "Zheng Gong tomb";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "郑公大墓";
	    			}elseif ($i==1) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "一号车马坑";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "One chariot pit";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "一号车马坑";
	    			}elseif ($i==2) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "三号挖掘区";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "No.three excavation";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "三号挖掘区";
	    			}elseif ($i==3) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "进入内部";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "Enter inside";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "进入内部";
	    				$markers[$key]['extData']['mylists']['list'][$i]['url'] = "http://www.uobay.com/Wechat/Zhgc/cmk_main";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlE'] = "http://www.uobay.com/Wechat/Zhgc/cmk_main";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlZ'] = "http://www.uobay.com/Wechat/Zhgc/cmk_main";
	    			}
	    			if ($i!=3) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['url'] = "";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlE'] = "";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlZ'] = "";
	    			}
	    		}
	    	}else if ($value['spot_id']==316) {
	    		$markers[$key]['extData']['ishasList'] = true;
	    		for ($i=0; $i < 4 ; $i++) {
	    			$markers[$key]['extData']['mylists']['list'][$i]['sound'] = "";
	    			$markers[$key]['extData']['mylists']['list'][$i]['soundE'] = "";
	    			$markers[$key]['extData']['mylists']['list'][$i]['soundZ'] = "";
	    			if ($i==0) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "莲鹤方壶";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "Lotus and crane rectangular Hu";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "莲鹤方壶";
	    			}elseif ($i==1) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "郑韩文物展";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "Zheng Han heritage show";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "郑韩文物展";
	    			}elseif ($i==2) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "华夏之根";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "Roots of China";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "华夏之根";
	    			}elseif ($i==3) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['msg'] = "进入内部";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgE'] = "Enter inside";
	    				$markers[$key]['extData']['mylists']['list'][$i]['msgZ'] = "进入内部";
	    				$markers[$key]['extData']['mylists']['list'][$i]['url'] = "http://www.uobay.com/Wechat/Zhgc/bwg_list";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlE'] = "http://www.uobay.com/Wechat/Zhgc/bwg_list";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlZ'] = "http://www.uobay.com/Wechat/Zhgc/bwg_list";
	    			}
	    			if ($i!=3) {
	    				$markers[$key]['extData']['mylists']['list'][$i]['url'] = "";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlE'] = "";
	    				$markers[$key]['extData']['mylists']['list'][$i]['urlZ'] = "";
	    			}
	    		}
	    	}else{
	    		$markers[$key]['extData']['ishasList'] = false;
	    	}
    	}
    	$zhgc['markers'] = $markers;
    	echo json_encode($zhgc);
    }
    public function zghc_list(){
    	$language = I('l','zh-cn');
    	$senic_info = M('senic_region')->field('image,sound,level_id,name,relate_senic_id,thumbnail')->where(array('senic_id'=>145))->find();
    	$senic_info['image'] = M('picture')->where(array('id'=>$senic_info['image']))->getField('path');
    	if ($language=='en-us') {
    		//英文版
    		$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    	$senic_info['sound'] = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$senic_info['name'] = $relate_senic_info['name'];
	    	$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
	    	$senic_info['level_name'] = 'Key National Heritage Conservation Units';
	    	$spot_list = M('senic_spot')->field('name,sound,relate_spot_id,spot_id,thumbnail,short_description')->where(array('senic_id'=>145,'cate_id'=>array('not in',array(20,21)),'relate_spot_id'=>array('neq','0'),'spot_id'=>array('neq','413')))->select();
	    	foreach ($spot_list as $key => $value) {
	    		$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description')->where(array('id'=>$relate_spot_id))->find();
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
		    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    	$spot_list[$key]['sound'] = $sound;
		    	$spot_list[$key]['name'] = $relate_spot_info['name'];
		    	$spot_list[$key]['short_description'] = $relate_spot_info['short_description'];
	    	}
    	}else{
	    	//景区
	    	$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
	    	$senic_info['level_name'] = $level_name;
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
	    	$senic_info['sound'] = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	//景点
	    	$spot_list = M('senic_spot')->field('name,sound,relate_spot_id,spot_id,thumbnail,short_description')->where(array('senic_id'=>145,'cate_id'=>array('not in',array(20,21)),'spot_id'=>array('neq','413')))->select();
	    	foreach ($spot_list as $key => $value) {
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
		    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    	$spot_list[$key]['sound'] = $sound;
	    	}
    	}
    	$signPackage = $this->signPackage;
        $signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_info',$senic_info);
    	$this->assign('spot_list',$spot_list);
    	$this->assign('language',$language);
    	$this->display('zhgcList');
    }
    public function zhgcdes(){
    	$language = I('l','zh-cn');
    	$spot_id =I('get.id');
    	$spot_info = M('senic_spot')->field('name,sound,relate_spot_id,image,short_description,long_description,thumbnail')->where(array('spot_id'=>$spot_id))->find();
    	$spot_info['image'] = M('picture')->where(array('id'=>$spot_info['image']))->getField('path');
    	if ($language=='en-us') {
    		//英文版
    		$relate_spot_arr = unserialize($spot_info['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description,long_description')->where(array('id'=>$relate_spot_id))->find();
		    $sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    $spot_info['sound'] = $sound;
		    $spot_info['name'] = $relate_spot_info['name'];
		    $spot_info['long_description'] = $relate_spot_info['long_description'];
    	}else{
    		$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$spot_info['sound']))->find();
	    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$spot_info['sound'] = $sound;
    	}
    	$signPackage = $this->signPackage;
        $signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$spot_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
	    $this->assign('spot_info',$spot_info);
    	$this->display('zhgcDes');
    }
    public function bwg_list(){
    	$language = I('l','zh-cn');
    	M('senic_region')->where(array('senic_id' =>143))->setInc('pv', 1);
    	$pv = M('senic_region')->where(array('senic_id' =>143))->getField('pv');
    	$senic_info = M('senic_region')->field('image,sound,level_id,name,thumbnail,relate_senic_id')->where(array('senic_id'=>143))->find();
    	$senic_info['image'] = M('picture')->where(array('id'=>$senic_info['image']))->getField('path');
    	if ($language=='en-us') {
    		$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    	$senic_info['sound'] = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$senic_info['name'] = $relate_senic_info['name'];
	    	$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
	    	$senic_info['level_name'] = 'National Grade 3A Scenic spot';
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description,relate_spot_id')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>0))->select();
		    $spot_list_hasson = array();
		    $spot_list_hasnoson = array();
		    $i = 0;
		    $j = 0;
		    foreach ($spot_list as $key => $value) {
		    	$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		if (empty($relate_spot_id)) {
			    	continue;
			    }
	    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description')->where(array('id'=>$relate_spot_id))->find();
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$value['sound'] = $sound;
				$value['name'] = $relate_spot_info['name'];
				$value['short_description'] = $relate_spot_info['short_description'];
		    	$second_spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description,relate_spot_id')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$value['spot_id']))->select();
			    if (empty($second_spot_list)) {
			    	$spot_list_hasnoson[$i++] = $value;
			    }else{
			    	foreach ($second_spot_list as $kk => $v) {
			    		$relate_spot_arr = unserialize($v['relate_spot_id']);
			    		$relate_spot_id = $relate_spot_arr['english'];
			    		if (empty($relate_spot_id)) {
			    			unset($second_spot_list[$kk]);
			    			continue;
			    		}
			    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description')->where(array('id'=>$relate_spot_id))->find();
				    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
						$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
						$second_spot_list[$kk]['sound'] = $sound;
						$second_spot_list[$kk]['name'] = $relate_spot_info['name'];
						$second_spot_list[$kk]['short_description'] = $relate_spot_info['short_description'];
			    	}
			    	$value['second_spot_list'] = $second_spot_list;
			    	$spot_list_hasson[$j++] = $value;
			    }
			    $sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
			    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			    $spot_list[$key]['sound'] = $sound;
		    }
    	}else{
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
			$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			$senic_info['sound'] = $sound;
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>0))->select();
		    $spot_list_hasson = array();
		    $spot_list_hasnoson = array();
		    $i = 0;
		    $j = 0;
		    foreach ($spot_list as $key => $value) {
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$value['sound'] = $sound;
		    	$second_spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$value['spot_id']))->select();
			    if (empty($second_spot_list)) {
			    	$spot_list_hasnoson[$i++] = $value;
			    }else{
			    	foreach ($second_spot_list as $kk => $v) {
			    		$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$v['sound']))->find();
						$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
						$second_spot_list[$kk]['sound'] = $sound;
			    	}
			    	$value['second_spot_list'] = $second_spot_list;
			    	$spot_list_hasson[$j++] = $value;
			    }
			    $sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
			    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			    $spot_list[$key]['sound'] = $sound;
		    }
    	}
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_info',$senic_info);
    	$this->assign('spot_list_hasson',$spot_list_hasson);
    	$this->assign('spot_list_hasnoson',$spot_list_hasnoson);
    	$this->assign('language',$language);
    	$this->assign('pv',$pv);
    	$this->display('museumList');
    }
    public function bwg_spotdes(){
		$language = I('l','zh-cn');
		$spot_id = I('get.id');
	    $spot_info = M('senic_spot')->field('name,sound,image,short_description,long_description,thumbnail,relate_spot_id')->where(array('spot_id'=>$spot_id))->find();
		$spot_info['image'] = M('picture')->where(array('id'=>$spot_info['image']))->getField('path');
		if ($language=='en-us') {
			$relate_spot_arr = unserialize($spot_info['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description,long_description')->where(array('id'=>$relate_spot_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    $spot_info['name'] = $relate_spot_info['name'];
		    $spot_info['long_description'] = $relate_spot_info['long_description'];
		    $spot_info['short_description'] = $relate_spot_info['short_description'];
		}else{
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$spot_info['sound']))->find();
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		}
		$spot_info['sound'] = $sound;
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$spot_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('spot_info',$spot_info);
    	if ($spot_id==298) {
    		$this->display('museumDesS');
    	}else{
    		$this->display('museumDesF');
    	}
    }
    public function bwg_visitdes(){
    	$language = I('l','zh-cn');
    	$tag = I('get.tag');
    	if ($language=='en-us') {
    		$relate_senic_id = M('senic_region')->where(array('senic_id'=>143))->getField('relate_senic_id');
    		$relate_senic_arr = unserialize($relate_senic_id);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,long_description')->where(array('id'=>$relate_senic_id))->find();
	    	$senic_info = M('senic_region')->field('long_description,name,notice,thumbnail')->where(array('senic_id'=>143))->find();
	    	$info = array();
	    	if ($tag=='visit') {
	    		$info['name'] = 'Guide To Visit';
	    		$info['des'] = $relate_senic_info['notice'];
	    	}else{
	    		$info['name'] = 'A Brief Introduction To Museum';
	    		$info['des'] = $relate_senic_info['long_description'];
	    	}
    	}else{
	    	$senic_info = M('senic_region')->field('long_description,name,notice,thumbnail')->where(array('senic_id'=>143))->find();
	    	$info = array();
	    	if ($tag=='visit') {
	    		$info['name'] = '参观须知';
	    		$info['des'] = $senic_info['notice'];
	    	}else{
	    		$info['name'] = '博物馆简介';
	    		$info['des'] = $senic_info['long_description'];
	    	}
    	}
    	$signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('info',$info);
    	$this->display('museumdes');
    }
    public function bwg_bigpic(){
    	$language = I('l','zh-cn');
    	if ($language=='en-us') {
    		$relate_senic_id = M('senic_region')->where(array('senic_id'=>143))->getField('relate_senic_id');
    		$relate_senic_arr = unserialize($relate_senic_id);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
    		$senic_name = $relate_senic_info['name'];
	    	$thumbnail = M('senic_region')->where(array('senic_id'=>143))->getField('thumbnail');
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,image,long_description,relate_spot_id,thumbnail')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>0))->select();
		    $nspot_list = array();
		    $i = 0;
		    foreach ($spot_list as $key => $value) {
		    	$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		if (empty($relate_spot_id)) {
			    	continue;
			    }
	    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description,long_description')->where(array('id'=>$relate_spot_id))->find();
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$value['sound'] = $sound;
				$value['name'] = $relate_spot_info['name'];
				$value['short_description'] = $relate_spot_info['short_description'];
				$value['long_description'] = $relate_spot_info['long_description'];
		    	$second_spot_list = M('senic_spot')->field('name,sound,image,long_description,relate_spot_id')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$value['spot_id']))->select();
			    if (empty($second_spot_list)) {
			    	$value['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
			    	$nspot_list[$i] = $value;
			    	$i++;
			    }else{
			    	foreach ($second_spot_list as $kk => $v) {
			    		$relate_spot_arr = unserialize($v['relate_spot_id']);
			    		$relate_spot_id = $relate_spot_arr['english'];
			    		if (empty($relate_spot_id)) {
			    			unset($second_spot_list[$kk]);
			    			continue;
			    		}
			    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description,long_description')->where(array('id'=>$relate_spot_id))->find();
				    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
						$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
						$v['name'] = $relate_spot_info['name'];
						$v['short_description'] = $relate_spot_info['short_description'];
						$v['long_description'] = $relate_spot_info['long_description'];
						$v['sound'] = $sound;
						$v['image'] = M('picture')->where(array('id'=>$v['image']))->getField('path');
						$nspot_list[$i] = $v;
						$i++;
			    	}
			    }
		    }
    	}else{
    		$senic_name = M('senic_region')->where(array('senic_id'=>143))->getField('name');
	    	$thumbnail = M('senic_region')->where(array('senic_id'=>143))->getField('thumbnail');
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,image,long_description,thumbnail')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>0))->select();
		    $nspot_list = array();
		    $i = 0;
		    foreach ($spot_list as $key => $value) {
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$value['sound'] = $sound;
		    	$second_spot_list = M('senic_spot')->field('name,sound,image,long_description')->where(array('senic_id'=>143,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$value['spot_id']))->select();
			    if (empty($second_spot_list)) {
			    	$value['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
			    	$nspot_list[$i] = $value;
			    	$i++;
			    }else{
			    	foreach ($second_spot_list as $kk => $v) {
			    		$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$v['sound']))->find();
						$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
						$v['sound'] = $sound;
						$v['image'] = M('picture')->where(array('id'=>$v['image']))->getField('path');
						$nspot_list[$i] = $v;
						$i++;
			    	}
			    }
		    }
    	}
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$thumbnail;
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_name',$senic_name);
    	$this->assign('nspot_list',$nspot_list);
    	$this->display('bigModel');
    }
    public function oyx_main(){
    	M('senic_region')->where(array('senic_id' =>144))->setInc('pv', 1);
    	$pv = M('senic_region')->where(array('senic_id' =>144))->getField('pv');
    	$senic_info = M('senic_region')->field('map,sound,name,thumbnail,relate_senic_id')->where(array('senic_id'=>144))->find();
    	$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    $relate_senic_id = $relate_senic_arr['english'];
	    $relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    $ensound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    $english_sound = '/Uploads/Download/'.$ensound_info['savepath'].$ensound_info['savename'];
	    $relate_senic_info['sound'] = $english_sound;
    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    $senic_info['sound'] = $sound;
    	$senic_map = M('picture')->where(array('id'=>$senic_info['map']))->getField('path');
    	$signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
      	$real_path = ROOT_PATH.substr($senic_map, 1);
    	$img_info = getimagesize($real_path);
    	$senic_info['img_width'] = $img_info[0];
    	$senic_info['img_height'] = $img_info[1];
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_map', $senic_map);
    	$this->assign('senic_info', $senic_info);
    	$this->assign('relate_senic_info', $relate_senic_info);
    	$this->assign('pv', $pv);
    	$this->display('oyxMain');
    }
    public function oyx_mainajax(){
    	$zhgc = array();
    	$senic_info = M('senic_region')->field('map')->where(array('senic_id'=>144))->find();
    	$senic_map = M('picture')->where(array('id'=>$senic_info['map']))->getField('path');
    	$zhgc['senic_map'] = $senic_map;
    	$zhgc['imagepos']['southwest'][] = 111.692619;
    	$zhgc['imagepos']['southwest'][] = 33.932028;
    	$zhgc['imagepos']['northeast'][] = 111.692619;
    	$zhgc['imagepos']['northeast'][] = 33.932028;
    	$spot_list = M('senic_spot')->field('name,sound,cate_id,x,y,relate_spot_id,image,spot_id')->where(array('senic_id'=>144,'parent_spot_id'=>0))->select();
    	$markers = array();
    	foreach ($spot_list as $key => $value) {
    		$markers[$key]['icon'] = "";
    		$markers[$key]['position'] = "";
    		$markers[$key]['visible'] = true;
    		$markers[$key]['content'] = $value['name'];
    		$markers[$key]['extData']['varyIcon'] = "";
    		$relate_spot_arr = unserialize($value['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name')->where(array('id'=>$relate_spot_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
	    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$ensound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
	    	$english_sound = '/Uploads/Download/'.$ensound_info['savepath'].$ensound_info['savename'];
	    	$markers[$key]['extData']['sound'] = $sound;
	    	$markers[$key]['extData']['soundE'] = $english_sound=='/Uploads/Download/'?"":$english_sound;
	    	$markers[$key]['extData']['soundZ'] = $sound;
	    	if ($value['cate_id']==21) {
	    		$markers[$key]['extData']['extmsg'] = "卫生间";
	    		$markers[$key]['extData']['extmsgE'] = "";
	    		$markers[$key]['extData']['extmsgZ'] = "卫生间";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}elseif ($value['cate_id']==20) {
	    		$markers[$key]['extData']['extmsg'] = "停车场";
	    		$markers[$key]['extData']['extmsgE'] = "";
	    		$markers[$key]['extData']['extmsgZ'] = "停车场";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}else{
	    		$markers[$key]['extData']['spot_id'] = $value['spot_id'];
	    		$markers[$key]['extData']['extmsg'] = $value['name'];
	    		$markers[$key]['extData']['extmsgE'] = $relate_spot_info['name'];
	    		$markers[$key]['extData']['extmsgZ'] = $value['name'];
	    		$markers[$key]['extData']['url'] = "/Wechat/Zhgc/oyx_des/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['urlE'] = "/Wechat/Zhgc/oyx_des/id/".$value['spot_id'].".html?l=en-us";
	    		$markers[$key]['extData']['urlZ'] = "/Wechat/Zhgc/oyx_des/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['content'] = "点击查看更多";
	    		$markers[$key]['extData']['contentE'] = "view details";
	    		$markers[$key]['extData']['contentZ'] = "点击查看更多";
	    	}
	    	$markers[$key]['extData']['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
	    	$markers[$key]['markpos'][] = $value['x'];
	    	$markers[$key]['markpos'][] = $value['y'];
	    	$spot_id = $value['spot_id'];
	    	$second_spot_list = M('senic_spot')->field('name,sound,image,short_description')->where(array('senic_id'=>144,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$spot_id))->select();
	    	$num = count($second_spot_list);
	    	if ($num>0) {
	    		$markers[$key]['extData']['ishasList'] = true;
	    		$markers[$key]['extData']['mylists']['list'][$i]['sound'] = "";
		    	$markers[$key]['extData']['mylists']['list'][$i]['soundE'] = "";
		    	$markers[$key]['extData']['mylists']['list'][$i]['soundZ'] = "";
	    	}else{
	    		$markers[$key]['extData']['ishasList'] = false;
	    	}
    	}
    	$zhgc['markers'] = $markers;
    	echo json_encode($zhgc);
    }
   	public function show_secondspotajax(){
   		$spot_id = I('post.spot_id',-1);
   		$language = I('l','zh-cn');
   		$spot_list = M('senic_spot')->field('name,sound,relate_spot_id')->where(array('parent_spot_id'=>$spot_id))->select();
   		foreach ($spot_list as $key => $value) {
   			if ($language=='zh-cn') {
   				$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$spot_list[$key]['sound'] = $sound;
   			}else{
   				$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		if (empty($relate_spot_id)) {
	    			unset($spot_list[$key]);
			    	continue;
			    }
   				$relate_spot_info = M('senic_spot_relate')->field('sound,name')->where(array('id'=>$relate_spot_id))->find();
   				$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    		$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    		$spot_list[$key]['sound'] = $sound;
	    		$spot_list[$key]['name'] = $relate_spot_info['name'];
   			}
   		}
   		echo json_encode($spot_list);
   	}
   	public function oyx_list(){
   		$language = I('l','zh-cn');
   		$senic_info = M('senic_region')->field('image,sound,level_id,name,thumbnail,relate_senic_id')->where(array('senic_id'=>144))->find();
   		$senic_info['image'] = M('picture')->where(array('id'=>$senic_info['image']))->getField('path');
   		if ($language=='en-us') {
	   		$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    	$senic_info['sound'] = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$senic_info['name'] = $relate_senic_info['name'];
	    	$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
	    	$senic_info['level_name'] = 'Important Historical Monuments under Special Preservation';
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description,relate_spot_id')->where(array('senic_id'=>144,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>0,'spot_id'=>array('neq','414')))->select();
		    $spot_list_hasson = array();
		    $spot_list_hasnoson = array();
		    $i = 0;
		    $j = 0;
		    foreach ($spot_list as $key => $value) {
		    	$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		if (empty($relate_spot_id)) {
			    	continue;
			    }
	    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description')->where(array('id'=>$relate_spot_id))->find();
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$value['sound'] = $sound;
				$value['name'] = $relate_spot_info['name'];
				$value['short_description'] = $relate_spot_info['short_description'];
		    	$second_spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description,relate_spot_id')->where(array('senic_id'=>144,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$value['spot_id']))->select();
			    if (empty($second_spot_list)) {
			    	$spot_list_hasnoson[$i++] = $value;
			    }else{
			    	foreach ($second_spot_list as $kk => $v) {
			    		$relate_spot_arr = unserialize($v['relate_spot_id']);
			    		$relate_spot_id = $relate_spot_arr['english'];
			    		if (empty($relate_spot_id)) {
			    			unset($second_spot_list[$kk]);
			    			continue;
			    		}
			    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description')->where(array('id'=>$relate_spot_id))->find();
				    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
						$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
						$second_spot_list[$kk]['sound'] = $sound;
						$second_spot_list[$kk]['name'] = $relate_spot_info['name'];
						$second_spot_list[$kk]['short_description'] = $relate_spot_info['short_description'];
			    	}
			    	$value['second_spot_list'] = $second_spot_list;
			    	$spot_list_hasson[$j++] = $value;
			    }
		    }
	    }else{
	    	//景区
	   		$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
		    $senic_info['level_name'] = $level_name;
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
			$senic_info['sound'] = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			//景点
		    $spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description')->where(array('senic_id'=>144,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>0,'spot_id'=>array('neq','414')))->select();
		    $spot_list_hasson = array();
		    $spot_list_hasnoson = array();
		    $i = 0;
		    $j = 0;
		    foreach ($spot_list as $key => $value) {
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$value['sound'] = $sound;
		    	$second_spot_list = M('senic_spot')->field('name,sound,spot_id,thumbnail,short_description')->where(array('senic_id'=>144,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$value['spot_id']))->select();
			    if (empty($second_spot_list)) {
			    	$spot_list_hasnoson[$i++] = $value;
			    }else{
			    	foreach ($second_spot_list as $kk => $v) {
			    		$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$v['sound']))->find();
						$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
						$second_spot_list[$kk]['sound'] = $sound;
			    	}
			    	$value['second_spot_list'] = $second_spot_list;
			    	$spot_list_hasson[$j++] = $value;
			    }
		    }
	    }
	    $signPackage = $this->signPackage;
	    $signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
	    $this->assign('senic_info',$senic_info);
	    $this->assign('spot_list_hasson',$spot_list_hasson);
    	$this->assign('spot_list_hasnoson',$spot_list_hasnoson);
    	$this->assign('language',$language);
   		$this->display('oyxList');
   	}
   	public function oyx_des(){
   		$language = I('l','zh-cn');
   		$spot_id = I('get.id');
	    $spot_info = M('senic_spot')->field('name,sound,image,short_description,long_description,thumbnail,relate_spot_id')->where(array('spot_id'=>$spot_id))->find();
   		if ($language=='en-us') {
   			$relate_spot_arr = unserialize($spot_info['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description,long_description')->where(array('id'=>$relate_spot_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
	    	$spot_info['image'] = M('picture')->where(array('id'=>$spot_info['image']))->getField('path');
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    $spot_info['name'] = $relate_spot_info['name'];
		    $spot_info['long_description'] = $relate_spot_info['long_description'];
		    $spot_info['short_description'] = $relate_spot_info['short_description'];
		    $spot_info['sound'] = $sound;
   		}else{
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$spot_info['sound']))->find();
	    	$spot_info['image'] = M('picture')->where(array('id'=>$spot_info['image']))->getField('path');
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    $spot_info['sound'] = $sound;
   		}
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$spot_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('spot_info',$spot_info);
   		$this->display('oyxDes');
   	}
   	public function about_oyx(){
   		$language = I('l');
    	$senic_info = M('senic_region')->field('long_description,name,relate_senic_id')->where(array('senic_id'=>144))->find();
    	if ($language=='en-us') {
    		$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,long_description')->where(array('id'=>$relate_senic_id))->find();
	    	$senic_info['name'] = $relate_senic_info['name'];
	    	$senic_info['long_description'] = $relate_senic_info['long_description'];
    	}
    	$this->assign('senic_info', $senic_info);
    	$this->display('viewdes');
    }
   	public function cmk_main(){
    	M('senic_region')->where(array('senic_id' =>142))->setInc('pv', 1);
    	$pv = M('senic_region')->where(array('senic_id' =>142))->getField('pv');
    	$senic_info = M('senic_region')->field('map,sound,name,thumbnail,relate_senic_id')->where(array('senic_id'=>142))->find();
    	$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    $relate_senic_id = $relate_senic_arr['english'];
	    $relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    $ensound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    $english_sound = '/Uploads/Download/'.$ensound_info['savepath'].$ensound_info['savename'];
	    $relate_senic_info['sound'] = $english_sound;
    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    $senic_info['sound'] = $sound;
    	$senic_map = M('picture')->where(array('id'=>$senic_info['map']))->getField('path');
    	$real_path = ROOT_PATH.substr($senic_map, 1);
    	$img_info = getimagesize($real_path);
    	$senic_info['img_width'] = $img_info[0];
    	$senic_info['img_height'] = $img_info[1];
    	$signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_map', $senic_map);
    	$this->assign('senic_info', $senic_info);
    	$this->assign('relate_senic_info', $relate_senic_info);
    	$this->assign('pv', $pv);
    	$this->display('iemaMain');
    }
    public function cmk_mainajax(){
    	$zhgc = array();
    	$senic_info = M('senic_region')->field('map')->where(array('senic_id'=>142))->find();
    	$senic_map = M('picture')->where(array('id'=>$senic_info['map']))->getField('path');
    	$zhgc['senic_map'] = $senic_map;
    	$zhgc['imagepos']['southwest'][] = 111.692619;
    	$zhgc['imagepos']['southwest'][] = 33.932028;
    	$zhgc['imagepos']['northeast'][] = 111.692619;
    	$zhgc['imagepos']['northeast'][] = 33.932028;
    	$spot_list = M('senic_spot')->field('name,sound,cate_id,x,y,relate_spot_id,image,spot_id,parent_spot_map')->where(array('senic_id'=>142,'parent_spot_id'=>0))->select();
    	$markers = array();
    	foreach ($spot_list as $key => $value) {
    		$markers[$key]['icon'] = "";
    		$markers[$key]['position'] = "";
    		$markers[$key]['visible'] = true;
    		$markers[$key]['content'] = $value['name'];
    		$markers[$key]['extData']['varyIcon'] = "";
    		$relate_spot_arr = unserialize($value['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name')->where(array('id'=>$relate_spot_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
	    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$ensound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
	    	$english_sound = '/Uploads/Download/'.$ensound_info['savepath'].$ensound_info['savename'];
	    	$markers[$key]['extData']['sound'] = $sound;
	    	$markers[$key]['extData']['soundE'] = $english_sound;
	    	$markers[$key]['extData']['soundZ'] = $sound;
	    	if ($value['cate_id']==21) {
	    		$markers[$key]['extData']['extmsg'] = "卫生间";
	    		$markers[$key]['extData']['extmsgE'] = "";
	    		$markers[$key]['extData']['extmsgZ'] = "卫生间";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}elseif ($value['cate_id']==20) {
	    		$markers[$key]['extData']['extmsg'] = "停车场";
	    		$markers[$key]['extData']['extmsgE'] = "";
	    		$markers[$key]['extData']['extmsgZ'] = "停车场";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}else{
	    		$markers[$key]['extData']['spot_id'] = $value['spot_id'];
	    		$markers[$key]['extData']['extmsg'] = $value['name'];
	    		$markers[$key]['extData']['extmsgE'] = $relate_spot_info['name'];
	    		$markers[$key]['extData']['extmsgZ'] = $value['name'];
	    		$markers[$key]['extData']['url'] = "/Wechat/Zhgc/cmk_des/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['urlE'] = "/Wechat/Zhgc/cmk_des/id/".$value['spot_id'].".html?l=en-us";
	    		$markers[$key]['extData']['urlZ'] = "/Wechat/Zhgc/cmk_des/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['content'] = "点击查看更多";
	    		$markers[$key]['extData']['contentE'] = "view details";
	    		$markers[$key]['extData']['contentZ'] = "点击查看更多";
	    	}
	    	$markers[$key]['extData']['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
	    	$markers[$key]['markpos'][] = $value['x'];
	    	$markers[$key]['markpos'][] = $value['y'];
	    	$spot_id = $value['spot_id'];
	    	$second_spot_list = M('senic_spot')->field('name,sound,image,short_description')->where(array('senic_id'=>142,'cate_id'=>array('not in',array(20,21)),'parent_spot_id'=>$spot_id))->select();
	    	$num = count($second_spot_list);
	    	if ($num>0) {
	    		$markers[$key]['extData']['ishasList'] = true;
	    		if ($value['parent_spot_map']!=0) {
	    			$markers[$key]['extData']['ishasListUrl'] = '/Wechat/Zhgc/cmk_secondmap/id/'.$value['spot_id'];
	    		}
	    	}else{
	    		$markers[$key]['extData']['ishasList'] = false;
	    	}
    	}
    	$zhgc['markers'] = $markers;
    	echo json_encode($zhgc);
    }
    public function cmk_secondmap(){
    	$senic_info = M('senic_spot')->field('parent_spot_map,name,sound,thumbnail')->where(array('spot_id'=>293))->find();
    	$senic_map = M('picture')->where(array('id'=>$senic_info['parent_spot_map']))->getField('path');
    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    $senic_info['sound'] = $sound;
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
      	$real_path = ROOT_PATH.substr($senic_map, 1);
    	$img_info = getimagesize($real_path);
    	$senic_info['img_width'] = $img_info[0];
    	$senic_info['img_height'] = $img_info[1];
        $this->assign("signPackage", $signPackage);
    	$this->assign('senic_map', $senic_map);
    	$this->assign('spot_info', $senic_info);
    	$this->display('iemaViewMain');
    }
    public function cmk_secondmapajax(){
    	$zhgc = array();
    	$senic_info = M('senic_spot')->field('parent_spot_map')->where(array('spot_id'=>293))->find();
    	$senic_map = M('picture')->where(array('id'=>$senic_info['parent_spot_map']))->getField('path');
    	$zhgc['senic_map'] = $senic_map;
    	$zhgc['imagepos']['southwest'][] = 111.692619;
    	$zhgc['imagepos']['southwest'][] = 33.932028;
    	$zhgc['imagepos']['northeast'][] = 111.720342;
    	$zhgc['imagepos']['northeast'][] = 33.944223;
    	$spot_list = M('senic_spot')->field('name,sound,cate_id,x,y,relate_spot_id,image,spot_id,parent_spot_map')->where(array('parent_spot_id'=>293))->select();
    	$markers = array();
    	foreach ($spot_list as $key => $value) {
    		$markers[$key]['icon'] = "";
    		$markers[$key]['position'] = "";
    		$markers[$key]['visible'] = true;
    		$markers[$key]['content'] = $value['name'];
    		$markers[$key]['extData']['varyIcon'] = "";
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
	    	$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    	$markers[$key]['extData']['sound'] = $sound;
	    	$markers[$key]['extData']['soundE'] = "";
	    	$markers[$key]['extData']['soundZ'] = $sound;
	    	if ($value['cate_id']==21) {
	    		$markers[$key]['extData']['extmsg'] = "卫生间";
	    		$markers[$key]['extData']['extmsgE'] = "";
	    		$markers[$key]['extData']['extmsgZ'] = "卫生间";
	    		$markers[$key]['extData']['content'] = "";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "";
	    	}else{
	    		$markers[$key]['extData']['spot_id'] = $value['spot_id'];
	    		$markers[$key]['extData']['extmsg'] = $value['name'];
	    		$markers[$key]['extData']['extmsgE'] = "";
	    		$markers[$key]['extData']['extmsgZ'] = $value['name'];
	    		$markers[$key]['extData']['url'] = "/Wechat/Zhgc/cmk_des/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['urlE'] = "";
	    		$markers[$key]['extData']['urlZ'] = "/Wechat/Zhgc/cmk_des/id/".$value['spot_id'].".html";
	    		$markers[$key]['extData']['content'] = "点击查看更多";
	    		$markers[$key]['extData']['contentE'] = "";
	    		$markers[$key]['extData']['contentZ'] = "点击查看更多";
	    	}
	    	$markers[$key]['extData']['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
	    	$markers[$key]['markpos'][] = $value['x'];
	    	$markers[$key]['markpos'][] = $value['y'];
	    	$markers[$key]['extData']['ishasList'] = false;
    	}
    	$zhgc['markers'] = $markers;
    	echo json_encode($zhgc);
    }
    public function show_cmksecondspotajax(){
   		$spot_id = I('post.spot_id',-1);
   		$language = I('l','zh-cn');
   		$spot_list = M('senic_spot')->field('name,sound,relate_spot_id')->where(array('parent_spot_id'=>$spot_id))->select();
   		foreach ($spot_list as $key => $value) {
   			if ($language=='zh-cn') {
	   			$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$spot_list[$key]['sound'] = $sound;
			}else{
				$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		if (empty($relate_spot_id)) {
	    			unset($spot_list[$key]);
			    	continue;
			    }
   				$relate_spot_info = M('senic_spot_relate')->field('sound,name')->where(array('id'=>$relate_spot_id))->find();
   				$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
	    		$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
	    		$spot_list[$key]['sound'] = $sound;
	    		$spot_list[$key]['name'] = $relate_spot_info['name'];
			}
   		}
   		echo json_encode($spot_list);
   	}
   	public function cmk_secondlist(){
   		$senic_info = M('senic_region')->field('image,sound,level_id,name,thumbnail')->where(array('senic_id'=>142))->find();
   		$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
	    $senic_info['level_name'] = $level_name;
    	$senic_info['image'] = M('picture')->where(array('id'=>$senic_info['image']))->getField('path');
    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
		$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		$senic_info['sound'] = $sound;
   		$senic_name = M('senic_region')->where(array('senic_id'=>142))->getField('name');
    	$spot_list = M('senic_spot')->field('name,sound,spot_id,image,thumbnail,short_description')->where(array('parent_spot_id'=>293))->select();
	    $i = 0;
	    foreach ($spot_list as $key => $value) {
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
			$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			$spot_list[$key]['sound'] = $sound;
		    $spot_list[$key]['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
	    }
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
	    $this->assign('senic_info',$senic_info);
	    $this->assign('spot_list',$spot_list);
   		$this->display('iemaList');
   	}
    public function cmk_list(){
    	$language = I('l','zh-cn');
   		$senic_info = M('senic_region')->field('image,sound,level_id,name,thumbnail,relate_senic_id')->where(array('senic_id'=>142))->find();
   		if ($language=='en-us') {
   			$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,sound')->where(array('id'=>$relate_senic_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_senic_info['sound']))->find();
   			$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
		    $senic_info['level_name'] = "Important Historical Monuments under Special Preservation";
	    	$senic_info['image'] = M('picture')->where(array('id'=>$senic_info['image']))->getField('path');
	    	$senic_info['name'] = $relate_senic_info['name'];
			$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			$senic_info['sound'] = $sound;
	   		$senic_name = M('senic_region')->where(array('senic_id'=>142))->getField('name');
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,image,thumbnail,short_description,relate_spot_id')->where(array('senic_id'=>142,'cate_id'=>array('not in',array(20,21)),'spot_id'=>array('neq','415'),'parent_spot_id'=>0)) ->select();
		    $i = 0;
		    foreach ($spot_list as $key => $value) {
		    	$relate_spot_arr = unserialize($value['relate_spot_id']);
	    		$relate_spot_id = $relate_spot_arr['english'];
	    		if (empty($relate_spot_id)) {
	    			unset($spot_list[$key]);
			    	continue;
			    }
	    		$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description')->where(array('id'=>$relate_spot_id))->find();
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		  		$spot_list[$key]['name'] = $relate_spot_info['name'];
				$spot_list[$key]['short_description'] = $relate_spot_info['short_description'];
				$spot_list[$key]['sound'] = $sound;
			    $spot_list[$key]['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
		    }
   		}else{
   			$level_name = M('level')->where(array('level_id'=>$senic_info['level_id']))->getField('level_name');
		    $senic_info['level_name'] = $level_name;
	    	$senic_info['image'] = M('picture')->where(array('id'=>$senic_info['image']))->getField('path');
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$senic_info['sound']))->find();
			$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
			$senic_info['sound'] = $sound;
	   		$senic_name = M('senic_region')->where(array('senic_id'=>142))->getField('name');
	    	$spot_list = M('senic_spot')->field('name,sound,spot_id,image,thumbnail,short_description')->where(array('senic_id'=>142,'cate_id'=>array('not in',array(20,21)),'spot_id'=>array('neq','415'),'parent_spot_id'=>0)) ->select();
		    $i = 0;
		    foreach ($spot_list as $key => $value) {
		    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$value['sound']))->find();
				$sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
				$spot_list[$key]['sound'] = $sound;
			    $spot_list[$key]['image'] = M('picture')->where(array('id'=>$value['image']))->getField('path');
		    }
   		}
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$senic_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
	    $this->assign('senic_info',$senic_info);
	    $this->assign('spot_list',$spot_list);
	    $this->assign('language',$language);
   		$this->display('iemaList');
   	}
    public function cmk_des(){
    	$language = I('l','zh-cn');
    	$spot_id = I('get.id');
	    $spot_info = M('senic_spot')->field('name,sound,image,short_description,long_description,thumbnail,relate_spot_id')->where(array('spot_id'=>$spot_id))->find();
    	if ($language=='en-us') {
	    	$relate_spot_arr = unserialize($spot_info['relate_spot_id']);
	    	$relate_spot_id = $relate_spot_arr['english'];
	    	$relate_spot_info = M('senic_spot_relate')->field('sound,name,short_description,long_description')->where(array('id'=>$relate_spot_id))->find();
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$relate_spot_info['sound']))->find();
	    	$spot_info['image'] = M('picture')->where(array('id'=>$spot_info['image']))->getField('path');
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    $spot_info['sound'] = $sound;
		    $spot_info['name'] = $relate_spot_info['name'];
		    $spot_info['long_description'] = $relate_spot_info['long_description'];
		    $spot_info['short_description'] = $relate_spot_info['short_description'];
		}else{
	    	$sound_info = M('file')->field('savename,savepath')->where(array('id'=>$spot_info['sound']))->find();
	    	$spot_info['image'] = M('picture')->where(array('id'=>$spot_info['image']))->getField('path');
		    $sound = '/Uploads/Download/'.$sound_info['savepath'].$sound_info['savename'];
		    $spot_info['sound'] = $sound;
		}
	    $signPackage = $this->signPackage;
      	$signPackage['thumbnail'] = 'http://'.$_SERVER['HTTP_HOST'].$spot_info['thumbnail'];
        $this->assign("signPackage", $signPackage);
    	$this->assign('spot_info',$spot_info);
    	$this->display('iemaDes');
    }
    public function about_cmk(){
    	$language = I('l');
    	$senic_info = M('senic_region')->field('long_description,name,relate_senic_id')->where(array('senic_id'=>142))->find();
    	if ($language=='en-us') {
    		$relate_senic_arr = unserialize($senic_info['relate_senic_id']);
	    	$relate_senic_id = $relate_senic_arr['english'];
	    	$relate_senic_info = M('senic_region_relate')->field('name,long_description')->where(array('id'=>$relate_senic_id))->find();
	    	$senic_info['name'] = $relate_senic_info['name'];
	    	$senic_info['long_description'] = $relate_senic_info['long_description'];
    	}
    	$this->assign('senic_info', $senic_info);
    	$this->display('viewdes');
    }
}
