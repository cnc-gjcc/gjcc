<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>상담유형 통계</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/TypeProcess.js'/>"></script>
		
		<style>
			.gridBgColor { background-color: white; }
		</style>
	</head>
	
	<body>
		<div id="h1">상담유형 통계</div>
		
		<div id="pop_body" style="height: 682px;">
			<div class="stitle">상담유형 통계</div><!--"타이틀"-->
			
			<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<th>
						</th>
						<td class="btn">
							<label style="color:red;">※ 불러오는데 다소 시간이 소요 될 수 있습니다.</label>
							<button type="button" id="btnSearch" class="button">조회</button>
							<button type="button" id="btnInit" class="button">초기화</button>
						</td>
					</tr>
				</table><!--"미사용/버튼 테이블"-->
			
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th style="width: 30px; padding-right: 15px">
							<label>소속</label>
						</th>
						<td style="width: 320px;">
							<select id="optCenter" style="width: 100px;">
								<option></option>
							</select>
							<span id="txtCenter"></span>
						</td>
						<th style="width: 30px; padding-right : 15px">
							<label>기간</label>
						</th>
						<td>
							<div style="display: inline-block;">
								<select id="optTerm" style="width: 90px;">
									<option value="month">년별</option>
									<option value="day">월별</option>
									<option value="term">기간별</option>
								</select>
								<span id="termDetail">
								</span>
							</div>
							<div style="display: inline-block; margin-left: 10px;">
								<select id="selType" style="width: 90px;">
									<!-- <option value="optAll">전체</option>-->
									<option value="optIntv">상담유형별</option>
									<option value="optUsr">상담사별</option>
								</select>
							</div>
						</td>
					</tr>
				</table>
			</div><!--"조회/검색"-->
			
			<div id="grid_all">
	 
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<th></th>
						<td>
							<button type="button" id="btnExelDown" class="button">엑셀저장</button>
						</td>
					</tr>
				</table><!--"미사용/버튼 테이블"-->

				<!--그리드-->
				<div id="grid_all">
					<div id = "tblWorkArea">
						<table id = "tblWork"></table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>