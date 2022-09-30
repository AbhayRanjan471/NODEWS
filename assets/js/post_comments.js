class PostComments {

    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments

        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        }); 
    }

    createComment(postId) {
        let pSelf = this;

        this.newCommentForm.submit(function(e) {
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    // enabling togglelike functionality on newComment
                    // new ToggleLike($(' .toggle-like-button', newComment));

                    // new Noty({
                    //     theme: 'relax',
                    //     text: 'Comment Published',
                    //     type: 'success',
                    //     layout: 'topRight',
                    //     timeout: 1500
                    // }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment) {
        //  show 0 likes on new comment
        return $(`<li id="comment-${ comment._id }">
            <p>
            
                <small id="comment-delete">
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}" >x</a>
                </small>
            
                <span id="comment-content1">
                    ${comment.content}
                </span>
                <br>
                <small id="comment-name1">
                    ${comment.user.name}
                </small>
                <small>
            
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                0 Likes
            </a>
        
        </small>
        </p>    
</li>`);
    }


    deleteComment(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }
}




// {
//     let createComment = function(){
//         let newCommentForm = $('#new-comment-form');

//         newCommentForm.submit(function(e){
//             e.preventDefault();//preventing the submission of comment in natural way bcz we will do it using AJAX

//             //submitting the comment using AJAx
//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentForm.serialize(),
//                 success: function(data){
//                      console.log(data , 'inside success');
//                     let newComment = newCommentDOM(data.data.comment);

//                     $('#post-comments-list>ul').prepend(newComment);
//                 }, error: function(error){
//                     console.log(error.responseText); //responseText returns the text received from a server 
//                 }
//             })
//         })
//     }

//     // Method to create a comment in DOM
//     let newCommentDOM = function(comment){
//         return $(`<li id="comment-${comment._id}" style="list-style: none;">
//         <p>
//             <!-- for deleting the comments -->
             
//                     <small>
//                             <a href="/comments/destroy/${comment._id}">X</a>
//                     </small>
                    
//             ${comment.content}
//             <br>
//             <small>
//                     ${comment.user.name}
//             </small>
//         </p>
//     </li>`)
//     }


//     createComment();
// }