const prospecto = require('../models/prospecto');
const filUpload = require('express-fileupload')
module.exports = function (app) {
    app.use(filUpload())
    app.get('/prospecto', (req, res) => {
        var id_pros = req.body.id;
        prospecto.getProspectoByID(id_pros, (err, data) => {
            res.json({prospecto: data});
        });
    });

    app.get('/prospectos', (req, res) => {
        
        prospecto.getAllProspectos((err, data) => {
            res.json(data);
        });
    });

    app.get('/prospecto/:id', (req, res) => {
        var id_pros = req.params.id;
        prospecto.getProspectoByID(id_pros, (err, data) => {
            res.json(data);
        });
    });

    app.post('/nuevo/prospecto', (req, res) => {
        const prospectoData = {
            nombre: req.body.nombre,
            apaterno:  req.body.apaterno,
            amaterno:   req.body.amaterno,
            calle:   req.body.calle,
            numero:   req.body.numero,
            colonia: req.body.colonia,
            codigopostal:  req.body.codigopostal,
            telefono:   req.body.telefono,
            rfc: req.body.rfc,
            estado: req.body.estado
        };
        prospecto.insertProspecto(prospectoData, (err, data) => {
            if (err){
                res.json({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    message: "¡Registro exitoso!"
                });
            }
        });
    });

    app.post('/editar/prospecto', (req, res) => {
       
        const prospectoData = {
            rfc : req.body.rfc,
            estado : req.body.estado,
            observacion: req.body.observacion,
        };
        prospecto.updateProspecto(prospectoData, (err, data) => {
            if (err){
                res.json({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    message: "¡Se Guardaron los cambios exitosamente!"
                });
            }
        });
    });
    

    app.post('/upload',(req,res) => {
        let EDFile = req.files.file
        let nombre = req.body.namedoc;
        let rfc = req.body.rfc;
        EDFile.name = rfc+"_"+EDFile.name;
       
        EDFile.mv(`./files/${EDFile.name}`,err => {
            if(err) return res.status(500).send({ message : err })
            data={
                'ruta':EDFile.name,
                'nombre':nombre,
                'rfc': rfc
            }
            prospecto.upload(data,(err, data) => {
                return res.status(200).send({ message : 'File upload' })
            });
            
        })
    })

}