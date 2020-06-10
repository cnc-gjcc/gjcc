<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csNonTaxReceipt.js'/>"></script>

<div id="csNonTaxRcpt_divCorpSubTab">
	<ul id="csNonTaxRcpt_gridtab">
		<li><a href="#csNonTaxRcpt_divArrearTaxTab">체납</a></li>
		<li><a href="#csNonTaxRcpt_divOverPayTaxTab">과오납</a></li>
	</ul>
	
	<!-- 체납탭 -->
	<div id="csNonTaxRcpt_divArrearTaxTab">
        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl">
				<tr>
					<th style="width: 70px;">
						<button type="button" id="csNonTaxRcpt_arrTXbtnIvrCall" class="button">ARS인증</button>
					</th>
					<th style="width: 50px;">주민번호</th>
					<td style="width: 270px;">
						<input type="text" id="csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb" class="text_ol" style="width: 120px;">
						-
						<input type="password" id="csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb" class="text_ol" style="width: 120px;">
					</td>
					<th style="width: 50px;">납부자명</th>
					<td style="width: 130px;">
						<input type="text" id="csNonTaxRcpt_arrTXtfSrchCitizenNM" class="text_ol" style="width: 120px;">
					</td>
					<th style="width: 80px;">전화번호</th>
					<td>
						<input type="text" id="csNonTaxRcpt_arrTXtfSrchCitizenTelNumb" class="text_ol" style="width: 120px;">
					</td>            
					<!-- <th>체납일자</th>
		            <td style="width: 250px;">
			            <input type="text" class="text_Date" id="csNonTaxRcpt_arrTXtfSrchFrDate" maxlength="10"> 
			            ~ 
			            <input type="text" class="text_Date" id="csNonTaxRcpt_arrTXtfSrchToDate" maxlength="10" > 
		            </td> -->
					<td class="btn">
						<button type="button" id="csNonTaxRcpt_arrTXbtnTaxSearch" class="button">조회</button>
						<button type="button" id="csNonTaxRcpt_arrTXbtnTaxInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
        </div><!--"조회/검색"--> 
       						
		<!-- 체납 그리드테이블 -->
		<table style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="csNonTaxRcpt_arrTXtblList"></table>
					<div id="csNonTaxRcpt_arrTXpagingList"></div>
				</td>
			</tr>
		</table>
		<!--체납 그리드테이블 끝-->	
		
		<br/>
		<table class="info_tbl_btn">
			<tr>
				<td style="text-align: left;">
					<div class="stitle" style="display: ruby-base;">상세내역조회</div>
				</td>
				<td>
					<button type="button" id="csNonTaxRcpt_arrTXBtnHistory" class="button">민원인 조회이력</button>
					<form id="csNonTaxRcpt_arrTXform" name="csNonTaxRcpt_arrTXform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
		
		<table class="profile_tbl" id="csNonTaxRcpt_arrTXtbl">
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
					<th class="line_thb">세목명</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXsemokNm"></label></td>
					<th class="line_thb">납부자명</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXperNm"></label></td>
					<th class="line_thb">전자납부번호</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXercNo"></label></td>
				</tr>
				
				<tr>
					<th class="line_thb">부과구분</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXlvyNm"></label></td>
					<th class="line_thb">수납구분</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXpayGbn"></label></td>
					<th class="line_thb">압류구분</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXattGbn"></label></td>
				</tr>
				
				<tr>
					<th class="line_thb">납부자주소</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXperAddr"></label></td>
					<th class="line_thb">전화번호</th>	
					<td class="line_b"><label id="csNonTaxRcpt_arrTXperTel"></label></td>															
					<th class="line_thb">휴대폰번호</th>	
					<td class="line_b"><label id="csNonTaxRcpt_arrTXperCell"></label></td>
				</tr>

				<tr>
							
					<th class="line_thb">최초부과금액</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXfstAmt"></label></td>
					<th class="line_thb">가산금</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXlstAddAmt"></label></td>		
					<th class="line_thb">납기금액</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXpatAmt"></label></td>																			
				</tr>	

				<tr>
					<th class="line_thb">부과일자</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXlvyYMD"></label></td>
					<th class="line_thb">최초납기일자</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXfstNapYMD"></label></td>
					<th class="line_thb">납기일자</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXlstNapYMD"></label></td>																			
				</tr>

				<tr>
					<th class="line_thb">은행명</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXbankNm"></label></td>
					<th class="line_thb">가상계좌번호</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXaccountNo"></label></td>
					<th class="line_thb"></th>								
					<td class="line_b"><label id="#"></label></td>																			
				</tr>
			</tbody>
		</table>					
	 </div>
	 <!-- 체납탭 끝 -->
	 
	 
	 <!-- 과오납 탭 -->
	 <div id="csNonTaxRcpt_divOverPayTaxTab">	
        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl">
				<tr>
					<th style="width: 70px;">
						<button type="button" id="csNonTaxRcpt_ovrPYbtnIvrCall" class="button">ARS인증</button>
					</th>
					<th style="width: 50px;">주민번호</th>
					<td style="width: 270px;">
						<input type="text" id="csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb" class="text_ol" style="width: 120px;">
						-
						<input type="password" id="csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb" class="text_ol" style="width: 120px;">
					</td>
					<th style="width: 50px;">납부자명</th>
					<td style="width: 130px;">
						<input type="text" id="csNonTaxRcpt_ovrPYtfSrchCitizenNM" class="text_ol" style="width: 120px;">
					</td>
					<th style="width: 80px;">전화번호</th>
					<td style="width: 130px;">
						<input type="text" id="csNonTaxRcpt_ovrPYtfSrchCitizenTelNumb" class="text_ol" style="width: 120px;">
					</td>
					<!-- <th>체납일자</th>              
		            <td style="width: 250px;">
			            <input type="text" class="text_Date" id="csNonTaxRcpt_ovrPYtfSrchFrDate" maxlength="10"> 
			            ~ 
			            <input type="text" class="text_Date" id="csNonTaxRcpt_ovrPYtfSrchToDate" maxlength="10" > 
		            </td> -->
					<td class="btn">
						<button type="button" id="csNonTaxRcpt_ovrPYbtnTaxSearch" class="button">조회</button>
						<button type="button" id="csNonTaxRcpt_ovrPYbtnTaxInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
        </div><!--"조회/검색"-->
        								
		<!-- 과오납 그리드테이블 -->
		<table style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="csNonTaxRcpt_ovrPYtblList"></table>
					<div id="csNonTaxRcpt_ovrPYpagingList"></div>
				</td>
			</tr>
		</table>
		<!--과오납 그리드테이블 끝-->
		
		<br/>
		<table class="info_tbl_btn">
			<tr>
				<td style="text-align: left;">
					<div class="stitle" style="display: ruby-base;">상세내역조회</div>
				</td>
				<td>
					<button type="button" id="csNonTaxRcpt_ovrPYBtnHistory" class="button">민원인 조회이력</button>
					<form id="csNonTaxRcpt_ovrPYform" name="csNonTaxRcpt_ovrPYform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
		
		<table class="profile_tbl" id="csNonTaxRcpt_ovrPYtbl">
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
					<th class="line_thb">세목명</th>								
					<td class="line_b"><label id="csNonTaxRcpt_ovrPYsemokNm"></label></td>
					<th class="line_thb">납부자명</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYperNm"></label></td>
					<th class="line_thb">휴대폰번호</th>	
					<td class="line_b"><label id="csNonTaxRcpt_ovrPYperCell"></label></td>
				</tr>
				
				<tr>
					<th class="line_thb">부과번호</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYlvyNo"></label></td>										
					<th class="line_thb">부과금액</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYfstAmt"></label></td>
					<th class="line_thb">납부금액</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYlatAmt"></label></td>
				</tr>

				<tr>
					<th class="line_thb">과오납신청일</th>								
					<td class="line_b"><label id="csNonTaxRcpt_ovrPYovrYMD"></label></td>
					<th class="line_thb">과오납사유명</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYcodeCtn"></label></td>	
					<th class="line_thb">과오납환부액</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYovrAmt"></label></td>		
				</tr>
				
				<tr>
					<th class="line_thb">처리일자</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_ovrPYrtnYMD"></label></td>
					<th class="line_thb"></th>								
					<td class="line_b"><label id=""></label></td>
					<th class="line_thb"></th>								
					<td class="line_b" ><label id=""></label></td>																				
				</tr>
			</tbody>
		</table>
	</div>
	<!-- 과오납 탭 끝-->
</div>