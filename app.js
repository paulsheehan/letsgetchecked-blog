var express = require('express');
var app = express();
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));

var port = process.env.PORT || 3000;
var api_host = 'http://localhost:9001'


app.get("/", function(req, res){
    console.log('Routing from Node, looking for id:');
    // GET: http://localhost:9001/posts
    axios.get(api_host + '/posts')
    .then(function (response) { 
        res.render("home", {data: response.data});
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.get("/blog/:blogId", function(req, res) {
    const blog_id = req.params.blogId
    // GET: http://localhost:9001/posts
    // Get all blogs
    axios.get(api_host + '/posts')
    .then(function (response) {
        // Find blog with the matching slug
        let blog_index = response.data.findIndex((blog) => {
            return blog.slug === blog_id;
        });
        if(blog_index < 0) {
            // Return 404 page
            res.render("404");
        } else {
            let data = {}
            data.current_blog = response.data[blog_index];
            data.all_blogs = response.data;
            data.current_blog.blog_index = blog_index;
            console.log(data);
            
            res.render("article", {data: data});
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.listen(port, function(){
    console.log("server is running on port: " + port);
});