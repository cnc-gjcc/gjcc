<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/main/cnsSmsMain.js'/>"></script>
<!-- 조회/검색 -->
<div id="search">
	<table summary="문자상담검색" class="search_tbl">
		<tr>
		
			<th scope="row" style="width: 7%;">접수일자</th>			
			<td style="width: 27%;">
				<input type="text" class="text_Date" id="tfCnsSrchDate" alt="시작날짜" title="시작날짜"/>
				<span>~</span>
				<input type="text" class="text_Date" id="tfCnsSrchDateEn" alt="종료날짜" title="종료날짜" />
			</td>
			
			<th scope="row" style="width: 5%;">상담사</th>
			<td style="width: 10%;">
				<select class="select_bl" id="selCnsSrchUsr" style="width: 100px;" title="상담사"></select>
			</td>
			
			<th scope="row" style="width: 7%;">처리상태</th>	
			<td style="width: 8%;">
				<select class="select_al" id="selCnsSrchActStCd" title="처리상태"></select>
			</td>
						
			<th scope="row" style="width: 8%;">						
				<select class="select_al" id="selCnsSrchtype" title="검색종류">
					<option value="srchTel">전화번호</option>
					<option value="srchMsg">문의내용</option>								
				</select>								
			</th>	
			<td>
				<input type="text" class="text_ol" id="tfCnsSrchText" style="height: 18px; margin-bottom: 2px;" alt="검색어" title="검색어">				
			</td>
			
			<td class="btn">
				<button type="button" id="btnCnsSmsSearch" class="button">조회</button>
				<button type="button" id="btnCnsSmsExcel" class="button">엑셀저장</button>
			</td>
		</tr>
	</table>
</div>
<!--"조회/검색"-->


<br />
<!-- SMS 발신 시작 -->
<div>
	<div id="grid_all">
		<!-- 그리드테이블 -->
		<table style="width: 100%; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="tblCnsSmsList"></table>
					<div id="pagingCnsSmsList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
	</div>
	<div style="background: #e6ebf6; padding: 0px 6px; border: 1px solid #dddddd; border-radius: 5px;">
		<!-- 버튼 테이블 -->
		<table class="info_tbl_btn">
			<tr>
				
				<td>					
					<button type="button" id="btnCnsSmsSend" class="button">전송</button>					
					<button type="button" id="btnCnsSmsInit" class="button">초기화</button>
				</td>
			</tr>
		</table>
		<!--"버튼 테이블"-->
		<!-- SMS 정보테이블 -->
		<form id="cnsSmsSendForm" name="cnsSmsSendForm" action="/ajax/counsel/smsSendForm.do" method="post">
		<table summary="SMS정보" class="profile_tbl">
			<colgroup>
								<col width="8%"/>
								<col width="30%"/>
								
								
								<col width="8%"/>
								<col width="26%"/>
								<col width="8%"/>
								<col width="20%"/>
			</colgroup>
			<tbody>
				<tr>
					<th scope="row" class="line_thb" colspan="2">문의내용</th>
					
					<td class="line_thlb" colspan="4">	
						답변내용(<label id="labActCountTxt">0</label> byte) 						 
						<input type="radio" class="radio" name="rdSmsType" id="rdSmsType_s" value="s" disabled="disabled" alt="SMS"><label for="rdSmsType_s">SMS</label>
						<input type="radio" class="radio" name="rdSmsType" id="rdSmsType_m" value="m" disabled="disabled" alt="MMS"><label for="rdSmsType_m">MMS</label>						
					</td>					
				</tr>
				
				<tr>
					<td class="line_b"  colspan="2">
						<textarea style="width:100%; height:95%" rows="7" id="cnsSmsRcvCont"  disabled="disabled" title="문의내용"></textarea>
					</td>
					
					<td class="line_lb" colspan="4" >
						<textarea style="width:100%;" rows="5" id="cnsSmsActCont" title="답변내용"></textarea>
						<label id="actContFooter"></label>
					</td>
				</tr>


				<tr>	
				<th scope="row" class="line_thb">첨부파일</th>
					<td class="line_b">
					         	<table id="cnsSmsFileInfo" style="margin-left: 1px; margin-right: 6px;">									
								</table>
					</td>							
					<th scope="row" class="line_c">이미지첨부</th>
					<td class="line_b" colspan="3">
								<input type="hidden" name="actImgFlId" id='actImgFlId' value="" />
								<table id="cnsSmsSendFileInfo" style="margin-left: 1px; margin-right: 6px;">
									<tr>
										<td style="width: 30%;">
											<input type="hidden" name="record_XXX" value="" alt="파일ID" title="파일ID" />
											<input type="file" id="tfCnsSmsImg" name="tfCnsSmsImg" class="file_board" style="width: 100%;" alt="첨부파일" title="첨부파일" />
										</td>
										<td style="width: 20%">
											<img src="/resources/images/btn_cancel.png" id="btnCnsSmsImgCancle" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
										</td>
									</tr>
								</table>
					</td>
				</tr>

								
				<tr>
					<th scope="row" class="line_thb">수신번호</th>
					<td class="line_b" >
						<label id="labCnsSmsRcvNum"></label>
						<input type="hidden" name="chSndid" id='chSndid' value="" alt="수신번호" title="수신번호" />
					</td>
																	
					<th scope="row" class="line_c">요청일시</th>
					<td class="line_b" ><label id="labCnsSmsReqDtm"></label> <label id="labCnsSmsReqUserNm"></label></td>
					<th scope="row" class="line_c">전송결과</th>
					<td class="line_b"><label id="labCnsSmsSendState"></label></td>	
				</tr>
				
				<tr>
					<th scope="row" class="line_thb">접수일시</th>
					<td class="line_b" ><label id="labCnsSmsRcvDtm"></label></td>	
					
					<th scope="row" class="line_c">전송일시</th>
					<td class="line_b" ><label id="labCnsSmsSendDtm"></label></td>		
					<th scope="row" class="line_c">처리결과</th>
					<td class="line_b">
						<label id="labCnsSmsResult"></label>
						<button type="button" id="btnRcvActStEnd" class="button">강제종료</button>	
					</td>
				</tr>
						     		     				
			</tbody>
		</table>
		</form>
		<!-- SMS 정보테이블 -->
		<div class="text_red">*80byte가 넘어가면 MMS로 발송됩니다. (이미지첨부: 300Kbyte 미만 jpg 파일만 가능)</div>
	</div>
	<!-- SMS 발신 종료  -->
</div>