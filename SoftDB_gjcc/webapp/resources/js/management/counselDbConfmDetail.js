var g_popup = "GCHILD";
var fileBox_idx = 0;
var org_id = "";
var cdb_act = "";

var dbGrade ="user";				
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var usrId = window.sessionStorage.getItem("USR_ID");
var usrNm = window.sessionStorage.getItem("USR_NM");/*
var locfl_nm=null;
var svrfl_nm=null;
var svrfl_pth=null;
var fl_sz=null;*/
var checkProCd=false;
var flids = [];

//요청DB 신규등록
function getJsonStrInsertManual(tbbsId) {
  var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuaW5zZXJ0SmlzaWs=",
	    "map" : {
		"tbl_pk" : tbbsId,
		"tbl_nm" : "om010",
		"req_id" : reqId,
		"tbbs_cntn" : DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csdbdt_optGbKnd").val(),
		"tbbs_ttl" : $("#csdbdt_tfTbbsTtl").val(),
		"intv_lg_cd" : $("#csdbdt_optCounselKnd1").val(),
		"intv_md_cd" : $("#csdbdt_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csdbdt_optCounselKnd3").val(),
		"cntr_nm" : $("#csdbdt_tfCntrNm").html(),
		"rspn_prsn" : $("#csdbdt_charger").val(),//$("#csdbdt_charger").html(),
		"rspn_tel_no" : $("#csdbdt_tfResponTel").val(),//$("#csdbdt_tfResponTel").html(),		
		"use_yn" : $("#csdbdt_optUseYN").val(),
		"ntuse_desc" : $("#csdbdt_tfNtuseDesc").val(),
  		"sendingUid" : usrId,
  		"wrk_cl" : "상담DB신규승인",
  		"cc_appr_yn" :$("#csdbdt_chkNotUseYN").val()!=null?$("#csdbdt_chkNotUseYN").val():"N",
  		"onappr" : true
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
		//"qt" : "dXBkYXRl",
	    "mi" : "b20wMTAudXBkYXRlSmlzaWs=",
	    "map" : {
		"tbl_pk" : tblId,
		"tbl_nm" : "om010",
		"req_id" : reqId,
		"tbbs_cntn" : DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csdbdt_optGbKnd").val(),
		"tbbs_ttl" : $("#csdbdt_tfTbbsTtl").val(),
		"intv_lg_cd" : $("#csdbdt_optCounselKnd1").val(),
		"intv_md_cd" : $("#csdbdt_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csdbdt_optCounselKnd3").val(),
		"use_yn" : $("#csdbdt_optUseYN").val(),
		"cntr_nm" : $("#csdbdt_tfCntrNm").html(),
		"rspn_prsn" : $("#csdbdt_charger").html(),
		"rspn_tel_no" : $("#csdbdt_tfResponTel").html(),
		"ntuse_desc" : $("#csdbdt_tfNtuseDesc").val(),
		"wrk_cl" : "상담DB수정승인",
		"cc_appr_yn" :$("#csdbdt_chkNotUseYN").val()!=null?$("#csdbdt_chkNotUseYN").val():"N",
		"sendingUid" : usrId,
		"onappr" : true
	    }
  };
  return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrCounselDbConfmDetail(reqId, tblId, wrkId){
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTUuY291bnNlbERiQ29uZm1EZXRhaWw=",
	    "map" : {
		"req_id" : reqId,
		"tbbs_id" : tblId,
		"wrk_id" : wrkId	     
		}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
}
function setSelectBoxWithCodeSync2(code1, code2, code3) {
    $("#csdbdt_optCounselKnd1").val(code1).trigger("change");
    $("#csdbdt_optCounselKnd2").val(code2).trigger("change");
    $("#csdbdt_optCounselKnd3").val(code3);
}
function setJsonStrCounselDbConfmDetail(reqId, tblId, wrkId){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/management/counselDbConfmDetail.do",
	data : "pJson=" + getJsonStrCounselDbConfmDetail(reqId, tblId, wrkId),
	success : function(data){
		if(data!=null){
	        setSelectBoxWithCodeSync2(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
		    $("#csdbdt_optGbKnd").val(data.CDB_GB_CD);
		    $("#csdbdt_chkNotUseYN").val(data.CC_APPR_YN);
		    org_id = data.ORG_USR_ID;
		    cdb_act = data.CDB_ACT_ST_CD;	    	   
		    $("#csdbdt_tfTbbsId").val(data.TBBS_ID);
		    $("#csdbdt_requstSe").html(data.CDB_REQ_GB_NM);
		    $("#csdbdt_optGbKnd").val(data.CDB_GB_CD);
		    $("#csdbdt_tfTbbsTtl").val(data.TBBS_TTL);
		    $("#csdbdt_tfCntrNm").html(data.CNTR_NM);
		    //$("#csdbdt_charger").html(data.RSPN_PRSN);
		    $("#csdbdt_charger").val(data.RSPN_PRSN);
		    //$("#csdbdt_tfResponTel").html(data.RESPON_TEL);
		    $("#csdbdt_tfResponTel").val(data.RESPON_TEL);
		    $("#csdbdt_optUseYN").val(data.USE_YN);
		    if ($("#csdbdt_optUseYN").val() == "N") {$("#csdbdt_tfNtuseDesc").prop("disabled", false);}
		    $("#csdbdt_tfNtuseDesc").val(data.NTUSE_DESC);
		    g_rspnUsrId = data.RESPON_PRSN;
		    DEXT5.setHtmlContentsEw(data.COMM_CNTN == null ? "" : data.COMM_CNTN, 'tbbsCont');
		    
		    var crt =  data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT +" / "+ (data.CRT_USR_NM == null ? "" : data.CRT_USR_DEPT+" "+ data.CRT_USR_NM);
		    var mod =  data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT +" / "+ (data.MOD_USR_NM == null ? "" : data.MOD_USR_DEPT+" "+ data.MOD_USR_NM);
		    $("#csdbdt_lbCrtInfo").html(crt);
		    $("#csdbdt_lbModInfo").html(mod);
		
	   
	    switch(data.CDB_ACT_ST_CD){
	    case "010100":
		$("#csdbdt_jobRcept").prop('checked', true);
		 checkProCd=false;
		break;
	    case "010200": 
		$("#csdbdt_jobChrgAppn").prop('checked', true);
		checkProCd=false;
		break;
	    case "010400": 
		$("#csdbdt_jobChrgAppn2").prop('checked', true);
		checkProCd=false;
		break;
	    case "020100":
		$("#csdbdt_jobProcess").prop('checked', true);
		checkProCd=false;
		break;
	    case "030100":
		$("#csdbdt_jobCompt").prop('checked', true);
		checkProCd=true;
		break;
	    case "020200":
		$("#csdbdt_jobRetrn").prop('checked', true);
		checkProCd=true;
		break;
	    case "020300":
			$("#csdbdt_jobReqRsn").prop('checked', true);
			$("#csdbdt_tfReqRsn").val(data.RE_MOD_REQ_RSN);
			checkProCd=true;
		break;
	    default: 
		break;
	    }
	    showAttachFiles(tblId);
		 }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}
function getJsonStrDuplifile(fl_id){   
	var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTkuZHVwbGljYXRl",
	    "map" : {
		"tbl_nm" : "om010",
		"tbl_pk" : tblId,
		"tbl_pk2" : reqId,
		"fl_id" : fl_id,
		"sendingUid" : usrId
		}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
	
}

function getJsonStrDeletefile(){
	var loParam = {
		    "qt" : "ZGVsZXRl",
		    "mi" : "b20wMTkuZGVsZXRlTGlzdA==",
		    "map" : {
			"tbl_nm" : "om010",
			"tbl_pk" : tblId
			}
	    };
	    console.log(JSON.stringify(loParam));
	    return encodeURIComponent(JSON.stringify(loParam));		
}

function counselDbconfmDetailUpdateClickEvent() {
	//hhs 2020.03.09
    if(!checkProCd){
//	alert("요청DB 처리가 완료되지 않았습니다.");
	alert("공무원이 '처리중' 상태입니다.\n'완료' 상태 변경 후 승인할 수 있습니다.");
	return;
    }
    
    //hhs 2020.03.09
    if(cdb_act=="020300"){
    	alert("공무원이 '재작성중' 상태입니다.\n'완료' 상태 변경 후 승인할 수 있습니다.");
    	return;
    }
//    
    var appr = "";
   /* if($("input:radio[name=radio]:checked").val()=="Y"){*/
    if($("#csdbdt_chkNotUseYN").val()=="Y"){
	appr = usrNm+ "님이 승인하였습니다.";
    }else{
	appr = usrNm+ "님이 미승인(재작성요청)하였습니다.";
	cdb_act = "020300";
    }

    var map = {
	    "key" : "value",
	    "cc_appr_yn" :$("input:radio[name=radio]:checked").val(),
	    "tbbs_id" : tblId,
	    "tbbs_id" :tblId,
	    "org_usr_id" : org_id,				
	    "cdb_act_st_cd" :cdb_act,
	    "rtn_rsn" : appr
    };
   var req = $("#csdbdt_requstSe").html(); 
   $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/management/insertManual.do",
	data : "pJson=" + getJsonStr("dXBkYXRl", "b20wMTAuY291bnNlbERiY29uZm1EZXRhaWw=",map),
	success : function(data) {
		if($("#csdbdt_chkNotUseYN").val()=="Y"){
		if(req=="신규"){
			gAppendHidden("csdbdt_writeForm", "pJson", getJsonStrInsertManual(tblId));
		    gSubmitPost("csdbdt_writeForm", true);
		    for(var i in flids){
				   if(flids[i]!=""){
					   $.ajax({
							type : "post",
							dataType : "json",
							async : true,
							url : getContextPath() + "/ajax/management/insertManualFile.do",
							data : "pJson=" + getJsonStrDuplifile(flids[i]),
							success : function(data) {				
							},
							error : function(data, status, err) {
							    networkErrorHandler(data, status, err);
							}
						    });
					   }
				   }	
		}else if(req=="수정"||req=="삭제"){			
			gAppendHidden("csdbdt_writeForm", "pJson", getJsonStrUpdateManual(tblId));
		    gSubmitPost("csdbdt_writeForm", true); 
		    $.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/management/DeleteManualFile.do",
				data : "pJson=" + getJsonStrDeletefile(),
				success : function(data) {	
					for(var i in flids){
					   if(flids[i]!=""){
						   $.ajax({
								type : "post",
								dataType : "json",
								async : true,
								url : getContextPath() + "/ajax/management/insertManualFile.do",
								data : "pJson=" + getJsonStrDuplifile(flids[i]),
								success : function(data) {				
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
		}else if($("#csdbdt_chkNotUseYN").val()=="N"){
			  $.ajax({
					type : "post",
					dataType : "json",
					async : true,
					url : getContextPath() + "/ajax/management/updateReqRsn.do",
					data : "pJson=" + getJsonStr("aW5zZXJ0", "b20wMTUudXBkYXRlUmVxUnNu", {
						    "req_id" : reqId,
						    "req_rsn" : $("#csdbdt_tfReqRsn").val(),
						    }),
					success : function(data) {
					},
					error : function(data, status, err) {
					    networkErrorHandler(data, status, err);
					}
				    });
		}else{
			alert("예외상황 발생");
		}
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
    });
   
	    alert("저장되었습니다.");
	    
	    //hhs 20.03.23 저장 후 리로드/닫기
	    opener.$("#cscfmg_tblCounselDbComfm").trigger("reloadGrid");
	    window.close(); 
}
function requstHis_popupEvent(tbbsId){
	var width = 900;
	var height = 831;
	var top = 0;
	var left = Math.ceil((window.screen.width - width)/2);
	// var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/civilservice/cswDbManage_processDetailHist.do?tbbsId="+tbbsId;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "이관이력보기", option);
	newWindow.focus();	
}

//-----------------------------------------file related -------------------------------------------------

//파라미터셋팅 첨부파일
function getJsonFileList(tbbsId){		
  var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		//hhs 2020.03.09
//		"tbl_nm" : "oh014",
		"tbl_nm" : "oh013",
		"tbl_pk": tbbsId,
		"tbl_pk2": reqId,
		"orderby": "crtTime",
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
//첨부파일 
function showAttachFiles(tbbsId){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/fileList.do",
	data : "pJson=" + getJsonFileList(tbbsId),
	success : function(data){

		var tr = "";
	    /*for(var i in data){
		var url = getContextPath() 
		+ "/file/jisikManageFileDown.do?pJson=" 
		+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

		var tr = "<tr>";
		tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
		tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
//		tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
		tr += "</tr>";

		fileBox_idx++;
		$("#csdbdt_Files").prepend(tr);
	    }

	    if(fileBox_idx >= 3){
		$("#csdbdt_MANUAL").prop("disabled", true);
		$("#csdbdt_rmFilebox").prop("disabled", true);
	    }*/
		for ( var i in data) {
			var url = getContextPath() + "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

			tr += "<tr>";
			tr += "<td colspan='3'>" + "<input type='hidden' name='record_" + data[i].FL_ID + "' value='' />" + "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span>" + "<span>" + data[i].FL_KB_SZ + "</span>";
			
			
			flids.push(data[i].FL_ID);
			fileBox_idx++;
		}	
		$("#csdbdt_Files").empty();
		$("#csdbdt_Files").prepend(tr);
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

function initEdit(){
	DEXT5.config.Mode = 'view';
	//DEXT5.config.Mode = 'edit'; //임시적 mode 처리
	DEXT5.config.Height  = "562px";
	DEXT5.config.Width  = "100%";
	DEXT5.config.zStatusBar = "0";
	DEXT5.config.zTopMenu = "1";
	DEXT5.config.zToolBar  = "1";	
	DEXT5.config.SkinName = "gray";
	DEXT5.config.EditorHolder = "csdbdt_tbbsCont";
	var editor = new Dext5editor("tbbsCont");	
}


//eidt 로드 완료시 세부내용등록
function dext_editor_loaded_event(editor) {
    setJsonStrCounselDbConfmDetail(reqId, tblId, wrkId);
} 	

function fn_onClose(){
    window.opener.$("#csdbdt_tblCounselDbComfm").trigger("reloadGrid");   
}

function optCounselKnd1ChangeEvent() {
	setObjectSelectBoxWithCode("csdbdt_optCounselKnd2", "전체", "2", "GCHILD", $("#csdbdt_optCounselKnd1").val(), "", "CHANGE");
}
function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("csdbdt_optCounselKnd3", "전체", "3", "GCHILD", $("#csdbdt_optCounselKnd2").val(), "", "");
}

//요청DB 이력등록
function getJsonStrInsertJisik() {
	if(news){
		var wrk_cl = "상담DB신규등록"
	}else{
		var wrk_cl = "상담DB수정등록"	
	}
var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuY291bnNlbERiaW5zZXJ0RGV0YWls",
	    "map" : {
		"tbl_pk" : tbbsid,
		//hhs 2020.03.11 oh014->oh013
		"tbl_nm" : "oh013",
		"req_id" : reqid,
		"tbbs_cntn" : DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csdbdt_optGbKnd").val(),
		"tbbs_ttl" : $("#csdbdt_tfTbbsTtl").val(),
		"intv_lg_cd" : $("#csdbdt_optCounselKnd1").val(),
		"intv_md_cd" : $("#csdbdt_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csdbdt_optCounselKnd3").val(),
		"use_yn" : $("#csdbdt_optUseYN").val(),
		"sendingUid" : usrId,
		"wrk_cl" : wrk_cl,
		"cc_appr_yn" : "Y"
	    }
};
//상담AP에서 등록했을경우 사용여부
/*  if(checkInnerPopup){
	loParam['map']['cc_appr_yn']="Y";
}*/
return encodeURIComponent(JSON.stringify(loParam));
}

/*
function btnInsertClickEvent() {
}
			    gAppendHidden("csdbdt_writeForm", "pJson", getJsonStrInsertJisik());
			    gSubmitPost("csdbdt_writeForm", true);
			    //alert('등록되었습니다.');
}*/
//file related end------------------------------------------------------------------------------------------------

//init page
$(document).ready(function(){
    initEdit();

    //add event
	setSelectBoxWithCode("csdbdt_optGbKnd", "전체", "90303", "GCHILD", "", "");	 
	setObjectSelectBoxWithCode2("csdbdt_optCounselKnd1", "전체", "1", "GCHILD", "00000000", "", "CHANGE");	
    $("#csdbdt_optCounselKnd1").bind("change", optCounselKnd1ChangeEvent);
    $("#csdbdt_optCounselKnd2").bind("change", optCounselKnd2ChangeEvent);
    $("#csdbdt_optCounselKnd1").trigger("change");
    
    $("#csdbdt_btnInsert").bind("click", counselDbconfmDetailUpdateClickEvent);
    $("#csdbdt_btnDbRecode").click(function(e) {requstHis_popupEvent(tblId);});
    
    window.onbeforeunload = fn_onClose;
});







