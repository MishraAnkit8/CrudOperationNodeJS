const { pgPool } = require('../../config/db.config');
console.log('here we are retriving data from data base')
async function retrieveData() {
    try {
        const queryText = 'SELECT * FROM cruddb';
        const {rows}  =  await pgPool.query(queryText);
        console.log(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

retrieveData();

module.exports = {
    retrieveData

}
