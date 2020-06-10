var nowProcessStats=null;
var clickProcessStats="010200";
var callCenterReturn="";        		//요청자
var hisTbbs_id="";
var deptCharger ="";
var hiddenAffr="";
var uid="";//nm
var rock=null;					//rock
var appn_gb_cd="";  

//hhs
var btnId="";

//selectlist			
function getJsonStrDeptRceptList(){
	var allDept = $("#csdbch_ALLDept").prop("checked");
	var ccAuth; 	
	if (window.sessionStorage.getItem("CC_AUTH")=="Y") {
		ccAuth="y";	
	}else{
		ccAuth="n"
	}

	var showType = ["010105","010200","020100","020200","030100"];
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" 		: "value",
//		"frDt" 		: $("#csdbch_deptSrchSelFrDate").val().replace(/[-, :, \s]/g,""),
//		"toDt" 		: $("#csdbch_deptSrchSelToDate").val().replace(/[-, :, \s]/g,""),
		"new_yn" 	: $("#csdbch_deptSrchRequstSe").val(),
		"cdb_gb_cd"   	: $("#csdbch_deptSrchDbSe").val(),
		"prog_knd_cd"   : !$("#csdbch_deptSrchProgrsSttus").val()?"010105":$("#csdbch_deptSrchProgrsSttus").val(),
		"sendingOuCode" : sendingOuCode==undefined?"":sendingOuCode,
		"cdbActStCds" : showType,
		"alldept" : $("#csdbch_ALLDept").prop("checked"),
		"ccauth" :  ccAuth
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

//insert 
function setJsonStrDeptInsert() {
    var seDdeptCharger="";
    
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTUuZGVwdEluc2VydA==", //om015.deptInsert
	    "map" : {
		"key" : "value",
		"req_id" 	: $("#csdbch_DepttblReqid").val(),
		"cdb_act_st_cd" : clickProcessStats,
		"org_usr_id" 	: $("#csdbch_deptJobChargerVal").val(), 
		"rtn_rsn"   	: $("#csdbch_deptJobPrvonsh").val(),
		"tbbs_id" 	: hisTbbs_id,
		"cdb_act_st_cd" : clickProcessStats,	 	
		"rtn_rsn2" 	: seDdeptCharger,
		"org_id" 	: sendingOuCode,
		"appn_gb_cd"    : appn_gb_cd,
		"sendingUid"    : sendingUid
	    }
    };
    
    if(clickProcessStats=="020200"){
    	loParam['map']['org_usr_id'] = hiddenAffr;
    	loParam['map']['rtn_rsn2'] = callCenterReturn+"님에게 반송 되었습니다.";
    }else{
    	loParam['map']['rtn_rsn'] = "";
    	loParam['map']['rtn_rsn2'] = deptCharger+"님에게 담당자지정 되었습니다.";
    }
    
    return  encodeURIComponent(JSON.stringify(loParam));
}

//부서접수목록 클릭시 내용   
function getJsonStrDeptRcepDetail(reqid , oucode, uid){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStr("c2VsZWN0", "b20wMTUuc2VsZWN0", {"comm_id" : reqid}),
	success : function(row){
		$("#csdbch_deptJobBtnRequstHis").show();
	    initcharger();
	    nowProcessStats=row.PROG_KND_CD;
	    callCenterReturn = row.USR_NM;
	    if(nowProcessStats=="010105"||nowProcessStats=="010200"){
	    	if (window.sessionStorage.getItem("CC_AUTH")=="Y") {
		    	$("#csdbch_deptJobBtnInsert").show();		    			
	    		$("#csdbch_deptJobBtnInsertRtn").show();
	    	}else{
	    		$("#csdbch_deptJobBtnInsert").hide();
	    		$("#csdbch_deptJobBtnInsertRtn").hide();		    		
	    	}
	    }else if(nowProcessStats=="030100"||nowProcessStats=="020200"){
    		$("#csdbch_deptJobBtnInsert").hide();
    		$("#csdbch_deptJobBtnInsertRtn").hide();			    	
	    }
	    if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"||window.sessionStorage.getItem("CC_AUTH")=="Y"){
	    	submitUnRock();
	    }
	    
	    $("#csdbch_deptJobRequstSe,#csdbch_deptJobRqester,#csdbch_deptJobCnsltTy,#csdbch_deptJobCnsltTy,#csdbch_grfrsPrson" +
	     ", #csdbch_deptJobChrg,#csdbch_deptJobCharger,#csdbch_deptJobPrvonsh,#csdbch_deptJobProcessCtns" +
	     ",#csdbch_grfrsPrson2,#csdbch_deptJobCnsltTy2,#csdbch_deptJobRegist,#csdbch_deptJobUpdt,#csdbch_deptJobAtchFile").empty();
		DEXT5.setHtmlValue("", 'deptJobCtns');
	    appn_gb_cd =row.NEW_YN;
	    $("#csdbch_grfrsPrson").html(row.AFFS_USR_NM);
	    $("#csdbch_grfrsPrson2").html(row.ORG_USR_ID_NM);
	    $("#csdbch_deptJobPrvonsh").val(row.RTN_RSN);			
	    $("#csdbch_deptJobPrvonsh").html(row.RTN_RSN);			
	    $("#csdbch_deptJobRequstSe").html(row.COMM_NEW);			
	    $("#csdbch_deptJobDbSe").val(row.CDB_GB_CD);		 
	    $("#csdbch_deptJobRqester").html(row.USR_NM);
	    $("#csdbch_deptJobCnsltTy").html(row.INTV_NM);
	    $("#csdbch_deptJobCnsltTy2").html(row.COMM_TTL);
	    
	    $("#csdbch_deptJobProcessCtns").html(row.ACT_CONT);
	    $("#csdbch_deptJobChrg").html(row.DEPT_ID_NM);	
	    //$("#csdbch_deptJobCtns").html(row.COMM_CNTN);
		DEXT5.setHtmlValue(row.COMM_CNTN, 'deptJobCtns');	
	    $("#csdbch_deptJobRegist").html(row.CRT_DTTM);
	    $("#csdbch_deptJobUpdt").html(row.MOD_DTTM);
	    $("#csdbch_DepttblReqid").val(row.COMM_ID);
	    $("#csdbch_deptJobChargerVal").val("");
	    $("#csdbch_deptJobAtchFile").empty();
	    hiddenAffr=row.AFFS_ORG_USR_ID;
	    hisTbbs_id = row.TBBS_ID;
	    if(row.PROG_KND_CD=="020200"){
	    	$("#csdbch_deptJobBtnInsert").hide();
	    }else{
	    	$("#csdbch_chargerJobBtnInsert").show();
	    }
	    showAttachFiles(row.COMM_ID,$("#csdbch_deptJobAtchFile"),"om015");

	    var proval = 0;
   		switch(nowProcessStats){
   		case "010105" :
   			proval = 25;
   			cssEvent(nowProcessStats);
   		      break;
   		case "010200" :
   		case "020300" :
   			proval = 50;
   			cssEvent(nowProcessStats);
   		      break;
   		case "020100" :
   			proval = 75;
   			cssEvent(nowProcessStats);
   		      break;
   		case "020200" :
   		case "030100" :
   			$("#csdbch_progressbar > *").css("color","#ffffff");
   			proval = 100;
   			break;
   		}
   		$("#csdbch_progressbar").progressbar({
   			value : proval
   		});
   		
   		if(nowProcessStats=="020200"){
   			$("#csdbch_HDeptJobPrvonsh").text("반송사유");
   	    	$("#csdbch_deptJobProcessCtns").css("display","none");
   	    	$("#csdbch_deptJobPrvonsh").show();
   		}else{
   			$("#csdbch_HDeptJobPrvonsh").text("처리내용");
   	    	$("#csdbch_deptJobPrvonsh").css("display","none"); 
   	    	$("#csdbch_deptJobProcessCtns").show();
   		}
   		
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}

//hhs 20.03.25 progress-label css
function cssEvent(nowProcessStats) {
	switch (nowProcessStats) {
	case "010105": // 부서접수
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(1).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "010200": // 담당자지정
	case "020300": // 재작성요청
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "020100": // 처리중
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	}
}

// autocomplete
function ChargerList_TextChangeEvent(){
    $("#csdbch_deptJobCharger").autocomplete({
	maxShowItems: 5,
	source : function( request, response ) {
	    $.ajax({
		type: 'post',
		url: "/ajax/civilservice/csw.do",
		dataType: "json",
		data: "pJson=" +  getJsonStr("c2VsZWN0TGlzdA==", "b20wNjEuY25zbHREYlByb2Nlc3NDaGFyZ2VyTGlzdA==", {
		    "key" : "value",
		    "userfullname" :$("#csdbch_deptJobCharger").val(),
		    "org_id" : sendingOuCode!="40903520000"?sendingOuCode:""
		}),
		success: function(data) {	                   
		    response( 
			    $.map(data, function(item) {	                            
				return {
				    label: (item.USERFULLNAME),
				    value: item.USERFULLNAME,
				    id : item
				}
			    })
		    );
		}, error:function(e){  
		    alert("자동완성을 사용할 수 없습니다.");  
		}  
	    });
	},
	minLength: 1,
	focus: function( event, ui ) {
	    return false; 
	},
	select: function( event, ui ) {
	    uid =ui.item.id.UID_;
	    deptCharger =ui.item.id.DISPLAYNAME;
	    $("#csdbch_deptJobChargerVal").val(uid);
	    $("#csdbch_deptJobChargerCheck").val(deptCharger);

	}
    });
}

//저장 버튼 클릭 이벤트
function deptBtnInsert_clickEvent(){
	var rowid = $("#csdbch_tblDeptRceptList").jqGrid('getGridParam','selrow');
	var rMsg = DivDeptValidatorRe();
	if(rMsg != ""){
	    alert(rMsg);
	    return;
	}
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + setJsonStrDeptInsert(),
		success : function(data){
			submitRock();
			$("#csdbch_tblDeptRceptList").trigger("reloadGrid");
			$("#csdbch_tblDeptRceptList").jqGrid("setSelection", rowid, true); // reload후 row다시 선택
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	alert("처리되었습니다.");
}


//오류처리 이벤트
function DivDeptValidatorRe(){
	var rMsg = "";
	
	//duplicate prevent
	if(rock==null){
	    rMsg ="상담DB를 선택해주세요.";
		return rMsg;
	}else if(rock==true){
	    rMsg ="저장완료 하였습니다.";
	    return rMsg;
	}
	
	//radio check
	if(/*nowProcessStats == "010200" || */nowProcessStats == "020100" || nowProcessStats =="020200" || nowProcessStats=="030100"){
	    rMsg="접수DB를 선택해주세요.";
		return rMsg;}
	
	return rMsg;
}


function initcharger(){
    $("#csdbch_deptJobCharger").val("");
    $("#csdbch_deptJobChargerCheck").val("");
}

function submitRock(){
    $("#csdbch_deptJobPrvonsh").attr("disabled",true);
    $("#csdbch_deptJobCharger").attr("disabled",true);
    rock=true;
}
function submitUnRock(){
   
    if(nowProcessStats=="010105" ||nowProcessStats=="010200" ||nowProcessStats=="010400"){
	$("#csdbch_deptJobPrvonsh").attr("disabled",false);
	$("#csdbch_deptJobCharger").attr("disabled",false);
    }else{
	$("#csdbch_deptJobPrvonsh").attr("disabled",true);
	$("#csdbch_deptJobCharger").attr("disabled",true);
    }
    
    rock=false;
}

//조회 버튼 클릭 이벤트   
function deptSrchSearch_clickEvent(){
    $("#csdbch_tblDeptRceptList").jqGrid("setGridParam", {postData : {pJson : getJsonStrDeptRceptList()}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#csdbch_tblDeptRceptList").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트
function deptSrchInit_clickEvent(){
    rock=null;
    nowProcessStats="";
    initDate();

    $("#csdbch_deptSrchRequstSe, #csdbch_deptSrchProgrsSttus, #csdbch_deptSrchDbSe, #csdbch_deptJobDbSe").val("all");
    $("#csdbch_deptJobRequstSe,#csdbch_deptJobRqester,#csdbch_deptJobCnsltTy,#csdbch_deptJobCnsltTy,#csdbch_grfrsPrson" +
     ",#csdbch_deptJobChrg,#csdbch_deptJobCharger,#csdbch_deptJobPrvonsh" +
     ",#csdbch_grfrsPrson2,#csdbch_deptJobCnsltTy2,#csdbch_deptJobRegist,#csdbch_deptJobUpdt,#csdbch_deptJobAtchFile").empty();
	DEXT5.setHtmlValue("", 'deptJobCtns');
    $("#csdbch_tblDeptRceptList").jqGrid("setGridParam", {postData : {pJson : getJsonStrDeptRceptList()}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#csdbch_tblDeptRceptList").trigger("reloadGrid");

}


//init selectbox
function initSelectBox(){
	$("#csdbch_deptSrchDbSe, #csdbch_chargerSrchDbSe, #csdbch_StatsSrchDbSe").empty();	 
	setSelectBoxWithCode2("csdbch_deptSrchRequstSe", "전체", "90302", g_popup, "", "");	    		// 요청구분 셋팅
	setSelectBoxWithCode3("csdbch_deptSrchProgrsSttus", "전체", "90301", g_popup, "", "");	    	// 진행상태 셋팅 시스템코드 처리결과
	setSelectBoxWithCode2("csdbch_deptSrchDbSe", "전체", "90303", g_popup, "", "");	    	// DB구분 div1
	setSelectBoxWithCode2("csdbch_deptJobDbSe","전체", "90303", g_popup, "", "");	   			// DB구분 
	
}

//init  date
function initDate(){
	datePicker("#csdbch_deptSrchSelFrDate");
	datePicker("#csdbch_deptSrchSelToDate");
	$("#csdbch_deptSrchSelFrDate").val(getDate());
	$("#csdbch_deptSrchSelToDate").val(getDate());
}

function fnSetOrgcswDATrans(objInfo) {
	var agencyCategory = objInfo.CATEGORY;
	if (agencyCategory == "AA") {	
		$("#csdbch_deptJobCharger").val(objInfo.DEPT_NM);
		$("#csdbch_deptJobChargerVal").val(objInfo.USR_ID);	
		$("#csdbch_deptJobChargerCheck").val(objInfo.USR_NM);
	} else if (agencyCategory == "CC"){
		$("#csdbch_deptJobCharger").val(objInfo.TEAM_NM);
		$("#csdbch_deptJobChargerVal").val(objInfo.USR_ID);	
		$("#csdbch_deptJobChargerCheck").val(objInfo.USR_NM);
	} else if (agencyCategory == "EA") {
		$("#cstrvc_r_org_id").val("externAgency");
		$("#csdbch_deptJobCharger").val(objInfo.TEAM_NM);
		$("#csdbch_deptJobChargerVal").val(objInfo.USR_ID);	
		$("#csdbch_deptJobChargerCheck").val(objInfo.USR_NM);
	}
}

function allDept_checkEvent(){
	sendingOuCode = null;
}

//initialization screen
function screenChargerAppn(){
	initDate();
	initSelectBox();
	csdbch_editerCall();
	$("#csdbch_deptJobBtnRequstHis").hide();
	$("#csdbch_progressbar").progressbar({
	      value: 0
    });/*
	var progressbar = $( "#csdbch_progressbar" ),
    progressLabel = $( ".progress-label" );
	progressLabel.text( "     " );*/
/*
  progressbar.progressbar({
    value: false,
    change: function() {
      //progressLabel.text( progressbar.progressbar( "value" ) + "%" );
    },
    complete: function() {
      //progressLabel.text( "Complete!" );
    }
  });
*/

  //setTimeout( progress, 2000 );
	$("#csdbch_tblDeptRceptList").jqGrid({
		url : "/jqgrid/civilservice/csw.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrDeptRceptList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["번호","게시물ID","기관ID","부서ID","기관사용자ID","요청일","요청구분", "상담유형", "제목","처리일자","부서명", "서무", "담당자", "처리상태"],
		colModel :
	   	[
	   	 	{ name : "COMM_ID", 	index : "COMM_ID", 	hidden : true },
	   	 	{ name : "TBBS_ID", 	index : "TBBS_ID", hidden : true },
	   	 	{ name : "ORG_ID", 	index : "ORG_ID", 	hidden : true },
	   	 	{ name : "DEPT_ID", 	index : "DEPT_ID", 	hidden : true },
	   	 	{ name : "ORG_USR_ID", 	index : "ORG_USR_ID", 	hidden : true },
	   	 	{ name : "CRT_DTTM", 	index : "CRT_DTTM", 	align : "center", width : 50 },					    	//처리일자
	   	 	{ name : "COMM_NEW", 	index : "COMM_NEW", 	align : "center", width : 30 },					   	//요청구분								
			{ name : "INTV_NM", 	index : "INTV_NM", 	align : "left", width : 120 },						//상담유형
			{ name : "COMM_TTL", 	index : "COMM_TTL", 	align : "left", width : 80 },
			{ name : "ACT_DTTM", 	index : "ACT_DTTM", 	align : "center", width : 50 },					    	//처리일자
			{ name : "AFFS_DEPT_NM", index : "AFFS_DEPT_NM", 	align : "center", width : 50 },                   			//부서명
			{ name : "AFFS_USR_NM", index : "AFFS_USR_NM", 	align : "center", width : 30 },                   			//서무
			{ name : "ORG_USR_ID_NM", index : "ORG_USR_ID_NM", align : "center", width : 30 },		// 담당자
			{ name : "PROG_KND_NM", index : "PROG_KND_NM", 	align : "center", width : 35 },				  	 	//처리상태 코드추가	
	   	],
	   	sortname : "CRT_DTTM",																			  	
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "267",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [5, 10, 20, 50, 100],
	   	autowidth : true,
	   	pager : "#csdbch_pgDeptRceptList",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	onSelectRow : function(rowid)
	   	{
	   	    $("#csdbch_deptJobBtnRequstHis").show();
	   		var row = $("#csdbch_tblDeptRceptList").getRowData(rowid);
	   		getJsonStrDeptRcepDetail(row.COMM_ID);
	   		
	   		//hhs
	   		//팝업을 위한 SETTING
			clickReqId=row.COMM_ID;
			clickTbbsId=row.TBBS_ID;
		  
	   	},
		loadComplete : function(){
			$('#csdbch_deptSrchProgrsSttus option[value="010100"]').remove();
			$('#csdbch_deptSrchProgrsSttus option[value="010400"]').remove();
			$('#csdbch_deptSrchProgrsSttus option[value="020200"]').remove();
		}
	}).jqGrid("navGrid", "#csdbch_pgDeptRceptList", {edit : false, add : false, del : false, search : false});
	
	// add event to this
	$("#csdbch_deptSrchSearch").bind("click", deptSrchSearch_clickEvent);
	//hhs
//	$("#csdbch_deptJobBtnInsert").bind("click", deptBtnInsert_clickEvent);
	$("#csdbch_deptJobBtnInsert").click(function(e) {
		if($("#csdbch_deptJobCharger").val()==""){	    
			alert("담당자를 지정해주세요.");
			$("#csdbch_deptJobCharger").focus();
			return;
		}
		clickProcessStats="010200"; //담당자지정
		deptBtnInsert_clickEvent();
	});
	
	//hhs 20.03.25
	$("#csdbch_deptJobBtnInsertRtn").bind("click", function(e) {deptBtnReturn_popupEvent('csdbch_deptJobBtnInsertRtn');});
	
	$("#csdbch_deptJobBtnRequstHis").click(function(e) {requstHis_popupEvent(hisTbbs_id);});
	$("#csdbch_deptSrchInit").bind("click", deptSrchInit_clickEvent);
	$("#csdbch_deptJobCharger").click(function(e) {initcharger();});
	$("#csdbch_deptJobCharger").bind("keydown", ChargerList_TextChangeEvent);

	$("#csdbch_cntrSearch").on("click", function(e) {
		window.sessionStorage.setItem("fromFlag", "fromcswDA");
		window.sessionStorage.setItem("corpOpenType", "adminAgency");
		//var paramURL = getContextPath() + "/web/counsel/organizationChart.do";
		//gf_openDialog(paramURL,1600,1000,"no","no",0,0);
		openMenuPopup("CM0311");
	});	

	$("#csdbch_cntrSearch").hide();
	if (window.sessionStorage.getItem("CC_AUTH")=="Y") {
		$("#csdbch_ALLDept").show();
		$("#csdbch_ALLDept").trigger("click");
		$("#csdbch_ALLDept_th").html("전체부서");
		if(sendingOuCode==''){
			$("#csdbch_cntrSearch").show();			
		}
	}else if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"){
		/*$("#csdbch_cntrSearch").hide();*/
	} else{
		/*$("#csdbch_cntrSearch").hide();*/
		$("#csdbch_deptJobBtnInsert").hide();		
	}
	

};

function csdbch_editerCall() {
	DEXT5.config.Mode = 'view';
	DEXT5.config.Height = "100%";
	DEXT5.config.Width = "100%;";
	DEXT5.config.zStatusBar = "1";
	DEXT5.config.zTopMenu = "1";
	DEXT5.config.zToolBar = "1";
	DEXT5.config.SkinName = "gray";
	DEXT5.config.EditorHolder = "csdbch_deptJobCtns";
	new Dext5editor("deptJobCtns");
}

//hhs 2020.03.25
//반송 팝업
function deptBtnReturn_popupEvent(btnId){
	var width = 500;
	var height = 165;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/civilservice/cswDbManage_return.do?tbbsId="+clickTbbsId+"&reqId="+clickReqId+"&btnId="+btnId;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "반송", option);
	newWindow.focus();	
	
}
