{
    //  Method to submit the form data for new post using AJAX
    let createPost = function(){
        //getting the form which we made in home.ejs using jQuery
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();//doing this so that it will not be submitted naturally

            //submitting the post using Ajax
            $.ajax({
                type: 'post',
                url: '/posts/create', //url of the form on home.ejs
                data: newPostForm.serialize(), //.serialize convert the data into JSON
                success: function(data){  //success : A callback function that is executed if the request succeeds.it takes as an argument the returned data.
                    console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create a post in DOM
     createPost();
}


