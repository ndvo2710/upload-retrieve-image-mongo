const Category = require('../models/category.model.js');

exports.createCategory = (req, res) => {
    console.log('------------Controller------------');
    let name = req.body.name;
    let image = req.file.path;

    const category = new Category({
        name: name,
        image: image
    });

    console.log('category: ', category);

    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                errors: err.message
            })
        }

        return res.json({
            message: "Created category successfully",
            category
        })
    });
}