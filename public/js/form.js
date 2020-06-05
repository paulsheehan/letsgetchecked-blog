document.addEventListener("DOMContentLoaded", function(event) { 
    submitComment = function(){
        let name = document.getElementById('username').value;
        let comment = document.getElementById('usercomment').value;
        let blog_id = JSON.parse(document.getElementById('blog_id_variable').textContent);
        
        if(comment) {
            if (!name) {name = 'Anon'};
            // Send post request to Express
            var http = new XMLHttpRequest();
            var url = '/sendcomment';
            var payload = {"name": name, "content": comment, "blog_id": blog_id};
            http.open('POST', url, true);
            
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/json');

            http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4 && http.status == 200) {
                    alert(http.responseText);
                }
            }
            http.send(JSON.stringify(payload));
        }
    };
});