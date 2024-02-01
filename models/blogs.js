const mongoose = require('mongoose');

// create schema class : properties , types 
const Schema = mongoose.Schema;

// create object of the schema using the constructor by new keyword
const blogs = new Schema();

// Create Schema 
const blogSchema = new Schema(
    // properties and the types of the schema go here
    // title
    // author
    // content 
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        content: { type: String, required: true },
    }, { timestamps: true } // createdAt , upadatedAt
);

// create model
const Blog = mongoose.model('Blog', blogSchema);

// export model 
module.exports = Blog;
