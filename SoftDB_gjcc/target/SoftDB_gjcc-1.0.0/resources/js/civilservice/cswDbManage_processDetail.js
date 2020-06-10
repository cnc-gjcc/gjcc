var g_popup = "GCHILD";
var fileBox_idx = 0;
var sendingOuCode = opener.sendingOuCode;
var sendingUid = opener.sendingUid;

function getJsonStrShowDetailJisik(tbbsId){
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
	    "map" : {
		"tbbs_id" : tbbsId,
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));	
}

//파라미터셋팅 첨부파일
function getJsonFileList(tbbsId){		
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
    return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrDbProcessUpdate(){
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTAudXBkYXRlSmlzaWs=",
	    "map" : {
		"key" : "value",
		"tbl_pk": opener.$("#sendPopupReq").val(), //id
		"tbl_nm" : "om010", 
		"tbbs_cntn" : DEXT5.getBodyValue(), //내용
		"cdb_gb_cd" : $("#procsDbSe").val(), //상태코드
		"tbbs_ttl" : $("#ProcsJobName").val(), //제목
		// "intv_ex_cd" : $("#procsCnsltKnd1").val(), //기관분류
		// "intv_lg_cd" : $("#procsCnsltKnd2").val(), //대분류
		// "intv_md_cd" : $("#procsCnsltKnd3").val(), //중분류
		// "intv_sm_cd" : $("#procsCnsltKnd4").val(), //소분류
		"intv_lg_cd" : $("#procsCnsltKnd1").val(), //대분류
		"intv_md_cd" : $("#procsCnsltKnd2").val(), //중분류
		"intv_sm_cd" : $("#procsCnsltKnd3").val(), //소분류
		"sendingUid" : sendingUid
	    }
    }
    return encodeURIComponent(JSON.stringify(loParam));
}

function btnUpdateClickEvent(){
    if(!confirm("수정 하시겠습니까?"))
	return;
    gAppendHidden("writeForm", "pJson", getJsonStrDbProcessUpdate());			
    gSubmitPost("writeForm", true);
}

function procsCnsltKnd1_srchChangeEvent(){
    $("#procsCnsltKnd2, #procsCnsltKnd3, #procsCnsltKnd4").empty();
    setObjSelectBoxWithCodeM("procsCnsltKnd2", "전체", "2", g_popup, $("#procsCnsltKnd1").val(),"", "CHANGE");}
function procsCnsltKnd2_srchChangeEvent(){
    $("#procsCnsltKnd3, #procsCnsltKnd4").empty();
    setObjSelectBoxWithCodeM("procsCnsltKnd3", "전체", "3", g_popup, $("#procsCnsltKnd2").val(),"", "CHANGE");}
// function procsCnsltKnd3_srchChangeEvent(){
//     $("#procsCnsltKnd4").empty();
//     setObjSelectBoxWithCodeM("procsCnsltKnd4", "전체", "4", g_popup, $("#procsCnsltKnd3").val(),"", "CHANGE");}


// function setSelectBoxWithCnslCodeSync(code1, code2, code3, code4){
//     $("#procsCnsltKnd1").val(code1).trigger("change");
//     $("#procsCnsltKnd2").val(code2).trigger("change");
//     $("#procsCnsltKnd3").val(code3).trigger("change");
//     $("#procsCnsltKnd4").val(code4);
// }
function setSelectBoxWithCnslCodeSync(code1, code2, code3){
    $("#procsCnsltKnd1").val(code1).trigger("change");
    $("#procsCnsltKnd2").val(code2).trigger("change");
    $("#procsCnsltKnd3").val(code3);
}

function getJisikDetail(tbbsId){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrShowDetailJisik(tbbsId),
	success : function(data){
	    //셀렉트 박스 동기화

	    // var intvExCd = data.INTV_EX_CD;
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;

        // $("#procsCnsltKnd1").val(intvExCd);
        // $("#procsCnsltKnd2").val(intvLgCd);
        // $("#procsCnsltKnd3").val(intvMdCd);
        // $("#procsCnsltKnd4").val(intvSmCd);
	    $("#procsCnsltKnd1").val(intvLgCd);
	    $("#procsCnsltKnd2").val(intvMdCd);
	    $("#procsCnsltKnd3").val(intvSmCd);
	    $("#ProcsJobName").val(data.TBBS_TTL); 																		//업무명
	    DEXT5.setHtmlValue(data.TBBS_CNTN==null?" ":data.TBBS_CNTN, 'taCommCntn');									// 업무절차		
	    $("#procsCharger").html(data.CNTR_NM +" "+data.RSPN_PRSN) 													// 담당자
	    $("#procsDbSe").val(data.CDB_GB_CD); 																		//DB 구분
	    $("#procsRsctDt").html(data.CRT_DT_FORMAT=="--"?"":data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT);			 //등록
	    $("#ProcsUpdtDt").html(data.MOD_DT_FORMAT=="--"?"":data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT); 			//수정
        // setSelectBoxWithCnslCodeSync(intvExCd, intvLgCd, intvMdCd, intvSmCd);
	    setSelectBoxWithCnslCodeSync(intvLgCd, intvMdCd, intvSmCd);
	    $("#procsRequstSe").html(opener.$("#sendPopupIngStat").val()); 							// 요청구분
	    $("#procsIngStat").html(opener.$("#sendPopupRequSe").val());	   						// 진행상태		
	    $("#procschangeRea").html(opener.$("#sendPopupChageRea").val()); 							// 변경사유

	    //파일첨부
	    showAttachFiles(tbbsId);
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

function requstHis_popupEvent(){
    var width = 900;
    var height = 831;
    var top = 0;
    var left = Math.ceil((window.screen.width - width)/2);
    // var top = Math.ceil((window.screen.height - height)/2);

    var paramURL = "/web/civilservice/cswDbManage_processDetailHist.do"
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";
    var newWindow = window.open(paramURL, "이관이력보기", option);
    newWindow.focus();	
}


//----------------------------------파일 관련-------------------------------------------------

//첨부파일 박스추가
function addFileBox(){
    if (fileBox_idx >= 2){
	alert("첨부파일은 최대 3개까지 가능합니다.");
    }else{
	var html = $("#fileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++fileBox_idx);
	$("#procsFiles").append(html);
    }
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
    return encodeURIComponent(JSON.stringify(loParam));
}

//첨부파일박스 삭제
function removeFileBox(i){
    var el = $("#procsFiles input[name=record_" + i + "]");
    el.parent().parent().remove();
    fileBox_idx--;
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc){
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
//첨부파일 
function showAttachFiles(tbbsId){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonFileList(tbbsId),
	success : function(data){
	    for(var i in data){
		var url = "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

		var tr = "<tr>";
		tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
		tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
		tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
		tr += "</tr>";

		fileBox_idx++;
		$("#procsFiles").prepend(tr);
	    }

	    if(fileBox_idx >= 3){
		$("#MANUAL").prop("disabled", true);
		$("#rmFilebox").prop("disabled", true);
	    }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

//eidt 로드 완료시 세부내용등록
function dext_editor_loaded_event(editor) {
    getJisikDetail(opener.$("#sendPopupReq").val());
} 	

function calledit(){
    DEXT5.config.userFontSize = "10";
    DEXT5.config.Width  = "100%";
    DEXT5.config.Mode = 'edit';
    DEXT5.config.Height  = "586px";
    DEXT5.config.zStatusBar = "1";
    DEXT5.config.zTopMenu = "1";
    DEXT5.config.zToolBar  = "1";	
    DEXT5.config.SkinName = "gray";
    DEXT5.config.EditorHolder = "taCommCntn";
    new Dext5editor("commCntn");

}

//특수문자 변환 - 미사용
function unhtmlspecialchars(value) { 
    var strr= value.replace(/&amp;/g, '&'); 
    strr = strr.replace( /&#039;/g, '\''); 
    strr =strr.replace( /&quot;/g, '\"'); 
    strr =strr.replace( /&lt;/g, '<'); 
    strr =strr.replace(/&gt;/g, '>'); 
    return strr 
} 

//init page
$(document).ready(function(){
    //셀렉트box 등록
    
    setObjSelectBoxWithCodeM("procsCnsltKnd1", "전체", "", g_popup, "00000000", "", "CHANGE");
    setSelectBoxWithCode2("procsDbSe", "전체", "90303", g_popup, "", "");	  
    //이벤트 등록
    $("#procsCnsltKnd1").bind("change", procsCnsltKnd1_srchChangeEvent);
    $("#procsCnsltKnd2").bind("change", procsCnsltKnd2_srchChangeEvent);
    // $("#procsCnsltKnd3").bind("change", procsCnsltKnd3_srchChangeEvent);
    $("#btnProsInsert").bind("click", btnUpdateClickEvent);
    $("#btnProcsDbRecode").bind("click", requstHis_popupEvent);
});


// common midi
function setObjSelectBoxWithCodeM(selectId, allText, codeType, parentType, parentCode, startValue) {
    var tempObj = {};
    if (parentType == "CHILD") {
	tempObj = g_IntvObectCode2[parentCode];
    } else if (parentType == "GCHILD") {
	tempObj = window.opener.g_IntvObectCode2[parentCode]; // 변경
    } else if (parentType == "G-GCHILD") {
	tempObj = window.opener.opener.g_IntvObectCode2[parentCode]; // 변경
    } else {
	tempObj = g_IntvObectCode[parentCode];
    }
    var localvarParent = "";
    var $selectId = $("#" + selectId);
    var value = "";

    if (!tempObj) {
	var parentChk = parentCode;
	if (codeType == "4") {
	    parentChk = "all";
	}
	if (parentChk == "all") {
	    $selectId.html("");
	    value += "<option value='all' selected>" + allText + "</option>";
	    $selectId.append(value);
	    $selectId.val(parentChk);
	    $selectId.trigger("change");
	    $selectId.trigger("load");
	}
	return;
    }
    if (tempObj == undefined) {
	value += "<option value='all' selected>미선택</option>";
	return;
    }
    $selectId.html("");
    $.each(tempObj, function(key, val) {
	if (localvarParent != parentCode) {
	    localvarParent = parentCode;
	    if (allText == "전체") {
		value += "<option value='all' selected>전체</option>";
	    } else if (allText == "미선택") {
		value += "<option value='all' selected>미선택</option>";
	    }
	}
	if (val.use_yn != "Y") {
	    value += "<option value='" + val.cd + "' disabled>" + val.cd_nm
	    + "</option>";
	} else {
	    value += "<option value='" + val.cd + "'>" + val.cd_nm
	    + "</option>";
	}
    });

    $selectId.append(value);
    if (startValue != "")
	$selectId.val(startValue);
    $selectId.trigger("change");
    $selectId.trigger("load");
}


