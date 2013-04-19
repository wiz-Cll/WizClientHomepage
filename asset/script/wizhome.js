var field = {
	'debug':'http://localhost',
	'pro': 'http://wiz.cn'
}


$(document).ready( initHome );



// @func 初始化首页的函数，操作包括：读取用户设置，显示tab和tabcontent
//                      读取客户端数据库，进行相关操作
function initHome(){
	initTab();
	cookieAffect();
	$('#save-setting').click(saveSetting);
	$('#cancel-setting').click(cancelSetting);
	$('#close-tip').click( function(){
		$('#tips').addClass('disabled');
		try{
			var configObj = JSON.parse( $.cookie('config') );
			configObj['#tips'] = 0;
			$('#manager').find('input[data-idstr="#tips"]').attr('checked',false);
			$.cookie('config', JSON.stringify( configObj ));
		}
		catch( err ){
			console.log('保存关闭tip的设置失败···' + err);
		}
	});
}

function initTab(){
	$('#tabs').delegate('a','click', function( event ){
		var e = event;
		e.preventDefault();
		var $target = $(e.target);
		switchTabpane( $target.attr('href') );
		// switch()
		return false;
	})
}

// 读取cookie用户的配置 初始化tabs的显示 和 manager的checkbox的是否check
function cookieAffect(){
	var $tabs = $('#tabs');
	var $manager = $('#manager')
	try{
		var configStr = $.cookie('config');
		if( configStr ){
			var configObj = JSON.parse( configStr );
			console.log( configObj );
			for( var i in configObj ){
				var relevantTab = $tabs.find('a[href="'+ i +'"]').parent('li');
				// 没有取到relavanttab  说明是tips
				if( relevantTab.length === 0 ){
					relevantTab = $( i );
				}
				
				if( configObj[i] === 0 ){
					relevantTab.addClass('disabled');
					$manager.find('input[data-idstr="'+i+'"]').attr('checked', false);
				}
				else{
					relevantTab.removeClass('disabled');
					$manager.find('input[data-idstr="'+i+'"]').attr('checked', true);
				}
				
			}
		}
		else{
			// 用户尚未配置 或 配置被清除
		}
		
	}
	catch( err ){
		console.log('读取用户配置失败···' + err);
	}
}


function bindCheckboxHandler(){
	$("#info_table").delegate('input[type="checkbox"]','click',function(event){
		// var e = event;
		// var $target = $(e.target);

	});
}

// @func 保存用户设置 主要分两步走：
// 		1、根据checkbox进行tabs的显示与隐藏
//      2、将设置保存进cookie
function saveSetting(){
	var configObj = {};
	var $inputs = $('#manager input');
	var $tabs = $('#tabs');
	var len = $inputs.length;
	for( var i = 0; i < len; i++){
		var $item = $inputs.eq(i)
		var idstr = $item.attr('data-idstr');

		var relevantTab = $tabs.find('a[href="'+ idstr +'"]').parent('li');

		if( relevantTab.length === 0 ){
			relevantTab = $( idstr );
		}

		if( $item.attr('checked') ){
			relevantTab.removeClass('disabled');
			configObj[idstr] = 1;
		}
		else{
			relevantTab.addClass('disabled');
			configObj[idstr] = 0;
		}

	}

	var configStr;
	try{
		configStr = JSON.stringify( configObj );
		$.cookie('config', configStr);

	}
	catch(err){
		console.log( err );
	}
	
}

function cancelSetting(){
	var $manager = $('#manager')
	try{
		var configStr = $.cookie('config');
		if( configStr ){
			var configObj = JSON.parse( configStr );
			for( var i in configObj ){
				if( configObj[i] === 0 ){
					$manager.find('input[data-idstr="'+i+'"]').attr('checked', false);
				}
				else{
					$manager.find('input[data-idstr="'+i+'"]').attr('checked', true);
				}
			}
		}
		else{
			// 用户尚未配置 或 配置被清除
		}
		
	}
	catch( err ){
		console.log('读取用户配置失败···' + err);
	}
}

function switchTabpane( idStr ){
	if( /^#[\w-]+$/.test(idStr) ){
		$('#tabs .tab-item').removeClass('active');
		$('#tab-content .tab-pane').removeClass('active');

		$('#tabs a[href="'+ idStr + '"]').parent('li').addClass('active');
		$('#tab-content ' + idStr ).addClass('active');
	}
	else{
		//do nothing;
	}
}