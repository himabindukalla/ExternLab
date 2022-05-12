const users = require('../data/userData.json');
const files = require('../data/fileData.json');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');

module.exports.downloadTheFile = (options) => {
    //TODO: Get All Users
    // Return promise
    return new Promise(async (resolve, reject) => {
        // Error handler
        try {
            // Get user input
            const uid = options.uid;
            const fileId = options.fileId;

            // Validate user input
            if (!(uid)) {
                reject({ status: 400, message: "No user data available" });
            }

            if (!(fileId)) {
                reject({ status: 400, message: "File does not exist" });
            }

            // Validate if user exists or not
            var userIndex = users.findIndex((obj) => {
                return obj.uid === uid
            });

            // Validate if file exists or not
            var fileIndex = files.findIndex((obj) => {
                return obj.fileId === fileId
            });

            if (userIndex !== -1 && fileIndex !== -1) {
                var file = files[fileIndex];
                var fileUrl = file.url;
                var path = "f:/Personal/ExternLab/dataStorage";

                const dl = new DownloaderHelper(fileUrl, path);

                dl.on('end', () => console.log('Download Completed'))
                dl.start();
                resolve({ status: 200, message: 'downloaded successfully', response: { file } })

            }
            else
                reject({ status: 400, message: "Invalid credentials" });
        }
        catch (err) {
            reject({ status: 500, response: `Internal server error ${err.message}` });
        }
    })
}

module.exports.upload = (options) => {
    //TODO: user login
    // Return promise
    return new Promise(async (resolve, reject) => {
        // Error handler
        try {
            // Get user input
            const { fileName, fileUrl, uid } = options.fileDetails;
            var file = {};
            console.log('options', options);

            // Validate file input
            if (!(fileUrl)) {
                resolve({ status: 400, message: "File URL is required" });
            }

            if (!(uid)) {
                resolve({ status: 400, message: "you can't impersonate other users" });
            }

            // Validate if user exists or not
            var index = users.findIndex((obj) => {
                return obj.uid === uid
            });

            if (index === -1) {
                reject({ status: 400, message: "Invalid credentials" });
            }
            else if (index !== -1) {
                var fileId = 'id_' + fileName;
                file.fileId = fileId;
                file.name = fileName;
                file.url = fileUrl;

                fs.writeFile("data/fileData.json", JSON.stringify(file, null, 2), err => {
                    if (err) throw err;
                    console.log("updated files json file"); // Success
                });

                resolve({ status: 200, message: "File uploaded successfully", response: { name: fileName, fileId, url: fileUrl } });
            }
        }
        catch (err) {
            reject({ status: 500, response: `Internal server error ${err.message}` });
        }
    })

}