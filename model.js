const { pgPool } = require('../../config/db.config');

module.exports .fetchAll = async ()=>{
    return pgPool.query(` SELECT id,name, email, phone FROM  crudDB ORDER BY id ; `);
}

// module.exports.createTask = (data) => {
//     console.log("Big DATA is>>>>>", data);
//     const sql = {
//         text : ' INSERT INTO cruddb (name, email, phone) VALUES ($1, $2, $3) RETURNING id ' ,
//         values : [data]
//     }

//     console.log('SQL object :',  sql.text);
//     console.log('Row Id :', sql.values[0]);
//     return pgPool.query(sql.text);
// }

module.exports.createTask = (data) => {
    console.log("Big DATA is>>>>>", data);

    // Destructure the properties from the data object
    const { name, email, phone } = data;

    const sql = {
        text: 'INSERT INTO crudDB (name, email, phone) VALUES ($1, $2, $3) RETURNING id',
        values: [name, email, phone]
    }

    console.log('SQL object:', sql.text);
    console.log('Row Id:', sql.values);

    return pgPool.query(sql.text, sql.values);
}


module.exports.delete = (taskId) => {
    return new Promise((resolve, reject) => {
        pgPool.query('DELETE FROM crudDB WHERE id = $1', [taskId], (err, result) => {
            if (err) {
                console.error('Error in delete task model:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


module.exports.update = (taskId, updatedName, updatedEmail, updatedPhone, updatedDob) => {
    return new Promise((resolve, reject) => {
        const sql = {
            text: 'UPDATE crudDB SET name = $2, email = $3, phone = $4  WHERE id = $1',
            values: [taskId, updatedName, updatedEmail, updatedPhone]
        };

        pgPool.query(sql.text, sql.values, (err, result) => {
            if (err) {
                console.error('Error in update task model:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
