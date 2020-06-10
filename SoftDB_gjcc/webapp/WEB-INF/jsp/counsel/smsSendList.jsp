<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>SMS이력</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/smsSendList.js'/>"></script>
	</head>

	<body>
	
		<!--BODY-->
		<div id="h1">
			SMS이력
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				SMS이력 조회
			</div>
			<!--"타이틀"-->
			
			<!-- 조회/검색 -->
				<div id="search2" style="height: auto;">
				<table class="search2_tbl">
					<tr>
						<td class="sel_80">
							<select class="select_al" id="smlist_selSrchDateType">
								<option value="req" selected="selected">요청일</option>
								<option value="resv">예약일</option>
								<!-- <option value="send">발신일</option> -->
							</select>
						</td>
						<td colspan="2" class="sel_80" style="width: 25%;">
							<input type="text" class="text_Date" id="smlist_tfSrchDate"  />
								<span>~</span>
							<input type="text" class="text_Date" id="smlist_tfSrchDateEn" />
						</td>
						<td class="sel_80">
							<select class="select_al" id="smlist_selSrchtype">
								<option value="cntct_infm">발신번호</option>
								<option value="cust_nm">고객명</option>
								<option value="corp_nm">회사/부서</option>
							</select>
						</td>
						
						<td class="nemo_50" style="width: 15%;">
							<input type="text" class="text_ol" id="smlist_tfSrchVal">
						</td>
						
						<th>상담사</th>
						<td class="sel_80">
							<select class="select_al" id="smlist_selSrchUsr">
								<option value="all">전체</option>
							</select>
						</td>
						<!-- <th></th> --><!-- 처리상태 -->
						<!-- <td class="sel_80">
							<select class="select_al" id="smlist_selSrchActStCd" style="display: none;">
								<option value="all">전체</option>
								<option value="req">전송 대기중</option>
								<option value="complete">성공</option>
								<option value="fail">실패</option>
							</select>
						</td> -->
						<td class="btn">
							<button type="button" id="smlist_btnSearch" class="button">조회</button>
							<button type="button" id="smlist_btnInit" class="button">초기화</button>
						</td>
					</tr> 
					<!-- <tr>
						<td class="sel_50">
							<select class="select_al" id="smlist_selSrchDateType">
								<option value="req" selected="selected">요청일</option>
								<option value="resv">예약일</option> -->
								<!-- <option value="send">발신일</option> -->
							<!-- </select>
						</td>
						<td colspan="2" class="sel_80" style="width: 90%;"> -->
							<!-- <input type="text" class="text_Date" id="smlist_tfSrchDate"  disabled="disabled"/>
								<span>~</span>
							<input type="text" class="text_Date" id="smlist_tfSrchDateEn" disabled="disabled"/>
						</td> -->
						<!-- 
						<th>접수번호</th>
						<td><input type="text" class="text_ol" id="smlist_tfSrchTcktId"></td>
						 -->
						<!-- <td class="btn"></td>
					</tr>  -->
				</table>
			</div>
			<!--"조회/검색"-->

			<!--그리드-->
			<div id="grid_all">
	 
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl_btn">
					<tr>
						<th></th>
						<td>
							<button type="button" id="smlist_btnExcel" class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->

				<!-- 그리드테이블 -->
				<table style="width:100%; height:318px; background-image:url('./img/sam.gif');">
					<tr>
						<td>
							<table id="smlist_tblSmsSendList"></table>
							<div id="smlist_pagingSmsSendList"></div>
						</td>
					</tr>
				</table>
				<!--"그리드테이블"-->
				
				<!-- 버튼 테이블 -->
				<table class="info_tbl_btn">
					<tr>
						<th></th>
						<td>
							<button type="button" id="smlist_btnModify" class="button">저장</button>
							<button type="button" id="smlist_btnDelete" class="button">삭제</button>
						</td>
					</tr>
				</table>
				<!--"버튼 테이블"-->

			</div>
			<!--"그리드"-->

			<!-- 개인정보테이블 -->
			<input type="hidden" id="smlist_tfSpecChSndId">
			<table class="profile_tbl">
				<tr>
					<td class="line_rt" style="width: 10%;">발신상담사</td>
					<td class="line_b" style="width: 20%;"><label id="smlist_labSpecUsrNm"></label></td>
					<td class="line_c" rowspan="7" style="width: 10%;">전송메세지<br/><label id="smlist_labSpecCountTxtNum"></label> byte</td>
					<td class="line_b" rowspan="7" style="width: 60%;"><textarea rows="" cols="" style="width: 100%; height: 95%;" id="smlist_tfSpecSndCont"></textarea></td>
				</tr>
				<!-- <tr>
					<td class="line_rt">회사/부서</td>
					<td class="line_b"><label id="smlist_labSpecCorpNm"></label></td>
				</tr> -->
				<tr>
					<td class="line_rt">고객명</td>
					<td class="line_b"><label id="smlist_labSpecCustNm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">발신자번호</td>
					<td class="line_b"><label id="smlist_labSpecSendFrom"></label></td>
				</tr>
				<tr>
					<td class="line_rt">수신자번호</td>
					<td class="line_b"><input type="text" class="text_ol" id="smlist_tfSpecChCntctInfm"></td>
				</tr>
				<tr>
					<td class="line_rt">요청일시</td>
					<td class="line_b"><label id="smlist_labSpecSndReqDtm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">예약일시</td>
					<td class="line_b"><input type="text" class="text_ol" id="smlist_tfSpecSndResvDtm">
				</tr>
				<tr>
					<td class="line_rt">발신일시</td>
					<td class="line_b"><label id="smlist_labSpecSndEndDtm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">발신결과</td>
					<td class="line_b"><label id="smlist_labSpecSndRsltNm"></label></td>
					<th class="line_c">이미지첨부</th>
					<td class="line_b">
						<table id="smlist_smsFileInfos" style="width:100%; margin-left: 1px; margin-right: 6px;">
						</table>
					</td>
				</tr>
				<!-- 
				<tr>
					<td class="line_rb">접수번호</td>
					<td class="line_wb"><label id="smlist_labSpecTcktId"></label></td>
				</tr>
				 -->
			</table><!--"개인정보테이블"-->
			<div class="text_red"><!-- *80자가 넘으면 나뉘어 발송됩니다. --></div>
		</div><!--"BODY"-->
	</body>
</html>