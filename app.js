var express = require('express');
var app = express();
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));

var port = process.env.PORT || 3000;
var api_host = 'http://localhost:9001'


app.get("/", function(req, res){
    // GET: http://localhost:9001/posts
    axios.get(api_host + '/posts')
    .then(function (response) { 
        res.render("home", {data: response.data});
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.get("/:id", function(req, res){
    const blog_id = req.params.id
    // GET: http://localhost:9001/posts
    // Get all blogs
    axios.get(api_host + '/posts')
    .then(function (response) { 
        // Find blog with the matching slug
        data = response.data.find((blog) => {
            return blog.slug === blog_id;
        })
        return data;
    })
    .then((data) => {
        if(data) {
            console.log("Returning", data);
            res.render("article", {data: data});
        }else {
            console.log("That blog does not exist.");
            // Return 404 page
            res.render("home", {data: data});
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.listen(port, function(){
    console.log("server is running on port: " + port);
});