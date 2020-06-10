var date = new Date();
var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );

var lastMonthText = lastMonth.getMonth() + 1;
if(lastMonthText < 10)
	lastMonthText = "0"+lastMonthText;
var lastYM = lastMonth.getFullYear() + "-" + lastMonthText;

var gCtgCdArr = [];
var gCtgNmArr = [];

var gActOCdArr = [];
var gActONmArr = [];

var gActCdArr = [];
var gActNmArr = [];


// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");


// 이용 실적 종합
function getJsonCounselingYearResult()
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJSZXN1bHQ=",
		"map" : {
			"key" : "value",
			"searchGb" : $("input:radio[name='rdSearch']:checked").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/*
// 행정기관별 상담현황
function getJsonCounselingYearCivil()
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJDaXZpbA==",
		"map" : {
			"key" : "value",
			"searchGb" : $("input:radio[name='rdSearch']:checked").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
*/

//상담유형 및 처리유형 코드 및 명칭 리스트
function getJsonCdNmList(gb)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJHQkNkTm0=",
		"map" : {
			"key" : "value",
			"gb" : gb
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 상담유형별 현황
function getJsonCounselingYearCtg() {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJDVEc=",
			"map" : {
				"key" : "value" ,
//				"ctg_lvl" : "2",
				"ctg_lvl" : "1",
				"searchGb" : $("input:radio[name='rdSearch']:checked").val(),		
				"gCtgCdArr" : gCtgCdArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//처리유형그리드
function getJsonCounselingYearAct() {
		
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJBQ1Q=",
			"map" : {
				"key" : "value" ,
				"tp_cd" : "90014",
				"searchGb" : $("input:radio[name='rdSearch']:checked").val(),
				"gActCdArr" : gActCdArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
/*
// 재구축전 처리유형
function getJsonCounselingYearActO() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJBQ1RfTw==",
			"map" : {
				"key" : "value" ,
				"searchGb" : $("input:radio[name='rdSearch']:checked").val(),
				"gActOCdArr" : gActOCdArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
*/

// 주야간 공휴일
function getJsonCounselingYearHoli() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJIb2xp",
			"map" : {
				"key" : "value" ,
				"searchGb" : $("input:radio[name='rdSearch']:checked").val()				
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 이용 실적 종합 (일일평균 대비 )
function result_tbl(){
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/counselingYearResult.do",
		data : "pJson=" + getJsonCounselingYearResult(),
		success : function(data) {			
			// param값을 JSON으로 파싱	
			
			$.each(data, function(key, result) {
				
					$("#result_year"+result.RN).html(result.YEAR+'년도');
					$("#result_tot_cnt"+result.RN).html(result.TOT_CNT+'건');
					$("#result_day_age_res"+result.RN).html(result.DAY_AGE+'건');
					
					var vRate = (result.WITH_RATE == undefined ? "" : result.WITH_RATE);
					//$("#result_with_rate"+result.RN).html(result.WITH_RATE+'% ' + result.GAP); //전년대비 증가율이 undefined가 나오는 이유는 쿼리 상에서 분모인 (SELECT DAY_AGE FROM DATA B WHERE B.YEAR = A.YEAR-1)가 null이기 때문이다. 그러기에 계산 중 null이 되버리는 것
					$("#result_with_rate"+result.RN).html(vRate);
					
			});

		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}

/*
// 행정기관별 상담현황
function civil_tbl(){
	$(".civil_1").css("display", "none");
	$(".civil_2").css("display", "none");
	$(".civil_3").css("display", "none");
	$(".civil_4").css("display", "none");
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/counselingYearCivil.do",
		data : "pJson=" + getJsonCounselingYearCivil(),
		success : function(data) {			
			// param값을 JSON으로 파싱	
			
			$.each(data, function(key, civil) {
				if(civil.GB=='CNT'){
					$(".civil_"+civil.RN).css("display", "");
					$("#civil_year"+civil.RN).html(civil.YEAR);
				}
				
				$("#civil_tot_"+civil.GB+civil.RN).html(civil.TOT_CNT);
				$("#civil_do_"+civil.GB+civil.RN).html(civil.DO_CNT);
				$("#civil_sj_"+civil.GB+civil.RN).html(civil.SJ_CNT);
				$("#civil_ss_"+civil.GB+civil.RN).html(civil.SS_CNT);
				$("#civil_etc_"+civil.GB+civil.RN).html(civil.ETC_CNT);
					
			});

		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}
*/
// 여기111
function GbCdNmList(){
	
	gCtgCdArr = [];
	gCtgNmArr = [];

	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/ctgCodeList.do",
		data : "pJson=" + getJsonCdNmList('CTG'),
		success : function(data) {
			// param값을 JSON으로 파싱	
			$.each(data, function(key, state) {
				gCtgCdArr.push(state.CD);
				gCtgNmArr.push(state.NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	
	
	
	for(var i = 0  ; i < 9; i++){
		$("#ctg_nm"+i).css("display", "none");
		$("#ctg_"+i+"_CNT4").css("display", "none");
		$("#ctg_"+i+"_RATE4").css("display", "none");
		$("#ctg_"+i+"_CNT3").css("display", "none");
		$("#ctg_"+i+"_RATE3").css("display", "none");
		$("#ctg_"+i+"_CNT2").css("display", "none");
		$("#ctg_"+i+"_RATE2").css("display", "none");
		$("#ctg_"+i+"_CNT1").css("display", "none");
		$("#ctg_"+i+"_RATE1").css("display", "none");
		
	}

	for(var i = 0  ; i < gCtgNmArr.length; i++){
		if(i < 9){
			$("#ctg_nm"+i).html(gCtgNmArr[i]);
			$("#ctg_nm"+i).css("display", "");
			$("#ctg_"+i+"_CNT4").css("display", "");
			$("#ctg_"+i+"_RATE4").css("display", "");
			$("#ctg_"+i+"_CNT3").css("display", "");
			$("#ctg_"+i+"_RATE3").css("display", "");
			$("#ctg_"+i+"_CNT2").css("display", "");
			$("#ctg_"+i+"_RATE2").css("display", "");
			$("#ctg_"+i+"_CNT1").css("display", "");
			$("#ctg_"+i+"_RATE1").css("display", "");
		}
	}
	
/*
	gActOCdArr = [];
	gActONmArr = [];

	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/ctgCodeList.do",
		data : "pJson=" + getJsonCdNmList('ACT_O'),
		success : function(data) {			
			// param값을 JSON으로 파싱			
			$.each(data, function(key, state) {
				gActOCdArr.push(state.CD);
				if(state.NM == "접수이관(유선)") gActONmArr.push("접수이관<br/>(유선)");
				else if(state.NM == "접수이관(자체완료)") gActONmArr.push("접수이관<br/>(자체완료)");
				else gActONmArr.push(state.NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
		
	
	for(var i = 0  ; i < 9; i++){
		$("#act_o_nm"+i).css("display", "none");
		$("#act_o_"+i+"_CNT4").css("display", "none");
		$("#act_o_"+i+"_RATE4").css("display", "none");
		$("#act_o_"+i+"_CNT3").css("display", "none");
		$("#act_o_"+i+"_RATE3").css("display", "none");
		$("#act_o_"+i+"_CNT2").css("display", "none");
		$("#act_o_"+i+"_RATE2").css("display", "none");
		$("#act_o_"+i+"_CNT1").css("display", "none");
		$("#act_o_"+i+"_RATE1").css("display", "none");
		
	}	
	for(var i = 0  ; i < gActONmArr.length; i++){
		if(i < 9){
			$("#act_o_nm"+i).html(gActONmArr[i]);
			$("#act_o_nm"+i).css("display", "");
			$("#act_o_"+i+"_CNT4").css("display", "");
			$("#act_o_"+i+"_RATE4").css("display", "");
			$("#act_o_"+i+"_CNT3").css("display", "");
			$("#act_o_"+i+"_RATE3").css("display", "");
			$("#act_o_"+i+"_CNT2").css("display", "");
			$("#act_o_"+i+"_RATE2").css("display", "");
			$("#act_o_"+i+"_CNT1").css("display", "");
			$("#act_o_"+i+"_RATE1").css("display", "");
		}
	}	
*/
	
	gActCdArr = [];
	gActNmArr = [];

	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/ctgCodeList.do",
		data : "pJson=" + getJsonCdNmList('ACT'),
		success : function(data) {
			// param값을 JSON으로 파싱			
			$.each(data, function(key, state) {
				gActCdArr.push(state.CD);
				gActNmArr.push(state.NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	
	
	
	
	for(var i = 0  ; i < 9; i++){
		$("#act_nm"+i).css("display", "none");
		$("#act_"+i+"_CNT4").css("display", "none");
		$("#act_"+i+"_RATE4").css("display", "none");
		$("#act_"+i+"_CNT3").css("display", "none");
		$("#act_"+i+"_RATE3").css("display", "none");
		$("#act_"+i+"_CNT2").css("display", "none");
		$("#act_"+i+"_RATE2").css("display", "none");
		$("#act_"+i+"_CNT1").css("display", "none");
		$("#act_"+i+"_RATE1").css("display", "none");
		
	}
	
	for(var i = 0  ; i < gActNmArr.length; i++){
		if(i < 9){
			$("#act_nm"+i).html(gActNmArr[i]);
			$("#act_nm"+i).css("display", "");
			$("#act_"+i+"_CNT4").css("display", "");
			$("#act_"+i+"_RATE4").css("display", "");
			$("#act_"+i+"_CNT3").css("display", "");
			$("#act_"+i+"_RATE3").css("display", "");
			$("#act_"+i+"_CNT2").css("display", "");
			$("#act_"+i+"_RATE2").css("display", "");
			$("#act_"+i+"_CNT1").css("display", "");
			$("#act_"+i+"_RATE1").css("display", "");
		}
	}	
}

// 여기222
function ctg_tbl(){
	
	$(".ctg_1").css("display", "none");
	$(".ctg_2").css("display", "none");
	$(".ctg_3").css("display", "none");
	$(".ctg_4").css("display", "none");
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/counselingYearCivil.do",
		data : "pJson=" + getJsonCounselingYearCtg(),
		success : function(data) {			
			// param값을 JSON으로 파싱	
			$.each(data, function(key, ctg) {
				if(ctg.GB=='CNT'){
					$(".ctg_"+ctg.RN).css("display", "");
					$("#ctg_year"+ctg.RN).html(ctg.YEAR);
				}
				
				$("#ctg_tot_"+ctg.GB+ctg.RN).html(ctg.TOT);
				
				for(var i = 0  ; i < gCtgCdArr.length; i++){					
					var temp= 'ctg.C'+gCtgCdArr[i];
					if(i < 9){
						$("#ctg_"+i+'_'+ctg.GB+ctg.RN).html(eval(temp));
					}
				}
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}

function act_tbl(){
	
	$(".act_1").css("display", "none");
	$(".act_2").css("display", "none");
	$(".act_3").css("display", "none");
	$(".act_4").css("display", "none");
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/counselingYearACT.do",
		data : "pJson=" + getJsonCounselingYearAct(),
		success : function(data) {			
			// param값을 JSON으로 파싱
			console.log(1);
			console.log(gActCdArr);
			console.log(data)
			
			$.each(data, function(key, act) {
				console.log(2)
				console.log(act)
				if(act.GB=='CNT'){
					$(".act_"+act.RN).css("display", "");
					$("#act_year"+act.RN).html(act.YEAR);
				}
				
				$("#act_tot_"+act.GB+act.RN).html(act.TOT);
				
				for(var i = 0  ; i < gActCdArr.length; i++){
					var temp='act.A'+gActCdArr[i]+'';
					if(i < 9){
						$("#act_"+i+'_'+act.GB+act.RN).html(eval(temp));
					}
				}
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}
/*
function actO_tbl(){
	
	$(".act_o_2").css("display", "none");
	$(".act_o_3").css("display", "none");
	$(".act_o_4").css("display", "none");
	
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/counselingYearACT_O.do",
		data : "pJson=" + getJsonCounselingYearActO(),
		success : function(data) {			
			// param값을 JSON으로 파싱	
			
			$.each(data, function(key, act_o) {
				if(act_o.GB=='CNT'){
					$(".act_o_"+act_o.RN).css("display", "");
					$("#act_o_year"+act_o.RN).html(act_o.YEAR);
				}
				
				$("#act_o_tot_"+act_o.GB+act_o.RN).html(act_o.TOT);
				
				for(var i = 0  ; i < gActOCdArr.length; i++){
					var temp='act_o.'+gActOCdArr[i]+'';
					
					
					if(i < 9){
						$("#act_o_"+i+'_'+act_o.GB+act_o.RN).html(eval(temp));
					}
				}
				
					
			});

		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}
*/

function holi_tbl(){

	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/counselingYearHoli.do",
		data : "pJson=" + getJsonCounselingYearHoli(),
		success : function(data) {			
			// param값을 JSON으로 파싱	
			
			$.each(data, function(key, holi) {
				/*
				if(holi.GB=='TOT'){
					
					$("#cslCntM_tot_h07h09").html(holi.H07H09);
					$("#cslCntM_tot_h09h18").html(holi.H09H18);
					$("#cslCntM_tot_h18h22").html(holi.H18H22);
					$("#cslCntM_tot_tot_cnt").html(holi.TOT_CNT);
					$("#cslCntM_tot_day_avg").html(holi.DAY_AVG);
				}
				*/
				
				if(holi.GB=='2'){
					$("#cslCntM_holi_year").html(holi.YEAR+'년 ['+holi.MONTH+'월]');
					$("#cslCntM_day_h07h09").html(holi.H07H09);
					$("#cslCntM_day_h09h18").html(holi.H09H18);
					$("#cslCntM_day_h18h22").html(holi.H18H22);
					$("#cslCntM_day_tot_cnt").html(holi.TOT_CNT);
					$("#cslCntM_day_day_avg").html(holi.DAY_AVG);
					
				}
				
				/*
				if(holi.GB=='7'){					
					$("#cslCntM_sat_h07h09").html(holi.H07H09);
					$("#cslCntM_sat_h09h18").html(holi.H09H18);
					$("#cslCntM_sat_h18h22").html(holi.H18H22);
					$("#cslCntM_sat_tot_cnt").html(holi.TOT_CNT);
					$("#cslCntM_sat_day_avg").html(holi.DAY_AVG);
					
				}
				if(holi.GB=='10'){					
					$("#cslCntM_sun_h07h09").html(holi.H07H09);
					$("#cslCntM_sun_h09h18").html(holi.H09H18);
					$("#cslCntM_sun_h18h22").html(holi.H18H22);
					$("#cslCntM_sun_tot_cnt").html(holi.TOT_CNT);
					$("#cslCntM_sun_day_avg").html(holi.DAY_AVG);
					
				}
				*/
			});

		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}


//조회 버튼 클릭 이벤트 
function stsYearSearch(){	
	result_tbl();
	GbCdNmList();
	ctg_tbl();
	act_tbl();
	holi_tbl(); // 상담실적 영역 데이터
	//civil_tbl(); // 행정기관별 상담현황
	//actO_tbl(); // 처리유형별 현황 2) 시스템 재구축 전
}


/* 데이타가져오기 이벤트 */
function stsYearhBatch() {
	if($("#cslCntM_batchMonth").val().trim() == ""){
		alert("데이타가져오기를 위한 조회일자를 입력하세요.");		
		return;
	}
	/*
	else if($("#cslCntM_batchMonth").val().replace(/-/gi, "").trim() < "201803"){
		alert("2018년 3월 이후의 데이타만 가져올 수 있습니다.");		
		return;
	}
	*/
	var jabDate = $("#cslCntM_batchMonth").val().replace(/-/gi, "");
	var loginID = window.sessionStorage.getItem("USR_ID");
	
	
////////////////////////////////
	if (confirm($("#cslCntM_batchMonth").val().trim()+" 데이타가 초기화됩니다. 데이타 가져오기를 실행하시겠습니까?") == true){
					$.ajax({
						type : "post",
						dataType: "json",
						async : false,
						url : getContextPath() + "/ajax/statistics/batchCounselingCntMonth.do",
						data : "pJson=" + callOrgBatch(jabDate, loginID),  
						success : function(data){
							
							$.ajax({
								type : "post",
								dataType: "json",
								async : false,
								url : getContextPath() + "/ajax/counsel/orgJobDtm.do",
								data : "pJson=" + getJsonOrgJobData(),
								success : function(data){
									alert("배치실행을 " +data.PROC_ST_NM + "하였습니다."+"\n"+"["+data.ERR_MSG+"]" );
									stsYearSearch();
								},
								error : function(data, status, err) {							
									networkErrorHandler(data, status, err);
								}
							});	
						},
						error : function(data, status, err) {
							alert("배치실행을 완료하지못하였습니다. 재실행하시기 바랍니다.");							
							networkErrorHandler(data, status, err);
						}
					});						
	}
////////////////////////////	
	
}

// 데이타가져오기
function callOrgBatch(jabDate, loginID){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTAuYmF0Y2hDb3Vuc2VsaW5nQ250RGF5",
			"map" : {
				"key" : "value",				
				"jabDate": jabDate,
				"loginID": loginID,
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonOrgJobData(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b2gwNTAuam9iRGF0YQ==",
			"map" : {
				"key" : "value",
				"wrk_nm" : "PR_DAILY_COUNSELING"
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

// 출력 이벤트 
function sayPrint(){
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/stsCounselingCntMonth.jsp?schDt="+$("#tdate").val().replace(/-/g, ""));
}

//엑셀 다운로드 시작------------------------------------------------------------------------------
//엑셀출력
function btnExcelPopup_clickEvent(){
	
	pList = [];
	
	// 캠페인 정보 셀렉트
	pList.push({"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJSZXN1bHQ=",
		"map":	{
			"searchGb" : $("input:radio[name='rdSearch']:checked").val()
	}});
	
	console.log(pList);
	
//	excelDownLoad(getContextPath() + "/excel/statistics/positionConcurrenceList.do", getJsonStr("YmF0Y2g=", null, pList)); //function getJsonStr(qt, mi, map)
	
	excelDownLoad(getContextPath() + "/excel/statistics/positionConcurrenceList.do",getJsondayReportMonthListExcel());
//	getJsondayReportMonthListExcel();
}

//엑셀다운로드
function getJsondayReportMonthListExcel(){
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMzEuY291bnNlbGluZ1llYXJSZXN1bHQ=",
			"map" : {
				"key" : "value",
				"title" : "운영상담현황" + setDownLoadName(),
				"searchGb" : $("input:radio[name='rdSearch']:checked").val(),
				"colWidth" : [40,40,40,40],
//				"colName" : ["RCV_DT_FORMAT","RCV_USR_NM","CUST_NM","CNTCT_INFM_FORMAT", "LOC_YN", "SUPPLY","COURSE","RESULTDAY","RESULTCODEUSR","JG_SERVICE"],
//				"colHeader" : ["위치동의 요청일시", "상담사","고객명","전화번호","동의여부","취득경로","제공받는자","위치 확인결과 일시","응답결과","제공서비스"],
				"colName" : ["YEAR","TOT_CNT","DAY_AGE","WITH_RATE"],
//				"colHeader" : ["구분", $("#result_year1").html(),$("#result_year2").html(),$("#result_year3").html(),$("#result_year4").html()],
				"colHeader" : ["구분", "전체건수","일일평균","전년대비 증가율"],
				"colAlign" : ["center","center","center","center"]
			}
		};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//엑셀 다운로드 끝------------------------------------------------------------------------------



$(document).ready(function(){
	var isMngr= false;
	switch(usr_grd_cd) {
      //case '020100'://파트매니저
      //case '030100'://그룹매니저
      //case '050100'://센터장
      //case '060100'://통합센터장
      case '090100'://시스템관리자
         isMngr = true;
         break;
      default:
         isMngr = false;
         break;
	}
		
	if(isMngr){		
		$("#cslCntM_btnStsYearhPrint").show();
	}else{
		$("#cslCntM_btnStsYearhPrint").hide();
	}
	
	if(usr_grd_cd =='090100'){
		$('#cslCntM_batchMonth').val( lastYM );
		$("#cslCntM_batchMonth").MonthPicker({
			MaxMonth: -1
	    });
		$("#lblBatch").show();
		$("#cslCntM_batchMonth").show();
		$("#cslCntM_btnStsYearhBatch").show();		
	}else{
		$("#lblBatch").hide();
		$("#cslCntM_batchMonth").hide();
		$("#cslCntM_btnStsYearhBatch").hide();			
	}
	
	
	
	
	/*
	$("#cslCntM_batchMonth").val(getAddDate(getDate(),-1));
	datePicker("#cslCntM_batchMonth");
	
	if($("#cslCntM_batchMonth").val().replace(/-/gi, "").trim() < "20180311"){
		
		$("#cslCntM_btnStsYearhBatch").css("display","none");
	}else{
		$("#cslCntM_btnStsYearhBatch").css("display","inline-block");
	}
	
	$("#cslCntM_batchMonth").bind("change",  function () {		
		$( "#cslCntM_batchMonth" ).datepicker( "option", "maxDate",getAddDate(getDate(),-1));
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
		if($("#cslCntM_batchMonth").val().replace(/-/gi, "").trim() < "20180311"){
			
			$("#cslCntM_btnStsYearhBatch").css("display","none");
		}else{
			$("#cslCntM_btnStsYearhBatch").css("display","inline-block");
		}
	});


		
		*/
	
	// 조회
	stsYearSearch();
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntM_btnStsYearhSearch").bind("click", stsYearSearch);
	
	
	
	
	// 집계돌리기 이벤트
	$("#cslCntM_btnStsYearhBatch").bind("click",stsYearhBatch);	
	 
	 
	/*	
	// 출력 버튼 클릭 이벤트 등록
	$("#cslCntM_btnStsYearhPrint").bind("click",sayPrint); // 레포팅 툴
	*/	
	$("#cslCntM_btnStsYearhPrint").bind("click",btnExcelPopup_clickEvent); // 엑셀 다운로드 추가	
	
});