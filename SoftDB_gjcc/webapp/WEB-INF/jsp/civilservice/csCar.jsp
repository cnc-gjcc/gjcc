﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csCar.js'/>"></script>       
			
			
<div id="csCar_divCorpSubTab">
	 <!-- 주정차과태료탭 -->
	 <div id="csCar_divCarTab">	
        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl">
            <tr>
				<th style="width: 70px;">
					<button type="button" id="csCar_btnIvrCall" class="button">ARS인증</button>
				</th>
				<th style="width: 50px;">주민번호</th>
				<td style="width: 270px;">
					<input type="text" id="csCar_tfSrchCitizenPreResNumb" class="text_ol" style="width: 120px;">
					-
					<input type="password" id="csCar_tfSrchCitizenPostResNumb" class="text_ol" style="width: 120px;">
				</td>
              <th>소유자명</th>              
              <td style="width: 100px;">
                <input type="text" id="csCar_tfSrchCitizenNm" class="text_ol" style="width: 100px;">
              </td>
              <th style="width: 50px;">차량번호</th>              
              <td style="width: 100px;">
	              <input type="text" id="csCar_tfSrchCarNumb" class="text_ol" style="width: 150px;">
              </td>
              <!-- <th style="width: 60px;">고지번호</th>              
              <td style="width: 150px;">
	              <input type="text" id="csCar_tfSrchGojiNumb" class="text_ol" style="width: 100px;">
              </td> -->
              <th style="width: 100px;">단속일자</th>              
              <td style="width: 250px;">
                <input type="text" class="text_Date" id="csCar_tfSrchFrDate" maxlength="10"> ~ 
                <input type="text" class="text_Date" id="csCar_tfSrchToDate" maxlength="10" > 
              </td>
              <td class="btn">
                <button type="button" id="csCar_btnCarSearch" class="button">조회</button>                
                <button type="button" id="csCar_btnCarInit" class="button">초기화</button>
              </td>
            </tr> 
          </table>
        </div><!--"조회/검색"-->
        								
		<!-- 주정차과태료 그리드테이블 -->
		<table style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="csCar_tblCarList"></table>
					<div id="csCar_pagingCarList"></div>
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
					<button type="button" id="csCar_BtnHistory" class="button">민원인 조회이력</button>
					<form id="csCar_TXform" name="csCar_TXform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
		
		<table class="profile_tbl" id="csCar_tbl">
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
					<th class="line_thb">차량번호</th>								
					<td class="line_b"><label id="csCar_vmCarNo"></label></td>
					<th class="line_thb">소유자명</th>								
					<td class="line_b" ><label id="csCar_vmName"></label></td>
					<th class="line_thb">단속시간</th>								
					<td class="line_b" ><label id="csCar_vmDateTime"></label></td>
				</tr>
				
				<tr>										
					<th class="line_thb">고지번호</th>	
					<td class="line_b"><label id="csCar_vmGojiNo"></label></td>
					<th class="line_thb">고지일자</th>								
					<td class="line_b" ><label id="csCar_vmGojiDate"></label></td>
					<th class="line_thb">부과원금</th>								
					<td class="line_b" ><label id="csCar_vmOrgAmt"></label></td>
							
				</tr>

				<tr>
					<th class="line_thb">가산금</th>								
					<td class="line_b" ><label id="csCar_vmAddAmt"></label></td>		
					<th class="line_thb">총부과금</th>								
					<td class="line_b"><label id="csCar_vmSumAmt"></label></td>
					<th class="line_thb">수납금</th>								
					<td class="line_b" ><label id="csCar_vmRpAmt"></label></td>																			
				</tr>	

				<tr>
					<th class="line_thb">감액금</th>								
					<td class="line_b" ><label id="csCar_vmRdAmt"></label></td>		
					<th class="line_thb">잔액(미납액)</th>								
					<td class="line_b"><label id="csCar_vmAmt"></label></td>
					<th class="line_thb">소인일자</th>								
					<td class="line_b" ><label id="csCar_vmSoDate"></label></td>																			
				</tr>

				<tr>
					<th class="line_thb">압류일자</th>								
					<td class="line_b" ><label id="csCar_vmSzDate"></label></td>		
					<th class="line_thb">압류해제일자</th>								
					<td class="line_b"><label id="csCar_vmSuDate"></label></td>
					<th class="line_thb">수납일자</th>								
					<td class="line_b" ><label id="csCar_vmHjDate"></label></td>																			
				</tr>
				
				<tr>
					<th class="line_thb">처리상태</th>								
					<td class="line_b" ><label id="csCar_vmStateID"></label></td>		
					<th class="line_thb">단속장소</th>								
					<td class="line_b"><label id="csCar_vmJanso"></label></td>
					<th class="line_thb"></th>								
					<td class="line_b" ><label id="#"></label></td>																			
				</tr>
			</tbody>
		</table>
	</div>
	<!-- 주정차과태료탭 끝-->
</div>
       