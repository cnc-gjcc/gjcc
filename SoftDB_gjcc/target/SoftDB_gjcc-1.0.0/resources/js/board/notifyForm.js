//var oEditors = [];
var deptArr = [];
var teamCds = [];
var tbbsClCd = "";
var cbMsg = "";
var boardType = [];
var tbbsId = "";
var file_num = 0;
var inputFile = [];


//파라미터 셋팅 selectNotify
function getJsonStrSelectNotify(tbbsId) {
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

//파라미터 셋팅 insertNotify
function getJsonStrInsertNotify(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_ttl" : $("#ntfFrm_tfTbbsTtl").val(),
			
			// "tbbs_cntn" : oEditors.getById["taTbbsCntn"].getIR(),
			"tbbs_cntn" : DEXT5.getBodyValue("editor1"),
			
			"emrg_yn" : $("#ntfFrm_optEmrgYN").val(),
			"tbbs_cl_cd" : tbbsClCd,
			"tbbs_strt_dt" : $("#ntfFrm_tfTbbsStrtDt").val().replace(/-/g, ""),
			"tbbs_end_dt" : $("#ntfFrm_tfTbbsEndDt").val().replace(/-/g, ""),
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 updateNotify
function getJsonStrUpdateNotify(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAudXBkYXRl",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"tbbs_ttl" : $("#ntfFrm_tfTbbsTtl").val(),
			
			// "tbbs_cntn" : oEditors.getById["taTbbsCntn"].getIR(),
			"tbbs_cntn" : DEXT5.getBodyValue("editor1"),
			
			"emrg_yn" : $("#ntfFrm_optEmrgYN").val(),
			"tbbs_strt_dt" : $("#ntfFrm_tfTbbsStrtDt").val().replace(/-/g, ""),
			"tbbs_end_dt" : $("#ntfFrm_tfTbbsEndDt").val().replace(/-/g, ""),
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectAuthList 
function getJsonStrSelectAuth(cds) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuc2VsZWN0QXV0aA==",
		"map" : {
			"key" : "value",
			"cds" : cds
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 checkGrdCd
function getJsonCheckGrdCd() {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY2hlY2tHcmRDZA==",
		"map" : {
			"key" : "value",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 insertAuth
function getJsonStrInsertAuth(tbbsId, teamCd) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTIuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"team_cd" : teamCd,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectAuth
function getJsonStrSelectAuthList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTIuc2VsZWN0TGlzdA==",
		"map" : {
			"tbbs_id" : tbbsId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
	}

//파라미터셋팅 deleteAuth
function getJsonStrDeleteAuth(tbbsId) {
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTIuZGVsZXRl",
		"map" : {
			"tbbs_id" : tbbsId,
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
function getJsonNotifyBoardFileList(tbbsId) {		
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
function getJsonDeleteNotifyBoardFile(fileId) {
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
function getJsonFileDownload(svr, loc) {		
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//첨부파일 박스추가
var fileBox_idx = 0;
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#ntfFrm_fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#ntfFrm_fileInfos").append(html);
	}
}

//첨부파일 박스삭제
function removeFileBox(i) {
	var el = $("#ntfFrm_writeForm input[name=record_" + i + "]");
	if (el.next().val() == "add") {
		el.parent().parent().remove();
		fileBox_idx--;
	} else {
		el.next().val("remove");
		el.parent().parent().hide();
	}
}

//첨부된 파일 삭제
function deleteFile(fileId)
{
	if(confirm("첨부된 파일을 삭제하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteFile.do",
			data : "pJson=" + getJsonDeleteNotifyBoardFile(fileId),
			success : function(data)
			{
				//파일폼 삭제
				var el = $("#ntfFrm_writeForm input[name=record_" + fileId + "]");
				el.parent().parent().remove();
				
				if(--fileBox_idx < 5)
				{
					$("#ntfFrm_BOARD").prop("disabled", false);
					$("#ntfFrm_btnRmFilebox").prop("disabled", false);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 등록 콜백 함수
function cbInsert()
{
	//alert(cbMsg);
	 
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	 
	window.opener.btnNotifyInitClickEvent();
	//window.opener.reloadNoticeBar();		// 메인화면 하단 공지사항 올라오는 부분인것 같은데... notifyBoard.js엔 없음
	window.close();
}

// 등록버튼 클릭이벤트
function btnInsertClickEvent()
{
	if (confirm("게시글을 등록 하시겠습니까?"))
	{
		var rMsg = validator();
		
		if(rMsg != "")
		{
			alert(rMsg);
			return;
		}
			
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/insertNotify.do",
			data : "pJson=" + getNextValue(),
			success : function(data)
			{
				gAppendHidden("ntfFrm_writeForm", "pJson", getJsonStrInsertNotify(data.TBBS_ID));
				gSubmitPost("ntfFrm_writeForm", true);
				
				alert(cbMsg);
				//alert("gSubmitPost : " + rtnSumit);			
			
				//게시물열람기본 권한정보 등록
				for(var i = 0; i < teamCds.length; i++)
				{
					$.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath() + "/ajax/board/insertAuth.do",
						data : "pJson=" + getJsonStrInsertAuth(data.TBBS_ID, teamCds[i]),
						success : function(data) { },
						error : function(data, status, err)
						{
							networkErrorHandler(data, status, err);
						}
					});
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//수정버튼 클릭이벤트
function btnUpdateClickEvent()
{
	if (confirm("게시글을 수정 하시겠습니까?"))
	{
		var rMsg = validator();
		
		if(rMsg != "")
		{
			alert(rMsg);
			return;
		}
		
		gAppendHidden("ntfFrm_writeForm", "pJson", getJsonStrUpdateNotify(tbbsId));
		gSubmitPost("ntfFrm_writeForm", true);
		alert(cbMsg);
		
		//게시물열람정보 삭제
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/board/deleteAuth.do",
			data : "pJson=" + getJsonStrDeleteAuth(tbbsId),
			success : function(data)
			{
				//새 게시물열람기본 권한정보 등록
				for(var i = 0; i < teamCds.length; i++)
				{
					$.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath() + "/ajax/board/insertAuth.do",
						data : "pJson=" + getJsonStrInsertAuth(tbbsId, teamCds[i]),
						success : function(data)
						{
							console.log(i + "번째 정보 등록!!"); 
						},
						error : function(data, status, err)
						{
							networkErrorHandler(data, status, err);
						}
					});
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//권한등록버튼 클릭이벤트
function btnRegBoardAuthClickEvent()
{
	var width = 300;
	var height = 450;

	var paramURL = getContextPath() + "/web/board/regBoardAuth.do";
	
	deptArr = window.showModalDialog(paramURL, teamCds, "dialogWidth:" + width 
				+ "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no;");
	
	//선택된 ID로 부서정보 가져오기
	if(deptArr != null && deptArr.length > 0)
	{
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/selectAuth.do",
			data : "pJson=" + getJsonStrSelectAuth(deptArr),
			success : function(data)
			{
				teamCds = [];
				var str = "";
				
				for(var i = 0; i < data.length; i++)
				{
					if(i === data.length - 1)
						str += data[i].CD_NM;
					else
						str += data[i].CD_NM + ", ";

					teamCds.push(data[i].CD);
				}
				
				$("#ntfFrm_tfRegBoardAuth").val(str);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		teamCds = [];
		$("#ntfFrm_tfRegBoardAuth").val("");
	}
}

//입력 검증
function validator()
{
	var rMsg = "";
	
	if($("#ntfFrm_tfTbbsTtl").val().trim() == "")
		rMsg += "\n제목을 입력해 주세요."; 
	
	// var cntn = oEditors.getById["taTbbsCntn"].getIR();
	var cntn = DEXT5.getBodyValue("editor1");
	
	if(cntn.trim() == "")
		rMsg += "\n내용을 입력해 주세요.";
	
	if(teamCds.length <= 0)
		rMsg += "\n하나 이상의 열람권한이 필요합니다.";
	
	if($("#ntfFrm_tfTbbsStrtDt").val() == "")
		rMsg += "\n시작일자를 입력해주세요.";
	
	if($("#ntfFrm_tfTbbsEndDt").val() == "")
		rMsg += "\n종료일자를 입력해주세요.";
	
	var d_tbbsStrtDt = new Date($("#ntfFrm_tfTbbsStrtDt").val().substr(0, 4), $("#ntfFrm_tfTbbsStrtDt").val().substr(4, 2), $("#ntfFrm_tfTbbsStrtDt").val().substr(6, 2));
	var d_tbbsEndDt = new Date($("#ntfFrm_tfTbbsEndDt").val().substr(0, 4), $("#ntfFrm_tfTbbsEndDt").val().substr(4, 2), $("#ntfFrm_tfTbbsEndDt").val().substr(6, 2));
	
	if(d_tbbsStrtDt > d_tbbsEndDt)
		rMsg += "\n시작일이 종료일보다 큽니다.";
	
	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#ntfFrm_writeForm input[name=ntfFrm_BOARD]");
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
function btnInitClickEvent()
{
	$("#ntfFrm_tfTbbsTtl").val("");
	
	// oEditors.getById["taTbbsCntn"].exec("SET_IR", [""]);
	DEXT5.setBodyValue('', 'editor1');
	
	teamCds = [];
	$("#ntfFrm_tfRegBoardAuth").val("");
	$("#ntfFrm_optEmrgYN").val("N");
	
	//초기화를 하면 현재일자로
	//$("#ntfFrm_tfTbbsStrtDt").val("");
	//$("#ntfFrm_tfTbbsEndDt").val("");
	$("#ntfFrm_tfTbbsStrtDt").val(getDate());
	$("#ntfFrm_tfTbbsEndDt").val(getDate());
	
	//파일첨부박스 관련 처리 추가필요
}

//닫기버튼 클릭이벤트 등록
function btnCloseClickEvent()
{
	 window.close();
}

$(document).ready(function()
{
	
	datePicker("#ntfFrm_tfTbbsStrtDt");
	datePicker("#ntfFrm_tfTbbsEndDt");

	$("#ntfFrm_tfTbbsStrtDt").val(getDate());
	$("#ntfFrm_tfTbbsEndDt").val(getDate());
	
	//파일폼 복사
	inputFile.push($("#ntfFrm_BOARD").clone());
	
	//게시판정보 가져오기
	boardType  = window.sessionStorage.getItem("BOARD_TYPE").split(".");
	
	//공지게시판 등록
	if(boardType[1] === "insert")
	{
		$("#ntfFrm_b_title").html("공지게시판 등록");
		$("#ntfFrm_b_usrNm").html("작성자");
		$("#ntfFrm_b_dt").html("작성일자");
		$("#ntfFrm_btnInsert").html("저장");
		
		cbMsg = "등록되었습니다.";
		
		tbbsClCd = boardType[0];
		
		// dext5 editor 초기화
		//initSmarteditor("");
		//dext_editor_loaded_event;
		
		//등급코드 확인하여 팀장급 이하일경우 팀정보 가져오기
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/checkGrdCd.do",
			data : "pJson=" + getJsonCheckGrdCd(),
			success : function(data)
			{
				if(data != null)
				{
					deptArr.push(data.CD);
					teamCds.push(data.CD);
					$("#ntfFrm_tfRegBoardAuth").val(data.CD_NM);
					$("#ntfFrm_btnRegBoardAuth").hide();
				}
				if(data.cd="9000"){
				    $("#ntfFrm_btnRegBoardAuth").show();
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		//등록버튼 클릭이벤트 등록
		$("#ntfFrm_btnInsert").bind("click", btnInsertClickEvent);
	}
	else if(boardType[1] === "modify")	//공지게시판 수정
	{
		$("#ntfFrm_b_title").html("공지게시판 수정");
		$("#ntfFrm_b_usrNm").html("수정자");
		$("#ntfFrm_b_dt").html("수정일자");
		$("#ntfFrm_btnInsert").html("저장");
		
		cbMsg = "수정되었습니다.";
	
		tbbsId = window.sessionStorage.getItem("TBBS_ID");
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/selectNotify.do",
			data : "pJson=" + getJsonStrSelectNotify(tbbsId),
			success : function(data)
			{
				$("#ntfFrm_tfTbbsTtl").val(data.TBBS_TTL);
				$("#ntfFrm_optEmrgYN").val(data.EMRG_YN === '긴급' ? 'Y' : 'N');
				$("#ntfFrm_tfTbbsStrtDt").val(data.TBBS_STRT_DT_FORMAT);
				$("#ntfFrm_tfTbbsEndDt").val(data.TBBS_END_DT_FORMAT);
				DEXT5.setHtmlContentsEw(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'editor1');
			
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		//권한정보
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/selectAuthList.do",
			data : "pJson=" + getJsonStrSelectAuthList(tbbsId),
			success : function(data)
			{
				var str = "";
				
				for(var i = 0; i < data.length; i++)
				{
					if(i === data.length - 1)
						str += data[i].CD_NM;
					else
						str += data[i].CD_NM + ", ";

					teamCds.push(data[i].TEAM_CD);
				}
				
				$("#ntfFrm_tfRegBoardAuth").val(str);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/NotifyBoardFileList.do",
			data : "pJson=" + getJsonNotifyBoardFileList(tbbsId),
			success : function(data)
			{
				for(var i in data)
				{
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
					$("#ntfFrm_fileInfos").parent().append(tr);
				}
				
				if(fileBox_idx >= 5)
				{
					$("#ntfFrm_BOARD").prop("disabled", true);
					$("#ntfFrm_btnRmFilebox").prop("disabled", true);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		//수정버튼 클릭이벤트 등록
		$("#ntfFrm_btnInsert").bind("click", btnUpdateClickEvent);
	}
	else
	{
		alert("게시판 정보를 알수없습니다.");
		window.close();
	}
	
	
	//작성자와 작성일 등록
	var usrNm = window.sessionStorage.getItem("USR_NM");
	var today = new Date().toISOString().substring(0, 10);
	$("#ntfFrm_tfUsrNm").val(usrNm);
	$("#ntfFrm_tfDt").val(today);
	
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	
	//초기화버튼 클릭이벤트 등록
	$("#ntfFrm_btnInit").bind("click", btnInitClickEvent);
	//권한등록버튼 클릭이벤트 등록
	$("#ntfFrm_btnRegBoardAuth").bind("click", btnRegBoardAuthClickEvent);
	//닫기버튼 클릭이벤트 등록
	$("#ntfFrm_btnClose").bind("click", btnCloseClickEvent);
});

