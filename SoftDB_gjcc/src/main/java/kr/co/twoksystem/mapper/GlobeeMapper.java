package kr.co.twoksystem.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("globeeMapper")
public class GlobeeMapper implements IGlobeeMapper
{
	private Logger logger = LoggerFactory.getLogger(getClass());
	private SqlSessionTemplate mSqlSession = null;
	private SqlSessionTemplate mSqlSessionSecond = null;
	private String secondDb;
	//private SqlSessionTemplate mSqlSessionThird = null;
	//private String thirdDb;

	public void setSqlSession(SqlSessionTemplate sqlSession)
	{
		mSqlSession = sqlSession;
	}
	
	// 지방세 시스템 연계
	public void setSqlSessionSecond(SqlSessionTemplate sqlSession)
	{
		mSqlSessionSecond = sqlSession;
	}

	public void setSecondDb(String secondDb)
	{
		this.secondDb = secondDb;
	}
/*
	public void setSqlSessionThird(SqlSessionTemplate sqlSession)
	{
		mSqlSessionThird = sqlSession;
	}

	public void setThirdDb(String thirdDb)
	{
		this.thirdDb = thirdDb;
	}
*/
	public List<HashMap<String, Object>> selectList(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("SelectList By Search Value :{}", "GlobeeMapper.selectList");

		
//		if(mapperId.indexOf(thirdDb) != -1)
//			return mSqlSessionThird.selectList(mapperId, pMap);
//		else
		if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.selectList(mapperId, pMap);
		} else {
			return mSqlSession.selectList(mapperId, pMap);
		}
	}

	public List<HashMap<String, Object>> selectList(String mapperId, String codeType) throws Exception
	{
		logger.debug("SelectList By Code Value :{}", "GlobeeMapper.selectList");
		Map<String, Object> pMap = new HashMap<String, Object>();
		pMap.put("codeTy", codeType);
		return selectList(mapperId, pMap);
	}

	public int selectListCount(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("SelectCount By Search Value :{}", "GlobeeMapper.selectCount");

//		if(mapperId.indexOf(thirdDb) != -1)
//			return mSqlSessionThird.selectOne(mapperId, pMap);
//		else
		if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.selectOne(mapperId, pMap);
		} else {
			return mSqlSession.selectOne(mapperId, pMap);
		}
	}

	public Map<String, Object> selectOne(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Select By ID :{}", "GlobeeMapper.select");

//		if(mapperId.indexOf(thirdDb) != -1)
//			return mSqlSessionThird.selectOne(mapperId, pMap);
//		else
		if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.selectOne(mapperId, pMap);
		} else {
			return mSqlSession.selectOne(mapperId, pMap);
		}
	}

	public Map<String, Object> service(Map<String, Object> pMap) throws Exception
	{
		Map<String, Object> rMap = new HashMap<String, Object>();
		logger.debug("Service By Request :{}", "GlobeeMapper.service");
		return rMap;
	}

	public int insert(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Insert By parameter Map :{}", "GlobeeMapper.insert");

//		if(mapperId.indexOf(thirdDb) != -1)
//			return mSqlSessionThird.insert(mapperId, pMap);
//		else
		if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.insert(mapperId, pMap);
		} else {
			return mSqlSession.insert(mapperId, pMap);
		}
	}

	public int update(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Update By parameter Map :{}", "GlobeeMapper.update");

//		if(mapperId.indexOf(thirdDb) != -1)
//			return mSqlSessionThird.update(mapperId, pMap);
//		else
		if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.update(mapperId, pMap);
		} else {
			return mSqlSession.update(mapperId, pMap);
		}
	}

	public int delete(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Delete By parameter Map :{}", "GlobeeMapper.delete");

//		if(mapperId.indexOf(thirdDb) != -1)
//			return mSqlSessionThird.delete(mapperId, pMap);
//		else
		if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.delete(mapperId, pMap);
		} else {
			return mSqlSession.delete(mapperId, pMap);
		}
	}
}