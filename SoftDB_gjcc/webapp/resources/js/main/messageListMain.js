var tblMessageList = {};
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

var inputFile = [];
var fileBox_idx = 0;
var fileForm = "";
var reply = null;
var messageUsrGrd = getUserGrdCode() >= 30100 ? true : false;
/*
function editerCall(){
	DEXT5.config.Height = "250px"; //"350px";
	DEXT5.config.Width = "100%"; //"300px";
	DEXT5.config.zStatusBar = "1";
	DEXT5.config.zTopMenu = "1";
	DEXT5.config.zToolBar  = "0";		
	DEXT5.config.EditorHolder = "messgeCntn";
	new Dext5editor("msgEdtr");
	
//	$("#tblMessageList").trigger("reloadGrid");
}
*/

//한번 실행
var _once = function(func) {
    var flag, result;
    return function() {
      if(flag){ return result;};
      flag = true;
      return result = func();
    }
  }

var editerCall = _once(function() {
	DEXT5.configInitServerXml = "http://counsel.gimpo.go.kr:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
	DEXT5.config.Height = "250px"; //"350px";
	DEXT5.config.Width = "100%"; //"300px";
	DEXT5.config.zStatusBar = "1";
	DEXT5.config.zTopMenu = "1";
	DEXT5.config.zToolBar  = "0";		
	DEXT5.config.EditorHolder = "messgeCntn";
	new Dext5editor("msgEdtr");
});


//파라미터 셋팅 ProgramList
function getJsonStrMsgUserList(){
	// 권한에 따라 셋팅
	
	var cntrCd = "";
	var teamCd = "";
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100"){
		cntrCd = "";
		teamCd = "";
	}else{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = "";
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"team_cd" : teamCd,
			"sidx" : "USR_GRD_CD DESC, TEAM_CD",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일
function getJsonFileList(noteId){		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om030",
			"tbl_pk": noteId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteFile(fileId){
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTkuZGVsZXRl",
		"map" : {
			"key" : "value",
			"fl_id": fileId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc){
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 엑셀문서화
function getJsonStrMsgExcelList(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMzAuZXhjZWxMaXN0",
			"map" : {
				"key" : "value",
				"optMsgList" : $('#optMsgList').val(),
				"msg_usr_id" : $("#selMsgCounselNm").val(),
				"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
				"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
				"tfMsg" : $("#tfMsg").val().trim(),
				"title" : "쪽지발송내역" + setDownLoadName($("#tfMsgStartDt").val(), $("#tfMsgEndDt").val()),
				"sidx" : "SND_DTTM",
				"sord" : "ASC",
				"colWidth" : [10,50,50,10,20,20,20],
				"colName" : ["MSG_KIND","SND_TTL", "NOTE_CNTN", "FL_NUM", "SND_DTTM", "SND_USR_NM","READ_YN"],
				"colHeader" : ["발신/수신","제목","쪽지내용","첨부", "발신일시", "발신자","수신확인"],
				"colAlign" : ["center","left","left", "center", "center","center", "center"]//,
				//"rows" : "10"
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//그리드 셋팅 함수
function mInit_grid(pMap){
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : "100%",
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
		// 발신시 row 배경색 변경
	   	loadComplete : function(data){
	   		var ids = $("#"+pMap.tblId).getDataIDs();
	   		$.each(ids,function(idx, rowId){
	   			rowData = $("#"+pMap.tblId).getRowData(rowId);
	   			if(rowData.MSG_KIND !="발신" && rowData.READ_YN !="확인"){
	   				$("#"+pMap.tblId+" #"+rowId+" td").css("font-weight","bold");
	   				$("#"+pMap.tblId+" #"+rowId+" td:eq(0)~").css("color","#FF007F");
	   				
	   			}
	   		})
	   		
	   	},
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],	
	   	gridComplete : window[pMap.completeEvent],
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

//그리드 셋팅 함수
function init_scroll_grid(pMap){
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	height : pMap.height,
	    width : "100%",
	   	rowNum : "9999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	});
}

//받은 쪽지리스트
function tblMessageList_init_grid(){
	pMap = {};
	pMap.tblId = "tblMessageList";
	pMap.url   = "/jqgrid/main/tblMessageList.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMzAuc2VsZWN0TGlzdA==", {"key" : "value" ,
		"optMsgList" : $('#optMsgList').val(),
		"msg_usr_id" : $("#selMsgCounselNm").val(),
		"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
		"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
		"tfMsg" : $("#tfMsg").val().trim(),
		"usrGrd" : messageUsrGrd ? "gmanager":"ngmanager",
	});
	pMap.colNames = ["발신/수신","제목","쪽지내용", "첨부", "발신일시", "발신자", "수신확인", "쪽지ID"];
	pMap.colModel =
   	[
   	 	{ name : "MSG_KIND", index : "MSG_KIND", align : "center", width : 70, formatter:fnStatusFormatter}, // 발신/수신
   	 	{ name : "SND_TTL", index : "SND_TTL", align : "left", width : 230}, // 쪽지제목
   	 	{ name : "NOTE_CNTN", index : "NOTE_CNTN", align : "left", width : 320}, // 쪽지내용
   	 	{ name : "FL_NUM", index : "FL_NUM", align : "center", width : 50}, // 첨부
   	 	{ name : "SND_DTTM", index : "SND_DTTM", align : "center", width : 110}, // 발신일시
   	 	{ name : "SND_USR_NM", index : "SND_USR_NM", align : "center", width : 110},	
	   	{ name : "READ_YN", index : "READ_YN", align : "center", width : 100 , hidden : true}, // 수신확인(버튼)
	   	{ name : "NOTE_ID", index : "NOTE_ID", hidden : true },	// 쪽지ID   	 	   	 	
   	];
	pMap.rowNum = "10";
	pMap.sortname = "SND_DTTM";
	pMap.height = "260";
	pMap.pager = "pagingMessageList";
	pMap.selectEvent = "tblMessageList_SelectRow";
	//pMap.completeEvent = "tblMessageList_RcvnBtn";

	mInit_grid(pMap);
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tblMessageList").setGridWidth($("#divRCTabMessage").width(), true);
	}).trigger('resize');
	
}

//상담사 선택
function tblUsrList_init_grid(){ 		
	pMap = {};
	pMap.tblId = "tblUsrList";
	pMap.url   = "/ajax/main/tblMessageList.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TWVzc2FnZVVzckxpc3Q=", 
			{
		"key" : "value" ,
		"cntr_cd" : $("#selMsgUsrListCntr").val() == "all" ? "" : $("#selMsgUsrListCntr").val(),
		"team_cd" : $("#selMsgUsrListTeam").val() == "all" ? "" : $("#selMsgUsrListTeam").val(),
		"srchval" : $("#tfMsgUsrListSrchVal").val().trim()
	});
	pMap.colNames = ["선택","센터명","팀명","상담사","수신확인", "상담사ID"];
	pMap.colModel =
	   	[
	   	 	{ name : "RD_YN", index:"RD_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, width : 30,align : "center", sortable : false},
	   		{ name : "CNTR_CD", index : "CNTR_CD", hidden : true},
	   	 	{ name : "TEAM_CD", index : "TEAM_CD", align : "center", width: 100},
	   	 	{ name : "USR_NM", index : "USR_NM", align : "center", width: 60},
	   	 	{ name : "RCVN_DTTM", index : "RCVN_DTTM", align : "center", width: 100},
	   	 	{ name : "USR_ID", index : "USR_ID", hidden : true }
	   	];
	
	pMap.sortname = "TEAM_CD";
	pMap.height = "300";
	pMap.rowNumber = true;
	pMap.width = "100%";
	pMap.autowidth = true;
	pMap.selectEvent = "tblUsrList_SelectRow";
	
	init_scroll_grid(pMap);
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    //jQuery("#tblUsrList").setGridWidth($("#tfSelAgt").width(), true);
		jQuery("#tblUsrList").setGridWidth($("#divRCTabMessage").width()*0.4, true);
	}).trigger('resize');
}

function btnMsgSearch_clickEvent()
{
	$("#tblMessageList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMzAuc2VsZWN0TGlzdA==", {
		"optMsgList" : $('#optMsgList').val(),
		"msg_usr_id" : $("#selMsgCounselNm").val(),
		"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
		"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
		"tfMsg" : $("#tfMsg").val().trim(),
		"usrGrd" : messageUsrGrd ? "gmanager":"ngmanager",
	})} , page : 1, sortname : "SND_DTTM", sortorder : "desc"}).trigger("reloadGrid");
}

function optMsgList_changeEvent()
{
	btnMsgSearch_clickEvent();
}
	
function tblMessageList_SelectRow(rowid){
   	$("#tblMessageList"+" #"+rowid+" td:eq(0)~").css("font-weight","normal");
   	$("#tblMessageList"+" #"+rowid+" td:eq(0)~").css("color","black");
   	
	tblMessageList = $("#tblMessageList").jqGrid('getRowData', rowid);

	DEXT5.setBodyValueEx("", 'msgEdtr');
	
	$("#btnMsgModify").hide();
	$("#btnMsgDelete").show();
	
	//document.getElementById("con").style.display = "none"; // 숨김
	//document.getElementById("con1").style.display = ""; // 숨김

	if(tblMessageList.MSG_KIND == "발신"){
		DEXT5.setEditorMode('edit', 'msgEdtr');
		// 발신일 경우 (상담사 선택 보임, 에디터 사이즈 작게 조절)
		document.getElementById("tfSelAgt").style.display = ""; 
		document.getElementById("tfEditbox").style.width = "58%"; 
		$("#btnMsgUpdate").hide();
		$("#btnMsgReply").hide();
		
		// 쪽지 수신자 조회
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/message/messageInsert.do",
			dataType : "json",
			data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","b20wMzAuY29uZmlybUxpc3Q=", {
				"noteId" : tblMessageList.NOTE_ID
			}),
			success : function(data){
				for (var j = 1; j < $("#tblUsrList").getGridParam("reccount")+1; j++){
					// 수신자가 있을때
					if(data.length > 0){
						for(var i = 0; i < data.length; i++){
							if($("#tblUsrList").getCell(j, "USR_NM") == data[i].RCV_USR_NM){
								$("#tblUsrList").setCell(j, "RD_YN", 1);
								$("#tblUsrList").setCell(j, "RCVN_DTTM", data[i].RCVN_DTTM);
								break;
							}else{
								$("#tblUsrList").setCell(j, "RD_YN", 0);
								$("#tblUsrList").setCell(j, "RCVN_DTTM", " ");
							}
						}
					}else{
						$("#tblUsrList").setCell(j, "RD_YN", 0);
						$("#tblUsrList").setCell(j, "RCVN_DTTM", " ");
					}
				}
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});			
	}else{	    	
    	DEXT5.setEditorMode('view', 'msgEdtr');
		// 수신일 경우 (상담사 선택 안보임, 에디터 사이즈 크게 조절)
		document.getElementById("tfSelAgt").style.display = "none"; 
		document.getElementById("tfEditbox").style.width = "98%";
		$("#btnMsgUpdate").hide();
		$("#btnMsgReply").show();
		
		// 수신확인 Update
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/message/messageInsert.do",
			data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAudXBkYXRlUmVhZA==", {
				"note_id" : tblMessageList.NOTE_ID
			}),
			success : function(data){
				//btnMsgSearch_clickEvent();
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
		
		// 발신자 선택
		for(var i = 1; i < $("#tblUsrList").getGridParam("reccount")+1; i++){
			if($("#tblUsrList").getCell(i, "USR_NM") == tblMessageList.SND_USR_NM){
				$("#tblUsrList").setCell(i, "RD_YN", 1);
				$("#tblUsrList").setCell(i, "RCVN_DTTM", " ");
			}else{
				$("#tblUsrList").setCell(i, "RD_YN", 0);
				$("#tblUsrList").setCell(i, "RCVN_DTTM", " ");	
			}
		}
	}
	if(tblMessageList.NOTE_ID != ""){
		// 쪽지 상세 내용 조회
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/message/notecntn.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","b20wMzAuc2VsZWN0", {
				"note_id" : tblMessageList.NOTE_ID
			}),
			success : function(data){
			    $("#messgeTtl").val(data.SND_TTL);
			    (data.NOTE_CNTN != undefined && data.NOTE_CNTN != null) ? DEXT5.setBodyValueEx(data.NOTE_CNTN, 'msgEdtr') : DEXT5.setBodyValueEx("", 'msgEdtr');
				DEXT5.config.EditorBodyEditable = "false";	
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}	
		});	
		initContent();
		showAttachFiles(tblMessageList.NOTE_ID);
	}
	
	// 읽지 않은 쪽지 개수 다시 집계
	checkMessage();
}

// 수신자 리스트 선택 해제
function tblUsrList_SelectRow(rowid){
	var rd_yn = $("#tblUsrList").getCell(rowid, "RD_YN");
	
	if(rd_yn == 1)
		$("#tblUsrList").setCell(rowid, "RD_YN", 0);
	else
		$("#tblUsrList").setCell(rowid, "RD_YN", 1);
}

//첨부파일 보기
function showAttachFiles(noteId){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/message/fileList.do",
		data : "pJson=" + getJsonFileList(noteId),
		success : function(data){
			
			for(var i in data){
				
				var url = getContextPath() 
				+ "/file/message/messageFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				console.log(data[i].SVR_SV_PTH+"|"+data[i].LOC_FL_NM);
				console.log( "url: "+url);
				var tr = "<tr>";
				tr += "<td align='left' style='width: 30%;'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span style='width: 320px;'><a href='" + url + "' target='_blank'>" + data[i].LOC_FL_NM + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				tr += "</tr>";
				
				fileBox_idx++;
				$("#msgFileInfos").prepend(tr);			
			}
			if(fileBox_idx >= 3){
				//$("#MESSAGE").closest("tr").hide();
				$("#MESSAGE").prop("disabled", true);
				$("#rmFilebox").prop("disabled", true);
			}
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
}

//파라미터 셋팅 insertMessage
function getJsonStrInsertMessage(noteId, noteCntn) {
	if(reply == "Y"){
		noteCntn = "RE :"+ noteCntn;
	}

	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMzAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbl_pk": noteId,
			"tbl_nm" : "om030",
			"note_id" : noteId,
			"note_ttl" : $("#messgeTtl").val(),
			"note_cntn" : noteCntn,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


function btnMsgModify_clickEvent(){
	var tblUsrList = $("#tblUsrList").getRowData();
	var pList = [];
	var cnt = 0;
	var msgTxt = DEXT5.getBodyTextValue("msgEdtr");
	
	if(document.writeForm.MESSAGE.value != ""){
		var nLimitSize = 10; //제한사이즈 MB
		var formName = $("#writeForm input[name=MESSAGE]");
		for(var i=0; i<formName.length; i++){
			if(formName[i].value !=""){
				var nRtn=fileCheck(formName[i] , nLimitSize);
				if(nRtn>nLimitSize){ 
					alert("[" + (i+1) + "번 파일] : ("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
					return;
				}
				
				//파일 확장자 체크
				if (fileExtnsCheck(formName[i]) == false){
					alert("[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!");
					return;
				}
			}
		}
	}
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/user/useInfo.do",			// om030.nextval
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","b20wMzAubmV4dHZhbA==", {	
			
		}),
		success : function(data){  
			var jr = JSON.parse(data);
			
			var noteId_usr = jr.NOTE_ID;
			
			for(var i = 0 ; i <= tblUsrList.length; i++ ){	
				if(jQuery.isEmptyObject(tblUsrList[i]))
					continue;
				
				if(tblUsrList[i].RD_YN == "1"){
					cnt++;
					// om030.insertBatch
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "b20wMzAuaW5zZXJ0QmF0Y2g=",
						"map":	{
								 "note_id" : noteId_usr,
								 "rcvn_usr_id" : tblUsrList[i].USR_ID,
								 "rcvn_usr_nm" : tblUsrList[i].USR_NM,
								 "cntr_nm" : tblUsrList[i].CNTR_CD,
								 "team_nm" : tblUsrList[i].TEAM_CD
					}});
				}
			}
			
			if(cnt == 0)
				alert("수신 상담사를 선택해 주세요.");
			else if(msgTxt.trim() == "")
				alert("메세지 내용을 입력해 주세요.");
			else{	
				// om030.insert
				gAppendHidden("writeForm", "pJson", getJsonStrInsertMessage(jr.NOTE_ID, DEXT5.getBodyValueEx("msgEdtr")));
				var rtnSubmit = gSubmitPost("writeForm", true);			
				
				alert("전송이 완료되었습니다.");		
				
				$.ajax({
					type : "post",
					async : true,
					url : getContextPath() + "/ajax/message/messageInsert.do",
					data : "pJson=" + getJsonStr("YmF0Y2g=",null, pList),
					success : function(data){
						btnMsgInit_clickEvent();
						initContent();
					},
					error : function(data, status, err){
						networkErrorHandler(data, status, err);
					}	
				});				
			}
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function btnMsgDelete_clickEvent(){
	
	if(tblMessageList.MSG_KIND.indexOf("수신")!=-1){
		if(confirm("수신메세지를 삭제하시겠습니까?")){
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/message/messagedelete1.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAuZGVsZXRlUmVjZWl2ZQ==", {
					"note_id" : tblMessageList.NOTE_ID
				}),
				success : function(data){
					DEXT5.setBodyValueEx("", 'msgEdtr');
					tblMessageList = {};
//					btnMsgInit_clickEvent();
					btnMsgInit_clickEvent2();
					alert("삭제되었습니다.");
				},
				error : function(data, status, err){
					networkErrorHandler(data, status, err);
				}	
			});
		}
	}else if(tblMessageList.MSG_KIND == "발신"){
		
		if(confirm("발신메세지를 삭제하시겠습니까?")){
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/message/messagedelete2.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAuZGVsZXRl", {
					"note_id" : tblMessageList.NOTE_ID
				}),
				success : function(data){
					DEXT5.setBodyValueEx("", 'msgEdtr');
					tblMessageList = {};
//					btnMsgInit_clickEvent();
					btnMsgInit_clickEvent2();
					alert("삭제되었습니다.");
				},
				error : function(data, status, err){
					networkErrorHandler(data, status, err);
				}	
			});
		}
	}
}

function btnMsgUpdate_clickEvent(){
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/message/messageInsert.do",
		data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAudXBkYXRl", {
			"note_id" : tblMessageList.NOTE_ID,
			"note_cntn" : DEXT5.getBodyValueEx("msgEdtr")
		}),
		success : function(data){
			btnMsgInit_clickEvent();
			alert("수정되었습니다.");
			initContent();
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function btnMsgReset_clickEvent(){
	tblMessageList = {};
	$("#messgeTtl").val("");
	DEXT5.setEditorMode('edit', 'msgEdtr');
	DEXT5.setBodyValueEx("", 'msgEdtr');
	$("#btnMsgModify").show();
	$("#btnMsgDelete").hide();
	$("#btnMsgUpdate").hide();
	DEXT5.config.EditorBodyEditable = "true";
	$("#btnMsgReply").hide();
	
	initContent();
	//document.getElementById("con").style.display = ""; // 보여줌
	//document.getElementById("con1").style.display = "none"; // 숨김
	// 상담사 선택 보임, 에디터 사이즈 작게 조절
	document.getElementById("tfSelAgt").style.display = ""; 
	document.getElementById("tfEditbox").style.width = "58%"; 
	
	$("#tblUsrList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TWVzc2FnZVVzckxpc3Q=", {"key" : "value",
		"cntr_cd" : $("#selMsgUsrListCntr").val() == "all" ? "" : $("#selMsgUsrListCntr").val(),
		"srchval" : $("#tfMsgUsrListSrchVal").val().trim()
	})}}).trigger("reloadGrid");
}

function btnMsgInit_clickEvent(){
	$("#optMsgList").val("all");
	$("#messgeTtl").val("");
	$("#selMsgCounselNm").val("all");
	$("#tfMsg").val("");
	
	var d = new Date();
	var cMonth = d.getMonth() + 1;
	if(cMonth < 10)
		cMonth = "0" + cMonth;
	var currentDate = d.getFullYear() + "-" + cMonth + "-01";
	$("#tfMsgStartDt").val(currentDate);
	$("#tfMsgEndDt").val(getDate());
	
	btnMsgSearch_clickEvent();
	btnMsgReset_clickEvent();
}

function btnMsgInit_clickEvent2(){
	$("#optMsgList").val("all");
	$("#messgeTtl").val("");
	$("#selMsgCounselNm").val("all");
	$("#tfMsg").val("");
	
	var d = new Date();
	var cMonth = d.getMonth() + 1;
	if(cMonth < 10)
		cMonth = "0" + cMonth;
	var currentDate = d.getFullYear() + "-" + cMonth + "-01";
	$("#tfMsgStartDt").val(currentDate);
	$("#tfMsgEndDt").val(getDate());
	
	btnMsgReset_clickEvent();
	
	var tblLength = $("#tblMessageList").getGridParam("reccount");
	var tblNowPage= $("#input_pagingMessageList input").val();
	var tblTotalPage= Number($("#sp_1_pagingMessageList").text());
	
	if(tblNowPage==tblTotalPage && tblLength==1){
	    $("#tblMessageList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMzAuc2VsZWN0TGlzdA==", {
		"optMsgList" : $('#optMsgList').val(),
		"msg_usr_id" : $("#selMsgCounselNm").val(),
		"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
		"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
		"tfMsg" : $("#tfMsg").val().trim(),
		"usrGrd" : messageUsrGrd ? "gmanager":"ngmanager"
	})} , page : tblTotalPage-1, sortname : "SND_DTTM", sortorder : "desc"}).trigger("reloadGrid");
	}else{
	    $("#tblMessageList").trigger("reloadGrid");
	}
}


function btnMsgReply_clickEvent()
{
	
	initContent();
	//document.getElementById("con").style.display = ""; // 보여줌
	//document.getElementById("con1").style.display = "none"; // 숨김
	DEXT5.config.EditorBodyEditable = "true";
	var text = "";
	$("#messgeTtl").val("");
	DEXT5.setEditorMode('edit', 'msgEdtr');
	DEXT5.setBodyValueEx("", 'msgEdtr');
	$("#btnMsgReply").hide();
	$("#btnMsgDelete").hide();
	$("#btnMsgModify").show();
	
}

//엑셀 문서화
function btnMsgExcel_clickEvent(){
	var url = getContextPath() + "/excel/message/tblMessageList.do?pJson=" + getJsonStrMsgExcelList();
	window.open(url);
}

// 하단 상담사 검색 버튼 클릭 이벤트
function btnMsgUsrListSrch_clickEvent() {
	$("#tblUsrList").jqGrid("setGridParam",{
			postData : {
				pJson : getJsonStr("c2VsZWN0TGlzdA==","b20wMDEuc2VsZWN0TWVzc2FnZVVzckxpc3Q=",{
							"key" : "value",
							"cntr_cd" : $("#selMsgUsrListCntr").val() == "all" ? "" : $("#selMsgUsrListCntr").val(),
							"team_cd" : $("#selMsgUsrListTeam").val() == "all" ? "" : $("#selMsgUsrListTeam").val(),
							"srchval" : $("#tfMsgUsrListSrchVal").val().trim()
						})
			}
		}).trigger("reloadGrid");
}

function btnMsgMsgCollect_clickEvent(){
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/message/messageCollect.do",
		data : "pJson=" + getJsonStr("aW5zZXJ0","b20wMzAuZGVsZXRl", {
			"note_id" : tblMessageList.NOTE_ID
		}),
		success : function(data){
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/message/messageCollect.do",
				data : "pJson=" + getJsonStr("aW5zZXJ0",/*"b20wMzAuZGVsZXRlUmVjZWl2ZQ==",*/ "b20wMzAuZGVsZXRlQWxsUmVjZWl2ZQ==", {
					"note_id" : tblMessageList.NOTE_ID,
					//"login_usr_id" : window.sessionStorage.getItem("USR_ID")
				}),
				success : function(data){
					btnMsgInit_clickEvent();
					alert("수정되었습니다.");
					initContent();
				},
				error : function(data, status, err){
					networkErrorHandler(data, status, err);
				}
			});
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function setSelectBoxWithMsgUser(){	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrMsgUserList(),
		success : function(data){
			$("#selMsgCounselNm").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#selMsgCounselNm").append(value);
			$("#selMsgCounselNm").trigger("change");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 전체 선택 해제 함수
function rdYn_clickEvent(){
	var selectVal = "0";
	var tblLength = $("#tblUsrList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++){
		if($("#tblUsrList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++){
		$("#tblUsrList").setCell(i, "RD_YN", selectVal);
	}
}

/* 첨부파일 업로드 ================================================================== */
//첨부파일 박스추가
var fileBox_idx = 0;
function addFileBox() {
	if (fileBox_idx >= 2) {
		alert("첨부파일은 최대 3개까지 가능합니다.");
	} else {
		var html = $("#msgFileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#msgFileInfos").append(html);
	}
		
}
//첨부파일박스삭제
function removeFileBox(i) {
	var el = $("#writeForm input[name=record_" + i + "]");
	if (el.next().val() == "add") {
		el.parent().parent().remove();
		fileBox_idx--;
	} else {
		el.next().val("remove");
		el.parent().parent().remove();
		fileBox_idx--;
	}
}

//파일박스 내용삭제
function rmFileBoxEvent(){
	inputFile[1] = inputFile[0].clone(true);
	$("#MESSAGE").replaceWith(inputFile[1]);
}
//첨부된 파일 삭제
function deleteFile(fileId) {
	if(confirm("첨부된 파일을 삭제하시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteFile.do",
			data : "pJson=" + getJsonDeleteFile(fileId),
			success : function(data) {
				//파일폼 삭제
				var el = $("#writeForm input[name=record_" + fileId + "]");
					el.parent().parent().remove();
					if(--fileBox_idx < 3) {
						$("#BOARD").prop("disabled", false);
						$("#btnFileCancle").prop("disabled", false);
					}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

/* 첨부파일 업로드 ================================================================== */

//초기 컨트롤 셋팅
function initMsgControl(){
	
	$("#btnMsgUpdate").hide();
	$("#btnMsgDelete").hide();
	$("#btnMsgReply").hide();
}

function alarmSwitch_clickEvent(){
    if($("#alarmSwitch input[type='checkbox']").prop("checked")){
	document.frames['iframePollData'].sessionStorage.setItem('alarmMessage',true);
    }else{
	document.frames['iframePollData'].sessionStorage.setItem('alarmMessage',false);
    }
}
//초기 이벤트 셋팅
function initMsgEvent(){
	//알람 switch
	$("#alarmSwitch input[type='checkbox']").bind("click", alarmSwitch_clickEvent);

	$("#btnMsgCollect").bind("click", btnMsgMsgCollect_clickEvent)
	$("#btnMsgModify").bind("click", btnMsgModify_clickEvent);
	$('#optMsgList').bind("change", optMsgList_changeEvent);
	$("#btnMsgDelete").bind("click", btnMsgDelete_clickEvent);
	$("#btnMsgReset").bind("click", btnMsgReset_clickEvent);
	$("#btnMsgUpdate").bind("click", btnMsgUpdate_clickEvent);
	$("#btnMsgSearch").bind("click", btnMsgSearch_clickEvent);
	$("#btnMsgInit").bind("click", btnMsgInit_clickEvent);
	$("#btnMsgReply").bind("click", btnMsgReply_clickEvent);
	$("#btnMsgUsrListSrch").bind("click", btnMsgUsrListSrch_clickEvent);
	$("#selMsgUsrListCntr, #selMsgUsrListTeam").bind("change", btnMsgUsrListSrch_clickEvent);
	
	//메세지 엑셀화
	$("#btnMsgExcel").bind("click", btnMsgExcel_clickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfMsg").bind("keydown", function (key){
		if (key.keyCode == 13)
			btnMsgSearch_clickEvent();
	});
	
	// 하단 사용자 조회 텍스트인풋 엔터 키 이벤트
	$("#tfMsgUsrListSrchVal").bind("keydown", function (key){
		if (key.keyCode == 13)
			$("#btnMsgUsrListSrch").trigger("click");
	});

	setSelectBoxWithMsgUser();
	
	datePicker("#tfMsgStartDt");
	datePicker("#tfMsgEndDt");
	
	setSelectBoxWithCode("selMsgUsrListCntr", "전체", "90002", "", "", window.sessionStorage.getItem("CNTR_CD"));
	setSelectBoxWithCode("selMsgUsrListTeam", "전체", "90003", "", "", window.sessionStorage.getItem("TEAM_CD"));
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100"){
		$("#selMsgUsrListCntr").prop("disabled", false);
		$("#btnMsgCollect").show();
	}else{
		$("#selMsgUsrListCntr").prop("disabled", true);
		$("#selMsgUsrListCntr").hide();
		$("#btnMsgCollect").hide();
	}
}

//초기 데이터 셋팅
function initMsgData(){
	var d = new Date();
	var cMonth = d.getMonth() + 1;
	if(cMonth < 10)
		cMonth = "0" + cMonth;
	var currentDate = d.getFullYear() + "-" + cMonth + "-01";
	
	$("#tfMsgStartDt").val(currentDate);
	$("#tfMsgEndDt").val(getDate());
	
	$("#selMsgUsrListTeam").val("all");
	$("#selMsgUsrListCntr").val("010000");
	tblMessageList_init_grid();
	tblUsrList_init_grid();
	
	$("#tblUsrList_RD_YN").bind("click", 1, rdYn_clickEvent);
}

//내용 초기화
function initContent(){
	reply = null;
	fileBox_idx = 0;
	$("#msgFileInfos").empty().append(fileForm);
	$("#MESSAGE").val("");
}
//파일첨부취소
function btnRmFilebox_clickEvent(){
	$("#tblFiles").empty().append(fileForm);
	$("#MESSAGE").val("");
}


function emptyEvent1(){
    $("#msgFileInfos tr:eq(0)>td:eq(0) input[name=MESSAGE]").val("");
}
function emptyEvent2(){
    $("#msgFileInfos tr:eq(1)>td:eq(0) input[name=MESSAGE]").val("");
}
function emptyEvent3(){
    $("#msgFileInfos tr:eq(2)>td:eq(0) input[name=MESSAGE]").val("");
}

// 메인화면 로딩 시 부하 감소를 위한 function 변경
function initdivRCTabMessage(){
$("#btnFileCancle").bind("click", btnRmFilebox_clickEvent);

		
	inputFile.push($("#MESSAGE").clone());
	fileForm = $("#msgFileInfos tr").parent().html();
	
	initMsgEvent();
	initMsgData();
	initMsgControl();
	editerCall();	
	
	//$("#msgFileInfos tr:eq(0)>td:eq(0) input[name=MESSAGE]").bind('click', emptyEvent1);
	$("#rmFilebox").bind('click', emptyEvent1);
	
	$("#selMsgUsrListTeam option[value=9100]").remove();
	// file size check
	$("#writeForm input[name=MESSAGE]").bind("change",  function () {
	      var nLimitSize = 0.30; //제한사이즈 MB
	      var formName = $("#writeForm input[name=MESSAGE]");
	      for(var i=0; i<formName.length; i++){
	         if(formName[i].value !=""){
	            var nRtn=fileCheck(formName[i] , nLimitSize);
	            if(nRtn>nLimitSize){ 
	               alert( "("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
	               $(this).val("");
	            }
	            
	            //파일 확장자 체크
/*	            if (fileSmsCheck(formName[i]) == false){
	               alert("JPG 파일만 업로드 하실 수 있습니다!");
	               $(this).val("");
	            }*/
	         }
	      }
	   });
}