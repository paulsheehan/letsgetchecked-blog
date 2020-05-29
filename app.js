var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));

var port = process.env.PORT || 3000;

app.get("/", function(req, res){
    const data = {
        "posts": [{
            "id": 1,
            "title":"Blog post #1",
            "author": "Melissa Manges",
            "publish_date": "2016-02-23",
            "slug": "blog-post-1",
            "description": "Utroque denique invenire et has.",
            "content": "<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>"
          }, {
            "id": 2,
            "title":"Blog post #2",
            "author": "Olene Ogan",
            "publish_date": "2016-03-16",
            "slug": "blog-post-2",
            "description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
            "content": "<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p> <p>Dico omnesque epicurei te vix. Tota verterem temporibus eu quo, eu iudicabit repudiandae sea. Elitr nihil gloriatur vis in.</p>"
          }]
    }

    // Calls API to get all blogs and sends to the template
    res.render("home", {data: data.posts});
});


app.get("/blog/:id", function(req, res){
    const data = {
        "id": 1,
        "title": "Blog post #1",
        "author": "Melissa Manges",
        "publish_date": "2016-02-23",
        "slug": "blog-post-1",
        "description": "Utroque denique invenire et has.",
        "content": "<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>"
    }
    // Calls API to get one blog and sends to the template
    console.log(req.params.id);
    res.render("article", {data: data}); 
});

app.listen(port, function(){
    console.log("server is running on port: " + port);
});