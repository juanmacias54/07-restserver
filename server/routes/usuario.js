const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore')
const Usuario = require('../models/usuario');


app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Usuario.find(  {google: true}  )
    Usuario.find(  {} ,'name email role google imd' )
        .skip(desde)
        .limit(limite)
        .exec(((err, usuarios) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Usuario.count( {google: true},(err, conteo)=>{
            Usuario.countDocuments( {},(err, conteo)=>{

                res.json({
                    ok: true,
                    usuarios,
                    conteo
            })

            });

        }))
});

app.post('/usuario', function (req, res) {
    let body = req.body;
    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password,10),
        role: body.role
    });
    usuario.save((err,usuarioDB)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = _.pick(req.body,['name', 'email', 'img', 'role', 'estado'] );

    Usuario.findByIdAndUpdate(id, body, {new: true},(err, usuarioDB) =>{

        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })


});

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let cambiaEstado= {
        estado: false,
    };


  Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true},(err, usuarioBorrado) =>{

  //Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

      if(err){
          res.status(400).json({
              ok: false,
              err
          })
      }
      if(!usuarioBorrado){
          res.status(400).json({
              ok: false,
              err:{message: 'usuario borrado'}
          })
      }
      res.json({
          ok: true,
          usuario: usuarioBorrado
      })

  })
});

module.exports = app;