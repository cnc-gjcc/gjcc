package egovframework.com.controller;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IGlobeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.vo.SessionVo;

@Controller
@RequestMapping(value = "/ajax")
public class AjaxController extends GlobeeController
{
	@Autowired
	protected IGlobeeService commomService;

	private void setSessionDto(HttpServletRequest req, Map<String, Object> pMap)
	{
		SessionVo sessionDto = new SessionVo();
		sessionDto.setLogin_usr_id((String)pMap.get("USR_ID"));
		sessionDto.setLogin_usr_nm((String)pMap.get("USR_NM"));
		sessionDto.setLogin_usr_ip(req.getRemoteAddr());
		req.getSession().setAttribute("sessionDto", sessionDto);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/**/*.do")
	public void serviceCommon(HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		gbLogger.debug("execute kr.go.gimpo.controller.AjaxController.serviceCommon RequestMethodMethod Get & Post!!");

		Map<String, Object> pMap = getRequestParams(req);
		
		if (pMap == null) {
			gbLogger.debug("==================================================================================================");
			gbLogger.debug(req.getRequestURL().toString());
			gbLogger.debug("pMap is null");
			gbLogger.debug("==================================================================================================");
			return ;
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		if (commomService == null) {
			gbLogger.debug("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★commomService is null!!!");
			gbLogger.debug(req.getRequestURL().toString());
			return;
		}
		
		Map<String, Object> rMap = commomService.service(pMap);
		
		String lsMappingPath = getViewPath(req.getServletPath(), "/ajax", ".do");
		
		if("user/login".equals(lsMappingPath))
		{
			Map<String, Object> map = (Map<String, Object>)rMap.get("result");
			
			if("200".equals(map.get("LOGIN_CODE")))
			{
				((Map<String, Object>)rMap.get("result")).put("IPADDR", req.getRemoteAddr());
				setSessionDto(req, map);
			}
		}
		
		res.setContentType("text/html");
		res.setCharacterEncoding("utf-8");
		
		try(PrintWriter pw = res.getWriter())
		{
			pw.print(objectMapper.writeValueAsString(rMap.get("result")));
			pw.flush();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}