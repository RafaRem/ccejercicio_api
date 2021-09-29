var dbAdmin = require('../dbAdmin');

let dataModel = {};

dataModel.getAllProspectos = (callback) => {
    if (dbAdmin) {
        dbAdmin.query("SELECT * FROM prospecto ", (err, rows) => {
            if (err) {
               throw err;
            }
            else {
                callback(null, rows);
            }
        });
    }
};

dataModel.getProspectoByID = (id_pros, callback) => {
    
    if (dbAdmin) {
        dbAdmin.query(`SELECT * FROM prospecto WHERE id = ?`, [id_pros], function(err, row) {
            if (err) {
                throw err;
            }
            else {
                rfc = row[0].rfc
              
                dbAdmin.query(`SELECT * FROM documentos WHERE rfc = ?`, [rfc], function(derr, drow) {
                    if (derr) {
                        throw derr;
                    }
                    else {
                        row[0].documentos = drow
                       
                        callback(null, row);
                    }
                });
                
            }
        });
    }
};

dataModel.insertProspecto = (prospectoData, callback) => {
    if (dbAdmin){
        dbAdmin.query(`INSERT INTO prospecto SET ? `, prospectoData, (error, rows) => {
            if (error) {

                console.log(error);
                throw error;
            } else {                  
                callback(null, rows);
            }
        });
    }
}


dataModel.updateProspecto = (data, callback) =>{
    
    if (dbAdmin){
        const sql = `UPDATE prospecto SET 
                estado = '${data.estado}',
                observacion ='${data.observacion}'
                WHERE rfc = '${data.rfc}'`;
        dbAdmin.query(sql, function (error, rows){
            if (error) {
                console.log(error);
                //callback(null,err.message)
            } else {
                callback(null, rows);

            }
        });
    }
};

dataModel.upload = (data, callback) => {
    if (dbAdmin){
        dbAdmin.query(`INSERT INTO documentos SET ? `, data, (error, rows) => {
            if (error) {
                console.log(error);
                throw error;
            } else {                  
                callback(null, rows);
            }
        });
    }
};

module.exports = dataModel;