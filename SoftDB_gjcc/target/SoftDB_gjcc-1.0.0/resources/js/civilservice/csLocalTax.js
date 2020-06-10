var searchValExist = false;
var searchStr;
var searchEnd;

var lcTXresNumb;
var lcTXeNapbuNumb;
var lcTXcitizenNm;
var b64lcTXresNumb;
var b64lcTXeNapbuNumb;
var b64lcTXcitizenNm;

var checkResNumbByIvrCall = false;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function btnLocalTaxSearch_clickEvent() {
	if (checkResNumbByIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	$("#csLocaltax_tblCsLocalTaxList").jqGrid("setGridParam", {postData : {pJson : getJsonStrLocalTaxList()} , page : 1, sortname : "부과일자", sortorder : "DESC"});
	$("#csLocaltax_tblCsLocalTaxList").trigger("reloadGrid");
}

function btnLocalTaxInit_clickEvent() {
	searchValExist = false;
	checkResNumbByIvrCall = false;
	$("#csLocaltax_tfSrchCitizenPreResNumb").val("");
	$("#csLocaltax_tfSrchCitizenPostResNumb").val("");
	$("#csLocaltax_tfSrchEnapbuNumb").val("");
	$("#csLocaltax_tfSrchCitizenNM").val("");
	$("#csLocaltax_tbl").find("label").text("");
	btnLocalTaxSearch_clickEvent();
}

function csLocaltax_btnIvrCall_clickEvent(){
	btnIvrCall_clickEvent("cvsvif_divLocalTaxTab");
	checkResNumbByIvrCall = true;
}

function csLocaltaxHistory_clickEvent(e) {
	window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
	window.sessionStorage.setItem("inqr_scr", "csLocalTax");
	window.sessionStorage.setItem("b64lcTXresNumb", b64lcTXresNumb);
	window.sessionStorage.setItem("b64lcTXeNapbuNumb", b64lcTXeNapbuNumb);
	window.sessionStorage.setItem("b64lcTXcitizenNm", b64lcTXcitizenNm);
	
	window.open("", "csAdministrationOpenHistory", 'scrollbars=no, resizable=no, width=1200, height=750, left=150, top=150'); 
	document.csLocaltax_lcTXform.target ="csAdministrationOpenHistory"; 
	document.csLocaltax_lcTXform.action="/web/civilservice/csAdministrationHistory.do"; 
	document.csLocaltax_lcTXform.submit();
}
function insertObjLocalTaxHistory(status, err) {
	if (searchValExist == true) {
		searchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = searchEnd.getTime() - searchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
		var inqr_cond = "주민번호:" + lcTXresNumb + ",전자납부번호:" + lcTXeNapbuNumb + ",성명/상호:" + lcTXcitizenNm;
		var rslt = "주민번호:" + b64lcTXresNumb + ",전자납부번호:" + b64lcTXeNapbuNumb + ",성명/상호:" + b64lcTXcitizenNm;
		
		var loParam_localTax = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : "200000",  
					"inqr_scr" : "csLocalTax",
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
			url : getContextPath() + "/ajax/civilservice/insertLocalTaxHistory.do",
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_localTax)),
			success : function(data) {
				searchValExist == false;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

function getJsonStrLocalTaxList() {
	lcTXresNumb = SHA256($("#csLocaltax_tfSrchCitizenPreResNumb").val() + $("#csLocaltax_tfSrchCitizenPostResNumb").val());
	lcTXeNapbuNumb = SHA256($("#csLocaltax_tfSrchEnapbuNumb").val());
	lcTXcitizenNm = SHA256($("#csLocaltax_tfSrchCitizenNM").val());
	
	b64lcTXresNumb = b64EncodeUnicode($("#csLocaltax_tfSrchCitizenPreResNumb").val() + $("#csLocaltax_tfSrchCitizenPostResNumb").val());
	b64lcTXeNapbuNumb = b64EncodeUnicode($("#csLocaltax_tfSrchEnapbuNumb").val());
	b64lcTXcitizenNm = b64EncodeUnicode($("#csLocaltax_tfSrchCitizenNM").val());
	
	if (($("#csLocaltax_tfSrchCitizenPreResNumb").val() + $("#csLocaltax_tfSrchCitizenPostResNumb").val()).length == 13 
			|| $("#csLocaltax_tfSrchEnapbuNumb").val().length >= 1
			|| $("#csLocaltax_tfSrchCitizenNM").val().length >= 1) { // 검색 조건이 있을 경우
		searchValExist = true;
		searchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "bG9jYWx0YXgubG9jYWxUYXhzZWxlY3RMaXN0",
		"map" : {
			"key" : "value",
			"tpr_no" : $("#csLocaltax_tfSrchCitizenPreResNumb").val() + $("#csLocaltax_tfSrchCitizenPostResNumb").val(),
			"eNapbuNumb" : $("#csLocaltax_tfSrchEnapbuNumb").val(),
			"cn_emp" : $("#csLocaltax_tfSrchCitizenNM").val()
		}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function initdivLocalTaxTab() {
	$("#csLocaltax_BtnHistory").hide(); 
	$("#csLocaltax_btnSearch").bind("click", btnLocalTaxSearch_clickEvent);
	$("#csLocaltax_btnInit").bind("click", btnLocalTaxInit_clickEvent);
	$("#csLocaltax_btnIvrCall").bind("click", csLocaltax_btnIvrCall_clickEvent);
	$("#csLocaltax_BtnHistory").bind("click", csLocaltaxHistory_clickEvent); 
	
	$("#csLocaltax_tfSrchEnapbuNumb, #csLocaltax_tfSrchCitizenPostResNumb, #csLocaltax_tfSrchCitizenNM").bind("keydown", function(key){ 
		if (key.keyCode == 13) 
			btnLocalTaxSearch_clickEvent();
	});
	
	$("#csLocaltax_tblCsLocalTaxList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csLocalTaxList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {
			pJson : getJsonStrLocalTaxList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [
			"구분", "성명/상호", "과세구분",
			"과세번호", "전자납부번호", "차량번호",
			"과세년월", "체납여부", "회계세목명",
			"미납액", "당초본세", "징수결정일",
			"본세", "가산금", "부과일자",
			"최초납기", "납기", "납부일",
			"가상계좌번호", "가상계좌은행",
			"가상계좌번호2", "가상계좌은행2", 
			"예금주명"
		],
		colModel :
		[
			{name : "GB", index : "GB", align : "center", width : 100},
			{name : "CN_EMP", index : "CN_EMP", align : "center", width : 100},
			{name : "과세구분", index : "과세구분", align : "center", width : 100},
			{name : "과세번호", index : "과세번호", align : "center", width : 100},
			{name : "전자납부번호", index : "전자납부번호", align : "center", width : 100},
			{name : "차량번호", index : "차량번호", align : "center", width : 100, hidden : true},
			{name : "과세년월", index : "과세년월", align : "center", width : 100},
			{name : "체납여부", index : "체납여부", align : "center", width : 100},
			{name : "회계세목명", index : "대표세목명", align : "center", width : 100},
			{name : "미납액", index : "미납액", align : "center", width : 100},
			{name : "당초본세", index : "당초본세", align : "center", width : 100, hidden : true},
			{name : "징수결정일", index : "징수결정일", align : "center", width : 100, hidden : true},
			{name : "본세", index : "본세", align : "center", width : 100, hidden : true},
			{name : "가산금", index : "가산금", align : "center", width : 100, hidden : true},
			{name : "부과일자", index : "부과일자", align : "center", width : 100},
			{name : "최초납기", index : "최초납기", align : "center", width : 100, hidden : true},
			{name : "납기", index : "납기", align : "center", width : 100, hidden : true},
			{name : "납부일", index : "납부일", align : "center", width : 100, hidden : true},
			{name : "가상계좌번호", index : "가상계좌번호", align : "center", width : 100, hidden : true},
			{name : "가상계좌은행", index : "가상계좌번호", align : "center", width : 100, hidden : true},
			{name : "가상계좌번호2", index : "가상계좌번호2", align : "center", width : 100, hidden : true},
			{name : "가상계좌은행2", index : "가상계좌번호2", align : "center", width : 100, hidden : true},
			{name : "예금주명", index : "예금주명", align : "center", width : 100, hidden : true},
		],
		sortname : "부과일자",
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
	   	pager : "#csLocaltax_pagingCsLocalTaxList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,	
		onSelectRow : function(rowid) 
		{
			var rowData = $("#csLocaltax_tblCsLocalTaxList").jqGrid("getRowData", rowid);
			if (rowData != null) {
				$("#csLocaltax_BtnHistory").show();
				$("#csLocaltax_cnNm").text(rowData.CN_EMP);
				$("#csLocaltax_cnGb").text(rowData.GB);
				$("#csLocaltax_cnGawseGb").text(rowData.과세구분);
				$("#csLocaltax_cnGawseNumb").text(rowData.과세번호);
				$("#csLocaltax_cnENapbuNumb").text(rowData.전자납부번호);
				$("#csLocaltax_cnCarNumb").text(rowData.차량번호);
				$("#csLocaltax_cnGwaseYMD").text(rowData.과세년월);
				$("#csLocaltax_cnChenapYN").text(rowData.체납여부);
				$("#csLocaltax_cnSaemokNm").text(rowData.대표세목명);
				$("#csLocaltax_cnMenapPrice").text(rowData.미납액);
				$("#csLocaltax_cnDangchBonse").text(rowData.당초본세);
				$("#csLocaltax_cnJingYMD").text(rowData.징수결정일);
				$("#csLocaltax_cnBonse").text(rowData.본세);
				$("#csLocaltax_cnGasanPrice").text(rowData.가산금);
				$("#csLocaltax_cnBugwaYMD").text(rowData.부과일자);
				$("#csLocaltax_cnFirstNapYMD").text(rowData.최초납기);
				$("#csLocaltax_cnNapYMD").text(rowData.납기);
				$("#csLocaltax_cnNapbuYMD").text(rowData.납부일);
				$("#csLocaltax_cnGaccountNumb1").text(rowData.가상계좌번호 + "(" + rowData.가상계좌은행 + ")");
				if (rowData.가상계좌번호2 != null && rowData.가상계좌번호2 != "") {
					$("#csLocaltax_cnGaccountNumb2").text(rowData.가상계좌번호2 + "(" + rowData.가상계좌은행2 + ")");
				}
				$("#csLocaltax_cnYegmjuNm").text(rowData.예금주명);
			}
		},
		loadComplete : function(data, status, err) {
			insertObjLocalTaxHistory(status, err);
		},
		loadError : function(data, status, err) {
			insertObjLocalTaxHistory(status, err);
			networkErrorHandler(data, status, err);
		}
	}).jqGrid("navGrid", "#csLocaltax_pagingCsLocalTaxList", {edit : false, add : false, del : false, search : false});
}
