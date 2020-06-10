var g_Edu_id = "";

//파라미터 셋팅 getJsonStrCourseCmtSave
function getJsonStrCourseCmtSave()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNDIudXBkYXRlQ3JzQ210U2F2ZQ==",
		"map" : {
			"key" : "value",
			"edu_Id" : g_Edu_id,
			"edu_Cont_c" : DEXT5.getBodyValue("editor1"),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 getJsonStrSelectCourseCmt
function getJsonStrSelectCourseCmt()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNDIuc2VsZWN0Q3JzQ210",
		"map" : {
			"key" : "value",
			"edu_Id" : g_Edu_id,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 출력 버튼 클릭 이벤트 등록
function btnPrint_clickEvent()
{
	//오즈
	var org_EDU_ID=window.sessionStorage.getItem("org_EDU_ID");
	window.open("http://counsel.gimpo.go.kr:8090/ClipReport4/eduCourse.jsp?eduId="+org_EDU_ID);
}

// 저장 버튼 클릭 이벤트 등록
function btnSave_clickEvent()
{
	if (g_Edu_id != undefined && g_Edu_id != "" && g_Edu_id != null)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/eduCourseCmtSave.do",
			data : "pJson=" + getJsonStrCourseCmtSave(),
			success : function(data)
			{
				alert("저장되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	} else {
		alert("선택된 교육과정이 존재하지 않습니다.");
		selfClose();
	}	// if EDU_ORD
}

// 초기화 버튼 클릭 이벤트 등록
function btnInit_clickEvent()
{
	DEXT5.setBodyValue("", "editor1");
}

//닫기버튼 클릭이벤트 등록
function btnClose_ClickEvent() 
{
	 selfClose();
}

function initData()
{
	g_Edu_id = window.opener.document.getElementById("rpedcp_getEduId").value;
	
	if (g_Edu_id != undefined && g_Edu_id != "" && g_Edu_id != null)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/edu/eduSelectCourseCmt.do",
			data : "pJson=" + getJsonStrSelectCourseCmt(),
			success : function(data)
			{
				data == null ? DEXT5.setHtmlContentsEw("", "editor1") : DEXT5.setHtmlContentsEw(data.EDU_CONT_C, "editor1");
				
				//data == null ? DEXT5.setHtmlValue("", "editor1") : DEXT5.setHtmlValue(data.EDU_CONT_C, "editor1");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

$(document).ready(function()
{	
	// 출력 버튼 클릭 이벤트 등록
	$("#edrpcm_btnPrint").bind("click", btnPrint_clickEvent);	
	// 저장 버튼 클릭 이벤트 등록
	$("#edrpcm_btnSave").bind("click", btnSave_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#edrpcm_btnInit").bind("click", btnInit_clickEvent);
	//닫기버튼 클릭이벤트 등록
	$("#edrpcm_btnClose").bind("click", btnClose_ClickEvent);
	
	initData();
	
	/*
	setTimeout(function(){
		initData();
	}, 400);
	*/
});

