const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (request, response, next)=>{
    const newUser = {
        name:request.body.name,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password)
    }

    User.create(newUser,(err, user)=>{
        if(err && err.code == 11000) return response.status(409).send('Email ya existe');
        if(err) return response.status(500).send('server error');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: user.id},
            SECRET_KEY, {
                expiresIn: expiresIn
            });
            const dataUser ={
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn:expiresIn
            }
            //response
            response.send({dataUser});
    });
}

exports.loginUser = (req, res, next )=>{
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({email: userData.email}, (err, user)=>{
        if(err) return res.status(500).send('server error');
        if(!user){
            res.status(409).send({message: 'datos erroneos'});
        }else{
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if(resultPassword){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id},SECRET_KEY, {expiresIn: expiresIn});
                const dataUser ={
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn:expiresIn
                }
                res.send({dataUser});
            }else{
                res.status(409).send({message: 'datos erroneos'});
            }
        }
    });
}