package egovframework.com.controller;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IGlobeeService;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.cmm.CommonUtil;

@Controller
@RequestMapping(value="/excel")
public class ExcelController extends GlobeeController
{
    @Autowired
    protected IGlobeeService commomService;
    
    /*
     * 해피콜 결과 엑셀파일 생성
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/campagin/campaginExcelDown.do")
	public ModelAndView serviceCampaginTot(HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		gbLogger.debug("execute kr.go.gimpo.controller.ExcelController.serviceCommon campaginExcelDown RequestMethodMethod Get & Post!!");
		
		Map<String, Object> pMap = new HashMap<String, Object>();
		List<Map<String, Object>> pList = null;
		Map<String, Object> rMap = null;
		
		pMap.putAll(getRequestParams(req));
		
		rMap = commomService.service(pMap);
		pList = (List<Map<String, Object>>)rMap.get("result");
		
		// ModelAndView 생성 뒤 파라미터 셋팅
		ModelAndView mv = new ModelAndView("CampaginExcelDownloadView");
		mv.addObject("cmpgInfo", pList.get(0).get("result"));		// 캠페인 정보
		mv.addObject("qstInfo", pList.get(1).get("result"));	    // 질문 정보
		mv.addObject("shrtQstInfo", pList.get(2).get("result")); 	// 주관식질문 정보
		mv.addObject("cmpgCustInfo", pList.get(3).get("result")); 	// 설문대상자 정보
		mv.addObject("ansInfo", pList.get(4).get("result"));     	// 답변 정보
		
		System.out.println("pMap" + pMap);
		System.out.println("rMap" + rMap);
		System.out.println("pList : " + pList);
		System.out.println("mv : " + mv);
		
		return mv;
	}
    
    /*
     * KPI 상담사 등급평가 결과 엑셀파일 생성
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value="/mprows/mpRowsExcelDown.do")
    public ModelAndView serviceKpiTot(@RequestParam(value="pJson", required=false) String pJson, HttpServletRequest req, HttpServletResponse res) throws Exception
    {
        gbLogger.debug("execute kr.go.gimpo.controller.ExcelController.serviceCommon mpRowsExcelDownload RequestMethodMethod Get & Post!!");
        
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> pMap = new HashMap<String, Object>();
        
        if(StringUtils.isNotEmpty(pJson))
            pMap = objectMapper.readValue(URLDecoder.decode(CommonUtil.nullString(pJson), "UTF-8"), Map.class);

        pMap.putAll(getRequestParams(req));
        pMap.remove("pJson");
        
        Map<String, Object> rMap = commomService.service(pMap);
        List<?> al = (List<?>)rMap.get("result");
        
        // ModelAndView 생성 뒤 파라미터 셋팅
        ModelAndView mv = new ModelAndView("mpRowsExcelDownloadView");
        mv.addObject("param", pMap.get("map"));
        mv.addObject("result", al);
        
        return mv;
    }    

    /*
     * 평가표  결과 엑셀파일 생성
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value="/statistics/monitorScoreExcelDown.do")
    public ModelAndView serviceScoreTable(@RequestParam(value="pJson", required=false) String pJson, HttpServletRequest req, HttpServletResponse res) throws Exception
    {
        gbLogger.debug("execute kr.go.gimpo.controller.ExcelController.serviceCommon mntScoreTableExcelDownload RequestMethodMethod Get & Post!!");    
        
        Map<String, Object> pMap = new HashMap<String, Object>();
        List<Map<String, Object>> pList = null;
        Map<String, Object> rMap = null;
        
        pMap.putAll(getRequestParams(req));
       //pMap.remove("pJson");
        
        rMap = commomService.service(pMap);
        pList = (List<Map<String, Object>>)rMap.get("result");

        // ModelAndView 생성 뒤 파라미터 셋팅
        ModelAndView mv = new ModelAndView("mntScoreTableExcelDownloadView");
        
        mv.addObject("result1", pList.get(0).get("result"));       // 첫번째 데이터 결과 : 평가 정보(평가대상, 평가일자, 민원인 연락처)  
        mv.addObject("param1", pList.get(0).get("map"));          // 첫번째 엑셀 형식
        mv.addObject("result2", pList.get(1).get("result"));       // 두번째 데이터 결과 : 평가결과 정보
        mv.addObject("param2", pList.get(1).get("map"));          // 두번째 엑셀 형식
        
        return mv;
    }   
    
    /*
     * 운영상담현황 엑셀파일 생성
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/statistics/positionConcurrenceList.do")
	public ModelAndView servicepositionConcurrenceTot(@RequestParam(value="pJson", required=false) String pJson, HttpServletRequest req, HttpServletResponse res) throws Exception
	{
    	gbLogger.debug("execute kr.go.gimpo.controller.ExcelController.serviceCommon RequestMethodMethod Get & Post!!");
		
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> pMap = new HashMap<String, Object>();
		
		if(StringUtils.isNotEmpty(pJson))
			pMap = objectMapper.readValue(URLDecoder.decode(CommonUtil.nullString(pJson), "UTF-8"), Map.class);

		pMap.putAll(getRequestParams(req));
		pMap.remove("pJson");
		
		Map<String, Object> rMap = commomService.service(pMap);
		List<?> al = (List<?>)rMap.get("result");
		
		System.out.println("******************************************************************");
		System.out.println("rMap : " + rMap);
		System.out.println("al : " + al);
		System.out.println("******************************************************************");
		// ModelAndView 생성 뒤 파라미터 셋팅
		ModelAndView mv = new ModelAndView("positionConcurrenceExcelDownloadView");
		mv.addObject("param", pMap.get("map"));
		mv.addObject("result", al);
		System.out.println("******************************************************************");
		System.out.println("mv : " + mv);
		System.out.println("******************************************************************");
		return mv;
	}
  
    
    /* 
     * 공통 엑셀파일 생성
     */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/**/*.do")
	public ModelAndView serviceCommon(@RequestParam(value="pJson", required=false) String pJson, HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		gbLogger.debug("execute kr.go.gimpo.controller.ExcelController.serviceCommon RequestMethodMethod Get & Post!!");
		
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> pMap = new HashMap<String, Object>();
		
		if(StringUtils.isNotEmpty(pJson))
			pMap = objectMapper.readValue(URLDecoder.decode(CommonUtil.nullString(pJson), "UTF-8"), Map.class);

		pMap.putAll(getRequestParams(req));
		pMap.remove("pJson");
		
		Map<String, Object> rMap = commomService.service(pMap);
		List<?> al = (List<?>)rMap.get("result");
		
		// ModelAndView 생성 뒤 파라미터 셋팅
		ModelAndView mv = new ModelAndView("ExcelDownloadView");
		mv.addObject("param", pMap.get("map"));
		mv.addObject("result", al);
		return mv;
	}
	
}