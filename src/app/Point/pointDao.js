
// 추천인 아이디 존재하는지 확인
async function getRecommend(connection, code){
    const selectRecommendQuery = `
        SELECT COUNT(*) isExist FROM User WHERE recommendId = ?;
    `

    const result = await connection.query(selectRecommendQuery, code);

    return result[0][0].isExist;
}

module.exports = {
    getRecommend,
}