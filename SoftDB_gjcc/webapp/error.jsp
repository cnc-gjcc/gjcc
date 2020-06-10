<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Error Page</title>
</head>
<body>
<p>Error Page</p>
<%
	response.setStatus(HttpServletResponse.SC_OK);
%>
<div id="wrapper">
	<div id="page-wrapper">
		<div align="center">
			<c:out value='${msg }'/>
		</div>
	</div>
</div>

</body>
</html>