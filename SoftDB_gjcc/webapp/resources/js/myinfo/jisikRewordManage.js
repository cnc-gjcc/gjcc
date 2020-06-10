var fileForm = "";
var fileBox_idx = 0;
var g_rspnUsrId = "";
var dbGrade ="mngr";
var g_popup = "CHILD";
var editor1 = null;
var infosCommCntn = null;

//파라미터 셋팅 UserList
function getJsonStrUserList(cntrCd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 매뉴얼 상세보기
function getJsonStrShowDetailManual(tbbsId)
{
	var langCd = $("#jskRwMng_langCd").val();
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
			"map" : {
				"tbbs_id" : tbbsId,
				"lang_cd" : langCd
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));	
}
function getJsonStrUpdateValue(tbbsId)
{
	
	var commId = $("#infosCommId").val();
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "bWkwMDEuc2F2ZQ==",
			"map" : {
				"key" : "value",
				"comm_id" : commId,
				"tbbs_id" : tbbsId
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}
//next value
function getNextValue()
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


//파라미터셋팅 매뉴얼 등록
function getJsonStrInsertManual(tbbsId)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAuaW5zZXJ0SmlzaWs=",
		"map" : {
			"tbl_pk": tbbsId,
			"tbl_nm" : "om010",
			"sendingUid" : window.sessionStorage.getItem("USR_ID"),
			//"tbbs_cntn" : oEditors.getById["jskRwMng_taTbbsCntn"].getIR(),
			"tbbs_cntn" : DEXT5.getBodyValue("editor1"),
			//"dtls" : DEXT5.getBodyValue("dtls"),
			"tbbs_ttl" : $("#jskRwMng_tfTbbsTtl").val(),
            // "intv_ex_cd" : $("#jskRwMng_optCounselKnd1").val(),
            // "intv_lg_cd" : $("#jskRwMng_optCounselKnd2").val(),
            // "intv_md_cd" : $("#jskRwMng_optCounselKnd3").val(),
            //"intv_sm_cd" : $("#optCounselKnd4").val(),
			"intv_lg_cd" : $("#jskRwMng_optCounselKnd1").val(),
			"intv_md_cd" : $("#jskRwMng_optCounselKnd2").val(),
			"intv_sm_cd" : $("#jskRwMng_optCounselKnd3").val(),
			"cdb_gb_cd" : $("#jskRwMng_optGbKnd").val(),
			"respon_prsn" : $("#tfRespNm").val(),
			"respon_tel" : $("#tfResponTel").val(),
			"cntr_nm" : $("#tfCntrNm").val(),
			"use_yn" : "Y",
			"cc_appr_yn" : "Y",
			"wrk_cl" : $("#jskRwMng_wrkcl").val(),
			"ntuse_desc" : "",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));	
}

//파라미터셋팅 매뉴얼 수정
function getJsonStrUpdateManual()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAudXBkYXRlSmlzaWs=",
		"map" : {
			"tbl_pk": $("#jskRwMng_tfTbbsId").val(),
			"tbl_nm" : "om010",
			"sendingUid" : window.sessionStorage.getItem("USR_ID"),			
			//"tbbs_cntn" : oEditors.getById["jskRwMng_taTbbsCntn"].getIR(),
			"tbbs_cntn" : DEXT5.getBodyValue("editor1"),
			//"dtls" : DEXT5.getBodyValue("dtls"),
			"tbbs_ttl" : $("#jskRwMng_tfTbbsTtl").val(),
            // "intv_ex_cd" : $("#jskRwMng_optCounselKnd1").val(),
            // "intv_lg_cd" : $("#jskRwMng_optCounselKnd2").val(),
            // "intv_md_cd" : $("#jskRwMng_optCounselKnd3").val(),
            // "intv_sm_cd" : $("#jskRwMng_optCounselKnd3").val(),
			"intv_lg_cd" : $("#jskRwMng_optCounselKnd1").val(),
			"intv_md_cd" : $("#jskRwMng_optCounselKnd2").val(),
			"intv_sm_cd" : $("#jskRwMng_optCounselKnd3").val(),
			"cdb_gb_cd" : $("#jskRwMng_optGbKnd").val(),
			"respon_prsn" : $("#tfRespNm").val(),
			"respon_tel" : $("#tfResponTel").val(),
			"cntr_nm" : $("#tfCntrNm").val(),
			"use_yn" : $("#optUseYN").val(),
			"cc_appr_yn" : "N",
			"wrk_cl" : $("#jskRwMng_wrkcl").val(),
			"ntuse_desc" : $("#tfNtuseDesc").val(),
		}
	};
	console.log(JSON.stringify(loParam));
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
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteFile(fileId)
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

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc){
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 선택 박스 셋팅
function initManageSelectData() {
	setObjectSelectBoxWithCode2("procsCnsltKnd1", "전체", "", g_popup, "00000000", "", "CHANGE");  //첫번째 세팅
	
	/*2018.10.12 상담유형 세팅 변경 부분 */
	setObjectSelectBoxWithCode2("jskRwMng_optCounselKnd1", "전체", "1", g_popup, "00000000","","CHANGE");
	
	$("#jskRwMng_optCounselKnd1").bind("change", function()	{
		setObjectSelectBoxWithCode2("jskRwMng_optCounselKnd2", "전체", "2", g_popup, $("#jskRwMng_optCounselKnd1").val(),"","CHANGE");
	});
	$("#jskRwMng_optCounselKnd2").bind("change", function()	{
		setObjectSelectBoxWithCode2("jskRwMng_optCounselKnd3", "전체", "3", g_popup, $("#jskRwMng_optCounselKnd2").val(),"","CHANGE");
	});
	$("#jskRwMng_optCounselKnd1").trigger("change");
	/*2018.10.12 상담유형 세팅 변경 부분 끝*/
	
	setSelectBoxWithCode("jskRwMng_optGbKnd", "전체", "90303", g_popup, "90039", "");
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/user/cntrList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c20wMDIuc2VsZWN0Q250ckNk", {"key" : "value"}),
		success : function(data){
			$("#optCntrNm").empty();
			
			var option = "";
			option += "<option value='all'>미선택</option>";
			
			for(var i in data)
				option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
			
			$("#optCntrNm").append(option);
			$("#optCntrNm").val("all");
			$("#optCntrNm").trigger("change");
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
	

	// 부서 선택 시 상담사 정보가져와 셋팅
	$("#optCntrNm").bind("change", function(){
		if($("#optCntrNm").val() == "all"){
			$("#optUsrNmList").html("");
			var value = "";
			value += "<option value='all'>미선택</option>";
			$("#optUsrNmList").append(value);
			
		}else{
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/user/userList.do",
				data : "pJson=" + getJsonStrUserList($("#optCntrNm").val()),
				success : function(data){
					$("#optUsrNmList").html("");
					
					// param값을 JSON으로 파싱
					var value = "";
					value += "<option value='all'>미선택</option>";
					
					$.each(data, function(key, state){
						value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
					});
					
					$("#optUsrNmList").append(value);
					
					if(g_rspnUsrId != null && g_rspnUsrId != ""){
						$("#optUsrNmList").val(g_rspnUsrId);
						g_rspnUsrId = "";
					}
					else
						$("#optUsrNmList").val("all");
				},
				error : function(data, status, err) {
					//networkErrorHandler(data, status, err);
				}
			});
		}
	});
}

/** 
 * 탭선택 이벤트 
 */

/*function divCorpTab_clickEvent(event) {
	var strTbbsId =$("#jskRwMng_tfTbbsId").val();
	var evId = event.target.id;
	//탭을 선택여부
	$("#divCorpTab > div").attr("class","").addClass("left_tab100_img_gray");
	$("#"+evId).attr("class","").addClass("left_tab100_img");
	$("#jskRwMng_langCd").val(evId);
		showDetailManual(strTbbsId);
}*/

function checkFrqntSpec(){
	
	var rMsg = "";
	if($("#jskRwMng_optCounselKnd1").val() == "all" || $("#jskRwMng_optCounselKnd1").val() == null || $("#jskRwMng_optCounselKnd2").val() == "all" || $("#jskRwMng_optCounselKnd2").val() == null ||
        	// $("#jskRwMng_optCounselKnd3").val() == "all" || $("#jskRwMng_optCounselKnd3").val() == null || $("#optCounselKnd4").val() == "all" || $("#optCounselKnd4").val() == null )
			$("#jskRwMng_optCounselKnd3").val() == "all" || $("#jskRwMng_optCounselKnd3").val() == null )
		rMsg += "\n\n상담유형을 선택해주세요.";
	
	if($("#jskRwMng_tfTbbsTtl").val() == "")
		rMsg += "\n\n제목을 입력해 주세요.";
	
	
	if(DEXT5.getBodyTextValue("editor1") == "")
		rMsg += "\n\n내용을 입력해주세요.";
	
	if($("#tfCntrNm").val() == "")
		rMsg += "\n\n담당부서를 입력해주세요.";
	
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#jskRwMng_writeForm input[name=MANUAL]");
	for(var i=0; i<formName.length; i++){
		if(formName[i].value !=""){
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




//상담 지식 저장이벤트
function btnReInsertClickEvent() {
var rMsg = checkFrqntSpec();
	$("#jskRwMng_wrkcl").val("상담DB신규등록");
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	if(!confirm("등록하시겠습니까?"))
		return;
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/management/insertManual.do",
		data : "pJson=" + getNextValue(),
		success : function(data){
			gAppendHidden("jskRwMng_writeForm", "pJson", getJsonStrInsertManual(data.TBBS_ID));
			gSubmitPost("jskRwMng_writeForm", true);

			/*$.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/management/insertManual.do",
				data : "pJson=" + getJsonStrUpdateValue(data.TBBS_ID),
				success : function(data){
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}
			});*/
			alert('등록되었습니다.');
			$("#tblComments").trigger("reloadGrid");
			initContent();
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}
//상담 지식 수정이벤트
function btnReUpdateClickEvent() {
var rMsg = checkFrqntSpec();
	$("#jskRwMng_wrkcl").val("상담DB수정등록");
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	
	if(!confirm("수정 하시겠습니까?"))
		return;
	gAppendHidden("jskRwMng_writeForm", "pJson", getJsonStrUpdateManual());
	gSubmitPost("jskRwMng_writeForm", true);	
		
	alert("수정되었습니다.");
	
	$("#tblComments").trigger("reloadGrid");
}
//내용 초기화
function initContent(){
	initManageSelectData();
	DEXT5.setBodyValue('', 'editor1');
	//DEXT5.setBodyValue('', 'dtls');
	//fileBox_idx = 0;
	$("#jskRwMng_fileInfos").empty().append(fileForm);
	$("#tfCntrNm, #tfRespNm, #tfResponTel, #jskRwMng_tfTbbsTtl").val("");
	
	//$("#jskRwMng_optCounselKnd1").val("all");
	//$("#jskRwMng_optCounselKnd2, #jskRwMng_optCounselKnd3, #optCounselKnd4").empty().val("all");
}

//상세정보 상담유형 
function optSelect(data){
    // var intvExCd = data.INTV_EX_CD;
	var intvLgCd = data.INTV_LG_CD;
	var intvMdCd = data.INTV_MD_CD;
	var intvSmCd = data.INTV_SM_CD;

    // $("#jskRwMng_optCounselKnd1").val(intvExCd);
	$("#jskRwMng_optCounselKnd1").val(intvLgCd);
	$("#jskRwMng_optCounselKnd2").val(intvMdCd);
	$("#jskRwMng_optCounselKnd3").val(intvSmCd);
	/*
	// 상담유형 대, 중, 소분류 넣기
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/counselList.do",
		data : "pJson=" + getJsonStrIntvCdSetSelectBox("2", intvLgCd),
		success : function(data){
			$("#jskRwMng_optCounselKnd2").empty();
			var option = "";
			option += "<option value='all'>전체</option>";
			
			for(var i in data)
				option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
			
			$("#jskRwMng_optCounselKnd2").append(option).prop("disabled", false);
			$("#jskRwMng_optCounselKnd2").val(intvMdCd);
			
			$.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/main/counselList.do",
				data : "pJson=" + getJsonStrIntvCdSetSelectBox("3", intvMdCd),
				success : function(data){
					$("#jskRwMng_optCounselKnd3").empty();
					var option = "";
					option += "<option value='all'>전체</option>";
					
					for(var i in data)
						option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
					
					$("#jskRwMng_optCounselKnd3").append(option).prop("disabled", false);
					$("#jskRwMng_optCounselKnd3").val(intvSmCd);
				},
				error : function(data, status, err){
					networkErrorHandler(data, status, err);
				}	
			});											
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});		*/
};
//매뉴얼 상세보기
function showDetailManual(tbbsId, comm){
	if(comm == "new"){
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/management/jisikDetail.do",
			data : "pJson=" + getJsonStrSelectComment(tbbsId),
			success : function(data){
				//optSelect(data);
				$("#jskRwMng_tfTbbsTtl").val(data.COMM_TTL);
				$("#jskRwMng_optGbKnd").val(data.CDB_GB_CD);

				$("#jskRwMng_optCounselKnd1").val(data.INTV_LG_CD);
				$("#jskRwMng_optCounselKnd2").val(data.INTV_MD_CD);
				$("#jskRwMng_optCounselKnd3").val(data.INTV_SM_CD);
				
				DEXT5.setHtmlValue(data.COMM_CNTN, 'editor1');
				
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}else{
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/management/jisikDetail.do",
			data : "pJson=" + getJsonStrShowDetailManual(tbbsId),
			success : function(data){
				//optSelect(data);
				$("#jskRwMng_tfTbbsTtl").val(data.TBBS_TTL);
				DEXT5.setHtmlValue(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'editor1');
				//DEXT5.setHtmlValue(data.DTLS==null?"":data.DTLS, 'dtls');

				$("#jskRwMng_optCounselKnd1").val(data.INTV_LG_CD);
				$("#jskRwMng_optCounselKnd2").val(data.INTV_MD_CD);
				$("#jskRwMng_optCounselKnd3").val(data.INTV_SM_CD);
				
				g_rspnUsrId = data.RESPON_PRSN;
				$("#tfCntrNm").val(data.CNTR_NM);
				$("#jskRwMng_optGbKnd").val(data.CDB_GB_CD);
				$("#tfRespNm").val(data.RSPN_PRSN);
				$("#tfResponTel").val(data.RESPON_TEL);
				$("#optUseYN").val(data.USE_YN);
				
				if($("#optUseYN").val() == "N")
					$("#tfNtuseDesc").prop("disabled", false);
				
				$("#tfNtuseDesc").val(data.NTUSE_DESC);
				$("#lbCrtInfo").html(data.CRT_USR_NM + " / " + data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT);
				$("#lbModInfo").html(data.MOD_USR_NM + " / " + data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT);
				$("#jskRwMng_tfTbbsId").val(data.TBBS_ID);
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//첨부파일 박스추가
function addFileBox(){
	//if (fileBox_idx >= 4){
	if (fileBox_idx >= 2){
		//alert("첨부파일은 최대 5개까지 가능합니다.");
		alert("첨부파일은 최대 3개까지 가능합니다.");
	}else{
		var html = $("#fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#jskRwMng_fileInfos").append(html);
	}
}

//첨부파일박스삭제
function removeFileBox(i)
{
	var el = $("#jskRwMng_writeForm input[name=record_" + i + "]");
	el.parent().parent().remove();
	fileBox_idx--;
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
			url : getContextPath() + "/ajax/management/deleteFile.do",
			data : "pJson=" + getJsonDeleteFile(fileId),
			success : function(data)
			{
				//파일폼 삭제
				var el = $("#jskRwMng_writeForm input[name=record_" + fileId + "]");
				el.parent().parent().remove();
				
				//if(--fileBox_idx < 5)
				if(--fileBox_idx < 3)
				{
					$("#MANUAL").prop("disabled", false);
					$("#rmFilebox").prop("disabled", false);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
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
		var el = $("#jskRwMng_writeForm input[name=record_" + fileId + "]");
		el.parent().parent().remove();

		if(--fileBox_idx < 3)
		{
		    $("#MANUAL").prop("disabled", false);
		    $("#rmFilebox").prop("disabled", false);
		}
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
  }
}

//파일박스 내용삭제
function rmFileBoxEvent()
{
	inputFile[1] = inputFile[0].clone(true);
	$("#MANUAL").replaceWith(inputFile[1]);
}
//첨부파일 보기
function showAttachFiles(tbbsId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/fileList.do",
		data : "pJson=" + getJsonFileList(tbbsId),
		success : function(data)
		{
			var tr = "";
			fileBox_idx = 0;
			for(var i in data)
			{
				var url = getContextPath() 
				+ "/file/jisikManageFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				
				tr += "<tr>";
				tr += "<td colspan='3'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				tr += "</tr>";
				
				fileBox_idx++;
			}
			tr += "<tr>" + "<td colspan='4'>" + "<input type='hidden' name='record_XXX' value='' />" + "<input type='file' id='MANUAL' name='MANUAL'/>" + "</td>" + "<td>"
			+ "<img src='/resources/images/btn_del.png'  alt='삭제' class='icon_add'  id='rmFilebox' style='cursor: pointer;'  />"
			+ "<img src='/resources/images/btn_fileadd.png' onClick='addFileBox()' alt='파일폼추가' class='icon_add' style='cursor: pointer;'/>" + "</td>" + "</tr>"

			$("#jskRwMng_fileInfos").empty();
			$("#jskRwMng_fileInfos").prepend(tr);
			/*
			if(fileBox_idx >= 5)
			{
				$("#MANUAL").prop("disabled", true);
				$("#rmFilebox").prop("disabled", true);
			}*/

			if (fileBox_idx > 3) {
				$("#MANUAL").prop("disabled", true);
				$("#rmFilebox").prop("disabled", true);
			} else {
				$("#MANUAL").prop("disabled", false);
				$("#rmFilebox").prop("disabled", false);
			}

			if (fileBox_idx > 2) {
				$("#jskRwMng_fileInfos tr:last-child").css("display", "none");
			} else {
				//$("#jskRwMng_fileInfos tr:last-child").css("display", "table-cell");
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function content(tbbsId, commId){
	initContent();
	if(tbbsId != null){
		$("#jskRwMng_tfTbbsId").val(tbbsId);
		showDetailManual(tbbsId, "")
		showAttachFiles(tbbsId);
		
		//$("#jskRwMng_btnReInsert").hide();
		//$("#jskRwMng_btnReUpdate").show();
	}else{
		$("#jskRwMng_tfTbbsId").val("")
		showDetailManual(commId, "new")
		//$("#jskRwMng_btnReInsert").show();
		//$("#jskRwMng_btnReUpdate").hide();
	}
    // $("#infosCounselKnd1, #infosCounselKnd2, #infosCounselKnd3, #infosCounselKnd4, #infosCommTtl ,#infosCommCntn").attr("disabled",true);
	$("#infosCounselKnd1, #infosCounselKnd2, #infosCounselKnd3, #infosCommTtl ,#infosCommCntn").attr("disabled",true);
	$("#btnUpdate").hide();
	$("#btnSave").show();
}

function fnSetOrgRewordTrans(objInfo){
	
	var agencyCategory = objInfo.CATEGORY;
	if(agencyCategory =="AA"){
		$("#tfCntrId").val(objInfo.DEPT_CD);
		$("#tfCntrNm").val(objInfo.DEPT_NM);
		$("#tfRespId").val(objInfo.USR_ID);
		$("#tfRespNm").val(objInfo.USR_NM);
		$("#tfResponTel").val(objInfo.TEL_NO);
	}else if(agencyCategory =="CC"){
		$("#tfCntrId").val(objInfo.TEAM_CD);
		$("#tfCntrNm").val(objInfo.TEAM_NM);
		$("#tfRespId").val(objInfo.USR_ID);
		$("#tfRespNm").val(objInfo.USR_NM);
		$("#tfResponTel").val(objInfo.TEL_NO);
	}else if(agencyCategory =="EA"){
		$("#tfCntrId").val("externAgency");
		$("#tfCntrNm").val(objInfo.TEAM_NM);
		$("#tfRespId").val(objInfo.USR_ID);
		$("#tfRespNm").val(objInfo.USR_NM);
		$("#tfResponTel").val(objInfo.TEL_NO);
	}
}

// 그리드 테이블의 row 정보 갖고와서 입력폼의 상담유형 세팅
function setJskRwMngCtgCd(row) {
	$("#jskRwMng_optCounselKnd1").val(row.INTV_LG_CD).trigger("change");
	$("#jskRwMng_optCounselKnd2").val(row.INTV_MD_CD).trigger("change");
	$("#jskRwMng_optCounselKnd3").val(row.INTV_SM_CD);
}

$(document).ready(function(){
	initManageSelectData();
	fileForm = $("#jskRwMng_fileInfos tr").parent().html();
	
	
	// 탭 이벤트 등록
	//$("#divCorpTab > div").bind("click",event,divCorpTab_clickEvent);
	
	$("#jskRwMng_btnReInsert").bind("click", btnReInsertClickEvent);
	$("#jskRwMng_btnReUpdate").bind("click", btnReUpdateClickEvent);
	$("#jskRwMng_btnReInit").on("click", initContent);
	// DEXT5 에디터 환경셋팅
/*	DEXT5.config.Mode = 'edit';
	DEXT5.config.Height  = "130px";
	DEXT5.config.Width  = "100%";
	DEXT5.config.zStatusBar = "1";
    DEXT5.config.zTopMenu = "1";
    DEXT5.config.zToolBar  = "1";	
    DEXT5.config.SkinName = "gray";
	DEXT5.config.EditorHolder = "taDtls";
	new Dext5editor("dtls");
	*/
	DEXT5.config.Mode = 'edit';
	DEXT5.config.Height  = "600px";
	DEXT5.config.Width  = "100%";
	DEXT5.config.zStatusBar = "0";
    DEXT5.config.zTopMenu = "1";
    DEXT5.config.zToolBar  = "0";	
    DEXT5.config.SkinName = "blue";
	DEXT5.config.EditorHolder = "jskRwMng_taTbbsCntn";
	new Dext5editor("editor1");
	
	
	$("#jskRwMng_cntrSearch").bind("click",function(){
		window.sessionStorage.setItem("fromFlag", "fromDB");
		window.sessionStorage.setItem("corpOpenType", "doCorp");
		openMenuPopup("CM0311");
	});
	
});