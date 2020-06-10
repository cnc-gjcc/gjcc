
//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;

var isMngr = false;
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
//라디오박스 선택시날짜변경
var cDTTM = new Date();
var ShowAll="";

Number.prototype.settodays=function(){ 
	return (this<10?'0'+this:this);
}

Date.prototype.getYMD = function(){ 
	return this.getFullYear()+'-'+(this.getMonth()+1).settodays()+'-'+this.getDate().settodays();
} 

//파라미터셋팅 nofifyAllList
function getJsonStrSelectNotifyList(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
/*    if(window.sessionStorage.getItem("USR_GRD_CD") >= 030100){
	ShowAll ="all";
    }*/
    var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
//			"tbbs_cl_cd" : "020100",
			"tbbs_cl_cd_one" : "020100",
			"tbbs_cl_cd_two" : "050100",
			"usr_grd_cd" : usrGrdCd,
//			"showAll" : ShowAll
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터셋팅 selectNotify
function getJsonStrSelectNotify(tbbsId) {
	var loParam = {
		"qt" :	"c2VsZWN0T25l",
		"mi" : "b20wMTAuc2VsZWN0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 boardAccess
function getJsonStrBoardAccess(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTEuaW5zZXJ0VXBkYXRl",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CommentList
function getJsonStrCommentList(tbbsId) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTMuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertComment
function getJsonStrInsertComment(tbbsId) {
	var loParam = {
		"qt" :	"aW5zZXJ0",
		"mi" : "b20wMTMuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"comm_cntn" : $("#mintbd_taCommCntn").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectComment
function getJsonStrSelectComment(commId) {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTMuc2VsZWN0",
		"map" : {
			"key" : "value",
			"comm_id" : commId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet
function getJsonStrModifyComment(commId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTMudXBkYXRl",
		"map" : {
			"key" : "value",
			"comm_id" : commId,
			"comm_cntn" : $("#mintbd_taModCommCntn" + commId).val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 deleteComment
function getJsonStrDeleteComment(commId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTMudXBkYXRl",
		"map" : {
			"key" : "value",
			"comm_id" : commId,
			"use_yn" : 'N'
		}
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

//파라미터 셋팅 fileDown
function getJsonNotifyBoardFileDown(svr, loc) {		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//게시판읽음여부
function getJsonStrNoticeCnt(){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTAuY2l2aWxHZXROb3RpY2VDb3VudA==",
		"map" : {
			"key" : "value",
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),			
			"tbbs_strt_dt" : $("#mintbd_tfTbbsStrtDt").val().replace(/-/g,""),
			"tbbs_end_dt" : $("#mintbd_tfTbbsEndDt").val().replace(/-/g,""),
//			"showAll" : ShowAll	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//초기화버튼 클릭이벤트
function btnNotifyInitClickEvent() {
	$("#mintbd_optSrchtypes").val("ttl");
	$("#mintbd_tfSrchval").val("");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#mintbd_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#mintbd_tfTbbsEndDt").val(getDate());
	
	g_srchtype = "ttl";
	g_srchval = "";
	g_tbbsStrtDt = $("#mintbd_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#mintbd_tfTbbsEndDt").val().replace(/-/g,"");
	
	isModComm = false;
	
	boardContentSlideup();
	checkUserNoticeCnt();
	
	$("#mintbd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
	page : 1, sortname : "TBBS_ID", sortorder : "desc"}).trigger("reloadGrid");
	
	$("input:radio[name='serviceType']").removeAttr('checked');
	$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
	//$("input[name='serviceType']:radio").attr("disabled",true); 
	$("#mintbd_searchDay").attr('checked', false);
	$("#mintbd_search_latenes").attr('checked', false);
	//$(".select_bl_my").attr("disabled",true); 
	//$("#mintbd_tfTbbsStrtDt").attr("disabled",true); 
	//$("#mintbd_tfTbbsEndDt").attr("disabled",true);
	//$("#mintbd_tfSrchval").attr("disabled",true);
}

//검색 조회버튼 클릭이벤트
function btnNotifySearchClickEvent() {
	g_srchtype = $("#mintbd_optSrchtypes").val();
	g_srchval = $("#mintbd_tfSrchval").val();
	g_tbbsStrtDt = $("#mintbd_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#mintbd_tfTbbsEndDt").val().replace(/-/g,"");
	checkUserNoticeCnt();
	var rMsg = "";
	if(g_tbbsStrtDt != "" || g_tbbsEndDt != "") {
		if(g_tbbsStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_tbbsEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_tbbsStrtDt = new Date(g_tbbsStrtDt.substr(0, 4), g_tbbsStrtDt.substr(4, 2), g_tbbsStrtDt.substr(6, 2));
			var d_tbbsEndDt = new Date(g_tbbsEndDt.substr(0, 4), g_tbbsEndDt.substr(4, 2), g_tbbsEndDt.substr(6, 2));
			if(d_tbbsStrtDt > d_tbbsEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	
	//reload grid
	$("#mintbd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "TBBS_ID", sortorder : "desc"});
	$("#mintbd_tblNotifyList").trigger("reloadGrid");
}

//게시물 삭제버튼 클릭이벤트
function btnDeleteMainNotifyClickEvent(){
	//체크된 row들의 array
	var rows = $("#mintbd_tblNotifyList").jqGrid("getGridParam", "selarrrow");
	
	//체크확인
	if(rows == null || rows.length <= 0){
		alert("선택된 게시글이 없습니다.");
		return;
	}
	
	if(confirm("선택된 게시글을 삭제하시겠습니까?")){
		var ids = new Array();
		for(var i = 0; i < rows.length; i++){
			var row = $("#mintbd_tblNotifyList").getRowData(rows[i]);
			ids[i] = row.TBBS_ID;
		}
	
		g_tbbsStrtDt = $("#mintbd_tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#mintbd_tfTbbsEndDt").val().replace(/-/g,"");			
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteNotify.do",
			data : "pJson=" + getJsonStrDeleteNotify(ids),
			success : function(data){
				//reload grid
				$("#mintbd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
				$("#mintbd_tblNotifyList").trigger("reloadGrid");
				
				reloadNoticeBar();
				
				alert("삭제되었습니다.");
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//조회중인 게시물 삭제버튼 클릭이벤트
function btnCntnDeleteClickEvent(){
	if(confirm("게시물을 삭제하시겠습니까?")){
		var tbbsIdArr = [currTbbsId];
		
		g_tbbsStrtDt = $("#mintbd_tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#mintbd_tfTbbsEndDt").val().replace(/-/g,"");		
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteNotify.do",
			data : "pJson=" + getJsonStrDeleteNotify(tbbsIdArr),
			success : function(data){
				//reload grid
				$("#mintbd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
				$("#mintbd_tblNotifyList").trigger("reloadGrid");
				
				boardContentSlideup();
				
				reloadNoticeBar();
				
				alert("삭제되었습니다.");
			},
			error : function(data, status, err){
				
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//게시물 등록버튼 클릭이벤트
function btnInsertMainNotifyClickEvent(){
	// 2016.11.15 jghwang 에디터 교체로 인한 화면사이즈 조정
	var width = 840;
	var height = 635;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;	
	
	var paramURL = getContextPath() + "/web/board/notifyForm.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	window.sessionStorage.setItem("BOARD_TYPE", "020100.insert");
	
	var newWindow = window.open(paramURL, "공지게시판 등록", option);
	newWindow.focus();
}

//게시물 수정버튼 등록이벤트
function btnCntnModifyClickEvent(){
	// 2016.11.15 jghwang 에디터 교체로 인한 화면사이즈 조정
	var width = 840;
	var height = 635;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;	
	
	var paramURL = getContextPath() + "/web/board/notifyForm.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	window.sessionStorage.setItem("BOARD_TYPE", "020100.modify");
	window.sessionStorage.setItem("TBBS_ID", currTbbsId);
	
	var newWindow = window.open(paramURL, "공지게시판 수정", option);
	newWindow.focus();
}

//덧글 가져오기
function showComments(tbbsId){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/commentList.do",
		data : "pJson=" + getJsonStrCommentList(tbbsId),
		success : function(data){
			//댓글테이블 초기화
			$("#mintbd_tblComments").empty();
			
			//댓글삽입
			for(var i in data){
				var node = "<tr><td><ul>";
				node += "<li>" + data[i].USR_NM + "<img src='/resources/images/line.png' alt='라인' /></li>";
				node += "<li>" + data[i].MOD_DT_FORMAT + "&nbsp;" + data[i].MOD_TM_FORMAT + "</li>";
				
				if(data[i].IS_OWN === 'Y'){
					node += "<li class='c_btn'><div id='commOpt" + data[i].COMM_ID + "'>";
					node += "<img src='/resources/images/btn_add4.png' style='cursor: pointer;' alt='수정' class='icon_cal' id='mod" +
							data[i].COMM_ID + "' onClick='modifyCommentClickEvent(" +data[i].COMM_ID + ");' />";
					node += "<img src='/resources/images/btn_del.png' style='cursor: pointer; margin-left: 5px;' alt='삭제' class='icon_cal' id='del" + 
							data[i].COMM_ID + "' onClick='deleteCommentClickEvent(" +data[i].COMM_ID + ");'/></li>";
				}
				
				node += "</ul>";
				node += "<ul><li class='c_text'><div id='commCntn" + data[i].COMM_ID + "'>" + 
						data[i].COMM_CONT + "</li></div></ul></td></tr>";
				node += "</tr><td><ul><li class='line'></li></ul></td></tr>";
				
				$("#mintbd_tblComments").append(node);
			}
		},
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}
//덧글 저장버튼 클릭이벤트
function btnInsertCommentClickEvent(){
	var commCntn = $("#mintbd_taCommCntn").val();
	
	if(commCntn === null || commCntn.trim().length <= 0){
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/insertComment.do",
		data : "pJson=" + getJsonStrInsertComment(currTbbsId),
		success : function(data){
			//현재 보고있는 게시물ID 가져오기
			showComments(currTbbsId);
			$("#mintbd_taCommCntn").val("");
		},
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}

//댓글 수정 클릭이벤트
function modifyCommentClickEvent(commId){
	//댓글 수정중인지 체크
	if(isModComm)
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrSelectComment(commId),
		success : function(data){
			var node = "<td><ul>";
			node += "<li style='width: 762px; float: left;'><textarea id='taModCommCntn" + data.COMM_ID + "' class='area_ol_comm' style='overflow: hidden;'></textarea></li>";
			node += "<li style='float: left; margin-left: 25px; width: 90px;'>";
			node += "<img src='/resources/images/btn_save2.png' style='cursor: pointer;' onClick='btnModifyCommentClickEvent(" + data.COMM_ID + ")' />"; 
			node += "<img src='/resources/images/btn_cancel.png' style='cursor: pointer; margin-left: 5px' onClick='cancelModifyCommentClickEvent()' /></li>";
			node += "</ul></td>";
			
			$("#mintbd_commCntn" + data.COMM_ID).parent().parent().parent().parent().empty().append(node);
			
			$("#mintbd_taModCommCntn" + data.COMM_ID).val(data.COMM_CONT);
			
			isModComm = true;
		},
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정버튼 클릭이벤트
function btnModifyCommentClickEvent(commId){
	var commCntn = $("#mintbd_taModCommCntn" + commId).val();
	
	if(commCntn === null || commCntn.trim().length <= 0){
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrModifyComment(commId),
		success : function(data){
			showComments(currTbbsId);
			isModComm = false;
		},
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정취소 클릭이벤트
function cancelModifyCommentClickEvent(){
	//현재 보고있는 게시물ID 가져오기
	if(isModComm){
		showComments(currTbbsId);
		isModComm = false;
	}
}

//덧글 삭제 클릭이벤트
function deleteCommentClickEvent(commId){
	if(confirm("댓글을 삭제하시겠습니까?")){
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteComment.do",
			data : "pJson=" + getJsonStrDeleteComment(commId),
			success : function(data){
				showComments(currTbbsId);
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//목록보기버튼 클릭이벤트
function btnShowNotifyClickEvent(){
	boardContentSlideup();
}

//게시물 슬라이드업
function boardContentSlideup(){
	$("#mintbd_board_content").slideUp(function(){
		currRowid = "";
		currTbbsId = "";
		initBoardContent();
		//reload grid
	/*	$("#mintbd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "TBBS_ID", sortorder : "desc"});*/
		//$("#mintbd_tblNotifyList").trigger("reloadGrid");
	});
}

//게시물 슬라이드다운
function boardContentSlidedown(rowid){
	$("#mintbd_board_content").slideDown(function(){
		currRowid = rowid;
		currTbbsId = $("#mintbd_tblNotifyList").getRowData(currRowid).TBBS_ID;
		
		//reload grid
	/*	$("#mintbd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "TBBS_ID", sortorder : "desc"});*/
		//$("#mintbd_tblNotifyList").trigger("reloadGrid");
	});
}
	
//게시물 내용 초기화
function initBoardContent(){
	$("#mintbd_sTbbsTtl").empty();
	$("#mintbd_pCommNum").empty();
	$("#mintbd_sEmrgYN").empty();
	$("#mintbd_sTbbsStrtDt").empty();
	$("#mintbd_sTbbsEndDt").empty();
	$("#mintbd_sUsrNm").empty();
	$("#mintbd_sTbbsInQrCnt").empty();
	$("#mintbd_sCrtDt").empty();
	$("#mintbd_sCrtTm").empty();
	$("#mintbd_dTbbsCntn").empty();
	$("#mintbd_fileInfos").empty();
	$("#mintbd_tblComments").empty();
	$("#mintbd_taCommCntn").val("");
}

//게시물을 화면에 표시
function showBoardContents(tbbsId){
	initBoardContent();
	//editerCall();
	//게시물 조회시 조회수 업데이트
    $.ajax({
    	type : "post",
    	dataType : "json",
    	async : true,
    	url : getContextPath() + "/ajax/board/boardAccess.do",
		data : "pJson=" + getJsonStrBoardAccess(tbbsId),
    	success : function(data){
    		//게시물 가져오기
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/board/selectNotify.do",
				data : "pJson=" + getJsonStrSelectNotify(tbbsId),
				success : function(data){
					$("#mintbd_sTbbsTtl").html(data.TBBS_TTL);
					$("#mintbd_sEmrgYN").html(data.EMRG_YN);
					$("#mintbd_sTbbsStrtDt").html(data.TBBS_STRT_DT_FORMAT);
					$("#mintbd_sTbbsEndDt").html(data.TBBS_END_DT_FORMAT);
					$("#mintbd_sUsrNm").html(data.MOD_USR_NM);
					$("#mintbd_sTbbsInQrCnt").html(data.TBBS_INQR_CNT);
					$("#mintbd_sModDt").html(data.MOD_DT_FORMAT);
					$("#mintbd_sModTm").html(data.MOD_TM_FORMAT);
					
					//DEXT5.setBodyValue(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'tbCntn');
					$("#mintbd_dTbbsCntn").append(data.TBBS_CNTN);
					if(data.COMM_NUM !== 0) 
						$("#mintbd_pCommNum").html("[" + data.COMM_NUM + "]");
					
				},
				error : function(data, status, err){
					networkErrorHandler(data, status, err);
				}
			});
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/board/notifyBoardFileList.do",
				data : "pJson=" + getJsonNotifyBoardFileList(tbbsId),
				success : function(data){
					if(data != null && data != "") {
						var tr ="<tr><th style='width:80%; padding-right:650px; position:relative;'>첨부파일이름</th>" +
									"<th style='width:20%; right:6px; float:left; position:relative;'>용량</th></tr>";
    					for(var i in data) {
    						var url = getContextPath() 
    						+ "/file/board/notiftyBoardFileDown.do?pJson=" 
    						+ getJsonNotifyBoardFileDown(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
    						tr += "<tr>";
    						tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
    						tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
    						tr += "</tr>";
    					}
    					$("#mintbd_fileInfos").append(tr);
					}
				},
				error : function(data, status, err){
				}
    		});
    	},
    	error : function(data, status, err){
    		networkErrorHandler(data, status, err);
    	}
    });
    
	showComments(tbbsId);
	
	if(g_rowId != ""){
		//editerCall();
		//boardContentSlidedown(g_rowId);
	}else
		$("#mintbd_board_content").slideDown();
	
	//$("#mintbd_pop_body").animate({ scrollTop: 0 }, "fast");
	//
}

function checkUserNoticeCnt(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/miNotifyBoardCnt.do",
		data : "pJson=" + getJsonStrNoticeCnt(),
		success : function(data){
			if(data != null){
				 $("#mintbd_upTotal").html(data.TOTAL+" 건");//전체
				 $("#mintbd_rTotal").html(data.NOTREADNOTICE+" 건");//읽은것
				 $("#mintbd_nTotal").html(data.READNOTICE+" 건");//안읽은것

			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}
function editerCall(){
	DEXT5.config.Mode = "view";
	DEXT5.config.ViewModeAutoWidth = "1";
	DEXT5.config.ViewModeAutoHeight = "1";
	//DEXT5.config.EditorBorder = "0";
	DEXT5.config.EditorHolder = "mintbd_dTbbsCntn";
	new Dext5editor("tbCntn");
}
function dext_editor_loaded_event() {
}

$(document).ready(function(){

	if(usrGrdCd != null && usrGrdCd != ""){
		if(usrGrdCd >= "030100")
			isMngr = true;
		else
			isMngr = false;
	}
	datePicker("#mintbd_tfTbbsStrtDt");
	datePicker("#mintbd_tfTbbsEndDt");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#mintbd_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#mintbd_tfTbbsEndDt").val(getDate());	
	
	g_tbbsStrtDt = $("#mintbd_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#mintbd_tfTbbsEndDt").val().replace(/-/g,"");		
	
	$("#mintbd_tblNotifyList").jqGrid({
		url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["번호","부서구분","부서명","긴급여부", "제목", "작성자", "시작일시", "종료일시", "작성일시", "첨부파일", "조회수","읽음여부"],
		colModel : [
			            { name : "TBBS_ID", index : "TBBS_ID", width : 20, align: "center", hidden : true},
			            { name : "TBBS_GB_CD_NM", index : "TBBS_GB_CD_NM", width : 60, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata){
			        	if(rowObject.TBBS_GB_CD_NM =="공무원공지"){
			   		 return 'style="color:red;"' 
			   	            }
			            }},
			            { name : "CNTR_NM", index : "CNTR_NM", width : 60, align: "center" },
			            { name : "EMRG_YN", index : "EMRG_YN", width : 40, align: "center" ,edittype:'text',editrules:{required:true}
			            ,cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
			            	if ( rowObject.EMRG_YN == "긴급" ) { return 'style="text-align:center;color:blue;"' }
			              }
			            },
			            { name : "TBBS_TTL", index : "TBBS_TTL",align: "left" ,width : 120 },
			            { name : "MOD_USR_NM", index : "MOD_USR_NM", width :40, align: "center" },
			            { name : "TBBS_STRT_DT_FORMAT", index : "TBBS_STRT_DT_FORMAT", width : 40, align: "center" },
			            { name : "TBBS_END_DT_FORMAT", index : "TBBS_END_DT_FORMAT", width : 40, align: "center" },
			            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 40, align: "center" },
			            { name : "FL_NUM", index : "FL_NUM", width : 40, align: "center" },
						{ name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 40, align : "center", 
			            	cellattr : isMngr ? function(rowId, tv, rowObject, cm, rdata) { return 'style="text-decoration: underline;cursor:pointer;"' } : ''
						},
			            { name : "USR_RD", index : "USR_RD", width : 40, align: "center",
							cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
								if ( rowObject.USR_RD == "미확인" ) { return 'style="text-align:center;color:red;"' }
								}
						}
						],
        sortname : "TBBS_ID",
        sortorder : "desc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "260",
        width : "80%",
        rowNum : 10,
        rowList : [10, 20, 30, 50,70],
        autowidth : true,
        pager : "#mintbd_pgNotifyList",
        rownumbers : false,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        multiselect: isMngr ? true : false,
        onCellSelect : function(rowid, iCol, cellContent, e){
        	//관리자가 들어와서 클릭할때 
        	var row = $("#mintbd_tblNotifyList").getRowData(rowid);
        	var uTbbs_listNum = window.sessionStorage.setItem("uTbbs_id",row.TBBS_ID);
        	var uTbbs_listSday= window.sessionStorage.setItem("utbbs_strt_dt",$("#mintbd_tfTbbsStrtDt").val());
        	var uTbbs_listEday= window.sessionStorage.setItem("utbbs_end_dt",$("#mintbd_tfTbbsEndDt").val());
        	if (iCol > 1) {
        		$("#mintbd_tblNotifyList").jqGrid("setSelection", rowid, false);
        		
        		if(rowid !== currRowid&&iCol!=9){
        			boardContentSlidedown(rowid);
        			//setTimeout(function(){
        				showBoardContents(row.TBBS_ID);
        			//}, 200);
        		}else{
        			boardContentSlideup();
        		}
        	}
        	if(iCol==9){
        			gf_openModalDialog("/web/myinfo/myNotifyCountList.do", "공지조회", 300, 385, "no");
        	}
        },
        error : function(data, status, err){
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#mintbd_pgNotifyList", {edit : false, add : false, del : false, search : false});
	
	//직급에 따라 등록삭제버튼 표시유무
	if(isMngr){
		$("#mintbd_divInsrtDel").show();
		$("#mintbd_divModDel").show();
	}else{
		$("#mintbd_divInsrtDel").hide();
		$("#mintbd_divModDel").hide();
	}

	//검색 조회버튼 클릭이벤트 등록
	$("#mintbd_btnNotifySearch").bind("click", btnNotifySearchClickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#mintbd_tfSrchval").bind("keydown", function (key){
		if (key.keyCode == 13)
			btnNotifySearchClickEvent();
	});
	
	//초기화버튼 클릭이벤트 등록
	$("#mintbd_btnNotifyInit").bind("click", btnNotifyInitClickEvent);
	//게시물 삭제버튼 클릭이벤트 등록
	$("#mintbd_btnDeleteMainNotify").bind("click", btnDeleteMainNotifyClickEvent);
	//게시물 등록버튼 클릭이벤트 등록
	$("#mintbd_btnInsertMainNotify").bind("click", btnInsertMainNotifyClickEvent);
	//게시물 수정버튼 클릭이벤트 등록
	$("#mintbd_btnCntnModify").bind("click", btnCntnModifyClickEvent);
	//조회중인 게시물 삭제버튼 클릭이벤트 등록
	$("#mintbd_btnCntnDelete").bind("click", btnCntnDeleteClickEvent);
	//목록보기버튼 클릭이벤트 등록
	$("#mintbd_btnShowNotify").bind("click", btnShowNotifyClickEvent);
	//덧글 등록버튼 클릭이벤트 등록
	$("#mintbd_btnInsertComm").bind("click", btnInsertCommentClickEvent);
	
	checkUserNoticeCnt();
	
	/*
	var search_today=$("#mintbd_searchDay");//체크박스 게시일자
	var search_choice=$("#mintbd_search_latenes");//체크박스 기타조건
	
	var search_select=$(".select_bl_my");//셀렉트박스 조건
	var search_textVal=$("#mintbd_tfSrchval");
	
	var sh_fday=$("#mintbd_tfTbbsStrtDt"); 
	var sh_lday=$("#mintbd_tfTbbsEndDt");//날짜
	var radio_indolence=$("input[name='serviceType']:radio");//검색일자
	/*
	//날짜 비활성화
	sh_fday.attr("disabled",true);
	sh_lday.attr("disabled",true);
	radio_indolence.attr("disabled",true);
	
	//검색 비활서오하
	search_select.attr("disabled",true); 
	search_textVal.attr("disabled",true); 
	
	
	search_today.change(function(){//날짜이벤트
    	if(search_today.is(":checked")){
    		sh_fday.attr("disabled",false);
    		sh_lday.attr("disabled",false);
    		radio_indolence.attr("disabled",false); 
    	}else{
    		sh_fday.attr("disabled",true);
    		sh_lday.attr("disabled",true);
    		radio_indolence.attr("disabled",true); 
    	}
    });
	
	search_choice.change(function(){//검색내용
    	if(search_choice.is(":checked")){
    		search_select.attr("disabled",false);
    		search_textVal.attr("disabled",false);
    	}else{
    		search_select.attr("disabled",true);
    		search_textVal.attr("disabled",true);
    	}
    });
    */
	//라디오버튼 이벤트
	$("input[name='serviceType']:radio").change(function(){
	      var serviceType = this.value;
	      if(serviceType == "day"){
	    	prt(serviceType);
          } 
          else if(serviceType == "week") 
          {
        	  prt(serviceType);
          } 
          else if(serviceType == "month")
          {
        	  prt(serviceType);
          }  
	});

});

function prt(v){ 
	 var tDTTM = new Date(); 
	 if(v=="day"){
   	 tDTTM.setDate(cDTTM.getDate());
	 }if(v=="week"){
		 tDTTM.setDate(cDTTM.getDate()-7); 
	 }if(v=="month"){
		 tDTTM.setMonth(cDTTM.getMonth()-1);
	 }	 
	 	$("#mintbd_tfTbbsStrtDt").val(tDTTM.getYMD());
	}