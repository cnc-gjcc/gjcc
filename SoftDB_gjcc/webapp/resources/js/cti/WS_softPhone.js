var sSoftphoneType = "";
var arBtn = new Array(10);

var g_MainConnId = ""; 
var g_ConsultConnId = "";

//기능 버튼 ID 정의
arBtn["0"] = "softphone_1";//대기
arBtn["1"] = "softphone_2";//걸기
arBtn["2"] = "softphone_3";//끊기
arBtn["3"] = "softphone_4";//보류
arBtn["4"] = "softphone_5";//협의
arBtn["5"] = "softphone_6";//3자통화
arBtn["6"] = "softphone_7";//업무
arBtn["7"] = "softphone_8";//이석
arBtn["8"] = "softphone_9";//재접속
arBtn["9"] = "softphone_10";//로그아웃

var arBtnText = new Array(10);
arBtnText["0"] = "대기";
arBtnText["1"] = "걸기";
arBtnText["2"] = "끊기";
arBtnText["3"] = "보류";
arBtnText["4"] = "협의";
arBtnText["5"] = "3자통화";
arBtnText["6"] = "업무";
arBtnText["7"] = "이석";
arBtnText["8"] = "재접속";
arBtnText["9"] = "로그아웃";

var arBtnR = new Array(8);

arBtnR["0"] = "softphone_11";      // 버스정보
arBtnR["1"] = "softphone_12";      // 즐겨찾기
arBtnR["2"] = "softphone_13";      // 조직도
arBtnR["3"] = "softphone_14";      // 행정정보
arBtnR["4"] = "softphone_15";      // sms
arBtnR["5"] = "softphone_16";      // 팩스
arBtnR["6"] = "softphone_17";      // 우편번호
//arBtnR["7"] = "softphone_18";

var arBtnRText = new Array(8);
arBtnRText["0"] = "버스정보";
arBtnRText["1"] = "즐겨찾기";
arBtnRText["2"] = "조직도";
arBtnRText["3"] = "행정정보";
arBtnRText["4"] = "sms";
arBtnRText["5"] = "팩스";
arBtnRText["6"] = "우편번호";

// not ready 상태 문구 정의
var arStateText = new Array();
arStateText["41"] = "식사";
arStateText["42"] = "교육";
arStateText["43"] = "채팅";
arStateText["44"] = "업무";
arStateText["45"] = "휴식";
arStateText["46"] = "기타";
arStateText["47"] = "미스콜";
arStateText["48"] = "콜백";

/*기존 */
//arStateText["0"] = "휴식"; //
//arStateText["1"] = "준비"; //개인
//arStateText["2"] = "식사"; //
//arStateText["3"] = "티타임"; //삭제
//arStateText["4"] = "교육"; //
//arStateText["5"] = "문자상담"; //회의
//arStateText["6"] = "상담"; //삭제
//arStateText["7"] = "업무"; // 다른업무
//arStateText["8"] = "기타"; // 개인업무
//arStateText["9"] = "수리"; // 삭제

/*수정(공주컨텍센터 2020.05.26)*/ // 좌측 상단에 출력되는 이름
arStateText["0"] = "기본";
arStateText["1"] = "식사";
arStateText["2"] = "휴식";
arStateText["3"] = "업무";

var thisdoc = document.all;
var thisform = document.forms[0];
var objState = document.getElementById( "AGENTSTATUS" );
var REASONCODE = "";
var RECKEY = "";                             // CTI에서 제공하는 Call Id

var INBOUND = 2;
var OUTBOUND = 3;
var IVR_Message = "1";  // IVR 언어별 서비스구분  1:한글, 2:영어, 3:중국어, 4:일어
var AGENT_HANGUP = "0";

var nMsgLine = 0;

var g_manualLogoutFlag = false;

var gCallStartTime = "";                      // 통화시작시간
var gCallReleaseTime = "";                    // 통화종료시간
var gCallConnectTime = "";                    // 통화연결시간

var gInitCallStartTime = "";                  // 초기 통화시작시간 

var bDialing = false;                         // Dialing 
var bCalling = false;                         // 통화중
var bReleased = true;                         // 통화종료여부

// 3자통화 종료시 (partydeleted -> released 이벤트가 발생하는데 ... connectionid 로 구분이 안된다(partydeleted 시에 connectionid 가 안온다)
// 3자통화 종료 시점에 released 이벤트가 1번만 발생하기 때문에 maincall/consultcall 이 정리가 안된다!
// released 시점에서 bConference 가 true 이면 maincall/consultcall 모두 삭제 한다.
var bConference = false;					  

var bInter = false;                         // 내선

var g_autoReadyTimer = null;
var g_getWaitCountTest = "ON";   // 테스트시 "TEST"
var g_getWaitStatus = "";
var g_ArsAuthProcess = "";
var g_ArsAuthStatus = "";
var g_ArsAuthDateTime = "";
var g_agentId= window.sessionStorage.getItem("USR_ID");
var g_holdCount=0;
var g_happyCallgb="";
var g_readyFlag=true;
var g_connStat=""; // 전화연결시 최종이 'ESTABLISHED'

var g_prevEvent="";
var g_prevTelnum="";
var gjtelno  = "";
var g_arr_UEI=[];

var g_RecSvrIP="";

var g_location={
		"isVal":"0",
		"adt" : "",
		"atm" : "",
		"qdt" : "",
		"qtm" : "",
		"telno" : "",
		"addr" : "",
		"zip" : "",
		"x" : "",
		"y" : "",
		"type" : "",
		"telcom" : "",
		"result" : ""
}



/*
90008	11000	로그인
90008	12000	대기
90008	13000	통화중
90008	14000	후처리
90008	20000	이석
90008	21041	식사
90008	21042	교육
90008	21043	미팅
90008	21044	업무
90008	21045	휴식
90008	21046	미스콜
90008	21047	콜백
*/

/* 공주시청 컨텍센터 수정_2020.06.03_Lim
90008	11000	로그인
90008	12000	대기
90008	13000	통화중
90008	14000	후처리
90008	20000	이석
90008	2100	기본	
90008	2101	식사
90008	2102	휴식
90008	2103	업무	
*/

// 업무상태코드
var LOGIN   = "11000";     // 로그인
var READY   = "12000";     // 대기
var CALLING = "13000";     // 통화중
var ABD     = "21046";     // Abandon Call/포기콜
var ACW     = "14000";     // 후처리

// NotReady 상태
var VAC  = "20000";       // 이석
var EAT  = "21041";       // 식사
var EDU  = "21042";       // 교육
var MEET = "21043";       // 미팅
var WORK = "21044";       // 업무
var REST = "21045";       // 휴식

/*
0 : 일반휴식 - 삭제
1 : 작업 - 준비
2 : 이석 - 이석
3 : 식사 - 식사
4 : 휴식 - 휴식
5 : 회의 - 채팅
6 : 교육 - 교육
7 : 다른업무 - 다른업무
8 : 개인업무 - 삭제
9 : 수리 - 삭제
*/

var currStatus = "";

function openConn() {
	console.log(arguments.callee.name);
	fnInitCTI();
}

/**
 * 통화종료중인 지를 리턴한다.
 * 
 * @returns {Boolean}
 */
function isReleased() {
	console.log(arguments.callee.name);
	return bReleased;
}

// cti 초기 설정
function ctiInit() {
	console.log(arguments.callee.name);
	try	{
		// cti id와 내선번호를 셋팅 후 서버 연결 시도
		USERID = $("#USERID").val();
		EXT = $("#EXT").val();
			
		if(USERID != "" && EXT != "") {
			openConn();
		}
	}
	catch(e) {
		alert( "error = " + e.description);
	}
}

/**
 * 사용자 업무상태 저장
 */
function fnSaveWorkStatus() 
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertWorkStatus.do",
		data : "pJson=" + getJsonStrWorkStatusInsert(),
		success : function(data)
		{
			console.log(data);
		},
		error : function(data, status, err) 
		{
			alert("업무상태 저장 실패!!");
			//networkErrorHandler(data, status, err);
		}
	});
}

var bReconnect = false;
function CBFuncEvent(data) {
	console.log(arguments.callee.name);
	
    var log = "[" + data.method + "]";
    switch (data.method) {
        case ipron.APIEvent.OPENSRVSUCCESS:
            log += " OpenServer Success. NodeId[" + data.nodeid + "]";
            fnRegister();
            break;
        case ipron.APIEvent.RINGING: // ringing
            log += " Ringing. ThisDn[" + data.thisdn + "]";
            EventRinging(data);
            break;
        case ipron.APIEvent.ESTABLISHED: // establish
            log += " Establish. ThisDn[" + data.thisdn + "]";
            EventEstablish(data);
            break;
        case ipron.APIEvent.RELEASED: //released
        	//alert("RELEASED");
            log += " Released. ThisDn[" + data.thisdn + "] ConnCnt[" + data.connectioncnt + "]";
            EventReleased(data);
            break;
        case ipron.APIEvent.DIALING: // dialing
            log += " Dialing. ThisDn[" + data.thisdn + "]";
            EventDialing(data);
            break;
        case ipron.APIEvent.ABANDONED: // abandoned
            log += " Abandoned. ThisDn[" + data.thisdn + "]";
            alert("ABANDONED");
            break;
        case ipron.APIEvent.DESTBUSY: // dest busy
            log += " DestBusy. ThisDn[" + data.thisdn + "]";
            alert("DESTBUSY");
            break;
        case ipron.APIEvent.HELD: // held
            log += " Held. ThisDn[" + data.thisdn + "]";
            EventHold();
            break;
        case ipron.APIEvent.RETRIEVED: // retrieved
            log += " Retrieved. ThisDn[" + data.thisdn + "]";
            EventUnHold();
            break;
        case ipron.APIEvent.PARTYADDED: // party added
            log += " PartyAdded. ThisDn[" + data.thisdn + "]";
            EventPartyAdded(data);
            break;
        case ipron.APIEvent.PARTYCHANGED: // party changed
            log += " PartyChanged. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.PARTYDELETED: // party deleted
            log += " PartyDeleted. ThisDn[" + data.thisdn + "]";
            EventPartyDeleted(data);
            break;
        case ipron.APIEvent.QUEUED: // queued
            log += " Queued. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.DIVERTED: // diverted
            log += " Diverted. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.ACDAGENT_LOGGEDON: // acd Login
            log += " ACD Login. ThisDn[" + data.thisdn + "] AgentID[" + data.agentid + "]";
            break;
        case ipron.APIEvent.ACDAGENT_LOGGEDOFF: // acd Logout
            log += " ACD Logout. ThisDn[" + data.thisdn + "] AgentID[" + data.agentid + "]";
            break;
        case ipron.APIEvent.ACDAGENT_NOTREADY: // acd NotReady
            log += " ACD NotReady. ThisDn[" + data.thisdn + "] AgentID[" + data.agentid + "]";
            break;
        case ipron.APIEvent.ACDAGENT_READY: // acd Ready
            log += " ACD Ready. ThisDn[" + data.thisdn + "] AgentID[" + data.agentid + "]";
            break;
        case ipron.APIEvent.ACDAGENT_WORKAFTCALL: // acd AFTCall
            log += " ACD AFTCall. ThisDn[" + data.thisdn + "] AgentID[" + data.agentid + "]";
            break;
        case ipron.APIEvent.AGENTLOGIN: // agent login
            log += " AgentLogin. AgentID[" + data.agentid + "] VoipState[" + data.voipagentstate;
            log += "] VoipStateSub[" + data.voipagentstatesub + "]";
            
            EventAgentLogin();
            break;
        case ipron.APIEvent.AGENTLOGOUT: // agent logout
            log += " AgentLogout. AgentID[" + data.agentid + "]";
            break;
        case ipron.APIEvent.AGENTREADY: // agent ready
            log += " AgentReady. AgentID[" + data.agentid + "]";
            log += " Agent State[" + data.agentstate + "] SubState[" + data.agentstatesub + "]";
            
            EventAgentReady();
            break;
        case ipron.APIEvent.AGENTNOTREADY: // agent not ready
            log += " AgentNotReady. AgentID[" + data.agentid + "]";
            log += " Agent State[" + data.agentstate + "] SubState[" + data.agentstatesub + "]";
            
            EventAgentNotReady(data.agentstatesub);
            break;
        case ipron.APIEvent.AGENTACW: // agent acw
            log += " AgentAcw. AgentID[" + data.agentid + "]";
            log += " Agent State[" + data.agentstate + "] SubState[" + data.agentstatesub + "]";
            break;
        case ipron.APIEvent.REGISTERED: // registered
            log += " Registered. ThisDn[" + data.thisdn + "]";
            log += " result[" + MakeResult(data.result) + "]";
            //alert(log);
            fnAgentLogin();		// 20200510 김문겸
            break;
        case ipron.APIEvent.UNREGISTERED: // unregistered
            log += " Unregistered. ThisDn[" + data.thisdn + "]";
            log += " result[" + MakeResult(data.result) + "]";
            break;
        case ipron.APIEvent.UPDATE_USERDATA: // update userdata
            log += " UpdateUserdata. UpdateDn[" + data.updatedn + "]";
            break;
        case ipron.APIEvent.USEREVENT: // user event
            log += " UserEvent. SenderDn[" + data.senderdn + "]";
            break;
        case ipron.APIEvent.INITIATED: // initiated
            log += " Initiated. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.AGENTINREADY: // agent in ready
            log += " AgentInReady. ThisDn[" + data.thisdn + "]";
            log += " Agent State[" + data.agentstate + "]";
            break;
        case ipron.APIEvent.AGENTOUTREADY: // agent out ready
            log += " AgentOutReady. ThisDn[" + data.thisdn + "]";
            log += " Agent State[" + data.agentstate + "]";
            break;
        case ipron.APIEvent.MEDIAPLAY: // media play
            log += " MediaPlay. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.MEDIACOLLECT: // media collect
            log += " MediaCollect. ThisDn[" + data.thisdn + "]digits[" + data.digits + "]";
            break;
        case ipron.APIEvent.BANISHMENT: // banishment
            log += " Banishment. DestDn[" + data.destdn + "]";
            break;
        case ipron.APIEvent.ACDAGENT_BUSY: // acd agent busy
            log += " AcdAgentBusy. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.MCS_REROUTE: // reroute
            log += " Reroute. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.VIRTUAL_MEDIA_CREATE: // virtual media create
            log += " VirtualMediaCreate. QueueDn[" + data.queuedn + "]";
            break;
        case ipron.APIEvent.VIRTUAL_MEDIA_DISTRIBUTE: // virtual media distribute
            log += " VirtualMediaDistribute. QueueDn[" + data.queuedn + "]";
            break;
        case ipron.APIEvent.VIRTUAL_MEDIA_DELETE: // virtual media delete
            log += " VirtualMediaDelete. QueueDn[" + data.queuedn + "]";
            break;
        case ipron.APIEvent.DEVICE_DND: // device dnd
            log += " Device DND. AgentDn[" + data.agentdn + "] AgentId[" + data.agentid + "]";
            break;
        case ipron.APIEvent.HASTATE_CHANGED: // ha state changed
            log += " HaStateChanged. HaState[" + data.hastate + "]";
            break;
        case ipron.APIEvent.AGENT_SSCRIBE_PUSH: // agent subscribe push
            log += " Agent Subscribe Push.";
            break;
        case ipron.APIEvent.GROUP_SSCRIBE_PUSH: // agent subscribe push
            log += " Group Subscribe Push.";
            break;
        case ipron.APIEvent.QUEUE_SSCRIBE_PUSH: // agent subscribe push
            log += " Queue Subscribe Push.";
            break;
        case ipron.APIEvent.TENANT_SSCRIBE_PUSH: // agent subscribe push
            log += " Tenant Subscribe Push.";
            break;
        case ipron.APIEvent.DNIS_SSCRIBE_PUSH: // agent subscribe push
            log += " Dnis Subscribe Push.";
            break;
        case ipron.APIEvent.NEW_NOTICE: // Notice
            log += " New Notice.";
            break;
        case ipron.APIEvent.CALLBACK_DISTRIBUTE: // Callback
            log += " Callback.";
            break;
        case ipron.APIEvent.MEDIA_ENABLED: //Media Enabled
            log += " Media Enabled. AgentID[" + data.agentid + "] MediaType[" + data.mediatype + "] Enable [" + data.enable + "]";
            break;
        case ipron.APIEvent.MEDIA_READY: // Media Ready
            log += " Media Ready. AgentID[" + data.agentid + "] MediaType[" + data.mediatype + "] MediaReady [" + data.mediaready + "]";
            break;
        case ipron.APIEvent.FAILED: // failed
            log += " Failed. ThisDn[" + data.thisdn + "]";
            break;
        case ipron.APIEvent.DEVICE_OUT_OF_SERVICE: // Device Out of Service
            log += " Device Out of Service. EventDn[" + data.eventdn + "]";
            break;
        case ipron.APIEvent.DEVICE_BACK_IN_SERVICE: // Device Back in Service
            log += " Device Back in Service. EventDn[" + data.eventdn + "]";
            break;
        case ipron.APIEvent.AGENTBUSY: //Agent Busy
            log += " AgentBusy. AgentID[" + data.agentid + "]";
            log += " Agent State[" + data.agentstate + "] SubState[" + data.agentstatesub + "]";
            log += " ConnectionId1[" + data.connectionid1 + "]";
            log += " ConnectionId2[" + data.connectionid2 + "]";
            break;
        case ipron.APIEvent.NODE_DR_STATE: //Agent Busy
            log += " Node Dr State. Node[" + data.nodeid + "] Down[" + data.drstate + "]";
            break;
        default:
            break;
    }

    switch (data.method) {
        case ipron.APIEvent.INITIATED: // initiated
        	g_PrevConnId = g_ConnId;
        	g_ConnId = data.connectionid;        	
        	g_ThisDn = data.thisdn;
        	g_UCID = data.ucid;
        	g_Hop = data.hop;
        	g_CallId = data.callid
        		
            break;
        case ipron.APIEvent.HELD: // held
        case ipron.APIEvent.RINGING: // ringing
        case ipron.APIEvent.ESTABLISHED: // establish
        case ipron.APIEvent.RELEASED: //released
        case ipron.APIEvent.DIALING: // dialing
        case ipron.APIEvent.DIVERTED: // diverted
        case ipron.APIEvent.RETRIEVED: // retrieved
        case ipron.APIEvent.PARTYADDED: // party added
        case ipron.APIEvent.PARTYCHANGED: // party changed
        case ipron.APIEvent.PARTYDELETED: // party delete
        case ipron.APIEvent.QUEUED: // queued
        	g_ConnId = data.connectionid;        	
        	g_ThisDn = data.thisdn;
        	g_UCID = data.ucid;
        	g_Hop = data.hop;
        	g_CallId = data.callid
            break;
        default:
            break;
    }

    AddEvent(log);

    // 재접속 관련...
    switch (data.method) {
        case ipron.APIEvent.ACTIVE_TIMEOUT:
            AddEvent("ACTIVE_TIMEOUT");
            AddEvent("Retry OpenServer...");
            bReconnect = true;
            ipron.OpenServer("GongjuApp", CBFuncEvent, CBFuncResponse);
            break;
        case ipron.WebEvent.ERR_DISCONNECT:
            AddEvent("ERR_DISCONNECT");
            AddEvent("Retry OpenServer...");
            bReconnect = true;
            ipron.OpenServer("GongjuApp", CBFuncEvent, CBFuncResponse);
            break;
        case ipron.WebEvent.ERR_OPENSERVER:
            AddEvent("ERR_OPENSERVER");
            if (bReconnect) {
                AddEvent("Retry OpenServer...");
                ipron.OpenServer("GongjuApp", CBFuncEvent, CBFuncResponse);
                break;
            }
    }

    if (data.extensionhandle > 0) {
        AddEvent(ExtensionData((data)));
    }
}

function AddEvent(str) {
	console.log(arguments.callee.name);
	console.log(str);
    var strTime;
    var now = new Date();
    strTime = "[" + leadingSpaces(now.getHours(), 2) + ":" + leadingSpaces(now.getMinutes(), 2) + ":" + leadingSpaces(now.getSeconds(), 2) + "." + leadingSpaces(now.getMilliseconds(), 3) + "] | ";
}

function leadingSpaces(n, digits) {
	console.log(arguments.callee.name);
    var space = '';
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            space += '0';
    }
    return space + n;
}
var ReportPage =null;

function CBFuncResponse(data) {
	console.log(arguments.callee.name);
    var log = "";
    var result = 0;
    
    switch (data.messagetype) {
        case ipron.MsgType.AjaxResponse:
            log += data.method + " (AJAX Response) result[" + data.result + "]";
            if (data.method == ipron.Request.OpenServer) {
                if (data.result == ipron.JSONValue.True) {
                    bReconnect = false;
                    log += " Handle[" + data.handle + "]";
                }
                else {
                    log += " Result[" + MakeOpenServerResult(data.handle) + "]";
                    if (bReconnect) {
                        AddEvent("OpenServerTry Fail...");
                        AddEvent("Retry OpenServer...");
                        setTimeout('ipron.OpenServer("GongjuApp", CBFuncEvent, CBFuncResponse)', 3000);
                        break;
                    }
                }
            }

            break;
        case ipron.MsgType.ICResponse:
            log += "[" + data.method + "]";
            switch (data.method) {
                case ipron.APIMethod.REGIADDR_RES: // register
                    log += " RegisterRes. Result[" + MakeResult(data.result) + "]";
                    if(data.result != 0) {
//                    	alert(window.sessionStorage.getItem("EXTN_NO") + " Register 실패!");
                    	alert("소프트폰에 등록된 번호가 없습니다. [소프트폰번호 : "+window.sessionStorage.getItem("EXTN_NO")+" ]");
                    }
                    break;
                case ipron.APIMethod.UNREGIADDR_RES: // unregister
                    log += " UnregisterRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GROUP_REGIADDR_RES: // groupregister
                    log += " GroupRegisterRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GROUP_UNREGIADDR_RES: // groupunregister
                    log += " GroupUnregisterRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MAKECALL_RES: // make call
                    log += " MakeCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.ANSWERCALL_RES: // Answer Call
                    log += " AnswerCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.CLEARCALL_RES: // clear call
                    log += " ClearCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.HOLDCALL_RES: // hold call
                    log += " HoldCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.HOLDCALL_EX_RES: // hold call Ex
                    log += " HoldCallExRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.RETRIEVECALL_RES: // retrieve call
                    log += " RetrieveCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.JOINCALL_RES: // join call
                    log += " JoinCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GRPICKUP_RES: // group pickup
                    log += " GroupPickupRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.QUEUE_PICKUP_RES: // queue pickup
                    log += " QueuePickupRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SINGLESTEP_TRANSFER_RES: // singlestep transfer
                    log += " SinglestepTransferRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MUTE_TRANSFER_RES: // mute transfer
                    log += " MuteTransferRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SINGLESTEP_CONFERENCE_RES: // singlestep conference
                    log += " SinglestepConferenceRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.CONFERENCE_RES: // mute conference call
                    log += " MuteConferenceRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.DEFLECTCALL_RES: // deflect call
                    log += " DeflectCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MCS_REROUTE_RES: // mcs reroute
                    log += " McsRerouteRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETCONNECTION_RES: // get connection
                    log += " GetConnectionRes. Result[" + MakeResult(data.result) + "]";
                    log += " ConnectionId1[" + data.connectionid1 + "]";
                    log += " ConnectionId2[" + data.connectionid2 + "]";
                    break;
                case ipron.APIMethod.AGENTLOGIN_RES: // agent login
                    log += " AgentLoginRes. Result[" + MakeResult(data.result) + "]";
                    if(data.result != 0) {
                    	alert("CTI 로그인 실패" + " (" + MakeResult(data.result) + ") !! \n\n담당자에게 문의하세요." );
                    }
                    break;
                case ipron.APIMethod.ADNLOGIN_RES: // adn agent login
                    log += " AdnLoginRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.AGENTLOGOUT_RES: // agent logout
                    log += " AgentLogoutRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETSTATE_SUBCODE_RES: // get state sub code
                    log += " GetStateSubcodeRes. Result[" + MakeResult(data.result) + "]";
                    GetStateSubCode(data.extensionhandle);
                    break;
                case ipron.APIMethod.GETROUTEABLE_RES: // get routeable
                    log += " GetRouteableRes. Result[" + MakeResult(data.result) + "]";
                    if (data.result == 0)
                        log += " 통화 가능";
                    else
                        log += " 통화 불가능";
                    break;
                case ipron.APIMethod.UPDATE_USERDATA_RES: // update userdata
                    log += " UpdateUserdataRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.DELETE_KEY_USERDATA_RES: // delete key userdata 
                    log += " DeleteKeyUserdataRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.DELETE_ALL_USERDATA_RES: // delete all userdata 
                    log += " DeleteAllUserdataRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SEND_USEREVENT_RES: // send user event 
                    log += " SendUserEventRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GET_USERDATA_RES: // get userdata 
                    log += " GetUserdataRes. Result[" + MakeResult(data.result) + "]";
                    log += " Conn ID [" + data.connectionid + "]";
                    log += " "
                    break;
                case ipron.APIMethod.GETCONNSTATE_RES: // get conn state 
                    log += " GetConnStateRes. Result[" + MakeResult(data.result) + "]";
                    log += " Conn ID [" + data.connectionid + "]";
                    log += " State [" + MakeICConnectionState(data.connectionstate) + "]";
                    break;
                case ipron.APIMethod.SET_ANI_USERDATA_RES: // set ani userdata 
                    log += " SetAniUserdataRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SET_UCID_USERDATA_RES: // set ucid userdata 
                    log += " SetUcidUserdataRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SETAGENTSTATE_RES: // set agent state 
                    log += " SetAgentStateRes. Result[" + MakeResult(data.result) + "]";
                    log += " State [" + MakeAgentStateString(data.agentstate) + "]";
                    log += " State Sub [" + data.agentstatesub + "]";
                    break;
                case ipron.APIMethod.SETAGENTSTATE_DATA_RES: // set agent state data
                    log += " SetAgentStateDataRes. Result[" + MakeResult(data.result) + "]";
                    log += " State [" + MakeAgentStateString(data.agentstate) + "]";
                    log += " State Sub [" + data.agentstatesub + "]";
                    break;
                case ipron.APIMethod.GETAGENTSTATE_RES: // get agent state 
                    log += " GetAgentStateRes. Result[" + MakeResult(data.result) + "]\n";
                    var arrMedia = data.mediaset.split('-');
                    for (var i = 0; i < arrMedia.length; i++) {
                        switch (arrMedia[i]) {
                            case '0':
                                log += "Voice State [" + MakeAgentStateString(data.voipagentstate) + "]";
                                log += "Voice State Sub [" + data.voipagentstatesub + "]\n";
                                break;
                            case '10':
                                log += "Chat State [" + MakeAgentStateString(data.chatagentstate) + "]";
                                log += "Chat State Sub [" + data.chatagentstatesub + "]\n";
                                break;
                            case '20':
                                log += "VVoice State [" + MakeAgentStateString(data.vvoiceagentstate) + "]";
                                log += "VVoice State Sub [" + data.vvoiceagentstatesub + "]\n";
                                break;
                            case '30':
                                log += "VChat State [" + MakeAgentStateString(data.vchatagentstate) + "]";
                                log += "VChat State Sub [" + data.vchatagentstatesub + "]\n";
                                break;
                            case '40':
                                log += "email State [" + MakeAgentStateString(data.emailagentstate) + "]";
                                log += "email State Sub [" + data.emailagentstatesub + "]\n";
                                break;
                            case '50':
                                log += "FAX State [" + MakeAgentStateString(data.faxagentstate) + "]";
                                log += "FAX State Sub [" + data.faxagentstatesub + "]\n";
                                break;
                            case '61':
                                log += "MVOIP State [" + MakeAgentStateString(data.mvoipagentstate) + "]";
                                log += "MVOIP State Sub [" + data.mvoipagentstatesub + "]\n";
                                break;
                            case '80':
                                log += "SMS State [" + MakeAgentStateString(data.smsagentstate) + "]";
                                log += "SMS State Sub [" + data.smsagentstatesub + "]\n";
                                break;
                        }
                    }
                    break;
                case ipron.APIMethod.SETAFTCALLSTATE_RES: // set aft state 
                    log += " SetAftCallStateRes. Result[" + MakeResult(data.result) + "]";
                    log += " State [" + MakeAgentStateString(data.agentstate) + "]";
                    log += " State Sub [" + data.agentstatesub + "]";
                    break;
                case ipron.APIMethod.SETAFTCALLSTATE_EX_RES: // set aft state Ex
                    log += " SetAftCallStateExRes. Result[" + MakeResult(data.result) + "]";
                    log += " State Inbound [" + MakeAgentStateString(data.inboundagentstate) + "]";
                    log += " State Sub Inbound [" + data.inboundagentstatesub + "]";
                    log += " State Outbound [" + MakeAgentStateString(data.outboundagentstate) + "]";
                    log += " State Sub Outbound [" + data.outboundagentstatesub + "]";
                    break;
                case ipron.APIMethod.SETSKILL_ENABLE_RES: // set skill enable
                    log += " SetSkillEnableRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.FORCE_SETAGTSTATE_RES: // force set agent state 
                    log += " ForceSetAgentStateRes. Result[" + MakeResult(data.result) + "]";
                    log += " State [" + MakeAgentStateString(data.agentstate) + "]";
                    log += " State Sub [" + data.agentstatesub + "]";
                    break;
                case ipron.APIMethod.GETGROUPLIST_RES: // get group list 
                    log += " GetGroupListRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.GroupList(data.extensionhandle);
                    break;
                case ipron.APIMethod.GETQUEUELIST_RES: // get queue list 
                    log += " GetQueueListRes. Result[" + MakeResult(data.result) + "]";
                    var handle = data.extensionhandle;
                    g_QueueDnSet=QueueList(handle);
                    
                    //ReportPage.QueueList(data.extensionhandle);
                    break;
                case ipron.APIMethod.GETAGENTLIST_RES: // get agent list 
                    log += " GetAgentListRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.AgentList(data.extensionhandle);
                    break;
                case ipron.APIMethod.GETAGENTINFO_RES: // get agent info 
                    log += " GetAgentInfoRes. Result[" + MakeResult(data.result) + "]";
                    if (ReportPage != null) {
                        var str = "";
                        str += "Tenant Name : " + data.tenantname + "\n";
                        str += "상태 : \n";
                        str += "Voice State [" + MakeAgentStateString(data.voipagentstate) + "] ";
                        str += "Voice State Sub [" + data.voipagentstatesub + "]\n";
                        str += "Chat State [" + MakeAgentStateString(data.chatagentstate) + "] ";
                        str += "Chat State Sub [" + data.chatagentstatesub + "]\n";
                        str += "VVoice State [" + MakeAgentStateString(data.vvoiceagentstate) + "] ";
                        str += "VVoice State Sub [" + data.vvoiceagentstatesub + "]\n";
                        str += "VChat State [" + MakeAgentStateString(data.vchatagentstate) + "] ";
                        str += "VChat State Sub [" + data.vchatagentstatesub + "]\n";
                        str += "email State [" + MakeAgentStateString(data.emailagentstate) + "] ";
                        str += "email State Sub [" + data.emailagentstatesub + "]\n";
                        str += "FAX State [" + MakeAgentStateString(data.faxagentstate) + "] ";
                        str += "FAX State Sub [" + data.faxagentstatesub + "]\n";
                        str += "MVOIP State [" + MakeAgentStateString(data.mvoipagentstate) + "] ";
                        str += "MVOIP State Sub [" + data.mvoipagentstatesub + "]\n";
                        str += "SMS State [" + MakeAgentStateString(data.smsagentstate) + "] ";
                        str += "SMS State Sub [" + data.smsagentstatesub + "]\n";
                        str += "조회 대상 DN : " + data.destdn + "\n";
                        str += "조회 대상 ID : " + data.destagentid + "\n";
                        str += "이름 : " + data.agentname + "\n";
                        str += "Agent Position : " + data.agentposition + "\n";
                        str += "Agent Level : " + data.agentlevel + "\n";
                        ReportPage.AddReportOutput(str);
                    }
                    break;
                case ipron.APIMethod.GETAGENTINFO_EX_RES: // get agent info Ex
                    log += " GetAgentInfoExRes. Result[" + MakeResult(data.result) + "]";
                    if (ReportPage != null) {
                        var str = "";
                        str += "Tenant Name : " + data.tenantname + "\n";
                        str += "상태 : \n";
                        str += "Voice State [" + MakeAgentStateString(data.voipagentstate) + "] ";
                        str += "Voice State Sub [" + data.voipagentstatesub + "]\n";
                        str += "Chat State [" + MakeAgentStateString(data.chatagentstate) + "] ";
                        str += "Chat State Sub [" + data.chatagentstatesub + "]\n";
                        str += "VVoice State [" + MakeAgentStateString(data.vvoiceagentstate) + "] ";
                        str += "VVoice State Sub [" + data.vvoiceagentstatesub + "]\n";
                        str += "VChat State [" + MakeAgentStateString(data.vchatagentstate) + "] ";
                        str += "VChat State Sub [" + data.vchatagentstatesub + "]\n";
                        str += "email State [" + MakeAgentStateString(data.emailagentstate) + "] ";
                        str += "email State Sub [" + data.emailagentstatesub + "]\n";
                        str += "FAX State [" + MakeAgentStateString(data.faxagentstate) + "] ";
                        str += "FAX State Sub [" + data.faxagentstatesub + "]\n";
                        str += "MVOIP State [" + MakeAgentStateString(data.mvoipagentstate) + "] ";
                        str += "MVOIP State Sub [" + data.mvoipagentstatesub + "]\n";
                        str += "SMS State [" + MakeAgentStateString(data.smsagentstate) + "] ";
                        str += "SMS State Sub [" + data.smsagentstatesub + "]\n";
                        str += "조회 대상 DN : " + data.destdn + "\n";
                        str += "조회 대상 ID : " + data.destagentid + "\n";
                        str += "이름 : " + data.agentname + "\n";
                        str += "Agent Position : " + data.agentposition + "\n";
                        str += "Agent Level : " + data.agentlevel + "\n";
                        str += "Agent Alias : " + data.agentalias + "\n";
                        switch (data.agentpwdencryptkind) {
                            case 1:
                                str += "Agent PwdEncryptType : SHA-1 \n";
                                break;
                            case 2:
                                str += "Agent PwdEncryptType : SHA-256 \n";
                                break;
                            case 5:
                                str += "Agent PwdEncryptType : SHA-512 \n";
                                break;
                        }
                        str += "Agent PwdChgDate : " + data.agentpwdchgdate + "\n";
                        ReportPage.AddReportOutput(str);
                    }
                    break;
                case ipron.APIMethod.GETCATEGORYLIST_RES: // get category list
                    ReportPage.CategoryList(data.extensionhandle);
                    break;
                case ipron.APIMethod.GETCATEGORYINFO_RES: // get category info
                    ReportPage.CategoryInfo(data);
                    break;
                case ipron.APIMethod.GETAGENT_SKILLLIST_RES: // get agent skill list 
                    log += " GetAgentSkillListRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.AgentSkillList(data.extensionhandle);
                    break;
                case ipron.APIMethod.GETAGENT_QUEUELIST_RES: // get agent queue list 
                    log += " GetAgentQueueListRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.AgentQueueList(data.extensionhandle);
                    break;
                case ipron.APIMethod.BSR_RES: // bsr 
                    log += " BsrRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.BsrList(data.thisdn, data.queuedn, data.destdn, data.nodeid, data.bsrvalue, data.bsrprefix);
                    break;
                case ipron.APIMethod.GETQUEUETRAFFIC_RES: // get queue traffic 
                    log += " GetQueueTrafficRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.QueueTraffic(data.svclvltime, data.svclevel, data.waitcount, data.allagentcount, data.loginagentcount, data.readyagentcount, data.inbusyagentcount, data.outbusyagentcount,
                                            data.aftworkagentcount, data.notreadyagentcount, data.ringingcount, data.inboundtotal, data.accepttotal, data.abandontotal, data.transbackup,
                                            data.answercountavr, data.talktimecountavr, data.waittime, data.maxwaittime, data.minwaittime, data.waittimeavr, data.waittimesum, data.distributewaitcount);
                    break;
                case ipron.APIMethod.GETQUEUEORDER_RES: // get queue order 
                    log += " GetQueueOrderRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.GetQueueOrder(data.waitcount);
                    break;
                case ipron.APIMethod.GETQUEUEORDER_EX_RES: // get queue order ex
                    log += " GetQueueOrderExRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.GetQueueOrderEx(data.localwaitcount, data.bsrwaitcount);
                    break;
                case ipron.APIMethod.AGENT_REPORT_RES: // agent report 
                    log += " AgentReportRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.AgentReport(data.intotal, data.insuccess, data.intalktime, data.outtotal, data.outsuccess, data.outtalktime, data.transfercalls, data.logintime,
                                           data.logouttime, data.inintsuc, data.inextsuc, data.inconsuc, data.outintsuc, data.outextsuc, data.outconsuc, data.ringingtime, data.dialingtime,
                                           data.readytime, data.notreadytime, data.acwtime);
                    break;
                case ipron.APIMethod.GROUP_REPORT_RES: // group report 
                    log += " GroupReportRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.GroupReport(data);
                    break;
                case ipron.APIMethod.QUEUE_REPORT_RES: // queue report 
                    log += " QueueReportRes. Result[" + MakeResult(data.result) + "]";
                    fnInwaitCount(data.waitcount);
                    //ReportPage.QueueReport(data);
                    break;
                case ipron.APIMethod.TENANT_REPORT_RES: // tenant report 
                    log += " TenantReportRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.TenantReport(data);
                    break;
                case ipron.APIMethod.DNIS_REPORT_RES: // dnis report 
                    log += " DnisReportRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.DnisReport(data.inboundtotal, data.abandontotal, data.agttry, data.agttryabandon, data.rejecttotal, data.accepttotal, data.nonsvctotal, data.ivrsvccount, data.waitcount, data.inbusyagentcount, data.ivragtconfcount)
                    break;
                case ipron.APIMethod.MEDIA_ATTACH_RES: // media attach 
                    log += " MediaAttachtRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MEDIA_DEATTACH_RES: // media detach 
                    log += " MediaDetachRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MEDIA_PLAY_RES: // media play 
                    log += " MediaPlayRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MEDIA_COLLECT_RES: // media collect 
                    log += " MediaCollectRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.AGENT_SUBSCRIBE_RES: // agent subscribe 
                    log += " AgentSubscribeRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GROUP_SUBSCRIBE_RES: // group subscribe 
                    log += " GroupSubscribeRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.QUEUE_SUBSCRIBE_RES: // queue subscribe 
                    log += " QueueSubscribeRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.TENANT_SUBSCRIBE_RES: // tenant subscribe 
                    log += " TenantSubscribeRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.DNIS_SUBSCRIBE_RES: // dnis subscribe 
                    log += " DnisSubscribeRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.CLOSE_SUBSCRIBE_RES: // close subscribe
                    log += " CloseSubscribeRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETAGENTLIST_EX_RES: // get agent list ex
                    log += " AdGetAgentListRes. Result[" + MakeResult(data.result) + "]";
                    AdvanceListPage.SetList(data.method, data.advanceListHandle);
                    break;
                case ipron.APIMethod.GETGROUPLIST_EX_RES: // get group list ex
                    log += " AdGetGroupListRes. Result[" + MakeResult(data.result) + "]";
                    AdvanceListPage.SetList(data.method, data.advanceListHandle);
                    break;
                case ipron.APIMethod.GETQUEUELIST_EX_RES: // get queue list ex
                    log += " AdGetQueueListRes. Result[" + MakeResult(data.result) + "]";
                    AdvanceListPage.SetList(data.method, data.advanceListHandle);
                    break;
                case ipron.APIMethod.GETAGENT_SKILLLIST_EX_RES: // get agent skill list ex
                    log += " AdGetAgentSkillListRes. Result[" + MakeResult(data.result) + "]";
                    AdvanceListPage.SetList(data.method, data.advanceListHandle);
                    break;
                case ipron.APIMethod.GETAGENT_QUEUELIST_EX_RES: // get agent queue list ex
                    log += " AdGetAgentQueueListRes. Result[" + MakeResult(data.result) + "]";
                    AdvanceListPage.SetList(data.method, data.advanceListHandle);
                    break;
                case ipron.APIMethod.DTMF_PLAY_RES: // Dtmf Play
                    log += " DtmfPlayRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.VIRTUAL_QUEUE_RES:
                    log += " VirtualQueueRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SET_CALLBACK_RES:
                    log += " SetCallbackRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.MEDIA_DND_RES:
                    log += " MediaDndRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.RESERVED_AGENT_STATE_RES:
                    log += " ReservedAgentStateRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SEND_GLOBAL_EVENT_RES:
                    log += " SendGlobalEventRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.AGENTCALL_RES:
                    log += " AgentCallRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GET_MEDIA_ACTIVATE_RES:
                    log += " GetMediaRes. Result[" + MakeResult(data.result) + "]" + "\n";
                    log += " Chat Activate : " + data.chatactivate;
                    log += " VVoice Activate : " + data.vvoiceactivate;
                    log += " VChat Activate : " + data.vchatactivate;
                    log += " Email Activate : " + data.emailactivate;
                    log += " Fax Activate : " + data.faxactivate;
                    log += " Voip Activate : " + data.voipactivate;
                    log += " MVoip Activate : " + data.mvoipactivate;
                    log += " SMS Activate : " + data.smsactivate;
                    break;
                case ipron.APIMethod.GETROUTEPOLICY_RES:
                    log += "GetRoutePolicy. Result[" + MakeResult(data.result) + "]" + "\n";
                    switch (data.routepolicy) {
                        case 0:
                            log += "정책적으로 호 분배가 가능하지 않음";
                            break;
                        case 1:
                            log += "정책적으로 호 분배가 가능하고 현재 즉시 수신 가능한 상태";
                            break;
                        case 2:
                            log += "정책적으로 호 분배가 가능하지만 현재는 수신 할 수 없는 상태";
                            break;
                    }
                    break;
                case ipron.APIMethod.SET_MEDIAREADY_STATE_RES:
                    log += " SetMediaReadyStateRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GET_MEDIAREADY_STATE_RES:
                    log += " GetMediaReadyStateRes. Result[" + MakeResult(data.result) + "] AgentID[" + data.agentid + "] MediaType["
                     + data.mediatype + "] MediaReady [" + data.mediaready + "]";
                    break;
                case ipron.APIMethod.GET_USER_CDR_RES:
                    log += " GetUserCdrRes. Result[" + MakeResult(data.result) + "] Conn ID[" + data.connectionid + "] UserCdr[" + data.usercdr + "] PrivateData[" + data.privatedata + "]";
                    break;
                case ipron.APIMethod.SET_USER_CDR_RES:
                    log += " GetUserCdrRes. Result[" + MakeResult(data.result) + "] Conn ID[" + data.connectionid + "] UserCdr[" + data.usercdr + "] PrivateData[" + data.privatedata + "]";
                    break;
                case ipron.APIMethod.GET_USER_CDR_EX_RES:
                    log += " GetUserCdrExRes. Result[" + MakeResult(data.result) + "] Conn ID[" + data.connectionid + "] UserCdr[" + data.usercdr + "] PrivateData[" + data.privatedata + "]";
                    break;
                case ipron.APIMethod.SET_USER_CDR_EX_RES:
                    log += " SetUserCdrExRes. Result[" + MakeResult(data.result) + "] Conn ID[" + data.connectionid + "] UserCdr[" + data.usercdr + "] PrivateData[" + data.privatedata + "]";
                    break;
                case ipron.APIMethod.SET_MUTE_ENABLE_RES:
                    log += " SetDeviceMuteEnableRes. Result[" + MakeResult(data.result) + "] This DN [" + data.thisdn + "] Conn ID[" + data.connectionid + "] PrivateData[" + data.privatedata;
                    log += "] Media Type [" + data.mediatype + "] Enable [" + data.enable + "]";
                    break;
                case ipron.APIMethod.RESERVE_IR_ATTR_RES:
                    log += " ReserveIrAttrRes. Result[" + MakeResult(data.result) + "] Ani[" + data.aninumber + "] PrivateData[" + data.privatedata;
                    log += "] Media Type [" + data.mediatype + "]";
                    break;
                case ipron.APIMethod.FIND_WAIT_IR_RES:
                    log += " FindWaitIrRes. Result[" + MakeResult(data.result) + "] Ani [" + data.aninumber + "] PrivateData[" + data.privatedata + "]";
                    break;
                case ipron.APIMethod.GETCONNECTION_EX_RES:
                    log += " GetConnectionExRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETCALL_INFO_RES:
                    log += " GetCallInfoRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETCATEGORY_LIST_RES:
                    log += " GetCategoryListRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETCATEGORY_INFO_RES:
                    log += " GetCategoryInfoRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GETAGENT_MASTERQUEUEINFO_RES:
                    log += " GetAgentMasterQueueInfo. Result[" + MakeResult(data.result) + "] QueueDN [" + data.queuedn + "] QueueId [" + data.queueid + "] QueueName [" + data.queuename + "] SkillId [" + data.skillid + "] SkillName [" + data.skillname + "]";
                    break;
                case ipron.APIMethod.GET_DEVICE_ACTIVATE_RES:
                    log += " GetDeviceActivate. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.SET_USER_CDR_V5_RES:
                    log += " SetUserCdrV5Res. Result[" + MakeResult(data.result) + "] Conn ID[" + data.connectionid + "] UserCdrType[" + data.usercdrtype + "] UserCdrIndex[" + data.usercdrindex + "] UserCdr[" + data.usercdr + "] PrivateData[" + data.privatedata + "]";
                    break;
                case ipron.APIMethod.MUTE_TRANSFER_EX_RES: // mute transfer
                    log += " MuteTransferExRes. Result[" + MakeResult(data.result) + "]";
                    break;
                case ipron.APIMethod.GET_MEDIA_OPTION_RES:
                    log += " GetMediaOptionRes. Result[" + MakeResult(data.result) + "] TenantName [" + data.tenantname + "] AgentId [" + data.agentid + "]\n";
                    log += "ChatWeight[" + data.chatweight + "] ChatMax[" + data.chatmax + "]\n";
                    log += "VVoiceWeight[" + data.vvoiceweight + "] VVoiceMax[" + data.vvoicemax + "]\n";
                    log += "VChatWeight[" + data.vchatweight + "] VChatMax[" + data.vchatmax + "]\n";
                    log += "EMailWeight[" + data.emailweight + "] EMailMax[" + data.emailmax + "]\n";
                    log += "FaxWeight[" + data.faxweight + "] FaxMax[" + data.faxmax + "]\n";
                    log += "VoipWeight[" + data.voipweight + "] VoipMax[" + data.voipmax + "]\n";
                    log += "MVoipWeight[" + data.mvoipweight + "] MVoipMax[" + data.mvoipmax + "]\n";
                    log += "WebWeight[" + data.webweight + "] WebMax[" + data.webmax + "]\n";
                    break;
                case ipron.APIMethod.SET_MEDIA_OPTION_RES:
                    log += " SetMediaOptionRes. Result[" + MakeResult(data.result) + "] TenantName [" + data.tenantname + "] AgentId [" + data.agentid + "] MediaSet[" + data.mediaset + "] AgtMediaWeight[" + data.agtmediaweight + "] AgtMediaMax[" + data.agtmediamax + "]";
                    break;
                case ipron.APIMethod.GET_GROUPSKILL_LIST_RES: // get agent skill list 
                    log += " GetGroupSkillListRes. Result[" + MakeResult(data.result) + "]";
                    ReportPage.GroupSkillList(data.extensionhandle);
                    break;
            }
            break;
        default:
            break;
    }
  
    AddResponse(log);

    if (data.extensionhandle > 0)
        AddResponse(ExtensionData((data)));
}

function AddResponse(log) {
	console.log(log);
}

function MakeResult(result) {
	console.log(arguments.callee.name);
    var str;

    switch (result) {
    case 0: str = "성공"; break;
    case 1001: str = "이미 사용중"; break;
    case 1002: str = "발견하지 못함"; break;
    case 1003: str = "라이센스 초과"; break;
    case 1004: str = "여유공간 초과"; break;
    case 1005: str = "유효하지 않은 상태"; break;
    case 1006: str = "이미 처리중"; break;
    case 1007: str = "이미 할당됨"; break;
    case 1008: str = "부정확한 정보"; break;
    case 2000: str = "IC Server와 Version 정보가 일치 하지 않습니다"; break;
    case 2001: str = "사용중인 Device"; break;
    case 2002: str = "사용중인 사용자"; break;
    case 2003: str = "비 수신대기인 사용자"; break;
    case 2004: str = "통화중인 Device"; break;
    case 2101: str = "Device  찾을 수 없음"; break;
    case 2102: str = "App ID 찾을 수 없음"; break;
    case 2103: str = "Tenant 찾을 수 없음"; break;
    case 2104: str = "Mornitor ID 찾을 수 없음"; break;
    case 2105: str = "사용자 찾을 수 없음"; break;
    case 2106: str = "Group 찾을 수 없음"; break;
    case 2107: str = "Queue 찾을 수 없음"; break;
    case 2108: str = "Skill 찾을 수 없음"; break;
    case 2109: str = "사유코드 찾을 수 없음"; break;
    case 2110: str = "Connection 찾을 수 없음"; break;
    case 2111: str = "Call 찾을 수 없음"; break;
    case 2112: str = "DNIS 찾을 수 없음"; break;
    case 2113: str = "UCID 찾을 수 없음"; break;
    case 2114: str = "Media ID 찾을 수 없음"; break;
    case 2115: str = "Subscribe ID 찾을 수 없음"; break;
    case 2116: str = "GroupSkill 찾을 수 없음"; break;
    case 2201: str = "시스템 라이선스 Full"; break;
    case 2202: str = "Tenant 라이선스 Full"; break;
    case 2203: str = "Connection 개수 Full"; break;
    case 2301: str = "Device 개수 초과"; break;
    case 2302: str = "UserData 허용 크기 초과"; break;
    case 2303: str = "Virtual Media 허용 크기 초과"; break;
    case 2304: str = "UserCdr 허용 크기 초과"; break;
    case 2401: str = "유효하지 않는 App ID"; break;
    case 2402: str = "유효하지 않는 사용자 상태"; break;
    case 2403: str = "유효하지 않는 Device 상태"; break;
    case 2404: str = "유효하지 않는 사유 코드"; break;
    case 2405: str = "유효하지 않는 Connection"; break;
    case 2406: str = "유효하지 않는 UCID"; break;
    case 2407: str = "유효하지 않는 Option"; break;
    case 2501: str = "올바르지 않은 범위"; break;
    case 2502: str = "올바르지 않은 패스워드"; break;
    case 2503: str = "올바르지 않은 Device"; break;
    case 2504: str = "올바르지 않은 사용자"; break;
    case 2505: str = "올바르지 않은 상태코드"; break;
    case 2506: str = "올바르지 않은 Call	"; break;
    case 2601: str = "지원하지 않는 Media Type"; break;
    case 2701: str = "MCS Unknown Consult 실패"; break;
    case 2702: str = "MCS Busy Consult 실패"; break;
    case 2703: str = "MCS NoAnswer Consult 실패"; break;
    case 2704: str = "MCS Select Consult 실패"; break;
    case 2705: str = "MCS UserAbort Consult 실패"; break;
    case 2706: str = "MCS Reconnect 실패"; break;
    case 2707: str = "MCS Transfer 실패"; break;
    case 2708: str = "MCS Unknown SGTransfer 실패"; break;
    case 2709: str = "MCS Busy SGTransfer 실패"; break;
    case 2710: str = "MCS NoAnswer SGTransfer 실패"; break;
    case 2711: str = "MCS Select SGTransfer 실패"; break;
    case 2712: str = "MCS UserAbort SGTransfer 실패"; break;
    case 2713: str = "MCS Unknown Reroute 실패"; break;
    case 2714: str = "MCS Busy Reroute 실패"; break;
    case 2715: str = "MCS NoAnswer Reroute 실패"; break;
    case 2716: str = "MCS Select Reroute 실패"; break;
    case 2717: str = "MCS UserAbort Reroute 실패"; break;
    case 2801: str = "BSR 무효"; break;
    case 2802: str = "BSR 찾을 수 없음"; break;
    case 2803: str = "Node In Service"; break;
    case 2804: str = "Node Out Service"; break;
    case -1: str = "Register 된 DN를 찾지 못하였습니다"; break;
    case -2: str = "Socket 연결이 끊겼습니다"; break;
    case -3: str = "Out형 변수의 값이 NULL 입니다"; break;
    case -4: str = "DN 값이 잘못된 형식입니다.(DN 은 0~9, *, # 문자만 가능합니다"; break;
    case -5: str = "Password 암호화 실패"; break;
    case -6: str = "소켓 에러"; break;
    case -7: str = "데이터 전송 실패"; break;
    case -8: str = "Event 대기 실패"; break;
    case -9: str = "Response 실패"; break;
    case -10: str = "Thread 생성 실패"; break;
    case -11: str = "이미 연결 되어 있음"; break;
    case -12: str = "핸들값 에러"; break;
    case -13: str = "Extension Data 처리 오류"; break;
    case -14: str = "데이터 전송 실패"; break;
    case -15: str = "Thread Stop 실패"; break;
    case -16: str = "대기 시간 초과"; break;
    case -17: str = "Memory 할당 실패"; break;
    case -18: str = "보내려는 패킷크기가 너무 큽니다"; break;
    case -19: str = "재접속 시도중입니다"; break;
    case -20: str = "OpenServer 최대 개수 초과"; break;
    case -21: str = "입력값 중에 NULL값 또는 잘못된 데이터가 있습니다"; break;
    case -22: str = "이미 연결되어 있는 Socket 의 IP와 지금 연결 하려는 IP 정보가 다릅니다"; break;
    case -23: str = "OCX의 Event 를 전달 받을 HWND 핸들이 없습니다"; break;
    case -24: str = "IC Server 와 Interface Version 이 다릅니다"; break;
        default: str = "알수 없는 에러 코드 : [" + result.toString() + "]"; break;
    }

    return str;
}



function EventAgentLogin() { // 로그인 상태 저장 - oh022
	console.log(arguments.callee.name);
	var textState = "로그인";
	arState = new Array( "2", "2", "3", "3", "3", "3", "2", "2", "2", "2"); // "대기", "걸기", "끊기", "보류", "협의", "3자통화", "업무", "이석", "재접속", "로그아웃"
	$("#mainTopCtiStatus").html("ON");
	bDialing = false;
	bReleased = true;
	bCalling = false;
	currStatus = "로그인";//g_DefaultAgentMainState;
	
	fnSaveWorkStatus();
	
	ButtonControl(textState);
}

function EventAgentReady() { // 대기 상태 저장 - oh022
	console.log(arguments.callee.name);
	$("#tfMainTicketId").val("");   // 대기상태로 변경할 경우 TicketId 초기화
	var textState = "대기";
	
	g_connStat="READY";
	
	currStatus = "대기"; // 상태값 usr_stat_cd _2020.06.03_Lim
	
	arState = new Array( "1", "2", "3", "3", "3", "3", "2", "2", "2", "2");
	fnSaveWorkStatus();
	
	ButtonControl(textState);
}


function EventAgentNotReady(REASONCODE) { // 이석 상태 저장 - oh022
	console.log(arguments.callee.name);
	var textState = arStateText[REASONCODE];
	
	currStatus = textState;//jsonObj['STATUS_CD'];
	
	console.log("currStatus : " + currStatus);
	
	fnSaveWorkStatus();
	
	arState = new Array( "2", "2", "3", "3", "3", "3", "2", "1", "2", "2");
	
	//fnGetWaitCount(g_getWaitCountTest);
	g_getWaitStatus="run";
	g_readyFlag = true; //대기버튼 바로동작
	
	ButtonControl(textState);
}


function removePrefix(telnumber)
{
	console.log(arguments.callee.name);
	if(telnumber == null || telnumber == "") {
		return "";
	};

	if (telnumber.length > 4 && telnumber.charAt(0) == '9') {
		telnumber = telnumber.substring(1);
	}

	return telnumber;
}

function EventRinging(data) { // 인바운드 초기 함수
	console.log(arguments.callee.name);
	/*
	if(g_MainConnId != "" || g_ConsultConnId != "") {
		// main call 또는 consult call 이 통화중인데 Ring 이 울리는 것은 잘못된 것!
		ipron.ClearCall(g_LoginDn, data.connectionid, 0, 0);
		return;
	}
	*/
	// 벨울림이 발생할 수 있는 상황은 main call/consult call 이 모두 종료된 상태 이다.
	g_MainConnId = "";
	g_ConsultConnId = "";
	
	g_MainConnId = data.connectionid;	
	
	arState = new Array( "3", "3", "3", "3", "3", "3", "3", "3", "2", "2");	
	var telNo ="";                                                  // 인입 전화번호
	var callGb = ""; // 콜구분
	var call_type = data.calltype; //jsonObj['CALL_TYPE'];
	if(call_type=="4"){
		callType ="1";
		if(!jsonObj['MESSAGE']){
			telNo = "01000000000";
		}else{
			telNo = jsonObj['MESSAGE'];
			g_prevTelnum=telNo;
		}
		callGb   = "내선 호전환";
	}else{
		callType = data.calltype; //jsonObj['CALL_TYPE'];// Call Type  1:내선통화, 2:인바운드 , 3:아웃바운드 
		if(data.ani != "") {
			telNo = data.ani;
		} 
		else {
			telNo = data.otherdn;
		}
		
		if(!telNo){
			//발신번호 제한 고객, 번호없으므로 '99999999'변환
			telNo="99999999";
		}
	}

	bCalling = true;
	bReleased = false;
	RECKEY = "";
	currStatus = CALLING;
	g_connStat="RINGING";
	g_getWaitStatus="";
	gCallObj = new Object();

	//콜백 시도후 호인입이면 콜백 관련 초기화
	if($("#callBckMainId").val()!="" || $("#refId").val()!=""){ 
		 $("#callBckMainId").val("");
		 $("#callBckTicketId").val("");
		 $("#refId").val("");
	}

	if ($("#tfMainTicketId").val() != "") {
		 //fnLog("fnSaveCnsl [RINGING]");
		fnSaveCnsl('S');
	}
	
	// 내선도 인바운드로 합침. 2020.06.03_임신호
	if(callType == 1) {
		callType = 2;
	}
	
	if (callType == 2) {  // Inbound Call
		window.sessionStorage.setItem("setCustInfo", "false");
		textState = "전화옴"; 
		if(callGb == "내선 호전환"){
			textState = "내선전화 호전환"; 
		} 
		
		gCallObj.TelNo = telNo;
		gCallObj.CallGB = INBOUND;
		gCallObj.CallStartTime = data.datetime;//jsonObj['EVT_TIME'];
		
	/**>>**************** 기존 및 신규 고객 처리 *******************/		
		var custNm = "";
		var custTend="010000";
		var memo = "";
		var custcomp = ""; // 민원인 구분
		var custcomp2 = ""; // 민원인 성향
		var newCust = "exist"; //신규고객 구분
		// 현재 연결된 발신번호로 등록되어 있는 민원인의 정보를 가져옴
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/main/getCustInfo.do",
			data : "pJson=" + getJsonStrInstantCustInfo(telNo, ""),
			success : function(data)
			{
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				
				if(jr != "")
				{
					if(jr.length == 1)
					{
						custTend = jr[0].CST_COMP;
						custNm = jr[0].CUST_NM;
						
						if(jr[0].CST_COMP_NM2){
							custcomp2 =" > " + jr[0].CST_COMP_NM2
						}
						
						custcomp = jr[0].CST_COMP_NM + custcomp2;
						
						memo = jr[0].MEMO;
					}
					else if(jr.length > 1)
						custcomp = "중복민원인";
				}else{
					console.log("신규고객!");
					newCust="new";
				}
			},
			error : function(data, status, err) 
			{
				//alert("민원인정보 가져오기 실패!! ["+telNo+"]");
				memo="민원인 정보 지연";
				//networkErrorHandler(data, status, err);
			}
		});			

		/*
		var dnis="3000";
        // var intvExcd="all";
		var intvLgcd="all";
		IVR_Message="7001";
		
		// "MESSAGE": "7600^01097116459^010000^7002" // IVR 인입
		// "MESSAGE": "01097116459" // 내선
		if(jsonObj['MESSAGE'] != ""){
			 if(call_type !="4"){
				   // DNIS 콜센터:7000 제주도청:7006 제주시청:7007 서귀포시청:7008	
				 g_arr_UEI= jsonObj['MESSAGE'].split('^'); //  UEI : DNIS^ANI^고객성향  ,  OLD => UEI : DNIS^ANI^고객성향^IVR서비스코드 
	
				dnis = g_arr_UEI[0]==""?"3000":g_arr_UEI[0]; // DNIS 콜센터:7000 제주도청:7006 제주시청:7007 서귀포시청:7008	
				//custTend = g_arr_UEI[2]==""?"010000":g_arr_UEI[2]; // ARS 고객성향  030000:악성민원, 040000:특이민원
				IVR_Message = "7001"; //g_arr_UEI[3]==""?"7001":g_arr_UEI[3]; // ARS 서비스코드
			 }
			 //else 내선 
			 
			 intvLgcd=g_ArsSvrCode[dnis].ext1_cd;
		}
		alert("04");
		// ARS 서비스코드로 각구분값 셋팅 g_ArsCustComp 
		var cust="1"; // 무조건 도민
		
		callGb=g_ArsSvrCode[dnis].cd_nm +" > "+ g_ArsSvrCode[IVR_Message].cd_nm;
		//$("#labArsService").html(callGb);
		  
		$("#selCustGbCd").val(cust); //민원인 구분 1 도민, 2관광객, 9기타
		//custDnis로 상담유형 기관코드 셋팅
		//$("#selMainIntvExCd").val(intvExcd);
		alert("05");
		
		*/
		//신규고객 등록  2018.02.12
		//신규고객 call 인입시 업무에 따라서 수정 2020.05.26_임신호
		if(newCust=="new"){
			if(telNo.length == 4) {
				$("#tfCustNm").val("내부전화");
			}else {
				$("#tfCustNm").val("민원인");
			}
			console.log("신규등록");
			initCustInfo();
//			$("#tfCustNm").val("민원인");
			if(telNo.substr(0,2)=="01"){
				$("#tfCustCelPhoneNum").val(telNo);
			}else{ 
				$("#tfCustPhoneNum").val(telNo);
			}
//			$("#selCustGbCd").val(cust);
			$("#selCustGbCd").val('1'); // 신규등록 시 공주시민으로 default 2020.05.28_임신호
			InsertCustInfo();
		}

	/**<<**************** 기존 및 신규 고객 처리 *******************/
	///****** ************************************************************		
		$("#tfDialogMainCallPopupGeneralAni").val(getPhoneNumFormat(telNo));
		//민원인명이 없을시 20170731
		//if(!custNm) custNm="민원인";
		$("#tfDialogMainCallPopupGeneralCustNm").val(custcomp);
		//$("#tfDialogMainCallPopupGeneralCallgb").val(callGb); 
		$("#tfDialogMainCallPopupGeneralCallgb").val("콜센터 연결요청");  
		$("#tfDialogMainCallPopupGeneralMemo").val(memo); 
		
		// 민원인 성향 셋팅
		if(custTend=="030000" || custTend=="040000"){
			$("#btnDialogMainCallPopupGeneral").prop("src", getContextPath() + "/resources/images/btn_call2.png");
			$("#tfDialogMainCallPopupGeneralCustNm").css("color","red");
		}
		else{
			$("#btnDialogMainCallPopupGeneral").prop("src", getContextPath() + "/resources/images/btn_call1.png");
			$("#tfDialogMainCallPopupGeneralCustNm").css("color","black");
		}
		//window.focus();
		$("#tfDialogMainCallPopupGeneralCallgb").focus();
		$("#dialogMainCallPopupGeneral").dialog("open");
	} else if (callType == 3) { // Outbound Call
		textState = "연결중";
	} else if (callType == 1) { // Inner Call
		 alert("내선전화입니다.");
		textState = "내선전화";
		bInter=true;
		$("#tfDialogMainCallPopupGeneralAni").val(telNo);
		//민원인명이 없을시 20170731
		$("#tfDialogMainCallPopupGeneralCustNm").val("");
		$("#tfDialogMainCallPopupGeneralCallgb").val(textState);
		window.focus();
		$("#dialogMainCallPopupGeneral").dialog("open");
	} else if (callType == '4') { // Consult Call
		textState = "협의콜";
	} else if (callType == '5') { // Transfer Call
		textState = "호전환";
	} else if (callType == '6') { // Conference Call
		textState = "회의통화";
	}
	
	ButtonControl(textState);
}



function EventDialing(data) { // 아웃바운드 초기 함수
	console.log(arguments.callee.name);
	//alert(data.connectionid);
	if(g_MainConnId == "") {
		// main call		
		g_MainConnId = data.connectionid
	}
	else {
		// main call 이 통화 중 이므로 전달 콜
		g_ConsultConnId = data.connectionid;
	}
	
	//alert(g_MainConnId);
	
	/*
	textState = "연결중";
	arState = new Array( "3", "3", "2", "2", "3", "3", "3", "3", "3", "3");
	RECKEY = "";
	
	//콜백 상태 및 시도횟수 업데이트 티켓ID 생성전 실행 
	callBackTryCountUpdate("trycnt");
	
	var ticketId = $("#tfMainTicketId").val();
	
	// 협의콜인 경우에는 가져오지 않도록 수정필요
	if (ticketId == '' || ticketId == null) {
		//fnLog("CMD [DIAL]");
		fnGetTicketId();
	}
	*/
	//alert(data.ani + ":" + data.dnis + ":" + data.otherdn + ":" + data.thisdn);
	arState = new Array( "3", "3", "2", "2", "3", "3", "3", "3", "3", "3");	
	callType = data.calltype;                                                // Call Type 0 -unknown, 1 - internal, 2 - in, 3 - out
	var telNo = removePrefix(data.dnis);                                                  	// Dialing 전화번호
	g_connStat="DIALING";
	
	// 내선도 아웃바운드로 인식하게 수정 2020.06.03_임신호
	if(callType == 1) {
		callType = 3;
	}
	
	//TODO 인바운드후 호전환시 아웃바운도로 변경 되는현상 체크필요
	if (callType == 3) { // Outbound
		gCallObj = new Object();
		gCallObj.CallStartTime = data.datetime; //jsonObj['EVT_TIME'];
		gCallObj.CallGB = OUTBOUND; // 아웃바운드 : 3
		gCallObj.TelNo = telNo;
		textState = "연결중";
		bDialing = true;
		bReleased = false;
		bCalling = false;
		fnGetTicketId();
		$("#CALLNO").val(telNo);
		$("#labCallNumStatus").html(getPhoneNumFormat(telNo));
		gCallStartTime = gCallObj.CallStartTime;//jsonObj['EVT_TIME'];
		//2018.11.20
//		$("#tfContactInform").val(getPhoneNumFormat(telNo));
		$("#tfContactInform").val($("#OUTDIAL").val());
		$("#selMainCallgbcd").val(OUTBOUND);			
		RECKEY = "";
		
		
		/**>>**************** 기존 및 신규 고객 처리 //신규고객 등록  2018.03.07 *******************/		
			var custNm = "";
			var newCust = "exist"; //신규고객 구분
			// 현재 연결된 발신번호로 등록되어 있는 민원인의 정보를 가져옴
			$.ajax({
				type : "post",
				async : false,
				url : getContextPath() + "/ajax/main/getCustInfo.do",
				data : "pJson=" + getJsonStrInstantCustInfo(telNo, ""),
				success : function(data)
				{
					// param값을 JSON으로 파싱
					var jr = JSON.parse(data);
					
					if(jr != "")
					{
						if(jr.length == 1)
						{
							custNm = jr[0].CUST_NM;
						}
						else if(jr.length > 1)
							custNm = "중복민원인";
					}else{
						console.log("아웃바운드 신규고객!");
						newCust="new";
					}
				},
				error : function(data, status, err) 
				{
					alert("민원인정보 가져오기 실패!! ["+telNo+"]");
					//networkErrorHandler(data, status, err);
				}
			});			
   
			//신규고객 등록  2018.03.07
			if(newCust=="new"){
				$("#tfCustNm").val("민원인");
				if(telNo.substr(0,2)=="01"){
					$("#tfCustCelPhoneNum").val(telNo);
				}else{ 
					$("#tfCustPhoneNum").val(telNo);
				}
				InsertCustInfo();
			}
		
		/**<<**************** 기존 및 신규 고객 처리 *******************/			
		
	}
	ButtonControl(textState);
}

function EventEstablish(data) {
	console.log(arguments.callee.name);
	
	bCalling = true;
	bDialing = true; //m20170705
	textState = "통화중";
	RECKEY = data.callid;//jsonObj['REC_KEY'];              // 녹취키(인바운드/아웃바운드)
	var estbTelno = "";//jsonObj['TEL_NO'];           
	g_connStat="ESTABLISHED";
	
	if(data.ani != "") {
		estbTelno = data.ani;
	}
	else {
		estbTelno = data.otherdn;
	}
	
	// 내선도 아웃바운드로 인식하게 수정 2020.06.03_임신호
	if(data.calltype == 1) {
		gCallObj.CallGB == OUTBOUND;
	}
	
	gCallStartTime = gCallObj.CallStartTime;
	
	if (gCallObj.CallGB == INBOUND) {
		//발신번호 제한 고객인 경우
		if(!estbTelno){
			estbTelno="99999999";
			//prevTelno="99999999";
		}
		/*
		//내선 호전환인경우 RING전화번호 변경.
		if(prevTelno!=estbTelno){
			estbTelno=prevTelno;
		} 
		*/
		
		fnSetCallInfo();
		$("#labCallTypeStatus").html("인바운드상담");
	} 
	else if(bInter==true){
		alert("inter");
		$("#labCallTypeStatus").html("내선");
	}
	else if (gCallObj.CallGB == OUTBOUND){
		fnSetCallInfo();
		$("#labCallTypeStatus").html("아웃바운드상담");
		 
		//콜백 시도 완료
		if($("#callBckMainId").val()!="" && $("#refId").val()!=""){
			$("#selMainActstcd").val("030400");
			//콜백 상태 및 시도횟수 업데이트 티켓ID 생성전 실행 
			callBackTryCountUpdate("complete");
		}
	}
	
	gCallConnectTime = data.datetime;//jsonObj['EVT_TIME'];
	
	arState = new Array( "3", "3", "2", "2", "2", "3", "3", "3", "2", "2");
	$("#tfRecId").val(RECKEY);

	//내선 수신
	if(bInter==true){
		bInter=false;
		return;
	}

	currStatus = CALLING;	
	
	var ticketId = $("#tfMainTicketId").val();
	
	if (ticketId == '' || ticketId == null) {
		fnGetTicketId();
	}
	 
	var tmpTel=$("#CALLNO").val();
	if((estbTelno) && (tmpTel!=estbTelno)){
		$("#CALLNO").val(estbTelno);
	}
	
	// 아웃바운드/인바운드 일때 각 다른 번호를 뿌려야 한다. 수정일자 : 2020.06.03_임신호
	if(gCallObj.CallGB == INBOUND) {
		setCustInfo(estbTelno, "DoNotEmpty");
	} else if(gCallObj.CallGB == OUTBOUND) {
		setCustInfo(data.dnis, "DoNotEmpty");
	}
	//기존 소스
//	setCustInfo(estbTelno, "DoNotEmpty");
	
	//2018.11.20
	if($("#OUTDIAL").val() != ""){
		$("#tfContactInform").val($("#OUTDIAL").val());
	}
	fnSaveWorkStatus();	
	setTimeout(fnSaveCnsl, 1000); 

	fnGetWaitCount(g_getWaitCountTest);
	$("#btnCnslInit").prop("disabled",true);//상담 초기화 비활성화

	
	if(data.connectionid == g_ConsultConnId) {
		// consult call 이 연결됨
		if(g_MainConnId != "") {
			// main call 이 통화중이면 협의취소는 disable 되고 3자통화/협의전달은 enable 해야 한다.
			$(":button:contains('협의전달'), :button:contains('3자통화')").prop("disabled", false).removeClass( 'ui-state-disabled' );
		}
		else {
			// main call 이 이미 종료되었으면  협의취소는 enable 되고 3자통화/협의전달은 disable 해야 한다.
			$(":button:contains('협의전달'), :button:contains('3자통화')").prop("disabled", true).addClass( 'ui-state-disabled' );
		}
	}
	
	ButtonControl(textState);
}


function EventHold() {
	console.log(arguments.callee.name);
	textState = "보류";
	g_holdCount++;
	console.log(g_holdCount);
	arState = new Array( "3", "3", "3", "2", "2", "3", "3", "3", "2", "2");
	
	ButtonControl(textState);
}

function EventUnHold() {
	console.log(arguments.callee.name);
	textState = "통화중";
	arState = new Array( "3", "3", "2", "2", "2", "3", "3", "3", "2", "2");
	
	ButtonControl(textState);
}

function EventPartyAdded(data) {
}

function EventPartyDeleted(data) {
}

function EventReleased(data) { // 전화 끊을때 함수
	console.log(arguments.callee.name);
	//alert("EventReleased -> " + data.connectionid);
	textState = "후처리중";
	bReleased = true;
	
	bDialing = false;
	AGENT_HANGUP = 0;//jsonObj['AGENT_HANGUP']; //상담사 Hang_up : "1"
	gCallReleaseTime = data.datetime;//jsonObj['EVT_TIME'];
	//console.log("RELEASED preTel:"+prevTelno+","+g_prevTelnum+" ,"+prevEvent);
	
	// mgkim
	bCalling = false; 
	//$("#labARSAuthDialog").html("민원인이 전화를 끊었습니다.");
	// 전화받기 창이 실행중이면 닫는다.
	if($("#dialogMainCallPopupGeneral").dialog("isOpen") == true) {
		$("#dialogMainCallPopupGeneral").dialog("close");
	}
	
	arState = new Array( "2", "3", "3", "3", "3", "3", "2", "2", "2", "2");
	$("#labCallNumStatus").html("");
	$("#btnCnslInit").prop("disabled",false);//상담 초기화 활성화
	
	
	if(data.connectionid == g_MainConnId) {
		// main call 종료
		// consult call이 통화중이면 .... 협의취소만 enable 되고 3자통화/협의전달은 disable 해야 한다.
		g_MainConnId = "";
	}
	else if(data.connectionid == g_ConsultConnId) {
		// consult call 이 종료된 것이면 협의통화 창을 닫아 준다.
		if($("#dialogMainConfirmPopup").dialog("isOpen") == true) {
			$("#dialogMainConfirmPopup").dialog("close");
		}
		g_ConsultConnId = "";
		
		// main call 이 통화중이면 unhold한다.		
		if(g_MainConnId != "") {
			fnUnHold();
		}
	}
	
	ButtonControl(textState)

	return;
	
	
	
	
	//전화끊어짐	
	if((AGENT_HANGUP=="0" && prevEvent=="CONSULT") && prevTelno!="1997"){
		g_transFlag = false;
		if(g_prevTelnum==prevTelno) {
			fnConsultCancel("");
			$("#dialogMainConfirmPopup").dialog("close");
		}else{
			//g_transFlag = true; //민원인이 전화를 끊으면 협의취소로 끊음
			//2018.11.12
			g_transFlag = false;
			bDialing = true;
			
			$("#popupMessageConfirmPopup").hide();
			
			// 협의통화 연결시 버튼 비활성화
			$(":button:contains('협의전달'), :button:contains('3자통화')").prop("disabled", true).addClass( 'ui-state-disabled' );
			$("#labTransferDialog").html("민원인이 전화를 끊었습니다.");
		}
	}else if(prevEvent=="DIAL"){
		if(prevTelno=="1997"){
			$("#labARSAuthDialog").html("민원인이 전화를 끊었습니다.");
			$("#dialogMainARSAuthPopup").dialog("close");
			fnHangup("");
		}else if(g_prevTelnum!=prevTelno) {
			$("#labTransferDialog").html("시도중 전화가 끊겼습니다.");
			//2018.11.23
			bDialing = true;
		}else if(AGENT_HANGUP == 0){
			//2018.10.27
			fnConsultCancel("");
		}
	}else if(g_prevTelnum=="5000"){ 
		g_transFlag = false;
		fnConsultCancel("");  
		$("#dialogMainARSAuthPopup").dialog("close"); 
	}else if(prevTelno=="1997" && ( g_prevTelnum!=prevTelno)){
		console.log("preTel:"+prevTelno+","+prevEvent);
		//ARS 인증시 고객이 먼저 전화를 끊음. 
		//fnConsultCancel(""); 
		$("#labARSAuthDialog").html("민원인이 전화를 끊었습니다.");
		$("#dialogMainARSAuthPopup").dialog("close");
		fnHangup("");
	}else{
		bCalling = false; //협의콜 중의 RELEASED는 무시
		
		// mgkim
		$("#labARSAuthDialog").html("민원인이 전화를 끊었습니다.");
		$("#dialogMainARSAuthPopup").dialog("close");
	}

	arState = new Array( "2", "3", "3", "3", "3", "3", "2", "2", "2", "2");
	$("#labCallNumStatus").html("");
	$("#btnCnslInit").prop("disabled",false);//상담 초기화 활성화
	
	ButtonControl(textState)
}


function ButtonControl(state) {
	console.log(arguments.callee.name);
	$("#AGENT_STATUS").val(state); 
	// 현재 상태 셋팅 및 상태유지 시간 초기화
	$("#labMainStatusNm").html(state);
	$("#labMainStatusTime").html("00:00:00");
	g_statusStrtTime = new Date();
	
	OnButtonProc(arBtn, arBtnText, arState);
}

function MakeAgentStateString(state) {
	console.log(arguments.callee.name);
    var str;

    switch (state) {
        case 0: str = "NULL"; break;
        case 10: str = "Logout"; break;
        case 20: str = "Login"; break;
        case 30: str = "Not Ready"; break;
        case 40: str = "Ready"; break;
        case 41: str = "InReady"; break;
        case 42: str = "OutReady"; break;
        case 50: str = "Busy"; break;
        case 51: str = "Ringing Busy"; break;
        case 52: str = "Dialing Busy"; break;
        case 60: str = "Work After Call"; break;
        //default: str = "Unknown State : " + state.toString(); break;
        default: str = "Unknown State : " + JSON.stringify(state); break;
    }
    return str;
}

function GetStateSubCode(extension) {
	console.log(arguments.callee.name);
    // Extension 활용
    var i = 0, j = 0;
    var nRecord = 0, nField = 0;
    var strKey, strValue;
    var str = "";

    if (extension <= 0) {
        AddResponse("해당 상태에 대한 Sub Code가 없습니다");
    }
    // Record 개수 가져오기
    nRecord = ipron.EXTGetRecordCount(extension);
    
    for (i = 0; i < nRecord; i++) {
        nField = ipron.EXTGetValueCountForRecord(extension, i);

        strKey = ipron.EXTGetKey(extension, i);

        for (j = 0; j < nField; j++) {
            strValue = ipron.EXTGetValueForRecord(extension, i, j);
        }
    }
}

function ExtensionData(data) {
	console.log(arguments.callee.name);
    var extlog = "[" + data.method + "]";
    var ex = "";

    ex = ipron.GetExtensionData(data.extensionhandle);
    extlog += " Extension Data [" + ex + "]";
    
    return extlog;
}

// 버튼 상태 제어 메소드
function OnButtonProc(arButton, arButtonText, arState)
{
	console.log(arguments.callee.name);
	var preImg=new Array(); 
	try
	{
		for(var i = 0; i < arState.length; i++ )
		{
			switch(arState[i])
			{
				case "1" : // display ( using img )
				{
					try{
							eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<a onclick=\"fnProcButton(  \\\'"+ arButton[i] + "\\\')\"><img id=\"" + arButton[i] + "_img\"src=\"" + getContextPath() + "/resources/images/" + arButton[i] + ".png\" alt=\"" + arButtonText[i] + "\" style=\"cursor: pointer; width:58px; height:49px;\" draggable=\"false\">';");
							eval("document.getElementById( '"+ arButton[i] + "' ).style.display = '';");
							
							var $softPhoneImg = $("#" + arButton[i] + "_img");
							$softPhoneImg.mouseover(function(e)
							{
								var imgSrc = e.target.id;
								imgSrc = imgSrc.replace("_img", "");
								
								var $btnImg = $("#" + (e.target.id));
								$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + ".png"); // _over
								$btnImg.css("height","10px;");
							});
							
							// mouseout event
							$softPhoneImg.mouseout(function(e)
							{
								var imgSrc = e.target.id;
								imgSrc = imgSrc.replace("_img", "");
								var $btnImg = $("#" + (e.target.id));
								$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + ".png"); // .png
							});
						
							// mousedown event
							$softPhoneImg.mousedown(function(e)
							{
								var imgSrc = e.target.id;
								imgSrc = imgSrc.replace("_img", "");
								
								var $btnImg = $("#" + (e.target.id));
								$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc +  "_over.png"); // _click
							});
							
							// mouseup event
							$softPhoneImg.mouseup(function(e)
							{
								var imgSrc = e.target.id;
								imgSrc = imgSrc.replace("_img", "");
								
								var $btnImg = $("#" + (e.target.id));
								$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + ".png"); //_over
							});
						
						}catch(err){
							console.log("OnButtonProc Error :"+err.message);
						}
					break;
				}
				case "2" : // dispay ( state img )
				{
					// 이미지 셋팅 및 클릭 이벤트 삽입
					if(arBtn[i]==arButton[i]){
						if(arButton[i] != "softphone_10"){
							preImg="_over"; //로그아웃 제외 softphone_10
							//console.log( "INNER:"+arBtn[i]+"::"+arButton[i]);
						}else{
							preImg="";
							//console.log( "INNER2:"+arBtn[i]+"::"+arButton[i]);
						}
					}
					eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<a onclick=\"fnProcButton(  \\\'"+ arButton[i] + "\\\')\"><img id=\"" + arButton[i] + "_img\"src=\"" + getContextPath() + "/resources/images/" + arButton[i] +preImg +".png\" alt=\"" + arButtonText[i] + "\" style=\"cursor: pointer; width:58px; height:49px;\" draggable=\"false\">';");
					eval("document.getElementById( '"+ arButton[i] + "' ).style.display = '';");
					
					var $softPhoneImg = $("#" + arButton[i] + "_img");
					// mouseover event
					$softPhoneImg.mouseover(function(e)
					{
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						
						var $btnImg = $("#" + (e.target.id));
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + "_over.png"); // _over
						$btnImg.css("height","10px;");
					});
					
					// mouseout event
					$softPhoneImg.mouseout(function(e)
					{   var preImgg="";
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						var $btnImg = $("#" + (e.target.id));
						var arImg=imgSrc.split("_");
						if(Number(arImg[1]) < 10 ) preImgg ="_over"; 
						console.log(imgSrc+ ":"+ arImg[1]);
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + preImgg+ ".png"); // .png
					});
				
					// mousedown event
					$softPhoneImg.mousedown(function(e)
					{
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						
						var $btnImg = $("#" + (e.target.id));
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc +  "_click.png"); // _click
					});
					
					// mouseup event
					$softPhoneImg.mouseup(function(e)
					{
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						
						var $btnImg = $("#" + (e.target.id));
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + "_over.png"); // _over
					});
					
					break;
				}
				case "3" : // display ( disable img )
					eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"" + getContextPath() + "/resources/images/" + arButton[i] + "_off.png\" draggable=\"false\" alt=\"" + arButtonText[i] + "\" style=\" width:58px; height:49px;\">';");
					eval("document.getElementById( '"+ arButton[i] + "' ).style.display = '';");
					break;
				case "4" : // none display
					eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"" + getContextPath() + "/resources/images/" + arButton[i] + "_off.png\" draggable=\"false\" alt=\"" + arButtonText[i] + "\" style=\" width:58px; height:49px;\">';");
					eval("document.getElementById( '"+ arButton[i] + "' ).style.display = 'none';");
					break;
			}
		}
	}
	catch ( e )
	{
		alert("error = " + e.description);
	}
}

//버튼 클릭 시 실행 메소드
function fnProcButton(szButton)
{
	console.log(arguments.callee.name);
	try
	{
		switch(szButton)
		{
			case "softphone_1" :		// 대기
			{
				writeLogFile("on Button Click [READY]");
				 
				if(g_readyFlag)
				{
					g_readyFlag = false;
					//CT_READY($("#EXT").val(), $("#USERID").val());
					fnAgentReady();
					CallReadyFunc();
					writeLogFile("Request [CT_READY]");
					
				}
				else
				{ 
					g_readyFlag = true;
//					fnAgentNotReady("7"); // 기존소스
					fnAgentNotReady("0"); // 수정 2020.06.04_Lim 대기버튼 두번 클릭시 상태값 기본으로 변경
				}
				break;
				
			}
			case "softphone_2" :		// 걸기
			{
				writeLogFile("on Button Click [MAKECALL]");
				 
				//createOutboundPopup("makecall");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 80; 
				$("#divPhoneMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
			}
			case "softphone_3" :		// 끊기 
			{//보류
				 writeLogFile("on Button Click [DROPCALL]");
				if(g_transFlag)
				{
					alert("fnConsultCancel");
					//CT_TRANSFERCANCEL();
					fnConsultCancel("");
					writeLogFile("Request [CT_TRANSFERCANCEL]");
					
					var arState = new Array( "2", "3", "3", "3", "3", "3", "3", "2", "2", "2");
					OnButtonProc(arBtn, arBtnText, arState);
					
					document.getElementById("AGENT_STATUS2").value = "AfterCallWork";
					$("#labMainStatusNm").html("후처리중");
					
					g_transFlag = false;
				}
				else
				{
					// main call control 의 "끊기"
					//CT_DROPCALL($("#EXT").val());
					fnHangup(g_MainConnId);
					writeLogFile("Request [CT_DROPCALL]");
				}
				break;
				
			}
			case "softphone_4" :		// 보류 
			{
				//협의				
				writeLogFile("on Button Click [DROPCALL]");
				
				if(g_holdFlag)
				{
					//alert(g_holdFlag + " : unhold");
					console.log("unhold");
					//CT_UNHOLDCALL($("#EXT").val());
					fnUnHold();
					writeLogFile("Request [CT_UNHOLDCALL]");
					g_holdFlag = false;
				}
				else
				{
					//alert(g_holdFlag + " : hold");
					console.log("hold");
					//CT_HOLDCALL($("#EXT").val());
					fnHold();
					writeLogFile("Request [CT_HOLDCALL]");
					g_holdFlag = true;
				}
				
				break;
				
			}
			case "softphone_5" :		// 협의 
			{
				if(g_holdFlag == false) {
					fnHold(); 
				}
				
				g_holdFlag = true;
				
				writeLogFile("on Button Click [TRANSFERINIT]");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 80; 
				$("#divPhoneMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();				
				
				//createOutboundPopup("consult");
				break;
				
			}
			case "softphone_6" :		// 3자통화
			{
				break;
			}
			case "softphone_7" :		// 업무
			{
				//fnAgentNotReady(44);  //44 코드확인
				//writeLogFile("Request [NotReady(44)]");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 150;
				$("#divRecentMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
			}
			case "softphone_8" :		// 이석 
			{//끊기
				
				writeLogFile("on Button Click [NOT READY]");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 80;
				$("#divNotReadyMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
				
			}
			case "softphone_9" :		// 재접속
			{
				writeLogFile("on Button Click [RECONNECT]");
				
				$("#mainTopCtiStatus").html("OFF");
				//CT_CONNECTSERVER();
				writeLogFile("Request [CT_CONNECTSERVER]");
				//CallReadyFunc();
					
				fnInitCTI();
					initData();		// 초기 데이터 셋팅
					initGrid();		// 그리드 초기 셋팅
				break;
			}
			case "softphone_10" :	// 로그아웃
			{
				writeLogFile("on Button Click [LOG OUT]");
				
				g_manualLogoutFlag = true;
				fnLogout();
				break;
			}
			case "softphone_11" :	// 조직도 - 버스정보
			{
//		    	var paramURL = "http://www.gbis.go.kr/";
		    	var paramURL = "http://bis.gongju.go.kr/main.view";
				var newWindow = window.open(paramURL, "공주버스정보", "width=1670,height=960,left=70,top=30, scrollbars=yes, resizable=yes, menubar=yes, toolbar=yes, location=yes, status=yes, resizable=yes");
				//newWindow.focus();
				
				//window.sessionStorage.setItem("fromFlag", "fromTop");
				//window.sessionStorage.setItem("corpOpenType","callCorp");
				//openMenuPopup("CM0311");
				
				break;
			}
			case "softphone_12" : // 행정정보 - 즐겨찾기
			{
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 150;
				$("#divFavoritMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				//var paramURL = "www.jejuolle.org";
				//var newWindow = window.open(paramURL, "jejuolle", "");
				//openMenuPopup("CS0003");
				//newWindow.focus();
				
				break;
			}
			case "softphone_13" :	// 즐겨찾기 - 조직도
			{
				window.sessionStorage.setItem("fromFlag", "fromTop");
				window.sessionStorage.setItem("corpOpenType","callCorp");
				var paramURL = getContextPath() + "/web/counsel/organizationChart.do";
				gf_openDialog(paramURL,screen.width,982,"yes","yes",0,0);

				//openMenuPopup("CM0311");
 
				break;
			}
			case "softphone_14" :	// SMS 발송 -행정정보
			{
				openMenuPopup("CS0003");
				//TODO
				//window.sessionStorage.setItem("cnslSmsSendNum", "");
				//window.sessionStorage.setItem("cnslSmsTcktId", "");
				//openMenuPopup("CM0017");
				
				break;
			}
			case "softphone_15" :	// FAX - sms
			{
				window.sessionStorage.setItem("cnslSmsSendNum", "");
				window.sessionStorage.setItem("cnslSmsTcktId", "");
				openMenuPopup("CM0017");
				
				//var paramURL = "http://172.16.34.151/recsee/login.php";
				//var newWindow = window.open(paramURL, "recsee", "");
				//newWindow.focus();
				//webFaxLogin('/fax_send_list.php','');
				break;
			}
			case "softphone_16" :	// 우편번호 검색 -sms
			{
				webFaxLogin('/fax_send_list.php','');
				
				//var paramURL = getContextPath() + "/web/main/jusoPopup.do"; 
				//var newWindow = window.open(paramURL, "zipcode", "width=570,height=420, scrollbars=yes, resizable=yes");
				//newWindow.focus();
				break;
			}
			case "softphone_17" :	// 콜센터 운영관리 - 우편번호
			{	
				var paramURL = getContextPath() + "/web/main/jusoPopup.do"; 
				var newWindow = window.open(paramURL, "zipcode", "width=570,height=420, scrollbars=yes, resizable=yes");
				newWindow.focus();
				break;
			}
			default :
				break;
		}
	}
	catch(e)
	{
		
		alert("WS_softPhone fnProcButton Error : " + e.message);
		/*
		CT_CONNECTSERVER();
		writeLogFile("Request [CT_CONNECTSERVER(exception)]");
		*/
		
		//ctiConnError();
	}
}

// 대기자 수 카운트 
function fnInwaitCount(val){
	console.log(arguments.callee.name);
	console.log("fnInwaitCount() val:"+ val);
	if(val!=null){
		$("#labMainWaitingCustCount", parent.document).html(val);
	}
	
}

// Queue List 
function QueueList(handle) {
	console.log(arguments.callee.name);
    var i = 0, j = 0;
    var nRecord = 0; nField = 0;
    var strKey, strValue;
    var str = "";
    var QueueList ="";
    
    nRecord = ipron.EXTGetRecordCount(handle);

    for (i = 0; i < nRecord; i++) {
        nField = ipron.EXTGetValueCountForRecord(handle, i);

        strKey = ipron.EXTGetKey(handle, i);

        for (j = 0; j < nField; j++) {
            strValue = ipron.EXTGetValueForRecord(handle, i, j);
            console.log("strValue:" + strValue);
            switch (j) {
                case 0: 
                		str=   strValue;
                	
                break;
                 ;
            }
        }
        if(i<1){
        	QueueList += str;
        }
        else{
        	QueueList += "-"+str;
        }
        
    }
    console.log("QueueList:" +QueueList);
    return QueueList;
}


 