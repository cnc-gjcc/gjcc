<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>행정정보</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.theme.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/civilServiceInfo.js'/>"></script>
		
		<style>
			div.scrollable 
			{
			    width: 100%;
			    height: 100%;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			#gbox_tblInCorp .ui-jqgrid-bdiv { overflow-y: scroll }
			
		</style>
	</head>
	
	<body>
	
	        <input type="hidden" id="hidTaxSsNumber" value="" />
	        
		<!--BODY-->
		<div id="h1">행정정보</div>
		<div id="pop_body" style="height:875px;">
			<!--탭-->
			<ul id="cvsvif_divCorpTab" style="background: #ffffff; border: #ffffff;">
				<li><a href="#cvsvif_divWaterTab">상하수도 업무</a></li>
<!-- 				<li><a href="#cvsvif_divLocalTaxTab">지방세</a></li>			 -->
<!-- 				<li><a href="#cvsvif_divCarTab">주.정차과태료</a></li>			 -->
				<!-- <li><a href="#cvsvif_divTaxTab">세무</a></li>		 -->	
<!-- 				<li><a href="#cvsvif_divNonTaxReceiptTab">세외수입</a></li>			 -->
			</ul>
			
			 <!-- <div id="search" style="margin-top: 10px; margin-bottom: 3px;">
		     	 <table class="search_tbl">
					<tr>
						<th style="width: 4%">고지일</th>
						<td colspan="2" style="text-align:left;width: 15%">
							<input type="text" class="text_Date" id="cvsvif_selFrDate" maxlength="10"> ~ <input type="text" class="text_Date" id="cvsvif_selToDate" maxlength="10" >  
						</td>
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
				<table class="profile_tbl">
					<tr>
						<th class="line_thb">성명/상호</th>								
						<td class="line_b"><label id="cstax_reg_nm"></label></td>
						<th class="line_thb">주소</th>								
						<td class="line_b" style="width:70%"><label id="cstax_addr"></label></td>						
					</tr>
				</table>
	      	</div> --> 
			<!--행정정보-->
			<!-- 조회/검색 -->
			<div id="cvsvif_divWaterTab">
				<%@include file="csWater.jsp" %>
			</div>
			<!-- End Of 행정정보 -->
		</div>
		<!--BODY-->
	</body>
</html>