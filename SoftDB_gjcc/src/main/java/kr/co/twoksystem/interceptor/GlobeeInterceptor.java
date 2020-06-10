package kr.co.twoksystem.interceptor;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

import egovframework.com.vo.SessionVo;

public class GlobeeInterceptor extends HandlerInterceptorAdapter
{
	private static List<String> noauthUrls;
	{
		noauthUrls = new ArrayList<String>();
		noauthUrls.add("/web/user/login.do");
		noauthUrls.add("/ajax/user/login.do");

		noauthUrls.add("/ajax/main/CommonSetSelectBox.do");  // 공통코드리스트조회	

		noauthUrls.add("/web/civilservice/civilServiceWorkMain.do");  // 공무원업무관련
		noauthUrls.add("/web/civilservice/civilServiceWork.do");
		noauthUrls.add("/web/civilservice/csw");
		noauthUrls.add("/ajax/civilservice/csw");
		noauthUrls.add("/jqgrid/civilservice/csw");
		noauthUrls.add("/excel/civilservice/csw");		
		
		noauthUrls.add("/web/dashboard/index.do"); 
		noauthUrls.add("/ajax/dashboard"); 
		
		noauthUrls.add("/web/magicsso/");	
		noauthUrls.add("/file/");
		
		// 상담DB상세
		noauthUrls.add("/web/main/jisikDetail.do"); 
		noauthUrls.add("/ajax/main/jisikDetail.do");
		noauthUrls.add("/ajax/management/jisikDetail.do");
		noauthUrls.add("/ajax/management/counselDbConfmDetail.do");
		noauthUrls.add("/ajax/management/fileList.do");
		noauthUrls.add("/ajax/main/addInqrCnt.do");
		
	}

//	private static List<String> noauthIPs; {
//		noauthIPs = new ArrayList<String>();
//		noauthIPs.add("127.0.0.1");
//		noauthIPs.add("192.168.0.121");
//		noauthIPs.add("192.168.0.122");
//		noauthIPs.add("192.168.0.123");
//		noauthIPs.add("0:0:0:0:0:0:0:1");
//	}

	private boolean isAuthNeed(HttpServletRequest request)
	{
		for(String url : noauthUrls)
		{
			if(request.getServletPath().startsWith(url))
			{
				return false;
			}
		}
		return true;
	}

//	private boolean isAuthNeedIP(HttpServletRequest request) {
//		for (String ip : noauthIPs) {
//			if (request.getRemoteAddr().startsWith(ip)) {
//				return false;
//			}
//		}
//		return true;
//	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		response.setHeader("cache-control", "no-cache");
		response.setHeader("expires", "0");
		response.setHeader("pragma", "no-cache");

//		if (isAuthNeedIP(request)) {
//			UrlPathHelper urlPathHelper = new UrlPathHelper();
//			String redirectUrl = urlPathHelper.getOriginatingRequestUri(request);
//			if (request.getQueryString() != null) redirectUrl += "?" + request.getQueryString();
//			ModelAndView mv = new ModelAndView("redirect:/web/user/login.do?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
//			throw new ModelAndViewDefiningException(mv) ;
//		}

//		System.out.println(request.getServletPath());
		if(isAuthNeed(request))
		{
			boolean lbError = false;
			SessionVo sessionDto = (SessionVo)request.getSession().getAttribute("sessionDto");

			if(sessionDto == null)
			{
				lbError = true;
			}
			else
			{
				String lsUsr_ip = sessionDto.getLogin_usr_ip();
				String lsCur_ip = request.getRemoteAddr();
				if(!lsCur_ip.equals(lsUsr_ip))
				{
					lbError = true;
				}
			}
			if(lbError)
			{
				UrlPathHelper urlPathHelper = new UrlPathHelper();
				String redirectUrl = urlPathHelper.getOriginatingRequestUri(request);
				if(request.getQueryString() != null)
					redirectUrl += "?" + request.getQueryString();
				ModelAndView mv = new ModelAndView("redirect:/web/user/login.do?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
				throw new ModelAndViewDefiningException(mv);
			}
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object handler, ModelAndView modelAndView) throws Exception
	{
	}

	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception ex) throws Exception
	{
	}
}