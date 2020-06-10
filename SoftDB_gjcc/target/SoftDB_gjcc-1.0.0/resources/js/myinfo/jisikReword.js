var g_srchIntvLgCd = "all";			// 상담유형(대분류)
var g_srchIntvMdCd = "all";			// 상담유형(중분류)
var g_srchIntvSmCd = "all";			// 상담유형(소분류)
//var g_srchIntvExCd = "all"; 			// 상담유형(특분류)
var g_popup="CHILD";

var fileBox_idx = 0;				
var fileForm = "";				
var g_srchVal = "";					
var hisGrfrstNm="";
var hisTbbs_id=null;
var jisikTbbsId=true;

//authority
var dbGrade ="user";				
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var usrId = window.sessionStorage.getItem("USR_ID");
var usrNm = window.sessionStorage.getItem("USR_NM");

// om010.selectJisikList left view 
//function getJsonStrManualList(g_srchIntvExCd, g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, srchVal){
function getJsonStrManualList(g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, srchVal){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
	    "map" : {
		"key" : "value",
		// "ctg_ex_cd" :	g_srchIntvExCd,
		"ctg_lg_cd" : g_srchIntvLgCd,
		"ctg_md_cd" : g_srchIntvMdCd,
		"ctg_sm_cd" : g_srchIntvSmCd,	
		"srch_type" : "ttl",			
		"srch_val" : srchVal,          
		"show_all" : false,
		"cdb_gb_cd": $("#jisikr_optGbKnd_srch").val(),
		"chkNotUsetype": $("#jisikr_chkNotUsetype").val(),
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
}


//om015 sequence increse
function getNextValue(){
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTUubmV4dHZhbA==",
	    "map" : {}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}


//detail
function getJsonStrShowDetailManual(tbbsId){
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
	    "map" : {
		"tbbs_id" : tbbsId			
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
}

//file download 
function getJsonFileDownload(svr, loc){
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
//파라미터 셋팅_SendSms
function getJsonStrRsltAlrmSendSms(){
	
	
	var sndPhoneNum = $("#jisikr_tfResponTel").val().replace(/-/gi, "");
	//var snd_resv_dt = getDate().replace(/-/gi, "");
	//var snd_resv_tm = getTimesec().replace(/-|:/gi, "");
	var callback="0319802114";
						
	 if($("#jisikr_counselDbNewRegist").prop('checked')){
			sendMsg = "콜센터로부터 신규DB요청이 접수되었습니다. 확인부탁드립니다."		 
	 }else if($("#jisikr_counselDbModifyRegist").prop('checked')){
			sendMsg = "콜센터로부터 수정DB요청이 접수되었습니다. 확인부탁드립니다."
	 }else if($("#jisikr_counselDbDelete").prop('checked')){
			sendMsg = "콜센터로부터 삭제DB요청이 접수되었습니다. 확인부탁드립니다."		 
	 }
	 
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFNtcw==",
		"map" : {
			"key" : "value",
			//"ch_snd_id" : ch_snd_id,
			"tckt_id" : "",
			"cust_id" : $("#jisikr_ChargerUsrId").val(),
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#jisikr_tfResponTel").val().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : sendMsg,
			"snd_resv_dt" : "",
			"snd_resv_tm" : "",
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : "sysmanager",
			"cro_id" : "2ksys_test",
			//"schedule_type" : sendDate==""?"0":"1",
			"subject" : "공주시청컨텍센터",
			"callback" : callback,
			"dest_info" : sndPhoneNum.replace(/-/gi, ""),
			"cont_length" : parseInt(charByteSize(sendMsg)), 
			//"tbl_nm" : "ch020",
			//"tbl_pk": ch_snd_id,
			"send_img" : ""
			//"message" : "발송요청이 완료되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//insert  om010.insertJisik
function getJsonStrInsertManual(tbbsId) {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuaW5zZXJ0SmlzaWs=",
	    "map" : {
		"tbl_pk" : tbbsId,
		"tbl_nm" : "om010",
		"tbbs_cntn" : " ",
		"cdb_gb_cd" : $("#jisikr_optGbKnd_sc").val(),
		"tbbs_ttl" : " ",
		// "intv_ex_cd" : $("#jisikr_optCounselKnd1_sc").val(),
		// "intv_lg_cd" : $("#jisikr_optCounselKnd2_sc").val(),
		// "intv_md_cd" : $("#jisikr_optCounselKnd3_sc").val(),
		// "intv_sm_cd" : $("#jisikr_optCounselKnd4_sc").val(),
		"intv_lg_cd" : $("#jisikr_optCounselKnd1_sc").val(),
		"intv_md_cd" : $("#jisikr_optCounselKnd2_sc").val(),
		"intv_sm_cd" : $("#jisikr_optCounselKnd3_sc").val(),
		"use_yn" : "Y",
    		"sendingUid" : usrId,
    		"wrk_cl" : "상담DB신규등록",
    		"cc_appr_yn" :"N"
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//next value
function getNextValue2() {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAubmV4dHZhbA==",
	    "map" : {}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

// insertComments 
function getJsonStrInsertComment(req_id) {
    var flag="";
    
    //신규DB요청시 새로운 상담DB를 미리 생성
    if($("#jisikr_counselDbNewRegist").prop('checked')){
	flag="010100";
    }else if($("#jisikr_counselDbModifyRegist").prop('checked')){ flag="020100";}
     else if($("#jisikr_counselDbDelete").prop('checked')){	flag="030100";}
    var ccAffir = $("#jisikr_CCAffair").val()!=null?$("#jisikr_CCAffair").val():"N";
    var actstcd = "010100";
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTUuamlzaWtSZXdvcmRJbnNlcnQ=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "om015",
		"tbl_pk" : req_id,
		"req_id" : req_id, 								//sequence							
		"tbbs_id" :$("#jisikr_tfTbbsId").val(),
		"org_id" : $("#jisikr_ChargerDeptId").val(),
		"affs_org_usr_id" : $("#jisikr_ChargerOrgUsrId").val(),				//기관사용자ID
		"cdb_gb_cd" : $("#jisikr_optGbKnd_sc").val(),						//DB구분
		// "intv_ex_cd" : $("#jisikr_optCounselKnd1_sc").val(), 					//기관코드
		// "intv_lg_cd" : $("#jisikr_optCounselKnd2_sc").val(), 					//대분류
		// "intv_md_cd" : $("#jisikr_optCounselKnd3_sc").val(), 					//중분류
		// "intv_sm_cd" : $("#jisikr_optCounselKnd4_sc").val(), 					//소분류
		"intv_lg_cd" : $("#jisikr_optCounselKnd1_sc").val(), 					//대분류
		"intv_md_cd" : $("#jisikr_optCounselKnd2_sc").val(), 					//중분류
		"intv_sm_cd" : $("#jisikr_optCounselKnd3_sc").val(), 					//소분류
		"comm_cntn" : DEXT5.getBodyValue("commCntn"),					//요청내용
		"comm_ttl" : $("#jisikr_taCommTtl").val(),						//제목부분
		"new_yn" : flag,								//신규여부 
		"cdb_act_st_cd" : actstcd,							//신규.
		"ccaffir" : ccAffir,
		
		//history
		"usr_id2" :	$("#jisikr_ChargerUsrId").val(),
		"org_id2" :	 $("#jisikr_ChargerDeptId").val(),
		"org_usr_id2" :	$("#jisikr_ChargerOrgUsrId").val(),					//기관사용자id
		"org_ful_nm2" :	$("#jisikr_ChargerOrgFulNm").val(),     				//기관사용자nm
		"rtn_rsn2" : hisGrfrstNm+"님에게 접수되었습니다.",
		"message" : "요청되었습니다."
	    }
    }
    //신규 요청일경우
    if(flag=="010100"){
	loParam['map']['tbbs_id']=jisikTbbsId;
    }else if(flag=="010100" && jisikTbbsId==null){
	loParam['map']['tbbs_id']="";
    }
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}


// attached file
function showAttachFiles(tbbsId){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/management/fileList.do",
	data : "pJson=" + getJsonFileList(tbbsId),
	success : function(data){
	    $("#jisikr_tblFiles").html(""); 
	    if(data != null && data != ""){
		var tr ="";
		for(var i in data){
		    var url = getContextPath() + "/file/board/jisikSearchFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    tr += "<tr>";
		    tr += "<td><span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a>" +" "+ data[i].FL_KB_SZ + "</span></td>";
		    tr += "</tr>";
		}
		$("#jisikr_tblFiles").append(tr); 					
	    }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

//file list
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
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//file add
function addFileBox(){
    if (fileBox_idx >= 2){
	alert("첨부파일은 최대 3개까지 가능합니다.");
    }else{
	var html = $("#jisikr_hisfileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++fileBox_idx);
	$("#jisikr_fileInfos").append(html);
    }
}

//첨부파일박스삭제- .JSP
function removeHisFileBox(i)
{
  var el = $("#jisikr_writeForm input[name=record_" + i + "]");
  el.parent().parent().remove();
  fileBox_idx--;
  
  if(fileBox_idx > 2){
	 $("#jisikr_hisFileInfos tr:last-child").css("display","none");
 }else{
	$("#jisikr_hisFileInfos").css("display","block");
 }
}


//file del
function removeFileBox(i){
    var el = $("#jisikr_writeForm input[name=record_" + i + "]");
    el.parent().parent().remove();
    fileBox_idx--;
}

function MnnstDept_ClickEvent(){
	window.sessionStorage.setItem("fromFlag", "fromJisikReword");
	window.sessionStorage.setItem("corpOpenType","callCorp");
	//var paramURL = getContextPath() + "/web/counsel/organizationChart.do";
	//gf_openDialog(paramURL,screen.width,982,"yes","yes");
	openMenuPopup("CM0311");
}


function fnSetOrgJisikRewordTrans(objInfo){
   
	var agencyCategory = objInfo.CATEGORY; 
	hisGrfrstNm =objInfo.DEPT_NM+">"+objInfo.USR_NM;
	if(agencyCategory =="AA"){
		$("#jisikr_ChargerDeptId").val(objInfo.DEPT_CD);
		$("#jisikr_MnnstDept, #jisikr_ChargerOrgFulNm").val(objInfo.DEPT_NM);
		$("#jisikr_ChargerUsrId, #jisikr_ChargerOrgUsrId").val(objInfo.USR_ID);
		$("#jisikr_Charger").html(objInfo.USR_NM);
		$("#jisikr_CCAffair").val(objInfo.CC_AFFAIRS_YN);		
		//$("#jisikr_tfResponTel").val(objInfo.TEL_NO);	
		$("#jisikr_tfResponTel").val(objInfo.MOBILE);
	}else if(agencyCategory =="CC"){
		$("#jisikr_ChargerDeptId").val(objInfo.TEAM_CD);
		$("#jisikr_MnnstDept").val(objInfo.TEAM_NM);
		$("#jisikr_ChargerUsrId, #jisikr_ChargerOrgUsrId").val(objInfo.USR_ID);
		$("#jisikr_Charger").html(objInfo.USR_NM);
		//$("#jisikr_tfResponTel").val(objInfo.TEL_NO);
		$("#jisikr_tfResponTel").val(objInfo.MOBILE);
	}else if(agencyCategory =="EA"){
		$("#jisikr_ChargerDeptId").val("externAgency");
		$("#jisikr_MnnstDept, #jisikr_ChargerOrgFulNm").val(objInfo.TEAM_NM);
		$("#jisikr_ChargerUsrId, #jisikr_ChargerOrgUsrId").val(objInfo.USR_ID);
		$("#jisikr_Charger").html(objInfo.USR_NM);
		//$("#jisikr_tfResponTel").val(objInfo.TEL_NO);
		$("#jisikr_tfResponTel").val(objInfo.MOBILE);
	}
}

//deptGrf autocomplete
function MnnstDept_TextChangeEvent(){

    $( "#jisikr_MnnstDept").autocomplete({
	source : function( request, response ) {
	    $.ajax({
		type: 'post',
		url: "/ajax/myinfo/jisikReword.do",
		dataType: "json",
		data: "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjEuamlzaWtSZXdvcmRIaXNHcmZyc0xpc3Q=",  {
		    "key" : "value",
		    "userfullname" : $("#jisikr_MnnstDept").val()
		}),
		success: function(data) {
		    response($.map(data, function(item) {	                            
			return {
			    label: item.USERFULLNAME,
			    value: item.USERFULLNAME,
			    id : item
			}
		    })
		    );
		}, error:function(e){  
		 //   alert("자동완성을 사용할 수 없습니다.");  
		}  
	    });
	},
	minLength: 1,
	focus: function(event, ui) {
	    return false; 
	},
	select: function(event, ui) {
	    var uid =ui.item.id.UID_;						
	    var displayname =ui.item.id.DISPLAYNAME;	
	    var deptNm=ui.item.id.OU;
	    var deptid =ui.item.id.OUCODE;					
	    hisGrfrstNm =deptNm+">"+displayname;
	    $("#jisikr_Charger").html(displayname);	        	
	    $("#jisikr_ChargerUsrId").val(usrId);  					
	    $("#jisikr_ChargerOrgUsrId").val(uid);  
	    $("#jisikr_ChargerDeptId").val(deptid);
	    $("#jisikr_ChargerOrgFulNm").val(displayname);  
	}
    });
}


//detail
function showDetailManual(tbbsId){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/management/jisikDetail.do",
	data : "pJson=" + getJsonStrShowDetailManual(tbbsId),
	success : function(data){
	    $("#jisikr_tfTbbsId").val(data.TBBS_ID);											
	    // var intvExCd = data.INTV_EX_CD;
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;
	    
	    $("#jisikr_tfTbbsTtl").html(data.TBBS_TTL);                                        
	    $("#jisikr_taCommTtl").val(data.TBBS_TTL);											
	    DEXT5.setBodyValue(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'tbbsCont'); 	
//	    DEXT5.setHtmlContentsEw(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'tbbsCont'); 	

	    $("#jisikr_appr_yn").html(data.ARR_YN);
	    $("#jisikr_tfCntrNm").html(data.CNTR_NM);
	    $("#jisikr_tfRespNm").html(data.RSPN_PRSN);
	    //$("#jisikr_tfResponTel").html("");
	    $("#jisikr_tfRespTel").html(data.RESPON_TEL);
	    $("#jisikr_optGbKnd").val(data.CDB_GB_CD);
	    $("#jisikr_optGbKnd_sc").val(data.CDB_GB_CD);
	    var crt =data.CRT_USR_NM?data.CRT_USR_NM:"";
	    var mod =data.MOD_USR_NM?data.MOD_USR_NM:"";
	    $("#jisikr_RsctDt").html(data.CRT_DT_FORMAT +" " + data.CRT_TM_FORMAT+" "+crt);
	    $("#jisikr_UpdtDt").html(data.MOD_DT_FORMAT +" " + data.MOD_TM_FORMAT+" "+mod);
	    //sync
        	// setSelectBoxWithCnslCodeSync(intvExCd, intvLgCd, intvMdCd, intvSmCd);
    	    setSelectBoxWithCnslCodeSync(intvLgCd, intvMdCd, intvSmCd);
    	    if(data.ARR_YN == '미승인') $("#jisikr_appr_yn").css("color","red");
	    else  $("#jisikr_appr_yn").css("color","black");
			// if($("#jisikr_optCounselKnd1_sc").val() == "all" || $("#jisikr_optCounselKnd1_sc").val() == null || $("#jisikr_optCounselKnd2_sc").val() == "all" || $("#jisikr_optCounselKnd2_sc").val() == null
			// 	|| $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null || $("#jisikr_optCounselKnd4_sc").val() == "all" || $("#jisikr_optCounselKnd4_sc").val() == null ){
    	    if($("#jisikr_optCounselKnd1_sc").val() == "all" || $("#jisikr_optCounselKnd1_sc").val() == null || $("#jisikr_optCounselKnd2_sc").val() == "all" || $("#jisikr_optCounselKnd2_sc").val() == null 
    		    || $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null ){
    		$(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", false);
    		$("#jisikr_tfLgMdSmSearch_01").prop("disabled",false);
    	    }
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}

//셀렉트박스 데이터셋팅
function initSelectData(){
    // $("#jisikr_optCounselKnd1_srch, #jisikr_optCounselKnd2_srch, #jisikr_optCounselKnd3_srch, #jisikr_optCounselKnd4_srch").empty();
    // $("#jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").empty();
    // $("#jisikr_optCounselKnd1, #jisikr_optCounselKnd2, #jisikr_optCounselKnd3, #jisikr_optCounselKnd4").empty();
    $("#jisikr_optCounselKnd1_srch, #jisikr_optCounselKnd2_srch, #jisikr_optCounselKnd3_srch").empty();
    $("#jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").empty();
    $("#jisikr_optCounselKnd1, #jisikr_optCounselKnd2, #jisikr_optCounselKnd3").empty();

    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd1_srch", "전체", "1", g_popup, "00000000", "", "CHANGE");	
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd1_sc", "전체", "1", g_popup, "00000000", "", "CHANGE");	
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd1", "전체", "1", g_popup, "00000000", "", "CHANGE");	

    setObjSelectBoxWithCodePop("jisikr_optGbKnd", "", "90303", g_popup, "90303", "");	    								  
    setObjSelectBoxWithCodePop("jisikr_optGbKnd_sc", "", "90303", g_popup, "90303", "");	   									 
    setObjSelectBoxWithCodePop("jisikr_optGbKnd_srch", "전체", "90303", g_popup, "90303", "");	   
}

//기관분류 셀렉트 박스
function optCounselKnd1_srchChangeEvent(){
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd2_srch", "전체", "2", g_popup, $("#jisikr_optCounselKnd1_srch").val(),"", "CHANGE");}
function optCounselKnd2_srchChangeEvent(){
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd3_srch", "전체", "3", g_popup, $("#jisikr_optCounselKnd2_srch").val(),"", "CHANGE");}
// function optCounselKnd3_srchChangeEvent(){
//     setObjectSelectBoxWithCode2Pop("optCounselKnd4_srch", "전체", "4", g_popup, $("#jisikr_optCounselKnd3_srch").val(),"", "");
// }


function optCounselKnd1_scChangeEvent(){
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd2_sc", "전체", "2", g_popup, $("#jisikr_optCounselKnd1_sc").val(),"", "CHANGE");}
function optCounselKnd2_scChangeEvent(){
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd3_sc", "전체", "3", g_popup, $("#jisikr_optCounselKnd2_sc").val(),"", "CHANGE");}
// function optCounselKnd3_scChangeEvent(){
//     setObjectSelectBoxWithCode2Pop("optCounselKnd4_sc", "전체", "4", g_popup, $("#jisikr_optCounselKnd3_sc").val(),"", "");}


function optCounselKnd1_ChangeEvent(){
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd2", "전체", "2", g_popup, $("#jisikr_optCounselKnd1").val(),"", "CHANGE");}
function optCounselKnd2_ChangeEvent(){
    setObjectSelectBoxWithCode2Pop("jisikr_optCounselKnd3", "전체", "3", g_popup, $("#jisikr_optCounselKnd2").val(),"", "CHANGE");}
// function optCounselKnd3_ChangeEvent(){
//     setObjectSelectBoxWithCode2Pop("optCounselKnd4", "전체", "4", g_popup, $("#jisikr_optCounselKnd3").val(),"", "");}


//insert. db request
function btnInsertCommentClickEvent() {
    var rMsg = validatorRe();
    if(rMsg != ""){
	alert(rMsg);
	return;
    }
    if($("#jisikr_counselDbNewRegist").prop("checked")){
    $.ajax({
	    type : "post",
	    dataType : "json",
	    async : false,
	    url : getContextPath() + "/ajax/civilservice/csw.do",
	    data : "pJson=" + getNextValue2(),
	    success : function(data) {
		jisikTbbsId = data.TBBS_ID+"";
		gAppendHidden("writeForm", "pJson", getJsonStrInsertManual(data.TBBS_ID));
		gSubmitPost("writeForm", true);
	     },
	    error : function(data, status, err) {
		jisikTbbsId=null;
		//networkErrorHandler(data, status, err);
	    }
	});
    }else{
	jisikTbbsId==true;
    }
    
    if(jisikTbbsId==null){
	alert("요청할수 없습니다.");
	return;
    }
    
    $.ajax({
	type : "post",
	dataType : "json",
	async : false,
	url : getContextPath() + "/ajax/management/insertManual.do",
	data : "pJson=" + getNextValue(),
	success : function(data){
	    gAppendHidden("jisikr_writeForm", "pJson", getJsonStrInsertComment(data.REQ_ID));	  	//req id를 받고 
	    gSubmitPost("jisikr_writeForm", true);							//보내버려
	    $.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/main/setRsltAlrmSendSms.do",
			data : "pJson=" +  getJsonStrRsltAlrmSendSms(),
			success : function(data){
		//		 console.log("sms["+ch_snd_id+"] "+(i+1)+"/"+sendCount+"건 번호:"+sendNum[i]+", "+sendMsg[i]);
			},
			error : function(data, status, err) {								
				networkErrorHandler(data, status, err);
			}
		});	//ajax	
	    btnInitClickEvent();
	    $("#jisikr_tfLgMdSmSearch_01").prop("disabled",false);
	    // $("#jisikr_taCommTtl, #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").prop("disabled", false);
        $("#jisikr_taCommTtl, #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", false);
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}

//radio click event
function radioBtn_clickEvent(e) {
    $("#jisikr_tfLgMdSmSearch_01").prop("disabled",true);
    switch (e.target.id) {
    case "jisikr_counselDbNewRegist":
	 $("#jisikr_tfLgMdSmSearch_01").prop("disabled",false);
	// $("#jisikr_taCommTtl, #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").prop("disabled", false);
	$("#jisikr_taCommTtl, #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", false);
	$("#jisikr_taCommTtl").prop("readonly", false);
	$("#jisikr_taCommTtl").css("color", "black");
	hisTbbs_id=null;
	$("#jisikr_tfTbbsId").val("");
	break;
    case "jisikr_counselDbModifyRegist":
	// $(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").prop("disabled", true);
	$(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", true);
	$("#jisikr_taCommTtl").prop("readonly", true);
	$("#jisikr_taCommTtl").css("color", "#jisikr_6D6D6D");
	break;
    case "jisikr_counselDbDelete":
	// $(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").prop("disabled", true);
	$(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", true);
	$("#jisikr_taCommTtl").prop("readonly", true);
	$("#jisikr_taCommTtl").css("color", "#jisikr_6D6D6D");

	// 	|| $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null || $("#jisikr_optCounselKnd4_sc").val() == "all" || $("#jisikr_optCounselKnd4_sc").val() == null ){
	// 	$(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").prop("disabled", false);
	if($("#jisikr_optCounselKnd1_sc").val() == "all" || $("#jisikr_optCounselKnd1_sc").val() == null || $("#jisikr_optCounselKnd2_sc").val() == "all" || $("#jisikr_optCounselKnd2_sc").val() == null 
    		    || $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null ){
    		$(" #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", false);
    		$("#jisikr_tfLgMdSmSearch_01").prop("disabled",false);
    	}
	break;
    default:
	break;
    }
}

// initialize
function initContent(){
    document.getElementById("jisikr_counselDbNewRegist").checked = true;   			        	//신규요청 체크
    $("#jisikr_tfSrchVal, #jisikr_RequstDate, #jisikr_Charger, #jisikr_MnnstDept").val(""); 			        	//요청날자 담당자 담당부서
    $("#jisikr_taCommTtl, #jisikr_tfTbbsId").val(""); 						    		//제목, tbbsid 초기화
    DEXT5.setBodyValue('', 'commCntn');  						   		//왼쪽 텍스트 박스 초기화
    $("#jisikr_tblFiles").empty().html("");
    $("#jisikr_optGbKnd").val("040101");									 //DB 구분코드
    $("#jisikr_Charger").html("");

    DEXT5.setBodyValue('', 'tbbsCont');  						 		//오른쪽 텍스트 박스 초기화
    $("#jisikr_tfTbbsTtl, #jisikr_tfResponTel,#jisikr_RsctDt, #jisikr_UpdtDt ,#jisikr_tfRespNm ,#jisikr_tfCntrNm,#jisikr_appr_yn").html(""); 		//업무명, 전화번호, 담당자, 담당부서	
}

//search event
function btnSearchClickEvent(){
    // g_srchIntvExCd = $("#jisikr_optCounselKnd1_srch").val();
    // g_srchIntvLgCd = $("#jisikr_optCounselKnd2_srch").val();
    // g_srchIntvMdCd = $("#jisikr_optCounselKnd3_srch").val();
    // g_srchIntvSmCd = $("#jisikr_optCounselKnd4_srch").val();
    g_srchIntvLgCd = $("#jisikr_optCounselKnd1_srch").val();
    g_srchIntvMdCd = $("#jisikr_optCounselKnd2_srch").val();
    g_srchIntvSmCd = $("#jisikr_optCounselKnd3_srch").val();
    g_srchVal = $("#jisikr_tfSrchVal").val();

    // $("#jisikr_tblManualList").jqGrid("setGridParam", {postData : {pJson : getJsonStrManualList(g_srchIntvExCd, g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, g_srchVal)}, page : 1, sortname : "crt_dttm desc, mod_dttm", sortorder : "desc"});
    $("#jisikr_tblManualList").jqGrid("setGridParam", {postData : {pJson : getJsonStrManualList(g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, g_srchVal)}, page : 1, sortname : "crt_dttm desc, mod_dttm", sortorder : "desc"});
    $("#jisikr_tblManualList").trigger("reloadGrid");
}

//sync
// function setSelectBoxWithCnslCodeSync(code1, code2, code3, code4){
function setSelectBoxWithCnslCodeSync(code1, code2, code3){
    // $("#jisikr_optCounselKnd1_sc").val(code1).trigger("change");
    // $("#jisikr_optCounselKnd2_sc").val(code2).trigger("change");
    // $("#jisikr_optCounselKnd3_sc").val(code3).trigger("change");
    // $("#jisikr_optCounselKnd4_sc").val(code4);
    $("#jisikr_optCounselKnd1_sc").val(code1).trigger("change");
    $("#jisikr_optCounselKnd2_sc").val(code2).trigger("change");
    $("#jisikr_optCounselKnd3_sc").val(code3);

    // $("#jisikr_optCounselKnd1").val(code1).trigger("change");
    // $("#jisikr_optCounselKnd2").val(code2).trigger("change");
    // $("#jisikr_optCounselKnd3").val(code3).trigger("change");
    // $("#jisikr_optCounselKnd4").val(code4);
    $("#jisikr_optCounselKnd1").val(code1).trigger("change");
    $("#jisikr_optCounselKnd2").val(code2).trigger("change");
    $("#jisikr_optCounselKnd3").val(code3);
}

// function setSelectBoxWithCnslCodeSync3(code1, code2, code3, code4){
function setSelectBoxWithCnslCodeSync3(code1, code2, code3){
    // $("#jisikr_optCounselKnd1_srch").val(code1).trigger("change");
    // $("#jisikr_optCounselKnd2_srch").val(code2).trigger("change");
    // $("#jisikr_optCounselKnd3_srch").val(code3).trigger("change");
    // $("#jisikr_optCounselKnd4_srch").val(code4);
    $("#jisikr_optCounselKnd1_srch").val(code1).trigger("change");
    $("#jisikr_optCounselKnd2_srch").val(code2).trigger("change");
    $("#jisikr_optCounselKnd3_srch").val(code3);
}

//init event
function btnInitClickEvent() {
    initSelectData();       		
    initContent();
    jisikTbbsId=true;
    $("#jisikr_tfLgMdSmSearch_01").prop("disabled",false);
    // $("#jisikr_taCommTtl, #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc, #jisikr_optCounselKnd4_sc").prop("disabled", false);
    $("#jisikr_taCommTtl, #jisikr_optGbKnd_sc, #jisikr_optCounselKnd1_sc, #jisikr_optCounselKnd2_sc, #jisikr_optCounselKnd3_sc").prop("disabled", false);
    $("#jisikr_taCommTtl").prop("readonly", false);
    $("#jisikr_taCommTtl").css("color", "black");
    hisTbbs_id=null;
    $("#jisikr_tfTbbsId").val("");
    // $("#jisikr_tblManualList").jqGrid("setGridParam", {postData : {pJson : getJsonStrManualList(g_srchIntvExCd, g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, g_srchVal)}, page : 1, sortname : "crt_dttm desc, mod_dttm", sortorder : "desc"});
    $("#jisikr_tblManualList").jqGrid("setGridParam", {postData : {pJson : getJsonStrManualList(g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, g_srchVal)}, page : 1, sortname : "crt_dttm desc, mod_dttm", sortorder : "desc"});
    $("#jisikr_tblManualList").trigger("reloadGrid");
}

function validatorRe(){
    var rMsg = "";
    if($("#jisikr_counselDbModifyRegist").prop('checked')& hisTbbs_id==null){ 
	return rMsg="상담DB를 선택해주세요.";
    }
    if($("#jisikr_counselDbDelete").prop('checked')& hisTbbs_id==null){
	return rMsg="상담DB를 선택해주세요.";
    }
    
	    
    if($("#jisikr_optCounselKnd1_sc").val() == "all" || $("#jisikr_optCounselKnd1_sc").val() == null || $("#jisikr_optCounselKnd2_sc").val() == "all" || $("#jisikr_optCounselKnd2_sc").val() == null
        // || $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null || $("#jisikr_optCounselKnd4_sc").val() == "all" || $("#jisikr_optCounselKnd4_sc").val() == null ){
	    || $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null ){
	rMsg += "\n상담유형을 선택해주세요."; return rMsg;}
    
    if($("#jisikr_taCommTtl").val() == ""){
	rMsg += "제목을 입력해 주세요."; return rMsg;}

    if($("#jisikr_optCounselKnd1_sc").val() == "all" || $("#jisikr_optCounselKnd1_sc").val() == null || $("#jisikr_optCounselKnd2_sc").val() == "all" || $("#jisikr_optCounselKnd2_sc").val() == null 
	    // || $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null || $("#jisikr_optCounselKnd4_sc").val() == "all" || $("#jisikr_optCounselKnd4_sc").val() == null ){
    	|| $("#jisikr_optCounselKnd3_sc").val() == "all" || $("#jisikr_optCounselKnd3_sc").val() == null ){
	rMsg += "\n상담유형을 선택해주세요."; return rMsg;}

    if($("#jisikr_Charger").text()=='' || $("#jisikr_Charger").text()==null || $("#jisikr_Charger").text()==undefined || $("#jisikr_Charger").text()==0 || $("#jisikr_Charger").text()==NaN){
	rMsg += "\nDB 서무를 지정해주세요."; return rMsg;}

    var commCntn = DEXT5.getBodyTextValue("commCntn");
    
    if(commCntn == "") {
	rMsg += "\n내용이 없습니다."; return rMsg;
    }

    //file upload capacity check
    var nLimitSize = 10; 							//제한사이즈 MB
    var formName = $("#jisikr_writeForm input[name=MANUAL]");
    for(var i=0; i<formName.length; i++){
	if(formName[i].value !=""){
	    var nRtn=fileCheck(formName[i] , nLimitSize);
	    if(nRtn>nLimitSize){ 
		rMsg += "\n\n("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.";
	    }
	    //file extension check
	    if (fileExtnsCheck(formName[i]) == false)
		rMsg += "\n\n[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
	}
    }
    return rMsg;
}

function initEdit(){
    // DEXT5 에디터 환경셋팅
    DEXT5.config.Width  = "100%";
    DEXT5.config.Mode = 'view';
    DEXT5.config.Height  = "618px";
    DEXT5.config.EditorHolder = "jisikr_taTbbsCntn";
    new Dext5editor("tbbsCont");

    // DEXT5 에디터 환경셋팅
    DEXT5.config.userFontSize = "10";
    DEXT5.config.Width  = "100%";
    DEXT5.config.Mode = 'edit';
    DEXT5.config.Height  = "160px";
    DEXT5.config.zStatusBar = "1";
    DEXT5.config.zTopMenu = "1";
    DEXT5.config.zToolBar  = "1";	
    DEXT5.config.SkinName = "gray";
    DEXT5.config.EditorHolder = "jisikr_taCommCntn";
    new Dext5editor("commCntn");
}

//init page
$(document).ready(function(){
   
    initEdit();
    
    //팝업설정
    g_popup=$("#jisikr_tfPopLv").val();
    
    var jojik={};
    	jojik.detpNm=window.sessionStorage.getItem("setReqDbDetpNm");
    	jojik.deptId=window.sessionStorage.getItem("setReqDbDeptId");
    	jojik.dbUsrNm=window.sessionStorage.getItem("setReqDbUsrNm");
    	jojik.dbUsrId=window.sessionStorage.getItem("setReqDbUsrId");
    	
    if(jojik.detpNm!=null && jojik.deptId!=null && jojik.dbUsrNm!=null && jojik.dbUsrId!=null){
	/* jisikget!=null?g_popup=jisikget:g_popup="GCHILD";*/
	//alert(g_popup);
/*	$("#jisikr_Charger").html(jojik.dbUsrNm);
	$("#jisikr_ChargerUsrId").val(usrId);  					//사용자 이름
	$("#jisikr_ChargerOrgUsrId").val(jojik.dbUsrId);  
	$("#jisikr_ChargerDeptId").val(jojik.deptId);
	$("#jisikr_MnnstDept").val(jojik.detpNm);
	$("#jisikr_ChargerOrgFulNm").val(jojik.detpNm);*/
    }
    	
    initSelectData();
    
    // var gsrchIntvExCd =  $("#jisikr_tfExCd").val();
    var gPrmIntvLgCd = $("#jisikr_tfLgCd").val();
    var gPrmIntvMdCd = $("#jisikr_tfMdCd").val();
    var gPrmIntvSmCd = $("#jisikr_tfSmCd").val();
    var gPrmCdbGbCd = $("#jisikr_tfCdbGb").val();
    var gPrmTbblTt = decodeURIComponent($("#jisikr_tfTbblTbl").val()); 			// 테이블 제목

    var requestDate = getDate();							//요청일시 세팅
    $("#jisikr_RequstDate").html(requestDate +" "+usrNm);
    // console.log(gsrchIntvExCd+" "+gPrmIntvLgCd+" "+gPrmIntvMdCd+" "+gPrmIntvSmCd);
    //console.log(gPrmIntvLgCd+" "+gPrmIntvMdCd+" "+gPrmIntvSmCd);


	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("cschhi_selCounselNm", "전체", "main","","","","","","" );
	}else{
		setSelectBoxWithAgent("cschhi_selCounselNm", "전체", "main",window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	
    //상담메인에서 넘어 왔을경우
    if (gPrmTbblTt != null && gPrmTbblTt != ""){
		// setSelectBoxWithCnslCodeSync3(gsrchIntvExCd,gPrmIntvLgCd,gPrmIntvMdCd,gPrmIntvSmCd)
		setSelectBoxWithCnslCodeSync3(gPrmIntvLgCd,gPrmIntvMdCd,gPrmIntvSmCd);
	//	$("#jisikr_optCounselKnd1_srch").val(gsrchIntvExCd);
	//	$("#jisikr_optCounselKnd2_srch").val(gPrmIntvLgCd);
	//	$("#jisikr_optCounselKnd3_srch").val(gPrmIntvMdCd);
	//	$("#jisikr_optCounselKnd4_srch").val(gPrmCdbGbCd);
	//	$("optGbKnd_srch").val(gPrmCdbGbCd);
		$("#jisikr_tfSrchVal").val(gPrmTbblTt);

		// tJsoPath = getJsonStrManualList(gsrchIntvExCd, gPrmIntvLgCd, gPrmIntvMdCd, gPrmIntvSmCd, gPrmTbblTt);
		tJsoPath = getJsonStrManualList(gPrmIntvLgCd, gPrmIntvMdCd, gPrmIntvSmCd, gPrmTbblTt);
	} else{
        // tJsoPath = getJsonStrManualList(gsrchIntvExCd, g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, "");
        tJsoPath = getJsonStrManualList(g_srchIntvLgCd, g_srchIntvMdCd, g_srchIntvSmCd, "");
    }

    $("#jisikr_tblManualList").jqGrid({
	url : getContextPath() + "/jqgrid/main/manualList.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : tJsoPath
	},
	jsonReader : {
	    repeatitems: false
	},
	colNames : ["번호", "제목","등록일자","수정일자"],											
	colModel :
	    [
	     { name : "TBBS_ID", index : "TBBS_ID", hidden : true },
	     { name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : 200 },
	     { name : "CRT_DTTM", index : "CRT_DTTM", align : "center", width : 50 },
	     { name : "MOD_DTTM", index : "MOD_DTTM", align : "center", width : 50 }
	     ],
	     sortname : "crt_dttm desc, mod_dttm",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "234",
	     width : "100%",
	     rowNum : 9,
	     rowList : [10, 20, 50],
	     autowidth : true,
	     pager : "#jisikr_pgManualList",
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords: true,
	     onSelectRow : function(rowid){
			 //상담DB 클릭시 자동 수정변경
			 $("#jisikr_counselDbModifyRegist").prop('checked', true);
			 $("#jisikr_counselDbModifyRegist").trigger("change");
			 var row = $("#jisikr_tblManualList").getRowData(rowid);	   
			 hisTbbs_id=row.TBBS_ID;   
			 $("#jisikr_tfTbbsId").val(row.TBBS_ID);
			 showDetailManual(row.TBBS_ID);
			 showAttachFiles(row.TBBS_ID);
			 $("#jisikr_btnRequstHistSrch").show();
	     },
	     loadComplete : function(data){
	     },
	     onPaging : function(pgButton) {
	    	 
	     }
    }).jqGrid("navGrid", "#jisikr_pgManualList", {edit : false, add : false, del : false, search : false});

    //-------------------------------이벤트 등록-----------------------------------------------------
    $("#jisikr_optCounselKnd1_srch").bind("change", optCounselKnd1_srchChangeEvent);
    $("#jisikr_optCounselKnd2_srch").bind("change", optCounselKnd2_srchChangeEvent);
    // $("#jisikr_optCounselKnd3_srch").bind("change", optCounselKnd3_srchChangeEvent);
    $("#jisikr_optCounselKnd1_sc").bind("change", optCounselKnd1_scChangeEvent);
    $("#jisikr_optCounselKnd2_sc").bind("change", optCounselKnd2_scChangeEvent);
    // $("#jisikr_optCounselKnd3_sc").bind("change", optCounselKnd3_scChangeEvent);
    $("#jisikr_optCounselKnd1").bind("change", optCounselKnd1_ChangeEvent);
    $("#jisikr_optCounselKnd2").bind("change", optCounselKnd2_ChangeEvent);
    // $("#jisikr_optCounselKnd3").bind("change", optCounselKnd3_ChangeEvent);
    
    //init setting  
    $("#jisikr_optCounselKnd1_srch").trigger("change");
    $("#jisikr_optCounselKnd1_sc").trigger("change");
    $("#jisikr_optCounselKnd1").trigger("change");

    $("#jisikr_btnRequstHistSrch").hide();
    
    $("input:radio[name=dbRegist]").bind("change", radioBtn_clickEvent);
    

    $("#jisikr_MnnstDept").click(function(e) {$("#jisikr_MnnstDept").val("");});
    $("#jisikr_cntrSearch").on("click",MnnstDept_ClickEvent);
    //$("#jisikr_MnnstDept").keydown(function(e) {MnnstDept_TextChangeEvent();});
    //검색 이벤트
    $("#jisikr_btnSearch").bind("click", btnSearchClickEvent);
    //엔터치면 검색
    $("#jisikr_tfSrchVal").bind("keydown", function(e){if(e.keyCode == 13) {btnSearchClickEvent();}});
    //수정요청 이력 등록
    $("#jisikr_btnInsert").bind("click", btnInsertCommentClickEvent);
    //요청사항 초기화
    $("#jisikr_btnInit").bind("click", btnInitClickEvent);
    //요청이력조회 팝업	
    $("#jisikr_btnRequstHistSrch").bind("click", function(){
	//jisikRewordHis($("#jisikr_tfTbbsId").val(),$("#jisikr_taCommTtl").val());
    jisikRewordHis($("#jisikr_tfTbbsId").val());
	//POST 방식으로 전송
/*	var form = document.subform;
	form.setAttribute("method", "post");
	form.setAttribute("action", getContextPath() + "/web/myinfo/jisikRewordHis.do");
	form.setAttribute("target", "JS0005");	
	$("#jisikr_jisikTbbsId").val(encodeURIComponent($("#jisikr_tfTbbsId").val()));	
	$("#jisikr_jisikTtl").val(encodeURIComponent($("#jisikr_taCommTtl").val()));	
	form.submit();*/
    });
});//init page end


$(function(){
	var selectid;
	var selIdSeq;
$("#jisikr_tfLgMdSmSearch_01").autocomplete({
    source : function( request, response ) {
    	selectid=$(this.element).prop("id");
    	arSelId=selectid.split('_');
    	selIdSeq=arSelId[2];
         $.ajax({
                type: 'post',
                async : true,
                url: getContextPath() + "/ajax/main/getCodeList.do",
                dataType: "json",
                //request.term = $("#jisikr_autocomplete").val()
                //data: { value : request.term },
                data : "pJson=" + getJsonCodeList(selectid),
                success: function(data) {
	 
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response(
                        $.map(data, function(item) {
                        	
                            return {
                                // label: (item.XNAME+" > "+item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                                label: (item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                                value: $("#"+selectid).val(),
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
    	if(selIdSeq=="01"){
            // $("#jisikr_optCounselKnd1_sc").val(arItem[0]).trigger("change");
            // $("#jisikr_optCounselKnd2_sc").val(arItem[1]).trigger("change");
            // $("#jisikr_optCounselKnd3_sc").val(arItem[2]).trigger("change");
            // $("#jisikr_optCounselKnd4_sc").val(arItem[3]);
    		$("#jisikr_optCounselKnd1_sc").val(arItem[0]).trigger("change");
    		$("#jisikr_optCounselKnd2_sc").val(arItem[1]).trigger("change");
    		$("#jisikr_optCounselKnd3_sc").val(arItem[2]);
    	}
    }
});
}) 


//------------------------------------------------common modi-----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------

//3단계 팝업때문
function setObjectSelectBoxWithCode2Pop(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd) {
    var tempObj = {};
    if (parentType == "CHILD") {
	tempObj = window.opener.g_IntvObectCode[parentCode];
    } else if (parentType == "GCHILD") {
	tempObj = window.opener.opener.g_IntvObectCode[parentCode]; // 변경
    } else if (parentType == "G-GCHILD") {
	tempObj = window.opener.opener.opener.g_IntvObectCode[parentCode]; // 변경
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
	//console.log(parentCode + ":" + parentType + ":" + selectId);
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
//3 단계 팝업때문
function setObjSelectBoxWithCodePop(selectId, allText, codeType, parentType, parentCode, startValue) {
    var tempObj = {};

    if (parentType.toUpperCase() == "CHILD") {
	tempObj = window.opener.g_ObectCode[parentCode];
    } else if (parentType.toUpperCase() == "GCHILD") {
	tempObj = window.opener.opener.g_ObectCode[parentCode];
    } else if (parentType.toUpperCase() == "G-GCHILD") {
	tempObj = window.opener.opener.opener.g_ObectCode[parentCode];
    } else {
	tempObj = g_ObectCode[parentCode];
    }

    if (!tempObj) {
	//console.log(selectId);
	return;
    }
    var localvarParent = "";
    var $selectId;
    if (codeType != "ul") {
	$selectId = $("#" + selectId);
    } else {
	$selectId = $("#" + codeType + selectId);
    }
    var value = "";
    $selectId.html("");
    $.each(tempObj, function(key, val) {

	if (codeType != "ul") {

	    if (localvarParent != parentCode) {
		localvarParent = parentCode;
		if (allText == "전체") {
		    value += "<option value='all' selected>전체</option>";
		} else if (allText == "미선택") {
		    value += "<option value='all' selected>미선택</option>";
		}
	    }
	    if (val.use_yn == "Y") {
		value += "<option value='" + val.cd + "'>" + val.cd_nm
		+ "</option>";
	    }
	} else {
	    if (val.use_yn == "Y") {
		value += "<li value='" + (val.cd).substring(3, 5) + "' id='li"
		+ selectId + "_" + (val.cd).substring(3, 5) + "'>"
		+ val.cd_nm + "</li>";
	    }
	}
    });

    if (codeType != "ul") {
	$selectId.append(value);

	if (startValue)
	    $selectId.val(startValue);
	else
	    $selectId.prop("selected", true);

	$selectId.trigger("change");
	$selectId.trigger("load");
    } else {
	$selectId.append(value);
	$selectId.menu();
    }
}

