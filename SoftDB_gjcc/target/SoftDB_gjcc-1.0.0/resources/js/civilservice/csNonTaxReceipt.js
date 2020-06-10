var arrTXsearchValExist = false;
var arrTXsearchStr;
var arrTXresNumb
var arrTXcitizenNM;
var arrTXcitizenTelNumb;
var b64arrTXresNumb;
var b64arrTXcitizenNM;
var b64arrTXcitizenTelNumb;

var ovrPYsearchValExist = false;
var ovrPYsearchStr;
var ovrPYresNumb
var ovrPYcitizenNM;
var ovrPYcitizenTelNumb;
var b64ovrPYresNumb;
var b64ovrPYcitizenNM;
var b64ovrPYcitizenTelNumb;

var checkResNumbByIvrCall = false;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function initdivNonTaxRcptTab() {
	carTabs = $("#csNonTaxRcpt_divCorpSubTab").tabs();
	$(".ui-widget-header").css("border","0px");
	$(".ui-widget-header").css("background","#fff");
	
	$("#csNonTaxRcpt_arrTXBtnHistory, #csNonTaxRcpt_ovrPYBtnHistory").hide(); 
	$("#csNonTaxRcpt_arrTXBtnHistory, #csNonTaxRcpt_ovrPYBtnHistory").bind("click", csNonTaxRcptHistory_clickEvent); 
	
	nonTaxRcptArrearTaxTab();
	nonTaxRcptOverpayTaxTab();
	
	$("#csNonTaxRcpt_arrTXbtnTaxSearch").bind("click", arrTXbtnTaxSearch_clickEvent); 
	$("#csNonTaxRcpt_arrTXbtnTaxInit").bind("click", arrTXbtnTaxInit_clickEvent); 
	$("#csNonTaxRcpt_arrTXbtnIvrCall").bind("click", csNonTaxRcpt_arrTXbtnIvrCall_clickEvent); 
	$("#csNonTaxRcpt_arrTXtfSrchCitizenNM, #csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb, #csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").bind("keydown", function(key){ 
		if (key.keyCode == 13) 
			arrTXbtnTaxSearch_clickEvent();
	});
	
	$("#csNonTaxRcpt_ovrPYbtnTaxSearch").bind("click", ovrPYbtnTaxSearch_clickEvent); 
	$("#csNonTaxRcpt_ovrPYbtnTaxInit").bind("click", ovrPYbtnTaxInit_clickEvent); 
	$("#csNonTaxRcpt_ovrPYbtnIvrCall").bind("click", csNonTaxRcpt_ovrPYbtnIvrCall_clickEvent); 
	$("#csNonTaxRcpt_ovrPYtfSrchCitizenNM, #csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb, #csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").bind("keydown", function(key){
		if (key.keyCode == 13) 
			ovrPYbtnTaxSearch_clickEvent();
	});
}

function csNonTaxRcptHistory_clickEvent(e) {
	if (e.currentTarget.id == "csNonTaxRcpt_arrTXBtnHistory") {
		window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
		window.sessionStorage.setItem("inqr_scr", "csNonTax,arrTX");
		window.sessionStorage.setItem("b64arrTXresNumb", b64arrTXresNumb);
		window.sessionStorage.setItem("b64arrTXcitizenNM", b64arrTXcitizenNM);
		window.sessionStorage.setItem("b64arrTXcitizenTelNumb", b64arrTXcitizenTelNumb);
	} else if (e.currentTarget.id == "csNonTaxRcpt_ovrPYBtnHistory") {
		window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
		window.sessionStorage.setItem("inqr_scr", "csNonTax,ovrPY");
		window.sessionStorage.setItem("b64ovrPYresNumb", b64ovrPYresNumb);
		window.sessionStorage.setItem("b64ovrPYcitizenNM", b64ovrPYcitizenNM);
		window.sessionStorage.setItem("b64ovrPYcitizenTelNumb", b64ovrPYcitizenTelNumb);
	};
	
	window.open("", "csAdministrationOpenHistory", 'scrollbars=no, resizable=no, width=1200, height=750, left=150, top=150'); 
	document.csNonTaxRcpt_arrTXform.target ="csAdministrationOpenHistory"; 
	document.csNonTaxRcpt_arrTXform.action="/web/civilservice/csAdministrationHistory.do"; 
	document.csNonTaxRcpt_arrTXform.submit();
}

function insertObjNonTaxRcptHistory(status, err, pId) {
	var searchValExist;
	var searchStr;
	var searchEnd;
	var lnk_stm_cd;
	var inqr_scr;
	var inqr_cond;
	var rslt;
	
	switch (pId) {
		case "arrTX": // 체납인 경우
			searchValExist = arrTXsearchValExist;
			searchStr = arrTXsearchStr;
			lnk_stm_cd = "400001";
			inqr_scr = "arrTX";
			inqr_cond = "주민번호:" + arrTXresNumb + ",납부자명:" + arrTXcitizenNM + ",전화번호:" + arrTXcitizenTelNumb;
			rslt = "주민번호:" + b64arrTXresNumb + ",납부자명:" + b64arrTXcitizenNM + ",전화번호:" + b64arrTXcitizenTelNumb;
			break;
		case "ovrPY": // 과오납인 경우
			searchValExist = ovrPYsearchValExist;
			searchStr = ovrPYsearchStr;
			lnk_stm_cd = "400002";
			inqr_scr = "ovrPY";
			inqr_cond = "주민번호:" + ovrPYresNumb + ",납부자명:" + ovrPYcitizenNM + ",전화번호:" + ovrPYcitizenTelNumb;
			rslt = "주민번호:" + b64ovrPYresNumb + ",납부자명:" + b64ovrPYcitizenNM + ",전화번호:" + b64ovrPYcitizenTelNumb;
			break;
	};
	
	if (searchValExist == true) {
		searchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = searchEnd.getTime() - searchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
		var loParam_nonTaxRcpt = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : lnk_stm_cd,  
					"inqr_scr" : "csNonTax >> " + inqr_scr, 
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
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_nonTaxRcpt)),
			success : function(data) {
				switch (lnk_stm_cd) {
					case "400001": 
						arrTXsearchValExist == false;
						break;
					case "400002": 
						ovrPYsearchValExist == false;
						break;
				};
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

function telNumbNCellNumbFormArr(citizenTelNumb) {
	var numbArr = [];
	for (var i = 0; i <= 1; i++) {
		if (citizenTelNumb.length == 11) {
			numbArr[i] = citizenTelNumb;
			i++
			numbArr[i] = citizenTelNumb.substring(3,11);
		} else if (citizenTelNumb.length == 10) {
			numbArr[i] = citizenTelNumb;
			i++
			numbArr[i] = citizenTelNumb.substring(3,10);
		} else if (citizenTelNumb.length == 8) {
			numbArr[i] = citizenTelNumb;
			i++
			numbArr[i] = citizenTelNumb.substring(4,8);
			break;
		}
	}
	return numbArr;
}

function arrTXbtnTaxSearch_clickEvent() {
	if (checkResNumbByIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	$("#csNonTaxRcpt_arrTXtblList").jqGrid("setGridParam", {postData : {pJson : getJsonStrNonTaxRcptArrearTax()} , page : 1, sortname : "LST_NAP_YMD", sortorder : "DESC"});
	$("#csNonTaxRcpt_arrTXtblList").trigger("reloadGrid");
}

function arrTXbtnTaxInit_clickEvent() {
	arrTXsearchValExist = false;
	checkResNumbByIvrCall = false;
	$("#csNonTaxRcpt_arrTXBtnHistory").hide();
	$("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val("");
	$("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val("");
	$("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val("");
	$("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val("");
	$("#csNonTaxRcpt_arrTXtbl").find("label").text("");
	arrTXbtnTaxSearch_clickEvent();
}

function csNonTaxRcpt_arrTXbtnIvrCall_clickEvent(){
	btnIvrCall_clickEvent("nonTaxRcptArrearTaxTab");
	checkResNumbByIvrCall = true;
}

function getJsonStrNonTaxRcptArrearTax() {
	arrTXresNumb = SHA256($("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val());
	arrTXcitizenNM = SHA256($("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val());
	arrTXcitizenTelNumb = SHA256($("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val());
	
	b64arrTXresNumb = b64EncodeUnicode($("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val());
	b64arrTXcitizenNM = b64EncodeUnicode($("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val());
	b64arrTXcitizenTelNumb = b64EncodeUnicode($("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val());
	
	if (($("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val()).length == 13 
			|| $("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val().length >= 1 
			|| $("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val().length >= 1) { // 검색 조건이 있을 경우
		arrTXsearchValExist = true;
		arrTXsearchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "bm9uX3RheC5hcnJUYXhzZWxlY3RMaXN0",
			"map" : {
				"key" : "value",
				"perId" : $("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val(), 
				"perNm" : $("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val(), 
				"telNumb" : !$("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val() ? "" : telNumbNCellNumbFormArr($("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val().replace(/-/gi, "")),
				"telNumbLength" : $("#csNonTaxRcpt_arrTXtfSrchCitizenTelNumb").val().replace(/-/gi, "").length		
			}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function nonTaxRcptArrearTaxTab() {
	var d_frDate = getPrvDay("M", 1, "-");						
	var d_toDate = getDate();
	datePicker("#csNonTaxRcpt_arrTXtfSrchFrDate");
	datePicker("#csNonTaxRcpt_arrTXtfSrchToDate");
	$("#csNonTaxRcpt_arrTXtfSrchFrDate").val(d_frDate);
	$("#csNonTaxRcpt_arrTXtfSrchToDate").val(d_toDate);
	setPhoneNumFormat("csNonTaxRcpt_arrTXtfSrchCitizenTelNumb"); 
	
	$("#csNonTaxRcpt_arrTXtblList").jqGrid({ 
		url : getContextPath() + "/jqgrid/civilservice/csNonTaxReceiptList.do",
		datatype : "json",
		mtype : "post",
		postData : {
			pJson : getJsonStrNonTaxRcptArrearTax()
		},
		jsonReader : {
			repeatitems : false
		},
		colNames : ["전자납부번호", "세목명", "부과구분", "납부자명", "전화번호", "휴대폰번호", "수납구분", "압류구분", "납부자주소", "부과일자", "최초부과금액", "가산금", "납기금액", "최초납기일자", "납기일자", "은행명", "가상계좌번호"],
		colModel : [
			{name : "ERC_NO", index : "ERC_NO", align : "center", width : 80, hidden : true},
			{name : "SEMOK_NM", index : "SEMOK_NM", align : "center", width : 150}, 
			{name : "LVY_NM", index : "LVY_NM", align : "center", width : 80}, 
			{name : "PER_NM", index : "PER_NM", align : "center", width : 80}, 
			{name : "PER_TEL", index : "PER_TEL", align : "center", width : 80, hidden : true}, 
			{name : "PER_CELL", index : "PER_CELL", align : "center", width : 80, hidden : true}, 
			{name : "PAY_GBN", index : "PAY_GBN", align : "center", width : 100}, 
			{name : "ATT_GBN", index : "ATT_GBN", align : "center", width : 80}, 
			{name : "PER_ADDR", index : "PER_ADDR", align : "center", width : 80, hidden : true}, 
			{name : "LVY_YMD", index : "LVY_YMD", align : "center", width : 80}, 
			{name : "FST_AMT", index : "FST_AMT", align : "center", width : 80}, 
			{name : "LST_ADD_AMT", index : "LST_ADD_AMT", align : "center", width : 80}, 
			{name : "PAT_AMT", index : "PAT_AMT", align : "center", width : 80}, 
			{name : "FST_NAP_YMD", index : "FST_NAP_YMD", align : "center", width : 80, hidden : true}, 
			{name : "LST_NAP_YMD", index : "LST_NAP_YMD", align : "center", width : 80}, 
			{name : "BANK_NM", index : "BANK_NM", align : "center", width : 80, hidden : true}, 
			{name : "ACCOUNT_NO", index : "ACCOUNT_NO", align : "center", width : 80, hidden : true}, 
		],
		sortname : "LST_NAP_YMD",
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
	   	pager : "#csNonTaxRcpt_arrTXpagingList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var rowData = $("#csNonTaxRcpt_arrTXtblList").jqGrid("getRowData", rowid);
	   		if (rowData != null) {
	   			$("#csNonTaxRcpt_arrTXBtnHistory").show();
				$("#csNonTaxRcpt_arrTXsemokNm").html(rowData.SEMOK_NM);
				$("#csNonTaxRcpt_arrTXperNm").html(rowData.PER_NM);
				$("#csNonTaxRcpt_arrTXercNo").html(rowData.ERC_NO);
				$("#csNonTaxRcpt_arrTXlvyNm").html(rowData.LVY_NM);
				$("#csNonTaxRcpt_arrTXpayGbn").html(rowData.PAY_GBN);
				$("#csNonTaxRcpt_arrTXattGbn").html(rowData.ATT_GBN);
				$("#csNonTaxRcpt_arrTXperAddr").html(rowData.PER_ADDR);
				$("#csNonTaxRcpt_arrTXperTel").html(rowData.PER_TEL);
				$("#csNonTaxRcpt_arrTXperCell").html(rowData.PER_CELL);
				$("#csNonTaxRcpt_arrTXfstAmt").html(rowData.FST_AMT);
				$("#csNonTaxRcpt_arrTXlstAddAmt").html(rowData.LST_ADD_AMT);
				$("#csNonTaxRcpt_arrTXpatAmt").html(rowData.PAT_AMT);
				$("#csNonTaxRcpt_arrTXlvyYMD").html(rowData.LVY_YMD);
				$("#csNonTaxRcpt_arrTXfstNapYMD").html(rowData.FST_NAP_YMD);
				$("#csNonTaxRcpt_arrTXlstNapYMD").html(rowData.LST_NAP_YMD);
				$("#csNonTaxRcpt_arrTXbankNm").html(rowData.BANK_NM);
				$("#csNonTaxRcpt_arrTXaccountNo").html(rowData.ACCOUNT_NO);
			};
	   	},
	   	loadComplete : function(status, err) {
			insertObjNonTaxRcptHistory(status, err, "arrTX");
		},
		loadError : function(status, err) {
			insertObjNonTaxRcptHistory(status, err, "arrTX");
		}
	}).jqGrid("navGrid", "#csNonTaxRcpt_arrTXpagingList", {edit : false, add : false, del : false, search : false});
}

function ovrPYbtnTaxSearch_clickEvent() {
	if (checkResNumbByIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	$("#csNonTaxRcpt_ovrPYtblList").jqGrid("setGridParam", {postData : {pJson : getJsonStrNonTaxRcptOvrPay()} , page : 1, sortname : "OVR_YMD", sortorder : "ASC"});
	$("#csNonTaxRcpt_ovrPYtblList").trigger("reloadGrid");
}

function ovrPYbtnTaxInit_clickEvent() {
	ovrPYsearchValExist = false;
	checkResNumbByIvrCall = false;
	$("#csNonTaxRcpt_arrTXBtnHistory").hide();
	$("#csNonTaxRcpt_ovrPYtfSrchCitizenNM").val("");
	$("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val("");
	$("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val("");
	$("#csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").val("");
	$("#csNonTaxRcpt_ovrPYtbl").find("label").text("");
	ovrPYbtnTaxSearch_clickEvent();
}

function csNonTaxRcpt_ovrPYbtnIvrCall_clickEvent(){
	btnIvrCall_clickEvent("nonTaxRcptOverpayTaxTab");
	checkResNumbByIvrCall = true;
}

function getJsonStrNonTaxRcptOvrPay() {
	ovrPYresNumb = SHA256($("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val());
	ovrPYcitizenNM = SHA256($("#csNonTaxRcpt_ovrPYtfSrchCitizenNM").val());
	ovrPYcitizenTelNumb = SHA256($("#csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").val());
	
	b64ovrPYresNumb = b64EncodeUnicode($("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val());
	b64ovrPYcitizenNM = b64EncodeUnicode($("#csNonTaxRcpt_ovrPYtfSrchCitizenNM").val());
	b64ovrPYcitizenTelNumb = b64EncodeUnicode($("#csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").val());
	
	if (($("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val()).length == 13 
			|| $("#csNonTaxRcpt_ovrPYtfSrchCitizenNM").val().length >= 1 
			|| $("#csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").val().length >= 1) { // 검색 조건이 있을 경우
		ovrPYsearchValExist = true;
		ovrPYsearchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "bm9uX3RheC5vdnJQWXNlbGVjdExpc3Q=",
			"map" : {
				"key" : "value",
				"perId" : $("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val() + $("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val(), 
				"perNm" : $("#csNonTaxRcpt_ovrPYtfSrchCitizenNM").val(), 
				"telNumb" : !$("#csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").val() ? "" : telNumbNCellNumbFormArr($("#csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb").val())		
			}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function nonTaxRcptOverpayTaxTab() {
	var d_frDate = getPrvDay("M", 1, "-");						
	var d_toDate = getDate();
	datePicker("#csNonTaxRcpt_ovrPYtfSrchFrDate");
	datePicker("#csNonTaxRcpt_ovrPYtfSrchToDate");
	$("#csNonTaxRcpt_ovrPYtfSrchFrDate").val(d_frDate);
	$("#csNonTaxRcpt_ovrPYtfSrchToDate").val(d_toDate);
	setPhoneNumFormat("csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb"); 
	
	$("#csNonTaxRcpt_ovrPYtblList").jqGrid({ 
		url : getContextPath() + "/jqgrid/civilservice/csNonTaxReceiptList.do",
		datatype : "json",
		mtype : "post",
		postData : {
			pJson : getJsonStrNonTaxRcptOvrPay()
		},
		jsonReader : {
			repeatitems : false
		},
		colNames : ["세목명", "부과번호", "납부자명", "휴대폰번호", "부과금액", "납부금액", "과오납환부액", "과오납신청일", "처리일자", "과오납사유명"],
		colModel : [
			{name : "SEMOK_NM", index : "SEMOK_NM", align : "center", width : 150}, 
			{name : "LVY_NO", index : "LVY_NO", align : "center", width : 150, hidden : true}, 
			{name : "PER_NM", index : "PER_NM", align : "center", width : 120}, 
			{name : "PER_CELL", index : "PER_CELL", align : "center", width : 150, hidden : true}, 
			{name : "FST_AMT", index : "FST_AMT", align : "center", width : 120}, 
			{name : "LST_AMT", index : "LST_AMT", align : "center", width : 120}, 
			{name : "OVR_AMT", index : "OVR_AMT", align : "center", width : 150}, 
			{name : "OVR_YMD", index : "OVR_YMD", align : "center", width : 150}, 
			{name : "RTN_YMD", index : "RTN_YMD", align : "center", width : 120}, 
			{name : "CODE_CTN", index : "CODE_CTN", align : "center", width : 180},
		],
		sortname : "OVR_YMD",
	   	sortorder : "ASC",
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
	   	pager : "#csNonTaxRcpt_ovrPYpagingList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var rowData = $("#csNonTaxRcpt_ovrPYtblList").jqGrid("getRowData", rowid);
	   		if (rowData != null) {
	   			$("#csNonTaxRcpt_ovrPYBtnHistory").show();
				$("#csNonTaxRcpt_ovrPYsemokNm").html(rowData.SEMOK_NM);
				$("#csNonTaxRcpt_ovrPYperNm").html(rowData.PER_NM);
				$("#csNonTaxRcpt_ovrPYperCell").html(rowData.PER_CELL);
				$("#csNonTaxRcpt_ovrPYlvyNo").html(rowData.LVY_NO);
				$("#csNonTaxRcpt_ovrPYfstAmt").html(rowData.FST_AMT);
				$("#csNonTaxRcpt_ovrPYlatAmt").html(rowData.LST_AMT);
				$("#csNonTaxRcpt_ovrPYovrYMD").html(rowData.OVR_YMD);
				$("#csNonTaxRcpt_ovrPYcodeCtn").html(rowData.CODE_CTN);
				$("#csNonTaxRcpt_ovrPYovrAmt").html(rowData.OVR_AMT);
				$("#csNonTaxRcpt_ovrPYrtnYMD").html(rowData.RTN_YMD);
			};
	   	},
	   	loadComplete : function(status, err) {
			insertObjNonTaxRcptHistory(status, err, "ovrPY");
		},
		loadError : function(status, err) {
			insertObjNonTaxRcptHistory(status, err, "ovrPY");
		}
	}).jqGrid("navGrid", "#csNonTaxRcpt_ovrPYpagingList", {edit : false, add : false, del : false, search : false});
}
