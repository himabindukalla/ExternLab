const fileServices = require('../services/services');
const express = require('express');
const router = new express.Router({ mergeParams: true });
const { isAuthenticated } = require('../middleware/auth');

router.get('/download', isAuthenticated, (req, res) => {
    let options = {
        uid: req.query.uid,
        fileId: req.query.fileId
    }
    console.log("options", options);
    fileServices.downloadTheFile(options).then(details => {
        res.status(details.status || 200).json(details.response)
    })
        .catch(err => {
            return res.status(err.status).send({
                status: err.status,
                error: err.response
            });
        });
});

router.post('/upload', (req, res) => {
    let options = {
        fileDetails: req.body //Pass the login credentials
    }
    // console.log("options", options);
    fileServices.upload(options).then(details => {
        res.status(details.status || 200).json(details.response)
    })
        .catch(err => {
            return res.status(err.status).send({
                status: err.status,
                error: err.response
            });
        });
});

module.exports = router;