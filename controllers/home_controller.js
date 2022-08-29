module.exports.home = function(req, res){
    //returning response to the server
    return res.end('<h1>Express is up to Codeial !</h1>')
}
//Syntex: module.exports.actionName = function(req, res){}