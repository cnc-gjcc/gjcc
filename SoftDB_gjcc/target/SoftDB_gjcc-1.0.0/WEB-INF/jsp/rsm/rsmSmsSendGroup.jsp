<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8>
<title>SMS 발송이력</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/popup.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/tab.css" />
		
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery.gbTabs.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsm/rsmSmsSendGroup.js"></script>
</head>

<body>
  <div id="h1">SMS 발송이력</div>

	<div id="pop_body" style="height: 615px;">

	    <ul id="tabs1">
	        <li data-tab="sect1">SMS 발송이력</li>
	        <li data-tab="sect2">SMS 수신그룹</li>
	    </ul>
	
	    <div id="ctnt1">
		    <!-- SMS 발송이력 시작  -->
        <div data-tab="sect1">

          <!--"조회/검색"-->
          <div id="search">
              <table class="search_tbl">
                  <tr>
                  	<th>발송일자</th>
										<td width="30%" style="text-align: left;">
											<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate" maxlength="16">
											 ~
											<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate" maxlength="16">		
			  						</td>
                    <th>발송구분</th>
                 	  <td class="sel">
                  	 	<select class="select_al" id="sendGubun">
                   	  </select>
               	    </td>
	    					    <th>발송여부</th>
                    <td class="sel">
                       <select class="select_al" id="smsKind">
                       </select>
                    </td>
                    <td class="btn">
                      <button type="button" id="btnSearch_1"  class="button">조회</button>
                      <button type="button" id="btnReset_1"  class="button">초기화</button>
                    </td> 
                  </tr>
              </table>
          </div>
          <!--"조회/검색"-->

          <!--타이틀-->
          <div class="stitle">SMS 발송이력</div>
          <!--"타이틀"-->
          <!--그리드-->
          <div class="grid_all">
              <!-- 미사용/버튼 테이블 -->
              <table class="info_tbl">
              </table>
				      <!--"미사용/버튼 테이블"-->
              <!-- 그리드테이블 -->
              <div class="grid_tbl">
                  <table id="tblSendHistory"></table>
                  <div id="pgSendHistory"></div>
              </div>
              <!--"그리드테이블"-->
          </div>
          <!--"그리드"-->

        </div>
		    <!-- "SMS 발송이력 종료" -->

			
        <!-- 캠페인 진행률 시작  -->
        <div data-tab="sect2">
          
          <!-- 조회/검색 -->
          <div id="search">
              <table class="search_tbl">
                  <tr>
                    <th>수신그룹</th>
                    <td class="sel">
                      <select class="select_al" id="smsGroupId">
                      </select>
                    </td>
		                <th>수신자</th>
		            	  <td class="sel">
		             	  	<select class="select_al" id="smsTargetId">
		              	  </select>
		          	   	</td>
                    <td class="btn">
                      <button type="button" id="btnSearch_2"  class="button">조회</button>
                      <button type="button" id="btnReset_2"  class="button">초기화</button>
                      <!-- 
                      <button type="button" id="btnInsert_2"  class="button">추가</button>
                      <button type="button" id="btnUpdate_2"  class="button">저장</button>
                      <button type="button" id="btnDelete_2"  class="button">삭제</button>
                       -->
                   	</td> 
                  </tr>
              </table>
          </div>
          <!-- 조회/검색 -->   
          
          <!--타이틀-->
          <div class="stitle">SMS 수신그룹</div>
          <!--"타이틀"-->          
          
					<!--그리드-->
					<div id="grid_all">
					
						<div>
							<!-- 그리드테이블 -->
						   <div class="grid_all">
			         	<!-- 미사용/버튼 테이블 -->
			         	<table class="info_tbl">
			          </table>
								<!--"미사용/버튼 테이블"-->
								
			          <!-- 그리드테이블 -->
			          <div class="grid_tbl">
			            <table id="tblRcvGroup"></table>
			            <div id="pgRcvGroup"></div>
			          </div>
			          <!--"그리드테이블"-->
			          
		           </div>
						</div>
					</div><!--"그리드"-->
	        
			   <div class="grid_all" style="width:100%; height:36px; float:right;">
			      <!-- 버튼 테이블 -->
			      <table class="info_tbl_btn">
			        <tr>
			          <td>
			           <button type="button" id="btnInsert"  class="button">추가</button>
			           <button type="button" id="btnUpdate"  class="button">수정</button>
			           <button type="button" id="btnInit"  class="button">초기화</button>
			           <button type="button" id="btnDelete"  class="button">삭제</button>          
			          </td>
			        </tr>
			      </table>  
			      <!-- "버튼 테이블" -->
			    </div>
			   
			    <div id="ctnt2_1">  
          <!-- 시스템 기본정보 시작 -->
        
	          <!-- 기본정보 테이블 -->
	          <input type="hidden" id="groupCd">
	          <table class="profile_tbl">
	  
	            <tr>
	              <td class="line_rt">수신그룹</td>
	              <td class="line_b">
                  <select class="select_al" id="groupId">
                  </select>
	              </td>
	              <td class="line_c">수신자</td>
	              <td class="line_b">
	                <select class="select_al" id="targetId">
	                </select>
	              </td>  
	            </tr>
	            <tr>
	              <td class="line_rt">수신자ID</td>
	              <td class="line_b"><input type="text" class="text_ol" id="targetCd" readonly></td>
	              <td class="line_c">휴대폰</td>
	              <td class="line_b"><input type="text" class="text_ol" id="phoneNo" readonly></td>               
	            </tr>
	            <tr>
	              <td class="line_rt">담당업무</td>
	              <td class="line_b"><input type="text" class="text_ol" id="jobTitle" readonly></td>
	              <td class="line_c">소속</td>
	              <td class="line_b"><input type="text" class="text_ol" id="dpetNm" readonly></td>
	            </tr>
              <tr>
                <td class="line_rt">발신구분</td>
                <td class="line_b" colspan="3">            
                  <input type="checkbox" class="checkbox" id="sendGbNm" value="0" >발신구분 &nbsp;
                </td>
              </tr>	            
	            <tr>
	              <td class="line_rt">SMS 상세구분</td>
	              <td class="line_b" colspan="3">            
	                <input type="checkbox" class="checkbox" id="moni_Ping" value="1" >Ping &nbsp;
	                <input type="checkbox" class="checkbox" id="moni_Presur" value="1" >Resource &nbsp;
	                <input type="checkbox" class="checkbox" id="moni_Proc" value="1" >Process &nbsp;
	                <input type="checkbox" class="checkbox" id="moni_Call" value="1" >Call &nbsp;
	                <input type="checkbox" class="checkbox" id="moni_Event" value="1" >Event &nbsp;
	              </td>
	            </tr>
	          </table><!-- 기본정보 테이블 -->            
        
          <!-- 시스템 기본정보 종료  -->
          </div>   	        
	        
			</div> 
	 <!--  캠페인 진행률 종료  -->			
			
		</div>  <!-- ctnt1 -->
    
	</div> <!-- pop_body -->

</body>
</html>