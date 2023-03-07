// 추천인 아이디 존재하는지 확인
async function getRecommend(connection, code){
    const selectRecommendQuery = `
        SELECT COUNT(*) isExist FROM User WHERE recommendId = ?;
    `

    const result = await connection.query(selectRecommendQuery, code);

    return result[0][0].isExist;
}

// 포인트 정보 삽입
async function recommendPointInsert(connection, pointCode){
    const insertPointQuery = `
        INSERT INTO Point (amount, content, code, used) VALUES (3000, '친구초대', ?, 1);
    `
    const insertPointRes = await connection.query(insertPointQuery, pointCode);

    return insertPointRes[0].affectedRows;
}

//추천인 코드로 유저 아이디 찾기
async function findUserIdByCode(connection, code){
    const selectUserIdQuery = `
        SELECT id FROM User WHERE recommendID = ?;
    `

    const [selectUserIdRes]= await connection.query(selectUserIdQuery, code);

    return selectUserIdRes[0].id;
}

// 포인트 정보 삽입
async function insertPointUser(connection, userId, pointCode){
    const insertPointQuery = `
    INSERT INTO PointUser (userId, code) VALUES(?, ?);
    `

    const insertPointReq = await connection.query(insertPointQuery, [userId, pointCode, 1]);

    return insertPointReq[0].affectedRows;
}

module.exports = {
    getRecommend,
    recommendPointInsert,
    findUserIdByCode,
    insertPointUser
}