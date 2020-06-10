var flagM=0;
var flagD=0;
var tmpStartDate;
var tmpEndDate;
var tmpAStartDate;
var tmpAEndDate;

var d = new Date();
var currentYear = d.getFullYear();

var tckt_id =  "";
if(window.sessionStorage.getItem("tcktId") != null) tckt_id = window.sessionStorage.getItem("tcktId");

function getJsonWaterList() {
	var mkey="";
	if(isinitdivWaterTab){
		if($("#cvsvif_mkey").val().trim()==""){
			mkey="all";
		}else{
			mkey = $("#cvsvif_mkey").val().trim();
		}		
	}
	flagM=1;
	tmpStartDate= new Date(); // 날짜 초기값 세팅 
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTEud2F0ZXJMaXN0",
			"map" : {
				"key" : "value",
				//"srchMGu" : $("#cswter_selSrchMGu").val(),
				//"frDt" : $("#cvsvif_selFrDate").val(),
				//"toDt" : $("#cvsvif_selToDate").val(),
				"srchName" : $("#cvsvif_nm").val().trim(),
				"srchAddr" : $("#cvsvif_addr").val().trim(),
				"srchMKey" : mkey
			}
	}
	return  encodeURIComponent(JSON.stringify(loParam));
	/*}else{
		return {"M_GU":"","M_KEY":"","EV_KEY":"","NM":"","TEL":"","ADDR":"","H_TYPE":"","L_TYPE":"","U_TYPE":"","H_PART":"","H_SIZE":"","PAY_TYPE":"","WATER_NO":"","VIRTUAL_NO":"","PAYMENT_NO":"","BANK":""}
	}*/
}

function getJsonWaterAccrueList() {

	//if(isinitdivWaterTab == true){
	flagD=1;
	tmpAStartDate = new Date(); // 날짜 초기값 세팅 
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTEud2F0ZXJBY2NydWVMaXN0",
			"map" : {
				"key" : "value",
				"tkey" : $("#cswter_m_key").html().trim(),
				"tyyyy" : $("#cswter_selYYYYMM").val()
				
			}
	}
	return  encodeURIComponent(JSON.stringify(loParam));
	/*}else{
		return {"TYYMM":"","검침일자":"","검침원":"","상수지침":"","사용량":"","전체":"","상수":"","하수":"","지하수":"","수납구분":"","수납여부":"","소인일자":"","소유주":""}
	}*/	
}


function btnWaterSearch_clickEvent() {	
		flagM=0;
		tmpStartDate="";
		tmpEndDate="";
		if($("#cvsvif_nm").val().trim() == "" && $("#cvsvif_addr").val().trim() == "" && $("#cvsvif_mkey").val().trim() == "") {
			alert("성명/상호, 주소, 관리번호 중 한가지를 넣으십시요.");
			return false;
		
		}
		$("#cswter_tblCsWaterList").jqGrid("setGridParam", { postData :  {pJson : getJsonWaterList()}, page : 1, sortname : "NM ASC, M_KEY ASC, ADDR", sortorder : "ASC"});
		$("#cswter_tblCsWaterList").trigger("reloadGrid");
}
function btnWaterInit_clickEvent(){
	;
	$("#cvsvif_addr").val("");
	$("#cvsvif_nm").val("");
	$("#cvsvif_mkey").val("");
	$("#cswter_tblCsWaterList").jqGrid('clearGridData');
	$("#cswter_selYYYYMM").html("");
	fnWaterInit();
}
function fnWaterInit() {
	
	flagD=0;
	
	$("#cswter_w_nm").html("");
	$("#cswter_m_key").html("");
	$("#cswter_w_addr").html("");
	$("#cswter_ev_key").html("");
	$("#cswter_water_no").html("");
	$("#cswter_h_type").html("");
	$("#cswter_l_type").html("");
	$("#cswter_h_part").html("");
	$("#cswter_l_pay_type").html("");
	$("#cswter_payment_no").html("");
	$("#cswter_virtual_no").html("");
	$("#cswter_bank").html("");
		
	$("#cswter_chenab_cnt").html("");
	$("#cswter_chenab_amt").html("");
	$("#cswter_h_amt").html("");
	$("#cswter_l_amt").html("");
	$("#cswter_u_amt").html("");
	$("#cswter_w_amt").html("");
	$("#cswter_meter_no").html("");
	$("#cswter_va").html("");
	$("#cswter_debit_yn").html("");
	$("#cswter_gagam").html("");	
	
	$("#cswter_tblWaterAccrueList").jqGrid('clearGridData');

}


function initdivWaterTab(){
	
	//setObjSelectBoxWithCode("cswter_selSrchMGu", "전체", "","CHILD", "90290", "");
	var selectBox;
	for(var i = currentYear; i >= currentYear-10; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}

	$("#cswter_selYYYYMM").append(selectBox);
	// 상수도 고객목록	
	$("#cswter_tblCsWaterList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csWaterList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {		
			pJson : getJsonWaterList()
		},
		jsonReader :
		{
			repeatitems: true
		},
		colNames : ["M_GU", "관리번호", "전자수용가번호", "성명/상호", "전화번호", "주소", "상수업종", "하수업종", "지하업종", "상수세대수", "상수구경", "요금방식", "계량기", "가상계좌","전자납부번호","은행","METER_NO","VA","DEBIT_YN","GAGAM"],
		colModel :
		[
		 	{name : "M_GU", hidden : true},
		 	{name : "M_KEY", align : "center", width:"200px"},
		 	{name : "EV_KEY", align : "center", width:"200px"},		 	
		 	{name : "NM", align : "center", width:"250px"},
		 	{name : "TEL", align:"center", width:"100px"},
		 	{name : "ADDR", align : "left", width:"560px"},
		 	{name : "H_TYPE", align : "center", width:"100px", hidden : true},
		 	{name : "L_TYPE", align : "center", width:"100px", hidden : true},
		 	{name : "U_TYPE", align : "center", width:"100px", hidden : true},
		 	{name : "H_PART", align : "left", width:"100px", hidden : true},
		 	{name : "H_SIZE", align : "left", width:"100px", hidden : true},
		 	{name : "L_PAY_TYPE", align : "center", width:"100px", hidden : true},
		 	{name : "WATER_NO", align : "center", width:"100px", hidden : true},
		 	{name : "VIRTUAL_NO", align : "center", width:"100px", hidden : true},
		 	{name : "PAYMENT_NO", align : "center", width:"100px", hidden : true},
		 	{name : "BANK", align : "center", width:"100px", hidden : true},
		 	{name : "METER_NO", align : "center", width:"100px", hidden : true},
		 	{name : "VA", align : "center", width:"100px", hidden : true},
		 	{name : "DEBIT_YN", align : "center", width:"100px", hidden : true},
		 	{name : "GAGAM", align : "center", width:"100px", hidden : true},
		],
		sortname : "NM ASC, M_KEY ASC, ADDR",
		sortorder : "ASC",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "130",
	   	width : "100%",
	   	rowNum : 5,
	   	rowList : [5, 10, 50, 100],
	   	autowidth : true,
	   	pager : "#cswter_pagingCsWaterList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
		onSelectRow : function(rowid) 
		{
			//상세내역조회
			fnWaterInit();
			var water = $("#cswter_tblCsWaterList").getRowData(rowid);

			$("#cswter_w_nm").html(water.NM);
			$("#cswter_m_key").html(water.M_KEY);
			$("#cswter_w_addr").html(water.ADDR);
			/*
			if(water.M_GU=="1"){
				$("#cswter_gu_nm").html("공주시");	
			}else{
				$("#cswter_gu_nm").html("타지역");
			}
			*/
			$("#cswter_ev_key").html(water.EV_KEY);			
			$("#cswter_water_no").html(water.WATER_NO);
			$("#cswter_h_type").html(water.H_TYPE);
			$("#cswter_l_type").html(water.L_TYPE);
			$("#cswter_h_part").html(water.H_PART);
			$("#cswter_l_pay_type").html(water.L_PAY_TYPE);
			$("#cswter_payment_no").html(water.PAYMENT_NO);
			$("#cswter_virtual_no").html(water.VIRTUAL_NO);
			$("#cswter_bank").html(water.BANK);
			
			$("#cswter_meter_no").html(water.METER_NO);
			$("#cswter_va").html(water.VA);
			$("#cswter_debit_yn").html(water.DEBIT_YN);
			$("#cswter_gagam").html(water.GAGAM);
			
			//현재 본인 체납 정보
	   		var loParam = {
	   				"qt" : "c2VsZWN0",
	   				"mi" : "b2gwNTEud2F0ZXJDaGVuYWI=",
	   				"map" : {
	   					"key" : "value",
	   					"m_key" : water.M_KEY
	   				}
	   		};
	   		var tmpDStartDate = new Date();// 날짜 초기값 세팅 
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/civilservice/waterChenab.do",
				data : "pJson=" + encodeURIComponent(JSON.stringify(loParam)),
				success : function(data){
					$("#cswter_chenab_cnt").html(data.CHENAB_CNT);
					$("#cswter_chenab_amt").html(data.CHENAB_AMT);
					$("#cswter_h_amt").html(data.H_AMT);
					$("#cswter_l_amt").html(data.L_AMT);
					$("#cswter_u_amt").html(data.U_AMT);
					$("#cswter_w_amt").html(data.W_AMT);
					
			   		var tmpDEndDate = new Date();// 날짜 초기값 세팅 
			   		var ans_tm2 = tmpDEndDate.getTime() - tmpDStartDate.getTime();
			   		ans_tm2 = Math.floor(ans_tm2/1000); // 초간격
			   		var loParamH = {
			   				"qt" : "aW5zZXJ0",
			   				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
			   				"map" : {
			   					"key" : "value",
			   					"tckt_id" : tckt_id,
			   					"lnk_stm_cd" : "100000", //상수도업무
			   					"inqr_scr" : "csWater >> waterChenab",
			   					"inqr_cond" : "m_key:"+water.M_KEY,
			   					"ans_tm" : ans_tm2,
			   					"rslt_cd" : "00000",	//정상
			   					"rslt" : ""
			   				}
			   		};
//			   		$.ajax({
//						type : "post",
//						dataType: "json",
//						async : false,
//						url : getContextPath() + "/ajax/civilservice/insertHistory.do",
//						data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
//						success : function(data)
//						{
//							
//						},
//						error : function(data, status, err) 
//						{
//							networkErrorHandler(data, status, err);
//						}
//					});
			   		
				},
				error : function(data, status, err) {
					
					var tmpDEndDate = new Date();// 날짜 초기값 세팅 
			   		var ans_tm2 = tmpDEndDate.getTime() - tmpDStartDate.getTime();
			   		ans_tm2 = Math.floor(ans_tm2/1000); // 초간격
			   					   		
			   		var loParamH = {
			   				"qt" : "aW5zZXJ0",
			   				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
			   				"map" : {
			   					"key" : "value",
			   					"tckt_id" : tckt_id,
			   					"lnk_stm_cd" : "100000", //상수도업무
			   					"inqr_scr" : "csWater >> WaterChenab",
			   					"inqr_cond" : "m_key:"+water.M_KEY,
			   					"ans_tm" : ans_tm2,
			   					"rslt_cd" : "00001",	// 통신오류
			   					"rslt" : err
			   				}
			   		};
//			   		$.ajax({
//						type : "post",
//						dataType: "json",
//						async : false,
//						url : getContextPath() + "/ajax/civilservice/insertHistory.do",
//						data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
//						success : function(data)
//						{
//							
//						},
//						error : function(data, status, err) 
//						{
//							networkErrorHandler(data, status, err);
//						}
//					});					
					networkErrorHandler(data, status, err);
				}
			});
			/*
			//누적목록
	   		var loParamN = {
	   				"qt" : "c2VsZWN0TGlzdA==",
	   				"mi" : "b2gwNTEud2F0ZXJOdWp1a1k=",
	   				"map" : {
	   					"key" : "value",
	   					"tkey" : water.M_KEY
	   				}
	   		};
	   		
	   		$("#cswter_selYYYYMM").html("");
			$.ajax({
				type : "post",
				
				async : false,
				url : getContextPath() + "/ajax/civilservice/waterNujukY.do",
				data : "pJson=" + encodeURIComponent(JSON.stringify(loParamN)),
				success : function(data){
					// param값을 JSON으로 파싱
					var jr = JSON.parse(data);
					var value="";
					$.each(jr, function(key, state){
						value += "<option value='" + state.NUJUK_Y + "'>" + state.NUJUK_Y+"년도("+state.NUJUK_CNT+"건)" + "</option>";
					});					
					$("#cswter_selYYYYMM").append(value);
					
					$("#cswter_tblWaterAccrueList").jqGrid("setGridParam", { postData :  {pJson : getJsonWaterAccrueList()}, page : 1, sortname : "TYYMM", sortorder : "DESC"});
					$("#cswter_tblWaterAccrueList").trigger("reloadGrid");
					
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});			
				*/
			
					
			$("#cswter_tblWaterAccrueList").jqGrid("setGridParam", { postData :  {pJson : getJsonWaterAccrueList()}, page : 1, sortname : "TYYMM", sortorder : "DESC"});
			$("#cswter_tblWaterAccrueList").trigger("reloadGrid");
				
		},
		onPaging : function(pgButton)
	   	{
			tmpStartDate = new Date();// 날짜 초기값 세팅 
	   	},
	   	loadComplete : function(xhr)
	   	{
	   		
	   		var inqr_cond = 
			//"srchMGu:" + $("#cswter_selSrchMGu").val()+
			" / srchName:" + $("#cvsvif_nm").val().trim()+
			" / srchAddr:" + $("#cvsvif_addr").val().trim()+
			" / srchMKey:" + $("#cvsvif_mkey").val().trim() +
			" / page:" + $("#cswter_tblCsWaterList").getGridParam('page');
	   			   		
	   		tmpEndDate = new Date();// 날짜 초기값 세팅 
	   		var ans_tm = tmpEndDate.getTime() - tmpStartDate.getTime();
	   		ans_tm = Math.floor(ans_tm/1000); // 초간격

	   		var loParamH = {
	   				"qt" : "aW5zZXJ0",
	   				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
	   				"map" : {
	   					"key" : "value",
	   					"tckt_id" : tckt_id,
	   					"lnk_stm_cd" : "100000", //상수도업무
	   					"inqr_scr" : "csWater",
	   					"inqr_cond" : inqr_cond,
	   					"ans_tm" : ans_tm,
	   					"rslt_cd" : "00000",	//정상
	   					"rslt" : ""
	   				}
	   		};
	   		
//			$.ajax({
//				type : "post",
//				dataType: "json",
//				async : false,
//				url : getContextPath() + "/ajax/civilservice/insertHistory.do",
//				data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
//				success : function(data)
//				{
//					
//				},
//				error : function(data, status, err) 
//				{
//					networkErrorHandler(data, status, err);
//				}
//			});
			
			fnWaterInit();
	   	},
	   	loadError : function(xhr, status, error)
	   	{
	   		if(flagM != 0){
		   		
		   		var inqr_cond = 
			//	"srchMGu:" + $("#cswter_selSrchMGu").val()+
				" / srchName:" + $("#cvsvif_nm").val().trim()+
				" / srchAddr:" + $("#cvsvif_addr").val().trim()+
				" / srchMKey:" + $("#cvsvif_mkey").val().trim() +
				" / page:" + $("#cswter_tblCsWaterList").getGridParam('page');
		   				   		
		   		tmpEndDate = new Date();// 날짜 초기값 세팅 
		   		var ans_tm = tmpEndDate.getTime() - tmpStartDate.getTime();
		   		ans_tm = Math.floor(ans_tm/1000); // 초간격

		   		var loParamH = {
		   				"qt" : "aW5zZXJ0",
		   				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
		   				"map" : {
		   					"key" : "value",
		   					"tckt_id" : tckt_id,
		   					"lnk_stm_cd" : "100000", //상수도업무
		   					"inqr_scr" : "csWater",
		   					"inqr_cond" : inqr_cond,
		   					"ans_tm" : ans_tm,
		   					"rslt_cd" : "00001",	// 통신오류
		   					"rslt" : error
		   				}
		   		};
		   		
//				$.ajax({
//					type : "post",
//					dataType: "json",
//					async : false,
//					url : getContextPath() + "/ajax/civilservice/insertHistory.do",
//					data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
//					success : function(data)
//					{
//						
//					},
//					error : function(data, status, err) 
//					{
//						networkErrorHandler(data, status, err);
//					}
//				});
	   		}
	   		
	   	}
	}).jqGrid("navGrid", "#cswter_pagingCsWaterList", {edit : false, add : false, del : false, search : false});
	
	

	// 상수도 누적정보
	$("#cswter_tblWaterAccrueList").jqGrid(
			{
				url : getContextPath() + "/jqgrid/civilservice/csWaterAccrueList.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonWaterAccrueList()
				},
				jsonReader :
				{
					repeatitems: false
				},
				colNames : ["납기", "검침일자", "검침원", "상수지침", "사용량", "전체", "상수","하수", "지하수",  "물이용부담금", "수납여부","수납구분", "소인일자", "소유주"],
				
			   	colModel :
			   	[
				 	{name : "TYYMM", align : "center", width:"60px" },	
				 	{name : "검침일자", align : "center", width:"80px" },
				 	{name : "검침원", align : "center", width:"60px" }, 	
				 	{name : "상수지침", align : "right", width:"60px", formatter:"integer" },
				 	{name : "상사용량", align:"right", width:"50px", formatter:"integer" },
				 	{name : "전체합계", align : "right", width:"80px", formatter:"integer" },
				 	{name : "상수합계", align : "right", width:"70px", formatter:"integer" },
				 	{name : "하수합계", align : "right", width:"70px", formatter:"integer" },
				 	{name : "지하수합계", align : "right", width:"70px", formatter:"integer" },
				 	{name : "물부담합계", align : "right", width:"80px", formatter:"integer" },
				 	{name : "수납여부", align : "center", width:"80px"},
				 	{name : "수납구분", align : "center", width:"80px"},
				 	{name : "소인일자", align : "center", width:"80px"},
				 	{name : "소유주", align : "center", width:"150px"}				 	
			   	],
			   	sortname : "TYYMM",
			   	sortorder : "DESC",
			   	gridview : true,
			   	hidegrid : false,
			   	shrinkToFit : true,
			   	loadonce : false,
			   	height : "313px",
			    width : "100%",
			   	rowNum : "12",
			   	autowidth : true,
			   	pgbuttons : true,
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	loadComplete : function(xhr)
			   	{
			   		var inqr_cond = 
						"tkey:" + $("#cswter_m_key").html().trim()+
						" / tyyyy:" +  $("#cswter_selYYYYMM").val();
				   		   		
			   		tmpAEndDate = new Date();// 날짜 초기값 세팅 
			   		
			   		var ans_tm = tmpAEndDate.getTime() - tmpAStartDate.getTime();
			   		ans_tm = Math.floor(ans_tm/1000); // 초간격

			   		var loParamH = {
			   				"qt" : "aW5zZXJ0",
			   				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
			   				"map" : {
			   					"key" : "value",
			   					"tckt_id" : tckt_id,
			   					"lnk_stm_cd" : "100000", //상수도업무
			   					"inqr_scr" : "csWater >> WaterAccrueList",
			   					"inqr_cond" : inqr_cond,
			   					"ans_tm" : ans_tm,
			   					"rslt_cd" : "00000",	//정상
			   					"rslt" : ""
			   				}
			   		};
				   		
//			   		$.ajax({
//						type : "post",
//						dataType: "json",
//						async : false,
//						url : getContextPath() + "/ajax/civilservice/insertHistory.do",
//						data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
//						success : function(data)
//						{
//							
//						},
//						error : function(data, status, err) 
//						{
//							networkErrorHandler(data, status, err);
//						}
//					});
				   		
				   		
			   	},
			   	loadError : function(xhr, status, error)
			   	{
			   		if(flagD != 0){

			   			var inqr_cond = 
							"tkey:" + $("#cswter_m_key").html().trim()+
							" / tyyyy:" +  $("#cswter_selYYYYMM").val();
					   			   		
				   		tmpAEndDate = new Date();// 날짜 초기값 세팅 
				   		var ans_tm2 = tmpAEndDate.getTime() - tmpAStartDate.getTime();
				   		ans_tm2 = Math.floor(ans_tm2/1000); // 초간격
				   					   		
				   		var loParamH = {
				   				"qt" : "aW5zZXJ0",
				   				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				   				"map" : {
				   					"key" : "value",
				   					"tckt_id" : tckt_id,
				   					"lnk_stm_cd" : "100000", //상수도업무
				   					"inqr_scr" : "csWater >> WaterAccrueList",
				   					"inqr_cond" : inqr_cond,
				   					"ans_tm" : ans_tm2,
				   					"rslt_cd" : "00001",	// 통신오류
				   					"rslt" : error
				   				}
				   		};
//				   		$.ajax({
//							type : "post",
//							dataType: "json",
//							async : false,
//							url : getContextPath() + "/ajax/civilservice/insertHistory.do",
//							data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
//							success : function(data)
//							{
//								
//							},
//							error : function(data, status, err) 
//							{
//								networkErrorHandler(data, status, err);
//							}
//						});					
						networkErrorHandler(xhr, status, error);						
			   		}
			   	}
	});	
	
	
	$("#cvsvif_btn_search").bind("click", btnWaterSearch_clickEvent);
	
	$("#cvsvif_nm,#cvsvif_addr,#cvsvif_mkey").bind("keydown", function(key){
		if (key.keyCode == 13)
			btnWaterSearch_clickEvent();
	});
	
	$("#cswter_selYYYYMM").change(function() {  		
		$("#cswter_tblWaterAccrueList").jqGrid("setGridParam", { postData :  {pJson : getJsonWaterAccrueList()}, page : 1, sortname : "TYYMM", sortorder : "DESC"});
		$("#cswter_tblWaterAccrueList").trigger("reloadGrid");
	}); 
	
	$("#cvsvif_btn_init").on("click",btnWaterInit_clickEvent);
}