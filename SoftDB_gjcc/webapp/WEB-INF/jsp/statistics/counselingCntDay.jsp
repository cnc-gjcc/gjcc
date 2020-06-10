<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 
<!DOCTYPE html>
 
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>공주시청컨텍센터 일일업무현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		 
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		 
		 
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntDay.js'/>"></script>
		 
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		<base target="_self">
	</head>
 
 
	<body>
		<div id="h1">공주시청컨텍센터 일일업무현황</div>
		<div id="pop_body" style = "height: 815px; ">
			<div class="stitle">1. 일일업무현황</div><!--"타이틀"-->
 
			<div id="search">
				<table class="search_tbl">
					<tr>
 
						<th style = "width: 50px; padding-right : 15px">
							<label>조회일자</label>
						</th>
						<td style = "width: 350px; "> 
							<input type="text" class="text_Date" id="cslCntD_schDay"  /> 
						</td>
 
						<td class="btn">
			                <button type="button" id="cslCntD_btnStsDaySearch" class="button">조회</button>                 
			                <button type="button" id="cslCntD_btnStsDayInit" class="button">초기화</button>
			                <button type="button" id="cslCntD_btnStsDaySave" class="button">수정</button>
			                <button type="button" id="cslCntD_btnStsDayPrint" class="button">출력</button>
			                <button type="button" id="cslCntD_btnStsDayBatch" class="button_4">데이타가져오기</button>
           				</td> 
					</tr>
				</table>
	</div><!--"조회/검색"-->
 
	<div style="padding-top: 7px;">
		<input type="hidden" class="text_Date" id="cslCntD_tdate"  />
		<div style="width: 40%; float: left;"><b>조회기준일 : <span id='cslCntD_tday'></span></b>/<b>전월동요일 : <span id='cslCntD_yday'></span></b></div>
		<div style="width: 60%; text-align: right; color: red; float: right;">* 데이타 가져오기 실행시 해당일자의 데이이타를 현재기준으로 재집계되오니 주의하시기 바랍니다.</div>
	</div>
	<div style="width: 100%; -ms-overflow-x: scroll;">
 
		<table class="statistics_tbl" style="width:2200px;">
			<tr>
					<th class="line_rb_g" rowspan="2">구분</th>
					<th class="line_rb_g" colspan="5">인력현황</th>
					<th class="line_rb_g" rowspan="2">총처리<br/>건수</th>
					<th class="line_rb_g" colspan="5">IVR</th>
					<th class="line_rb_g" colspan="12" style="width: 870px;">인/아웃바운드</th>
					<th class="line_rb_g" colspan="2">호전환</th>
					<th class="line_rb_g" colspan="3">콜백</th>
					<th class="line_rb_g" rowspan="2">SMS<br/>발송<br/>건수</th>
					<th class="line_rb_g" rowspan="2">팩스<br/>발송<br/>건수</th>
					<th class="line_b_g" colspan="3">평일주간CPD</th>
			</tr>
			<tr>
 
					<th class="line_rb" >스탭</th>
					<th class="line_rb" >상담사</th>
					<th class="line_rb" >휴무자</th>
					<th class="line_rb" >기타</th>
					<th class="line_rb" >총인력</th>
					 
					<th class="line_rb" >인입호</th>
					<th class="line_rb" >응답호</th>
					<th class="line_rb" >포기호</th>
					<th class="line_rb" >응답율<br/>(%)</th>
					 
					<th class="line_rb" >통역<br/>서비스</th>
					 
					<th class="line_rb" >인입호</th>
					<th class="line_rb" >응답호</th> 
					<th class="line_rb" >포기호</th> 
					<th class="line_rb" >응답율<br/>(%)</th>
					<th class="line_rb" style="width:200px;">총통화<br/>시간</th>
					<th class="line_rb" >평균통화<br/>시간</th>
					<th class="line_rb" >OB<br/>성공호</th>
					<th class="line_rb" >상담<br/>인원</th>
					<th class="line_rb_g" >CPH<br/>주1)</th>
					<th class="line_rb_g" >CPD<br/>주2)</th>
					<th class="line_rb" >20초내<br/>성공호</th>
					<th class="line_rb" >20초내<br/>성공율(%)</th>
				 
					<th class="line_rb" >건수</th>
					<th class="line_rb" >비중(%)</th> 
					 
					<th class="line_rb" >접수</th>
					<th class="line_rb" >처리</th>
					<th class="line_rb" >처리율<br/>(%)</th> 
					 
					<th class="line_rb" >평일<br/>총처리<br/>건수</th>
					<th class="line_rb" >상담<br/>인원</th> 
					<th class="line_b_g" >CPD<br/>주3)</th>
				 
			</tr>
			<tr>
					<th class="line_rb">당일</th>
					 
					<td class="line_rb_r" ><input type="text" id="cslCntD_mngr" style="width: 98%; text-align:right" onkeydown="onlyNumber(this)"></td>
					<td class="line_rb_r" ><input type='text' id='cslCntD_agt' style="width: 98%; text-align:right" onkeydown="onlyNumber(this)"></td>
					<td class="line_rb_r" ><input type='text' id='cslCntD_day_off' style="width: 98%; text-align:right" onkeydown="onlyNumber(this)"></td>
					<td class="line_rb_r" ><input type='text' id='cslCntD_etc_prsn' style="width: 98%; text-align:right" onkeydown="onlyNumber(this)"></td>
					<td class="line_rb_r" ><input type='text' id='cslCntD_tota_prsn' style="width: 98%; text-align:right" onkeydown="onlyNumber(this)"></td>
					 
					<td class="line_rb_r" id="cslCntD_inout_call"></td> 
					 
					<td class="line_rb_r" id="cslCntD_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_ivr_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_ivr_ans_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_intpt_svc"></td>
					 
					<td class="line_rb_r" id="cslCntD_in_call"></td>
					<td class="line_rb_r" id="cslCntD_ans_call"></td> 
					<td class="line_rb_r" id="cslCntD_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_ans_rate"></td>
					<td class="line_rb_c" id="cslCntD_tota_call_tm"></td>
					<td class="line_rb_c" id="cslCntD_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_cph"></td>
					<td class="line_rb_r" id="cslCntD_cpd"></td>
					<td class="line_rb_r" id="cslCntD_sec20_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_sec20_succ_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_scnt"></td>
					<td class="line_rb_r" id="cslCntD_rate"></td> 
					 
					<td class="line_rb_r" id="cslCntD_rcv"></td>
					<td class="line_rb_r" id="cslCntD_act"></td>
					<td class="line_rb_r" id="cslCntD_act_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_sms_snd_scnt"></td>
					<td class="line_rb_r" ><input type='text' id='cslCntD_fax_snd_scnt' style="width: 98%; text-align:right" onkeydown="onlyNumber(this)"></td>
					 
					<td class="line_rb_r" id="cslCntD_day_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_day_cnsl_prsn"></td> 
					<td class="line_b_r" id="cslCntD_day_cpd"></td>
			</tr> 
			<tr>
					<th class="line_rb">당월누계</th>
					 
					<td class="line_rb_r"  id="cslCntD_tm_mngr" ></td>
					<td class="line_rb_r"  id='cslCntD_tm_agt' ></td>
					<td class="line_rb_r"  id='cslCntD_tm_day_off' ></td>
					<td class="line_rb_r"  id='cslCntD_tm_etc_prsn' ></td>
					<td class="line_rb_r"  id='cslCntD_tm_tota_prsn' ></td>
					 
					<td class="line_rb_r" id="cslCntD_tm_inout_call"></td>
					 
					<td class="line_rb_r" id="cslCntD_tm_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_ivr_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_ivr_ans_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_tm_intpt_svc"></td>
					 
					<td class="line_rb_r" id="cslCntD_tm_in_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_ans_call"></td> 
					<td class="line_rb_r" id="cslCntD_tm_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_ans_rate"></td>
					<td class="line_rb_c" id="cslCntD_tm_tota_call_tm"></td>
					<td class="line_rb_c" id="cslCntD_tm_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_tm_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_tm_cph"></td>
					<td class="line_rb_r" id="cslCntD_tm_cpd"></td>
					<td class="line_rb_r" id="cslCntD_tm_sec20_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_sec20_succ_rate"></td>
				 
					<td class="line_rb_r" id="cslCntD_tm_scnt"></td>
					<td class="line_rb_r" id="cslCntD_tm_rate"></td> 
					 
					<td class="line_rb_r" id="cslCntD_tm_rcv"></td>
					<td class="line_rb_r" id="cslCntD_tm_act"></td>
					<td class="line_rb_r" id="cslCntD_tm_act_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_tm_sms_snd_scnt"></td>
					<td class="line_rb_r" id="cslCntD_tm_fax_snd_scnt"></td>
					 
					<td class="line_rb_r" id="cslCntD_tm_day_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_tm_day_cnsl_prsn"></td> 
					<td class="line_b_r" id="cslCntD_tm_day_cpd"></td>
			</tr>
			<tr>
					<th class="line_rb">전월</th>
					 
					<td class="line_rb_r"  id="cslCntD_yd_mngr" ></td>
					<td class="line_rb_r"  id='cslCntD_yd_agt' ></td>
					<td class="line_rb_r"  id='cslCntD_yd_day_off' ></td>
					<td class="line_rb_r"  id='cslCntD_yd_etc_prsn' ></td>
					<td class="line_rb_r"  id='cslCntD_yd_tota_prsn' ></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_inout_call"></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_ivr_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_ivr_ans_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_intpt_svc"></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_in_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_ans_call"></td> 
					<td class="line_rb_r" id="cslCntD_yd_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_ans_rate"></td>
					<td class="line_rb_c" id="cslCntD_yd_tota_call_tm"></td>
					<td class="line_rb_c" id="cslCntD_yd_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_yd_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_yd_cph"></td>
					<td class="line_rb_r" id="cslCntD_yd_cpd"></td>
					<td class="line_rb_r" id="cslCntD_yd_sec20_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_sec20_succ_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_scnt"></td>
					<td class="line_rb_r" id="cslCntD_yd_rate"></td> 
					 
					<td class="line_rb_r" id="cslCntD_yd_rcv"></td>
					<td class="line_rb_r" id="cslCntD_yd_act"></td>
					<td class="line_rb_r" id="cslCntD_yd_act_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_sms_snd_scnt"></td>
					<td class="line_rb_r" id="cslCntD_yd_fax_snd_scnt"></td>
					 
					<td class="line_rb_r" id="cslCntD_yd_day_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_yd_day_cnsl_prsn"></td> 
					<td class="line_b_r" id="cslCntD_yd_day_cpd"></td>
			</tr> 
			<tr>
					<th class="line_rb">전월누계</th>
					 
					<td class="line_rb_r"  id="cslCntD_ym_mngr" ></td>
					<td class="line_rb_r"  id='cslCntD_ym_agt' ></td>
					<td class="line_rb_r"  id='cslCntD_ym_day_off' ></td>
					<td class="line_rb_r"  id='cslCntD_ym_etc_prsn' ></td>
					<td class="line_rb_r"  id='cslCntD_ym_tota_prsn' ></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_inout_call"></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_ivr_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_ivr_ans_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_intpt_svc"></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_in_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_ans_call"></td> 
					<td class="line_rb_r" id="cslCntD_ym_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_ans_rate"></td>
					<td class="line_rb_c" id="cslCntD_ym_tota_call_tm"></td>
					<td class="line_rb_c" id="cslCntD_ym_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_ym_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_ym_cph"></td>
					<td class="line_rb_r" id="cslCntD_ym_cpd"></td>
					<td class="line_rb_r" id="cslCntD_ym_sec20_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_sec20_succ_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_scnt"></td>
					<td class="line_rb_r" id="cslCntD_ym_rate"></td> 
					 
					<td class="line_rb_r" id="cslCntD_ym_rcv"></td>
					<td class="line_rb_r" id="cslCntD_ym_act"></td>
					<td class="line_rb_r" id="cslCntD_ym_act_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_sms_snd_scnt"></td>
					<td class="line_rb_r" id="cslCntD_ym_fax_snd_scnt"></td>
					 
					<td class="line_rb_r" id="cslCntD_ym_day_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_ym_day_cnsl_prsn"></td> 
					<td class="line_b_r" id="cslCntD_ym_day_cpd"></td>
			</tr>
			<tr>
					<th class="line_r">증감</th>
					 
					<td class="line_rb_r"  id="cslCntD_tdyd_mngr" ></td>
					<td class="line_rb_r"  id='cslCntD_tdyd_agt' ></td>
					<td class="line_rb_r"  id='cslCntD_tdyd_day_off' ></td>
					<td class="line_rb_r"  id='cslCntD_tdyd_etc_prsn' ></td>
					<td class="line_rb_r"  id='cslCntD_tdyd_tota_prsn' ></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_inout_call"></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_ivr_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_ivr_ans_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_intpt_svc"></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_in_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_ans_call"></td> 
					<td class="line_rb_r" id="cslCntD_tdyd_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_ans_rate"></td>
					<td class="line_rb_c" id="cslCntD_tdyd_tota_call_tm"></td>
					<td class="line_rb_c" id="cslCntD_tdyd_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_cph"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_cpd"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_sec20_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_sec20_succ_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_scnt"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_rate"></td> 
					 
					<td class="line_rb_r" id="cslCntD_tdyd_rcv"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_act"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_act_rate"></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_sms_snd_scnt"></td>
					<td class="line_rb_r" id="cslCntD_tdyd_fax_snd_scnt"></td>
					 
					<td class="line_rb_r" id="cslCntD_tdyd_day_ans_call"></td>
					<td class="line_rb_r" id="tcslCntD_dyd_day_cnsl_prsn"></td> 
					<td class="line_b_r" id="cslCntD_tdyd_day_cpd"></td>
			</tr> 
		</table>
	</div>
 
	<div style="text-align: left; padding-top: 5px; padding-left: 7px;"><font style="color: blue;">주1) 1시간 1인당 응답호 : </font>총처리건수(인바운드 응답호 + 아웃바운드 성공호) / 상담인원 / 근무시간(8시간)</div>
	<div style="text-align: left; padding-top: 5px; padding-left: 7px;"><font style="color: blue;">주2) 1일 1인당 응답호 : </font>총처리건수(인바운드 응답호 + 아웃바운드 성공호) / 상담인원 </div>
	<div style="text-align: left; padding-top: 5px; padding-left: 7px;"><font style="color: blue;">주3) 휴일(주말포함)과 야간을 제외한 평일 주간(09:00~18:00) 1일 1인당 응답호: </font>평일총처리건수(인바운드 응답호 + 아웃바운드 성공호) / 상담인원 </div>
	 
	<div style="width: 40%; margin-top: 10px; float:left;">
			<div class="stitle" >2. 처리유형별 상담실적</div><!--"타이틀"--> 
	<!-- 그리드테이블 --> 
			<div id = "cslCntD_dvGridAreaAct" style="padding-top: 27px; ">
				<table id="cslCntD_tblStsCounselingCntDayAct" ></table>
			</div>
	<!--"그리드테이블"-->
			<div class="stitle" style="margin-top: 10px;">4. 특이사항</div><!--"타이틀"-->
			<textarea rows="4" cols="" style="width: 100%; " id="cslCntD_task_cont"></textarea> 
			</div>
 
	<div style="width: 59%; margin-top: 10px; float:right;">
		<div class="stitle"  >3. 상담유형별 현황</div><!--"타이틀"-->
	<!-- 그리드테이블 --> 
			<div id = "cslCntD_dvGridAreaCtg" style="padding-top: 27px; ">
				<table id="cslCntD_tblStsCounselingCntDayCtg" ></table>
			</div>
	<!--"그리드테이블"-->
			<div class="stitle" style="margin-top: 15px;">5. 전체현황</div><!--"타이틀"-->
			<textarea rows="4" cols="" style="width: 100%; " id="cslCntD_entr_st"></textarea>
		</div>
 
 
	</div>
	</body>
</html>