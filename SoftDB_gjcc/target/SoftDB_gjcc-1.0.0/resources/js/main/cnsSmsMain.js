var smsSendContFooter = "\n -공주시청컨텍센터-"
var smsSendTel = "031-980-2114";
// 메인화면 로딩 시 부하 감소를 위한 function 변경
function initdivRCTabCnsSms()
{	
	
	$("#tfCnsSrchDate").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	$("#tfCnsSrchDateEn").val(getDate());	
	// datepicker
	datePicker("#tfCnsSrchDate");
	datePicker("#tfCnsSrchDateEn");
	setObjSelectBoxWithCode("selCnsSrchActStCd", "전체", "","MAIN", "90020", "");	// 처리상태 셋팅

	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("selCnsSrchUsr", "전체", "main","","","","","","" );
	}else{
		setSelectBoxWithAgent("selCnsSrchUsr", "전체", "main",window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	
	// sms수신목록 jqgrid
	$("#tblCnsSmsList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/main/cnsSmsMain.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonCnsSmsList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["CH_GB_CD", "RCV_ID", "접수/답변ID", "RCV_DTM", "SND_REQ_DTM", "접수/답변일시", "수신번호", "RCV_CONT", "SND_CONT", "문의/답변 내용", "분배일시", 
	   	            "RCV_DIV_USR_ID", "상담사", "RCV_ACT_ST_CD", "RCV_ACT_ST_NM", "SND_RSLT_NM", "처리상태", "발송완료일시"],
	   	colModel :
	   	[
	   	 	{ name : "CH_GB_CD", index : "CH_GB_CD", width : 50, align : "center" , hidden : true},
	   	 	{ name : "RCV_ID", index : "RCV_ID", width : 50, align : "center" , hidden : true},
	   	 	{ name : "CH_SND_ID", index : "CH_SND_ID", width : 50, align : "center" , hidden : true},
	   	 	
	   	 	{ name : "RCV_DTM", index : "RCV_DTM", width : 120, align : "center" , hidden : true},
	   	 	{ name : "SND_REQ_DTM", index : "SND_REQ_DTM", width : 120, align : "center" , hidden : true},
	   	 	{ name : "VIEW_DTM", index : "VIEW_DTM", width : 120},
	   	 	
	   	 	{ name : "RCVR_CNTCT_INFM", index : "RCVR_CNTCT_INFM", width : 110, align : "center"},
	   	 	
	   	 	{ name : "RCV_CONT", index : "RCV_CONT", width : 350, align : "left", hidden : true},
	   	 	{ name : "SND_CONT", index : "SND_CONT", width : 350, align : "left", hidden : true},
	   		{ name : "VIEW_CONT", index : "VIEW_CONT", width : 350, align : "left" , cellattr: function ( rowId , tv , rowObject , cm , rdata ) { return 'style="white-space :nowrap;"' }},	
	   	 	
	   		{ name : "RCV_DIV_DTM", index : "RCV_DIV_DTM", width : 120, align : "center" },
	   	 	{ name : "RCV_DIV_USR_ID", index : "RCV_DIV_USR_ID", width : 120, align : "center" , hidden : true},
	   		{ name : "USR_NM", index : "USR_NM", width : 85, align : "center" },	   		
	   		{ name : "RCV_ACT_ST_CD", index : "RCV_ACT_ST_CD", width : 80, align : "center" , hidden : true},
	   		{ name : "RCV_ACT_ST_NM", index : "RCV_ACT_ST_NM", width : 75, align : "center" , hidden : true},
	   		{ name : "SND_RSLT_NM", index : "SND_RSLT_NM", width : 75, align : "center" , hidden : true},
	   		{ name : "VIEW_ST_NM", index : "VIEW_ST_NM", width : 75, align : "center" },
	   		{ name : "SND_END_DTM", index : "SND_END_DTM", width : 75, align : "center" , hidden : true},
	   	],
	   	sortname : "RCV_ID, CH_SND_ID",
	   	sortorder : "asc",	   	
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "390",
	   	width : "100%",
	   	rowNum : 15,
	   	rowList : [15, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pagingCnsSmsList",
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
	   		
	   		var row = $("#tblCnsSmsList").getRowData(rowid);
	   		//console.log(row);
	   		$("#labCnsSmsRcvNum").html(row.RCVR_CNTCT_INFM);	// 수신번호
	   		$("#labCnsSmsRcvDtm").html(row.RCV_DTM); //접수일시
	   		$("#chSndid").val(row.RCV_ID);	// 접수아이디
	   		$("#cnsSmsRcvCont").val(row.RCV_CONT); // 문의내용
	   		$("#cnsSmsActCont").val(row.SND_CONT);	// 답변내용
	   		
	   		if (row.CH_GB_CD == '12000') { // 답변전송
	   			$("#actContFooter").html("");
	   			$("#labCnsSmsReqDtm").html(row.SND_REQ_DTM);	// 요청일시
	   			$("#labCnsSmsReqUserNm").html(row.USR_NM);	// 답변전송USER
	   			showAttachSmsFiles(row.CH_SND_ID);
	   			$("#cnsSmsSendFileInfo").hide();	   			
	   			$("#cnsSmsActCont").prop("disabled", true);
	   		}else{	   			
	   			showAttachSmsFiles("");
	   		}
	   		
	   		$("#labCnsSmsSendState").html(row.SND_RSLT_NM);//전송결과
	   		$("#labCnsSmsSendDtm").html(row.SND_END_DTM);//전송일시
	   		$("#labCnsSmsResult").html(row.RCV_ACT_ST_NM);//처리결과
	   		
	   		smsTypeSet();
	   		if(row.RCV_ACT_ST_CD != "030000" ) $("#btnRcvActStEnd").show(); // 완료처리되지 않은건인 경우 강제종료버튼 활성

	   	},
	   	onPaging : function(pgButton)
	   	{
	   		initSpec();
	   	},
	   	
	   	gridview     : false,	   	
	   	afterInsertRow : function(rowId, rowData, rowElem){
	   		
	   		if (rowData.CH_GB_CD == '12000') { // 답변전송
		   	    // 해당행의 배경색 설정
		   	    $('#tblCnsSmsList').find('tr[id='+rowId+']').children().each(function() {
		   	        $(this).attr('class', 'cell_blue');
		   	    });		   	    
		   	 
		   	 	$('#tblCnsSmsList').jqGrid('setCell',rowId,'VIEW_DTM','&nbsp;&nbsp;'+rowData.SND_REQ_DTM);
		   	    $('#tblCnsSmsList').jqGrid('setCell',rowId,'VIEW_CONT','&nbsp;&nbsp;답변]&nbsp;'+rowData.SND_CONT);
		   	    $('#tblCnsSmsList').jqGrid('setCell',rowId,'VIEW_ST_NM',rowData.SND_RSLT_NM);
		   	 
	   		}else{	   			
	   			$('#tblCnsSmsList').jqGrid('setCell',rowId,'VIEW_DTM', rowData.RCV_DTM);
		   	    $('#tblCnsSmsList').jqGrid('setCell',rowId,'VIEW_CONT', rowData.RCV_CONT);
		   	    $('#tblCnsSmsList').jqGrid('setCell',rowId,'VIEW_ST_NM',rowData.RCV_ACT_ST_NM);
	   		}
	   		
	   	}
	   	
	}).jqGrid("navGrid", "#pagingCnsSmsList", {edit : false, add : false, del : false, search : false});
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tblCnsSmsList").setGridWidth($("#divRCTabCnsSms").width(), true);
	}).trigger('resize');
	
	$("#labCnsSmsRcvNum, #labCnsSmsRcvDtm, #labCnsSmsResult").html("");

	$("#btnRcvActStEnd").hide();
	
	
	// 문의내용, 전화번호 검색 필드 엔터 키 이벤트
	$("#tfCnsSrchText").bind("keydown", function(key)
	{
		if (key.keyCode == 13)
			btnCnsSmsSearch_clickEvent();
	});
	
	// 문자내용 keyup 이벤트
	$("#cnsSmsActCont").bind("keyup", function(e){
		smsTypeSet();		
	});
	
	// 이미지첨부 이벤트
	$("#tfCnsSmsImg").bind("change", function(e){
		smsTypeSet();		
	});
	
	/* 버튼 이벤트 ======================================================== */	
	
	// 조회버튼 클릭 이벤트
	$("#btnCnsSmsSearch").bind("click", btnCnsSmsSearch_clickEvent);
	
	// 엑셀저장 버튼 클릭 이벤트
	$("#btnCnsSmsExcel").bind("click", btnCnsSmsExcel_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#btnCnsSmsSend").bind("click", btnCnsSmsSend_clickEvent);
		
	// 초기화 버튼 클릭 이벤트
	$("#btnCnsSmsInit").bind("click", btnCnsSmsInit_clickEvent);
	
	// 첨부파일 취소 버튼
	$("#btnCnsSmsImgCancle").bind("click", btnCnsSmsImgCancle_clickEvent);
	
	// 강제종료 버튼
	$("#btnRcvActStEnd").bind("click",btnRcvActStEnd_clickEvent);
	
}


// 조회
function btnCnsSmsSearch_clickEvent(){
	$("#tblCnsSmsList").jqGrid("setGridParam", {postData : {pJson : getJsonCnsSmsList()}, page : 1, sortname : "RCV_ID, CH_SND_ID", sortorder : "asc"});
	$("#tblCnsSmsList").trigger("reloadGrid");
	initSpec();	
}

// 엑셀저장
function btnCnsSmsExcel_clickEvent(){	
	var url = getContextPath() + "/excel/main/cnsSmsMain.do?pJson=" + getJsonCnsSmsListExcel();
	window.open(url);
}

// 전송
function btnCnsSmsSend_clickEvent(){
	
	if($("#labCnsSmsRcvNum").html().trim() == ""){
		alert("수신번호가 없습니다.");		
		return;
	}
	
	if($("#cnsSmsActCont").val().trim() == ""){
		alert("답변 메시지를 입력 해 주시기 바랍니다.");
		$("#cnsSmsActCont").focus();
		return;
	}

	if($("#tfCnsSmsImg").val() != ""){
		var nLimitSize = 0.30; //제한사이즈 MB
		var formName = $("#tfCnsSmsImg");
		
		for(var i=0; i<formName.length; i++){
			if(formName[i].value !=""){
				var nRtn=fileCheck(formName[i] , nLimitSize);
				if(nRtn>nLimitSize){ 
					alert( "("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
					return;
				}
				
				//파일 확장자 체크
				if (fileSmsCheck(formName[i]) == false){
					alert("JPG 파일만 업로드 하실 수 있습니다!");
					return;
				}
			}
		}
	}
	

	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/counsel/getChSndId.do",
		data : "pJson=" + getJsonStrChSndId(),
		success : function(data){
			var ch_snd_id = data.CH_SND_ID.toString();
			var sms = true;
			var mmsImg = $("#actImgFlId").val().trim() != "" ? $("#actImgFlId").val().trim() : $("#tfCnsSmsImg").val().trim();
			try{
				gAppendHidden("cnsSmsSendForm", "pJson", getJsonCnsSmsSend(ch_snd_id));
				gSubmitPost("cnsSmsSendForm", true);
				sms = true;
			}catch(e){
				sms = false;
			}finally{
				// 기존이미지첨부된 문자 재발송인 경우
				var inChk=true;
				if(sms && $("#actImgFlId").val().trim() != ""){
					$.ajax({
						type : "post",
						dataType: "json",
						async : false,
						url : getContextPath() + "/ajax/main/imgFileReInsert.do",
						data : "pJson=" + getJsonFileReInsert(ch_snd_id),  
						success : function(data){
							inChk=true;
						},
						error : function(data, status, err) {
							inChk=false
							alert("문자전송 오류입니다. 재전송하시기 바랍니다.");
							networkErrorHandler(data, status, err);
						}
					});						
				}
				// 동기화가 잘 안됨, ALERT처리 후 진행
				alert("발송요청이 완료되었습니다.");
				
				if(sms && mmsImg != "" && inChk){
					var svr_sv_pth = "";
					$.ajax({
						type : "post",
						dataType: "json",
						async : false,
						url : getContextPath() + "/ajax/counsel/sendVms.do",
						data : "pJson=" + getJsonStrFindFile(ch_snd_id),
						success : function(data){
							svr_sv_pth = data.SVR_SV_PTH;
						},
						error : function(data, status, err) {							
							networkErrorHandler(data, status, err);
						}
					});	
										
					
					if(svr_sv_pth != "") {
						$.ajax({
							type : "post",
							dataType: "json",
							async : false,
							url : getContextPath() + "/ajax/message/messageInsert.do",
							data : "pJson=" + getJsonStrSendMms(ch_snd_id, svr_sv_pth),
							success : function(data){
								$.ajax({
									type : "post",
									dataType: "json",
									async : false,
									url : getContextPath() + "/ajax/main/updateRcvActStEnd.do",
									data : "pJson=" + getJsonUpdateRcvActStEnd("030000"),
									success : function(data){									
										
										$("#tblCnsSmsList").trigger("reloadGrid");
										initSpec();
									},
									error : function(data, status, err) {
										networkErrorHandler(data, status, err);
									}
								});								
							},
							error : function(data, status, err) {								
								networkErrorHandler(data, status, err);
							}
						});							
					}else{
						alert("문자전송 오류입니다. 재전송하시기 바랍니다.");
					}
					
				}else{

					$.ajax({
						type : "post",
						dataType: "json",
						async : false,
						url : getContextPath() + "/ajax/main/updateRcvActStEnd.do",
						data : "pJson=" + getJsonUpdateRcvActStEnd("030000"),
						success : function(data){						
							
							$("#tblCnsSmsList").trigger("reloadGrid");
							initSpec();
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
					
				}
				
			}
			
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
}

// 초기화
function btnCnsSmsInit_clickEvent(){
	initSpec();	
}

// 강제종료 RCV_ACT_ST_CD
function btnRcvActStEnd_clickEvent(){
/*
90020
010000	접수
011000	할당
012000	회수
020000	처리중
030000	처리완료
030100	해결
030200	불만	 
*/
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/updateRcvActStEnd.do",
		data : "pJson=" + getJsonUpdateRcvActStEnd("030000"),
		success : function(data){
			alert("강제종료 처리되었습니다.");
			
			$("#tblCnsSmsList").trigger("reloadGrid");
			initSpec();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	
}


function initSpec(){
	
	$("#actContFooter").html(smsSendContFooter);  // 문자 꼬리말세팅
	
	$("#cnsSmsActCont").val("");
	
	$("#labCnsSmsReqDtm, #labCnsSmsReqUserNm, #labCnsSmsSendState, #labCnsSmsSendDtm").html("");
	
	$("#cnsSmsActCont").prop("disabled", false);	
	
	smsFileBox_idx = 0;
	$("#cnsSmsFileInfo").empty().append($("#cnsSmsFileInfo tr").parent().html());
	$("#cnsSmsSendFileInfo").show();
	$("#actImgFlId").val(""); 
	$("#tfCnsSmsImg").val("");
	smsTypeSet();
	
}

//문자타입 구분
function smsTypeSet(){
	var labActCountTxtCnt = charByteSize($("#cnsSmsActCont").val()+$("#actContFooter").html());
	
	$("#labActCountTxt").html(labActCountTxtCnt);
	
	if(parseInt(labActCountTxtCnt) > 80 || $("#tfCnsSmsImg").val().length > 0 || $("#actImgFlId").val().length > 0 ){
		$("input:radio[name=rdSmsType]:input[value=m]").prop("checked", true);
	}else{			
		$("input:radio[name=rdSmsType]:input[value=s]").prop("checked", true);
	}	
}

//첨부파일 보기
function showAttachSmsFiles(noteId){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/message/fileList.do",
		data : "pJson=" + getJsonSmsFileList(noteId),
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
				$("#cnsSmsFileInfo").prepend(tr);
				$("#actImgFlId").val(data[i].FL_ID);  // 기존전송 이미지아이디	세팅
				
			}
			smsTypeSet();
			
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
}

//파일첨부취소
function btnCnsSmsImgCancle_clickEvent(){
	$("#tfCnsSmsImg").val("");
}


//파일 확장자 체크
function fileSmsCheck(fileFormName) { 
	
	var file = fileFormName.value;  								// 폼.파일이름.value
	var fileExt = file.substring(file.lastIndexOf('.')+1); 	//파일의 확장자를 구합니다.
	var bSubmitCheck = true;

	if( !file )
	{ 
		alert( "파일을 선택하여 주세요!");
		return false;
	}

	if(fileExt.toUpperCase() == "JPG" ){
		//alert("EXE, DLL, JSP, JS, ASP, PHP, HTML, HTM 파일은 업로드 하실 수 없습니다!");
		return true;
	}else{return false;}

}


// 파라미터 셋팅_SmsSendList
function getJsonCnsSmsList(){
	
	g_srchDate = $("#tfCnsSrchDate").val().replace(/-/gi, "");
	g_srchDateEn = $("#tfCnsSrchDateEn").val().replace(/-/gi, "");
	
	g_srchUsr = $("#selCnsSrchUsr").val() == "all" ? "" : $("#selCnsSrchUsr").val();
	
	g_srchType = $("#selCnsSrchtype").val();
	g_srchText = $("#tfCnsSrchText").val();
		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjEuY25zU21zTGlzdA==",
		"map" : {
			"key" : "value",
			"ch_gb_cd" : "12010",
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn,
			"srchUsr" : g_srchUsr,	
			"srchType" : g_srchType,		
			"srchText" : g_srchText			
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 문자상담리스트 엑셀가져오기
function getJsonCnsSmsListExcel(){	

	g_srchDate = $("#tfCnsSrchDate").val().replace(/-/gi, "");
	g_srchDateEn = $("#tfCnsSrchDateEn").val().replace(/-/gi, "");
	
	g_srchUsr = $("#selCnsSrchUsr").val() == "all" ? "" : $("#selCnsSrchUsr").val();
	
	g_srchType = $("#selCnsSrchtype").val();
	g_srchText = $("#tfCnsSrchText").val();

	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMjEuY25zU21zTGlzdEV4Y2Vs",
			"map" : {
				"key" : "value",
				"ch_gb_cd" : "12010",
				"srchDate" : g_srchDate,
				"srchDateEn" : g_srchDateEn,
				"srchUsr" : g_srchUsr,	
				"srchType" : g_srchType,		
				"srchText" : g_srchText,
				
				"title" : "문자상담" + setDownLoadName($("#tfCnsSrchDate").val(), $("#tfCnsSrchDateEn").val()),
				"sidx" : "RCV_ID, CH_SND_ID",
				"sord" : "ASC",
				"colWidth" : [20,20,100,20,20,20],
				"colName" : ["VIEW_DTM", "RCVR_CNTCT_INFM", "VIEW_CONT", "RCV_DIV_DTM", "USR_NM","VIEW_ST_NM"],
				"colHeader" : ["접수/답변일시","수신번호","문의/답변 내용", "분배일시", "상담사","처리상태"],
				"colAlign" : ["center","center", "left", "center","center", "center", "center"]	
			}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));		
}



// 강제종료처리
function getJsonUpdateRcvActStEnd(rcv_act_st_cd){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMjEudXBkYXRl",
		"map" : {
			"key" : "value",
			"ch_snd_id" : $("#chSndid").val(),
			"rcv_act_st_cd" : rcv_act_st_cd
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_ChSndId
function getJsonStrChSndId(){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjAuZ2V0Q2hTbmRJZA==",
		"map" : {
			"key" : "value"
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_SendSms
function getJsonCnsSmsSend(ch_snd_id){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFNtcw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : ch_snd_id,
			"tckt_id" : $("#chSndid").val(),
			"cust_id" : "1",
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#labCnsSmsRcvNum").html().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : $("#cnsSmsActCont").val()+$("#actContFooter").html(),
			"snd_resv_dt" : "",
			"snd_resv_tm" : "",
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"cro_id" : "2ksys_test",
			"schedule_type" : "0",
			"subject" : "공주시청컨텍센터",
			"callback" : smsSendTel.replace(/-/gi, ""),
			"dest_info" : $("#labCnsSmsRcvNum").html().replace(/-/gi, ""),
			"cont_length" : parseInt($("#labActCountTxt").html()),
			
			
			"tbl_nm" : "ch020",
			"tbl_pk": ch_snd_id,
			//"send_img" : $("#tfCnsSmsImg").val().trim()
			"send_img" : $("#actImgFlId").val().trim() != "" ? $("#actImgFlId").val().trim() : $("#tfCnsSmsImg").val().trim()
			
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustInfo
function getJsonStrFindFile(custId){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wMTkuZmlsZUxpc3Q=",
			"map" : {
				"key" : "value",
				"tbl_nm" : "ch020",
				"tbl_pk": custId,
				"orderby": "crtTime",
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_SendSms
function getJsonStrSendMms(ch_snd_id ,svr_sv_pth){
	svr_sv_pth = svr_sv_pth.replace("/shared","shared");
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFZtcw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : ch_snd_id,
			"tckt_id" : $("#chSndid").val(),
			"cust_id" : "1",
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#labCnsSmsRcvNum").html().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : $("#cnsSmsActCont").val()+$("#actContFooter").html(),
			"snd_resv_dt" : "",
			"snd_resv_tm" : "",
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"cro_id" : "2ksys_test",
			"schedule_type" : "0",
			"subject" : "공주시청컨텍센터",
			"callback" : smsSendTel.replace(/-/gi, ""),
			"dest_info" : $("#labCnsSmsRcvNum").html().replace(/-/gi, ""),
			"cont_length" : parseInt($("#labActCountTxt").html()),	
			
			"cont_data" : svr_sv_pth+"^1^0",
			"tbl_nm" : "ch020",
			"tbl_pk": ch_snd_id,
			"send_img" : $("#tfCnsSmsImg").val().trim(),
			"message" : "발송요청이 완료되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


// 기존발송 이미지 재등록
function getJsonFileReInsert(tbl_pk){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTkucmVJbnNlcnQ=",
			"map" : {
				"key" : "value",				
				"tbl_pk": tbl_pk,
				"fl_id": $("#actImgFlId").val().trim(),
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일
function getJsonSmsFileList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "CH021",
			"tbl_pk" : tbbsId,
			"orderby" : "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}