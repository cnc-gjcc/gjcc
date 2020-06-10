<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="org.apache.commons.codec.binary.Base64"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>

<%   
/**************   암복화시  처리 부분 *********************************/
	String ouCode = "";
	String uid = "";
	
	//파라미터 존재 확인
	boolean isExists = StringUtils.isNotBlank(request.getParameter("ouCode")) && StringUtils.isNotBlank(request.getParameter("uid"));
	
	if(isExists) {
		Base64 b64 = new Base64();
		ouCode = request.getParameter("ouCode");
		uid = new String(b64.decode(request.getParameter("uid").getBytes()));
		//System.out.println("params");
	} else {
		String temp = StringUtils.defaultIfBlank((String)session.getAttribute("dept_id"), null);
		ouCode = temp == null ? "" : temp + "0000";
		uid = (String)session.getAttribute("user_id");
		//System.out.println("sso");      
	}
	
	// System.out.println("decrypt ouCode= "+ouCode+" , uid= "+uid);      
	
	String paraStr='"'+ouCode+"^"+uid+'"';
%>

<c:set var="paraStr" value="<%=paraStr%>" />
<c:set var="ouCode" value="<%=ouCode%>" />
<c:set var="uid" value="<%=uid%>" />

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="UTF-8">
	<meta http-equiv="Cache-Control" content="no-cache"/>
	<meta http-equiv="Expires" content="0"/>
	<meta http-equiv="Pragma" content="no-cache"/>

	<title>공무원 업무</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-1.12.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/json3.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
</head>

<script type="text/javascript">

function get_info_of_IE () { 

        var word; 
        var agent = navigator.userAgent.toLowerCase(); 

        var info = {  name: "N/A" , version: -1  }; 

        if ( navigator.appName == "Microsoft Internet Explorer" ){    // IE old version ( IE 10 or Lower ) 
                word = "msie "; 
        } 
        else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:";    // IE 11 
        else if ( agent.search( "edge/" ) > -1  ) word = "edge/";        // Microsoft Edge 
        else  { 
                return info;    // etc. ( If it's not IE or Edge ) 
        } 


        var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

        if (  reg.exec( agent ) != null  ){ 

                info.version = parseFloat( RegExp.$1 + RegExp.$2 ); 

                info.name = ( word == "edge/" ) ? "Edge" : "IE"; 
        } 

        return info; 
} 

function testing (){ 

    var object = get_info_of_IE(); 

    var browserName = object.name; 

    var browserVersion = object.version; 

    demo1.innerHTML = browserName; 
    demo2.innerHTML = browserVersion; 
} 
</script>



<script type="text/javascript">

var retCount = 0;

function init(){
	var ouCode = $("#ouCode").val();
	
	$("#vocCnt").html("부서(0)/할일(0)");
	$("#dbCnt").html("부서(0)/할일(0)");
	
	if($("#ouCode").val() == "" || $("#ouCode").val() == "null"){
		if(retCount < 10){
			retCount++;
			console.log("Retry Count : " + retCount);
			
			$("#vocCnt").html("콜센터 연결 중");
			$("#dbCnt").html("잠시만 기다려 주세요.");
			
			fnSleep(1000);
			init();
		} else {
			$("#vocCnt").html("콜센터 연결 실패!");
			$("#dbCnt").html("새로고침 해주세요.");
			
			// alert("콜센터 연결이 실패하였습니다!!");	
		}
	}else{
		// 콜센터담당자 지정 권한여부 확인 후 세션에 고정
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonCCAuth(),
			success : function(data1) {
				$.ajax({  
					type : "post",
					dataType : "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/csw.do",
					data : "pJson=" + getJsonCCAffairsYN(),
					success : function(data2) {
						var auth = data1.CC_AUTH;
						var affairs = data2.CC_AFFAIRS_YN;
						window.sessionStorage.setItem("CC_AUTH", auth);
						window.sessionStorage.setItem("CC_AFFAIRS_YN", affairs);
					}
				});
			},
			error : function(data1, status, err) {
				networkErrorHandler(data1, status, err);
			}
		});
		
  		// 	민원이관건수 조회
  		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonVocCnt(),
			success : function(data){
				$("#vocCnt").html("부서("+ data.VOCDEPTCNT +")/할일("+ data.VOCUSRCNT + ")");
				
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});

		
		//	상담DB요청건수 조회 
 		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonVocCntDB(),
			success : function(data){
				$("#dbCnt").html("부서("+ data.ORG_VOCCNT +")/할일("+ data.USR_VOCCNT + ")");
				
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});		
	} 
}

function getJsonCCAuth() {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c20wMDIuc2VsQ0NBdXRo",
		"map" : {
			"key" : "value",
			"tp_cd" : "90909",
			"orgId" : $("#uid").val()
		}
	};
	
	 // console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonCCAffairsYN() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0Y2NBZmZhaXJzWW4=",
			"map" : {
				"key" : "value",
				"uId" : $("#uid").val()
			}
	};
	
	// console.log(loParam);
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonVocCnt(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "Y20wMzIuc2VsZWN0Vm9jQ250",
			"map" : {
				"key" : "value",
				"ccAffairs" : window.sessionStorage.getItem("CC_AFFAIRS_YN"),
				"orgId" : $("#ouCode").val(),
				"orgUsrId" : $("#uid").val()
			}
		};
		
		// console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonVocCntDB(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wMTUuc2VsZWN0Vm9jQ250REI=",
			"map" : {
				"key" : "value",
				"orgId" : $("#ouCode").val(),
				"orgUsrId" : $("#uid").val()
			}
		};
	
		// console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

function fn_link(){
	var clickId=this.id;
	
	window.sessionStorage.removeItem("ouCode");
	window.sessionStorage.removeItem("usrId");
	
	if($("#ouCode").val() == "" || $("#ouCode").val() == "null"){
		alert("부서코드가 존재하지 않아 페이지를 연동할 수 없습니다.");			
	}else{
		
		window.sessionStorage.setItem("ouCode", $("#ouCode").val());
		window.sessionStorage.setItem("usrId", $("#uid").val());
		
		if(clickId == "dvVocCnt" || clickId == "vocCnt"){			
			$("#fromDiv").val("VOC");
		}
		if(clickId == "dvDbCnt" || clickId == "dbCnt"){			
			$("#fromDiv").val("DB");
		}
		
		var url=getContextPath() +"/web/civilservice/civilServiceWork.do";
		var option="titlebar=no,status=no ,location=no, directoryies=no, scrollbars=yes, resizable=yes, width=1500, height=1000, left=100, top=100";
	
		var pVal='${paraStr}'; 
		
		noToolbarPopup(url, "ouCode^uid^fromDiv", pVal+"^"+$("#fromDiv").val(), "cswOpen", option);
		
		//document.form.target ="cswOpen"; 
		//document.form.action=paraUrl; //인터넷망
		//document.form.submit();
	}
}

$(document).ready(function(){
	$("#dvVocCnt").bind("click", fn_link);	
	$("#dvDbCnt").bind("click", fn_link);
	/*
	$("#reLoad").on('click', function() {
		init();
		//alert("버튼 누름!!");
	});
	*/
	$("#reLoad").on('click',init);
});

///////////////////////////// 타이머 기능 /////////////////////////////////////////	
var tempTime = 1000 * 60 * 60 * 2; // 2시간
var timer = setInterval(function(){ init(); },tempTime);

 
</script>

<style>
body {
	margin: 0px
}
body, td {
	font-size: 12px; font-family: "돋움"; color: #5f5e5e;
}
img {
	border: 0;
}
.title_bg {
	cellSpacing: 0;
	cellPadding: 0;
	border: 0;
	background: url(${pageContext.request.contextPath}/resources/images/seaol/title_bg_only.png) no-repeat left top;
	width: 180px;	
}

.box_title {
	height: 40px;
}

.box_out {	
	width: 180px;
	height : 80px;
	border: 0;
	background: url(${pageContext.request.contextPath}/resources/images/seaol/box06_02.gif) no-repeat left bottom;
	line-height:13px;
}

.box_in {
	padding: 3px 20px 13px;
}
.stitle {
	float: left;
	padding: 0 0 0 15px;
	margin: 3px;
	background: url(${pageContext.request.contextPath}/resources/images/icon_bullet.png);
	background-repeat: no-repeat;
	font-weight: bold;
	letter-spacing: -1px;
	word-spacing: -2px;
	text-align: left;
}
</style>
<body onload="init();">
<table class=title_bg border="0" cellSpacing="0" cellPadding="0">
		<tbody>
			<tr>
				<td class=box_title>
					<IMG id='title' alt="" src="/resources/images/seaol/title.png"style="padding-left: 18px;">
					<IMG id='reLoad' alt="민원처리사전예고 새로고침" src="/resources/images/seaol/icon_refresh.gif"style="cursor: pointer;padding: 0 0 3px 30px;">
				</td>
			</tr>
		</tbody>
	</table>
	<TABLE class=box_out>
		<TBODY>
			<TR>
				<TD class=box_in>
					<div id="dvVocCnt" class="stitle" style="float: none;">
						이관업무 <br /> <span class="c" id='vocCnt' style="color: #404040; padding-left: 1px; font-weight: normal; cursor: pointer; text-decoration: underline;">콜센터 연결 중</span>
					</div>
					<div id="dvDbCnt" class="stitle" style="float: none;">
						상담DB요청 <br /> <span class="c" id='dbCnt' style="color: #404040; padding-left: 1px; font-weight: normal; cursor: pointer; text-decoration: underline;">잠시만 기다려 주세요.</span>
					</div>
				</TD>
			</TR>
		</TBODY>
	</TABLE>
<!-- <body > -->  
<!-- 
<button onclick="testing()"> Click me </button><br />

Browser name     : <span id="demo1">&nbsp;</span><br />
Browser version  : <span id="demo2">&nbsp;</span>

	<br>
 -->
<%--  <%
 	if(from != null && (from.equals("seogwipo") || from.equals("jejusi"))){
 %> --%>
 <!--
 <div style="display:inline-block; padding:1px 1px 1px 1px;border:1px solid #a2aab2; border-radius:3px; background-image:url('/resources/images/seaol/title_bg.gif'); background-repeat:no-repeat; background-position: left top; width:169px;">

 		<div style="padding:13px 5px 10px 15px; color:#000; font-size:11pt;font-weight:bold;">
			민원콜센터 <img id='reLoad' src="/resources/images/seaol/icon_refresh.gif" style="float: right;cursor: pointer;">
<br/><br/>
 	 -->	
<%-- <%
	}
%> --%>
<!--  		
		<div id="dvVocCnt" class="stitle" style=" float: none;">이관업무 <br/>
			<span class="c" id='vocCnt' style="color: #404040; padding-left: 1px; font-weight: normal;cursor: pointer;text-decoration: underline;"></span>
		</div>
		<div id="dvDbCnt" class="stitle" style=" float: none;">상담DB요청 <br/>
			<span class="c" id='dbCnt' style="color: #404040; padding-left: 1px; font-weight: normal;cursor: pointer;text-decoration: underline;"></span>
		</div>
		 -->
 <%-- <%
 	if(from != null && (from.equals("seogwipo") || from.equals("jejusi"))){
 %> --%>		
 <!-- 
 		</div>
</div>
 -->	
<%-- <%
	}
%> --%>
		
 	<!-- <form id="form" name="form" method="post"> -->
 		<input type="hidden" id="ouCode" name="ouCode" value="${ouCode}"/>
 		<input type="hidden" id="uid" name="uid" value="${uid}"/>
		<input type="hidden" id="fromDiv" name="fromDiv" />
	<!-- </form>   -->


					 
</body>
</html>