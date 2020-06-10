<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>공주시청컨텍센터 운영 상담 현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntMonth.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		<base target="_self">
	</head>


	<body>
		<div id="h1">공주시청컨텍센터 운영 상담 현황</div>
		<div id="pop_body" style = "height: 900px; ">
						
			<div id="search">
				<table class="search_tbl">
					<tr>

						<th style = "width: 50px; padding-right : 15px">
			            <label>조회기준</label>
						</th>
			            <td>
			                <input type="radio" class="radio" name="rdSearch" id="rdSearch_M" value="Month" checked="checked"><label for="rdOwner_p">전월기준</label>
			                <!-- <input type="radio" class="radio" name="rdSearch" id="rdSearch_M" value="Month" checked="true"><label for="rdOwner_p">전월기준</label> -->
							<input type="radio" class="radio" name="rdSearch" id="rdSearch_D" value="Day" ><label for="rdOwner_c">전일기준</label>	
			            </td>						
						

						
						<td class="btn">
			                <button type="button" id="cslCntM_btnStsYearhSearch" class="button">조회</button>
			                <button type="button" id="cslCntM_btnStsYearhPrint" class="button">출력</button>
			                
			                <label id='lblBatch'>집계기준월</label>
			                <input type="text" class="text_Date" id="cslCntM_batchMonth"  />	
							<button type="button" id="cslCntM_btnStsYearhBatch" class="button_4">집계돌리기</button>	
			            </td>	
			            
										
					</tr>
				</table>
			</div><!--"조회/검색"-->
<div style="height: 850px; -ms-overflow-y: scroll;">			
			<div class="stitle">이용 실적 종합 (일일평균 대비 )</div><!--"타이틀"-->
				
			<table class="statistics_tbl" id='result_tbl' style="width:100%;">
				<tr>
						<th class="line_rb_g" >구분</th>
						
						<th class="line_rb_g" id='result_year1'></th>
						<th class="line_rb_g" id='result_year2'></th>
						<th class="line_rb_g" id='result_year3'></th>
						<th class="line_b_g" id='result_year4'></th>
				</tr>
				
				<tr>
						<th class="line_rb">전체건수</th>
						
						<td class="line_rb_r" id="result_tot_cnt1"></td>	
						<td class="line_rb_r" id="result_tot_cnt2"></td>
						<td class="line_rb_r" id="result_tot_cnt3"></td>
						<td class="line_b_r" id="result_tot_cnt4"></td>
				</tr>						
				<tr>
						<th class="line_rb">일일평균</th>
						
						<td class="line_rb_r"  id="result_day_age_res1" ></td>
						<td class="line_rb_r"  id='result_day_age_res2' ></td>
						<td class="line_rb_r"  id='result_day_age_res3' ></td>
						<td class="line_b_r" id="result_day_age_res4"></td>
				</tr>		
				
				<tr>
						<th class="line_r">전년대비 증가율</th>
						
						<td class="line_r_r"  id="result_with_rate1" ></td>
						<td class="line_r_r"  id='result_with_rate2' ></td>
						<td class="line_r_r"  id='result_with_rate3' ></td>
						<td class="line__r" id="result_with_rate4"></td>
				</tr>						
			</table>
			
<!-- 
			<div class="stitle" style="margin-top: 10px;">행정기관별 상담 현황 
			 <span style="font-weight: normal;"> &nbsp;&nbsp;&nbsp;[시스템 재구축(2018.03.11) 이후 데이타건임.]</span>
			</div>"타이틀"
				
			<table class="statistics_tbl" id='civil_tbl'  style="width:100%;">
				<tr>
						<th class="line_rb_g" >연도</th>
						<th class="line_rb_g" >구분</th>
						<th class="line_rb_g">합계</th>
						<th class="line_rb_g">도청</th>
						<th class="line_rb_g">제주시청</th>
						<th class="line_rb_g">서귀포시청</th>
						<th class="line_b_g">기타</th>
				</tr>
				
				<tr class='civil_4'>
						<th class="line_rb" id='civil_year4' rowspan='2'></th>
						<th class="line_rb" >건수</th>
						
						<td class="line_rb_r" id="civil_tot_CNT4"></td>
						<td class="line_rb_r" id="civil_do_CNT4"></td>	
						<td class="line_rb_r" id="civil_sj_CNT4"></td>
						<td class="line_rb_r" id="civil_ss_CNT4"></td>
						<td class="line_b_r" id="civil_etc_CNT4"></td>
				</tr>
				<tr class='civil_4'>
						<th class="line_rb">비율</th>
						
						<td class="line_rb_r"  id="civil_tot_RATE4" ></td>
						<td class="line_rb_r"  id="civil_do_RATE4" ></td>
						<td class="line_rb_r"  id='civil_sj_RATE4' ></td>
						<td class="line_rb_r"  id='civil_ss_RATE4' ></td>
						<td class="line_b_r" id="civil_etc_RATE4"></td>
				</tr>
				
				<tr class='civil_3'>
						<th class="line_rb" id='civil_year3' rowspan='2'></th>
						<th class="line_rb" >건수</th>
						
						<td class="line_rb_r" id="civil_tot_CNT3"></td>
						<td class="line_rb_r" id="civil_do_CNT3"></td>	
						<td class="line_rb_r" id="civil_sj_CNT3"></td>
						<td class="line_rb_r" id="civil_ss_CNT3"></td>
						<td class="line_b_r" id="civil_etc_CNT3"></td>
				</tr>
				<tr class='civil_3'>
						<th class="line_rb">비율</th>
						
						<td class="line_rb_r"  id="civil_tot_RATE3" ></td>
						<td class="line_rb_r"  id="civil_do_RATE3" ></td>
						<td class="line_rb_r"  id='civil_sj_RATE3' ></td>
						<td class="line_rb_r"  id='civil_ss_RATE3' ></td>
						<td class="line_b_r" id="civil_etc_RATE3"></td>
				</tr>
				
				<tr class='civil_2'>
						<th class="line_rb" id='civil_year2' rowspan='2'></th>
						<th class="line_rb" >건수</th>
						
						<td class="line_rb_r" id="civil_tot_CNT2"></td>
						<td class="line_rb_r" id="civil_do_CNT2"></td>	
						<td class="line_rb_r" id="civil_sj_CNT2"></td>
						<td class="line_rb_r" id="civil_ss_CNT2"></td>
						<td class="line_b_r" id="civil_etc_CNT2"></td>
				</tr>
				<tr class='civil_2'>
						<th class="line_rb">비율</th>
						
						<td class="line_rb_r"  id="civil_tot_RATE2" ></td>
						<td class="line_rb_r"  id="civil_do_RATE2" ></td>
						<td class="line_rb_r"  id='civil_sj_RATE2' ></td>
						<td class="line_rb_r"  id='civil_ss_RATE2' ></td>
						<td class="line_b_r" id="civil_etc_RATE2"></td>
				</tr>

				<tr class='civil_1'>
						<th class="line_r" id='civil_year1' rowspan='2'></th>
						<th class="line_rb" >건수</th>
						
						<td class="line_rb_r" id="civil_tot_CNT1"></td>
						<td class="line_rb_r" id="civil_do_CNT1"></td>	
						<td class="line_rb_r" id="civil_sj_CNT1"></td>
						<td class="line_rb_r" id="civil_ss_CNT1"></td>
						<td class="line_b_r" id="civil_etc_CNT1"></td>
				</tr>
				<tr class='civil_1'>
						<th class="line_r">비율</th>
						
						<td class="line_r_r"  id="civil_tot_RATE1" ></td>
						<td class="line_r_r"  id="civil_do_RATE1" ></td>
						<td class="line_r_r"  id='civil_sj_RATE1' ></td>
						<td class="line_r_r"  id='civil_ss_RATE1' ></td>
						<td class="line__r" id="civil_etc_RATE1"></td>
				</tr>
			</table>
 -->
			<div class="stitle" style="margin-top: 10px;">상담유형별 현황 </div><!--"타이틀"-->
				
			<table class="statistics_tbl" id='ctg_tbl' style="width:100%;">
				<tr>
						<th class="line_rb_g" >연도별</th>
						<th class="line_rb_g" >건수<br/>(비율)</th>
						<th class="line_rb_g" id="ctg_nm0"></th>
						<th class="line_rb_g" id="ctg_nm1"></th>
						<th class="line_rb_g" id="ctg_nm2"></th>
						<th class="line_rb_g" id="ctg_nm3"></th>
						<th class="line_rb_g" id="ctg_nm4"></th>
						<th class="line_rb_g" id="ctg_nm5"></th>
						<th class="line_rb_g" id="ctg_nm6"></th>
						<th class="line_rb_g" id="ctg_nm7"></th>
						<th class="line_b_g" id="ctg_nm8"></th>
				</tr>
				
				<tr class='ctg_4'>
						<th class="line_rb" id='ctg_year4' rowspan='2'></th>
						
						<td class="line_rb_r" id="ctg_tot_CNT4"></td>
						<td class="line_rb_r" id="ctg_0_CNT4"></td>
						<td class="line_rb_r" id="ctg_1_CNT4"></td>	
						<td class="line_rb_r" id="ctg_2_CNT4"></td>
						<td class="line_rb_r" id="ctg_3_CNT4"></td>
						<td class="line_rb_r" id="ctg_4_CNT4"></td>
						<td class="line_rb_r" id="ctg_5_CNT4"></td>	
						<td class="line_rb_r" id="ctg_6_CNT4"></td>
						<td class="line_rb_r" id="ctg_7_CNT4"></td>						
						<td class="line_b_r" id="ctg_8_CNT4"></td>
				</tr>
				<tr class='ctg_4'>
						<td class="line_rb_r" id="ctg_tot_RATE4"></td>
						<td class="line_rb_r"  id="ctg_0_RATE4" ></td>
						<td class="line_rb_r"  id="ctg_1_RATE4" ></td>
						<td class="line_rb_r"  id='ctg_2_RATE4' ></td>
						<td class="line_rb_r"  id='ctg_3_RATE4' ></td>
						<td class="line_rb_r"  id="ctg_4_RATE4" ></td>
						<td class="line_rb_r"  id="ctg_5_RATE4" ></td>
						<td class="line_rb_r"  id='ctg_6_RATE4' ></td>
						<td class="line_rb_r"  id='ctg_7_RATE4' ></td>
						<td class="line_b_r" id="ctg_8_RATE4"></td>
				</tr>
				
				<tr class='ctg_3'>
						<th class="line_rb" id='ctg_year3' rowspan='2'></th>
						<td class="line_rb_r" id="ctg_tot_CNT3"></td>
						
						<td class="line_rb_r" id="ctg_0_CNT3"></td>
						<td class="line_rb_r" id="ctg_1_CNT3"></td>	
						<td class="line_rb_r" id="ctg_2_CNT3"></td>
						<td class="line_rb_r" id="ctg_3_CNT3"></td>
						<td class="line_rb_r" id="ctg_4_CNT3"></td>
						<td class="line_rb_r" id="ctg_5_CNT3"></td>	
						<td class="line_rb_r" id="ctg_6_CNT3"></td>
						<td class="line_rb_r" id="ctg_7_CNT3"></td>						
						<td class="line_b_r" id="ctg_8_CNT3"></td>
				</tr>
				<tr class='ctg_3'>
						<td class="line_rb_r" id="ctg_tot_RATE3"></td>
						<td class="line_rb_r"  id="ctg_0_RATE3" ></td>
						<td class="line_rb_r"  id="ctg_1_RATE3" ></td>
						<td class="line_rb_r"  id='ctg_2_RATE3' ></td>
						<td class="line_rb_r"  id='ctg_3_RATE3' ></td>
						<td class="line_rb_r"  id="ctg_4_RATE3" ></td>
						<td class="line_rb_r"  id="ctg_5_RATE3" ></td>
						<td class="line_rb_r"  id='ctg_6_RATE3' ></td>
						<td class="line_rb_r"  id='ctg_7_RATE3' ></td>
						<td class="line_b_r" id="ctg_8_RATE3"></td>
				</tr>
				
				<tr class='ctg_2'>
						<th class="line_rb" id='ctg_year2' rowspan='2'></th>
						<td class="line_rb_r" id="ctg_tot_CNT2"></td>
						<td class="line_rb_r" id="ctg_0_CNT2"></td>
						<td class="line_rb_r" id="ctg_1_CNT2"></td>	
						<td class="line_rb_r" id="ctg_2_CNT2"></td>
						<td class="line_rb_r" id="ctg_3_CNT2"></td>
						<td class="line_rb_r" id="ctg_4_CNT2"></td>
						<td class="line_rb_r" id="ctg_5_CNT2"></td>	
						<td class="line_rb_r" id="ctg_6_CNT2"></td>
						<td class="line_rb_r" id="ctg_7_CNT2"></td>						
						<td class="line_b_r" id="ctg_8_CNT2"></td>
				</tr>
				<tr class='ctg_2'>
						<td class="line_rb_r" id="ctg_tot_RATE2"></td>
						
						<td class="line_rb_r"  id="ctg_0_RATE2" ></td>
						<td class="line_rb_r"  id="ctg_1_RATE2" ></td>
						<td class="line_rb_r"  id='ctg_2_RATE2' ></td>
						<td class="line_rb_r"  id='ctg_3_RATE2' ></td>
						<td class="line_rb_r"  id="ctg_4_RATE2" ></td>
						<td class="line_rb_r"  id="ctg_5_RATE2" ></td>
						<td class="line_rb_r"  id='ctg_6_RATE2' ></td>
						<td class="line_rb_r"  id='ctg_7_RATE2' ></td>
						<td class="line_b_r" id="ctg_8_RATE2"></td>
				</tr> 
				

				<tr class='ctg_1'>
						<th class="line_rb" id='ctg_year1' rowspan='2'></th>
						<td class="line_rb_r" id="ctg_tot_CNT1"></td>
						<td class="line_rb_r" id="ctg_0_CNT1"></td>
						<td class="line_rb_r" id="ctg_1_CNT1"></td>	
						<td class="line_rb_r" id="ctg_2_CNT1"></td>
						<td class="line_rb_r" id="ctg_3_CNT1"></td>
						<td class="line_rb_r" id="ctg_4_CNT1"></td>
						<td class="line_rb_r" id="ctg_5_CNT1"></td>	
						<td class="line_rb_r" id="ctg_6_CNT1"></td>
						<td class="line_rb_r" id="ctg_7_CNT1"></td>						
						<td class="line_b_r" id="ctg_8_CNT1"></td>
				</tr>
				<tr class='ctg_1'>
						<td class="line_rb_r" id="ctg_tot_RATE1"></td>
						
						<td class="line_rb_r"  id="ctg_0_RATE1" ></td>
						<td class="line_rb_r"  id="ctg_1_RATE1" ></td>
						<td class="line_rb_r"  id='ctg_2_RATE1' ></td>
						<td class="line_rb_r"  id='ctg_3_RATE1' ></td>
						<td class="line_rb_r"  id="ctg_4_RATE1" ></td>
						<td class="line_rb_r"  id="ctg_5_RATE1" ></td>
						<td class="line_rb_r"  id='ctg_6_RATE1' ></td>
						<td class="line_rb_r"  id='ctg_7_RATE1' ></td>
						<td class="line_b_r" id="ctg_8_RATE1"></td>
				</tr>
			</table>


			<div class="stitle" style="margin-top: 10px;">상담실적 (<span id='cslCntM_holi_year'></span>) </div><!--"타이틀"-->
				
			<table class="statistics_tbl" id='holi_tbl' style="width:100%;">
				<tr>
						<th class="line_rb_g" >구분</th>
						<th class="line_rb_g">7시~9시</th>
						<th class="line_rb_g">9시~18시</th>
						<th class="line_rb_g">18시~22시</th>
						<th class="line_rb_g">합계</th>
						<th class="line_b_g">일평균</th>
				</tr>
				<!-- 
				<tr>
						<th class="line_rb">계</th>
						<td class="line_rb_r" id="cslCntM_tot_h07h09"></td>
						<td class="line_rb_r" id="cslCntM_tot_h09h18"></td>
						<td class="line_rb_r" id="cslCntM_tot_h18h22"></td>	
						<td class="line_rb_r" id="cslCntM_tot_tot_cnt"></td>						
						<td class="line_b_r" id="cslCntM_tot_day_avg"></td>
				</tr>
				 -->
				<tr>
						<th class="line_rb">평 일</th>
						<td class="line_rb_r" id="cslCntM_day_h07h09"></td>
						<td class="line_rb_r" id="cslCntM_day_h09h18"></td>
						<td class="line_rb_r" id="cslCntM_day_h18h22"></td>	
						<td class="line_rb_r" id="cslCntM_day_tot_cnt"></td>						
						<td class="line_b_r" id="cslCntM_day_day_avg"></td>
				</tr>
				<!-- 
				<tr>
						<th class="line_rb">토요일</th>
						<td class="line_rb_r" id="cslCntM_sat_h07h09"></td>
						<td class="line_rb_r" id="cslCntM_sat_h09h18"></td>
						<td class="line_rb_r" id="cslCntM_sat_h18h22"></td>	
						<td class="line_rb_r" id="cslCntM_sat_tot_cnt"></td>						
						<td class="line_b_r" id="cslCntM_sat_day_avg"></td>
				</tr>
				
				<tr>
						<th class="line_r">일요일</th>
						
						<td class="line_r_r"  id="cslCntM_sun_h07h09" ></td>
						<td class="line_r_r"  id="cslCntM_sun_h09h18" ></td>
						<td class="line_r_r"  id='cslCntM_sun_h18h22' ></td>
						<td class="line_r_r"  id='cslCntM_sun_tot_cnt' ></td>
						<td class="line__r" id="cslCntM_sun_day_avg"></td>
				</tr>
				 -->
			</table>


			<div class="stitle" style="margin-top: 10px;">처리유형별 현황 </div><!--"타이틀"-->
			<br/><br/>
			<!-- <span>1) 시스템 재구축 후 </span>	 -->
			<table class="statistics_tbl" style="width:100%;">
			
				<tr>
						<th class="line_rb_g" >연도별</th>
						<th class="line_rb_g" >건수<br/>(비율)</th>
						<th class="line_rb_g" id="act_nm0"></th>
						<th class="line_rb_g" id="act_nm1"></th>
						<th class="line_rb_g" id="act_nm2"></th>
						<th class="line_rb_g" id="act_nm3"></th>
						<th class="line_rb_g" id="act_nm4"></th>
						<th class="line_rb_g" id="act_nm5"></th>
						<th class="line_rb_g" id="act_nm6"></th>
						<th class="line_rb_g" id="act_nm7"></th>
						<th class="line_b_g" id="act_nm8"></th>
				</tr>
				<tr class='act_4'>
						<th class="line_rb" id='act_year4' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_tot_CNT4"></td>
						<td class="line_rb_r" id="act_0_CNT4"></td>
						<td class="line_rb_r" id="act_1_CNT4"></td>	
						<td class="line_rb_r" id="act_2_CNT4"></td>
						<td class="line_rb_r" id="act_3_CNT4"></td>
						<td class="line_rb_r" id="act_4_CNT4"></td>
						<td class="line_rb_r" id="act_5_CNT4"></td>	
						<td class="line_rb_r" id="act_6_CNT4"></td>
						<td class="line_rb_r" id="act_7_CNT4"></td>						
						<td class="line_b_r" id="act_8_CNT4"></td>
				</tr>
				<tr class='act_4'>
						<td class="line_rb_r" id="act_tot_RATE4"></td>
						<td class="line_rb_r"  id="act_0_RATE4" ></td>
						<td class="line_rb_r"  id="act_1_RATE4" ></td>
						<td class="line_rb_r"  id='act_2_RATE4' ></td>
						<td class="line_rb_r"  id='act_3_RATE4' ></td>
						<td class="line_rb_r"  id="act_4_RATE4" ></td>
						<td class="line_rb_r"  id="act_5_RATE4" ></td>
						<td class="line_rb_r"  id='act_6_RATE4' ></td>
						<td class="line_rb_r"  id='act_7_RATE4' ></td>
						<td class="line_b_r" id="act_8_RATE4"></td>
				</tr>
				
				<tr class='act_3'>
						<th class="line_rb" id='act_year3' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_tot_CNT3"></td>
						<td class="line_rb_r" id="act_0_CNT3"></td>
						<td class="line_rb_r" id="act_1_CNT3"></td>	
						<td class="line_rb_r" id="act_2_CNT3"></td>
						<td class="line_rb_r" id="act_3_CNT3"></td>
						<td class="line_rb_r" id="act_4_CNT3"></td>
						<td class="line_rb_r" id="act_5_CNT3"></td>	
						<td class="line_rb_r" id="act_6_CNT3"></td>
						<td class="line_rb_r" id="act_7_CNT3"></td>						
						<td class="line_b_r" id="act_8_CNT3"></td>
				</tr>
				<tr class='act_3'>
						<td class="line_rb_r" id="act_tot_RATE3"></td>
						<td class="line_rb_r"  id="act_0_RATE3" ></td>
						<td class="line_rb_r"  id="act_1_RATE3" ></td>
						<td class="line_rb_r"  id='act_2_RATE3' ></td>
						<td class="line_rb_r"  id='act_3_RATE3' ></td>
						<td class="line_rb_r"  id="act_4_RATE3" ></td>
						<td class="line_rb_r"  id="act_5_RATE3" ></td>
						<td class="line_rb_r"  id='act_6_RATE3' ></td>
						<td class="line_rb_r"  id='act_7_RATE3' ></td>
						<td class="line_b_r" id="act_8_RATE3"></td>
				</tr>

				<tr class='act_2'>
						<th class="line_rb" id='act_year2' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_tot_CNT2"></td>
						<td class="line_rb_r" id="act_0_CNT2"></td>
						<td class="line_rb_r" id="act_1_CNT2"></td>	
						<td class="line_rb_r" id="act_2_CNT2"></td>
						<td class="line_rb_r" id="act_3_CNT2"></td>
						<td class="line_rb_r" id="act_4_CNT2"></td>
						<td class="line_rb_r" id="act_5_CNT2"></td>	
						<td class="line_rb_r" id="act_6_CNT2"></td>
						<td class="line_rb_r" id="act_7_CNT2"></td>						
						<td class="line_b_r" id="act_8_CNT2"></td>
				</tr>
				<tr class='act_2'>
						<td class="line_rb_r" id="act_tot_RATE2"></td>
						<td class="line_rb_r"  id="act_0_RATE2" ></td>
						<td class="line_rb_r"  id="act_1_RATE2" ></td>
						<td class="line_rb_r"  id='act_2_RATE2' ></td>
						<td class="line_rb_r"  id='act_3_RATE2' ></td>
						<td class="line_rb_r"  id="act_4_RATE2" ></td>
						<td class="line_rb_r"  id="act_5_RATE2" ></td>
						<td class="line_rb_r"  id='act_6_RATE2' ></td>
						<td class="line_rb_r"  id='act_7_RATE2' ></td>
						<td class="line_b_r" id="act_8_RATE2"></td>
				</tr>
				
				<tr class='act_1'>
						<th class="line_rb" id='act_year1' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_tot_CNT1"></td>
						<td class="line_rb_r" id="act_0_CNT1"></td>
						<td class="line_rb_r" id="act_1_CNT1"></td>	
						<td class="line_rb_r" id="act_2_CNT1"></td>
						<td class="line_rb_r" id="act_3_CNT1"></td>
						<td class="line_rb_r" id="act_4_CNT1"></td>
						<td class="line_rb_r" id="act_5_CNT1"></td>	
						<td class="line_rb_r" id="act_6_CNT1"></td>
						<td class="line_rb_r" id="act_7_CNT1"></td>						
						<td class="line_b_r" id="act_8_CNT1"></td>
				</tr>
				<tr class='act_1'>
						<td class="line_rb_r" id="act_tot_RATE1"></td>
						<td class="line_rb_r"  id="act_0_RATE1" ></td>
						<td class="line_rb_r"  id="act_1_RATE1" ></td>
						<td class="line_rb_r"  id='act_2_RATE1' ></td>
						<td class="line_rb_r"  id='act_3_RATE1' ></td>
						<td class="line_rb_r"  id="act_4_RATE1" ></td>
						<td class="line_rb_r"  id="act_5_RATE1" ></td>
						<td class="line_rb_r"  id='act_6_RATE1' ></td>
						<td class="line_rb_r"  id='act_7_RATE1' ></td>
						<td class="line_b_r" id="act_8_RATE1"></td>
				</tr>				
			</table>
<!-- 			
			<br/><br/>
			<span>2) 시스템 재구축 전 </span>	
			<table class="statistics_tbl" style="width:100%;">
			
				<tr>
						<th class="line_rb_g" >연도별</th>
						<th class="line_rb_g" >건수<br/>(비율)</th>
						<th class="line_rb_g" id='act_o_nm0'></th>
						<th class="line_rb_g" id='act_o_nm1'></th>
						<th class="line_rb_g" id='act_o_nm2'></th>
						<th class="line_rb_g" id='act_o_nm3'></th>
						<th class="line_rb_g" id='act_o_nm4'></th>
						<th class="line_rb_g" id='act_o_nm5'></th>
						<th class="line_rb_g" id='act_o_nm6'></th>
						<th class="line_rb_g" id='act_o_nm7'></th>
						<th class="line_b_g" id='act_o_nm8'></th>
				</tr>

				
				<tr class='act_o_4'>
						<th class="line_rb" id='act_o_year4' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_o_tot_CNT4"></td>
						<td class="line_rb_r" id="act_o_0_CNT4"></td>
						<td class="line_rb_r" id="act_o_1_CNT4"></td>	
						<td class="line_rb_r" id="act_o_2_CNT4"></td>
						<td class="line_rb_r" id="act_o_3_CNT4"></td>
						<td class="line_rb_r" id="act_o_4_CNT4"></td>
						<td class="line_rb_r" id="act_o_5_CNT4"></td>	
						<td class="line_rb_r" id="act_o_6_CNT4"></td>
						<td class="line_rb_r" id="act_o_7_CNT4"></td>						
						<td class="line_b_r" id="act_o_8_CNT4"></td>
				</tr>
				<tr class='act_o_4'>
						<td class="line_rb_r" id="act_o_tot_RATE4"></td>
						<td class="line_rb_r"  id="act_o_0_RATE4" ></td>
						<td class="line_rb_r"  id="act_o_1_RATE4" ></td>
						<td class="line_rb_r"  id='act_o_2_RATE4' ></td>
						<td class="line_rb_r"  id='act_o_3_RATE4' ></td>
						<td class="line_rb_r"  id="act_o_4_RATE4" ></td>
						<td class="line_rb_r"  id="act_o_5_RATE4" ></td>
						<td class="line_rb_r"  id='act_o_6_RATE4' ></td>
						<td class="line_rb_r"  id='act_o_7_RATE4' ></td>
						<td class="line_b_r" id="act_o_8_RATE4"></td>
				</tr>

				
				<tr class='act_o_3'>
						<th class="line_rb" id='act_o_year3' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_o_tot_CNT3"></td>
						<td class="line_rb_r" id="act_o_0_CNT3"></td>
						<td class="line_rb_r" id="act_o_1_CNT3"></td>	
						<td class="line_rb_r" id="act_o_2_CNT3"></td>
						<td class="line_rb_r" id="act_o_3_CNT3"></td>
						<td class="line_rb_r" id="act_o_4_CNT3"></td>
						<td class="line_rb_r" id="act_o_5_CNT3"></td>	
						<td class="line_rb_r" id="act_o_6_CNT3"></td>
						<td class="line_rb_r" id="act_o_7_CNT3"></td>						
						<td class="line_b_r" id="act_o_8_CNT3"></td>
				</tr>
				<tr class='act_o_3'>
						<td class="line_rb_r" id="act_o_tot_RATE3"></td>
						<td class="line_rb_r"  id="act_o_0_RATE3" ></td>
						<td class="line_rb_r"  id="act_o_1_RATE3" ></td>
						<td class="line_rb_r"  id='act_o_2_RATE3' ></td>
						<td class="line_rb_r"  id='act_o_3_RATE3' ></td>
						<td class="line_rb_r"  id="act_o_4_RATE3" ></td>
						<td class="line_rb_r"  id="act_o_5_RATE3" ></td>
						<td class="line_rb_r"  id='act_o_6_RATE3' ></td>
						<td class="line_rb_r"  id='act_o_7_RATE3' ></td>
						<td class="line_b_r" id="act_o_8_RATE3"></td>
				</tr>

				
				<tr class='act_o_2'>
						<th class="line_rb" id='act_o_year2' rowspan='2'></th>
						
						<td class="line_rb_r" id="act_o_tot_CNT2"></td>
						<td class="line_rb_r" id="act_o_0_CNT2"></td>
						<td class="line_rb_r" id="act_o_1_CNT2"></td>	
						<td class="line_rb_r" id="act_o_2_CNT2"></td>
						<td class="line_rb_r" id="act_o_3_CNT2"></td>
						<td class="line_rb_r" id="act_o_4_CNT2"></td>
						<td class="line_rb_r" id="act_o_5_CNT2"></td>	
						<td class="line_rb_r" id="act_o_6_CNT2"></td>
						<td class="line_rb_r" id="act_o_7_CNT2"></td>						
						<td class="line_b_r" id="act_o_8_CNT2"></td>
				</tr>
				<tr class='act_o_2'>
						<td class="line_rb_r" id="act_o_tot_RATE2"></td>
						<td class="line_rb_r"  id="act_o_0_RATE2" ></td>
						<td class="line_rb_r"  id="act_o_1_RATE2" ></td>
						<td class="line_rb_r"  id='act_o_2_RATE2' ></td>
						<td class="line_rb_r"  id='act_o_3_RATE2' ></td>
						<td class="line_rb_r"  id="act_o_4_RATE2" ></td>
						<td class="line_rb_r"  id="act_o_5_RATE2" ></td>
						<td class="line_rb_r"  id='act_o_6_RATE2' ></td>
						<td class="line_rb_r"  id='act_o_7_RATE2' ></td>
						<td class="line_b_r" id="act_o_8_RATE2"></td>
				</tr>								
			</table>
 -->			
			
</div>
					
		</div>
	</body>
</html>