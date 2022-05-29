/* 

    idea :

    if link contain book intro : look for image link etc only found in intro page
        -> if above, save book cover page image, en formulate link that leads to chapters links table of contents (its basically pages that contains links to book chaptr links)

        -> option 2 ( when point above is incorrect ) : (assumes the links is from book chapter links table of content/table of links pages hahahahaha ), then find what link number is for final page that contains book chapters links. once we have that number then we create our links array from links container page 1 to links container page number we extracted above. 

    call function that will extract links contained from each of the table of links pages.

    call function that will loop through all the books chapter links en extract the chapter text as well as the title
        -> some of the text are added on the style sheet en needs to be sorted, a function does that then save the chapter details including text to object array ready to be sent for epub packging when all book chapters have been retrieved



*/




var b = document.location.protocol+"//"+document.location.hostname+":"+document.location.port;//this website url

//select html element containing chapters
function toc_contents_scraping(){

    
    //var book main page
    var book_main_age = document.getElementById("request_html_container").querySelectorAll(".poster a");
    // var book_image_url ="";
    // var retrived_toc_pages = 0;
    var retrived_toc_pages = 1;
    //var  toc_firt_page_link = "https://ranobes.net/up/earths-greatest-magus/page/7/".split("/");
    var toc_firt_page_link_template = "";


    var toc_container_pages = document.getElementById("request_html_container").querySelectorAll(".pages a");//table of contants container pages


    if(book_main_age && book_main_age[0] && book_main_age[0].href){ //https://ranobes.net/novels/693420-supremacy-games-v216510.html

        chapter_links_container.book_cover_image_link  = book_main_age[0].href;//save book image url

       rectrive_book_toc_pages(
        document.getElementById("request_html_container").querySelectorAll(".r-fullstory-chapters-foot a")[1].href.replace(b, 'https://ranobes.net'), true
       );//redirect and request toc contents webpage 

       // console.log( b,document.getElementById("request_html_container").querySelectorAll(".r-fullstory-chapters-foot a")[1].href.replace(b, 'https://ranobes.net'))
       return;
    }

    if(!book_main_age || !book_main_age[0] || !book_main_age[0].href){//give some frinedly advice//https://ranobes.net/novels/693420-supremacy-games-v216510.html

        toc_container_pages = document.getElementById("request_html_container").querySelectorAll(".pages a");

        alert_box_1(`Provide link with ".html" at end to extrach book Image i.e [ https://ranobes.net/novels/693420-supremacy-games-v216510.html ], instead [https://ranobes.net/up/earths-greatest-magus/] for the book.`, "","", "alert");//give alert
        book_chapter_links();//start processing

    }

    //get table of contents container pages
    function book_chapter_links(){//get book chapter links and headings ++++++++++++++
        
      var links_dom_array = document.getElementById("request_html_container").querySelectorAll(".cat_block a");


      links_dom_array.forEach(function(data, index) {

            //loop through result and save link with its text or title
           if(index > 0){ //to skip "table of contents" link retrived
        //    console.log(' ::::: ',data.querySelector("div h6.title").textContent, ' ::::: ',data.textContent.trim().split(":")[0],' :::: ',data.innerHTML)
                chapter_links_container.book_chapters.unshift({
                    chapter_link: data.href.trim().replace(b, 'https://ranobes.net'),//replace link referal to local server to remote server hosting the book
                    // chapter_link_text: data.textContent.trim().split("\n")[0],//clean chapter names before saving//NEW LINE HAS BEEN CHANGED TO ':' IN LATEST WEBSITE UPGRADE
                    chapter_link_text:data.querySelector("div h6.title").textContent//get/extract chapters title name/text
                })

                //get book cover image link
                //chapter_links_container.book_cover_image_link = document.getElementById("request_html_container").querySelectorAll("div.tab-before-content img").src //query selectorAll returns an array

                //get book Name and link
                chapter_links_container.book_website_link = document.getElementById("request_html_container").querySelectorAll("h5.ellipses a")[0].href //book link on website
                chapter_links_container.book_name = document.getElementById("request_html_container").querySelectorAll("h5.ellipses a")[0].textContent //book name, taken from book link url name

                //get book author
                chapter_links_container.book_author = "<unknown>"
                //get book language 
                chapter_links_container.book_language = "" //change html from server, //insteat of tranferring body dom make it transfer outer <html> or have one transfer outer html and extract language while the outer continue as normal  
           }

        });
        do_toc_find();//call function
    }


    //send website to server to request webpage
    async function rectrive_book_toc_pages(book_url, is_called_by_book_details_extractor){//get books toc links form toc container pages ++++++++++++++++
        // console.log(book_url)
        alert_1("show")//show wait alert
        //clean book link/url
        // book_url = book_url.replace("http://","").replace("https://","");
        //request html
        await $.get( "/http_get?site="+book_url, function(results, err){
    
            if(results == "html_error"){//website connection problem/server or book source
                //alert("Error retrieving book contents.")
                alert_box_1(alert_text = "Error retrieving book contents.", "", "", "alert" );//give alert//simple alert
                alert_1("hide")//hide wait alert
                div_hide_show("please_wait_2", "hide")//hide progress alert busy

                return console.log(results);
            }
            if(results == "module_error"){//module not aailable
                //alert("Error retrieving book contents.")
                alert_box_1(alert_text = "Error retrieving book contents. Table of content pages processing Error :  ", "", "", "alert" );//give alert//simple alert
                alert_1("hide")//hide wait alert
                div_hide_show("please_wait_2", "hide")//hide progress alert busy
                //show bookd details viewer menu
                div_hide_show("book_details_viewer_container");//show
                return console.log(results);
            }
            //console.log(results);
            document.getElementById("request_html_container").innerHTML = results.page_dom; 
            // dom_chapter_retriever(results)
            // alert_1("hide")//hide wait alert

            //save book iage link
            // chapter_links_container.book_website_link = book_image_url;

            //if called by is_called_by_book_details_extractor code
            if(is_called_by_book_details_extractor == true){
                toc_container_pages = document.getElementById("request_html_container").querySelectorAll(".pages a");//set variable data
                // console.log( toc_container_pages )
            }

            book_chapter_links();//call links extrator
        })
        
    }


  
    // var retrived_toc_pages = 0; dont know why this nonsense needs to be on top, cause here i get undefined
    // var  toc_firt_page_link = "https://ranobes.net/up/earths-greatest-magus/page/7/".split("/");
    // var toc_firt_page_link_template = "";

    function do_toc_find(){//loop through toc container pages ++++++++++++++++++

        //    console.log(toc_container_pages, toc_container_pages[0].href);
       //    console.log(toc_container_pages.length, retrived_toc_pages);


        // if(retrived_toc_pages != toc_container_pages.length - 1){ //some of toc container pages are [ ... ] to keep the navi short, so ill discard
        // // if(retrived_toc_pages != 1){//retrive two chapter container pages, //for during module development only



        //     // console.log(retrived_toc_pages, toc_container_pages[0].href);

        //     //ask server for page dom
        //     rectrive_book_toc_pages(toc_container_pages[retrived_toc_pages].href);//call to extract book chapters link
        //     retrived_toc_pages = retrived_toc_pages + 1;//increment pages tracker
        //     return;
        // }



        var get_toc_container_page_last_page_number = (toc_container_pages[toc_container_pages.length - 1]);//get last link element <a> of the retrived toc container pages
        // console.log(Number(get_toc_container_page_last_page_number.innerText),retrived_toc_pages != Number(get_toc_container_page_last_page_number.innerText));

        if(retrived_toc_pages <= Number(get_toc_container_page_last_page_number.innerText)){ 
        // if(retrived_toc_pages != 2){ 

            div_inner_html("please_wait_2_chapter_name", "TOC Container Link : "+retrived_toc_pages);//curretn chapter 
            div_inner_html("please_wait_2_chapter_numbers", retrived_toc_pages+'/'+Number(get_toc_container_page_last_page_number.innerText));//current chapter of total
            document.getElementById("please_wait_2_chapter_progress").style.width = (retrived_toc_pages/Number(get_toc_container_page_last_page_number.innerText))*100 +"%";//progress bar
            

            // var  toc_firt_page_link = "https://ranobes.net/up/earths-greatest-magus/page/7/".split("/");
            //link.splice(link.length - 2, 2);
            //var url =link.map(function(arr){return arr + "/"}).toString();

          
            if( retrived_toc_pages == 1){//first time function run
                var toc_firt_page_link = toc_container_pages[retrived_toc_pages].href.split("/");//extract link url, en turn to array//en save as 
                toc_firt_page_link.splice( toc_firt_page_link.length - 2, 2);//remove link last eleents
                // console.log(".... ", toc_firt_page_link)
                toc_firt_page_link.forEach(function(arr){ 
                    // console.log("1....... ",toc_firt_page_link_template)
                   toc_firt_page_link_template = toc_firt_page_link_template + arr + "/";
                //    console.log("2....... ",toc_firt_page_link_template)
                });//create link with last elements removed

                //fix domain by replacing with the book website domain
                toc_firt_page_link_template = toc_firt_page_link_template.trim().replace(b, 'https://ranobes.net')
                    
                //progress alert
                alert_1("hide")//hide wait alert

                div_inner_html("please_wait_2_wait_text", "Getting TOC chapters container Pages" );//wait text
                    
                div_hide_show("please_wait_2")//show busy
            }
          
    
            // console.log(":::: ",toc_firt_page_link_template + retrived_toc_pages)

            //ask server for page dom
            rectrive_book_toc_pages(toc_firt_page_link_template + retrived_toc_pages );//call to extract book chapters link


            if(retrived_toc_pages == Number(get_toc_container_page_last_page_number.innerText)){ //hide progress alert
                div_hide_show("please_wait_2", "hide")//hide progress alert busy
            }
            retrived_toc_pages = retrived_toc_pages + 1;//increment pages tracker
            return;
        }









        // console.log(chapter_links_container.book_chapters);
        porpulate_book_details_on_menu();//re populate book selection menu ///OH I LOVE ADDONS DIDNT KNOW THEY COULD BE THIS USEFULL//LOL IT WAS SHITTY CREATING IT EN THE INTERFACE IT INTERACTS WITH CODE//then it was my first time
        alert_1("hide")//show wait alert
    }

    // do_toc_find();//start
   // book_chapter_links()

   
}



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ chapter contents scraping
function chapter_contents_scraping(){

    var book_text = document.getElementById("request_html_container").querySelectorAll("#arrticle p");//table of contants container pages\\
    // console.log(book_text[0].textContent)
    // console.log("::::: ",book_text[0],book_text[0].textContent,book_text)

    //    return book_text[0].textContent;
    var chapter_text = "";//contains chapter texts

    //collect chapter texts
    book_text.forEach(string =>{
        chapter_text = chapter_text  + string.outerText + "<br /> <br />";
        // console.log(string.outerText)

    })

    // console.log(chapter_text)
    
    return chapter_text;

}