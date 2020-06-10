function cbExcelUpload(data)
{
	opener.btnSearch_7_clickEvent();
	this.close();
}

function btnXLUpload_clickEvent()
{
	gAppendHidden("frm1", "callback", "cbExcelUpload");
	gAppendHidden("frm1", "COLUMN_NAME", "cmpg_id,selt_usr_id");
	gAppendHidden("frm1", "COLUMN_VALUE", opener.getCmpgId() + "," + window.sessionStorage.getItem("USR_ID"));
	gAppendHidden("frm1", "MAPPER_NAME", "cm012");
	gAppendHidden("frm1", "SERVICE_NAME", "insertXLFile");	
	gAppendHidden("frm1", "HEADER_NAME", "row,col");
	gAppendHidden("frm1", "HEADER_COUNT", "1,0");	
	gSubmitPost("frm1", true);
}

function initEvent()
{
    $("#btnXLUpload").bind("click", btnXLUpload_clickEvent);
}

$(function()
{
	initEvent();
});
