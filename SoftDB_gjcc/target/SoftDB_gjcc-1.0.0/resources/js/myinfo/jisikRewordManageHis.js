var frDate = getDate();
var toDate = getDate();
var hisFileForm = "";
var hisFileBox_idx = 0;
var g_popup="CHILD";


//권한관리
var dbGrade ="user";
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var usrId = window.sessionStorage.getItem("USR_ID");
var doTitle = document.title;

/** DOTO LISTT
 * 권한설정
 * **/


//DEXT5 에디터 환경셋팅
function editerCall(){	
    DEXT5.config.Mode = 'view';
    DEXT5.config.Height  = "216px";
    DEXT5.config.Width  = "650px;";
    DEXT5.config.zStatusBar = "1";
    DEXT5.config.zTopMenu = "1";
    DEXT5.config.zToolBar  = "1";	
    DEXT5.config.SkinName = "gray";
    DEXT5.config.EditorHolder = "jskRwMngH_infosCommCntn";
    new Dext5editor("jskRwMngH_infosCommCntn");	
}

//파라미터 셋팅 
function getJsonStrCommentList(tbbsId) {
    var loParam = {
	    "qt" :	"c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" : "value",
		"frDt" : frDate.replace(/[-, :, \s]/g,""),
		"toDt" : toDate.replace(/[-, :, \s]/g,""),
		"usr_id" : $("#jskRwMngH_selJisikCounselNm").val(),
		// "intv_ex_cd" : $("#jskRwMngH_commentCounselKnd1").val(),
		// "intv_lg_cd" : $("#jskRwMngH_commentCounselKnd2").val(),
		// "intv_md_cd" : $("#jskRwMngH_commentCounselKnd3").val(),
		// "intv_sm_cd" : $("#commentCounselKnd4").val(),
		"intv_lg_cd" : $("#jskRwMngH_commentCounselKnd1").val(),
		"intv_md_cd" : $("#jskRwMngH_commentCounselKnd2").val(),
		"intv_sm_cd" : $("#jskRwMngH_commentCounselKnd3").val(),
		"cdb_gb_cd" : $("#jskRwMngH_optGbKnd_his").val(),              //구분
		"prog_knd_cd" : $("#jskRwMngH_progKndCd1").val(),				 //진행상태
		"usr_grd_cd" : usr_grd_cd,
		"show_all" : false,
		"ccauth" : "N"
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectComment mi select
function getJsonStrSelectComment(commId) {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTUuc2VsZWN0",   
	    "map" : {
		"key" : "value",
		"comm_id" : commId
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 counselListExcel
function getJsonStrCommentListExcel(srchtype, srchval, srchDtType, usrId){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" : "value",
		"frDt" : frDate.replace(/[-, :, \s]/g,""),
		"toDt" : toDate.replace(/[-, :, \s]/g,""),
		"usr_id" : $("#jskRwMngH_selJisikCounselNm").val(),
		// "intv_ex_cd" : $("#jskRwMngH_commentCounselKnd1").val(), // 기관코드 추가
		// "intv_lg_cd" : $("#jskRwMngH_commentCounselKnd2").val(),
		// "intv_md_cd" : $("#jskRwMngH_commentCounselKnd3").val(),
		// "intv_sm_cd" : $("#commentCounselKnd4").val(),
		"intv_lg_cd" : $("#jskRwMngH_commentCounselKnd1").val(),
		"intv_md_cd" : $("#jskRwMngH_commentCounselKnd2").val(),
		"intv_sm_cd" : $("#jskRwMngH_commentCounselKnd3").val(),
		"cdb_gb_cd" : $("#jskRwMngH_optGbKnd_his").val(),
		"prog_knd_cd" : $("#jskRwMngH_progKndCd1").val(),
		"usr_grd_cd" : usr_grd_cd,	
		"title" : "상담DB요청처리현황" + setDownLoadName(frDate, toDate),
		"colWidth" : [15, 15, 20, 50, 10, 15, 15, 10, 15, 15],
		// "colName" : ["INTV_EX_NM","INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "COMM_TTL", "COMM_NEW", "CRT_DT_FORMAT","CRT_USR_NM","PROG_KND_NM", "MOD_DT_FORMAT", "MOD_USR_NM"],
		// "colHeader" : ["기관분류","상담유형(대)", "상담유형(중)", "상담유형(소)", "제목", "신규여부", "요청일", "요청자","상태", "처리일", "처리자"],
		// "colAlign" : ["left", "left", "left", "left", "left", "center", "center", "center", "center", "center", "center"]
		"colName" : ["INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "COMM_TTL", "COMM_NEW", "CRT_DT_FORMAT","CRT_USR_NM","PROG_KND_NM", "MOD_DT_FORMAT", "MOD_USR_NM"],
		"colHeader" : ["상담유형(대)", "상담유형(중)", "상담유형(소)", "제목", "신규여부", "요청일", "요청자","상태", "처리일", "처리자"],
		"colAlign" : ["left", "left", "left", "left", "center", "center", "center", "center", "center", "center"],
		"ccauth" : "N"
		}
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet
function getJsonStrModifyComment(commId) {
    var commCntn =  DEXT5.getBodyTextValue("jskRwMngH_infosCommCntn");
    if(commCntn == "") {
	alert("요청내용이 없습니다.");
	return;
    }

    console.log($("#jskRwMngH_infosCommNew").val());
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTUudXBkYXRl",
	    "map" : {
		"key" : "value",
		"comm_id" : commId,
		// "intv_ex_cd" : $("#jskRwMngH_infosCounselKnd1").val(),
		// "intv_lg_cd" : $("#jskRwMngH_infosCounselKnd2").val(),
		// "intv_md_cd" : $("#jskRwMngH_infosCounselKnd3").val(),
		// "intv_sm_cd" : $("#infosCounselKnd4").val(),
		"intv_lg_cd" : $("#jskRwMngH_infosCounselKnd1").val(),
		"intv_md_cd" : $("#jskRwMngH_infosCounselKnd2").val(),
		"intv_sm_cd" : $("#jskRwMngH_infosCounselKnd3").val(),
		"cdb_gb_cd" : $("#jskRwMngH_infosGbKnd").val(),		
		"comm_ttl" : $("#jskRwMngH_infosCommTtl").val(),
		"comm_cntn" : commCntn,
		"new_yn" : $("#jskRwMngH_infosCommNew").val(),
		"tbl_nm" : "mi001",
		"tbl_pk": commId,
		"message" : "요청 되었습니다."
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet
function getJsonStrSaveComment(commId) {
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTUuc2F2ZQ==",
	    "map" : {
		"key" : "value",
		"comm_id" : commId,
		"resp_cntn" : $("#jskRwMngH_infosRespCntn").val(),
		"prog_knd_cd" : $("#jskRwMngH_progKndCd").val()
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 전체리스트
function getJsonStrJisikUserList(){
    // 권한에 따라 셋팅
    var cntrCd = "";
    var teamCd = "";

    //시스템 관리자 or 센터
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
		"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
		"sord" : "asc",	
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일
function getJsonHisFileList(tbbsId){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "om015",
		"tbl_pk": tbbsId,
		"orderby": "crtTime",
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteHisFile(fileId)
{
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

//요청자
function setSelectBoxWithMsgUser(){	
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/user/userList.do",
	data : "pJson=" + getJsonStrJisikUserList(),
	success : function(data){
	    $("#jskRwMngH_selJisikCounselNm").html("");

	    var value = "";
	    value += "<option value='all'>전체</option>";
	    $.each(data, function(key, state)
		    {
		value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
		    });

	    $("#jskRwMngH_selJisikCounselNm").append(value);
	    $("#jskRwMngH_selJisikCounselNm").trigger("change");

	    if(usrGrdCd == "010100"){
		$("#jskRwMngH_selJisikCounselNm").val(usrId).prop("disabled", true);
	    }
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
    });
}


//셀렉트박스 데이터셋팅
function initHisSelectData(){
    setSelectBoxWithMsgUser();
    datePicker("#jskRwMngH_selFrDate");
    datePicker("#jskRwMngH_selToDate");
    $("#jskRwMngH_selFrDate").val(frDate);
    $("#jskRwMngH_selToDate").val(toDate);
    // $("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3, #infosCounselKnd4, #jskRwMngH_infosCommTtl ,#jskRwMngH_infosCommCntn, #jskRwMngH_infosGbKnd").attr("disabled",true);
    $("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3, #infosCounselKnd4, #jskRwMngH_infosCommTtl ,#jskRwMngH_infosCommCntn, #jskRwMngH_infosGbKnd").attr("disabled",true);

    // $("#jskRwMngH_commentCounselKnd1, #jskRwMngH_commentCounselKnd2, #jskRwMngH_commentCounselKnd3, #commentCounselKnd4").empty();
    // $("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3, #infosCounselKnd4").empty();
    $("#jskRwMngH_commentCounselKnd1, #jskRwMngH_commentCounselKnd2, #jskRwMngH_commentCounselKnd3").empty();
    $("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3").empty();

    /*2018.10.12 상담유형 세팅 변경 부분 */
    setObjectSelectBoxWithCode2("jskRwMngH_commentCounselKnd1", "전체", "1", g_popup, "00000000", "", "CHANGE");
    setObjectSelectBoxWithCode2("jskRwMngH_commentCounselKnd2", "전체", "2", g_popup, $("#jskRwMngH_commentCounselKnd1").val(),"","CHANGE");
    setObjectSelectBoxWithCode2("jskRwMngH_commentCounselKnd3", "전체", "3", g_popup, $("#jskRwMngH_infosCounselKnd2").val(),"","CHANGE");
    
    setObjectSelectBoxWithCode2("jskRwMngH_infosCounselKnd1", "전체", "1", g_popup, "00000000", "", "CHANGE");
    setObjectSelectBoxWithCode2("jskRwMngH_infosCounselKnd2", "전체", "2", g_popup, $("#jskRwMngH_infosCounselKnd1").val(),"","CHANGE");
    setObjectSelectBoxWithCode2("jskRwMngH_infosCounselKnd3", "전체", "3", g_popup, $("#jskRwMngH_infosCounselKnd2").val(),"","CHANGE");
	/*2018.10.12 상담유형 세팅 변경 부분 끝*/
    setSelectBoxWithCode("jskRwMngH_progKndCd", "", "90301", g_popup, "", "");
    setSelectBoxWithCode("jskRwMngH_progKndCd1", "전체", "90301", g_popup, "", "");
    //setSelectBoxWithCode("jskRwMngH_progKndCd", "", "90260", g_popup, "", "");	    // 고객구분 셋팅
    //setSelectBoxWithCode("jskRwMngH_progKndCd1", "전체", "90260", g_popup, "", "");	    // 고객구분 셋팅
    setSelectBoxWithCode("jskRwMngH_optGbKnd_his", "전체", "90303", g_popup, "90039", "");	    // 상담DB구분
    setSelectBoxWithCode("jskRwMngH_infosGbKnd", "", "90303", g_popup, "90039", "");	    // 상담DB구분
}

//내용 초기화
function initComment(){
    $("#jskRwMngH_btnUpdate").hide();
    $("#jskRwMngH_infosCrtUsrNm, #jskRwMngH_infosCrtDt, #jskRwMngH_infosModUsrNm , #jskRwMngH_infosModDt").html("");
    $("#jskRwMngH_infosCommId, #jskRwMngH_infosCommTtl, #jskRwMngH_infosRespCntn, #jskRwMngH_infosCommNew").val("");
    DEXT5.setBodyValue('', 'jskRwMngH_infosCommCntn');
    hisFileBox_idx = 0;
    $("#jskRwMngH_hisFileInfos").empty().append(hisFileForm);
}

function commentCounselKnd1_ChangeEvent(){
    // $("#jskRwMngH_commentCounselKnd2, #jskRwMngH_commentCounselKnd3, #commentCounselKnd4").empty();
    $("#jskRwMngH_commentCounselKnd2, #jskRwMngH_commentCounselKnd3").empty();
    setObjectSelectBoxWithCode2("jskRwMngH_commentCounselKnd2", "전체", "2", g_popup, $("#jskRwMngH_commentCounselKnd1").val(), "", "CHANGE");
}
function commentCounselKnd2_ChangeEvent(){
    // $("#jskRwMngH_commentCounselKnd3, #commentCounselKnd4").empty();
    $("#jskRwMngH_commentCounselKnd3").empty();
    setObjectSelectBoxWithCode2("jskRwMngH_commentCounselKnd3", "전체", "3", g_popup, $("#jskRwMngH_commentCounselKnd2").val(), "", "CHANGE");
}
// function commentCounselKnd3_ChangeEvent(){
//     $("#commentCounselKnd4").empty();
//     setObjectSelectBoxWithCode2("commentCounselKnd4", "전체", "4", g_popup, $("#jskRwMngH_commentCounselKnd3").val(), "", "CHANGE");
// }


function infosCounselKnd1_ChangeEvent(){
    // $("#jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3, #infosCounselKnd4").empty();
    $("#jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3").empty();
    setObjectSelectBoxWithCode2("jskRwMngH_infosCounselKnd2", "전체", "2", g_popup, $("#jskRwMngH_infosCounselKnd1").val(), "", "CHANGE");
}
function infosCounselKnd2_ChangeEvent(){
    // $("#jskRwMngH_infosCounselKnd3, #infosCounselKnd4").empty();
    $("#jskRwMngH_infosCounselKnd3").empty();
    setObjectSelectBoxWithCode2("jskRwMngH_infosCounselKnd3", "전체", "3", g_popup, $("#jskRwMngH_infosCounselKnd2").val(), "", "CHANGE");
}
// function infosCounselKnd3_ChangeEvent(){
//     $("#infosCounselKnd4").empty();
//     setObjectSelectBoxWithCode2("infosCounselKnd4", "전체", "4", g_popup, $("#jskRwMngH_infosCounselKnd3").val(), "", "CHANGE");
// }

//셀렉트 박스 싱크 
// function setSelectBoxWithCnslCodeSyncHis(code1, code2, code3, code4){
//     $("#jskRwMngH_infosCounselKnd1").val(code1).trigger("change");
//     $("#jskRwMngH_infosCounselKnd2").val(code2).trigger("change");
//     $("#jskRwMngH_infosCounselKnd3").val(code3).trigger("change");
//     $("#infosCounselKnd4").val(code4);
// }
function setSelectBoxWithCnslCodeSyncHis(code1, code2, code3){
    $("#jskRwMngH_infosCounselKnd1").val(code1).trigger("change");
    $("#jskRwMngH_infosCounselKnd2").val(code2).trigger("change");
    $("#jskRwMngH_infosCounselKnd3").val(code3);
}

//수정요청 상세 보기
function showCommentDetail(commId) {
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/selectComment.do",
	data : "pJson=" + getJsonStrSelectComment(commId),
	success : function(data) {
	    initComment();

	    // var intvExCd = data.INTV_EX_CD;
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;

        // setSelectBoxWithCnslCodeSyncHis(intvExCd,intvLgCd, intvMdCd, intvSmCd);
	    setSelectBoxWithCnslCodeSyncHis(intvLgCd, intvMdCd, intvSmCd);

	    $("#jskRwMngH_infosCommId").val(data.COMM_ID);
	    $("#jskRwMngH_progKndCd").val(data.PROG_KND_CD);
	    $("#jskRwMngH_infosGbKnd").val(data.CDB_GB_CD);
	    $("#jskRwMngH_infosCommTtl").val(data.COMM_TTL);

	    $("#jskRwMngH_infosRespCntn").val(data.RESP_CNTN);
	    $("#jskRwMngH_infosCrtUsrNm").html(data.CRT_USR_NM);
	    $("#jskRwMngH_infosCrtDt").html(data.CRT_DT_FORMAT);

	    $("#jskRwMngH_infosCommNew").val(data.NEW_YN);
	    $("#jskRwMngH_infosModUsrNm").html(data.MOD_USR_NM);
	    $("#jskRwMngH_infosModDt").html(data.MOD_DT_FORMAT);

	    //접수일때만 변경
	    if(data.PROG_KND_CD == "90261"){
		$("#jskRwMngH_btnUpdate").show();
		if(dbGrade == "user"){
		    DEXT5.setEditorMode('edit', 'jskRwMngH_infosCommCntn');
		}
		// $("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3, #infosCounselKnd4,#jskRwMngH_infosCommNew, #jskRwMngH_infosCommTtl ,#jskRwMngH_infosCommCntn, #jskRwMngH_infosGbKnd").attr("disabled",false);
		$("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3,#jskRwMngH_infosCommNew, #jskRwMngH_infosCommTtl ,#jskRwMngH_infosCommCntn, #jskRwMngH_infosGbKnd").attr("disabled",false);
	    }else{
		$("#jskRwMngH_btnUpdate").hide();
		DEXT5.setEditorMode('view', 'jskRwMngH_infosCommCntn');
		// $("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3, #infosCounselKnd4,#jskRwMngH_infosCommNew, #jskRwMngH_infosCommTtl ,#jskRwMngH_infosCommCntn, #jskRwMngH_infosGbKnd").attr("disabled",true);
		$("#jskRwMngH_infosCounselKnd1, #jskRwMngH_infosCounselKnd2, #jskRwMngH_infosCounselKnd3,#jskRwMngH_infosCommNew, #jskRwMngH_infosCommTtl ,#jskRwMngH_infosCommCntn, #jskRwMngH_infosGbKnd").attr("disabled",true);

	    }
	    DEXT5.setHtmlValue(data.COMM_CNTN==null?"":data.COMM_CNTN, 'jskRwMngH_infosCommCntn');
	    //console.log(data.COMM_CNTN+"jsh")
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
    });
}

//수정 이벤트
function btnModifyCommentClickEvent() {
    var commId = $("#jskRwMngH_infosCommId").val();
    if(document.jskRwMngH_writeHisForm.HISMANUAL.value != ""){
	var nLimitSize = 0.30; //제한사이즈 MB
	var formName = $("#jskRwMngH_writeHisForm input[name=HISMANUAL]");

	for(var i=0; i<formName.length; i++){
	    if(formName[i].value !=""){
		var nRtn=fileCheck(formName[i] , nLimitSize);
		if(nRtn>nLimitSize){ 
		    alert( "[" + (i+1) + "번 파일] : ("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
		    return;
		}
		//파일 확장자 체크
		if (fileExtnsCheck(formName[i]) == false) {
		    alert("[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!");
		    return;
		}
	    }
	}
    }	
    gAppendHidden("jskRwMngH_writeHisForm", "pJson", getJsonStrModifyComment(commId));
    gSubmitPost("jskRwMngH_writeHisForm", true);
    setTimeout(function(){
	$("#jskRwMngH_tblComments").trigger("reloadGrid");
    }, 1000)
}

//검색버튼 클릭이벤트
function btnSearchCommentClickEvent(){
    frDate = $("#jskRwMngH_selFrDate").val();
    toDate = $("#jskRwMngH_selToDate").val();

    $("#jskRwMngH_tblComments").jqGrid("setGridParam", {postData : {pJson : getJsonStrCommentList("")}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#jskRwMngH_tblComments").trigger("reloadGrid");
}

//초기화 버튼 클릭이벤트
function btnInitCommentClickEvent(){
    frDate = getDate();
    toDate = getDate();

    initComment();
    initHisSelectData();
    $("#jskRwMngH_tblComments").jqGrid("setGridParam", {postData : {pJson : getJsonStrCommentList("")}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#jskRwMngH_tblComments").trigger("reloadGrid")
}

//엑셀저장 버튼 클릭 이벤트
function btnExcelPopup_clickEvent(){
    excelDownLoad(getContextPath() + "/excel/myinfo/jisikRewordHis.do", getJsonStrCommentListExcel("", "", "", ""));
}

//요청이력  클릭 이벤트
function btnClickEvent(){
    //수정요청이력 상담유형 선택 이벤트
    $("#jskRwMngH_commentCounselKnd1").bind("change", commentCounselKnd1_ChangeEvent);
    $("#jskRwMngH_commentCounselKnd2").bind("change", commentCounselKnd2_ChangeEvent);
    // $("#jskRwMngH_commentCounselKnd3").bind("change", commentCounselKnd3_ChangeEvent);

    //수정요청상세 상담유형 선택 이벤트
    $("#jskRwMngH_infosCounselKnd1").bind("change", infosCounselKnd1_ChangeEvent);
    $("#jskRwMngH_infosCounselKnd2").bind("change", infosCounselKnd2_ChangeEvent);
    // $("#jskRwMngH_infosCounselKnd3").bind("change", infosCounselKnd3_ChangeEvent);

    //수정요청 이력 조회
    $("#jskRwMngH_btnCommentSearch").bind("click", btnSearchCommentClickEvent);

    //요청이력 초기화 버튼
    $("#jskRwMngH_btnCommentInit").bind("click", btnInitCommentClickEvent);

    //요청이력 엑셀
    $("#jskRwMngH_btnExcel").bind("click", btnExcelPopup_clickEvent);

    //수정요청 이력 수정 버튼
    $("#jskRwMngH_btnUpdate").bind("click", btnModifyCommentClickEvent);

    //에디터 초기화
    $('#jskRwMngH_btnCommentInit').bind('click', function() {DEXT5.setEditorMode('view', 'jskRwMngH_infosCommCntn');});


}

//첨부파일 박스추가- .JSP 
function addHisFileBox(){
    if (hisFileBox_idx >= 2){
	alert("첨부파일은 최대 3개까지 가능합니다.");
    }else{
	var html = $("#jskRwMngH_hisfileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++hisFileBox_idx);
	$("#jskRwMngH_hisFileInfos").append(html);
    }
}

//첨부파일박스삭제- .JSP
function removeHisFileBox(i)
{
    var el = $("#jskRwMngH_writeHisForm input[name=record_" + i + "]");
    el.parent().parent().remove();
    hisFileBox_idx--;
}

//첨부된 파일 삭제
function deleteHisFile(fileId)
{
    if(confirm("첨부된 파일을 삭제하시겠습니까?"))
    {
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : getContextPath() + "/ajax/management/deleteFile.do",
	    data : "pJson=" + getJsonDeleteHisFile(fileId),
	    success : function(data)
	    {
		//파일폼 삭제
		var el = $("#jskRwMngH_writeHisForm input[name=record_" + fileId + "]");
		el.parent().parent().remove();

		if(--hisFileBox_idx < 3)
		{
		    $("#HISMANUAL").prop("disabled", false);
		    $("#jskRwMngH_rmHisFilebox").prop("disabled", false);
		}
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
    }
}

//첨부파일 보기
function showAttachHisFiles(tbbsId)
{
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/fileList.do",
	data : "pJson=" + getJsonHisFileList(tbbsId),
	success : function(data)
	{
	    for(var i in data)
	    {
		var url = getContextPath() 
		+ "/file/jisikManageFileDown.do?pJson=" 
		+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

		var tr = "<tr>";
		tr += "<td colspan='3'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
		tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
		tr += "<td><a href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;display:none;'><strong class='or_txt'>[X]</strong></a></td>";
		tr += "</tr>";

		hisFileBox_idx++;
		$("#jskRwMngH_hisFileInfos").prepend(tr);
	    }

	    if(hisFileBox_idx >= 3)
	    {
		$("#HISMANUAL").prop("disabled", true);
		$("#jskRwMngH_rmHisFilebox").prop("disabled", true);
	    }
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}
//첨부파일 다운로드
function getJsonFileDownload(svr, loc)
{
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//INIT PAGE
$(document).ready(function(){
    editerCall();
    //셀렉트박스 데이터셋팅
    initHisSelectData();

    /*	if(usr_grd_cd != null){
		//$("#jskRwMngH_btnExcel").hide();
	}*/

    hisFileForm = $("#jskRwMngH_hisFileInfos tr").parent().html();

    $("#jskRwMngH_tblComments").jqGrid({
	url : getContextPath() + "/jqgrid/myinfo/comments.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrCommentList("")
	},
	colNames : ["번호","TBBS_ID", "상담유형", "제목", "요청구분", "요청자", "상  태", "요청일", "처리일", "대분류", "중분류", "소분류"],
	colModel :
	    [
	     { name : "COMM_ID", index : "COMM_ID", hidden : true },
	     { name : "TBBS_ID", index : "TBBS_ID", hidden : true },	     
	     { name : "INTV_NM", index : "INTV_NM", align : "left", width : 140 },
	     { name : "COMM_TTL", index : "COMM_TTL", align : "left", width : 120 },
	     { name : "COMM_NEW", index : "COMM_NEW", align : "center", width : 30 },
	     { name : "USR_NM", index : "USR_NM", align : "center", width : 30 },
	     { name : "PROG_KND_NM", index : "PROG_KND_NM", align : "center", width : 30 },
	     { name : "CRT_DTTM", index : "CRT_DTTM", align : "center", width : 60 },
	     { name : "MOD_DTTM", index : "MOD_DTTM", align : "center", width : 60 },
	     { name : "INTV_LG_CD", index : "INTV_LG_CD", hidden : true},
	     { name : "INTV_MD_CD", index : "INTV_MD_CD", hidden : true},
	     { name : "INTV_SM_CD", index : "INTV_SM_CD", hidden : true}
	     ],
	     sortname : "CRT_DTTM",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "130",
	     width : "600",
	     rowNum : 5,
	     rowList : [5, 20, 50],
	     autowidth : true,
	     pager : "#jskRwMngH_pgTblComments",
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords: true,
	     onSelectRow : function(rowid){
			 var row = $("#jskRwMngH_tblComments").getRowData(rowid);
			 setJskRwMngCtgCd(row);
			 showCommentDetail(row.COMM_ID);
			 showAttachHisFiles(row.COMM_ID);
			 showDetailManual(row.TBBS_ID, "")
			 showAttachFiles(row.TBBS_ID);
	     },
	     onPaging : function(pgButton) { }
    }).jqGrid("navGrid", "#jskRwMngH_pgTblComments", {edit : false, add : false, del : false, search : false});

    btnClickEvent();

    // 로딩시 숨김버튼
    $("#jskRwMngH_btnUpdate, #jskRwMngH_btnSave").hide();


});