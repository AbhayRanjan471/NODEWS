module.exports.home = function(req, res){
    //returning response to the server
    // return res.end('<h1>Express is up to Codeial !</h1>')

    //reading the cookies
    //cookie is comming as a request and going back as a resoponse
    console.log(req.cookies);
    //we can change the value of the cookie
    res.cookie('user_id', 35);
    return res.render('home',{
        title: "Home"
    });
}
//Syntex: module.exports.actionName = function(req, res){}