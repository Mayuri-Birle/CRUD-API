const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validBlog(blog) {
    const hasTitle = typeof blog.title == 'string' && blog.title.trim() != '';
    const hasURL = typeof blog.url == 'string' && blog.url.trim() != '';
    const hasDescription = typeof blog.description == 'string' && blog.description.trim() != '';
    const hasRating = !isNaN(blog.rating);
    return hasTitle && hasURL && hasDescription && hasRating;
}

router.get('/', (req, res) => {
    queries.getAll().then(blogs => {
        res.json(blogs);
    })

})

router.get('/:id', isValidId, (req, res) => {
    queries.getOne(req.params.id).then(blog => {
        if (blog) {
            res.json(blog);
        } else {
            next();
        }
    });

});

router.post('/', (req, res, next) => {
    if (validBlog(req.body)) {
        queries.create(req.body).then(blogs => {
            res.json(blogs[0]);
        });

    } else {
        next(new Error('Invalid Blog'));
    }
});

router.put('/:id', isValidId, (req, res, next) => {
    if (validBlog(req.body)) {
        queries.update(req.params.id, req.body).then(blogs => {
            res.json(blogs[0]);
        })

    } else {
        next(new Error('Invalid Blog'));
    }

})
router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        })
    })

});
module.exports = router;