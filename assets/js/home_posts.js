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

                    //giving a delete button to the Post
                    deletePost($(' .delete-post-button', newPost))
                }, error: function(error){
                    console.log(error.responseText); //responseText returns the text received from a server 
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
                    
                            
                            <form action="/comments/create" class="new-comment-form" id="post-${post._id}-comments-form" method="POST">
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


    // Method to DELETE  post from DOM
    //created a function which sends a post id to be deleted (this function will send a AJAX request)
    let deletePost = function(deleteLink){
        $('deleteLink').click(function(e){
            e.preventDefault(); //blocking the natural behavious of deleting so that we can perfom the delete usng AJAX

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    let postToAjax = function(){
        $('#posts-list-container>ul>li').each(function() {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


     createPost();
     postToAjax();
}


