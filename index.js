  
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

//file system
var file_system = require("fs");

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


//puppeteer launch on server start

// const puppeteer = require('puppeteer');
var puppeteer = require('puppeteer-extra');//this supports plugins

// var  browser = null;//browser intance refer variable

// (async function main() {
//     try {
//         // var browser = await puppeteer.launch({ headless: true });
//         // to work on heroku options below required and more
//        browser = await puppeteer.launch({
//             headless: true,
//             // defaultViewport: null,
//             args: [
//                 "--incognito",
//                 "--no-sandbox",
//                 "--single-process",
//                 "--no-zygote"
//             ],
//         });
//         //  var [page] = await browser.pages();
//         // // var page = await browser.newPage();

//         // await page.goto(req.query.site, {waitUntil: 'networkidle0'});

//         // var  page_body = await page.$eval('body', el => el.outerHTML);

//         // res.send({director_module_to_use :cleaned_site_domain_url,page_dom:page_body});

//         // // var  page_body =  await director_module_to_use.toc_extracts_director(page);

//         // // console.log("---------",page_body);

//         // await browser.close();

//     } catch (err) {
//         console.error(err);
//         res.send("html_error");
//         next(err)
//     }

// })();//auto run

//puppeter page propres
var minify = require('html-minifier').minify;//html comressor
// async function page_process(res,req,cleaned_site_domain_url){

//     try {

//          var [page] = await browser.pages();
//         // var page = await browser.newPage();

        
//         await page.setViewport({ width:1920, height:1080})//set browser page scren size
//         await page.setRequestInterception(true);//intercept page external/internal url
       

//         await page.on('request', function(req){
//             if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == "imageset" || req.resourceType() == "media" ){ //ad more resource types//if page requested contents matches
//                 req.abort().catch((err)=>err);//cancell request
//             }
//             else {
//                 req.continue().catch((err)=>err);//cancell request; //else continue loading
//             }
//         });

//         // console.log(req.query.site)
//         await page.goto(req.query.site, {waitUntil: 'networkidle0',timeout: 0});

//         // var  page_body = await page.$eval('body', el => el.outerHTML);
//         var  page_body = await page.$eval('body', el => el.innerHTML);
//         // console.log((await browser.pages()).length)//total open pages/tabs
        
       
//         res.send({director_module_to_use :cleaned_site_domain_url,//compression seem to be 1kb effective
//             page_dom:  minify(page_body, {
//                 collapseBooleanAttributes: true,
//                 collapseInlineTagWhitespace: true,
//                 collapseWhitespace: true,
//                 conservativeCollapse: true,
//                 // decodeEntities: true,
//                 // includeAutoGeneratedTags: false,
//                 minifyCSS: true,
//                 // minifyJS: true,
//                 minifyURLs: true,
//                 preventAttributesEscaping: true,
//                 processConditionalComments: true,
//                 removeAttributeQuotes: true,
//                 removeComments: true,
//                 removeEmptyAttributes: true,
//                 removeOptionalTags: true,
//                 removeRedundantAttributes: true,
//                 removeScriptTypeAttributes: true,
//                 removeStyleLinkTypeAttributes: true,
//                 sortAttributes: true,
//                 sortClassName: true,
//                 trimCustomFragments: true,
//                 useShortDoctype: true
//             })
//         });
//        // res.send({director_module_to_use :cleaned_site_domain_url,page_dom : page_body })
        


//         // return page.close();//close browser page //issue causes browser to exit
//         // await browser.close();// close chrome browser
       
//     } catch (err) {
//         console.error(err);
//         res.send("html_error");
       
//     }

// }
app.get("/test", function(req,res){

const axios = require("axios");
const cheerio = require("cheerio");

const fetchTitles = async () => {
	try {
		const response = await axios.get('https://a-t.nu/novel/linker/chapter-1/');

        const html = response.data;

		const $ = cheerio.load(html);

		const titles = [];

		$('div.text-left > p').each((_idx, el) => {
			const title = $(el).text()
			titles.push(title)
		});

		return titles;
	} catch (error) {
		throw error;
	}
};

fetchTitles().then((titles) => console.log(titles));
})


//puppeteer adblock
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

app.get('/http_get', function(req,res){

    //++++++++++++++++++ check if module is available in directory
    var cleaned_site_domain_url = "";//store book domain name, to be used to find director module
       
    (function require_director(){//since theres failure to have director module do dom querying on nodjs process due to data imcompertibility between nodejs and DOM object, theres no need to have this function here any more since i changed my approah, but ohwell i like the function en keeping it beside it still works en if partly compared to what it was intended to do
        //get wesite domain
        var original_site_domain_url = req.query.site.toLowerCase().replace("http://www", "").replace("https://www","").replace("http://", "").replace("https://","").split("");//remove those//then turn to array


        for(a of original_site_domain_url){//loop through url string turned array
            
            if(a == "/" || a == "?"){ //end loop if any of the array characters is any of those
                break;
            }

            cleaned_site_domain_url = cleaned_site_domain_url + a;//connect array loop thingies to form a string which is our domain 
        }
        

        // try{ //if avalable attache module table of content function to local variable
        // //    var a= require("./static/director_module/" + cleaned_site_domain_url);
        //     //director_module_to_use.toc_extracts_director();
        //     // console.log(cleaned_site_domain_url)
        //     if (file_system.existsSync("./static/director_module/" + cleaned_site_domain_url)) {
        //         //file exists
        //         console.log("director module found");
        //         main();//call webpage retrieve
        //       }
        // }
        // catch(error){//if not send error to user
        //     console.log("require error", error);
        
        //     //create fs function to look for custom matching modules then use them +++++++

        //   return res.send("module_error");
        // }
        file_system.access("./static/director_module/" + cleaned_site_domain_url + ".js", file_system.F_OK, (error) => {
            if(error){
                console.log("director module search error", error);
                return res.send("module_error");
            }
          
            //  //file exists
            //  //console.log("director module found");
             main();//call webpage retrieve

            //check if browser is open ++++++=================

            // if(browser){//if browser  is open
            //     page_process(res,req,cleaned_site_domain_url );//process page requested//passing get request and response object
            // }

            // if(!browser){//if browser  is not opened
            //     main()//attempt browser opening
            //     require_director();//then rerun this function
            // }
            
        });

    })()

 

    // // +++++++++++++++++ open pupeteer browser
    // //alow proxy usage function

    // var chapter_links_container = {//book details holder
    //     book_chapters : [],
    //     book_cover_image_link : "",
    //     book_website_link : "",
    //     book_name : "",
    //     book_language : "<unknown>",
    //     book_author : "<unknown>",
    //     director_modules : [],
    //     selected_director_module: "",
    // };

    // const puppeteer = require('puppeteer');

    // // (async function main() {
    // async function main() {
    //     try {
    //         // var browser = await puppeteer.launch({ headless: true });
    //         // to work on heroku options below required and more
    //         var browser = await puppeteer.launch({
    //             headless: true,
    //             defaultViewport: null,
    //             args: [
    //                 "--incognito",
    //                 "--no-sandbox",
    //                 "--single-process",
    //                 "--no-zygote"
    //             ],
    //         });
    //          var [page] = await browser.pages();
    //         // var page = await browser.newPage();

    //         await page.goto(req.query.site, {waitUntil: 'networkidle0'});

    //         var  page_body = await page.$eval('body', el => el.outerHTML);

    //         res.send({director_module_to_use :cleaned_site_domain_url,page_dom:page_body});

    //         // var  page_body =  await director_module_to_use.toc_extracts_director(page);

    //         // console.log("---------",page_body);

    //         await browser.close();

    //     } catch (err) {
    //         console.error(err);
    //         res.send("html_error");
    //     }
    // // })();
    // };


    async function main() {



        try {

            //adbloc
            if(req.query.turbo_mode && req.query.turbo_mode == 'true'){ //if turbo mode is turn on
                puppeteer.use(AdblockerPlugin({blockTrackers: true,}));//disable atracker together with ads
            }
    

            // var browser = await puppeteer.launch({ headless: true });
            // to work on heroku options below required and more
                    
            var browser = await puppeteer.launch({
                        headless: true,
                        // defaultViewport: null,
                        args: [
                            "--incognito",
                            "--no-sandbox",
                            "--single-process",
                            "--no-zygote"
                        ],
                    });

                var [page] = await browser.pages();
                // var page = await browser.newPage();

                
                await page.setViewport({ width:1920, height:1080})//set browser page scren size

                if(req.query.turbo_mode && req.query.turbo_mode == 'true'){ //if turbo mode is turn on

                    // console.log('turbo mode : ',req.query.turbo_mode == 'true', typeof req.query.turbo_mode );

                    await page.setRequestInterception(true);//intercept page external/internal url
                
                    await page.on('request', function(req){
                        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == "imageset" || req.resourceType() == "media" ){ //ad more resource types//if page requested contents matches

                            req.abort().catch((err)=>err);//cancell request             
                        }
                        else {
                            req.continue().catch((err)=>err);//cancell request; //else continue loading
                        }
                    });
                }

                // console.log(req.query.site)
                await page.goto(req.query.site, {waitUntil: 'networkidle0',timeout: 0});

                // var  page_body = await page.$eval('body', el => el.outerHTML);
                var  page_body = await page.$eval('body', el => el.innerHTML);
                // console.log((await browser.pages()).length)//total open pages/tabs
                
            
                res.send({director_module_to_use :cleaned_site_domain_url,//compression seem to be 1kb effective
                    page_dom:  minify(page_body, {
                        collapseBooleanAttributes: true,
                        collapseInlineTagWhitespace: true,
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        // decodeEntities: true,
                        // includeAutoGeneratedTags: false,
                        minifyCSS: true,
                        // minifyJS: true,
                        minifyURLs: true,
                        preventAttributesEscaping: true,
                        processConditionalComments: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        sortAttributes: true,
                        sortClassName: true,
                        trimCustomFragments: true,
                        useShortDoctype: true
                    })
                });

                await browser.close();

        } catch (err) {
            console.error(err);
            res.send("html_error");
            // next(err)
        }
    }








}) //page content retrive allow timer option inbetween==================================================================================================================================
 
app.get('/find_webpage', function(req,res){

    
    if(browser){//if browser  is open
        page_process(res,req,"N/A" );//process page requested//passing get request and response object
    }

    if(!browser){//if browser  is not opened
        main()//attempt browser opening
        require_director();//then rerun this function
    }

});


const epub = require('epub-gen');//epub generator module

app.use(express.json({limit: '50mb'})); //Used to parse JSON bodies
app.use(express.urlencoded({limit: '50mb'})); //Parse URL-encoded bodies

// profile short link check
app.post("/cook_epub", function(req, res){

    // console.log(req.body);
    let book_contents = req.body.book_chapters

 
    var date = new Date()
    var options = {
        title: req.body.book_name,
        author: req.body.book_author,
        output: './static/epubs/'+req.body.book_save_name+'  '+req.body.book_chapters[1].title+' - '+req.body.book_chapters[req.body.book_chapters.length - 1].title+'  D='+ date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+' T='+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()+' .epub',
        content: book_contents,
    };


    new epub(options).promise
    .then(function(){
       res.jsonp('/epubs/'+req.body.book_save_name+'  '+req.body.book_chapters[1].title+' - '+req.body.book_chapters[req.body.book_chapters.length - 1].title+'  D='+ date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+' T='+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()+' .epub');
       console.log("done")

    })
    //.catch(function(err){
    //     res.jsonp('epub_err'); 
    //     console.log("epub create error : book name="+req.body.book_name+" ,web site : "+ err)}
    // );

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
