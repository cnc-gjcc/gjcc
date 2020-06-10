var searchValExist = false;
var searchStr;
var searchEnd;

var carResNumb;
var carCitizenNm;
var car_carNumb;
var b64CarResNumb;
var b64CarCitizenNm;
var b64Car_carNumb;

var checkResNumbByIvrCall = false;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function carTabBtnSearch_clickEvent() {
//	if (checkResNumbByIvrCall == false) {
//		alert("ARS 인증을 먼저 해주셔야 됩니다.");
//		return;
//	};
	
	$("#csCar_tblCarList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCarInfoList()} , page : 1, sortname : "VM_GOJIDATE", sortorder : "DESC"});
	$("#csCar_tblCarList").trigger("reloadGrid");
}

function carTabBtnInit_clickEvent() {
	searchValExist = false;
	checkResNumbByIvrCall = false;
	$("#csCar_BtnHistory").hide();
	$("#csCar_tfSrchCitizenPreResNumb").val("");
	$("#csCar_tfSrchCitizenPostResNumb").val("");
	$("#csCar_tfSrchCitizenNm").val("");
	$("#csCar_tfSrchCarNumb").val("");
	$("#csCar_tfSrchFrDate").val(d_frDate);
	$("#csCar_tfSrchToDate").val(d_toDate);
	$("#csCar_tbl").find("label").text("");
	carTabBtnSearch_clickEvent();
}

function csCar_btnIvrCall_clickEvent(){
	alert("현재 주.정차과태료의 ARS인증 기능은 사용하실 수 없습니다.");
	
	/*주.정차과태료 테이블의 주민번호 판별 함수가 적용되면 alert 구문 제거하시고 밑의 주석을 모두 해제하세요*/
//	btnIvrCall_clickEvent("cvsvif_divCarTab");
//	checkResNumbByIvrCall = true;
}

function getJsonStrCarInfoList() {
	carResNumb = SHA256($("#csCar_tfSrchCitizenPreResNumb").val() + $("#csCar_tfSrchCitizenPostResNumb").val());
	carCitizenNm = SHA256($("#csCar_tfSrchCitizenNm").val());
	car_carNumb = SHA256($("#csCar_tfSrchCarNumb").val());
	
//	b64CarResNumb = b64EncodeUnicode($("#csCar_tfSrchCitizenPreResNumb").val() + $("#csCar_tfSrchCitizenPostResNumb").val());
	b64CarCitizenNm = b64EncodeUnicode($("#csCar_tfSrchCitizenNm").val());
	b64Car_carNumb = b64EncodeUnicode($("#csCar_tfSrchCarNumb").val());
	if (($("#csCar_tfSrchCitizenPreResNumb").val() + $("#csCar_tfSrchCitizenPostResNumb").val()).length == 13 
			|| $("#csCar_tfSrchCitizenNm").val().length >= 1
			|| $("#csCar_tfSrchCarNumb").val().length >= 1) { // 검색 조건이 있을 경우
		searchValExist = true;
		searchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2FyX2ZpbmUuY2FyRmluZXNlbGVjdExpc3Q=",
			"map" : {
				"key" : "value",
//				"vmJno" : $("#csCar_tfSrchCitizenPreResNumb").val() + $("#csCar_tfSrchCitizenPostResNumb").val(),
				"vmName" : $("#csCar_tfSrchCitizenNm").val(),
				"vmCarNo" : $("#csCar_tfSrchCarNumb").val(),
				"vmFrDate" : $("#csCar_tfSrchFrDate").val().replace(/-/gi, ""),
				"vmToDate" : $("#csCar_tfSrchToDate").val().replace(/-/gi, "")
			}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function csCarHistory_clickEvent(e) {
	window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
	window.sessionStorage.setItem("inqr_scr", "csCar");
//	window.sessionStorage.setItem("b64CarResNumb", b64CarResNumb);
	window.sessionStorage.setItem("b64CarCitizenNm", b64CarCitizenNm);
	window.sessionStorage.setItem("b64Car_carNumb", b64Car_carNumb);
	
	window.open("", "csAdministrationOpenHistory", 'scrollbars=no, resizable=no, width=1200, height=750, left=150, top=150'); 
	document.csCar_TXform.target ="csAdministrationOpenHistory"; 
	document.csCar_TXform.action="/web/civilservice/csAdministrationHistory.do"; 
	document.csCar_TXform.submit();
}

function insertObjcarHistory(status, err) {
	if (searchValExist == true) {
		searchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = searchEnd.getTime() - searchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
//		var inqr_cond = "주민번호:" + carResNumb + ",소유자명:" + carCitizenNm + ",차량번호:" + car_carNumb;
//		var rslt = "주민번호:" + b64CarResNumb + ",소유자명:" + b64CarCitizenNm + ",차량번호:" + b64Car_carNumb;
		
		var inqr_cond = "소유자명:" + carCitizenNm + ",차량번호:" + car_carNumb;
		var rslt = "소유자명:" + b64CarCitizenNm + ",차량번호:" + b64Car_carNumb;
		
		var loParam_car = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : "300000",  
					"inqr_scr" : "csCar", 
					"inqr_cond" : inqr_cond,
					"ans_tm" : ans_tm, 
					"rslt_cd" : status != "error" ? "00000" : "00001", 
					"rslt" : status != "error" ? rslt : err 
				}
		};
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/insertCarHistory.do",
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_car)),
			success : function(data) {
				searchValExist == false;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

function initdivCarTab() {
	$("#csCar_BtnHistory").hide(); 
	$("#csCar_btnCarSearch").bind("click", carTabBtnSearch_clickEvent);
	$("#csCar_btnCarInit").bind("click", carTabBtnInit_clickEvent);
	$("#csCar_BtnHistory").bind("click", csCarHistory_clickEvent);
	$("#csCar_btnIvrCall").bind("click", csCar_btnIvrCall_clickEvent); 
	$("#csCar_tfSrchCitizenPostResNumb, #csCar_tfSrchCitizenNm, #csCar_tfSrchCarNumb").bind("keydown", function(key){ 
		if (key.keyCode == 13) 
			carTabBtnSearch_clickEvent();
	});
	
	d_frDate = getPrvDay("Y", 1, "-");
	d_toDate = getDate();
	datePicker("#csCar_tfSrchFrDate");
	datePicker("#csCar_tfSrchToDate");
	$("#csCar_tfSrchFrDate").val(d_frDate);
	$("#csCar_tfSrchToDate").val(d_toDate);
	
	$("#csCar_tblCarList").jqGrid({ 
		url : getContextPath() + "/jqgrid/civilservice/csCarList.do",
		datatype : "json",
		mtype : "post",
		postData : {
			pJson : getJsonStrCarInfoList()
		},
		jsonReader : {
			repeatitems : false
		},
		colNames : ["차량번호", "소유자명", "고지번호", "고지일자", "부과원금", "가산금", "총부과금", "수납금", "감액금", "잔액(미납액)", "소인일자", "압류일자", "압류해제일자", "수납일자", "처리상태", "단속시간", "단속장소"],
		colModel : [
			{name : "VM_CARNO", index : "VM_CARNO", align : "center", width : 80},
			{name : "VM_NAME", index : "VM_NAME", align : "center", width : 80},
			{name : "VM_GOJINO", index : "VM_GOJINO", align : "center", width : 80, hidden : true},
			{name : "VM_GOJIDATE", index : "VM_GOJIDATE", align : "center", width : 80}, 
			{name : "VM_ORG_AMT", index : "VM_ORG_AMT", align : "center", width : 80}, 
			{name : "VM_ADD_AMT", index : "VM_ADD_AMT", align : "center", width : 80}, 
			{name : "VM_SUM_AMT", index : "VM_SUM_AMT", align : "center", width : 80},
			{name : "VM_RP_AMT", index : "VM_RP_AMT", align : "center", width : 80, hidden : true},
			{name : "VM_RD_AMT", index : "VM_RD_AMT", align : "center", width : 80, hidden : true},
			{name : "VM_AMT", index : "VM_AMT", align : "center", width : 80, hidden : true}, 
			{name : "VM_SODATE", index : "VM_SODATE", align : "center", width : 80, hidden : true}, 
			{name : "VM_SZDATE", index : "VM_SZDATE", align : "center", width : 80}, 
			{name : "VM_SUDATE", index : "VM_SUDATE", align : "center", width : 80, hidden : true}, 
			{name : "VM_HJDATE", index : "VM_HJDATE", align : "center", width : 80, hidden : true}, 
			{name : "VM_STATE_ID", index : "VM_STATE_ID", align : "center", width : 80},
			{name : "VM_DATETIME", index : "VM_DATETIME", align : "center", width : 80},
			{name : "VM_JANGSO", index : "VM_JANGSO", align : "center", width : 80},
		],
		sortname : "VM_GOJIDATE",
	   	sortorder : "DESC",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#csCar_pagingCarList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var rowData = $("#csCar_tblCarList").jqGrid("getRowData", rowid);
	   		if (rowData != null) {
	   			$("#csCar_BtnHistory").show();
				$("#csCar_vmCarNo").html(rowData.VM_CARNO);
				$("#csCar_vmName").html(rowData.VM_NAME);
				$("#csCar_vmDateTime").html(rowData.VM_DATETIME);
				$("#csCar_vmGojiNo").html(rowData.VM_GOJINO);
				$("#csCar_vmGojiDate").html(rowData.VM_GOJIDATE);
				$("#csCar_vmOrgAmt").html(rowData.VM_ORG_AMT);
				$("#csCar_vmAddAmt").html(rowData.VM_ADD_AMT);
				$("#csCar_vmSumAmt").html(rowData.VM_SUM_AMT);
				$("#csCar_vmRpAmt").html(rowData.VM_RP_AMT);
				$("#csCar_vmRdAmt").html(rowData.VM_RD_AMT);
				$("#csCar_vmAmt").html(rowData.VM_AMT);
				$("#csCar_vmSoDate").html(rowData.VM_SODATE);
				$("#csCar_vmSzDate").html(rowData.VM_SZDATE);
				$("#csCar_vmSuDate").html(rowData.VM_SUDATE);
				$("#csCar_vmHjDate").html(rowData.VM_HJDATE);
				$("#csCar_vmStateID").html(rowData.VM_STATE_ID);
				$("#csCar_vmJanso").html(rowData.VM_JANGSO);
			}
	   	},
	   	loadComplete : function(data, status, err) {
			insertObjcarHistory(status, err);
		},
		loadError : function(data, status, err) {
			insertObjcarHistory(status, err);
		}
	}).jqGrid("navGrid", "#csCar_pagingCarList", {edit : false, add : false, del : false, search : false});
}
