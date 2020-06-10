var oEditors = [];
var gd_editor;
var rspns = [];
var checkCharger = false;
//var checkCharger = true;

var sendingOuCode = opener.sendingOuCode!=null?opener.sendingOuCode:"";
var sendingUid = opener.sendingUid!=null?opener.sendingUid:"";
var sendingUName = opener.sendingUName!=null?opener.sendingUName:"";
var sendingOu = opener.sendingOu!=null?opener.sendingOu:"";
var sendingOuName = opener.sendingOuName!=null?opener.sendingOuName:"";
var reqid = "";

//2019.12.11
var fileBox_idx = 0;
var flids = [];
var bEditMode = false;

//insertComments 
function getJsonStrInsertComment(req_id) {
	var flag = "";
	/*
	 * //신규DB요청시 새로운 상담DB를 미리 생성 if($("#jsdeta_counselDbNewRegist").prop('checked')){ flag="010100"; }else if($("#jsdeta_counselDbModifyRegist").prop('checked')){ flag="020100";} else if($("#jsdeta_counselDbDelete").prop('checked')){ flag="030100";}
	 */

	/*
	 * if(news){ flag="010100"; }else{
	 */
	flag = "020100";
	//}
	var ccAffir = $("#jsdeta_chkNotUseYN").val() != null ? $("#jsdeta_chkNotUseYN").val() : "N";
	var actstcd = "030100";
	var complete = "yes";
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTUuamlzaWtSZXdvcmRJbnNlcnQ=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om015",
			"tbl_pk" : req_id,
			"req_id" : req_id, //sequence							
			"tbbs_id" : $("#jsdeta_tfTbbsId").val(),
			"org_id" : sendingOuCode,
			"login_usr_id" : sendingUid,
			"login_usr_nm" : sendingUName,
			"affs_org_usr_id" : sendingUid, //기관사용자ID
			"cdb_gb_cd" : "040101",//$("#jsdeta_optGbKnd").val(),						//DB구분
			"intv_lg_cd" : $("#jsdeta_prmIntvLgCd").val(),
			"intv_md_cd" : $("#jsdeta_prmIntvMdCd").val(),
			"intv_sm_cd" : $("#jsdeta_prmIntvSmCd").val(),
			"comm_cntn" : $("#jsdeta_tfTbbsTtl").val(),//DEXT5.getBodyValue("commCntn"),					//요청내용
			"comm_ttl" : $("#jsdeta_tfTbbsTtl").val(), //제목부분
			"new_yn" : flag, //신규여부 
			"cdb_act_st_cd" : actstcd, //신규.
			"ccaffir" : "N",

			//history
			"usr_id2" : sendingUid,
			"org_id2" : sendingOuCode,
			"org_usr_id2" : sendingUid, //기관사용자id
			"org_ful_nm2" : sendingOuName, //기관사용자nm
			"complete" : complete,
			"rtn_rsn2" : sendingUName + "님이 처리완료 하였습니다.",
//			"rtn_rsn2" : sendingUName + "님에게 접수되었습니다.",
			"message" : "요청되었습니다."
		}
	};
	
	/*
	// radio button 삭제
	if ($("#jsdeta_chargerJobProcess").prop('checked')) { //처리중
		loParam['map']['cdb_act_st_cd'] = "020100";
		loParam['map']['rtn_rsn'] = "";
		loParam['map']['rtn_rsn2'] = sendingUName + "님이 처리중 입니다.";
		;
	} else if ($("#jsdeta_chargerJobCompt").prop('checked')) {
		loParam['map']['cdb_act_st_cd'] = "030100"; //완료
		loParam['map']['rtn_rsn'] = "";
		loParam['map']['complete'] = "yes";
		loParam['map']['rtn_rsn2'] = sendingUName + "님이 처리완료 하였습니다.";
	}
	*/

	/*
	 * //신규 요청일경우 if(flag=="010100"){ loParam['map']['tbbs_id']=jisikTbbsId; }else if(flag=="010100" && jisikTbbsId==null){ loParam['map']['tbbs_id']=""; }
	 */

	return encodeURIComponent(JSON.stringify(loParam));
}

// 2019.12.12  파일 첨부기능 추가
function getJsonStrDuplifile(fl_id) {
    var loParam = {
        "qt": "aW5zZXJ0",
        "mi": "b20wMTkuZHVwbGljYXRl",
        "map": {
            "tbl_nm": "oh013",
            "tbl_pk": $("#jsdeta_tfTbbsId").val(),
            "tbl_pk2": reqid,
            "fl_id": fl_id,
            "sendingUid": sendingUid
        }
    };
    return encodeURIComponent(JSON.stringify(loParam));

}

//요청DB 이력등록
function getJsonStrInsertDBHistory(reqid) {/*
											 * if (news) { var wrk_cl = "상담DB신규등록" } else {
											 */
	var wrk_cl = "상담DB수정등록"
	//}

	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMTQuaW5zZXJ0SmlzaWtIaXN0b3J5",
		"map" : {
			"tbl_pk" : $("#jsdeta_tfTbbsId").val(),
			//hhs 2020.03.12 oh014->oh013
			"tbl_nm" : "oh013",
			"req_id" : reqid,
			"tbbs_cntn" : DEXT5.getBodyValue("tbbsCont"),//DEXT5.getHtmlValue("tbbsCont")
			"cdb_gb_cd" : "040101",
			"tbbs_ttl" : $("#jsdeta_tfTbbsTtl").val(),
			"intv_lg_cd" : $("#jsdeta_prmIntvLgCd").val(),
			"intv_md_cd" : $("#jsdeta_prmIntvMdCd").val(),
			"intv_sm_cd" : $("#jsdeta_prmIntvSmCd").val(),
			"cntr_nm" : $("#jsdeta_tfCntrNm").html(),
			"rspn_prsn" : $("#jsdeta_txtRespNm").val(),
			"rspn_tel_no" : $("#jsdeta_txtResponTel").val(),
			"use_yn" : "Y",
			"sendingUid" : sendingUid,
			"wrk_cl" : wrk_cl,
			"cc_appr_yn" : "N",
			"tbl_pk2": reqid
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}
//파라미터셋팅 지식검색 상세보기
function getJsonStrShowDetailJisik(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
		"map" : {
			"tbbs_id" : tbbsId
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 조회수 업데이트
function getJsonStrAddInqrCnt(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTEuaW5zZXJ0SmlzaWtVcGRhdGU=",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID") == null ? window.sessionStorage.getItem("usrId") : window.sessionStorage.getItem("USR_ID"),
			"usr_id" : window.sessionStorage.getItem("USR_ID") == null ? window.sessionStorage.getItem("usrId") : window.sessionStorage.getItem("USR_ID"),
			"usr_nm" : window.sessionStorage.getItem("USR_NM") == null ? "" : window.sessionStorage.getItem("USR_NM")
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일
function getJsonFileList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om010",
			"tbl_pk" : tbbsId,
			"orderby" : "crtTime"
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

//조회수 업데이트
function addInqrCnt(tbbsId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/addInqrCnt.do",
		data : "pJson=" + getJsonStrAddInqrCnt(tbbsId),
		success : function(data) {
			/*
			 * setTimeout(function(){ getJisikDetail(tbbsId); }, 500*1);
			 */

			//조회수반영, *부하시 사용안함
			//window.opener.btnJisikSearchClickEvent2();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//지식검색 가져오기
function getJisikDetail(tbbsId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/jisikDetail.do",
		data : "pJson=" + getJsonStrShowDetailJisik(tbbsId),
		success : function(data) {
			//팝업 호출 체크			
			//	    var paraJob = $("#jsdeta_tfJob").val();
			//	    if(paraJob=="" || paraJob =="null"){
			//	    $("#jsdeta_selMainIntvLgCd", opener.document).val(data.INTV_LG_CD);
			//	    window.opener.setObjectSelectBoxWithCode("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "");
			//	    window.opener.setObjectSelectBoxWithCode("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "");
			//	    }

			$("#jsdeta_tfTbbsintvNM").html(data.INTV_NM);
			$("#jsdeta_tfTbbsinqrCnt").html(data.TBBS_INQR_CNT);
			$("#jsdeta_tfTbbsTtl").val(data.TBBS_TTL);
			$("#jsdeta_tfCdbGbNm").html(data.CDB_GB_NM);
			//DEXT5.setHtmlValue(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
			DEXT5.setHtmlContentsEw(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
			//DEXT5.setHtmlValue(data.DTLS==null?"":data.DTLS, 'dtls');

			//	    $("#jsdeta_responUsrNm").html(data.CNTR_NM);
			//	    $("#jsdeta_responTelno").html(data.RESPON_TEL);
			//	    $("#jsdeta_modUsrNm").html(data.MOD_USR_NM);
			//	    $("#jsdeta_modDtm").html(data.MOD_DT_FORMAT=="--"?"":data.MOD_DT_FORMAT);

			$("#jsdeta_appr_yn").html(data.ARR_YN);

			if (data.ARR_YN == '미승인') {
				$("#jsdeta_appr_yn").css("color", "red");
			} else {
				$("#jsdeta_appr_yn").css("color", "black");
			}

			$("#jsdeta_tfCntrNm").html(data.CNTR_NM);
			if((data.CNTR_NM==sendingOu) || (window.sessionStorage.getItem("CC_AUTH")=="Y")){
//			if(data.CNTR_NM==sendingOu){
				checkCharger=true;
				$("#jsdeta_btChEdit").show();
				$("#jsdeta_btChView").hide();
				$("#jsdeta_txtRespNm").prop("disabled",false);
				$("#jsdeta_txtResponTel").prop("disabled",false);
				$("#jsdeta_tfTbbsTtl").prop("disabled", false);
				$("input:radio[name=chargerradio]").attr("disabled",false);
			}else{
				checkCharger=false;
				$("#jsdeta_btChEdit").hide();
				$("#jsdeta_btChView").hide();
				$("#jsdeta_txtRespNm").prop("disabled",true);
				$("#jsdeta_txtResponTel").prop("disabled",true);
				$("#jsdeta_tfTbbsTtl").prop("disabled", true);
				$("input:radio[name=chargerradio]").attr("disabled",true);
			}
			
			/*$("#jsdeta_tfRespNm").html(data.RSPN_PRSN);*/
			$("#jsdeta_txtRespNm").val(data.RSPN_PRSN);
			
			/*$("#jsdeta_tfResponTel").html("");
			$("#jsdeta_tfResponTel").html(data.RESPON_TEL);*/
			$("#jsdeta_txtResponTel").val(data.RESPON_TEL);
			var crt = data.CRT_USR_NM ? data.CRT_USR_NM : "";
			var mod = data.MOD_USR_NM ? data.MOD_USR_NM : "";
			$("#jsdeta_RsctDt").html(data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT + " " + crt);
			$("#jsdeta_UpdtDt").html(data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT + " " + mod);

			//상담DB수정요청으로 파라메터 넘기기
			$("#jsdeta_prmIntvLgCd").val(data.INTV_LG_CD);
			$("#jsdeta_prmIntvMdCd").val(data.INTV_MD_CD);
			$("#jsdeta_prmIntvSmCd").val(data.INTV_SM_CD);
			$("#jsdeta_prmCdbGbCd").val(data.CDB_GB_CD);
			$("#jsdeta_prmTbblTtl").val(data.TBBS_TTL);

			/*
			 * if(opener) { $(opener.document).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE");
			 * 
			 * 
			 * 
			 * if($("#jsdeta_tfSearch").val() == "total") { if(search == null || typeof(search) == 'undefined' || search == "") { search = parent.opener; } $(search.do).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE"); }
			 * 
			 * 
			 * 
			 * if(opener.opener) { $(opener.opener.document).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE"); } else if (opener.opener.opener) { $(opener.opener.opener.document).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.opener.opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.opener.opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE"); }
			 */
			
			//첨부파일 보기
			showAttachFiles($("#jsdeta_tfTbbsId").val());
			
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}


//첨부파일 박스추가
function addFileBox() {
  if (fileBox_idx >= 2) {
      alert("첨부파일은 최대 3개까지 가능합니다.");
  } else {
      var html = $("#csdbrg_fileadd tr").parent().html();
      html = html.replace(/XXX/g, "" + ++fileBox_idx);
      $("#csdbrg_fileInfos").append(html);
  }
}


//첨부파일박스삭제
function removeFileBox(i) {
	var el = $("#jsdeta_writeForm input[name=record_" + i + "]");
	el.parent().parent().remove();
	fileBox_idx--;
	
	if (fileBox_idx > 2) {
	    $("#csdbrg_fileInfos tr:last-child").css("display", "none");
	} else {
	    $("#csdbrg_fileInfos").css("display", "block");
	}
}

//첨부된 파일 삭제
function deleteFile(fileId) {
	
	if(!bEditMode){
		alert("파일 삭제는 수정모드에서만 가능합니다.");
		return;
	}
	
	if (confirm("첨부된 파일을 삭제하시겠습니까?")) {
	    $.ajax({
	        type: "post",
	        dataType: "json",
	        async: true,
	        url: getContextPath() + "/ajax/civilservice/csw.do",
	        data: "pJson=" + getJsonDeleteFile(fileId),
	        success: function (data) {
	            // 파일폼 삭제
	            var el = $("#jsdeta_writeForm input[name=record_" + fileId + "]");
	            el.parent().parent().remove();
	
	            if (--fileBox_idx < 3) {
	                $("#csdbrg_MANUAL").prop("disabled", false);
	                $("#csdbrg_rmFilebox").prop("disabled", false);
	            }
	
	            if (fileBox_idx < 3) {
	                $("#csdbrg_fileInfos tr:last-child").css("display", "table-cell");
	            } else {
	                $("#csdbrg_fileInfos tr:last-child").css("display", "none");
	            }
	        },
	        error: function (data, status, err) {
	            networkErrorHandler(data, status, err);
	        }
	    });
	}
	
	
}

// 첨부파일 삭제 20.04.07
function getJsonDeleteFile(fileId) {
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTkuZGVsZXRlTGlzdA==",
		"map" : {
			"tbl_nm" : "oh013",
			"tbl_pk" : $("#jsdeta_tfTbbsId").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파일박스 내용삭제
function rmFileBoxEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#csdbrg_MANUAL").replaceWith(inputFile[1]);
}


//첨부파일 보기
function showAttachFiles(tbbsId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/management/fileList.do",
		data : "pJson=" + getJsonFileList(tbbsId),
		success : function(data) {
			if (data != null && data != "") {
				//var tr ="<tr><th class='line_rt' style='width: 80%;'>첨부파일이름</th>" +"<th class='line_rt' style='width: 20%;'>용량</th></tr>";
				var tr = "";
				for ( var i in data) {
					var url = getContextPath() + "/file/board/jisikSearchFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

					tr += "<tr>";
					tr += "<input type='hidden' name='record_" + data[i].FL_ID + "' value='' >"; //hhs 20.04.07
					tr += "<td class='line_wb'><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a> <span>" + data[i].FL_KB_SZ + "</span>";
					/* tr += "<td class='line_wb'></td>"; */
					if(checkCharger){
						tr += " <a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'> <strong class='or_txt'>[삭제]</strong></a>";
					}
					tr += "</td></tr>";
					
					// 219.12.11  파일 첨부기능 추가
					flids.push(data[i].FL_ID);
	                fileBox_idx++;
				}

				$("#jsdeta_tblFiles").append(tr);
				$(".or_txt").hide(); //hhs
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}
function initContent() {
	DEXT5.setHtmlValue("", 'tbbsCont');
	DEXT5.setHtmlValue("", 'dtls');

	$("#jsdeta_tfTbbsintvNM").html("");
	$("#jsdeta_tfTbbsinqrCnt").html("");
	$("#jsdeta_tfTbbsTtl").val("");
	$("#jsdeta_tfCdbGbNm").html("");
	$("#jsdeta_responUsrNm").html("");
	$("#jsdeta_responTelno").html("");
	$("#jsdeta_modUsrNm").html("");
	$("#jsdeta_modDtm").html("");

	//상담DB수정요청으로 파라메터 넘기기
	// $("#jsdeta_prmIntvLgCd").val("");
	$("#jsdeta_prmIntvMdCd").val("");
	$("#jsdeta_prmIntvSmCd").val("");
	$("#jsdeta_prmCdbGbCd").val("");
	$("#jsdeta_prmTbblTtl").val("");
	
	// 2019.12.12  파일 첨부기능 추가
	fileBox_idx = 0;
	flids = [];
	bEditMode = false;
}

//eidt 로드 완료시 세부내용등록
function dext_editor_loaded_event(editor) {
	getJisikDetail($("#jsdeta_tfTbbsId").val());
}
function btnInsertClickEvent() {
	if (!confirm("등록하시겠습니까?"))
		return;
	//gAppendHidden("jsdeta_writeForm", "pJson", getJsonStrInsertDBHistory());
	//gSubmitPost("jsdeta_writeForm", true);
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/cswnextval.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMTUubmV4dHZhbA==", {}),
		success : function(data) {
			reqid = data.REQ_ID;
			$("#jsdeta_tfReqId").val(reqid);
			$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getContextPath() + "/ajax/civilservice/cswnextval.do",
				data : "pJson=" + getJsonStrInsertComment(reqid),
				success : function(data) {
					gAppendHidden("jsdeta_writeForm", "pJson", getJsonStrInsertDBHistory(reqid));
					gSubmitPost("jsdeta_writeForm", true);
					
					// 2019.12.12  파일 첨부기능 추가
					/*
					if (flids[i] != []) {
		                for (var i in flids) {
		                    $.ajax({
		                        type: "post",
		                        dataType: "json",
		                        async: true,
		                        url: getContextPath() + "/ajax/civilservice/cswinsertManualFile.do",
		                        data: "pJson=" + getJsonStrDuplifile(flids[i]),
		                        success: function (data) {},
		                        error: function (data, status, err) {
		                            networkErrorHandler(data, status, err);
		                        }
		                    });
		                }
		            }
		            */
				}
			});
		}
	});

	alert('등록되었습니다.');
	window.close();
}



//상담DB 변경이력 조회버튼 클릭이벤트 등록
function btnCnslAltListClickEvent()
{
	
	var width = 1500;
	var height = 900;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;		
	var tbbsId = $("#jsdeta_tfTbbsId").val();
	var paramURL = getContextPath() + "/web/civilservice/cswcounseldbAltList.do?TBBS_ID=" + tbbsId;
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	//window.sessionStorage.setItem("BOARD_TYPE", "020100.insert");
	
	var newWindow = window.open(paramURL, "counseldbAltList", option);
	newWindow.focus();
}

function getJsonStrchangeRespNm(){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTAuY2hhbmdlRGVwdENoYXJnZXI=",
			"map" : {
				"tbbs_id" : $("#jsdeta_tfTbbsId").val(),
				"rspn_prsn" : $("#jsdeta_inRespNm").val(),
				"sendingUid" : sendingUid
			}
		};
		return encodeURIComponent(JSON.stringify(loParam));
}

function btnchangeRespNm(){
	$.ajax({
		type : "post",
		dataType : "json",
		url : getContextPath() + "/ajax/civilservice/cswnextval.do",
		data : "pJson=" + getJsonStrchangeRespNm(),
		success : function(data) {
			alert("담당자가 변경되었습니다.")
		}
	});
}

function btnChangeEditMode() {
	DEXT5.setEditorMode('edit', 'tbbsCont');
	$("#jsdeta_btnUpdate").show();
	$("#jsdeta_actRadio").hide();
	$("#jsdeta_inRespNm").show();
	$("#jsdeta_btRespNm").show();
	$("#jsdeta_btChView").show();
	$("#jsdeta_btChEdit").hide();
	$("#jsdeta_txtRespNm").prop("disabled", false);
	$("#jsdeta_txtResponTel").prop("disabled", false);
	$("#jsdeta_tfTbbsTtl").prop("disabled", false);
	
	// 20.04.07 hhs 수정모드일때만 삭제 가능
	$(".or_txt").show();
	// 2019.12.12 파일 첨부기능 추가
	$("#csdbrg_fileInfos").show();
	bEditMode = true;
}

function btnChangeViewMode() {
	DEXT5.setEditorMode('view', 'tbbsCont');
	$("#jsdeta_btnUpdate").hide();
	$("#jsdeta_actRadio").hide();
	$("#jsdeta_inRespNm").hide();
	$("#jsdeta_btRespNm").hide();
	$("#jsdeta_btChView").hide();
	$("#jsdeta_btChEdit").show();
	$("#jsdeta_txtRespNm").prop("disabled", true);
	$("#jsdeta_txtResponTel").prop("disabled", true);
	$("#jsdeta_tfTbbsTtl").prop("disabled", true);

	$(".or_txt").hide();
	// 2019.12.12 파일 첨부기능 추가
	$("#csdbrg_fileInfos").hide();
	bEditMode = false;
}

function initeditor(){
	DEXT5.configInitServerXml = "http://counsel.gimpo.go.kr:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
	DEXT5.config.Height = "562px";
	DEXT5.config.Width = "100%";
	DEXT5.config.zStatusBar = "0";
	DEXT5.config.zTopMenu = "1";
	DEXT5.config.zToolBar = "0";
	DEXT5.config.SkinName = "blue";
	DEXT5.config.Mode = 'view';
	DEXT5.config.EditorHolder = "jsdeta_divTbbsCntn";
	var editor = new Dext5editor("tbbsCont");
}

$(document).ready(function(e) {
	
	initeditor();
	$("#jsdeta_actRadio").hide(); // 처리중, 처리완료 삭제 (2019.12.12 김창환 주무관 요청)
	
	if (window.sessionStorage.getItem("USR_ID") == null) { // 콜센터 상담사가 아닌 공무원이 요청한 화면이면 상담DB요청등록 버튼 숨김
		$("#jsdeta_btnJisikDbPopup").hide();
		window.sessionStorage.setItem("usrId", sendingUid);
		
	}
	
	var login_usr_id = window.sessionStorage.getItem("USR_ID") == null ? window.sessionStorage.getItem("usrId") : window.sessionStorage.getItem("USR_ID");
	
	if (login_usr_id = '' || login_usr_id == null) {
		alert('로그인후 이용하실 수 있습니다.');
		self.close();
	}
	
	//조회수 업데이트
	addInqrCnt($("#jsdeta_tfTbbsId").val());
	
	$("#jsdeta_btnJisikDbPopup").bind("click", function() {
		opener.jisikRewordPopupQuery($("#jsdeta_prmIntvLgCd").val(), $("#jsdeta_prmIntvMdCd").val(), $("#jsdeta_prmIntvSmCd").val(), $("#jsdeta_prmCdbGbCd").val(), encodeURIComponent(encodeURIComponent($(
				"#jsdeta_prmTbblTtl").val())), $("#jsdeta_tfpopup").val());
	});
	
	//닫기버튼 클릭이벤트 등록
	$("#jsdeta_btnClose").bind("click", function() {
		window.close();
	});
	
	$("#jsdeta_btnUpdate").bind("click", btnInsertClickEvent);
	$("#jsdeta_btnCnslAltList").bind("click",btnCnslAltListClickEvent);
	$("#jsdeta_btRespNm").bind("click",btnchangeRespNm);
	$("#jsdeta_btChEdit").bind("click",btnChangeEditMode);
	$("#jsdeta_btChView").bind("click",btnChangeViewMode);
	
	// 2019.12.12 파일 첨부기능 추가
	$("#csdbrg_fileInfos").hide();
});