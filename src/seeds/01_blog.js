const blogs = require('../../blogs.js');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('blog').del()
    .then(function () {
      // Inserts seed entries
      return knex('blog').insert(blogs);
    });
}