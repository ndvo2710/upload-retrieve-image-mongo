const fs = require('fs');



module.exports = (req, res, next) => {
    // first we will save category name and image
    // validate req.body or req.file to make sure they don't get undefined
    console.log('------------Midleware Validation------------');
    if (
        typeof (req.file) === 'undefined' ||
        typeof (req.body) === 'undefined'
    ) {
        // if error
        return res.status(400).json({
            errors: "Problem with sending data"
        })
    }

    // get image and name
    console.log('pre validation file: ', req.file);
    console.log('req.body: ', req.body);
    let name = req.body.name;
    let image = req.file.path;

    // Check type of image we will accept only png || jpg || jpeg
    if (
        !(req.file.mimetype).includes('jpeg') &&
        !(req.file.mimetype).includes('png') &&
        !(req.file.mimetype).includes('jpg')
    ) {
        // first remove file
        fs.unlinkSync(image);
        return res.status(400).json({
            errors: "file not support"
        })
    }


    // check file size max file size 1 megabyte
    if (req.file.size > 1024 * 1024) {
        // first remove file
        fs.unlinkSync(image);
        return res.status(400).json({
            errors: "File is Too Large"
        })
    }

    // check if file is empty
    if (!name || !image) {
        return res.status(400).json({
            errors: "all fields are required"
        })
    }

    // let's save in database
    next()
}