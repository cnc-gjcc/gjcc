<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="ko">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>근태이력</title>
		<link rel="icon" href="/resources/images/favicon.ico">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
        
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/user/myUserInfo.js"></script>
        <style>
            .grid-col
            {
                padding-left : 15px !important;
            }
        </style>
        
    </head>
    
    <body>
            
        <!--BODY-->
        <div id="h1">근태현황</div>
        
        <div id="pop_body" style="height:586px;">
            <!--타이틀-->
            <div class="stitle">
            근태현황 검색
            </div><!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search" style="height:28px;">
            <table class="usearch_tbl">
                <tr>
                <th id="m_checks" style="float:left;"><input type="checkbox" id="searchSel">상담사</th>
                      
                      <td id="m_sel" class="sel" style="width: 100px;  margin-bottom: 32px;">
                            <select id = "optSrchType" class="select_al" ></select>
                       </td>
                
                <td id="sel_left" class="sel_left" colspan="2"><!-- <input type="checkbox" id="searchDay"> -->근무 일자
                        <input id="selFrDate" type="text" class="text_ol_half" readonly>&nbsp;~<input id="selToDate" type="text" class="text_ol_half" readonly>
                </td> 
              
                <td id="nemo_30" class="nemo_30">
                    <input name="serviceType" type="radio" value="day" checked>당일&nbsp;&nbsp;
                    <input name="serviceType" type="radio" value="week">1 주일전&nbsp;&nbsp;
                    <input name="serviceType" type="radio" value="month">1 개월전
                </td>
               <!--    <th id="jsearch_lateness" ><input type="checkbox" id="search_latenes">&nbsp;근태 여부</th>
            
                <td class="sel">
                    <select id = "commType" class="select_al" style="width: 120px; margin-right: 10px; margin-bottom: 76px; float: right;"></select>
                </td> -->
             </tr>
             </table>
        </div>
            
            <!--"조회/검색"-->
            <br/><br/><br/>
           <!--근태현황-->
        <!--
           <div class="stitle">검색현황</div>
           <div id="searchmus">
           <div id="search3s_total">전체</div>
           <div id="wOrkingDay">1</div>
           <div id="search3s_total" style="left:376px;">정시출근</div>
           <div id="workedTotal" style="left:496px;">2</div>
           <div id="search3s_total" style="left:736px;">결근</div>
           <div id="absenceTotal" style="left:886px; color:red; border-right:1px solid #c5c5c5;">3</div>
          </div> 
          -->
        
          <!--그리드-->
            <div id="grid_all">
                <div id="code_admin_left" style="width: 100%;">
                      
                    <!--타이틀-->
                    <div class="stitle">
                        근태이력
                    </div>
                    
                    <!-- 그리드테이블 -->
                    <div class="grid_tbl">
                        <div class="info_tbl" style="text-align: right;">
                            <button type="button" id="btnSearch" class="button">조회</button>
                            <button type="button" id="btnInit" class="button">초기화</button>
                        </div>
                        <table style="width:263%; height:200px;">
                            <tr>
                                <td>
                                    <div style="width: 38%">
                                        <table id = "tblGroup"></table>
                                        <div id = "innerGrpPager"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>  <!--"그리드테이블"-->
                
                </div>
            </div><!--"그리드"-->
            <div id="comtable">
                <div id="grid_all">
                    <!-- 버튼 테이블 -->
                    <table class="info_tbl_btn" style="height: 24px;">
                        <tr>                    
                            <td id="divBtn" class="btn" style="display: none;">
                                <button type="button" id="btnDelete"  class="button">삭제</button>
                                <button type="button" id="btnProp"  class="button">수정</button>
                            </td>
                        </tr>
                    </table>
            <!--"버튼 테이블"-->
                </div>
                <table class="profile_tbl">
                    <tr>
                        <td class="line_rt" style="width:5%">근무자</td>
                        <td class="line_b" id="cntr" colspan="5" style="width: 20%"></td>
                        <td class="line_b" style="width:5%"></td>
                        <td class="line_b" colspan="5"></td>
                    </tr>
                    <tr>
                        <td class="line_rt">출근일</td>
                        <td class="line_b" colspan="2" id="wrkDt"></td>
                        <td class="line_c">출근시각</td>
                        <td class="line_b" colspan="2"><input type="text" class="text_ol_80" id="aawTime" name="aawTime" maxlength="8"></td>
                        <td class="line_c">생성자</td>
                        <td class="line_b" id="crtNm" colspan="2"></td>
                        <td class="line_c" style="width:5%">생성일시</td>
                        <td class="line_b" colspan="2" id="crtDtTm"></td>
                    </tr>
                    <tr>
                        <td class="line_rb">근무시간</td>
                        <td class="line_wb" id="totalTime" colspan="2"></td>
                        <td class="line_rb2">퇴근시각</td>
                        <td class="line_wb" colspan="2"><input type="text" class="text_ol_80" id="lvofTime" name="lvofTime" maxlength="8"></td>
                        <td class="line_rb2">수정자</td>
                        <td class="line_wb" id="modNm" colspan="2"></td>
                        <td class="line_rb2">수정일시</td>
                        <td class="line_wb" colspan="2" id="modDtTm"></td>
                    </tr>
                </table>
                <input type ="hidden" id="deleteUsr"/>
            </div>
            

        
        </div><!--"BODY"-->
    </body>
</html>