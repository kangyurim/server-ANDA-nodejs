
async function searchHospital(connection, hospitalName){
    const searchQuery = `
        SELECT id, name, townName, address, xCoordi, yCoordi
        FROM Ophthalmology
        WHERE name LIKE '%${hospitalName}%' AND cityName = '서울'
    `

    const [result] = await connection.query(searchQuery);

    return result;
}

module.exports = {
    searchHospital,
}