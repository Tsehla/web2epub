//"use strict";

//======

// class ParserFactory{
//     constructor() {}
//     register(hostName, constructor) {
//         console.log(hostName, constructor)
//     }

// }
// var parserFactory = new ParserFactory();

// class Parser{}

// var util = (function () {

//     var hyperlinksToChapterList = function(contentElement, isChapterPredicate, getChapterArc) {
//         console.log(contentElement)
//     }
// });

// //======

// parserFactory.register("69shu.com", function() { return new ShuParser() });

// class ShuParser extends Parser{
//     constructor() {
//         super();
//     }

//     async getChapterUrls(dom) {
        
//         let tocUrl = dom.querySelector("a.more-btn").href;
//         console.log("uydfghj : ", tocUrl)
//         let toc = (await HttpClient.wrapFetch(tocUrl, this.makeOptions())).responseXML;
//         let menu = toc.querySelector("#catalog");
//         return util.hyperlinksToChapterList(menu);
//     }

//     findContent(dom) {
//         return dom.querySelector("div.txtnav");
//     };

//     extractTitleImpl(dom) {
//         return dom.querySelector("div.booknav2 h1").textContent;
//     };

//     findCoverImageUrl(dom) {
//         return util.getFirstImgSrc(dom, "div.bookbox");
//     }

//     async fetchChapter(url) {
//         // site does not tell us gb18030 is used to encode text
//         return (await HttpClient.wrapFetch(url, this.makeOptions())).responseXML;
//     }

//     makeOptions() {
//         return ({
//             makeTextDecoder: () => new TextDecoder("gb18030")
//         });
//     }
// }
    
// //===========================

// //alert()
// // shu = new ShuParser();
// // var b = shu.makeOptions();
// // console.log(b.makeTextDecoder())
// //var c = new TextDecoder  //research


// var shu2 = new ShuParser();

// //get chapter data

// var book_url = "/http_get?host" + "=" + "69shu.com&host_path=" + "/txt/1464.htm";
// $.get(book_url, function(results, err){

//     if(results == "html_error"){
//         return console.log(results);
//     }

//     document.getElementById("request_html_container").innerHTML = results;
//     //console.log(document.getElementById("request_html_container").querySelector("a.more-btn").href) //http://127.0.0.1:8080/1464/ //remove host and add the correct site host
//     shu2.getChapterUrls(document.getElementById("request_html_container")) 
// })




// $.ajax({
//     url: ,
//     dataType: 'jsonp'​​​​,
//     success: function(data) {
//         console.log(data); //entire object here
//         //another example
//         // alert("Feed title: " + data.feed.title.$t);
//     }
// });​
// $.ajax({
//     url : 'http://www.69shu.com/txt/1464.htm',
//     dataType : 'jsonp'​​​​,
//     success: function(data){
//         console.log(data)
//     }
// })

//========================



//https://a-t.nu/novel/linker/

//----------reusables functions

function div_hide_show(div_id, action="show"){//hide or show div
    if(action != "show"){
        return document.getElementById(div_id).style.display = "none";
    }
    document.getElementById(div_id).style.display = "block";
}

//menu windows underlay layer
var open_windows_tracker = 0;
function main_menu_upper_layer_show(){//so i can save mental energy en not mentally track to do it, feeling lazy right now
    div_hide_show("menu_window_scroller");//show overlay
    div_hide_show("quick_navi_container");//show scroll menu
    //save window is open
    open_windows_tracker = open_windows_tracker + 1;//increment
}
function main_menu_upper_layer_hide(){//so i can save mental energy en not mentally track to do it, feeling lazy right now
    //see if main menu upper layer should be closed//only if no menu window is open
    open_windows_tracker = open_windows_tracker -1;//decrement
    if(open_windows_tracker < 1){//if no menu window is still open
        div_hide_show("menu_window_scroller", "hide");//hide overlay
        div_hide_show("quick_navi_container", "hide");//hide scroll menu
    }   
}


function alert_1(display="show"){//please wait alert
    if(display == "hide"){
        return document.getElementById("please_wait_1").style.display = "none";
    }
    document.getElementById("please_wait_1").style.display = "block";
}


function rectrive_book_webpage(book_url){//send website to server to request webpage
    alert_1("show")//show wait alert
    //clean book link/url
    // book_url = book_url.replace("http://","").replace("https://","");
    //request html
    $.get( "/http_get?site="+book_url, function(results, err){

        if(results == "html_error"){
            alert("Error retrieving book contents.")
            alert_1("hide")//hide wait alert
            return console.log(results);
        }
        //console.log(results);
        document.getElementById("request_html_container").innerHTML = results; 
        dom_chapter_retriever(results)
        alert_1("hide")//hide wait alert
    })
}
//=====================================================================


//++++++++++++++++++++++++++++ get chapters
var chapter_links_container = {
    book_chapters : [],
    book_cover_image_link : "",
    book_website_link : "",
    book_name : "",
    book_language : "",
    book_author : "",
};

function dom_chapter_retriever(dom){

    //select html element containing chapters
    document.getElementById("request_html_container").querySelectorAll("li.wp-manga-chapter.free-chap a").forEach(function(data){
        //loop through result and save link with its text or title
        chapter_links_container.book_chapters.unshift({
            chapter_link : data.href.trim(),
            chapter_link_text : data.textContent.trim(),
        })
        //get book cover image link
        chapter_links_container.book_cover_image_link = document.getElementById("request_html_container").querySelectorAll("div.tab-before-content img")[0].src//query selectorAll returns an array
        //get book Name and link
        chapter_links_container.book_website_link = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li a")[1].href//book link on website
        chapter_links_container.book_name = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li")[1].textContent.trim()//book name, taken from book link url name
        //get book author
        chapter_links_container.book_author = "<unknown>";
        //get book language 
        chapter_links_container.book_language = ""//change html from server, //insteat of tranferring body dom make it transfer outer <html> or have one transfer outer html and extract language while the outer continue as normal
    })
    
    console.log(chapter_links_container);
}












//rectrive_book_webpage("https://a-t.nu/novel/linker/");



