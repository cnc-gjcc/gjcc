<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="/resources/images/favicon.ico">
<% 
	//request.setCharacterEncoding("UTF-8");  //한글깨지면 주석제거
	//request.setCharacterEncoding("EUC-KR");  //해당시스템의 인코딩타입이 EUC-KR일경우에
	//String inputYn = request.getParameter("inputYn"); 
	//String roadFullAddr = request.getParameter("roadFullAddr"); 
	//String roadAddrPart1 = request.getParameter("roadAddrPart1"); 
	//String roadAddrPart2 = request.getParameter("roadAddrPart2"); 
	//String engAddr = request.getParameter("engAddr"); 
	//String jibunAddr = request.getParameter("jibunAddr"); 
	//String zipNo = request.getParameter("zipNo"); 
	//String addrDetail = request.getParameter("addrDetail"); 
	//String admCd    = request.getParameter("admCd");
	//String rnMgtSn = request.getParameter("rnMgtSn");
	//String bdMgtSn  = request.getParameter("bdMgtSn");
%>
</head>
<script type="text/javascript">
function init(){
	var url = location.href;
	var confmKey = "U01TX0FVVEgyMDE2MTEyOTE0MzYzNTE2OTE4";
	var resultType = "4"; // 도로명주소 검색결과 화면 출력내용, 1 : 도로명, 2 : 도로명+지번, 3 : 도로명+상세건물명, 4 : 도로명+지번+상세건물명

	document.form.confmKey.value = confmKey;
	document.form.returnUrl.value = url;
	document.form.resultType.value = resultType;
	document.form.action="http://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망
	document.form.submit();
}
</script>
<body onload="init();">
	<form id="form" name="form" method="post">
		<input type="hidden" id="confmKey" name="confmKey" value="" alt="인증키" title="인증키" />
		<input type="hidden" id="returnUrl" name="returnUrl" value="" alt="반환URL" title="반환URL" />
		<input type="hidden" id="resultType" name="resultType" value="" alt="결과종류" title="결과종류" />
		<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 START-->
		<!-- 
		<input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/>
		 -->
		<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 END-->
	</form>
</body>
</html>