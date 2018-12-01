var express = require('express');
var router = express.Router();
var movilesModelo = require('../models/Moviles');

router.get('/', function (req, res) {
    debug('Obteniendo todos las aplicaciones');
    movilesModelo.find({}, function (err, aplicaciones) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                err
            });
        } else {
            res.json(aplicaciones);
        }
    });
});

router.get('/:id', function (req, res) {
    if (req.params.id) {
        movilesModelo.findOne({
            _id: req.params.id
        }, function (err, materia) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    err
                });
            }
            else {
                res.status(400);
                res.json({
                    status: 400,
                    err: 'Se cago algo:v'
                })
            }
        });
    }
});

router.post('/',function(req,res){
    let aplicaciones= new movilesModelo({
        nombre:req.body.nombre,
        publicador: req.body.publicador,
        fechaPublicacion: req.body.fechaPublicacion
    })
    aplicaciones.save(function(err){
        if(err){
            res.status(500)
            res.send({
                err
            });
        }
    });
});
router.delete('/:id',function(req,res){
    if(req.params.id){
        movilesModelo.findByIdAndRemove(req.params.id,function(err,aplicaciones){
            if(err){
                res.status(500);
                res.json({
                    status:500,
                    success:false,
                    err
                });
            }
            else{
                res.json({
                    status:400,
                    success:false
                });
            }

        });
    }
});