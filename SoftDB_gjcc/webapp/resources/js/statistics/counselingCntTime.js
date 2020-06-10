var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

var gUserArr = [];
var gUserArrNm = [];

// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

//엑셀 정보
var gColName = [];
var gColWidth = [];
var gColAlign = [];
var gGroupHeader = [];
var gColHeader = [];


// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");

//파라미터 셋팅 usrList
function getJsonStrUserList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",//om001.selectList
		"map" : {
			"key" : "value",			
			"chkRetire" : $("#cslCntTm_chkRetire").prop("checked"),	// 퇴사여부
			"cntr_cd" : "010000",
			"notuse" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStsCounselingCntTime
function getJsonStsCounselingCntTime() {	

	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFRpbWU=",//ch001.stsCounselingCntTime
			"map" : {
				"key" : "value" ,				
				"schStartDt" : $("#cslCntTm_schDayStart").val().replace(/-/g, ""),
				"schEndDt" : $("#cslCntTm_schDayEnd").val().replace(/-/g, ""),		
				"gUserArr" : gUserArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonStsCounselingCntTimeExcel
function getJsonStsCounselingCntTimeExcel() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFRpbWU=",//ch001.stsCounselingCntTime
			"map" : {
				"key" : "value" ,				
				"optTerm" : $("#optTerm").val(), // year, month, day
				"schStartDt" : $("#cslCntTm_schDayStart").val().replace(/-/g, ""),
				"schEndDt" : $("#cslCntTm_schDayEnd").val().replace(/-/g, ""),
				"sidx" : $("#cslCntTm_tblStsCounselingCntTime").getGridParam("sortname"),
				"sord" : $("#cslCntTm_tblStsCounselingCntTime").getGridParam("sortorder"),
				"gUserArr" : gUserArr,
				"title" : "시간대별_상담현황" + setDownLoadName($("#cslCntTm_schDayStart").val(), $("#cslCntTm_schDayEnd").val()),
				"colWidth" :gColWidth,
				"colName" : gColName,				
				"colAlign" :gColAlign,				
		        "colHeader1" : gGroupHeader,
			    "colHeader3" : gColHeader
				
			}
	};
	
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
	
}

//상담사 셀렉트 박스 구성
function chkRetire(){	
	ulUserListSet();
	init();
}

function ulUserListSet(){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
	$("#cslCntTm_multiCheckbox").html(dropdownBoxHtml);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data) {
			
			// param값을 JSON으로 파싱
			var ulUserList = "";
			$.each(data, function(key, state) {
				var tempTxt="";
				if(state.RET_YN != undefined) tempTxt = "("+state.RET_YN+")";
				ulUserList += "<li><input type='checkbox' name='liUser' value='" + state.USR_ID + "' data='" + state.USR_NM + tempTxt + "' /> " + state.USR_NM + "<font color='red'>"+tempTxt + "</font>" + "</li>";
				
			});
			
			$("#ulUserList").html(ulUserList);
			$("#cslCntTm_multiCheckbox").dropdownMultiCheckbox();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 상담사 전체 선택 이벤트
	$("#ulUserList .allmultichk").on('click', function(e){		
		gUserArr = [];
		gUserArrNm = [];
		var chk = $(this).is(':checked');
		if(chk){
			$("dd input[name='liUser']").each(function(){
				gUserArr.push($(this).val());
				gUserArrNm.push($(this).attr('data'));
			});
		}		
	});
	// 상담사 개별 선택 이벤트
	$("dd input[name='liUser']").on('click',function(e){
		
		var chk = $(this).is(':checked');
		if(chk){
			gUserArr.push($(this).val());
			gUserArrNm.push($(this).attr('data'));
		}else{
			var pos = gUserArr.indexOf($(this).val());
			gUserArr.splice(pos, 1); 
			gUserArrNm.splice(pos, 1); 
		}		
	});	
}

// 초기화 함수
function init(){
	gUserArr = [];
	gUserArrNm = [];

	$("#cslCntTm_schDayStart").val(getDate());
	$("#cslCntTm_schDayEnd").val(getDate());
	
	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserArrNm.push($(this).attr('data'));
	});
	$("#cslCntTm_multiCheckbox").setCheckedCnt();	


	// 그리드
	stsUsrSearch();
}


// 엑셀다운 버튼 클릭 이벤트
function stsUsrExelDown() {
	setGrid();
	param = getJsonStsCounselingCntTimeExcel();
	url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do";	
	excelDownLoad(url, param);
}


function setGrid(){
	
	if(gUserArr.length == 0){
		alert("선택하신 상담사가 없습니다.");
		return false;		
	}

	// 그리드 설정 정보
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];

	//엑셀 정보	
	gColName = [];
	gColWidth = [];
	gColAlign = [];
	gGroupHeader = [];
	gColHeader = [];
	
	var positionS=0;
	
	gColNames.push("시간대");
	gColModel.push(
				{"name" : "GB", width : 150, align : "center", frozen : true, sortable : false}
	);
	
	
	gColName.push( "GB");
	gColWidth.push(12);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("시간대, C, 0, 2");
	
	gColNames.push("IN", "OUT", "계");
	gColModel.push(
			{"name" : "IN_TOT", width : 50, align : "right", formatter: 'integer',  sortable : false, frozen : true}, 
			{"name" : "OUT_TOT", width : 50, align : "right", formatter: 'integer', sortable : false, frozen : true},			
			{"name" : "CNT_TOT", width : 60, align : "right", formatter: 'integer', sortable : false, frozen : true}
	);
	gGroupHeaders.push({startColumnName: "IN_TOT", numberOfColumns : 3, titleText : "합계"});
	
	gColName.push( "IN_TOT", "OUT_TOT", "CNT_TOT");
	gColWidth.push(7, 7, 7);
	gColAlign.push("right", "right", "right");

	gGroupHeader.push("합계, R," + positionS +", 3");	
	gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","계, C, 1, 1");	
	
	positionS = positionS + 3;
	for(var i = 0  ; i < gUserArr.length; i++){	
		
		gColNames.push("IN", "OUT", "계");
		gColModel.push(
				{"name" : "IN_"+gUserArr[i], width : 50, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}, 
				{"name" : "OUT_"+gUserArr[i], width : 50, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},			
				{"name" : "CNT_"+gUserArr[i], width : 60, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
		);
		gGroupHeaders.push({startColumnName: "IN_"+gUserArr[i], numberOfColumns : 3, titleText : gUserArrNm[i]});
		
		gColName.push( "IN_"+gUserArr[i], "OUT_"+gUserArr[i], "CNT_"+gUserArr[i]);
		gColWidth.push(7, 7, 7);
		gColAlign.push("right", "right", "right");
		
		gGroupHeader.push(gUserArrNm[i]+", R," + positionS +", 3");		
		positionS = positionS + 3;
		gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","계, C, 1, 1");
	}

}

//조회 버튼 클릭 이벤트 
function stsUsrSearch(){
	setGrid();
	grid(getJsonStsCounselingCntTime(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#cslCntTm_dvGridArea").empty();
	var tb = "<table id = 'cslCntTm_tblStsCounselingCntTime'></table>"; 
	$("#cslCntTm_dvGridArea").append(tb);
	
	$("#cslCntTm_tblStsCounselingCntTime").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntTime.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : jsonValue
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : colNamesValue,
		colModel : colModelValue,
		sortname : "RCV_DT",
		sortorder : "ASC",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "486",
	   	width : "100%",	   	
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : false,
	   	rownumWidth : 30,
	   	rowNum : "10000",
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	//footerrow	 : true,
	   	//userDataOnFooter : true,
	   	loadComplete: function() {
	   		
            var ids = $("#cslCntTm_tblStsCounselingCntTime").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntTm_tblStsCounselingCntTime").getRowData(rowId) ;
            	if(rowData.GB =="합계"){
            		$("#cslCntTm_tblStsCounselingCntTime").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}
            	 
           }) ;
    
       },
       
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
	
}


$(document).ready(function(){
	
	var isMngr= false;
	switch(usr_grd_cd) {
      case '020100'://파트매니저
      case '030100'://그룹매니저
      case '050100'://센터장
      case '060100'://통합센터장
      case '090100'://시스템관리자
         isMngr = true;
         break;
      default:
         isMngr = false;
         break;
	}

	if(isMngr){
		$("#cslCntTm_btnStsTimeExelDown").show();
	}else{
		$("#cslCntTm_btnStsTimeExelDown").hide();
	}


	$("#cslCntTm_schDayStart").bind("change",  function () {
		$( "#cslCntTm_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntTm_schDayEnd" ).datepicker( "option", "maxDate",getDate());		

		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#cslCntTm_schDayEnd").bind("change",  function () {
		$( "#cslCntTm_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntTm_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		
		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	
	datePicker("#cslCntTm_schDayStart");
	datePicker("#cslCntTm_schDayEnd");	
	
	// 상담사 셀렉트 박스 세팅
	ulUserListSet();
	// 초기화
	init();	
	
	// 퇴사자포함 체크 클릭 이벤트 등록
	$("#cslCntTm_chkRetire").on("click", chkRetire);
			
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntTm_btnStsTimeInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntTm_btnStsTimeSearch").bind("click", stsUsrSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntTm_btnStsTimeExelDown").bind("click", stsUsrExelDown);
});