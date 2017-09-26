var async = require('async');
var a = function allezla (params, cb){
    var resultat= "pas touché";
    async.waterfall([
        
        function(callback){
            callback(null, 'one', 'two');
            var resultat=2;
        },
        function(arg1, arg2, callback){
            // arg1 now equals 'one' and arg2 now equals 'two'
            callback(null, 'three');
        },
        function(arg1, callback){
            // arg1 now equals 'three'
            callback(null, 'le bon résultat');
        }
    ], //function stuff (err, result) {
        //console.log(result);
    // result now equals 'done'
    //var resultat=result;
    //console.log("interne",(result));
    //return (result);
    //});
cb);
    
    //return resultat;    
    
};
console.log("a",a)

//test= await allezla()
//onsole.log("await",allezla());
//console.log("usingItNow(mycallback)");
//var a = test();
//console.log("a",a);