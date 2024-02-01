const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blogs');

// require mongoose 
const mongoose = require('mongoose');

const app = express();

// connection String
const dbURI = 'mongodb+srv://asmarababah86:Passpasspass1993@clusterasma.qd0hxod.mongodb.net/blog-db';

// connect to the database through mongoose 
mongoose.connect(dbURI).then((result) => {
    app.listen(5010);
    app.use(morgan('dev'));
    console.log("connected to the database");
}).catch((err) => {
    console.log(err);
});

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.static('styles'));

app.use(express.urlencoded({ extended: true }));

// app.use((request, response, next) => {
//     console.log('new request is made');
//     console.log('host', request.hostname);
//     console.log('method', request.method);
//     console.log('url', request.url);
//     next();
// })

app.get('/', (request, response) => {
    const title = 'Home page';
    response.render('index', { title });
})

app.post('/new-blog', (request, response) => {
    console.log("the post request is made");
    console.log(request.body);

    const blog = new Blog(request.body);
    blog.save().then((result) => {
        response.redirect('/blogs');
    }).catch((error) => {
        console.log(error);
    })

})

app.get('/getById/:id', (request, response) => {
    const id = request.params.id;
    Blog.findById(id).then((result) => {
        response.render('blogInfo', { blog: result, title: "Blog Information" });
    }).catch((error) => {
        console.log(error);
    })
})

app.get('/blogs/delete-blog/:id', (request, response) => {
    const id = request.params.id;
    Blog.findByIdAndDelete(id).then((result) => {
        response.redirect('/blogs');
    }).catch((error) => {
        console.log(error);
    })

})

app.get('/view-blog/:id', (request, response) => {
    const id = request.params.id;
    console.log('edites');
    console.log(id);
    const blog = new Blog(request.body);

    Blog.findById(id).then((result) => {
        response.render('viewBlog', { blog: result, title: "View Blog To Edit" });
        response.redirect('/blogs');

    }).catch((error) => {
        console.log(error);
    })
})

app.post('/update-blog/:id', (request, response) => {
    console.log("updated");
    const id = request.params.id;
    console.log(id);

    const blog = new Blog(request.body);

    Blog.findByIdAndUpdate(id, { title: blog.title, content: blog.content, author: blog.author }).then((result) => {
        response.redirect('/blogs');
    }).catch((error) => {
        console.log(error);
    })

})


// app.get('/add-blog', (request, response) => {
//     const blog = new Blog({
//         title: 'Blog 10',
//         author: 'Author 10',
//         content: "Blog 10 Content"
//     });
//     blog.save().then((result) => {
//         response.send(result);
//     }).catch((error) => {
//         console.log(error);
//     })
//     // response.send('<h1> add-blog page </h1>');
// })


// app.get('/all-blogs', (request, response) => {
//     Blog.find().then((result) => {
//         response.send(result);
//     }).catch((error) => {
//         console.log(error);
//     })
// })

// app.get('/blogById', (request, response) => {
//     Blog.findById('65b425f37355ecac0f4f81e5').then((result) => {
//         response.send(result);
//     }).catch((error) => {
//         console.log(error);
//     })
// })

// app.use((request, response, next) => {
//     console.log('another middleware');
//     next();
// })


app.get('/blogs', (request, response) => {
    Blog.find().sort({ createdAt: -1 }).then((result) => {
        // response.send(result);
        const title = "All Blogs";
        response.render('blogs', { title, blogs: result });
    }).catch((error) => {
        console.log(error);
    })

})

app.get('/blogs/create', (request, response) => {
    const title = 'Add blog';
    response.render('create', { title });
})

app.use((request, response) => {
    const title = 'Not Found';
    // response.status(404).sendFile('./views/notfound.html', { root: __dirname });
    response.status(404).render('notfound', { title });

})
