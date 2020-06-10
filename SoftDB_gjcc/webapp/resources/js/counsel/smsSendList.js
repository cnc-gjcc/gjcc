var g_srchType = "";
var g_srchVal = "";
var g_srchUsr = "";
var g_srchActstcd = "";
var g_srchDateType = "";
var g_srchDate = "";
var g_srchDateEn = "";
var fileForm = "";
var smsFileBox_idx = 0;
// var g_tcktId = "";
var smsUsrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

// 파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터셋팅 첨부파일
function getJsonSmsFileList(noteId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "ch020",
			"tbl_pk" : noteId,
			"orderby" : "crtTime",
		}
	};

	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


// 파라미터 셋팅_SmsSendSpec
function getJsonStrSmsSendSpec(chSndId) {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjAuY2hTZW5kU3BlYw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : chSndId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_UsrList
function getJsonStrUsrList() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_SmsSendList
function getJsonStrSmsSendList() {
	g_srchType = $("#smlist_selSrchtype").val();
	g_srchVal = $("#smlist_tfSrchVal").val().trim();
	g_srchUsr = $("#smlist_selSrchUsr").val() == "all" ? "" : $("#smlist_selSrchUsr").val();
	g_srchActstcd = $("#smlist_selSrchActStCd").val() == "all" ? "" : $(
			"#smlist_selSrchActStCd").val();
	g_srchDateType = $("#smlist_selSrchDateType").val();
	g_srchDate = $("#smlist_tfSrchDate").val().replace(/-/gi, "");
	g_srchDateEn = $("#smlist_tfSrchDateEn").val().replace(/-/gi, "");
	// g_tcktId = $("#smlist_tfSrchTcktId").val().trim();

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjAuY2hTZW5kTGlzdA==",
		"map" : {
			"key" : "value",
			"ch_gb_cd" : "12000",
			"srchType" : g_srchType,
			"srchVal" : g_srchVal,
			"srchUsr" : g_srchUsr,
			"srchActstcd" : g_srchActstcd,
			"srchDateType" : g_srchDateType,
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn
		// "tckt_id" : g_tcktId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_SmsSendListExcel
function getJsonStrSmsSendListExcel() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjAuY2hTZW5kTGlzdA==",
		"map" : {
			"key" : "value",
			"ch_gb_cd" : "12000",
			"srchType" : g_srchType,
			"srchVal" : g_srchVal,
			"srchUsr" : g_srchUsr,
			"srchActstcd" : g_srchActstcd,
			"srchDateType" : g_srchDateType,
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn,
			// "tckt_id" : g_tcktId,
			"sidx" : $("#smlist_tblSmsSendList").getGridParam("sortname"),
			"sord" : $("#smlist_tblSmsSendList").getGridParam("sortorder"),
			"title" : "SMS발송목록" + setDownLoadName(g_srchDate, g_srchDateEn),
			"colWidth" : [ 15, 15, 20, 10, 25, 15, 15 ],
			"colName" : [ "USR_NM", "CUST_NM", "CNTCT_INFM", "SMS_TYPE",
					"SND_END_DTM", "SND_RSLT_NM" ],
			"colHeader" : [ "상담사", "고객명", "수신자번호", "문자유형", "요청일시", "발신결과" ],
			"colAlign" : [ "center", "center", "center", "center", "center",
					"center" ]
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_UpdateSendSpec
function getJsonStrUpdateSendSpec(isDelete) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMjAudXBkYXRl",
		"map" : {
			"key" : "value",
			"ch_snd_id" : $("#smlist_tfSpecChSndId").val(),
			"rcv_cntct_infm" : isDelete == "Y" ? "" : $("#smlist_tfSpecChCntctInfm")
					.val().trim().replace(/-/gi, ""),
			"snd_cont" : isDelete == "Y" ? "" : $("#smlist_tfSpecSndCont").val(),
			"snd_resv_dt" : isDelete == "Y" ? ""
					: changeDateString(getResvDate($("#smlist_tfSpecSndResvDtm").val())),
			"snd_resv_tm" : isDelete == "Y" ? ""
					: changeTimeString(getResvDate($("#smlist_tfSpecSndResvDtm").val())),
			"use_yn" : isDelete == "Y" ? "N" : "",
			"cro_id" : "2ksys_test",
			"schedule_type" : $("#smlist_tfSpecSndResvDtm").val().trim() == "" ? "0"
					: "1",
			"subject" : "",
			"callback" : "120",
			"dest_info" : $("#smlist_tfSpecChSndId").val() + "^"
					+ $("#smlist_tfSpecChCntctInfm").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#smlist_labSpecCountTxtNum").html())
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//첨부파일 보기
function showAttachSmsFiles(noteId) {
	$
			.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/message/fileList.do",
				data : "pJson=" + getJsonSmsFileList(noteId),
				success : function(data) {
					for ( var i in data) {
						var url = getContextPath()
								+ "/file/message/messageFileDown.do?pJson="
								+ getJsonFileDownload(data[i].SVR_SV_PTH,
										data[i].LOC_FL_NM);
						var tr = "<tr>";
						tr += "<td align='left' style='width: 85%;'><input type='hidden' name='record_"
								+ data[i].FL_ID + "' value='' />";
						tr += "<span style='width: 320px;'><a href='" + url
								+ "' target='_blank'>" + data[i].LOC_FL_NM
								+ "</a></span></td>";
						tr += "<td><span>" + data[i].FL_KB_SZ + "</span></td>";
						tr += "</tr>";
						smsFileBox_idx++;
						$("#smlist_smsFileInfos").prepend(tr);
					}
					if (smsFileBox_idx >= 1) {
						// $("#smlist_MESSAGE").closest("tr").hide();
						$("#smlist_MESSAGE").prop("disabled", true);
						$("#smlist_rmFilebox").prop("disabled", true);
					}
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
}

// 저장 버튼 클릭 이벤트
function btnModify_clickEvent() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateChSendSpec.do",
		data : "pJson=" + getJsonStrUpdateSendSpec("N"),
		success : function(data) {
			alert("저장되었습니다.");

			$("#smlist_tblSmsSendList").trigger("reloadGrid");
			initSpec();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 삭제 버튼 클릭 이벤트
function btnDelete_clickEvent() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateChSendSpec.do",
		data : "pJson=" + getJsonStrUpdateSendSpec("Y"),
		success : function(data) {
			alert("삭제되었습니다.");

			$("#smlist_tblSmsSendList").trigger("reloadGrid");
			initSpec();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 조회버튼 클릭 이벤트
function btnSearch_clickEvent() {
	$("#smlist_tblSmsSendList").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrSmsSendList()
		},
		page : 1,
		sortname : "CH_SND_ID",
		sortorder : "desc"
	});
	$("#smlist_tblSmsSendList").trigger("reloadGrid");
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() {
	$("#smlist_selSrchtype").val("cust_nm");
	$("#smlist_tfSrchVal").val("");
	$("#smlist_selSrchUsr").val("all");
	$("#smlist_selSrchActStCd").val("all");
	$("#smlist_selSrchDateType").val("req");
	$("#smlist_tfSrchDate").val(getDate()); // 검색일자 (요청일, 예약일, 발신일)
	$("#smlist_tfSrchDateEn").val(getDate()); // 검색일자 (요청일, 예약일, 발신일)

	$("#smlist_tblSmsSendList").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrSmsSendList()
		},
		page : 1,
		sortname : "CH_SND_ID",
		sortorder : "desc"
	});
	$("#smlist_tblSmsSendList").trigger("reloadGrid");

	initSpec();
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent() {
	excelDownLoad(getContextPath() + "/excel/counsel/smsSendList.do",
			getJsonStrSmsSendListExcel());
}

// 상세정보 부분 초기화
function initSpec() {
	$("#smlist_btnModify").hide();
	$("#smlist_btnDelete").hide();

	$("#smlist_tfSpecChSndId").val("");
	$("#smlist_labSpecUsrNm").html("");
	$("#smlist_tfSpecSndCont").val("");
	$("#smlist_labSpecCountTxtNum").html("0");
	$("#smlist_labSpecCorpNm").html("");
	$("#smlist_labSpecCustNm").html("");
	$("#smlist_labSpecSendFrom").html("");
	$("#smlist_tfSpecChCntctInfm").val("");
	$("#smlist_labSpecSndReqDtm").html("");
	$("#smlist_tfSpecSndResvDtm").val("");
	$("#smlist_labSpecSndEndDtm").html("");
	$("#smlist_labSpecSndRsltNm").html("");
	$("#smlist_labSpecTcktId").html("");

	$("#smlist_tfSpecSndCont").prop("disabled", true);
	$("#smlist_tfSpecChCntctInfm").prop("disabled", true);
	$("#smlist_tfSpecSndResvDtm").prop("disabled", true);

	smsFileBox_idx = 0;
	$("#smlist_smsFileInfos").empty().append(fileForm);

	$("#smlist_tblSmsSendList").jqGrid(
			{
				url : getContextPath() + "/jqgrid/counsel/smsSendList.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStrSmsSendList()
				},
				jsonReader : {
					repeatitems : false
				},
				colNames : [ "상담사", "회사/부서", "고객명", "전화번호", "문자유형", "요청일시",
						"처리상태", "접수번호", "채널발신ID" ],
				colModel : [ {
					name : "USR_NM",
					index : "USR_NM",
					width : 80,
					align : "center"
				}, {
					name : "CORP_NM",
					index : "CORP_NM",
					width : 200,
					align : "center",
					hidden : true
				}, {
					name : "CUST_NM",
					index : "CUST_NM",
					width : 80,
					align : "center"
				}, {
					name : "CNTCT_INFM",
					index : "CNTCT_INFM",
					width : 120,
					align : "center"
				}, {
					name : "SMS_TYPE",
					index : "SMS_TYPE",
					width : 80,
					align : "center"
				}, {
					name : "SND_END_DTM",
					index : "SND_END_DTM",
					width : 80,
					align : "center"
				}, {
					name : "SND_RSLT_NM",
					index : "SND_RSLT_NM",
					width : 80,
					align : "center"
				}, {
					name : "TCKT_ID",
					index : "TCKT_ID",
					hidden : true
				}, {
					name : "CH_SND_ID",
					index : "CH_SND_ID",
					hidden : true
				} ],
				sortname : "SND_SEQ_FORMAT",
				sortorder : "desc",
				gridview : true,
				hidegrid : false,
				shrinkToFit : true,
				loadonce : false,
				scrollOffset : 0,
				height : "260",
				width : "100%",
				rowNum : 10,
				rowList : [ 10, 20, 30, 50, 100 ],
				autowidth : true,
				pager : "#smlist_pagingSmsSendList",
				rownumbers : true,
				rownumWidth : 30,
				multiselect : false,
				emptyrecords : "",
				caption : "",
				loadui : "enable",
				viewrecords : true,
				onSelectRow : function(rowid) {
					initSpec();

					var row = $("#smlist_tblSmsSendList").getRowData(rowid);

					$.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath()
								+ "/ajax/counsel/getSmsSendSpec.do",
						data : "pJson=" + getJsonStrSmsSendSpec(row.CH_SND_ID),
						success : function(data) {
							$("#smlist_btnModify").hide();
							$("#smlist_btnDelete").hide();

							$("#smlist_tfSpecSndCont").prop("disabled", true);
							$("#smlist_tfSpecChCntctInfm").prop("disabled", true);
							$("#smlist_tfSpecSndResvDtm").prop("disabled", true);

							$("#smlist_tfSpecChSndId").val(data.CH_SND_ID);
							$("#smlist_labSpecUsrNm").html(data.USR_NM);
							$("#smlist_tfSpecSndCont").val(data.SND_CONT);
							$("#smlist_labSpecCountTxtNum").html(
									charByteSize(data.SND_CONT));
							$("#smlist_labSpecCorpNm").html(data.CORP_NM);
							$("#smlist_labSpecCustNm").html(data.CUST_NM);
							$("#smlist_labSpecSendFrom").html(data.SND_CNTCT_INFM);
							$("#smlist_tfSpecChCntctInfm").val(data.CNTCT_INFM);
							$("#smlist_labSpecSndReqDtm").html(data.SND_REQ_DTM);
							$("#smlist_tfSpecSndResvDtm").val(data.SND_RESV_DTM);
							$("#smlist_labSpecSndEndDtm").html(data.SND_END_DTM);
							$("#smlist_labSpecSndRsltNm").html(data.SND_RSLT_NM);
							// $("#smlist_labSpecTcktId").html(data.TCKT_ID);

							showAttachSmsFiles(data.CH_SND_ID);
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
				},
				onPaging : function(pgButton) {
					initSpec();
				}
			}).jqGrid("navGrid", "#smlist_pagingSmsSendList", {
		edit : false,
		add : false,
		del : false,
		search : false
	});
}

$(document).ready(function(){
	$("#smlist_tfSrchDate").val(getDate()); // 검색일자 (요청일, 예약일, 발신일)
	$("#smlist_tfSrchDateEn").val(getDate());

	fileForm = $("#smlist_smsFileInfos tr").parent().html();
	initSpec();
	// 상담사 셀렉트 박스를 채움
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/getUsrList.do",
		data : "pJson=" + getJsonStrUsrList(),
		success : function(data) {
			$("#smlist_selSrchUsr").html("");

			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";

			value += "<option value='all'>전체</option>";

			$.each(jr, function(key, state) {
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM
						+ "</option>";
			});
			$("#smlist_selSrchUsr").append(value);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

	// datepicker
	datePicker("#smlist_tfSrchDate");
	datePicker("#smlist_tfSrchDateEn");

	// 예약일시 datetimepicker 설정
	$("#smlist_tfSpecSndResvDtm").datetimepicker(
			{
				lang : "ko",
				format : "Y-m-d H:i",
				allowTimes : [ "08:00", "08:10", "08:20", "08:30", "08:40",
						"08:50", "09:00", "09:10", "09:20", "09:30", "09:40",
						"09:50", "10:00", "10:10", "10:20", "10:30", "10:40",
						"10:50", "11:00", "11:10", "11:20", "11:30", "11:40",
						"11:50", "12:00", "12:10", "12:20", "12:30", "12:40",
						"12:50", "13:00", "13:10", "13:20", "13:30", "13:40",
						"13:50", "14:00", "14:10", "14:20", "14:30", "14:40",
						"14:50", "15:00", "15:10", "15:20", "15:30", "15:40",
						"15:50", "16:00", "16:10", "16:20", "16:30", "16:40",
						"16:50", "17:00", "17:10", "17:20", "17:30", "17:40",
						"17:50", "18:00", "18:10", "18:20", "18:30", "18:40",
						"18:50", "19:00", "19:10", "19:20", "19:30", "19:40",
						"19:50" ],
				step : 10
			});

	// 검색어 필드 엔터 키 이벤트
	$("#smlist_tfSrchVal").on("keydown", function(key) {
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});

	// 접수번호 필드 엔터 키 이벤트
	$("#smlist_tfSrchTcktId").on("keydown", function(key) {
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});

	// 조회버튼 클릭 이벤트
	$("#smlist_btnSearch").on("click", btnSearch_clickEvent);

	// 초기화 버튼 클릭 이벤트
	$("#smlist_btnInit").on("click", btnInit_clickEvent);

	// 엑셀저장 버튼 클릭 이벤트
	$("#smlist_btnExcel").on("click", btnExcel_clickEvent);

	// 저장 버튼 클릭 이벤트
	$("#smlist_btnModify").on("click", btnModify_clickEvent);

	// 삭제 버튼 클릭 이벤트
	$("#smlist_btnDelete").on("click", btnDelete_clickEvent);

	// 문자내용 keyup 이벤트
	$("#smlist_tfSpecSndCont").on("keyup", function(e) {
		$("#smlist_labSpecCountTxtNum").html(charByteSize($("#smlist_tfSpecSndCont").val()));
	});
});