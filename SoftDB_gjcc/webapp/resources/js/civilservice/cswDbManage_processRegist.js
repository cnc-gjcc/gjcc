var inputFile = [];
var fileBox_idx = 0;
var fileForm = "";
var g_rspnUsrId = "";

var sendingOuCode =checkInnerPopup?window.sessionStorage.getItem("CNTR_CD"):opener.sendingOuCode;
var sendingUid = checkInnerPopup?window.sessionStorage.getItem("USR_ID"):opener.sendingUid;

//요청DB setting

var clickReqId=checkInnerPopup?reqid:opener.clickReqId;
var clickTbbsId=checkInnerPopup?tbbsid:opener.clickTbbsId;
var cdb_req_gb_cd=checkInnerPopup?reqcd:opener.cdb_req_gb_cd;
var g_confer_dept=checkInnerPopup?reqcd:opener.gConferDept;

var inte=opener.inte;
var intl=opener.intl;
var intm=opener.intm;
var ints=opener.ints;
var inigd=opener.inigd;
var inittl=opener.inittl;
var checkFileBox=false;


function getJsonStrManualList() {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
	    "map" : {
		"key" : "value",
		// "ctg_ex_cd" : $("#csprrg_optCounselKnd1_srch").val(),
		// "ctg_lg_cd" : $("#csprrg_optCounselKnd2_srch").val(),
		// "ctg_md_cd" : $("#csprrg_optCounselKnd3_srch").val(),
		// "cdb_sm_cd" : $("#csprrg_optCounselKnd4_srch").val(),
		"ctg_lg_cd" : $("#csprrg_optCounselKnd1_srch").val(),
		"ctg_md_cd" : $("#csprrg_optCounselKnd2_srch").val(),
		"cdb_sm_cd" : $("#csprrg_optCounselKnd3_srch").val(),
		"srch_type" : $("#csprrg_tfSrchType").val(),
		"cdb_gb_cd" : $("#csprrg_optGbKnd_srch").val(),
		"srch_val" : $("#csprrg_tfSrchVal").val(),
		"frm_mod_dt" : $("#csprrg_selFrDate").val().replace(/[-, :, \s]/g,""),
		"to_mod_dt" : $("#csprrg_selToDate").val().replace(/[-, :, \s]/g,""),
		"chkNotUsetype": $("#csprrg_chkNotUsetype").val()!=null?$("#csprrg_chkNotUsetype").val():"all",
		"show_all" : false
	    }
    };
    //미사용 포함여부
    if($("#csprrg_useyn").prop('checked')){
	loParam['map']['show_all']=true;
    }else{
	loParam['map']['show_all']=false;
    }
    return encodeURIComponent(JSON.stringify(loParam));
}


function getJsonStrShowDetailManual(tbbsId) {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
	    "map" : {
		"tbbs_id" : tbbsId
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//요청DB 신규등록
function getJsonStrInsertManual(tbbsId) {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuaW5zZXJ0SmlzaWs=",
	    "map" : {
		"tbl_pk" : tbbsId,
		"tbl_nm" : "om010",
		"tbbs_cntn" : DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csprrg_optGbKnd").val(),
		"tbbs_ttl" : $("#csprrg_tfTbbsTtl").val(),
		// "intv_ex_cd" : $("#csprrg_optCounselKnd1").val(),
		// "intv_lg_cd" : $("#csprrg_optCounselKnd2").val(),
		// "intv_md_cd" : $("#csprrg_optCounselKnd3").val(),
		// "intv_sm_cd" : $("#csprrg_optCounselKnd4").val(),
		"intv_lg_cd" : $("#csprrg_optCounselKnd1").val(),
		"intv_md_cd" : $("#csprrg_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csprrg_optCounselKnd3").val(),
		"cntr_nm" : "공주컨텍센터",
		"rspn_prsn" : window.sessionStorage.getItem("USR_NM"),
		"rspn_tel_no" : "",		
		"use_yn" : $("#csprrg_optUseYN").val(),
		"ntuse_desc" : $("#csprrg_tfNtuseDesc").val(),
    		"sendingUid" : sendingUid,
    		"wrk_cl" : "상담DB신규등록",
    		"cc_appr_yn" :$("#csprrg_chkNotUseYN").val()!=null?$("#csprrg_chkNotUseYN").val():"N"
	    }
    };
    //상담AP에서 등록했을경우 사용여부
  /*  if(checkInnerPopup){
	loParam['map']['cc_appr_yn']="Y";
    }*/
    return encodeURIComponent(JSON.stringify(loParam));
}

//요청DB 수정등록
function getJsonStrUpdateManual() {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAudXBkYXRlSmlzaWs=",
	    "map" : {
		"tbl_pk" : $("#csprrg_tfTbbsId").val(),
		"tbl_nm" : "om010",
		"tbbs_cntn" : DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csprrg_optGbKnd").val(),
		"tbbs_ttl" : $("#csprrg_tfTbbsTtl").val(),
		// "intv_ex_cd" : $("#csprrg_optCounselKnd1").val(),
		// "intv_lg_cd" : $("#csprrg_optCounselKnd2").val(),
		// "intv_md_cd" : $("#csprrg_optCounselKnd3").val(),
		// "intv_sm_cd" : $("#csprrg_optCounselKnd4").val(),
		"intv_lg_cd" : $("#csprrg_optCounselKnd1").val(),
		"intv_md_cd" : $("#csprrg_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csprrg_optCounselKnd3").val(),
		"use_yn" : $("#csprrg_optUseYN").val(),
		"ntuse_desc" : $("#csprrg_tfNtuseDesc").val(),
    	"wrk_cl" : "상담DB수정등록",
    	"cc_appr_yn" :$("#csprrg_chkNotUseYN").val()!=null?$("#csprrg_chkNotUseYN").val():"N",
    	"sendingUid" : sendingUid
	    }
    };
   //상담AP에서 등록했을경우 사용여부
   /* if(checkInnerPopup){    
	loParam['map']['cc_appr_yn']="Y";
    }*/
    if(cdb_req_gb_cd=="010100"){
	loParam['map']['cdb_req_gb_cd']="new";
	}
    return encodeURIComponent(JSON.stringify(loParam));
}

//next value
function getNextValue() {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAubmV4dHZhbA==",
	    "map" : {}
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//검색버튼 클릭이벤트
function btnSearchClickEvent() {
    $("#csprrg_tblManualList").jqGrid("setGridParam", {postData : { pJson : getJsonStrManualList()},page : 1,sortname : "mod_dttm desc, crt_dttm",sortorder : "desc"});
    $("#csprrg_tblManualList").trigger("reloadGrid");
}

//초기화버튼 클릭이벤트
function btnInitClickEvent() {
    initSelectData();
    initContent();
    initDate();
    undisabled();
    checkFileBox=true;
    
    //요청없이 바로 등록 수정할경우(callcenter 신규,수정권한을 주기위해)
    if(news){						
	$("#csprrg_btnInsert").show();
	$("#csprrg_btnUpdate").hide();			
    }else{
	// 요청DB 수정등록
	if(clickReqId && clickTbbsId){  	
	    $("#csprrg_btnUpdate").show();
	    $("#csprrg_btnInsert").hide();
	    showDetailManual(clickTbbsId);
	    showAttachFiless(clickTbbsId);
	}else{ 
	 // 요청DB 신규등록
	    $("#csprrg_btnUpdate").hide();
	    $("#csprrg_btnInsert").hide();
	}	    
    }
    $("#csprrg_tblManualList").jqGrid("setGridParam", {postData : {pJson : getJsonStrManualList()},page : 1,sortname : "mod_dttm desc, crt_dttm",sortorder : "desc"});
    $("#csprrg_tblManualList").trigger("reloadGrid");
}

//저장이 완료되면.
function initSaveAfterEvent(tbbs_id) {
    initContent();
    disabled();
    $("#csprrg_btnUpdate").hide();
    $("#csprrg_btnInsert").hide();
    $("#csprrg_tblManualList").jqGrid("setGridParam", {postData : {pJson : getJsonStrManualList()},page : 1,sortname : "mod_dttm desc, crt_dttm",sortorder : "desc"});
    $("#csprrg_tblManualList").trigger("reloadGrid");
}

//매뉴얼 상세보기
function showDetailManual(tbbsId) {
  $.ajax({
	type : "post",
	dataType : "json",
	async : false,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrShowDetailManual(tbbsId),
	success : function(data) {
		if(data!=null){
        // setSelectBoxWithCodeSync2(data.INTV_EX_CD, data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
	    setSelectBoxWithCodeSync2(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
	    $("#csprrg_optGbKnd").val(data.CDB_GB_CD);
	    //if($("#csprrg_regist").val()!="y"){
	    $("#csprrg_chkNotUseYN").val(data.CC_APPR_YN);
	    //$("#csprrg_chkNotUseYN").val(data.ARR_YN);
	    $("#csprrg_tfTbbsId").val(data.TBBS_ID);
	    $("#csprrg_optGbKnd").val(data.CDB_GB_CD);
	    $("#csprrg_tfTbbsTtl").val(data.TBBS_TTL);
	    $("#csprrg_tfCntrNm").val(data.CNTR_NM);
	    $("#csprrg_tfRespId").val(data.RSPN_PRSN);
	    $("#csprrg_tfRespNm").val(data.RSPN_PRSN);
	    $("#csprrg_tfResponTel").val(data.RESPON_TEL);
	    $("#csprrg_optUseYN").val(data.USE_YN);
	    if ($("#csprrg_optUseYN").val() == "N") {$("#csprrg_tfNtuseDesc").prop("disabled", false);}
	    $("#csprrg_tfNtuseDesc").val(data.NTUSE_DESC);
	    g_rspnUsrId = data.RESPON_PRSN;
	   
//	    DEXT5.setHtmlValue(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
	    DEXT5.setHtmlContentsEw(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
	    var crt =  data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT +" / "+ (data.CRT_USR_NM == null ? "" : data.CRT_USR_DEPT+" "+ data.CRT_USR_NM);
	    var mod =  data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT +" / "+ (data.MOD_USR_NM == null ? "" : data.MOD_USR_DEPT+" "+ data.MOD_USR_NM);
	    $("#csprrg_lbCrtInfo").html(crt);
	    $("#csprrg_lbModInfo").html(mod);
	    //}
		}
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
  });
}
//파라미터 셋팅 counselListExcel
function getJsonStrJisikListExcel() {
  var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTAuc2VsZWN0RXhjZWw=",
	    "map" : {
		"key" : "value",
		"srchtype" : $("#csprrg_optGbKnd_srch").val(),
		"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
		// "ctg_ex_cd" : $("#csprrg_optCounselKnd1_srch").val(),
		// "ctg_lg_cd" : $("#csprrg_optCounselKnd2_srch").val(),
		// "ctg_md_cd" : $("#csprrg_optCounselKnd3_srch").val(),
		// "ctg_sm_cd" : $("#csprrg_optCounselKnd4_srch").val(),
		"ctg_lg_cd" : $("#csprrg_optCounselKnd1_srch").val(),
		"ctg_md_cd" : $("#csprrg_optCounselKnd2_srch").val(),
		"ctg_sm_cd" : $("#csprrg_optCounselKnd3_srch").val(),
		"cdb_gb_cd" : $("#csprrg_optGbKnd_srch").val(),
		"srch_type" : $("#csprrg_tfSrchType").val(),
		"srch_val" : $("#csprrg_tfSrchVal").val(),
		"frm_mod_dt" : $("#csprrg_selFrDate").val().replace(/[-, :, \s]/g, ""),
		"to_mod_dt" : $("#csprrg_selToDate").val().replace(/[-, :, \s]/g, ""),
		"title" : $("#csprrg_optGbKnd_srch option:checked").text() + setDownLoadName($("#csprrg_selFrDate").val(), $("#csprrg_selToDate").val()),
		"colWidth" : [ 20, 20, 20, 50, 10, 20, 20, 20, 20, 20 ],
		"colName" : [ "CTG_LG_NM", "CTG_MD_NM", "CTG_SM_NM", "TBBS_TTL", "TBBS_INQR_CNT", "CRT_DT", "CRT_USR_ID", "MOD_DT", "MOD_USR_ID" ],
		"colHeader" : [ "상담대분류", "상담중분류", "상담소분류", "제목", "조회수", "등록일", "등록인", "수정일", "수정인" ],
		"colAlign" : [ "center", "center", "center", "left", "center", "center", "center", "center", "center" ]
	    }
  };
  return encodeURIComponent(JSON.stringify(loParam));
}

//exceldownload
function btnExcelPopup_clickEvent() {
    excelDownLoad("/excel/management/jisikManagement.do", getJsonStrJisikListExcel());
}

function optCounselKnd1_srchChangeEvent() {
	setObjectSelectBoxWithCode("csprrg_optCounselKnd2_srch", "전체", "2", "CHILD", $("#csprrg_optCounselKnd1_srch").val(),"", "CHANGE");
}
// function optCounselKnd2_srchChangeEvent() {
// 	setObjectSelectBoxWithCode("optCounselKnd3_srch", "전체", "3", "CHILD", $("#csprrg_optCounselKnd2_srch").val(),"", "CHANGE");
// }
function optCounselKnd2_srchChangeEvent() {
    setObjectSelectBoxWithCode("csprrg_optCounselKnd3_srch", "전체", "3", "CHILD", $("#csprrg_optCounselKnd2_srch").val(),"", "");
}
// function optCounselKnd3_srchChangeEvent() {
// 	setObjectSelectBoxWithCode("optCounselKnd4_srch", "전체", "4", "CHILD", $("#csprrg_optCounselKnd3_srch").val(),"", "");
// }
                      
function optCounselKnd1ChangeEvent() {
	setObjectSelectBoxWithCode("csprrg_optCounselKnd2", "전체", "2", "CHILD", $("#csprrg_optCounselKnd1").val(), "", "CHANGE");
}
// function optCounselKnd2ChangeEvent() {
// 	setObjectSelectBoxWithCode("optCounselKnd3", "전체", "3", "CHILD", $("#csprrg_optCounselKnd2").val(), "", "CHANGE");
// }
function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("csprrg_optCounselKnd3", "전체", "3", "CHILD", $("#csprrg_optCounselKnd2").val(), "", "");
}
// function optCounselKnd3ChangeEvent() {
// 	setObjectSelectBoxWithCode("optCounselKnd4", "전체", "4", "CHILD", $("#csprrg_optCounselKnd3").val(), "", "");
// }

// function setSelectBoxWithCodeSync2(code1, code2, code3, code4) {
//     $("#csprrg_optCounselKnd1").val(code1).trigger("change");
//     $("#csprrg_optCounselKnd2").val(code2).trigger("change");
//     $("#csprrg_optCounselKnd3").val(code3).trigger("change");
//     $("#csprrg_optCounselKnd4").val(code4);
// }
function setSelectBoxWithCodeSync2(code1, code2, code3) {
    $("#csprrg_optCounselKnd1").val(code1).trigger("change");
    $("#csprrg_optCounselKnd2").val(code2).trigger("change");
    $("#csprrg_optCounselKnd3").val(code3);
}

//사용여부 선택이벤트
function optUseYNChangeEvent() {
    if ($("#csprrg_optUseYN").val() == "N") {
	$("#csprrg_tfNtuseDesc").prop("disabled", false);
    } else { 
	if (confirm("사용으로 설정하시겠습니까?")) {
	    $("#csprrg_tfNtuseDesc").val("").prop("disabled", true);
	} else {$("#csprrg_optUseYN").val("N");}
    }
}

//insert clickevent
function btnInsertClickEvent() {
  if (!confirm("등록하시겠습니까?"))
	return;
  var rMsg = validator();
  if (rMsg != "") {
	alert(rMsg);
	return;
  }
  
/*  if(tbbsid!=""){
			    gAppendHidden("csprrg_writeForm", "pJson", getJsonStrInsertManual(tbbsid));
			    gSubmitPost("csprrg_writeForm", true);
			    alert('등록되었습니다.');
			    // btnInitClickEvent();
			    if(!checkInnerPopup){
			    	  opener.$("#csdbpr_chargerJobCompt").prop("checked",true);
			    	  opener.clickProcessStats_Se="030100"; 
			    	  opener.$("#csdbpr_chargerJobProcessCtns").attr('disabled', false);
			    	  }
			    initSaveAfterEvent(tbbsid);
  }else{*/
	  $.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : "/ajax/civilservice/csw.do",
			data : "pJson=" + getNextValue(),
			success : function(data) {
			    gAppendHidden("csprrg_writeForm", "pJson", getJsonStrInsertManual(data.TBBS_ID));
			    gSubmitPost("csprrg_writeForm", true);
			    alert('등록되었습니다.');
			    if(!checkInnerPopup){
			    	  opener.$("#csdbpr_chargerJobCompt").prop("checked",true);
			    	  opener.clickProcessStats_Se="030100"; 
			    	  opener.$("#csdbpr_chargerJobProcessCtns").attr('disabled', false);
			    	  }
			    // btnInitClickEvent();
			    initSaveAfterEvent(data.TBBS_ID);
			},
			error : function(data, status, err) {
			    networkErrorHandler(data, status, err);
			}
		  });	  
  //}
	 // window.close();
}

//수정버튼 클릭이벤트
function btnUpdateClickEvent() {
  if (!confirm("수정 하시겠습니까?")){
      return;
  }
  var rMsg = validator();
  if (rMsg != "") {
	alert(rMsg);
	return;
  }
  gAppendHidden("csprrg_writeForm", "pJson", getJsonStrUpdateManual());
  gSubmitPost("csprrg_writeForm", true);
  alert("수정되었습니다.");
  // btnInitClickEvent();
  initSaveAfterEvent();
  if(!checkInnerPopup){
  opener.$("#csdbpr_chargerJobCompt").prop("checked",true);
  opener.clickProcessStats_Se="030100"; 
  opener.$("#csdbpr_chargerJobProcessCtns").attr('disabled', false);
  }
}

//셀렉트박스 데이터셋팅
function initSelectData() {

	    setObjectSelectBoxWithCode2("csprrg_optCounselKnd1_srch", "전체", "1", "CHILD", "00000000", "", "CHANGE");	
	    setObjectSelectBoxWithCode2("csprrg_optCounselKnd1", "전체", "1", "CHILD", "00000000", "", "CHANGE");	

    if(checkInnerPopup){
	setSelectBoxWithCode("csprrg_optGbKnd", "", "90303", "CHILD", "", "");	    								  
	setSelectBoxWithCode("csprrg_optGbKnd_srch", "전체", "90303", "CHILD", "", "");// 상담DB구분
    }else{
	setSelectBoxWithCode2("csprrg_optGbKnd", "", "90303", "CHILD", "", "");	    								  
	setSelectBoxWithCode2("csprrg_optGbKnd_srch", "전체", "90303", "CHILD", "", "");
    }
    $("#csprrg_tfSrchType").val("ttl");
}


function disabled(){
    // $("#csprrg_optCounselKnd1,#csprrg_optCounselKnd2,#csprrg_optCounselKnd3,#csprrg_optCounselKnd4,#csprrg_optGbKnd").prop("disabled",true);
    $("#csprrg_optCounselKnd1,#csprrg_optCounselKnd2,#csprrg_optCounselKnd3,#csprrg_optGbKnd").prop("disabled",true);
    $("#csprrg_tfLgMdSmSearch_01,#csprrg_tfTbbsTtl,#csprrg_optUseYN").prop("disabled",true);
    DEXT5.setEditorMode('view', 'tbbsCont');
}
function undisabled(){
    // $("#csprrg_optCounselKnd1,#csprrg_optCounselKnd2,#csprrg_optCounselKnd3,#csprrg_optCounselKnd4,#csprrg_optGbKnd").prop("disabled",false);
    $("#csprrg_optCounselKnd1,#csprrg_optCounselKnd2,#csprrg_optCounselKnd3,#csprrg_optGbKnd").prop("disabled",false);
    $("#csprrg_tfLgMdSmSearch_01,#csprrg_tfTbbsTtl,#csprrg_optUseYN").prop("disabled",false);
    DEXT5.setEditorMode('edit', 'tbbsCont');
}

//내용 초기화
function initContent() {
    DEXT5.config.userFontFamily = "굴림";
    DEXT5.config.userFontSize = 10;
    DEXT5.setBodyValue('', 'tbbsCont');

    g_rspnUsrId = "";
    $("#csprrg_optCounselKnd1_srch").val("all");
    $("#csprrg_optGbKnd_srch").val("all");
    $("#csprrg_optCounselKnd1").val("all");
    $("#csprrg_tfSrchType").val("ttl");
    $("#csprrg_tfSrchVal").val("");
    $("#csprrg_tfNtuseDesc").val("").prop("disabled", true);
    $("#csprrg_tfCntrNm, #csprrg_tfRespId, #csprrg_tfRespNm, #csprrg_tfTbbsId, #csprrg_tfTbbsTtl, #csprrg_tfResponTel").val("");
    $("#csprrg_lbCrtInfo, #csprrg_lbModInfo").html("");
    $("#csprrg_optUseYN").val("Y");
   
    rmFileBoxEvent();
    fileBox_idx = 0; 
    $("#csprrg_fileInfos").empty().append(fileForm);
}

function initDate(){
    datePicker("#csprrg_selFrDate");
    datePicker("#csprrg_selToDate");
    $("#csprrg_selFrDate").val(getPrvDay("M", 1, "-"));
    //$("#csprrg_selFrDate").val(getDate());
    $("#csprrg_selToDate").val(getDate());
}

//eidt 로드 완료시 세부내용등록
function dext_editor_loaded_event(editor) {
    DEXT5.config.userFontFamily = "굴림";
    DEXT5.config.userFontSize = 10;
   
    //콜센터 신규등록
    if(news){						
	$("#csprrg_btnInsert").show();
	$("#csprrg_btnUpdate").hide();			
    }else{						
	//요청DB 신규수정요청
	if(clickReqId && clickTbbsId){  			
	    showDetailManual(clickTbbsId);
	    showAttachFiless(clickTbbsId);
	    $("#csprrg_optUseYN").val("Y");
	    checkFileBox=true;    
	}else{
	    //신규등록
	    checkFileBox=false;    
	}
    }
} 	


//입력검증
function validator() {
    var rMsg = "";

    if ($("#csprrg_optCounselKnd1").val() == "all" || $("#csprrg_optCounselKnd1").val() == null || $("#csprrg_optCounselKnd2").val() == "all" || $("#csprrg_optCounselKnd2").val() == null
        // || $("#csprrg_optCounselKnd3").val() == "all"|| $("#csprrg_optCounselKnd3").val() == null|| $("#csprrg_optCounselKnd4").val() == "all"|| $("#csprrg_optCounselKnd4").val() == null)
	    || $("#csprrg_optCounselKnd3").val() == "all"|| $("#csprrg_optCounselKnd3").val() == null )
    {
	rMsg += "\n\n상담유형을 선택해주세요.";
	return rMsg;
    }

    if ($("#csprrg_tfTbbsTtl").val().trim() == ""){
	rMsg += "\n\n제목을 입력해 주세요.";
	return rMsg;      
    }

    var tbbsCntn = DEXT5.getBodyTextValue("tbbsCont");
 
    if (tbbsCntn.trim() == ""){
	rMsg += "\n\n내용을 입력해 주세요.";
	return rMsg;      
    }
    /*
     * //바이트계산 최대4000byte byteLength =
     * tbbsCntn.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;
     * if(!(tbbsCntn == "" || tbbsCntn == null)) { if(byteLength > 4000) rMsg +=
     * "\n\n내용이 최대 4000byte까지 저장하실 수 있습니다."; } else rMsg += "\n\n내용을 입력해 주세요.";
     */
    // 파일 업로드 용량 체크
    var nLimitSize = 10; // 제한사이즈 MB
    var formName = $("#csprrg_writeForm input[name=MANUAL]");
    for (var i = 0; i < formName.length; i++) {
	if (formName[i].value != "") {
	    var nRtn = fileCheck(formName[i], nLimitSize);
	    if (nRtn > nLimitSize) {
		rMsg += "\n\n(" + nRtn + "MB) 첨부파일 사이즈는 " + nLimitSize + "MB 이내로 등록 가능합니다.";
		return rMsg;
	    }
	    // 파일 확장자 체크
	    if (fileExtnsCheck(formName[i]) == false){
		rMsg += "\n\n[" + (i + 1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
		return rMsg;		
	    }
	}
    }
    // 담당부서가 미선택일 경우 추가
    /*    if ($("#csprrg_tfCntrNm").val() == "" || $("#csprrg_tfCntrNm").val() == null) {
	rMsg += "\n\n담당부서를 선택해 주세요.";}*/
    if ($("#csprrg_optUseYN").val() == "N") {
	if ($("#csprrg_tfNtuseDesc").val() == ""){
	    rMsg += "\n\n미사용 선택 시 미사용사유가 필요합니다.";
	    return rMsg;	    
	}
    }

    return rMsg;
}

//initialzation page
$(document).ready(function() {

/*    if(cdb_req_gb_cd=="010100") {
	  $("#csprrg_btnUpdate").text("신규");
    }
    */
    initDate();
    initSelectData();
    $("#csprrg_btnInit").text("초기화");	

    //콜센터 신규등록
    if(news){						
	$("#csprrg_btnInsert").show();
	$("#csprrg_btnUpdate").hide();
    }else{
	// 요청DB 신규수정요청
	if(clickReqId && clickTbbsId){  			
	    $("#csprrg_btnUpdate").show();
	    $("#csprrg_btnInsert").hide();
	}else{
	    // 요청DB 신규등록    
	    $("#csprrg_btnUpdate").hide();
	    $("#csprrg_btnInsert").hide();
	}    
    }
       
    $("#csprrg_tblManualList").jqGrid({
	url : "/jqgrid/civilservice/csw.do",
	datatype : "json",
	mtype : "POST",
	postData : { pJson : getJsonStrManualList()},
	jsonReader : { repeatitems : false },
	colNames : [ "번호", "제목","수정일자", "등록일자"],
	colModel : [ {name : "TBBS_ID",index : "TBBS_ID", hidden : true}, 
	             {name : "TBBS_TTL",index : "TBBS_TTL",align : "left", width : 150}, 
	             { name : "MOD_DTTM",index : "MOD_DTTM",align : "center",width : 50},
	             { name : "CRT_DTTM",index : "CRT_DTTM",align : "center",width : 50}
	           ],
	sortname : "mod_dttm desc, crt_dttm",
	sortorder : "desc",
	gridview : false,
	hidegrid : false,
	shrinkToFit : true,
	loadonce : false,
	scrollOffset : 0,
	height : "626",
	width : "100%",
	rowNum : 24,
	rowList : [ 25, 50, 100 ],
	autowidth : true,
	pager : "#csprrg_pgManualList",
	rownumbers : true,
	rownumWidth : 30,
	multiselect : false,
	emptyrecords : "",
	caption : "",
	loadui : "enable",
	viewrecords : true,
	beforeSelectRow: function(rowid, e) {
		if(!checkInnerPopup)
	    return false;
	},	   
	onSelectRow : function(rowid) {
		
	    initContent();
	    var row = $("#csprrg_tblManualList").getRowData(rowid);
	  
	    showDetailManual(row.TBBS_ID);
	    showAttachFiless(row.TBBS_ID);
	     
	    //콜센터 신규등록
	    if(news){						
		$("#csprrg_btnInsert").hide();
		$("#csprrg_btnUpdate").show();
		undisabled();
	    }else{						
	    //  요청DB 수정등록
	    	
		//수정권한X
	    	//if(opener.document.title == "공주시청컨텍센터"){
	    	if(checkInnerPopup){
    		    $("#csprrg_btnUpdate").show();
    		    $("#csprrg_btnInsert").hide();
    		    checkFileBox=true;
    		    undisabled();
    		    }
	    	else{		
    		if(clickTbbsId != row.TBBS_ID){
    		    $("#csprrg_btnUpdate").hide();
    		    $("#csprrg_btnInsert").hide();
    		    checkFileBox=false;
    		    disabled();
    		//수정   
    		}else if(clickTbbsId == row.TBBS_ID){
    		    $("#csprrg_btnUpdate").show();
    		    $("#csprrg_btnInsert").hide();
    		    checkFileBox=true;
    		    undisabled();
	    	}
	    }
	    }
	},
	onPaging : function(pgButton) {},
	gridComplete : function() {
	   }
    }).jqGrid("navGrid", "#csprrg_pgManualList", {edit : false,add : false,del : false,search : false});
        
    inputFile.push($("#csprrg_MANUAL").clone());
    fileForm = $("#csprrg_fileInfos tr").parent().html();
    $("#csprrg_tfNtuseDesc").prop("disabled", true);
    
    //add event 
    $("#csprrg_optCounselKnd1_srch").bind("change", optCounselKnd1_srchChangeEvent);
    $("#csprrg_optCounselKnd2_srch").bind("change", optCounselKnd2_srchChangeEvent);
    // $("#csprrg_optCounselKnd3_srch").bind("change", optCounselKnd3_srchChangeEvent);
    $("#csprrg_optCounselKnd1").bind("change", optCounselKnd1ChangeEvent);
    $("#csprrg_optCounselKnd2").bind("change", optCounselKnd2ChangeEvent);
    // $("#csprrg_optCounselKnd3").bind("change", optCounselKnd3ChangeEvent);
    $("#csprrg_optCounselKnd1").trigger("change");
    $("#csprrg_optCounselKnd1_srch").trigger("change");   
    $("#csprrg_btnExcelPopup").bind("click", btnExcelPopup_clickEvent);
    $("#csprrg_optUseYN").bind("change", optUseYNChangeEvent);
    $("#csprrg_btnSearch").bind("click", btnSearchClickEvent);
    $("#csprrg_tfSrchVal").bind("keydown", function(e) {if (e.keyCode == 13) {btnSearchClickEvent();}});
    $("#csprrg_btnInit").bind("click", btnInitClickEvent);
    $("#csprrg_btnInsert").bind("click", btnInsertClickEvent);
    $("#csprrg_btnUpdate").bind("click", btnUpdateClickEvent);
    //파일삭제이벤트 등록
    $("#csprrg_rmFilebox").bind("click", rmFileBoxEvent);
    
    if(window.sessionStorage.getItem("INTV_LG_CD")!=null){
    	$("#csprrg_optCounselKnd1").val(window.sessionStorage.getItem("INTV_LG_CD")).trigger("change");
    	$("#csprrg_optCounselKnd2").val(window.sessionStorage.getItem("INTV_MD_CD")).trigger("change");
    	$("#csprrg_optCounselKnd3").val(window.sessionStorage.getItem("INTV_SM_CD")).trigger("change");
	}
    
    if(tbbsid!=null&&news!='y'){
    	showDetailManual(tbbsid);	
    }
    if(!checkInnerPopup){
    	$("#csprrg_chkNotUseYN").prop("disabled","disabled");
    	$("#csprrg_chkNotUsetype").prop("disabled","disable");
    	$("#csprrg_btnExcelPopup").hide();	    
    }
    
});


$(function(){
	var selectid;
	var selIdSeq;
$("#csprrg_tfLgMdSmSearch_01").autocomplete({
source : function( request, response ) {
	selectid=$(this.element).prop("id");
	arSelId=selectid.split('_');
	selIdSeq=arSelId[1];
     $.ajax({
            type: 'post',
            async : true,
            url: "/ajax/civilservice/csw.do",
            dataType: "json",
            data : "pJson=" + getJsonCodeList(selectid),
            success: function(data) {
	 
                //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                response(
                    $.map(data, function(item) {
                    	
                        return { 
                            // label: (item.XNAME+" > "+item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                            label: (item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                            value: $("#csprrg_"+selectid).val(),
                            // hidVal:  (item.XCODE+"|"+item.LCODE+"|"+item.MCODE+"|"+item.SCODE)
                            hidVal:  (item.LCODE+"|"+item.MCODE+"|"+item.SCODE)
                        };
                    })
                );
            }
       });
    },
//조회를 위한 최소글자수
minLength: 2,
select: function( event, ui ) {
	ui.item.value="";
	// var arItem=new Array(4);
    var arItem=new Array(3);
    // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
	arItem=(ui.item.hidVal.toString()).split('|');
	//if(selIdSeq=="01"){
		// $("#csprrg_optCounselKnd1").val(arItem[0]).trigger("change");
		// $("#csprrg_optCounselKnd2").val(arItem[1]).trigger("change");
		// $("#csprrg_optCounselKnd3").val(arItem[2]).trigger("change");
		// $("#csprrg_optCounselKnd4").val(arItem[3]);
        $("#csprrg_optCounselKnd1").val(arItem[0]).trigger("change");
        $("#csprrg_optCounselKnd2").val(arItem[1]).trigger("change");
        $("#csprrg_optCounselKnd3").val(arItem[2]);
	//}
}
});
}) 

//------------------------------- file related ----------------------------------------------
//파라미터셋팅 첨부파일
function getJsonFileLists(tbbsId) {
  var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "om010",
		"tbl_pk" : tbbsId,
		"orderby" : "crtTime",
	    }

  };
  return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteFile(fileId) {
  var loParam = {
	    "qt" : "ZGVsZXRl",
	    "mi" : "b20wMTkuZGVsZXRl",
	    "map" : {
		"key" : "value",
		"fl_id" : fileId,
	    }
  };
  return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {
  var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
  };
  return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//첨부파일 박스추가
function addFileBox() {
  if (fileBox_idx >= 2) {
	alert("첨부파일은 최대 3개까지 가능합니다.");
  } else {
	var html = $("#csprrg_fileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++fileBox_idx);
	$("#csprrg_fileInfos").append(html);
  }
}

//첨부파일박스삭제
function removeFileBox(i) {
  var el = $("#csprrg_writeForm input[name=record_" + i + "]");
  el.parent().parent().remove();
  fileBox_idx--;
  
  if(fileBox_idx > 2){
	 $("#csprrg_fileInfos tr:last-child").css("display","none");
  }else{
	$("#csprrg_fileInfos").css("display","block");
}
}

//첨부된 파일 삭제
function deleteFile(fileId) {
  if (confirm("첨부된 파일을 삭제하시겠습니까?")) {
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonDeleteFile(fileId),
	    success : function(data) {
		// 파일폼 삭제
		var el = $("#csprrg_writeForm input[name=record_" + fileId + "]");
		el.parent().parent().remove();

		if (--fileBox_idx < 3) {
		    $("#csprrg_MANUAL").prop("disabled", false);
		    $("#csprrg_rmFilebox").prop("disabled", false);
		}
		
		if(fileBox_idx < 3){
			$("#csprrg_fileInfos tr:last-child").css("display","table-cell");
		    }else{
			$("#csprrg_fileInfos tr:last-child").css("display","none");
		    }
	    },
	    error : function(data, status, err) {
		networkErrorHandler(data, status, err);
	    }
	});
  }
}

//파일박스 내용삭제
function rmFileBoxEvent() {
  inputFile[1] = inputFile[0].clone(true);
  $("#csprrg_MANUAL").replaceWith(inputFile[1]);
}

//첨부파일 보기
function showAttachFiless(tbbsId) {
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonFileLists(tbbsId),
	success : function(data) {
	    for ( var i in data) {
		var url = "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		var tr = "<tr>";
		tr += "<td colspan='4'>" +
				"<input type='hidden' name='record_" + data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "' title='" + data[i].LOC_FL_NM + "'>" + data[i].LOC_FL_NM.substring(0, 20)+"</a></span>"+" ";
		tr += "<span>" + data[i].FL_KB_SZ + "</span>";
		//요청 게시물일때
		if(checkFileBox || news){
		tr += "<a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'> <strong class='or_txt'>[삭제]</strong></a>";
		}
		
		tr += "</td></tr>";
		fileBox_idx++;
		$("#csprrg_fileInfos").prepend(tr);
	    }
	    if (fileBox_idx > 2) {
		$("#csprrg_MANUAL").prop("disabled", true);
		$("#csprrg_rmFilebox").prop("disabled", true);
		 $("#csprrg_fileInfos tr:last-child").css("display","none");
	    }else{
	    }
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
  });
}
//-----------------------------------------------------------------------------

