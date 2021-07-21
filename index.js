  
// ======== Modules
var express = require('express');

// ====== enviroment variables file
require('dotenv').config();

//mongo db 
var mongo_client = require('mongodb').MongoClient;


//express app
var app = express();


//path module
var path = require ('path');

//https requests
const https = require('https')

//current server 
var os = require("os");

// ==================== mongo db first run configs ====================

// var mongo_url = process.env.MongoDB_URL || "mongodb://localhost:27017/zarhub_app_db";//connect remote db if provided or local

// mongo_client.connect(mongo_url, function(err, db_data){//connect to db, if not exist create 1


//     if(err){ //giv db connection error

//             console.log("DB conection error : " + err);

//             return  db_data.close(); //close db
//     } 

//     let db = db_data.db("zarhub_app_db_app_db");
    


//     // ====== do check of first run data ========

//     //+++++ find collections +++++++++


//         // db.collection("annoucements").find().toArray(function(err, data) { //find announcements colection

//         //     if(err){
//         //         return console.log("Collection - Annoucements find error : " + err);
//         //     }
    
    
//         //     if(data.length == 0){ //collection is empty
    
//         //         var data = {
//         //             announcement : "Welcome"
//         //         };
    
//         //         db.collection("annoucements").insertOne(data, function(err){
                    
//         //             if(err){
//         //                 console.log("DB, collection firt run addin error : " + err);
//         //             }
//         //             else {
//         //                 console.log("Announcements first run added");
//         //             }
                         
//         //         })
    
//         //     }
    
         
//         // });






//     //+++++++ find users ++++++++

//     // db.collection("user").find().toArray(function(err, data) { //find stats colection

//     //     if(err){
//     //         return console.log("Collection - users find error : " + err);
//     //     }


//     //     if(data.length == 0){ //collection is empty

//     //         var data = [{
//     //             name : "UserNormal",
//     //             password : "normal",
//     //             email : "Usernormal@gmail.com",
//     //             account_type : "basic",
//     //             others : {},
//     //         },{
//     //             name : "UserAdmin",
//     //             password : "admin",
//     //             email : "userAdmin@gmail.com",
//     //             account_type : "manage",
//     //             others : {},
//     //         }];

//     //         db.collection("user").insertMany(data, function(err){
                
//     //             if(err){
//     //                 console.log("DB, user firt run addin error : " + err);
//     //             }
//     //             else {
//     //                 console.log("Users first run added");
//     //             }
                     
//     //         })

//     //     }

     
//     // });





//     // //close db connection
//     // setTimeout(function(){
//     //     db_data.close();//close db
//     // }, 150000); //close db after 15 seconds
   


// });


app.get('/http_get', function(req,res){

   // {"host":"127.0.0.1:8080","connection":"keep-alive","pragma":"no-cache","cache-control":"no-cache","sec-ch-ua":"\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"","accept":"*/*","x-requested-with":"XMLHttpRequest","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","sec-fetch-site":"same-origin","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"http://127.0.0.1:8080/","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9","cookie":"language=en-US; XSRF-TOKEN=IOkLe78dNB47aa318ba2559070462823b7a6519fef3438f9df"}

    // const options = {
    //     hostname: req.query.host,
    //     port: 443,
    //     path: req.query.host_path,
    //     method: 'GET',
    // }

    // var headers = {}
    // var hearders = req.headers;
    // if(req.headers["host"]){
    //     hearders["host"]=req.headers["host"]
    // }
    // if(req.headers["connection"]){
    //     hearders["connection"]=req.headers["connection"]
    // }
    // if(req.headers["pragma"]){
    //     hearders["pragma"]=req.headers["pragma"]
    // }
    // if(req.headers["cache-control"]){
    //     hearders["cache-control"]=req.headers["cache-control"]
    // }
    // if(req.headers["sec-ch-ua"]){
    //     hearders["sec-ch-ua"]=req.headers["sec-ch-ua"]
    // }
    // if(req.headers["accept"]){
    //     hearders["accept"]=req.headers["accept"]
    // }
    // if(req.headers["x-requested-with"]){
    //     hearders["x-requested-with"]=req.headers["x-requested-with"]
    // }
    // if(req.headers["sec-ch-ua-mobile"]){
    //     hearders["sec-ch-ua-mobile"]=req.headers["sec-ch-ua-mobile"]
    // }
    // if(req.headers["user-agent"]){
    //     hearders["user-agent"]=req.headers["user-agent"]
    // }
    // if(req.headers["sec-fetch-site"]){
    //     hearders["sec-fetch-site"]=req.headers["sec-fetch-site"]
    // }
    // if(req.headers["sec-fetch-mode"]){
    //     hearders["sec-fetch-mode"]=req.headers["sec-fetch-mode"]
    // }
    // if(req.headers["sec-fetch-dest"]){
    //     hearders["sec-fetch-dest"]=req.headers["sec-fetch-dest"]
    // }
    // if(req.headers["referer"]){ //"referer":"http://127.0.0.1:8080/"
    //     hearders["referer"]=req.headers.host
    // }
    // if(req.headers["accept-encoding"]){
    //     hearders["accept-encoding"]=req.headers["accept-encoding"]
    // }
    // if(req.headers["accept-language"]){
    //     hearders["accept-language"]=req.headers["accept-language"]
    // }
    // if(req.headers["cookie"]){
    //     hearders["cookie"]=req.headers["cookie"]
    // }
    // //add headrs to options
    // options.headers = headers;

    // const http_req = https.request(options, res_http => {
    //     console.log(`statusCode: ${res_http.statusCode}`)

    //     res_http.on('data', html_data => {
    //         res.send(html_data);
    //     })
    // })

    // http_req.on('error', error => {
    //     res.send("html_error");
    //     console.error(error)
    // })

    // http_req.end()

    // const request = require('request');
    
    // request(req.query.site, { json: true }, (err, res_html, body) => {

    // if (err) { 
    //     console.log("html_error -> ", err);
    //     return res.send("html_error");
    // }
    //     console.log(body)
    //     res.send(body);
    // });


    const puppeteer = require('puppeteer');

    (async function main() {
        try {
            var browser = await puppeteer.launch({ headless: true });
            var [page] = await browser.pages();

            // await page.goto('https://fengyuanchen.github.io/viewerjs/');

            // await page.click('[data-original="images/tibet-1.jpg"]');
            // await page.waitForSelector('.viewer-move.viewer-transition');

            // const viewer = await page.$eval('.viewer-move.viewer-transition', el => el.outerHTML);

            await page.goto(req.query.site, {waitUntil: 'networkidle0'});

            var  page_body = await page.$eval('body', el => el.outerHTML);

            res.send(page_body);

            await browser.close();

        } catch (err) {
            console.error(err);
            res.send("html_error");
        }
    })();
})



// profile short link check
app.get("/profile_link_view", function(req, res){

    
    // mongo_client.connect(mongo_url, function(err, db_data){//connect to db


    //     if(err){ //giv db connection error
    //         console.log("DB conection error : " + err);
    //         return  db_data.close(); //close db
    //     } 
    

    //     //+++++++ find buy me coke ++++++++
        
    //     db_data.db("ads_redirect_app_db").collection("youtbe_linking").findOne({short_link_code:req.query.code.replace(req.query.code[0], "")}, function(err, data) { //find stats colection

    //         if(err){
    //             res.jsonp(data);//return reply
    //             db_data.close()//close db
    //             return console.log("Collection - Page extra codess find error : " + err);
    //         }

    //         res.jsonp(data);
    //         db_data.close()//close db
            
    //     })
    
    // })

})


//Profile link create
app.get("/refer_link_create", function(req, res){

    //create new reward link

//   //var charcter_array = [1,2,3,4,5,6,7,8,9,0,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","r","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","R","T","u","v","w","X","Y","Z","@","#","$","*","_","."];

//    var charcter_array = [1,2,3,4,5,6,7,8,9,0]
   
//    //var charcter_array = [1,2]
//     var new_code ="";

//     //var max_loop = 1;
//     var max_loop = 6;

//     function generate_code(){

//         //console.log("gencode fn", max_loop )

//         var a = 1; //loop counter
//         while(a != max_loop + 1){

//             new_code = new_code +  charcter_array[Math.floor(Math.random() * charcter_array.length)];

//             if(a == max_loop){
//                 funtion_saveon_db ()
//             }
//             if(max_loop == 15){
//                 res.jsonp(); //send empty response as sign of error
//                 break;
//             }            
//             //counter increase
//             a = a + 1;
//         }
//     }

//     //onload new code generate
//     generate_code();

//     //console.log(new_code, max_loop );

//     function  funtion_saveon_db (){ 

//         mongo_client.connect(mongo_url, function(err, db_data){//connect to db


//             if(err){ //giv db connection error
//                 console.log("DB conection error : " + err);
//                 return  db_data.close(); //close db
//             } 
        

//             //+++++++ find buy me coke ++++++++
//             var date = new Date();

//             db_data.db("ads_redirect_app_db").collection("youtbe_linking").find({short_link_code:new_code}).toArray().then(function( data) { //find stats colection

//                 if(err){
//                     res.jsonp();//return reply
//                     db_data.close()//close db
//                     return console.log("Collection - Page extra codess find error : " + err);
//                 }

//                     //console.log(data, data.length)

//                     if(!data || data && data.length == 0){ ////no code mtch in db

//                         var data = {
//                             to_destination_link : req.query.link2,
//                             to_subscribe_link : req.query.link1,
//                             linking_text : "Please click link below and subscribe to unlock download link",
//                             short_link_code : new_code,
//                             to_extra_destination_link : "",
//                             created_cdate : date.getDate() + "/" +date.getMonth() + "/" + date.getYear(),
//                             total_clicks : 0,
//                             created_by_email : req.query.user,
//                             other : {},
//                         };
            
//                         db_data.db("ads_redirect_app_db").collection("youtbe_linking").insertOne(data, function(err){
                            
//                             if(err){
//                                 res.jsonp(); //send empty response as sign of error
//                                 db_data.close()//close db
//                             return console.log("DB, Youtube linking firt run addin error : " + err);
//                             }

//                             res.jsonp(data); //send reply
//                             db_data.close()//close db
                        
//                         })
//                     }

                

//                 if(data && data.length > 0){//code alreadi in database
//                     //recalculate code
//                     max_loop = max_loop + 1;//incremnt loop limit
//                     console.log("gencode call")
//                     generate_code();
//                     db_data.close()//close db
//                 }
//                 // res.jsonp(data);
//                 // 
                
//             })
        
//         })
//     }





})







//---------------------------------------
//---- show logs requests of tcp incoming ----
//---------------------------------------

app.use(function(req, res,next){
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);//shor url of request
    
    //---------- cors ----------//cross server communication allow policy
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    next()
});


























//---------------------------
// serve images/scripts/etc
//----------------------------
app.use(express.static('static'));



//login redirect
// app.get("/login", function(req, res){

//     res.sendFile(path.resolve('static/index.html'));

// })

// //register redirect
// app.get("/register", function(req, res){

//     res.sendFile(path.resolve('static/index.html'));

// })


// //contact
// app.get("/contact", function(req, res){

//     res.sendFile(path.resolve('static/index.html'));

// })


// //faq
// app.get("/faq", function(req, res){

//     res.sendFile(path.resolve('static/index.html'));

// })

//coffee
// app.get("/cofee", function(req, res){

    
//     mongo_client.connect(mongo_url, function(err, db_data){//connect to db


//         if(err){ //giv db connection error
//             console.log("DB conection error : " + err);
//             return  db_data.close(); //close db
//         } 
    

//         //+++++++ find buy me coke ++++++++
        
//         db_data.db("ads_redirect_app_db").collection("buy_coke").findOne(function(err, data) { //find stats colection

//             if(err){
//                 res.jsonp(data);//return reply
//                 db_data.close()//close db
//                 return console.log("Collection - Buy coke find error : " + err);
//             }

//             //send response
//             // if(data && data.length > 0){//suces data found
//             //     res.jsonp({issue: false, data:data.buy_lin});
//             //     return db_data.close();//close db
//             // }
  
//             // if(!data && data != [] ){ //no data in db
//             //     res.jsonp({issue: true, data:""});
//             //     return db_data.close();//close db
//             // }

//             res.jsonp(data)
//             db_data.close()//close db
//         })
    
//     })

// })



//coffee
// app.get("/announcements", function(req, res){

    
//     mongo_client.connect(mongo_url, function(err, db_data){//connect to db


//         if(err){ //giv db connection error
//             console.log("DB conection error : " + err);
//             return  db_data.close(); //close db
//         } 
    

//         //+++++++ find buy me coke ++++++++
        
//         db_data.db("ads_redirect_app_db").collection("annoucements").findOne(function(err, data) { //find stats colection

//             if(err){
//                 res.jsonp(data);//return reply
//                 db_data.close()//close db
//                 return console.log("Collection - Announcements find error : " + err);
//             }

//             res.jsonp(data);
//             db_data.close()//close db
//         })
    
//     })

// })


//done_so_far
// app.get("/done_so_far", function(req, res){

    
//     mongo_client.connect(mongo_url, function(err, db_data){//connect to db


//         if(err){ //giv db connection error
//             console.log("DB conection error : " + err);
//             return  db_data.close(); //close db
//         } 
    

//         //+++++++ find buy me coke ++++++++
        
//         db_data.db("ads_redirect_app_db").collection("usage_stats").findOne(function(err, data) { //find stats colection

//             if(err){
//                 res.jsonp(data);//return reply
//                 db_data.close()//close db
//                 return console.log("Collection - Usage stats find error : " + err);
//             }

//             res.jsonp(data);
//             db_data.close()//close db
//         })
    
//     })

// })

//ads
// app.get("/ads_data", function(req, res){

    
//     mongo_client.connect(mongo_url, function(err, db_data){//connect to db


//         if(err){ //giv db connection error
//             console.log("DB conection error : " + err);
//             return  db_data.close(); //close db
//         } 
    

//         //+++++++ find buy me coke ++++++++
        
//         db_data.db("ads_redirect_app_db").collection("advertisement").findOne(function(err, data) { //find stats colection

//             if(err){
//                 res.jsonp(data);//return reply
//                 db_data.close()//close db
//                 return console.log("Collection - Ads find error : " + err);
//             }

//             res.jsonp(data);
//             db_data.close()//close db
            
//         })
    
//     })

// })


//handle unknown tcp request// send message to hackers
app.get('*',function(req, res){
    res.sendFile(path.resolve('static/popup.html'));
    // res.jsonp('Error, Please load homepage');
});
















//---------------------------
// -- ports --
//---------------------------
var app_port = process.env.PORT || 8080;//application port 8080 default or from env file if provided

app.set('port', app_port); // set port for TCP with Express

app.listen(app_port, function(){ //listen for tcp requests
    console.log(`===========================================\nListening for TCP request at port : ${app_port}\n===========================================`);
}); 
