var s_strtDt = "";
var s_endDt = "";
var tbbs_Id = "";
var g_ListPopup = "GGGCHILD"

//파라미터셋팅 commonList
function getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMTQuc2VsZWN0SGlzdG9yeUxpc3Q=",			// oh014.selectHistoryList
		"map" : {
			"key" : "value",
			"tbbsId" : tbbs_Id,
			"frDt" : s_strtDt,
			"toDt" : s_endDt
		}
	};
	//console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//detail
function getJsonStrShowDetailManual(reqId){
  var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b2gwMTQuc2VsZWN0SmlzaWtIaXN0b3J5",
	    "map" : {
		"reqid" : reqId			
	    }
  };
  //console.log(JSON.stringify(loParam));
  return encodeURIComponent(JSON.stringify(loParam));	
}

function setSelectBoxWithCnslCodeSync(code1, code2, code3){
  $("#csdbalt_optCounselKnd1").val(code1).trigger("change");
  $("#csdbalt_optCounselKnd2").val(code2).trigger("change");
  $("#csdbalt_optCounselKnd3").val(code3);
}


//file list
function getJsonFileList(reqId){
  var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		//hhs 2020.03.12 oh014->0h013
		"tbl_nm" : "oh013",
		"tbl_pk": tbbs_Id,
		"tbl_pk2": reqId,
		"orderby": "crtTime",
	    }
  };
  //console.log(JSON.stringify(loParam));
  return encodeURIComponent(JSON.stringify(loParam));
}

//file download 
function getJsonFileDownload(svr, loc){
  var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
  };
  //console.log(JSON.stringify(loParam));
  return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//attached file
function showAttachFiles(reqId){
 $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/civilservice/cswfileList.do",
	data : "pJson=" + getJsonFileList(reqId),
	success : function(data){
	    $("#csdbalt_tblFiles").html(""); 
	    if(data != null && data != ""){
		var tr ="";
		for(var i in data){
		    var url = getContextPath() + "/file/civilservice/cswjisikSearchFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    tr += "<tr>";
		    tr += "<td><span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a>" +" "+ data[i].FL_KB_SZ + "</span></td>";
		    tr += "</tr>";
		}
		$("#csdbalt_tblFiles").append(tr); 					
	    }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
 });
}

function showDetailManual(reqId){
  $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/civilservice/cswjisikDetail.do",
	data : "pJson=" + getJsonStrShowDetailManual(reqId),
	success : function(data){	
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;
	    
	    $("#csdbalt_tfTbbsTtl").html(data.TBBS_TTL);   
	    DEXT5.setBodyValue(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'tbbsCont');
	    $("#csdbalt_tfCntrNm").html(data.CNTR_NM);
	    //$("#csdbalt_tfRespNm").html(data.RSPN_PRSN);
	    $("#csdbalt_tfRespNm").val(data.RSPN_PRSN);
	    $("#csdbalt_chkNotUseYN").val(data.CC_APPR_YN);
	    //$("#csdbalt_tfResponTel").html("");
	    //$("#csdbalt_tfResponTel").html(data.RESPON_TEL);
	    $("#csdbalt_tfResponTel").val("");
	    $("#csdbalt_tfResponTel").val(data.RESPON_TEL);
	    var crt =data.CRT_USR_NM?data.CRT_USR_NM:"";
	    var mod =data.MOD_USR_NM?data.MOD_USR_NM:"";
	    $("#csdbalt_RsctDt").html(data.CRT_DT_FORMAT +" " + data.CRT_TM_FORMAT+" "+crt);
	    $("#csdbalt_UpdtDt").html(data.MOD_DT_FORMAT +" " + data.MOD_TM_FORMAT+" "+mod);
	    //sync
  	    setSelectBoxWithCnslCodeSync(intvLgCd, intvMdCd, intvSmCd);
  	  showAttachFiles(reqId);
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
  });
}

//일반리스트
function getHistoryList()
{
	$("#csdbalt_tblAltList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/cswcounseldbAltList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["REQ_ID", "일시", "작업자"/*, "진행상태", "사유"*/],
			colModel : [
				{ name : "REQ_ID", index : "REQ_ID", align : "center", width : 40, hidden : true },
				{ name : "WRK_DTTM_FORMAT", index : "WRK_DTTM_FORMAT", align : "center", width : 40 },
				{ name : "MOD_USER_NM", index : "MOD_USER_NM", align : "center", width : 30 }/*,
				{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 30 },
				{ name : "RTN_RSN", index : "RTN_RSN", align : "left", width : 100 }*/
			],
			sortname : "WRK_DTTM_FORMAT",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "710",
		   	width : "100%",
		   	rowNum : 20,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#csdbalt_pgAltList",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		var row = $("#csdbalt_tblAltList").getRowData(rowid);
		   		showDetailManual(row.REQ_ID)		   		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	}
	}).jqGrid("navGrid", "#csdbalt_pgAltList", {edit : false, add : false, del : false, search : false});
}

//조회버튼 클릭이벤트
function btnSearchClickEvent()
{
	s_strtDt = $("#csdbalt_selStrtDate").val();
	s_endDt = $("#csdbalt_selEndDate").val();
	
	var rMsg = "";
	
	if(s_strtDt == "" || s_endDt == "")
	{
		rMsg += "날짜가 선택되지않았습니다.";
	}
	else
	{
		s_strtDt = s_strtDt.replace(/[-, :, \s]/g,"");
		s_endDt = s_endDt.replace(/[-, :, \s]/g,"");
	}
	
	if(rMsg != "")
	{
		alert(rMsg);
		return;
	}
	
	$("#csdbalt_tblAltList").jqGrid("setGridParam", {postData : {pJson : getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)}, 
		page : 1, sortname : "WRK_DTTM_FORMAT", sortorder : "DESC"}).trigger("reloadGrid");

}

//초기화버튼 클릭이벤트
function btnInitClickEvent()
{
	initDatePicker();
	
	$("#csdbalt_tblAltList").jqGrid("setGridParam", {postData : {pJson : getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)}, 
		page : 1, sortname : "WRK_DTTM_FORMAT", sortorder : "DESC"}).trigger("reloadGrid");

}

//datePicker 날짜초기화
function initDatePicker()
{
	var today = new Date().toISOString().substring(0, 10);
	
	$("#csdbalt_selStrtDate").val(getPrvDay("Y",5,"-"));
	$("#csdbalt_selEndDate").val(today);
	
	s_strtDt = $("#csdbalt_selStrtDate").val().replace(/-/g,"");
	s_endDt = $("#csdbalt_selEndDate").val().replace(/-/g,"");
}

function initEdit(){
    // DEXT5 에디터 환경셋팅
    DEXT5.config.Width  = "100%";
    DEXT5.config.Mode = 'view';
    DEXT5.config.Height  = "568px";
    DEXT5.config.EditorHolder = "csdbalt_taTbbsCntn";
    new Dext5editor("tbbsCont");
}

function optCounselKnd1ChangeEvent() {
	setObjectSelectBoxWithCode("csdbalt_optCounselKnd2", "전체", "2", g_ListPopup, $("#csdbalt_optCounselKnd1").val(), "", "CHANGE");
}
function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("csdbalt_optCounselKnd3", "전체", "3", g_ListPopup, $("#csdbalt_optCounselKnd2").val(), "", "");
}
$(document).ready(function()
{
	if(opener.opener.document.title == "공무원 업무"){
		g_ListPopup="GCHILD"
	}
	datePicker("#csdbalt_selStrtDate");
	datePicker("#csdbalt_selEndDate");
	
	tbbs_Id = $("#csdbalt_tfTbbsId").val();

	//당일날짜 셋팅
	initDatePicker();
	//리스트 셋팅
	getHistoryList();
	initEdit();	
	setObjectSelectBoxWithCode("csdbalt_optCounselKnd1", "전체", "1", g_ListPopup, "", "", "");	
    $("#csdbalt_optCounselKnd1").bind("change", optCounselKnd1ChangeEvent);
    $("#csdbalt_optCounselKnd2").bind("change", optCounselKnd2ChangeEvent);
    $("#csdbalt_optCounselKnd1").trigger("change");
    
	//검색버튼 클릭이벤트 등록
	$("#csdbalt_btnSearch").bind("click", btnSearchClickEvent);
	//초기화버튼 클릭이벤트 등록
	$("#csdbalt_btnInit").bind("click", btnInitClickEvent);

});
