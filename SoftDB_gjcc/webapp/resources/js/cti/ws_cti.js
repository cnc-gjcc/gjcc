/**
 * SoftPhone Control 
 * 통신방식 : WebSocket
 *  
 */

// 웹소켓 오브젝트
var ws;

var gCTIInfoObj = new Object();
//gCTIInfoObj.IP1 = "61.40.90.36"; //"192.168.1.71";

// CTI 서버
gCTIInfoObj.IP1 = "172.17.100.103"; //IPCC1
gCTIInfoObj.IP2 = "172.17.100.104"; //IPCC2
//gCTIInfoObj.IP2 = ""; //"192.168.1.72";
gCTIInfoObj.IP3 = "";
gCTIInfoObj.PORT1 = "9203"; // CTI PORT
gCTIInfoObj.PORT2 = "9203"; // CTI PORT
gCTIInfoObj.PORT3 = "";

var g_TenantName = "gongju";			// 김문겸
var g_DefaultAgentMainState = 30;		// 로그인시 상담원 메인 상태 30 - 자리비움, 40 - 수신대기
var g_DefaultAgentSubState = 0;		// 로그인시 상담원 서브 상태 
var g_PasswordType = 4; 				// SHA-2(512)
var g_MediaSet = "0";
var g_LoginDn = ""; // 내선번호
var g_LoginID = "";
var g_LoginPass = "";

var g_ConnId = "";
var g_PrevConnId = "";
var g_ThisDn = "";
var g_UCID = "";
var g_Hop = "";
var g_CallId = "";

var g_Prefix = "";       // 내외선 구분
var g_AreaCode = "041";  // 센터지역 전화번호
var g_CallerId = "";     // 발신자표시번호(발신자표시번호가 여러개인 경우 사용하며 CTI 미들웨어에서 지원이 되어야 한다.)
var g_TeamQue ="";		// 상담사 큐
var g_QueueDnSet="6181";		// 큐DN
/**
 * WebSocket을 통해 데몬에 Command전송
 */
function sendCmd(jsonObj){
	try {
		var finalJsonData = JSON.stringify(jsonObj);       // Object 객체에서 Json형태로 데이터 생성
		//브리지텍은 WebSocket을 사용하지 않음
//		ws.send(finalJsonData);                            // WebSocket을 통해 데이터 전송
	} catch(e) {
		alert('cause : ' + e.description + ', ' + e.name);
	}
}

/**
 * CTI Initialize 및 CTI Login  
 */
function fnInitCTI() {
	console.log(arguments.callee.name);
	// 실 운영에서 주석 풀기 
	g_LoginID = window.sessionStorage.getItem("USR_ID"); // 로그인 ID
	g_LoginDn = window.sessionStorage.getItem("EXTN_NO"); // 내선번호
	//g_LoginPass = window.sessionStorage.getItem("CTI_LGN_PWD");
	
	//alert(window.sessionStorage.getItem("USR_ID") + ":" + window.sessionStorage.getItem("CTI_LGN_PWD") + ":" + window.sessionStorage.getItem("EXTN_NO"))
	ipron.SetProtocol("http");
    ipron.SetServerInfo(gCTIInfoObj.IP1, gCTIInfoObj.PORT1, gCTIInfoObj.IP2, gCTIInfoObj.PORT2);
    ipron.OpenServer("GongjuApp", CBFuncEvent, CBFuncResponse);// Request Send, "GongjuApp" 변경 필요 없음
    //ipron.Register(window.sessionStorage.getItem("EXTN_NO"), g_TenantName);
    //ipron.AgentLogin(window.sessionStorage.getItem("EXTN_NO"), window.sessionStorage.getItem("USR_ID"), window.sessionStorage.getItem("CTI_LGN_PWD"), g_TenantName, g_DefaultAgentMainState, g_DefaultAgentSubState, 0, g_PasswordType, g_MediaSet);
}

function fnRegister() {
	console.log(arguments.callee.name);
	//ipron.Register(window.sessionStorage.getItem("EXTN_NO"), g_TenantName);
	ipron.Register(g_LoginDn, g_TenantName);
}

//ipron.AgentLogin(“2001”, “agent1”, “1”, “BT”, 30, 0, 0, 4, “0”);
function fnAgentLogin() {
	console.log(arguments.callee.name);
	// session의 아이디와 비번으로 수정. 2020.05.26_임신호
//	ipron.AgentLogin(g_LoginDn, "test01", "", g_TenantName, g_DefaultAgentMainState, g_DefaultAgentSubState, 0, g_PasswordType, g_MediaSet);
	ipron.AgentLogin(g_LoginDn, g_LoginID, "", g_TenantName, g_DefaultAgentMainState, g_DefaultAgentSubState, 0, g_PasswordType, g_MediaSet);
	// user ID 와 CTI ID가 같으면 user ID를 넣어도 된다.
	//ipron.AgentLogin(g_LoginDn, g_LoginID, g_LoginPass, g_TenantName, g_DefaultAgentMainState, g_DefaultAgentSubState, 0, g_PasswordType, g_MediaSet);
	
}



/**
 * CTI 로그아웃
 */
function fnLogoutCTI() {
	console.log(arguments.callee.name);
//	ipron.AgentLogout(g_LoginDn, "test01");
	ipron.AgentLogout(g_LoginDn, g_LoginID);
}

/**
 * 전화걸기
 * 
 * @param dialNumber
 * @param custId
 * @param custNo
 * @param custName
 */
function fnMakeCall(dialNumber, custId, custNo, custName) {
	console.log(arguments.callee.name);
	// 20200510 김문겸 브리지텍용으로 수정
	// 내선끼리 전화할때는 "9"가 붙지 말아야한다. 2020.05.26_임신호 (필요시 로직 추가해야한다.)
	// 외부로 전화할때 "9"를 전화번호 앞에 붙여야한다. 2020.05.26_임신호
	// 내선끼리 프리픽스 확인 ( outbound, 내부, 시청) 
	if(dialNumber.length == 4) {
		ipron.MakeCall(g_LoginDn, dialNumber, "", 0, 0, "", "", 0, 0, 0, 0, "", 0, 0, 0, 0, 0); // 내선으로 전화 걸때
	} else {
		ipron.MakeCall(g_LoginDn, "9" + dialNumber, "", 0, 0, "", "", 0, 0, 0, 0, "", 0, 0, 0, 0, 0); // 외부로 전화 걸때
	}
	
//	ipron.MakeCall(g_LoginDn, "9" + dialNumber, "", 0, 0, "", "", 0, 0, 0, 0, "", 0, 0, 0, 0, 0); 
}

/**
 * 전화받기
 */
function fnAnswer() {
	console.log(arguments.callee.name);
	ipron.AnswerCall(g_LoginDn, g_MainConnId, 0, 0);
	console.log("ws_cti g_LoginDn : " + g_LoginDn);
	console.log("ws_cti g_MainConnId : " + g_MainConnId); // 6b851b1505afc9 6b851b1506dac0
}

/**
 * 전화끊기
 * 
 * @param dialNumber
 */
//function fnHangup(dialNumber) {
function fnHangup(connId) {	
	console.log(arguments.callee.name);
	//alert("fnHangup -> " + connId + ":" + g_MainConnId + ":" + g_ConsultConnId);
	
	if(connId == "") {
		ipron.ClearCall(g_LoginDn, g_MainConnId, 0, 0);
	}
	else {
		ipron.ClearCall(g_LoginDn, connId, 0, 0);
	}
}

/**
 * 상담사 대기
 * 
 * 인바운드 업무를 위해 상담사를 대기상태로 변경한다.
 */
function fnAgentReady() {
	console.log(arguments.callee.name);
//	ipron.SetAgentState("test01", g_TenantName, 40, 0, 0, "0");
	ipron.SetAgentState(g_LoginID, g_TenantName, 40, 0, 0, "0");
}

/**
 * 상담사 이석
 * 
 * @param reasonCd 사유코드
 */
function fnAgentNotReady(reasonCd) {
	console.log(arguments.callee.name);
	ipron.GetStateSubcode(g_TenantName, 30);
	
//	ipron.SetAgentState("test01", g_TenantName, 30, reasonCd, 0, "0");
	ipron.SetAgentState(g_LoginID, g_TenantName, 30, reasonCd, 0, "0");
}

/**
 * 보류
 * 
 * 현재콜에 대한 보류처리
 */
function fnHold() {
	console.log(arguments.callee.name);
	if (g_MainConnId != "") {
		ipron.HoldCall(g_LoginDn, g_MainConnId, 0, 0);
	} else {
		alert("통화중에만 사용가능합니다.");
	}
}

/**
 * 보류해제
 * 
 * 현재콜에 대한 보류상태를 해제한다.
 */
function fnUnHold() {
	console.log(arguments.callee.name);
	//alert("fnUnHold");
	ipron.RetrieveCall(g_LoginDn, g_MainConnId, 0, 0);
}

/**
 * 협의콜
 * 
 * @param consultType
 * @param dialNumber
 * @param custNo
 */
function fnConsult(consultType, dialNumber, custNo, contents) {
	console.log(arguments.callee.name);
	/*
	var jsonObj = new Object();
	
	jsonObj.CMD = "CONSULT";             // CTI Consult Command
	jsonObj.CONSULT_TYPE = consultType;  // Consult Type
	jsonObj.TEL_NO = dialNumber;         // 전화번호
	jsonObj.CUST_NO = custNo;            // 고객번호
	jsonObj.CONTENTS = contents;         // 내용
	if(consultType=="CONSULT"){
		jsonObj.RELAYNUM = contents;	 // 고객 전화번호 전달용
	}else {
		jsonObj.RELAYNUM = "";			 // ARS 인증용
	}
	sendCmd(jsonObj);                    // Request Send
	*/
	
	//ipron.HoldCall(g_LoginDn, g_ConnId, 0, 0); // ('자신 내선번호', '현재 통화중 Connection ID', '보내려는 Extension 데이터', '미디어타입(ICMediaType)')
	
	if(dialNumber.length == 4) {
		ipron.MakeCall(g_LoginDn, dialNumber, "", 0, 0, "", "", 0, 0, 0, 0, "", 0, 0, 0, 0, 0);
	} else {
		ipron.MakeCall(g_LoginDn, "9" + dialNumber, "", 0, 0, "", "", 0, 0, 0, 0, "", 0, 0, 0, 0, 0);
	}
	
//	ipron.MakeCall(g_LoginDn, "9" + dialNumber, "", 0, 0, "", "", 0, 0, 0, 0, "", 0, 0, 0, 0, 0); 
}

/**
 * 협의콜 취소
 * 
 * @param consultType
 */
function fnConsultCancel(consultType) {
	console.log(arguments.callee.name);
	/*
	var jsonObj = new Object();
	
	jsonObj.CMD = "CONSULT_CANCEL";      // CTI Consult Cancel Command
	jsonObj.CONSULT_TYPE = consultType;  // CTI Consult Type
	
	sendCmd(jsonObj);                    // Request Send
	*/
}

/**
 * 호전환
 * 
 * 협읰톨 이후에 호줄되어야 한다.
 */
function fnTransfer() {
	console.log(arguments.callee.name);
	//topPage.api.MuteTransfer(TextCallDN.value, topPage.TextPrevConnId.value, TextCallDestDN.value, topPage.TextExHandle.value, GetSrcMediaType());
	ipron.MuteTransfer(g_LoginDn, g_MainConnId, $("#modalCallNum").val(), 0, 0);
}

/**
 * 3자통화/회의통화
 * 
 * 협의콜이후에 호출되어야 한다.
 */
function fnConference() {
	console.log(arguments.callee.name);
	ipron.Conference(g_LoginDn, g_MainConnId, $("#modalCallNum").val(), 0, 0, 0, 0);
}

/**
 * Single Step 호전환
 * 
 * @param dialNumber   전화번호
 * @param custNo       고객번호
 * @param contents     내용
 */
function fnSingleStepTransfer(dialNumber, custNo, contents) {
	console.log(arguments.callee.name);
	
	
	//ipron.SinglestepTransfer(thisDn, connectionId, destDn, obCallingDn, skillLevel, priority,   relationAgentDn, relationAgentId, relationMethod, routeMethod, routeSkillId,   routeGroup Id, extension, mediaType, usePrevAgent,   useDesignatedAgent, relationTimeout)
//	console.log(arguments.callee.name + "_1")
//	ipron.SinglestepTransfer(g_LoginDn, g_ConnId, "1", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
		
	/*
	var jsonObj = new Object();
	
	jsonObj.CMD = "SINGLE_STEP_TRANSFER";  // CTI Single Step Transfer Command
	jsonObj.TEL_NO = dialNumber;           // 전화번호
	jsonObj.CUST_NO = custNo;              // 고객번호
	jsonObj.CONTENTS = contents;           // 내용
	
	sendCmd(jsonObj);                      // Request Send
	*/
}

function fnSingleStepTransfer(consultType, dialNumber, custNo, contents) {
	console.log(arguments.callee.name);
	//extension 생성
	var extension_id = ipron.EXTCreateExtension();
	var extKey = "UEI20";
	var extVal = "2";
	ipron.EXTAddRecord(extension_id, extKey, extVal);
//	ipron.SinglestepTransfer(g_LoginDn, g_ConnId, "", "", "", "", "", "", "", "", "", "", extension, "", "", "", "");
	var extension = ipron.GetExtensionData(extension_id)
	console.log("***************************************************************************************************")
	console.log(g_LoginDn, g_ConnId, extension, extKey, extVal);
	//[{"UEI20":"1"}]
	console.log("***************************************************************************************************")
//	ipron.SinglestepTransfer(g_LoginDn, g_ConnId, '', '', '', '', '', '', '', '', '', '', extension_id, '', '', '', '');
	var _destDn				= '';
	var _obCallingDn        = '';
	var _skillLevel         = '';
	var _priority           = '';
	var _relationAgentDn    = g_LoginDn;
	var _relationAgentId    = g_LoginID;
	var _relationMethod     = '';
	var _routeMethod        = '';
	var _routeSkillId       = '';
	var _routeGroupId       = '';
	var _extension          = '';
	var _mediaType          = '0';
	var _usePrevAgent       = '0';
	var _useDesignatedAgent = '0';
	var _relationTimeout    = '';	
	ipron.SinglestepTransfer(g_LoginDn, g_ConnId, _destDn,_obCallingDn,_skillLevel,_priority,_relationAgentDn,_relationAgentId,_relationMethod,_routeMethod,_routeSkillId,_routeGroupId, extension_id,_mediaType,_usePrevAgent,_useDesignatedAgent,_relationTimeout)
	
	//extension 삭제 
	ipron.EXTDeleteExtension(extension_id);
	
	
	/*
	var jsonObj = new Object();
	
	jsonObj.CMD = "SINGLE_STEP_TRANSFER";  // CTI Consult Command
	jsonObj.CONSULT_TYPE = consultType;    // Consult Type
	jsonObj.TEL_NO = dialNumber;           // 전화번호
	jsonObj.CUST_NO = custNo;              // 고객번호
	jsonObj.CONTENTS = contents;           // 내용
	if(consultType=="CONSULT"){
		jsonObj.RELAYNUM = contents;	   // 고객 전화번호 전달용
	}else {
		jsonObj.RELAYNUM = "";			   // ARS 인증용
	}
	sendCmd(jsonObj);   
	*/
}
 
/**
 * 후처리완료(상담저장시 호출) 
 * 
 * @param custNo       고객번호
 * @param custName     고객명
 * @param custId       고객식별번호
 * @param counselCd    상담유형
 * @param counselName  상담유형명
 */
function fnAfterCallWork(custNo, custName, custId, counselCd, counselName) {
	console.log(arguments.callee.name);
	var jsonObj = new Object();
	
	jsonObj.CMD = "AFTERPROC";                                             // CTI AfterCallWork Command
	jsonObj.REC_KEY = "";                                                  // 녹취키
	jsonObj.USER_ID = window.sessionStorage.getItem("USR_ID");             // Application Login ID
	jsonObj.USER_NAME = $("#USERNAME").val();                              // User Name
	jsonObj.CUST_NO = custNo;                                              // 고객번호
	jsonObj.CUST_NAME = custName;                                          // 고객명
	jsonObj.CUST_ID = custId;                                              // 고객식별자
	jsonObj.CNSL_CD = counselCd;                                           // 상담유형코드
	jsonObj.CNSL_NAME = counselName;                                       // 상담유형명
	
	sendCmd(jsonObj);
}

/**
 * 대기고객수 
 */
function fnGetWaitCount(test_gubun) {
	console.log(arguments.callee.name);
	
	var temp =null;
	if (!ipron.IsConnected()) fnInitCTI();
	
	ipron.QueueReport( g_TenantName,g_QueueDnSet, g_MediaSet);

	var teamQueue = $("#hidTeamQueue").val();

//	if(teamQueue !=""){
//		var jsonObj = new Object();
//		
//		jsonObj.CMD = "GETWAITCOUNT";                                                   // Log 기록 Command
//		jsonObj.QUEUE01 = "26672";                                        // 한국어
//		jsonObj.QUEUE02 = teamQueue;                                        // 팀큐
//		jsonObj.TESTING = test_gubun;                                        // 테스트 구분 "TEST"
//		
//		sendCmd(jsonObj);                                                      // Request Send
//	}
}

/**
 * 프로그램실행 
 */
function fnProcStart(filename,job) {
	console.log(arguments.callee.name);
	 
		var jsonObj = new Object();
		
		jsonObj.CMD = "PROCSTART";         // 프로그램 실행명령
		jsonObj.FILENAME =filename;        // 실행 파일명
		jsonObj.JOBGB =job==""?"E":job;    // 실행 파일명
		
		sendCmd(jsonObj);                  // Request Send
	 
}

function fnLog(logContents) {
	console.log(arguments.callee.name);
	var jsonObj = new Object();
	
	jsonObj.CMD = "LOG";                   // Log 기록 Command
	jsonObj.CONTENTS = logContents;        // 로그 내용
	
	sendCmd(jsonObj);                      // Request Send
}

function fnRecSend(connid, data1, data2) {
	console.log(arguments.callee.name);
	$.ajax({
		
	});
	
}