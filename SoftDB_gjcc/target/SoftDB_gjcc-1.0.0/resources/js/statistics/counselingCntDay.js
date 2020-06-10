var gActCdArr = [];
var gActNmArr = [];
 
var gCtgCdArr = [];
var gCtgNmArr = [];
 
 
// 그리드 설정 정보
var gActColNames = [];
var gActColModel = [];
var gActGroupHeaders = [];
 
var gCtgColNames = [];
var gCtgColModel = [];
var gCtgGroupHeaders = [];
 
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
            "cntr_cd" : "010000",
            "notuse" : false,
            "sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
            "sord" : "asc", 
                }
    }; 
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}
 
// 처리유형코드리스트
function getJsonActCdList()
{
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "c3QwMjEuYWN0Q29kZUxpc3Q=",
        "map" : {
        "key" : "value",
        "tp_cd" : "90014"
            }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 
//상담유형코드리스트
function getJsonCtgCdList()
{
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "c3QwMjIuY3RnQ29kZUxpc3Q=",
        "map" : {
            "key" : "value",
            //"ctg_lvl" : "2"
            "ctg_lvl" : "1"
        }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 
//일일업무현황
function getJsonStsCounselingCntDay()
{
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "c3QwMjAuc3RzQ291bnNlbGluZ0NudERheQ==",
        "map" : {
            "key" : "value",
            "schDt" : $("#cslCntD_schDay").val().replace(/-/g, "")
        }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 
//처리유형그리드
function getJsonStsCounselingCntDayAct() {
	
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "c3QwMjEuc3RzQ291bnNlbGluZ0NudERheUFjdA==",
        "map" : {
            "key" : "value" ,
            "tp_cd" : "90014",
            "schDt" : $("#cslCntD_schDay").val().replace(/-/g, ""), 
            "gActCdArr" : gActCdArr
        }
    };
     
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}
 
function getJsonStsCounselingCntDayCtg() {
 
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "c3QwMjIuc3RzQ291bnNlbGluZ0NudERheUN0Zw==",
        "map" : {
            "key" : "value" ,
            //"ctg_lvl" : "2",
            "ctg_lvl" : "1",
            "schDt" : $("#cslCntD_schDay").val().replace(/-/g, ""), 
            "gCtgCdArr" : gCtgCdArr
        }
    };
     
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}
 
 
// 초기화 함수
function init(){
 
    $("#cslCntD_schDay").val(getAddDate(getDate(),-1)); 
    stsDaySearch();
}
 
 
function setStatistics_tbl(){
 
    $.ajax({
        type : "post",
        dataType: "json",
        async : false,
        url : getContextPath() + "/ajax/statistics/stsCounselingCntDay.do",
        data : "pJson=" + getJsonStsCounselingCntDay(),
        success : function(data) { 
            // param값을 JSON으로 파싱 
 
            $.each(data, function(key, state) {
                if(state.GB=='TD') {
                    $("#cslCntD_tday").html(state.DAY);
                    $("#cslCntD_task_cont").val(state.TASK_CONT);
                    $("#cslCntD_entr_st").val(state.ENTR_ST);
                     
                    $("#cslCntD_mngr").val(state.MNGR);
                    $("#cslCntD_agt").val(state.AGT);
                    $("#cslCntD_day_off").val(state.DAY_OFF);
                    $("#cslCntD_etc_prsn").val(state.ETC_PRSN);
                    $("#cslCntD_tota_prsn").val(state.TOTA_PRSN);
                     
                    $("#cslCntD_inout_call").html(state.INOUT_CALL);
                     
                    $("#cslCntD_ivr_in_call").html(state.IVR_IN_CALL);
                    $("#cslCntD_ivr_ans_call").html(state.IVR_ANS_CALL);
                    $("#cslCntD_ivr_abnd_call").html(state.IVR_ABND_CALL);
                    $("#cslCntD_ivr_ans_rate").html(state.IVR_ANS_RATE);
                    $("#cslCntD_intpt_svc").html(state.INTPT_SVC);
                     
                     
                    $("#cslCntD_in_call").html(state.IN_CALL);
                    $("#cslCntD_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_tota_call_tm").html(state.TOTA_CALL_TM);
                    $("#cslCntD_avrg_call_tm").html(state.AVRG_CALL_TM);
                     
                    $("#cslCntD_ob_succ_call").html(state.OB_SUCC_CALL);
                    $("#cslCntD_cnsl_prsn").html(state.CNSL_PRSN);
                    $("#cslCntD_cph").html(state.CPH);
                    $("#cslCntD_cpd").html(state.CPD); 
                    $("#cslCntD_sec20_succ_call").html(state.SEC20_SUCC_CALL);
                    $("#cslCntD_sec20_succ_rate").html(state.SEC20_SUCC_RATE); 
                     
                    $("#cslCntD_scnt").html(state.SCNT);
                    $("#cslCntD_rate").html(state.RATE); 
                    $("#cslCntD_rcv").html(state.RCV);
                    $("#cslCntD_act").html(state.ACT);
                    $("#cslCntD_act_rate").html(state.ACT_RATE);
                     
                    $("#cslCntD_sms_snd_scnt").html(state.SMS_SND_SCNT);
                    $("#cslCntD_fax_snd_scnt").val(state.FAX_SND_SCNT);
                     
                    $("#cslCntD_day_ans_call").html(state.DAY_ANS_CALL); 
                    $("#cslCntD_day_cnsl_prsn").html(state.DAY_CNSL_PRSN);
                    $("#cslCntD_day_cpd").html(state.DAY_CPD);
                     
                }
                if(state.GB=='YD') {
                    $("#cslCntD_yday").html(state.DAY);
                    $("#cslCntD_yd_mngr").html(state.MNGR);
                    $("#cslCntD_yd_agt").html(state.AGT);
                    $("#cslCntD_yd_day_off").html(state.DAY_OFF);
                    $("#cslCntD_yd_etc_prsn").html(state.ETC_PRSN);
                    $("#cslCntD_yd_tota_prsn").html(state.TOTA_PRSN);
                     
                    $("#cslCntD_yd_inout_call").html(state.INOUT_CALL);
                     
                    $("#cslCntD_yd_ivr_in_call").html(state.IVR_IN_CALL);
                    $("#cslCntD_yd_ivr_ans_call").html(state.IVR_ANS_CALL);
                    $("#cslCntD_yd_ivr_abnd_call").html(state.IVR_ABND_CALL);
                    $("#cslCntD_yd_ivr_ans_rate").html(state.IVR_ANS_RATE);
                     
                    $("#cslCntD_yd_intpt_svc").html(state.INTPT_SVC);
                     
                    $("#cslCntD_yd_in_call").html(state.IN_CALL);
                    $("#cslCntD_yd_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_yd_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_yd_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_yd_in_call").html(state.IN_CALL);
                    $("#cslCntD_yd_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_yd_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_yd_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_yd_tota_call_tm").html(state.TOTA_CALL_TM);
                    $("#cslCntD_yd_avrg_call_tm").html(state.AVRG_CALL_TM);
                     
                    $("#cslCntD_yd_ob_succ_call").html(state.OB_SUCC_CALL);
                    $("#cslCntD_yd_cnsl_prsn").html(state.CNSL_PRSN);
                    $("#cslCntD_yd_cph").html(state.CPH);
                    $("#cslCntD_yd_cpd").html(state.CPD); 
                    $("#cslCntD_yd_sec20_succ_call").html(state.SEC20_SUCC_CALL);
                    $("#cslCntD_yd_sec20_succ_rate").html(state.SEC20_SUCC_RATE); 
                     
                    $("#cslCntD_yd_scnt").html(state.SCNT);
                    $("#cslCntD_yd_rate").html(state.RATE); 
                    $("#cslCntD_yd_rcv").html(state.RCV);
                    $("#cslCntD_yd_act").html(state.ACT);
                    $("#cslCntD_yd_act_rate").html(state.ACT_RATE);
                     
                    $("#cslCntD_yd_sms_snd_scnt").html(state.SMS_SND_SCNT);
                    $("#cslCntD_yd_fax_snd_scnt").html(state.FAX_SND_SCNT);
                     
                    $("#cslCntD_yd_day_ans_call").html(state.DAY_ANS_CALL); 
                    $("#cslCntD_yd_day_cnsl_prsn").html(state.DAY_CNSL_PRSN);
                    $("#cslCntD_yd_day_cpd").html(state.DAY_CPD);
 
                }
                if(state.GB=='TM') {
 
                    $("#cslCntD_tm_mngr").html(state.MNGR);
                    $("#cslCntD_tm_agt").html(state.AGT);
                    $("#cslCntD_tm_day_off").html(state.DAY_OFF);
                    $("#cslCntD_tm_etc_prsn").html(state.ETC_PRSN);
                    $("#cslCntD_tm_tota_prsn").html(state.TOTA_PRSN);
                     
                    $("#cslCntD_tm_inout_call").html(state.INOUT_CALL);
                     
                    $("#cslCntD_tm_ivr_in_call").html(state.IVR_IN_CALL);
                    $("#cslCntD_tm_ivr_ans_call").html(state.IVR_ANS_CALL);
                    $("#cslCntD_tm_ivr_abnd_call").html(state.IVR_ABND_CALL);
                    $("#cslCntD_tm_ivr_ans_rate").html(state.IVR_ANS_RATE);
                    $("#cslCntD_tm_intpt_svc").html(state.INTPT_SVC);
                     
                    $("#cslCntD_tm_in_call").html(state.IN_CALL);
                    $("#cslCntD_tm_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_tm_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_tm_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_tm_in_call").html(state.IN_CALL);
                    $("#cslCntD_tm_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_tm_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_tm_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_tm_tota_call_tm").html(state.TOTA_CALL_TM);
                    $("#cslCntD_tm_avrg_call_tm").html(state.AVRG_CALL_TM);
                     
                    $("#cslCntD_tm_ob_succ_call").html(state.OB_SUCC_CALL);
                    $("#cslCntD_tm_cnsl_prsn").html(state.CNSL_PRSN);
                    $("#cslCntD_tm_cph").html(state.CPH);
                    $("#cslCntD_tm_cpd").html(state.CPD); 
                    $("#cslCntD_tm_sec20_succ_call").html(state.SEC20_SUCC_CALL);
                    $("#cslCntD_tm_sec20_succ_rate").html(state.SEC20_SUCC_RATE); 
                     
                    $("#cslCntD_tm_scnt").html(state.SCNT);
                    $("#cslCntD_tm_rate").html(state.RATE); 
                    $("#cslCntD_tm_rcv").html(state.RCV);
                    $("#cslCntD_tm_act").html(state.ACT);
                    $("#cslCntD_tm_act_rate").html(state.ACT_RATE);
                     
                    $("#cslCntD_tm_sms_snd_scnt").html(state.SMS_SND_SCNT);
                    $("#cslCntD_tm_fax_snd_scnt").html(state.FAX_SND_SCNT);
                     
                    $("#cslCntD_tm_day_ans_call").html(state.DAY_ANS_CALL); 
                    $("#cslCntD_tm_day_cnsl_prsn").html(state.DAY_CNSL_PRSN);
                    $("#cslCntD_tm_day_cpd").html(state.DAY_CPD);
                }
                if(state.GB=='YM') {
 
                    $("#cslCntD_ym_mngr").html(state.MNGR);
                    $("#cslCntD_ym_agt").html(state.AGT);
                    $("#cslCntD_ym_day_off").html(state.DAY_OFF);
                    $("#cslCntD_ym_etc_prsn").html(state.ETC_PRSN);
                    $("#cslCntD_ym_tota_prsn").html(state.TOTA_PRSN);
                     
                    $("#cslCntD_ym_inout_call").html(state.INOUT_CALL);
                     
                    $("#cslCntD_ym_ivr_in_call").html(state.IVR_IN_CALL);
                    $("#cslCntD_ym_ivr_ans_call").html(state.IVR_ANS_CALL);
                    $("#cslCntD_ym_ivr_abnd_call").html(state.IVR_ABND_CALL);
                    $("#cslCntD_ym_ivr_ans_rate").html(state.IVR_ANS_RATE);
                    $("#cslCntD_ym_intpt_svc").html(state.INTPT_SVC);
                     
                    $("#cslCntD_ym_in_call").html(state.IN_CALL);
                    $("#cslCntD_ym_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_ym_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_ym_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_ym_in_call").html(state.IN_CALL);
                    $("#cslCntD_ym_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_ym_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_ym_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_ym_tota_call_tm").html(state.TOTA_CALL_TM);
                    $("#cslCntD_ym_avrg_call_tm").html(state.AVRG_CALL_TM);
                     
                    $("#cslCntD_ym_ob_succ_call").html(state.OB_SUCC_CALL);
                    $("#cslCntD_ym_cnsl_prsn").html(state.CNSL_PRSN);
                    $("#cslCntD_ym_cph").html(state.CPH);
                    $("#cslCntD_ym_cpd").html(state.CPD); 
                    $("#cslCntD_ym_sec20_succ_call").html(state.SEC20_SUCC_CALL);
                    $("#cslCntD_ym_sec20_succ_rate").html(state.SEC20_SUCC_RATE); 
                     
                    $("#cslCntD_ym_scnt").html(state.SCNT);
                    $("#cslCntD_ym_rate").html(state.RATE); 
                    $("#cslCntD_ym_rcv").html(state.RCV);
                    $("#cslCntD_ym_act").html(state.ACT);
                    $("#cslCntD_ym_act_rate").html(state.ACT_RATE);
                     
                    $("#cslCntD_ym_sms_snd_scnt").html(state.SMS_SND_SCNT);
                    $("#cslCntD_ym_fax_snd_scnt").html(state.FAX_SND_SCNT);
                     
                    $("#cslCntD_ym_day_ans_call").html(state.DAY_ANS_CALL); 
                    $("#cslCntD_ym_day_cnsl_prsn").html(state.DAY_CNSL_PRSN);
                    $("#cslCntD_ym_day_cpd").html(state.DAY_CPD);
                }
                if(state.GB=='TDYD') {
                	
                    $("#cslCntD_tdate").val(state.DAY);
                     
                    $("#cslCntD_tdyd_mngr").html(state.MNGR);
                    $("#cslCntD_tdyd_agt").html(state.AGT);
                    $("#cslCntD_tdyd_day_off").html(state.DAY_OFF);
                    $("#cslCntD_tdyd_etc_prsn").html(state.ETC_PRSN);
                    $("#cslCntD_tdyd_tota_prsn").html(state.TOTA_PRSN);
                     
                    $("#cslCntD_tdyd_inout_call").html(state.INOUT_CALL);
                     
                    $("#cslCntD_tdyd_ivr_in_call").html(state.IVR_IN_CALL);
                    $("#cslCntD_tdyd_ivr_ans_call").html(state.IVR_ANS_CALL);
                    $("#cslCntD_tdyd_ivr_abnd_call").html(state.IVR_ABND_CALL);
                    $("#cslCntD_tdyd_ivr_ans_rate").html(state.IVR_ANS_RATE);
                    $("#cslCntD_tdyd_intpt_svc").html(state.INTPT_SVC);
                     
                    $("#cslCntD_tdyd_in_call").html(state.IN_CALL);
                    $("#cslCntD_tdyd_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_tdyd_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_tdyd_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_tdyd_in_call").html(state.IN_CALL);
                    $("#cslCntD_tdyd_ans_call").html(state.ANS_CALL);
                    $("#cslCntD_tdyd_abnd_call").html(state.ABND_CALL);
                    $("#cslCntD_tdyd_ans_rate").html(state.ANS_RATE);
                     
                    $("#cslCntD_tdyd_tota_call_tm").html(state.TOTA_CALL_TM);
                    $("#cslCntD_tdyd_avrg_call_tm").html(state.AVRG_CALL_TM);
                     
                    $("#cslCntD_tdyd_ob_succ_call").html(state.OB_SUCC_CALL);
                    $("#cslCntD_tdyd_cnsl_prsn").html(state.CNSL_PRSN);
                    $("#cslCntD_tdyd_cph").html(state.CPH);
                    $("#cslCntD_tdyd_cpd").html(state.CPD); 
                    $("#cslCntD_tdyd_sec20_succ_call").html(state.SEC20_SUCC_CALL);
                    $("#cslCntD_tdyd_sec20_succ_rate").html(state.SEC20_SUCC_RATE); 
                     
                    $("#cslCntD_tdyd_scnt").html(state.SCNT);
                    $("#cslCntD_tdyd_rate").html(state.RATE); 
                    $("#cslCntD_tdyd_rcv").html(state.RCV);
                    $("#cslCntD_tdyd_act").html(state.ACT);
                    $("#cslCntD_tdyd_act_rate").html(state.ACT_RATE);
                     
                    $("#cslCntD_tdyd_sms_snd_scnt").html(state.SMS_SND_SCNT);
                    $("#cslCntD_tdyd_fax_snd_scnt").html(state.FAX_SND_SCNT);
                     
                    $("#cslCntD_tdyd_day_ans_call").html(state.DAY_ANS_CALL); 
                    $("#cslCntD_tdyd_day_cnsl_prsn").html(state.DAY_CNSL_PRSN);
                    $("#cslCntD_tdyd_day_cpd").html(state.DAY_CPD);
                }
            });
/* 
            $("#cslCntD_tdyd_mngr").html($("#cslCntD_mngr").val()-$("#cslCntD_yd_mngr").html());
            $("#cslCntD_tdyd_agt").html($("#cslCntD_agt").val()-$("#cslCntD_yd_agt").html());
            $("#cslCntD_tdyd_day_off").html($("#cslCntD_day_off").val()-$("#cslCntD_yd_day_off").html());
            $("#cslCntD_tdyd_etc_prsn").html($("#cslCntD_etc_prsn").val()-$("#cslCntD_yd_etc_prsn").html());
            $("#cslCntD_tdyd_tota_prsn").html($("#cslCntD_tota_prsn").val()-$("#cslCntD_yd_tota_prsn").html());
             
            $("#cslCntD_tdyd_ivr_in_call").html($("#cslCntD_ivr_in_call").html()-$("#cslCntD_yd_ivr_in_call").html());
            $("#cslCntD_tdyd_ivr_ans_call").html($("#cslCntD_ivr_ans_call").html()-$("#cslCntD_yd_ivr_ans_call").html());
            $("#cslCntD_tdyd_ivr_abnd_call").html($("#cslCntD_ivr_abnd_call").html()-$("#cslCntD_yd_ivr_abnd_call").html());
            $("#cslCntD_tdyd_ivr_ans_rate").html($("#cslCntD_ivr_ans_rate").html()-$("#cslCntD_yd_ivr_ans_rate").html());
             
            $("#cslCntD_tdyd_in_call").html($("#cslCntD_in_call").html()-$("#cslCntD_yd_in_call").html());
            $("#cslCntD_tdyd_ans_call").html($("#cslCntD_ans_call").html()-$("#cslCntD_yd_ans_call").html());
            $("#cslCntD_tdyd_abnd_call").html($("#cslCntD_abnd_call").html()-$("#cslCntD_d_abnd_call").html());
            $("#cslCntD_tdyd_ans_rate").html($("#cslCntD_ans_rate").html()-$("#cslCntD_yd_ans_rate").html());
             
            $("#cslCntD_tdyd_tota_call_tm").html($("#cslCntD_tota_call_tm").html()-$("#cslCntD_yd_tota_call_tm").html());
            $("#cslCntD_tdyd_avrg_call_tm").html($("#cslCntD_avrg_call_tm").html()-$("#cslCntD_yd_avrg_call_tm").html());
             
            $("#cslCntD_tdyd_ob_succ_call").html($("#cslCntD_ob_succ_call").html()-$("#cslCntD_yd_ob_succ_call").html());
            $("#cslCntD_tdyd_cnsl_prsn").html($("#cslCntD_cnsl_prsn").html()-$("#cslCntD_yd_cnsl_prsn").html());
            $("#cslCntD_tdyd_cph").html($("#cslCntD_cph").html()-$("#cslCntD_d_cph").html());
            $("#cslCntD_tdyd_cpd").html($("#cslCntD_cpd").html()-$("#cslCntD_yd_cpd").html());
            $("#cslCntD_tdyd_sec20_succ_call").html($("#cslCntD_sec20_succ_call").html()-$("#cslCntD_yd_sec20_succ_call").html());
            $("#cslCntD_tdyd_sec20_succ_rate").html($("#cslCntD_sec20_succ_rate").html()-$("#cslCntD_yd_sec20_succ_rate").html());
             
            $("#cslCntD_tdyd_scnt").html($("#cslCntD_scnt").html()-$("#cslCntD_yd_scnt").html());
            $("#cslCntD_tdyd_rate").html($("#cslCntD_rate").html()-$("#cslCntD_yd_rate").html());
            $("#cslCntD_tdyd_rcv").html($("#cslCntD_rcv").html()-$("#cslCntD_yd_rcv").html());
            $("#cslCntD_tdyd_act").html($("#cslCntD_act").html()-$("#cslCntD_yd_act").html());
            $("#cslCntD_tdyd_act_rate").html($("#cslCntD_act_rate").html()-$("#cslCntD_yd_act_rate").html());
             
            $("#cslCntD_tdyd_day_ans_call").html($("#cslCntD_day_ans_call").html()-$("#cslCntD_yd_day_ans_call").html());
            $("#cslCntD_tdyd_day_cnsl_prsn").html($("#cslCntD_day_cnsl_prsn").html()-$("#cslCntD_yd_day_cnsl_prsn").html());
            $("#cslCntD_tdyd_day_cpd").html($("#cslCntD_day_cpd").html()-$("#cslCntD_yd_day_cpd").html());
            */
        },
        error : function(data, status, err) {
            networkErrorHandler(data, status, err);
        }
    });
 
}
 
 
 
function setGrid(){
 
gActCdArr = [];
gActNmArr = [];
 
$.ajax({
    type : "post",
    dataType: "json",
    async : false,
    url : getContextPath() + "/ajax/code/actCodeList.do",
    data : "pJson=" + getJsonActCdList(),
    success : function(data) { 
        // param값을 JSON으로 파싱
 
        $.each(data, function(key, state) {
            gActCdArr.push(state.ACT_CD);
            gActNmArr.push(state.ACT_NM); 
        });
    },
    error : function(data, status, err) {
        networkErrorHandler(data, status, err);
    }
}); 
 
gCtgCdArr = [];
gCtgNmArr = [];
 
$.ajax({
    type : "post",
    dataType: "json",
    async : false,
    url : getContextPath() + "/ajax/code/ctgCodeList.do",
    data : "pJson=" + getJsonCtgCdList(),
    success : function(data) { 
        // param값을 JSON으로 파싱 
        $.each(data, function(key, state) {
            gCtgCdArr.push(state.CTG_CD);
            gCtgNmArr.push(state.CTG_NM);
        });
    },
    error : function(data, status, err) {
        networkErrorHandler(data, status, err);
    }
}); 
 
 
// 그리드 설정 정보
gActColNames = [];
gActColModel = [];
gActGroupHeaders = [];
 
//gActGroupHeaders.push({startColumnName: "DAY", numberOfColumns : 2, titleText : "구분"});
gActColNames.push("날짜", "구분");
gActColNames.push("계"); 
gActColModel.push(
        {"name" : "DAY", width : 80, align : "center", sortable : false},
        {"name" : "GB", width : 50, align : "center", sortable : false},
        {"name" : "TOT", width : 60, align : "right", sortable : false}
);
 
for(var i = 0  ; i < gActCdArr.length; i++){ 

	if(gActNmArr[i]=="상담후호전환") gActColNames.push("상담후<br/>호전환");
    else if(gActNmArr[i]=="담당자전환") gActColNames.push("담당자<br/>전환");
    else gActColNames.push(gActNmArr[i]);
    gActColModel.push( 
            {"name" : gActCdArr[i], width : 65, align : "right", sortable : false}
    );
    
}
 
gCtgColNames = [];
gCtgColModel = [];
gCtgGroupHeaders = [];
 
//gCtgGroupHeaders.push({startColumnName: "DAY", numberOfColumns : 2, titleText : "구분"});
gCtgColNames.push("날짜", "구분");
gCtgColNames.push("계"); 
gCtgColModel.push(
        {"name" : "DAY", width : 80, align : "center", sortable : false},
        {"name" : "GB", width : 50, align : "center", sortable : false},
        {"name" : "TOT", width : 60, align : "right", sortable : false}
);
 
for(var i = 0  ; i < gCtgCdArr.length; i++){ 
 
    if(gCtgNmArr[i]=="문화체육관광") gCtgColNames.push("문화체육<br/>관광");
    else gCtgColNames.push(gCtgNmArr[i]);
     
 
    gCtgColModel.push( 
        {"name" : gCtgCdArr[i], width : 75, align : "right", sortable : false}
    );
    }
}
 
//조회 버튼 클릭 이벤트 
function stsDaySearch(){ 
    setStatistics_tbl();
    setGrid();
    grid("Act", getJsonStsCounselingCntDayAct(), gActColNames, gActColModel, gActGroupHeaders);
    grid("Ctg", getJsonStsCounselingCntDayCtg(), gCtgColNames, gCtgColModel, gCtgGroupHeaders);
    
}
 
//그리드 동적으로 만들기 위한 함수
function grid(gb, jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
    if(gb=="Act"){
    	
        $("#cslCntD_dvGridAreaAct").empty();
        var tb = "<table id = 'cslCntD_tblStsCounselingCntDayAct'></table>"; 
        $("#cslCntD_dvGridAreaAct").append(tb);
         
        $("#cslCntD_tblStsCounselingCntDayAct").jqGrid(
        {
            url : getContextPath() + "/ajax/statistics/counselingCntDay.do",
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
            gridview : true,
                hidegrid : false,
                shrinkToFit : false,
                loadonce : false,
                scrollOffset : 0,
                height : "234",
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
                //footerrow  : true,
                //userDataOnFooter : true,
                loadComplete: function() {
                
                    var ids = $("#cslCntD_tblStsCounselingCntDayAct").getDataIDs() ;
            
                     $.each(ids, function(idx, rowId) {
                         var rowData = $("#cslCntD_tblStsCounselingCntDayAct").getRowData(rowId) ;
                         if(rowData.GB =="합계"){
                             $("#cslCntD_tblStsCounselingCntDayAct").setRowData( rowId ,false,{background:"#EAEAEA"});
                         }
             
              
                     }) ;
                     	
    
                 },
       
        }).jqGrid('setGroupHeaders', 
        {
          useColSpanStyle : true, 
          groupHeaders : groupHeadersValue
        }).jqGrid('setFrozenColumns'); 
 
 
}
 
if(gb=="Ctg"){
 
    $("#cslCntD_dvGridAreaCtg").empty();
    var tb = "<table id = 'cslCntD_tblStsCounselingCntDayCtg'></table>"; 
    $("#cslCntD_dvGridAreaCtg").append(tb);
 
    $("#cslCntD_tblStsCounselingCntDayCtg").jqGrid(
    {
        url : getContextPath() + "/ajax/statistics/counselingCntDay.do",
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
            height : "234",
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
            //footerrow  : true,
            //userDataOnFooter : true,
            loadComplete: function() {
            
                var ids = $("#cslCntD_tblStsCounselingCntDayCtg").getDataIDs() ;
                
                $.each(ids, function(idx, rowId) {
                     var rowData = $("#cslCntD_tblStsCounselingCntDayCtg").getRowData(rowId) ;
                     if(rowData.GB =="합계"){
                         $("#cslCntD_tblStsCounselingCntDayCtg").setRowData( rowId ,false,{background:"#EAEAEA"});
                     }
             
              
                }) ;
           
    
             },
       
        }).jqGrid('setGroupHeaders', 
        {
          useColSpanStyle : true, 
          groupHeaders : groupHeadersValue
        }).jqGrid('setFrozenColumns');
         
    }
 
 
}
 
//수정 버튼 클릭 이벤트 
function stsDaySave(){ 
    var tdate = $("#cslCntD_tdate").val();
     
    if (confirm(tdate+" 데이타를 수정 하시겠습니까?") == true){
     
 
        $.ajax({
            type : "post",
            dataType: "json",
            async : false,
            url : getContextPath() + "/ajax/statistics/updateCounselingCntDay.do",
            data : "pJson=" + getStsDaySave(),
            success : function(data)
            {
            alert("수정하였습니다."); 
            },
            error : function(data, status, err) 
            {
                networkErrorHandler(data, status, err);
            }
        });
 
    } 
 
}
 
function getStsDaySave(){
 
    var loParam = {
            "qt" : "dXBkYXRl",
            "mi" : "c3QwMjAudXBkYXRlQ291bnNlbGluZ0NudERheQ==",
            "map" : {
                "key" : "value",
                "task_dt" : $("#cslCntD_tdate").val().replace(/-/g, ""),
                "mngr" : $("#cslCntD_mngr").val(),
                "agt" : $("#cslCntD_agt").val(),
                "day_off" : $("#cslCntD_day_off").val(),
                "etc_prsn" : $("#cslCntD_etc_prsn").val(),
                "tota_prsn" : $("#cslCntD_tota_prsn").val(),
                "fax_snd_scnt" : $("#cslCntD_fax_snd_scnt").val(),
                "task_cont" : $("#cslCntD_task_cont").val(), 
                "entr_st" : $("#cslCntD_entr_st").val()
            }
        };
 
    //console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}
 
 
/* 데이타가져오기 이벤트 */
function stsDayBatch() {
    if($("#cslCntD_schDay").val().trim() == ""){
        alert("데이타가져오기를 위한 조회일자를 입력하세요."); 
        return;
    }else if($("#cslCntD_schDay").val().replace(/-/gi, "").trim() < "20180311"){
        alert("2018년 3월 11일 이후의 데이타만 가져올 수 있습니다."); 
        return;
    }
 
    var jabDate = $("#cslCntD_schDay").val().replace(/-/gi, "");
    var loginID = window.sessionStorage.getItem("USR_ID");
     
 
////////////////////////////////
    if (confirm($("#cslCntD_schDay").val().trim()+" 데이타가 초기화됩니다. 데이타 가져오기를 실행하시겠습니까?") == true){
    $.ajax({
        type : "post",
        dataType: "json",
        async : false,
        url : getContextPath() + "/ajax/statistics/batchCounselingCntDay.do",
        data : "pJson=" + callOrgBatch(jabDate, loginID),  
        success : function(data){
         
            $.ajax({
            type : "post",
            dataType: "json",
            async : false,
            url : getContextPath() + "/ajax/counsel/orgJobDtm.do",
            data : "pJson=" + getJsonOrgJobData(),
            success : function(data){
                alert("배치실행을 " +data.PROC_ST_NM + "하였습니다."+"\n"+"["+data.ERR_MSG+"]" );
                stsDaySearch();
            },
            error : function(data, status, err) { 
                networkErrorHandler(data, status, err);
            }
        }); 
    },
    error : function(data, status, err) {
        alert("배치실행을 완료하지못하였습니다. 재실행하시기 바랍니다."); 
        networkErrorHandler(data, status, err);
    }
}); 
}
//////////////////////////// 
 
}
 
// 데이타가져오기
function callOrgBatch(jabDate, loginID){
    var loParam = {
            "qt" : "c2VsZWN0TGlzdA==",
            "mi" : "b2gwNTAuYmF0Y2hDb3Vuc2VsaW5nQ250RGF5",
            "map" : {
                "key" : "value", 
                "jabDate": jabDate,
                "loginID": loginID,
            }
        };
        console.log(JSON.stringify(loParam));
        return encodeURIComponent(JSON.stringify(loParam));
}
 
function getJsonOrgJobData(){
    var loParam = {
            "qt" : "c2VsZWN0",
            "mi" : "b2gwNTAuam9iRGF0YQ==",
            "map" : {
                "key" : "value",
                "wrk_nm" : "PR_DAILY_COUNSELING"
            }
        };
        console.log(JSON.stringify(loParam));
        return encodeURIComponent(JSON.stringify(loParam));
}
 
// 출력 이벤트 
function sayPrint(){
    window.open("http://" + window.location.hostname + ":8090/ClipReport4/stsCounselingCntDay.jsp?schDt="+$("#cslCntD_tdate").val().replace(/-/g, ""));
}
 
$(document).ready(function(){
 
    var isMngr= false;
    switch(usr_grd_cd) {
      //case '020100'://파트매니저
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
    $("#btnStsDaySave").show();
    $("#btnStsDayBatch").show();
    $("#btnStsDayPrint").show();
}else{
    $("#btnStsDaySave").hide();
    $("#btnStsDayBatch").hide();
    $("#btnStsDayPrint").hide();
}
 
 
$("#cslCntD_schDay").val(getAddDate(getDate(),-1));
datePicker("#cslCntD_schDay");
 
if($("#cslCntD_schDay").val().replace(/-/gi, "").trim() < "20180311"){
 
    $("#btnStsDayBatch").css("display","none");
}else{
    $("#btnStsDayBatch").css("display","inline-block");
}
 
$("#cslCntD_schDay").bind("change",  function () { 
    $( "#cslCntD_schDay" ).datepicker( "option", "maxDate",getAddDate(getDate(),-1));
    $(".ui-datepicker-trigger").css("vertical-align","middle");
     
    if($("#cslCntD_schDay").val().replace(/-/gi, "").trim() < "20180311"){
 
        $("#btnStsDayBatch").css("display","none");
    }else{
        $("#btnStsDayBatch").css("display","inline-block");
    }
});
 
 
$("#cslCntD_tday").html('');
$("#cslCntD_yday").html('');
 
$("#cslCntD_task_cont").val('');
$("#cslCntD_entr_st").val('');
 
// 조회
stsDaySearch();
 
// 엑셀 다운로드 시작------------------------------------------------------------------------------
//엑셀출력
function btnExcelPopup_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/statistics/counselingCntDayList.do",getJsondayReportMonthListExcel());
}

//엑셀다운로드
function getJsondayReportMonthListExcel(){

	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
		    "mi" : "c3QwMjEuc3RzQ291bnNlbGluZ0NudERheUFjdA==",
			"map" : {
				"key" : "value",
				"title" : "처리유형별_상담실적" + setDownLoadName(),
				"tp_cd" : "90014",
	            "schDt" : $("#cslCntD_schDay").val().replace(/-/g, ""), 
	            "gActCdArr" : gActCdArr,
				"colWidth" : [40,40,40,20,40,40,40,40,40,40],
				"colName" : ["DAY","GB","TOT","010000", "030300", "030200","030100","020000","010100","Etc"],
				"colHeader" : ["날짜","구분","계","직접상담","상담후 호전환","담당자 전환","이관민원","통화예약","부서확인","기타"],
				"colAlign" : ["center","center","center","center","center","center","center","center","center","center"]
			}
		};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//엑셀 다운로드 끝------------------------------------------------------------------------------


// 초기화 버튼 클릭 이벤트 등록
$("#cslCntD_btnStsDayInit").bind("click", init);
 
// 조회 버튼 클릭 이벤트 등록
$("#cslCntD_btnStsDaySearch").bind("click", stsDaySearch);
 
// 저장 버튼 클릭 이벤트 등록
$("#cslCntD_btnStsDaySave").bind("click", stsDaySave);
 
// 데이타가져오기 이벤트
$("#cslCntD_btnStsDayBatch").bind("click",stsDayBatch); 
 
// 출력 버튼 클릭 이벤트 등록
//$("#cslCntD_btnStsDayPrint").bind("click",sayPrint); 

//엑셀다운로드 버튼 클릭 이벤트 등록 2020.05.19
$("#cslCntD_btnStsDayPrint").bind("click",btnExcelPopup_clickEvent);

});