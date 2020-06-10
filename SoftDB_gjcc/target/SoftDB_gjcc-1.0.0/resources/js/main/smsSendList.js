// 조회조건 저장
var g_srchType = "";
var g_srchVal = "";
var g_srchUsr = "";
var g_srchActstcd = "";
var g_srchDateType = "";
var g_srchDate = "";
var g_srchDateEn = "";
var smsFileForm = "";
var smsFileBox_idx = 0;
/*var g_tcktId = "";*/
var smsUsrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
//파라미터 셋팅_UsrList
function getJsonStrUsrList(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"cntr_cd" : smsUsrGrdCd =="090100"?"":window.sessionStorage.getItem("CNTR_CD"),
			"chkRetire" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SmsSendList
function getJsonStrSmsSendList(){
	g_srchType = $("#selSrchtype").val();
	g_srchVal = $("#search_smsSandList #tfSrchVal").val().trim();
	g_srchUsr = $("#selSrchUsr").val() == "all" ? "" : $("#selSrchUsr").val();
	g_srchActstcd = $("#selSrchActStCd").val() == "all" ? "" : $("#selSrchActStCd").val();
	g_srchDateType = $("#selSrchDateType").val();
	g_srchDate = $("#tfSrchDate").val().replace(/-/gi, "");
	g_srchDateEn = $("#tfSrchDateEn").val().replace(/-/gi, "");
	/*g_tcktId = $("#tfSrchTcktId").val().trim();*/
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjAuY2hTZW5kTGlzdA==",
		"map" : {
			"key" : "value",
			"ch_gb_cd" : "12000",
			"srchType" : g_srchType,
			"srchVal" : g_srchVal,
			"srchUsr" : g_srchUsr,
			"srchActstcd" : g_srchActstcd,
			"srchDateType" : g_srchDateType,
			"cntr_cd" : smsUsrGrdCd =="090100"?"":window.sessionStorage.getItem("CNTR_CD"),
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn
			/*"tckt_id" : g_tcktId*/
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_SmsSendSpec
function getJsonStrSmsSendSpec(chSndId){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjAuY2hTZW5kU3BlYw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : chSndId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터셋팅 첨부파일
function getJsonSmsSendFileList(noteId){		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "ch020",
			"tbl_pk": noteId,
			"orderby": "crtTime",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
/*
//파라미터 셋팅_SmsSendListExcel
function getJsonStrSmsSendListExcel()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjAuY2hTZW5kTGlzdA==",
		"map" : {
			"key" : "value",
			"ch_gb_cd" : "12000",
			"srchType" : g_srchType,
			"srchVal" : g_srchVal,
			"srchUsr" : g_srchUsr,
			"srchActstcd" : g_srchActstcd,
			"srchDateType" : g_srchDateType,
			"srchDate" : g_srchDate,
			"tckt_id" : g_tcktId,
			"sidx" : $("#tblSmsSendList").getGridParam("sortname"),
			"sord" : $("#tblSmsSendList").getGridParam("sortorder"),
			"title" : "SMS발송목록",
			"colWidth" : [15, 25, 15, 20, 20, 10, 25, 25, 25, 15, 15],
			"colName" : ["USR_NM", "CORP_NM", "CUST_NM", "SND_CNTCT_INFM", "CNTCT_INFM", "SMS_TYPE", "SND_REQ_DTM", "SND_RESV_DTM", "SND_END_DTM", "SND_RSLT_NM", "TCKT_ID"],
			"colHeader" : ["상담사", "회사/부서", "고객명", "발신자번호", "수신자번호", "문자유형", "요청일시", "예약일시", "발신일시", "발신결과", "접수번호"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
*/
/*
//파라미터 셋팅_UpdateSendSpec
function getJsonStrUpdateSendSpec(isDelete)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMjAudXBkYXRl",
		"map" : {
			"key" : "value",
			"ch_snd_id" : $("#tfSpecChSndId").val(),
			"rcv_cntct_infm" : isDelete == "Y" ? "" : $("#tfSpecChCntctInfm").val().trim().replace(/-/gi, ""),
			"snd_cont" : isDelete == "Y" ? "" : $("#tfSpecSndCont").val(),
			"snd_resv_dt" : isDelete == "Y" ? "" : changeDateString(getResvDate($("#tfSpecSndResvDtm").val())),
			"snd_resv_tm" : isDelete == "Y" ? "" : changeTimeString(getResvDate($("#tfSpecSndResvDtm").val())),
			"use_yn" : isDelete == "Y" ? "N" : "",
			"cro_id" : "agent_test",
			"schedule_type" : $("#tfSpecSndResvDtm").val().trim() == "" ? "0" : "1",
			"subject" : "",
			"callback" : "120",
			"dest_info" : $("#tfSpecChSndId").val() + "^" + $("#tfSpecChCntctInfm").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#labSpecCountTxtNum").html())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
*/


/*
// 엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/counsel/smsSendList.do", getJsonStrSmsSendListExcel());
	
	//var url = getContextPath() + "/excel/counsel/smsSendList.do?pJson=" + getJsonStrSmsSendListExcel();
	//window.open(url);
}
*/
/*
// 저장 버튼 클릭 이벤트
function btnModify_clickEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateChSendSpec.do",
		data : "pJson=" + getJsonStrUpdateSendSpec("N"),
		success : function(data)
		{
			alert("저장되었습니다.");
			
			$("#tblSmsSendList").trigger("reloadGrid");
			initSpec();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}
*/
/*
// 삭제 버튼 클릭 이벤트
function btnDelete_clickEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateChSendSpec.do",
		data : "pJson=" + getJsonStrUpdateSendSpec("Y"),
		success : function(data)
		{
			alert("삭제되었습니다.");
			
			$("#tblSmsSendList").trigger("reloadGrid");
			initSpec();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}
*/
//첨부파일 보기
function showAttachSmsFiles2(noteId){
    $("#smsFileInfos2").empty();
    	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/message/fileList.do",
		data : "pJson=" + getJsonSmsSendFileList(noteId),
		success : function(data){
			
			for(var i in data){
				var url = getContextPath() 
				+ "/file/message/messageFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				
				var tr = "<tr>";
				tr += "<td align='left' style='width: 85%;'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span style='width: 320px;'><a href='" + url + "' target='_blank'>" + data[i].LOC_FL_NM + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "</tr>";
				
				smsFileBox_idx++;
				$("#smsFileInfos2").prepend(tr);		
			}
			$("#MESSAGE").closest("tr").hide();
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
}

/* 조회검색 버튼 ======================================================== */

// 조회버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	$("#tblSmsSendList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsSendList()}, page : 1, sortname : "SND_SEQ_FORMAT", sortorder : "desc"});
	$("#tblSmsSendList").trigger("reloadGrid");
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	$("#selSrchtype").val("cust_nm");		// 고객명, 발신번호 선택 (기준 : 고객명)
	$("#tfSrchVal").val("");				// 검색(고객명, 발신번호)
	$("#selSrchUsr").val("all");			// 상담사
	$("#selSrchActStCd").val("all");		// 처리상태
	$("#selSrchDateType").val("req");		// 요청일, 예약일, 발신일 선택 (기준 : 발신일)
	$("#tfSrchDate").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	$("#tfSrchDateEn").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	
	$("#tblSmsSendList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsSendList()}, page : 1, sortname : "SND_SEQ_FORMAT", sortorder : "desc"});
	$("#tblSmsSendList").trigger("reloadGrid");
	
	initSpec();
}


/* 조회검색 버튼 ======================================================== */


/* SMS발신 탭 버튼 ======================================================== */

// 고객찾기 버튼 클릭 이벤트
function btnSchCust_clickEvent()
{

}

// 전송 버튼 클릭 이벤트
function btnSend_clickEvent()
{

}

// 삭제 버튼 클릭 이벤트
function btnDelete_clickEvent()
{
	
}

// 초기화 버튼 클릭 이벤트
function btnSmsInit_clickEvent()
{
	
}

/* SMS발신 탭 버튼 ======================================================== */


/* 자주 쓰는 문자 탭 버튼 ======================================================== */

// 등록 버튼 클릭 이벤트
function btnInsert2_clickEvent()
{
	
}

// 수정 버튼 클릭 이벤트
function btnUpdate2_clickEvent()
{
	
}

// 삭제 버튼 클릭 이벤트
function btnDelete2_clickEvent()
{
	
}

// 초기화 버튼 클릭 이벤트
function btnReset2_clickEvent()
{
	
}

// 고객찾기 버튼 클릭 이벤트
function btnSchCust2_clickEvent()
{
	
}

// 전송 버튼 클릭 이벤트
function btnSend2_clickEvent()
{
	
}
	
// 초기화 버튼 클릭 이벤트
function btnSmsInit2_clickEvent()
{
	
}

/* 자주 쓰는 문자 탭 버튼 ======================================================== */


// 상세정보 부분 초기화 (SMS 발신 Tab)
function initSpec()
{
	/*$("#btnModify").hide();*/
	/*$("#btnDelete").hide();*/
	
	$("#tfSpecChSndId").val("");			// 채널발신ID
	$("#labSpecUsrNm").html("");			// 발신자
	$("#tfSpecSndCont").val("");			// 발신내용
	$("#labSpecCountTxtNum").html("0");		// 전송메시지 byte 수
	/*$("#labSpecCorpNm").html("");*/		
	$("#labSpecCustNm").html("");			// 고객명
	$("#labSpecCustGb").html("");			// 고객구분
	$("#labSpecSendFrom").html("");			// 발신자번호
	$("#labSpecSmsYn").html("");			// 수신동의
	$("#tfSpecChCntctInfm").val("");		// 수신자번호
	$("#labSpecSndReqDtm").html("");		// 요청일시
	$("#tfSpecSndResvDtm").val("");			// 예약일시
	$("#labSpecSndEndDtm").html("");		// 발신일시
	$("#labSpecSndRsltNm").html("");		// 발신결과
	/*$("#labSpecTcktId").html("");*/
	
	smsFileBox_idx = 0;
	$("#smsFileInfos").empty().append(fileForm);
	
	// 이미지첨부
	
	$("#tfSpecSndCont").prop("disabled", true);			// 발신내용
	$("#tfSpecChCntctInfm").prop("disabled", true);		// 수신자번호
	$("#tfSpecSndResvDtm").prop("disabled", true);		// 요청일시
}

//상세정보 부분 초기화 (자주쓰는 문자 Tab)
function initSpec2()
{
	/*$("#btnModify").hide();*/
	/*$("#btnDelete").hide();*/
	
	$("#tfSpecChSndId2").val("");			// 채널발신ID
	$("#labSpecUsrNm2").html("");			// 발신자
	$("#tfSpecSndCont2").val("");			// 발신내용
	$("#labSpecCountTxtNum2").html("0");	// 전송메시지 byte 수		
	$("#labSpecCustNm2").html("");			// 고객명
	$("#labSpecCustGb2").html("");			// 고객구분
	$("#labSpecSendFrom2").html("");		// 발신자번호
	$("#labSpecSmsYn2").html("");			// 수신동의
	$("#tfSpecChCntctInfm2").val("");		// 수신자번호
	$("#labSpecSndReqDtm2").html("");		// 요청일시
	$("#tfSpecSndResvDtm2").val("");		// 예약일시
	$("#labSpecSndEndDtm2").html("");		// 발신일시
	$("#labSpecSndRsltNm2").html("");		// 발신결과

	// 이미지첨부
	
	$("#tfSpecSndCont2").prop("disabled", true);		// 발신내용
	$("#tfSpecChCntctInfm2").prop("disabled", true);	// 수신자번호
	$("#tfSpecSndResvDtm2").prop("disabled", true);		// 요청일시
}

//자주쓰는 문자 상세정보 부분 초기화 (자주쓰는 문자 Tab)
function initSpec2_1()
{	
	$("#labGbStNm2_1").val("");				// 분류
	$("#tfSpecSndCont2_1").val("");			// 내용
	$("#labSpecCountTxtNum2_1").html("0");	// 전송메시지 byte 수		
}

// init page
// 메인화면 로딩 시 부하 감소를 위한 function 변경
function initdivRCTabSMSList()
{
	smsFileForm = $("#smsFileInfos tr").parent().html();
	
	initSpec();			// SMS 발신 Tab
	initSpec2();		// 자주쓰는 문자 Tab
	initSpec2_1();		// 자주쓰는 문자 상세정보
	
	
	$("#tfSrchDate").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	$("#tfSrchDateEn").val(getDate());	
	
	// sms발송목록 jqgrid
	$("#tblSmsSendList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/smsSendList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSmsSendList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["상담사", "고객명", "발신번호", "요청일시", "문자유형", "전송메세지", "전송결과", "채널발신ID"],
	   	colModel :
	   	[
	   		{ name : "USR_NM", index : "USR_NM", width : 80, align : "center" },	   		
	   		{ name : "CUST_NM", index : "CUST_NM", width : 80, align : "center" , hidden : true},
	   		{ name : "CNTCT_INFM", index : "CNTCT_INFM", width : 120, align : "center" },
	   		{ name : "SND_END_DTM", index : "SND_END_DTM", width : 140, align : "center" },
	   		{ name : "SMS_TYPE", index : "SMS_TYPE", width : 80, align : "center" },
	   		{ name : "SND_CONT", index : "SND_CONT", width : 360, align : "left"
	   			, cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
	   					return 'style="white-space :nowrap;"' 
	   			}
	   		},
	   		{ name : "SND_RSLT_NM", index : "SND_RSLT_NM", width : 75, align : "center" },
	   		{ name : "CH_SND_ID", index : "CH_SND_ID", hidden : true }
	   	],
	   	sortname : "SND_SEQ_FORMAT",
	   	sortorder : "desc",
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
	   	pager : "#pagingSmsSendList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		initSpec();
	   		
	   		var row = $("#tblSmsSendList").getRowData(rowid);
	   		
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/counsel/getSmsSendSpec.do",
	   			data : "pJson=" + getJsonStrSmsSendSpec(row.CH_SND_ID),
	   			success : function(data)
	   			{
   					/*$("#btnModify").hide();*/
   			   		/*$("#btnDelete").hide();*/
   			   		
	   			   	$("#tfSpecSndCont").prop("disabled", true);
	   				$("#tfSpecChCntctInfm").prop("disabled", true);
	   				$("#tfSpecSndResvDtm").prop("disabled", true);
	   				
	   				$("#tfSpecChSndId").val(data.CH_SND_ID);
	   				$("#labSpecUsrNm").html(data.USR_NM);
	   				$("#tfSpecSndCont").val(data.SND_CONT);
	   				$("#labSpecCountTxtNum").html(charByteSize(data.SND_CONT));
	   				/*$("#labSpecCorpNm").html(data.CORP_NM);*/
	   				$("#labSpecCustNm").html(data.CUST_NM);
	   				$("#labSpecSendFrom").html(data.SND_CNTCT_INFM);
	   				$("#tfSpecChCntctInfm").val(data.CNTCT_INFM);
	   				$("#labSpecSndReqDtm").html(data.SND_REQ_DTM);
	   				$("#tfSpecSndResvDtm").val(data.SND_RESV_DTM);
	   				$("#labSpecSndEndDtm").html(data.TRAN_RSLTDATE);
	   				$("#labSpecSndRsltNm").html(data.TRAN_STATUS_NM);
	   				/*$("#labSpecTcktId").html(data.TCKT_ID);*/
	   				var CH_SND_ID= data.CH_SND_ID;
	   				showAttachSmsFiles2(CH_SND_ID);
	   			},
	   			error : function(data, status, err) 
	   			{
	   				networkErrorHandler(data, status, err);
	   			}
	   		});
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		initSpec();
	   	}
	}).jqGrid("navGrid", "#pagingSmsSendList", {edit : false, add : false, del : false, search : false});
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tblSmsSendList").setGridWidth($("#divRCTabSMSList").width(), true);
	}).trigger('resize');
	
	/*
	// sms자주쓰는 문자 jqgrid
	$("#tblSmsFrqntUseList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/smsFrqntUseList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSmsSendList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["분류", "내용", "글자수", "선택", "채널발신ID"],
	   	colModel :
	   	[
	   		{ name : "USR_NM", index : "USR_NM", width : 80, align : "center" },	   		
	   		{ name : "CUST_NM", index : "CUST_NM", width : 180, align : "center" },
	   		{ name : "CNTCT_INFM", index : "CNTCT_INFM", width : 60, align : "center" },
	   		{ name : "TRAN_RSLTDATE", index : "TRAN_RSLTDATE", width : 60, align : "center" },
	   		{ name : "CH_SND_ID", index : "CH_SND_ID", hidden : true }
	   	],
	   	sortname : "CH_SND_ID",
	   	sortorder : "desc",
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
	   	pager : "#pagingSmsFrqntUseList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		initSpec2_1();
	   		
	   		var row = $("#tblSmsFrqntUseList").getRowData(rowid);
	   		
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/counsel/getSmsSendSpec.do",
	   			data : "pJson=" + getJsonStrSmsSendSpec(row.CH_SND_ID),
	   			success : function(data)
	   			{   			   		
	   			   	$("#tfSpecSndCont2").prop("disabled", true);
	   				$("#tfSpecChCntctInfm2").prop("disabled", true);
	   				$("#tfSpecSndResvDtm2").prop("disabled", true);
	   				
	   				$("#tfSpecChSndId2").val(data.CH_SND_ID);
	   				$("#labSpecUsrNm2").html(data.USR_NM);
	   				$("#tfSpecSndCont2").val(data.SND_CONT);
	   				$("#labSpecCountTxtNum2").html(charByteSize(data.SND_CONT));
	   				$("#labSpecCustNm2").html(data.CUST_NM);
	   				$("#labSpecSendFrom2").html(data.SND_CNTCT_INFM);
	   				$("#tfSpecChCntctInfm2").val(data.CNTCT_INFM);
	   				$("#labSpecSndReqDtm2").html(data.SND_REQ_DTM);
	   				$("#tfSpecSndResvDtm2").val(data.SND_RESV_DTM);
	   				$("#labSpecSndEndDtm2").html(data.TRAN_RSLTDATE);
	   				$("#labSpecSndRsltNm2").html(data.TRAN_STATUS_NM);
	   			},
	   			error : function(data, status, err) 
	   			{
	   				networkErrorHandler(data, status, err);
	   			}
	   		});
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		initSpec();
	   	}
	}).jqGrid("navGrid", "#pagingSmsFrqntUseList", {edit : false, add : false, del : false, search : false});	
	*/
	// 상담사 셀렉트 박스를 채움
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/getUsrList.do",
		data : "pJson=" + getJsonStrUsrList(),
		success : function(data)
		{
			$("#selSrchUsr").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			value += "<option value='all'>전체</option>";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#selSrchUsr").append(value);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	// datepicker
	datePicker("#tfSrchDate");
	datePicker("#tfSrchDateEn");
	
	// 예약일시 datetimepicker 설정 (SMS 발신)
	$("#tfSpecSndResvDtm").datetimepicker({
		lang : "ko",
		format : "Y-m-d H:i",
		allowTimes : [
		              "08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
		              "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
		              "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
		              "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
		              "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
		              "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
		              "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
		              "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
		              "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
		              "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
		              "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
		              "19:00", "19:10", "19:20", "19:30", "19:40", "19:50"
		              ],
		step : 10
	});
	
	// 예약일시 datetimepicker 설정 (자주 쓰는 문자)
	$("#tfSpecSndResvDtm2").datetimepicker({
		lang : "ko",
		format : "Y-m-d H:i",
		allowTimes : [
		              "08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
		              "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
		              "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
		              "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
		              "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
		              "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
		              "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
		              "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
		              "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
		              "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
		              "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
		              "19:00", "19:10", "19:20", "19:30", "19:40", "19:50"
		              ],
		step : 10
	});	
	
	// 검색어 필드 엔터 키 이벤트
	$("#search_smsSandList #tfSrchVal").bind("keydown", function(key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});


	/* 조회검색 버튼 ======================================================== */	
	
	// 조회버튼 클릭 이벤트
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	// 문자내용 keyup 이벤트
	$("#tfSpecSndCont").bind("keyup", function(e)
	{
		$("#labSpecCountTxtNum").html(charByteSize($("#tfSpecSndCont").val()));
	});	
	
	/* 조회검색 버튼 ======================================================== */


	/* SMS발신 탭 버튼 ======================================================== */	
	
	// 고객찾기 버튼 클릭 이벤트
	$("#btnSchCust").bind("click", btnSchCust_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#btnSend").bind("click", btnSend_clickEvent);
	
	// 삭제 버튼 클릭 이벤트
	$("#btnDelete").bind("click", btnDelete_clickEvent);
	
	// 초기화 버튼 클릭 이벤트
	$("#btnSmsInit").bind("click", btnSmsInit_clickEvent);
	
	/* SMS발신 탭 버튼 ======================================================== */	
	
	
	/* 자주 쓰는 문자 탭 버튼 ======================================================== */
	
	// 등록 버튼 클릭 이벤트
	$("#btnInsert2").bind("click", btnInsert2_clickEvent);
	
	// 수정 버튼 클릭 이벤트
	$("#btnUpdate2").bind("click", btnUpdate2_clickEvent);
	
	// 삭제 버튼 클릭 이벤트
	$("#btnDelete2").bind("click", btnDelete2_clickEvent);

	// 초기화 버튼 클릭 이벤트
	$("#btnReset2").bind("click", btnReset2_clickEvent);
	
	// 고객찾기 버튼 클릭 이벤트
	$("#btnSchCust2").bind("click", btnSchCust2_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#btnSend2").bind("click", btnSend2_clickEvent);
		
	// 초기화 버튼 클릭 이벤트
	$("#btnSmsInit2").bind("click", btnSmsInit2_clickEvent);	
	
	/* 자주 쓰는 문자 탭 버튼 ======================================================== */
		
	
/*	
	// 접수번호 필드 엔터 키 이벤트
	$("#tfSrchTcktId").bind("keydown", function(key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});

	// 엑셀저장 버튼 클릭 이벤트
	$("#btnExcel").bind("click", btnExcel_clickEvent);

	// 저장 버튼 클릭 이벤트
	$("#btnModify").bind("click", btnModify_clickEvent);
	
	// 삭제 버튼 클릭 이벤트
	$("#btnDelete").bind("click", btnDelete_clickEvent);
*/	

}