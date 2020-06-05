var express = require('express');
var app = express();
const axios = require('axios');
var moment = require('moment'); // require

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.json());

var port = process.env.PORT || 3000;
var api_host = 'http://localhost:9001'


app.get("/", function(req, res){
    let data = {};
    // GET: http://localhost:9001/posts
    axios.get(api_host + '/posts')
    .then(function (response) { 
        data = response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(() =>{
        res.render("home", {data: data});
    });
});

app.get("/blog/:blogName", function(req, res) {
    const blog_name = req.params.blogName;
    let data = {}
    let blog_index = -1;

    // GET: http://localhost:9001/posts
    axios.get(api_host + '/posts')
    .then(function (response) {
        // Find blog ID using slug (blogName)
        blog_index = response.data.findIndex((blog) => {
            return blog.slug === blog_name;
        });

        if(blog_index < 0) {
            // Return 404 page if no blog
            res.render("404");
        } else {
            // Store blogs in data object
            data.current_blog = response.data[blog_index];
            data.all_blogs = response.data;
            data.current_blog.blog_index = blog_index;

            // Get comments for the blog
            // GET: http://localhost:9001/posts/:blogName/comments
            axios.get(api_host + '/posts/'+ response.data[blog_index].id +'/comments')
            .then((response) => {
                // Add sorted comments to data object
                data.blog_comments = response.data.sort((a, b) => {
                    return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
                });
            })
            .catch((e) => {
                console.log(e);
            })
            .then(() => {
                // render article page with data object
                res.render("article", {data: data});
            });
        }
    }).catch((e) => {
        console.log(e);
    });

});

app.post("/sendcomment", function(req, res) {
    let payload = {
        "user": req.body.name, 
        "content": req.body.content, 
        "date": moment().format("YYYY-MM-DD"), 
        "parent_id": null
    };
    let blog_id = req.body.blog_id;
    
    
    // POST: http://localhost:9001/posts/:id/comments
    axios.post(api_host + '/posts/' + blog_id + '/comments', payload)
    .catch(function (error) {
        console.log(error);
    });
});

app.listen(port, function(){
    console.log("server is running on port: " + port);
});