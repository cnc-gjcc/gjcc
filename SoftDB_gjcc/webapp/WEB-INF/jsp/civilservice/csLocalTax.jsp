<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csLocalTax.js'/>"></script> 
    
<div id="csLocaltax_table">
	
	<div>
	    <div id="search">
	    	<table class="search_tbl">
	        	<tr>
					<th style="width: 70px;">
						<button type="button" id="csLocaltax_btnIvrCall" class="button">ARS인증</button>
					</th>
					<th style="width: 50px;">주민번호</th>
					<td style="width: 270px;">
						<input type="text" id="csLocaltax_tfSrchCitizenPreResNumb" class="text_ol" style="width: 120px;">
						-
						<input type="password" id="csLocaltax_tfSrchCitizenPostResNumb" class="text_ol" style="width: 120px;">
					</td>
					<th style="width: 80px;">전자납부번호</th>
					<td style="width: 150px;">
						<input type="text" id="csLocaltax_tfSrchEnapbuNumb" class="text_ol" style="width: 130px;">
					</td>
					<th style="width: 80px;">성명/상호</th>
					<td style="width: 150px;">
						<input type="text" id="csLocaltax_tfSrchCitizenNM" class="text_ol" style="width: 130px;">
					</td>
					<td class="btn">
						<button type="button" id="csLocaltax_btnSearch" class="button">조회</button>
						<button type="button" id="csLocaltax_btnInit" class="button">초기화</button>
					</td>
				</tr> 
	      </table>
		</div>
		
		<table style="width: 100%; height: 318px;">
			<tr>
				<td>
					<table id="csLocaltax_tblCsLocalTaxList"></table>
					<div id="csLocaltax_pagingCsLocalTaxList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
	
		<br/>
		<table class="info_tbl_btn">
			<tr>
				<td style="text-align: left;">
					<div class="stitle" style="display: ruby-base;">상세내역조회</div>
				</td>
				<td>
					<button type="button" id="csLocaltax_BtnHistory" class="button">민원인 조회이력</button>
					<form id="csLocaltax_lcTXform" name="csLocaltax_lcTXform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
	 
		<table class="profile_tbl" id="csLocaltax_tbl">
			<colgroup>
				<col width="10%"/>
				<col width="20%"/>
				<col width="15%"/>
				<col width="20%"/>
				<col width="15%"/>
				<col width="20%"/>
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">성명/상호</th>								
					<td class="line_b" ><label id="csLocaltax_cnNm"></label></td>	
					<th class="line_thb">구분</th>								
					<td class="line_b" ><label id="csLocaltax_cnGb"></label></td>	
					<th class="line_thb">과세구분</th>								
					<td class="line_b" ><label id="csLocaltax_cnGawseGb"></label></td>	
				</tr>
				<tr>
					<th class="line_thb">과세번호</th>								
					<td class="line_b" ><label id="csLocaltax_cnGawseNumb"></label></td>	
					<th class="line_thb">전자납부번호</th>								
					<td class="line_b" ><label id="csLocaltax_cnENapbuNumb"></label></td>	
					<th class="line_thb">차량번호</th>								
					<td class="line_b" ><label id="csLocaltax_cnCarNumb"></label></td>	
				</tr>
				<tr>
					<th class="line_thb">과세년월</th>								
					<td class="line_b" ><label id="csLocaltax_cnGwaseYMD"></label></td>	
					<th class="line_thb">체납여부</th>								
					<td class="line_b" ><label id="csLocaltax_cnChenapYN"></label></td>	
					<th class="line_thb">회계세목명</th>								
					<td class="line_b" ><label id="csLocaltax_cnSaemokNm"></label></td>	
				</tr>
				<tr>
					<th class="line_thb">미납액</th>								
					<td class="line_b" ><label id="csLocaltax_cnMenapPrice"></label></td>	
					<th class="line_thb">당초본세</th>								
					<td class="line_b" ><label id="csLocaltax_cnDangchBonse"></label></td>	
					<th class="line_thb">징수결정일</th>								
					<td class="line_b" ><label id="csLocaltax_cnJingYMD"></label></td>	
				</tr>
				<tr>
					<th class="line_thb">본세</th>								
					<td class="line_b" ><label id="csLocaltax_cnBonse"></label></td>	
					<th class="line_thb">가산금</th>								
					<td class="line_b" ><label id="csLocaltax_cnGasanPrice"></label></td>	
					<th class="line_thb">부과일자</th>								
					<td class="line_b" ><label id="csLocaltax_cnBugwaYMD"></label></td>	
				</tr>
				<tr>
					<th class="line_thb">최초납기일</th>								
					<td class="line_b" ><label id="csLocaltax_cnFirstNapYMD"></label></td>	
					<th class="line_thb">납기일</th>								
					<td class="line_b" ><label id="csLocaltax_cnNapYMD"></label></td>	
					<th class="line_thb">납부일</th>								
					<td class="line_b" ><label id="csLocaltax_cnNapbuYMD"></label></td>	
				</tr>
				<tr>
					<th class="line_thb">가상계좌번호(은행)</th>								
					<td class="line_b" ><label id="csLocaltax_cnGaccountNumb1"></label></td>	
					<th class="line_thb">가상계좌번호2(은행)</th>								
					<td class="line_b" ><label id="csLocaltax_cnGaccountNumb2"></label></td>	
					<th class="line_thb">예금주명</th>								
					<td class="line_b" ><label id="csLocaltax_cnYegmjuNm"></label></td>	
				</tr>
				<!-- <tr>
					<th class="line_thb">우편번호</th>								
					<td class="line_b" ><label id="csLocaltax_c_zip"></label></td>	
					<th class="line_thb">주소</th>								
					<td class="line_b"><label id="csLocaltax_addr"></label></td>
					<th class="line_thb">차량번호</th>								
					<td class="line_b" ><label id="csLocaltax_n_car"></label></td>
					<th class="line_thb">사업자번호</th>								
					<td class="line_b" ><label id="csLocaltax_n_owner"></label></td>
				</tr>
				<tr>
					<th class="line_thb">세목코드</th>								
					<td class="line_b" ><label id="csLocaltax_c_semok"></label></td>	
					<th class="line_thb">세목명</th>								
					<td class="line_b"><label id="csLocaltax_cn_semok"></label></td>
					<th class="line_thb">과세번호</th>								
					<td class="line_b" ><label id="csLocaltax_n_gwase"></label></td>
					<th class="line_thb">과세물건</th>								
					<td class="line_b" ><label id="csLocaltax_gwase_obj"></label></td>	
				</tr>				
							
				<tr>
					<th class="line_thb">본세합계</th>								
					<td class="line_b"><label id="csLocaltax_goji_bon_tot"></label></td>
					<th class="line_thb">가산금합계</th>								
					<td class="line_b" ><label id="csLocaltax_goji_add_tot"></label></td>
					<th class="line_thb">세잔액합계</th>								
					<td class="line_b" ><label id="csLocaltax_jan_tot"></label></td>					
					<th class="line_thb">고지구분</th>								
					<td class="line_b" ><label id="csLocaltax_cn_goji"></label></td>					
				</tr>
				<tr>
					<th class="line_thb">결의여부</th>								
					<td class="line_b"><label id="csLocaltax_x_jing"></label></td>
					<th class="line_thb">압류여부</th>								
					<td class="line_b" ><label id="csLocaltax_x_seiz"></label></td>
					<th class="line_thb">분납여부</th>								
					<td class="line_b" ><label id="csLocaltax_x_div_goji"></label></td>					
					<th class="line_thb">전자납부번호</th>								
					<td class="line_b" ><label id="csLocaltax_s_esunap"></label></td>		
				</tr>
				<tr>
					<th class="line_thb">부과일자</th>								
					<td class="line_b"><label id="csLocaltax_bugwa_day"></label></td>
					<th class="line_thb">징수결의일</th>								
					<td class="line_b" ><label id="csLocaltax_jing_day"></label></td>
					<th class="line_thb">최초납기일</th>								
					<td class="line_b" ><label id="csLocaltax_fist_day"></label></td>					
					<th class="line_thb">가산납기일</th>								
					<td class="line_b" ><label id="csLocaltax_due_day"></label></td>		
				</tr> -->							
			</tbody>
		</table>	
	</div>
</div>