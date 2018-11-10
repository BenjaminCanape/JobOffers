var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');

router.post('/register', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: 'Mail ou mot de passe non rempli' });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isRecruiter: req.body.isRecruiter,
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                res.json({ success: false, msg: err });
            }
            res.json({ success: true, msg: 'Utilisateur créé' });
        });
    }
});

router.put('/edit/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        User.findById(req.params.id, function(err, user) {
            if (!user) return next(new Error('Utilisateur non trouvé'));
            else {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.isRecruiter = req.body.isRecruiter;

                user.save(function(err) {
                    if (err) console.log('erreur');
                    else {
                        console.log('Utilisateur modifié');
                        res.json({ user: user });
                    }
                });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Non autorisé' });
    }
});

router.put('/edit/:id/password', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        User.findById(req.params.id, function(err, user) {
            if (!user) return new Error('Utilisateur non trouvé');
            else {
                let newPassword = req.body.newPassword;

                user.comparePassword(req.body.currentPassword, function(err, isMatch) {
                    if (isMatch && !err) {
                        user.password = req.body.newPassword;

                        user.save(function(err) {
                            if (err) console.log('erreur');
                            else {
                                console.log('Utilisateur modifié');
                                res.json({ success: true, user: user });
                            }
                        });
                    } else {
                        res.status(401).send({ success: false, msg: 'Le mot de passe actuel n\'est pas correct' });
                    }
                });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Non autorisé' });
    }
});

router.post('/login', function(req, res) {
    User.findOne(
        {
            email: req.body.email,
        },
        function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, msg: 'Utilisateur non trouvé' });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.toJSON(), settings.secret, { expiresIn: '2 days' });
                        // return the information including token as JSON
                        res.json({ success: true, token: 'JWT ' + token, user: user });
                    } else {
                        res.status(401).send({ success: false, msg: 'Mauvais mot de passe' });
                    }
                });
            }
        }
    );
});

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
