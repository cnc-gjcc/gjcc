<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="java.net.URLEncoder"%>
<!DOCTYPE html>

<html lang="ko">
 <head>
  <meta charset="UTF-8">
  <title>특이 민원 현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
  
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/statistics/atentCstmr.js'/>"></script>
 </head>
 <body>
  <!--BODY-->
  <div id="h1">
특이 민원 현황
  </div>
 <div id="pop_body" style="height: 682px;">
   <!--타이틀-->
   <div class="stitle"> 특이 민원 현황</div>
   <!--"타이틀"-->
   <!-- 조회/검색 -->
   <div id="search">
    <table class="search_tbl">
     <tr>
      <th>검색기간</th>
      <td width="30%" style="text-align: left;">
       <span id = "searchYear"></span>
       
       <input id="tfDmStrtDt" type="text" class="text_ol_half"/>&nbsp;&nbsp;~&nbsp;
        <input id="tfDmEndDt" type="text" class="text_ol_half"/>  
        </td>
       <td class="btn" style="width: 160px;">
       <button type="button" id="btnSearch" class="button">조회</button>
       <button type="button" id="btnInit" class="button">초기화</button>
       <button type="button" id="btnExcel" class="button">엑셀저장</button>
      </td>
     </tr> 
    </table>
   </div>
   <div style="width: 100%; margin-top:60px;">      
        <table id="tblatentCstmrList"></table>
        <div id="pgatentCstmrList"></div>
    </div>
   </div>
 </body>
</html>