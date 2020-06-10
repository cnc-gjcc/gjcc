//var oEditors = [];
var tbbsClCd = "";
var file_num = 0;
var cbMsg = "";
var inputFile = [];


//파라미터 셋팅 selectGeneral
function getJsonStrSelectGeneral(tbbsId) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAuc2VsZWN0",
			"map" : {
				"key" : "value",
				"tbbs_id" : tbbsId,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertGeneral
function getJsonStrInsertGeneral(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_ttl" : $("#gnrFrm_tfTbbsTtl").val(),
			
			//"tbbs_cntn" : oEditors.getById["taTbbsCntn"].getIR(),
			"tbbs_cntn" : DEXT5.getBodyValue("editor1"),
			
			"tbbs_cl_cd" : tbbsClCd,
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 updateGeneral
function getJsonStrUpdateGeneral(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAudXBkYXRl",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"tbbs_ttl" : $("#gnrFrm_tfTbbsTtl").val(),
			//"tbbs_cntn" : oEditors.getById["taTbbsCntn"].getIR(),
			"tbbs_cntn" : DEXT5.getBodyValue("editor1"),
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 공지사항 next value
function getNextValue() {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 fileList
function getJsonGeneralBoardFileList(tbbsId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 deleteFile
function getJsonDeleteGeneralBoardFile(fileId) {
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

//첨부파일 박스추가
var fileBox_idx = 0;
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#gnrFrm_fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#gnrFrm_fileInfos").append(html);
	}
}

//첨부파일박스삭제
function removeFileBox(i) {
	var el = $("#gnrFrm_writeForm input[name=record_" + i + "]");
	if (el.next().val() == "add") {
		el.parent().parent().remove();
		fileBox_idx--;
	} else {
		el.next().val("remove");
		el.parent().parent().hide();
	}
}

//첨부된 파일 삭제
function deleteFile(fileId) {
	if(confirm("첨부된 파일을 삭제하시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteFile.do",
			data : "pJson=" + getJsonDeleteGeneralBoardFile(fileId),
			success : function(data) {
				//파일폼 삭제
				var el = $("#gnrFrm_writeForm input[name=record_" + fileId + "]");
					el.parent().parent().remove();
					if(--fileBox_idx < 5) {
						$("#gnrFrm_BOARD").prop("disabled", false);
						$("#gnrFrm_btnRmFilebox").prop("disabled", false);
					}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 등록 게시판정보
function cbInsert() {
	alert(cbMsg);
 
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	 
	 window.opener.location.reload(true);
	 selfClose();
}

// 등록버튼 클릭이벤트
function btnInsertClickEvent() {
	if (confirm("게시글을 등록 하시겠습니까?")) {
		var rMsg = validator();
		if(rMsg != "") {
			alert(rMsg);
			return;
		}
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/insertGenenral.do",
			data : "pJson=" + getNextValue(),
			success : function(data) {
				gAppendHidden("gnrFrm_writeForm", "pJson", getJsonStrInsertGeneral(data.TBBS_ID));
				gSubmitPost("gnrFrm_writeForm", true);
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//수정버튼 클릭이벤트
function btnUpdateClickEvent() {
	if(confirm("게시글을 수정 하시겠습니까?")) {
		var rMsg = validator();
		if(rMsg != "") {
			alert(rMsg);
			return;
		}
		var tbbsId = window.sessionStorage.getItem("TBBS_ID");
		gAppendHidden("gnrFrm_writeForm", "pJson", getJsonStrUpdateGeneral(tbbsId));
		gSubmitPost("gnrFrm_writeForm", true);
	}
}

//파일박스 내용삭제
function btnRmFileBoxClickEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#gnrFrm_BOARD").replaceWith(inputFile[1]);
}

//입력검증
function validator() {
	var rMsg = "";
	
	var tbbsTtl = $("#gnrFrm_tfTbbsTtl").val();
	if(tbbsTtl.trim() == "") {
		rMsg += "\n제목을 입력해 주세요."; 
	}
	
	//var cntn = oEditors.getById["taTbbsCntn"].getIR();
	var cntn = DEXT5.getBodyValue("editor1");
	if(cntn.trim() == "") {
		rMsg += "\n내용을 입력해 주세요.";
	}
	
	//파일 업로드 용량 체크
	var nLimitSize = 300; //제한사이즈 MB
	var formName = $("#gnrFrm_writeForm input[name=gnrFrm_BOARD]");
	for(var i=0; i<formName.length; i++){
		if(formName[i].value !=""){
			//파일용량 체크
			var nRtn=fileCheck(formName[i] , nLimitSize);
			if(nRtn>nLimitSize){ 
				rMsg += "\n\n[" + (i+1) + "번 파일] : ("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.";
			}
			
			//파일 확장자 체크
			if (fileExtnsCheck(formName[i]) == false)
				rMsg += "\n\n[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
						
		}
	}
	
	return rMsg;
}

// 초기화버튼 클릭이벤트
function btnInitClickEvent() {
	$("#gnrFrm_tfTbbsTtl").val("");
	
	//oEditors.getById["taTbbsCntn"].exec("SET_IR", [""]);
	DEXT5.setBodyValue('', 'editor1');
} 

//닫기버튼 클릭이벤트 등록
function btnCloseClickEvent() {
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	 
	 window.opener.location.reload(true);
	 selfClose();
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {		
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

$(document).ready(function() {
	//파일폼 복사
	inputFile.push($("#gnrFrm_BOARD").clone());
	
	//게시판정보 가져오기
	var boardType  = window.sessionStorage.getItem("BOARD_TYPE").split(".");
	
	//일반게시판 등록
	if(boardType[1] === "insert"){
		$("#gnrFrm_b_title").html("일반게시판 등록");
		$("#gnrFrm_b_usrNm").html("작성자");
		$("#gnrFrm_b_dt").html("작성일자");
		$("#gnrFrm_btnInsert").html("저장");
		cbMsg = "등록되었습니다.";
		tbbsClCd = boardType[0];
		
		//등록버튼 클릭이벤트 등록
		$("#gnrFrm_btnInsert").bind("click", btnInsertClickEvent);
		
	//일반게시판 수정
	} else if(boardType[1] === "modify") {
		$("#gnrFrm_b_title").html("일반게시판 수정");
		$("#gnrFrm_b_usrNm").html("수정자");
		$("#gnrFrm_b_dt").html("수정일자");
		$("#gnrFrm_btnInsert").html("저장");
		cbMsg = "수정되었습니다.";
		
		var currTbbsId = window.sessionStorage.getItem("TBBS_ID");
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/user/selectGeneral.do",
			data : "pJson=" + getJsonStrSelectGeneral(currTbbsId),
			success : function(data) {
				$("#gnrFrm_tfTbbsTtl").val(data.TBBS_TTL);
				DEXT5.setHtmlContentsEw(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'editor1');
				
				//수정버튼 클릭이벤트 등록
				$("#gnrFrm_btnInsert").bind("click", btnUpdateClickEvent);
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/generalBoardFileList.do",
			data : "pJson=" + getJsonGeneralBoardFileList(currTbbsId),
			success : function(data) {
				for(var i in data) {
					var url = getContextPath() 
					+ "/file/notifyBoardFileDown.do?pJson=" 
					+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
					
					var tr = "<tr id='" + data[i].FL_ID + "'>";
					tr += "<td class='line_noline' colspan='3'>";
					tr += "<input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
					tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
					tr += "<td class='line_b_text' colspan='2'>";
					tr += "<span>" + data[i].FL_KB_SZ + "</span>&nbsp;";
					tr += "<a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong>X</strong></a></td>";
					tr += "</tr>";
					
					fileBox_idx++;
					$("#gnrFrm_fileInfos").parent().append(tr);
				}
				if(fileBox_idx >= 5) {
					$("#gnrFrm_BOARD").prop("disabled", true);
					$("#gnrFrm_btnRmFilebox").prop("disabled", true);
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	} else {
			alert("게시판 정보를 알수없습니다.");
			selfClose();
	}
	//작성자와 작성일 등록
	var usrNm = window.sessionStorage.getItem("USR_NM");
	var today = new Date().toISOString().substring(0, 10);
	$("#gnrFrm_tfCrtUsrNm").val(usrNm);
	$("#gnrFrm_tfCrtDt").val(today);
	
	//초기화버튼 클릭이벤트 등록
	$("#gnrFrm_btnInit").bind("click", btnInitClickEvent);
	//닫기버튼 클릭이벤트 등록
	$("#gnrFrm_btnClose").bind("click", btnCloseClickEvent);
	//파일박스취소버튼 클릭이벤트 등록
	$("#gnrFrm_btnRmFilebox").bind("click", btnRmFileBoxClickEvent);
});