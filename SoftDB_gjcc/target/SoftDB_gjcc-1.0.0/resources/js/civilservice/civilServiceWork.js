var oneTimeEx = false;
var isinitTrnsferVocDiv = false;
var isinitjisikRewordDiv = false;
var isinitNoticeDiv = false;
var isinitTrnsferAcceptDiv = false;
var isinitDeptCorprDiv = false;

function getJsonCCAuth(usrId) {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c20wMDIuc2VsQ0NBdXRo",
		"map" : {
			"key" : "value",
			"tp_cd" : "90909",
			"orgId" : usrId
		}
	};

	return encodeURIComponent(JSON.stringify(loParam));
}

function cvsvwk_initTabs(id) {
	switch (id) {
	case "cvsvwk_TrnsferVocDiv":
		if (isinitTrnsferVocDiv == false) {
			initTrnsferVocDiv();
			isinitTrnsferVocDiv = true;
		}
		break;
	case "cvsvwk_jisikRewordDiv":
		if (isinitjisikRewordDiv == false) {
			initjisikRewordDiv();
			isinitjisikRewordDiv = true;
		}
		break;
	case "cvsvwk_NoticeDiv":
		if (isinitNoticeDiv == false) {
			initNoticeDiv();
			isinitNoticeDiv = true;
		}
		break;
	case "cvsvwk_TrnsferAcceptDiv":
		if (isinitTrnsferAcceptDiv == false) {
			initTrnsferAcceptDiv();
			isinitTrnsferAcceptDiv = true;
		}
		break;
	case "cvsvwk_DeptCorprDiv":
		if (isinitDeptCorprDiv == false) {
			initDeptCorprDiv();
			isinitDeptCorprDiv = true;
		}
		break;
	}
}

function getJsonCCAffairsYN(usrId) {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0Y2NBZmZhaXJzWW4=",
			"map" : {
				"key" : "value",
				"uId" : usrId
			}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

function userCheck(){
	$.ajax({
		type : "post",
		async : false,
		dataType : "json",
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + getUserCheck(),
		success : function(data){
			var ou = data[0].OU;
			var usrNm = data[0].DISPLAYNAME;
			window.sessionStorage.setItem("ou", ou);
			window.sessionStorage.setItem("usrNm", usrNm);
			
			$("#user_Check").html("&nbsp( "+ou+"&nbsp/&nbsp"+usrNm+" )");
			}
	});
}


function getUserCheck() 
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuc2VuZGluZ1VzZXJJbmZv",
		"map" : {
			"key" : "value",
			"userId" : sendingUid
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

$(document).ready(function() {
	$("body").show();
	var usrId = window.sessionStorage.getItem("usrId") == null ? (window.sessionStorage.getItem("USR_ID") == null ? "" : window.sessionStorage.getItem("USR_ID")) : window.sessionStorage.getItem("usrId");
	var cvtabs = $("#cvsvwk_civilServiceWorkLgTabs").tabs();

	cvtabs.tabs({
		activate : function(event, ui) {
			var id = ui.newPanel.attr('id');
			cvsvwk_initTabs(id);
		}
	});
	userCheck();
	cvsvwk_initTabs("cvsvwk_TrnsferVocDiv");
	// 	콜센터담당자 지정 권한여부 확인	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonCCAuth(usrId),
		success : function(data1) {
			$.ajax({  
				type : "post",
				dataType : "json",
				async : false,
				url : "/ajax/civilservice/csw.do",
				data : "pJson=" + getJsonCCAffairsYN(usrId),
				success : function(data2) {
					var auth = data1.CC_AUTH;
					var affairs = data2.CC_AFFAIRS_YN;
					
					window.sessionStorage.setItem("CC_AUTH", auth);
					window.sessionStorage.setItem("CC_AFFAIRS_YN", affairs);
					
					if (auth != "Y") { 
						$("#cvsvwk_TrnsferAcceptDiv").css("display", "none");
						$('a[href="#cvsvwk_TrnsferAcceptDiv"]').parent('li').remove();
						$("#cvsvwk_DeptCorprDiv").css("display", "none");
						$('a[href="#cvsvwk_DeptCorprDiv"]').parent('li').remove();
						cvtabs.tabs("refresh");
					}
					var fromDiv =$("#cvsvwk_fromDiv").val();
					
					if(fromDiv != null && fromDiv == "DB") {
						$('a[href="#cvsvwk_jisikRewordDiv"]').trigger("click");
					}
				}
			});
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
	
	
});