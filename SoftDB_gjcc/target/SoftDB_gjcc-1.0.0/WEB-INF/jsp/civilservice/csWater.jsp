<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csWater.js'/>"></script>

		 <div id="search">
		     <table class="search_tbl">
				<tr>
					<th style="width: 3%">성명</th>
					<td style="text-align:left;width:5%;">	
					<input type="text" class="text_ol" id="cvsvif_nm" style="width:100%;">
					</td>
					<th style="width: 3%">주소</th>
					<td style="width: 15%">
					<input type="text" class="text_ol" id="cvsvif_addr" style="width:100%;">
					</td>
					<th style="width: 4%">관리번호</th>
					<td style="width: 10%">
					<input type="text" class="text_ol" id="cvsvif_mkey" style="width:100%;">
					</td>
					<td style="width: 10%;text-align:right;padding-right:5px;">
					<button type="button" class="button" id="cvsvif_btn_search">조회</button>
					<button type="button" class="button" id="cvsvif_btn_init">초기화</button>
					</td>
				</tr>
			</table>
		 </div> 
		        
		<!-- 수도요금 체납 목록 그리드테이블 -->
		<table style="width: 100%; height: 180px;">
			<tr>
				<td>
					<table id="cswter_tblCsWaterList"></table>
					<div id="cswter_pagingCsWaterList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->	
		
		<div class="stitle" style="display: ruby-base;">상세내역조회</div><!--"타이틀"-->
		<br/>
		
		<table class="profile_tbl">
			<colgroup>
								<col width="8%"/>
								<col width="18%"/>
								<col width="8%"/>
								<col width="10%"/>
								<col width="8%"/>
								<col width="13%"/>
								<col width="8%"/>
								<col width="13%"/>
								<col width="8%"/>
								<col width="6%"/>								
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">성명/상호</th>								
					<td class="line_b"><label id="cswter_w_nm"></label></td>
					<th class="line_thb">관리번호</th>								
					<td class="line_b" ><label id="cswter_m_key"></label></td>					
					<th class="line_thb">주소</th>								
					<td class="line_b" colspan='5'><label id="cswter_w_addr"></label></td>
				</tr>
				<tr>
				<!-- 
					<th class="line_thb">사업소</th>	
					<td class="line_b"><label id="cswter_gu_nm"></label></td>
				 -->
				 	<th class="line_thb">전자수용가번호</th>	
					<td class="line_b"><label id="cswter_ev_key"></label></td>
				 
					<th class="line_thb">계량기</th>								
					<td class="line_b" ><label id="cswter_meter_no"></label></td>					
					
					<th class="line_thb">상수업종</th>								
					<td class="line_b" ><label id="cswter_h_type"></label></td>
					
					<th class="line_thb">하수업종</th>								
					<td class="line_b"><label id="cswter_l_type"></label></td>
					
					<th class="line_thb">상수세대수</th>								
					<td class="line_b" ><label id="cswter_h_part"></label></td>	
					
				</tr>

				<tr>
					<th class="line_thb">요금방식</th>			
					<td class="line_b"><label id="cswter_l_pay_type"></label></td>
					
					<th class="line_thb">가상계좌</th>								
					<td class="line_b"><label id="cswter_va"></label></td>
		
					<th class="line_thb">자동이체여부</th>								
					<td class="line_b" ><label id="cswter_debit_yn"></label></td>		
					
					<th class="line_thb">복지감면사유</th>								
					<td class="line_b" colspan="3"><label id="cswter_gagam"></label></td>
				</tr>				
			</tbody>
		</table>
		
		<br/>
		<div class="stitle" style="display: ruby-base;">현재 본인 체납 정보</div><!--"타이틀"-->
		<br/>
		
		<table class="profile_tbl">
			<colgroup>
								<col width="8%"/>
								<col width="8%"/>
								<col width="8%"/>
								<col width="8%"/>
								<col width="8%"/>
								<col width="9%"/>
								<col width="8%"/>
								<col width="9%"/>
								<col width="8%"/>
								<col width="9%"/>
								<col width="8%"/>
								<col width="9%"/>								
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">체납건수</th>								
					<td class="line_b"><label id="cswter_chenab_cnt" style="float: right;"></label></td>
					<th class="line_thb">체납금액</th>								
					<td class="line_b" ><label id="cswter_chenab_amt" style="float: right;"></label></td>
					<th class="line_thb">상수도</th>								
					<td class="line_b" ><label id="cswter_h_amt" style="float: right;"></label></td>
					<th class="line_thb">하수도</th>								
					<td class="line_b"><label id="cswter_l_amt" style="float: right;"></label></td>	
					<th class="line_thb">지하수</th>								
					<td class="line_b"><label id="cswter_u_amt" style="float: right;"></label></td>
					<th class="line_thb">물부담금</th>								
					<td class="line_b"><label id="cswter_w_amt" style="float: right;"></label></td>					
				</tr>
			</tbody>
		</table>
		
		<br/>
		<div class="stitle" style="display: ruby-base;">누적 목록</div><!--"타이틀"-->
		<br/>		
		<div id="search" style="margin-bottom: 3px;border-radius: 5px;">
			<select class="select_bl" id="cswter_selYYYYMM" style="width: 100px; height:22px; float:right;margin-right: 3px"></select>
		</div>		
		
		<!-- 수도요금 체납 목록 그리드테이블 -->
		<table style="width: 100%; height: 180px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="cswter_tblWaterAccrueList"></table>					
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->			