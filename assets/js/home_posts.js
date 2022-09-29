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
                    //  calling the function
                    let newPost = newPostDom(data.data.post);
                    //appending  the list to the container whic we made in home.ejs
                    //prepend: this means newly post will appended in the top posiiton
                    $('#posts-list-container>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                <p>
                    <!-- for deleting the post -->
                        
                    <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}"> X </a>
                    </small>
                    
                    ${post.content}
                    <br>
                    <small>${post.user.name}</small>
                </p>
                <!-- for comment section creating the comment -->
                <div class="post-comments">
                    <!-- check for authentication visible to only authenticated user only -->
                    
                            
                            <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit"  value="Add Comment"> 
                            </form>
                        

                    <!-- loading the comments from the data base to the screen -->
                    <div class="post-comments-list">
                            <ul id="post-comments-${post._id}"></ul>
                    </div>
                    
                </div>
                </li>`)
    }


     createPost();
}


