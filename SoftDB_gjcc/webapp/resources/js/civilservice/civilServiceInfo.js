var isinitdivWaterTab = false;
var isinitdivTaxTab = false;
var isinitdivCarTab = false;
var isinitdivNonTaxRcptTab = false;

var sCurrentTabID = "";
var sCurrentInOutTaxID = "";

$(document).ready(function(){
	$("body").show();
	//datePicker("#cvsvif_selFrDate");
	//datePicker("#cvsvif_selToDate");		
	
	var cvtabs = $("#pop_body").tabs();
	cvtabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  initTabs(id);	
		  }
	});
	
	initTabs("cvsvif_divWaterTab");
	
	// IVR검증
	$("#cvsvif_btnIvrCall").bind("click", btnIvrCall_clickEvent); // 미완성
});

function initTabs(id){
	switch(id){
	case "cvsvif_divWaterTab":
		if(isinitdivWaterTab == false){ initdivWaterTab(); isinitdivWaterTab=true;}
		break;
//	case "cvsvif_divTaxTab":
//		if(isinitdivTaxTab == false){ initdivTaxTab(); isinitdivTaxTab=true;}
//		break;
	case "cvsvif_divLocalTaxTab":
		if(isinitdivTaxTab == false){ initdivLocalTaxTab(); isinitdivTaxTab=true;}
		break;
	case "cvsvif_divCarTab":
		if(isinitdivCarTab == false){ initdivCarTab(); isinitdivCarTab=true;}
		break;
	case "cvsvif_divNonTaxReceiptTab":
		if(isinitdivNonTaxRcptTab == false){ initdivNonTaxRcptTab(); isinitdivNonTaxRcptTab=true;}
		break;
	}
}

function btnIvrCall_clickEvent(id)
{
	sCurrentTabID = id;
	switch(id){
	case "cvsvif_divWaterTab":
		break;
		
	case "cvsvif_divTaxTab":
		break;
		
	case "cvsvif_divCarTab":
		break;
		
	case "nonTaxRcptArrearTaxTab":
		$("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val("");
		$("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val("");
		break;
		
	case "nonTaxRcptOverpayTaxTab":
		$("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val("");
		$("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val("");
		break;
		
	case "cvsvif_divLocalTaxTab":
		$("#csLocaltax_tfSrchCitizenPreResNumb").val("");
		$("#csLocaltax_tfSrchCitizenPostResNumb").val("");
		break;
	}
	
	$("#hidTaxSsNumber").val("");
	window.opener.fnRequestAgree();
}

function taxPopupSsNumSet()
{ 
	var mainSsNum= $("#hidMainSsNumber", opener.document).val();
	if(mainSsNum){
		//var ssNum = mainSsNum.substr(0,6)+"-*******";
		$("#hidTaxSsNumber").val(mainSsNum);
		
		switch(sCurrentTabID){
		case "cvsvif_divWaterTab":
			break;
			
		case "cvsvif_divTaxTab":
			break;
			
		case "cvsvif_divCarTab":
			break;
			
		case "nonTaxRcptArrearTaxTab":
			$("#csNonTaxRcpt_arrTXtfSrchCitizenPreResNumb").val(mainSsNum.substr(0,6));
			$("#csNonTaxRcpt_arrTXtfSrchCitizenPostResNumb").val(mainSsNum.substr(6,7));
			break;
			
		case "nonTaxRcptOverpayTaxTab":
			$("#csNonTaxRcpt_ovrPYtfSrchCitizenPreResNumb").val(mainSsNum.substr(0,6));
			$("#csNonTaxRcpt_ovrPYtfSrchCitizenPostResNumb").val(mainSsNum.substr(6,7));
			break;
			
		case "cvsvif_divLocalTaxTab":
			$("#csLocaltax_tfSrchCitizenPreResNumb").val(mainSsNum.substr(0,6));
			$("#csLocaltax_tfSrchCitizenPostResNumb").val(mainSsNum.substr(6,7));
			break;
		}
	}
}	
	
//파라미터 셋팅_CnslList
function getJsonStrCnslList(gridtype)
{
	var custId = "";
	var sndrCntctInfm = "";
	
	if($("#cvsvif_tfCustId").val() != "")
		custId = $("#cvsvif_tfCustId").val();
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY25zbExpc3RNYWlu",
		"map" : {
			"key" : "value",
			"cust_id" : custId,
			"sndr_cntct_infm" : sndrCntctInfm,
			"gridtype" : gridtype
		}
	};
	
	return encodeURIComponent(JSON.stringify(loParam));
}