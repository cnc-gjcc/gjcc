 
function listenRecPopup_back(dn, agentId, agentNm, recCallId)
{
	 //청취 플레이어  키 (녹취날짜 + con_id + agentId)
		var REC_URL="http://172.17.0.17/player/player.jsp"; 
		var recParam=recCallId.split("|");
		openPopup(REC_URL+"?date="+recParam[0]+"&keycode="+recParam[1]+"&local="+recParam[2],"_player","556","590","yes","center");
 
}
 
// open popup
var openPopup = function (mypage,myname,w,h,scroll,pos){
	var win=null;
	if(pos=='random'){LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;}
	if(pos=='center'){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h-100)/2:100;}
	else if((pos!='center' && pos!='random') || pos==null){LeftPosition=0;TopPosition=0}
	
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
	win=window.open(mypage,myname,settings);
	
	//if(win==null){ alert("팝업 차단기능을 해제한 후 다시 시도해 주십시오."); }
	//if(win.focus){win.focus();}
};

/*
 * 청취팝업
 * 20200527 woo 
 * */
function listenRecPopup(g_dataObject){
	
	//기본 브라우져 != 크롬
	var REC_URL = 'http://172.17.100.100:8081/BT-VELOCE/recording/STTPlayOF.do';
	var _AutoPlay = '0';
	//접속 브라우져 체크
	var agent = navigator.userAgent.toLowerCase();
	if( agent.indexOf("chrome") != -1 ){
		REC_URL = 'http://172.17.100.100:8081/BT-VELOCE/recording/STTPlayCF.do';
		_AutoPlay = '1';
	} 
	
	console.log("***************** listenRecPopup g_dataObject***********************");
	console.log(arguments.callee.name)
	console.log(g_dataObject);
	console.log("***************** listenRecPopup g_dataObject***********************");
	
/*	
    * 파라미터 정의
	Parameter Name	설명	Nullable	Value
	Tenant_id	Tenant ID	NOT NULL	gongju
	ip	MFU IP주소	NOT NULL	172.17.100.100
	port	MFU 청취 포트	NOT NULL	기본 : 7210
	manager_id	청취자 아이디	NOT NULL	상담원 아이디
	dn_no	내선번호	NOT NULL	
	call_id	콜아이디	NOT NULL	
	rec_time	통화시작 일시	NOT NULL	YYYY-MM-DD HH:mm:ss
	AutoPlay	자동재생플래그	NOT NULL	1로 고정
	app_use	연동플래그	NOT NULL	1로 고정
*/
	var _tenant_id = "gongju";
	var _ip = '172.17.100.100';
	var _port = '7210';
	var _manager_id = g_LoginID;
	var _dn_no = g_LoginDn;
//	var recParam=recCallId.split("|");
//	var _call_id = recParam[1];
//	var _call_id = "20200528_AA4D8B28-A58A-4EB4-A003-76F72898B597_4976";
	var _call_id = g_dataObject.RECD_ID;
	var _rec_time = g_dataObject.CRT_DT_FORMAT + " " + g_dataObject.CRT_TM_FORMAT;
	var _app_use = '1';
//	var recParam=recCallId.split("|");
	openPopup(REC_URL+"?tenant_id="+_tenant_id+"&ip="+_ip+"&port="+_port+"&manager_id="+_manager_id+"&dn_no="+_dn_no+"&call_id="+_call_id+"&rec_time="+_rec_time+"&AutoPlay=0&app_use=1","_player","594","135","yes","center")
//	openPopup(REC_URL+"?date="+recParam[0]+"&keycode="+recParam[1]+"&local="+recParam[2],"_player","594","135","yes","center");
	
}

function now() {
	var date = new Date();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var i = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s);
}
