$(document).ready(function() {
	var x = opener.document.getElementById("cstrvc_ctzn_tel_no_c").textContent; 
	document.getElementById("cstrvc_tfSendPhoneNum").value = x;
	
	var y = opener.document.getElementById("cstrvc_ofce_tel_no").value;
	document.getElementById("cstrvc_labSendNum").value = y;
	
	var z = opener.document.getElementById("cstrvc_tckt_id_c").value;
	document.getElementById("cstrvc_tfTcktId").value = z;

	document.getElementById("cstrvc_tfSendCont").value = "[공주시 민원 접수건에 대한 처리내용]\n" + opener.document.getElementById("cstrvc_cvl_act_cont").value;
	
	// 예약일시 datetimepicker 설정
	$("#cstrvc_tfResvDtm").datetimepicker({
		lang : "ko",
		format : "Y-m-d H:i",
		allowTimes : [
		              "08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
		              "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
		              "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
		              "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
		              "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
		              "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
		              "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
		              "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
		              "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
		              "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
		              "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
		              "19:00", "19:10", "19:20", "19:30", "19:40", "19:50"
		              ],
		step : 10
	});
	
	// 초기화 버튼 클릭 이벤트
	$("#cstrvc_btnInit").bind("click", btnInit_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#cstrvc_btnSend").bind("click", btnSend_clickEvent);
});

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent(){
	$("#labCountTxt").html("0");
	$("#tfResvDtm").val("");
	$("#cstrvc_tfSendCont").val("[공주시 민원 접수건에 대한 처리내용]\n");
	$("#cstrvc_tfSendImg").val("");
}

//파일 확장자 체크
function fileSmsCheck(fileFormName) { 
	
	var file = fileFormName.value; // 폼.파일이름.value
	var fileExt = file.substring(file.lastIndexOf('.')+1); 	//파일의 확장자를 구합니다.
	var bSubmitCheck = true;

	if(!file)
	{ 
		alert( "파일을 선택하여 주세요!");
		return false;
	}

	if(fileExt.toUpperCase() == "JPG" ){
		return true;
	}else{
		return false;
	};
}

//파라미터 셋팅_ChSndId
function getJsonStrChSndId(){ // 여기2
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjAuZ2V0Q2hTbmRJZA==",
		"map" : {
			"key" : "value"
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SendSms
function getJsonStrSendSms(ch_snd_id){ // 여기3
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFNtcw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : ch_snd_id,
			"tckt_id" : $("#cstrvc_tfTcktId").val(),
			"cust_id" : "1",
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#cstrvc_tfSendPhoneNum").val().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : $("#cstrvc_tfSendCont").val()+"\n"+$("#cstrvc_sendContFooter").html(),
			"snd_resv_dt" : $("#cstrvc_tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#cstrvc_tfResvDtm").val().trim())),
			"snd_resv_tm" : $("#cstrvc_tfResvDtm").val().trim() == "" ? "" : changeTimeString(getResvDate($("#cstrvc_tfResvDtm").val().trim())),
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : window.sessionStorage.getItem("usrId"),
			"cro_id" : "2ksys_test",
			"schedule_type" : $("#cstrvc_tfResvDtm").val().trim() == "" ? "0" : "1",
			"subject" : "공주시청컨텍센터",
			"callback" : $("#cstrvc_labSendNum").val().replace(/-/gi, ""),
			"dest_info" : $("#cstrvc_tfSendPhoneNum").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#cstrvc_labCountTxt").html()),
			"p_param" : makeSmsSendParam(ch_snd_id),
			"login_usr_id" : window.sessionStorage.getItem("usrId"),
			"tbl_nm" : "ch020",
			"tbl_pk": ch_snd_id,
			"send_img" : $("#cstrvc_tfSendImg").val().trim()
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//sms 전송 프로시저 호출을 위한 파라미터 제작
function makeSmsSendParam(ch_snd_id){
	var rsltStr = "";
	var arrParam = {};
	
	arrParam[0] = window.sessionStorage.getItem("IP_ADDRESS");			// 전송자 IP
	arrParam[1] = window.sessionStorage.getItem("usrId");			// 전송자 ID
	arrParam[2] = $("#cstrvc_tfSendPhoneNum").val().replace(/-/gi, "");			// 수신자 전화번호
	arrParam[3] = $("#cstrvc_labSendNum").html().replace(/-/gi, "");			// 발신자 전화번호
	arrParam[4] = "";			// 제목
	arrParam[5] = $("#cstrvc_tfSendCont").val()+"\n"+$("#cstrvc_sendContFooter").html();			// 내용
	arrParam[6] = $("#cstrvc_tfResvDtm").val().trim() == "" ? "N" : "Y";			// 예약여부
	arrParam[7] = $("#cstrvc_tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#cstrvc_tfResvDtm").val().trim())) + changeTimeString(getResvDate($("#cstrvc_tfResvDtm").val().trim()));			// 예약일자
	arrParam[8] = "044009";			// 메시지구분(044009)
	arrParam[9] = window.sessionStorage.getItem("usrId");			// 전송자명
	arrParam[10] = "0099";		// 전송작업장코드(0099)
	arrParam[11] = ""; // $("#tfCustFarmNo").val();		// 식별번호
	arrParam[12] = "tmp.txt";		// 첨부파일
	arrParam[13] = ""; // $("#cstrvc_tfCustId").val();		// 수신자 주소록번호
	arrParam[14] = ""; // $("#cstrvc_tfCustId").val();		// 수신자아이디
	arrParam[15] = "";		// 수신자명
	arrParam[16] = "";		// 기타
	arrParam[17] = "";		// 옵션1
	arrParam[18] = ch_snd_id;		// 옵션2
	arrParam[19] = $("#cstrvc_tfTcktId").val();		// 옵션3_접수번호
	arrParam[20] = window.sessionStorage.getItem("CNTR_CD") == "010000" ? "GRADE" : "MTRACE";		// 사업구분_GRADE or MTRACE
	
	for(var i = 0; i < 21; i++){
		if(i == 20)
			rsltStr += arrParam[i];
		else
			rsltStr += arrParam[i] + "|";
	}
	
	return rsltStr;
}

//파라미터 셋팅_CustInfo
function getJsonStrFindFile(custId){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wMTkuZmlsZUxpc3Q=",
			"map" : {
				"key" : "value",
				"tbl_nm" : "ch020",
				"tbl_pk": custId,
				"orderby": "crtTime",
			}
		};
		return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_SendSms
function getJsonStrSendVms(ch_snd_id ,svr_sv_pth){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFZtcw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : ch_snd_id,
			"tckt_id" : $("#cstrvc_tfTcktId").val(),
			"cust_id" : "1",
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#cstrvc_tfSendPhoneNum").val().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : $("#cstrvc_tfSendCont").val()+"\n"+$("#cstrvc_sendContFooter").html(),
			"snd_resv_dt" : $("#cstrvc_tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#cstrvc_tfResvDtm").val().trim())),
			"snd_resv_tm" : $("#cstrvc_tfResvDtm").val().trim() == "" ? "" : changeTimeString(getResvDate($("#cstrvc_tfResvDtm").val().trim())),
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : window.sessionStorage.getItem("usr_id"),
			"cro_id" : "2ksys_test",
			"schedule_type" : $("#cstrvc_tfResvDtm").val().trim() == "" ? "0" : "1",
			"subject" : "공주시청컨텍센터",
			"callback" : $("#cstrvc_labSendNum").html().replace(/-/gi, ""),
			"dest_info" : $("#cstrvc_tfSendPhoneNum").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#cstrvc_labCountTxt").html()),
			"p_param" : makeSmsSendParam(ch_snd_id),
			"cont_data" : svr_sv_pth,
			"tbl_nm" : "ch020",
			"tbl_pk": ch_snd_id,
			"send_img" : $("#cstrvc_tfSendImg").val().trim(),
			"message" : "발송요청이 완료되었습니다."
		}
	};
	
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//전송 버튼 클릭 이벤트 
function btnSend_clickEvent(){
	if(document.cstrvc_smsSendForm.cstrvc_tfSendImg.value != ""){
		var nLimitSize = 0.30; //제한사이즈 MB
		var formName = $("#cstrvc_smsSendForm input[name=cstrvc_tfSendImg]");
		for(var i=0; i<formName.length; i++){
			if(formName[i].value !=""){
				var nRtn=fileCheck(formName[i] , nLimitSize);
				if(nRtn>nLimitSize){ 
					alert( "("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
					return;
				}
				
				//파일 확장자 체크
				if (fileSmsCheck(formName[i]) == false){
					alert("JPG 파일만 업로드 하실 수 있습니다!");
					return;
				}
			}
		}
	};
	
	$.ajax({ // 여기1
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/cswgetChSndId.do",
		data : "pJson=" + getJsonStrChSndId(),
		success : function(data){
			var ch_snd_id = data.CH_SND_ID.toString();
			var vms = true;
			var vmsImg = $("#cstrvc_tfSendImg").val().trim();

			try{
				gAppendHidden("cstrvc_smsSendForm", "pJson", getJsonStrSendSms(ch_snd_id));
				gSubmitPost("cstrvc_smsSendForm", true);
				vms = true;
			}catch(e){
				vms = false;
			}finally{
				if (vmsImg == "" || vmsImg == null) {
					vmsImg = true;
				};

				if(vms && vmsImg != ""){
					alert("발송요청이 완료되었습니다.");
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : false,
						url : getContextPath() + "/ajax/civilservice/cswsendVms.do",
						data : "pJson=" + getJsonStrFindFile(ch_snd_id),
						success : function(data){
							if (data != null){
								$.ajax({
									type : "post",
									async : false,
									url : getContextPath() + "/ajax/civilservice/cswmessageInsert.do",
									data : "pJson=" + getJsonStrSendVms(ch_snd_id, data.SVR_SV_PTH),
									success : function(data){
										window.close();
									},
									error : function(data, status, err){
										networkErrorHandler(data, status, err);
									}	
								});	
							}
							window.close();
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
					
				}else{
					alert("발송요청이 완료되었습니다.");
					window.close();
				};
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}