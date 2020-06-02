const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('blog');
    },
    getOne(id) {
        return knex('blog').where('id', id).first();
    },
    create(blog) {
        return knex('blog').insert(blog, '*');
    },
    update(id, blog) {
        return knex('blog').where('id', id).update(blog, '*');
    },
    delete(id) {
        return knex('blog').where('id', id).delete();
    }
}