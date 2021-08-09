

//select html element containing chapters
function toc_contents_scraping(){

    //table of contents (toc) director module contents
 
    // document.getElementById("request_html_container").querySelectorAll("li.wp-manga-chapter.free-chap a").forEach(function (data) {
    //         //loop through result and save link with its text or title
    //         chapter_links_container.book_chapters.unshift({
    //             chapter_link: data.href.trim(),
    //             chapter_link_text: data.textContent.trim(),
    //         })
    //         //get book cover image link
    //         chapter_links_container.book_cover_image_link = document.getElementById("request_html_container").querySelectorAll("div.tab-before-content img")[0].src //query selectorAll returns an array

    //         //get book Name and link
    //         chapter_links_container.book_website_link = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li a")[1].href //book link on website
    //         chapter_links_container.book_name = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li")[1].textContent.trim() //book name, taken from book link url name

    //         //get book author
    //         chapter_links_container.book_author = "<unknown>"
    //         //get book language 
    //         chapter_links_container.book_language = "" //change html from server, //insteat of tranferring body dom make it transfer outer <html> or have one transfer outer html and extract language while the outer continue as normal
    //})
    



    //get table of contents container pages

    function book_chapter_links(){
        
      var links_dom_array = document.getElementById("request_html_container").querySelectorAll(".cat_block a");

      links_dom_array.forEach(function(data, index) {

            //loop through result and save link with its text or title
           if(index > 0){ //to skip "table of contents" link retrived

                chapter_links_container.book_chapters.unshift({
                    chapter_link: data.href.trim().replace(document.location.protocol+document.location.hostname+document.location.port, 'https://ranobes.net'),//replace link referal to local server to remote server hosting the book
                    chapter_link_text: data.textContent.trim().split("\n")[0],//clean chapter names before saving
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
    async function rectrive_book_toc_pages(book_url){
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
                return console.log(results);
            }
            if(results == "module_error"){//module not aailable
                //alert("Error retrieving book contents.")
                alert_box_1(alert_text = "Error retrieving book contents. Table of content pages processing Error :  ", "", "", "alert" );//give alert//simple alert
                alert_1("hide")//hide wait alert
                //show bookd details viewer menu
                div_hide_show("book_details_viewer_container");//show
                return console.log(results);
            }
            //console.log(results);
            document.getElementById("request_html_container").innerHTML = results.page_dom; 
            // dom_chapter_retriever(results)
            // alert_1("hide")//hide wait alert

            book_chapter_links();//call links extrator
        })
        
    }

 
    var toc_container_pages = document.getElementById("request_html_container").querySelectorAll(".pages a");
    var retrived_toc_pages = 0;
    //  console.log(toc_container_pages, toc_container_pages[0].href);

    function do_toc_find(){

        // if(retrived_toc_pages != toc_container_pages.length){
        if(retrived_toc_pages != 1){
            //ask server for page dom
            rectrive_book_toc_pages(toc_container_pages[retrived_toc_pages].href);
            retrived_toc_pages = retrived_toc_pages + 1;//increment pages tracker
            return;
        }
        console.log(chapter_links_container.book_chapters);
        porpulate_book_details_on_menu();//re populate book selection menu ///OH I LOVE ADDONS DIDNT KNOW THEY COULD BE THIS USEFULL//LOL IT WAS SHITTY CREATING IT EN THE INTERFACE IT INTERACTS WITH CODE//then it was my first time
        alert_1("hide")//show wait alert
    }

    // do_toc_find();//start
    book_chapter_links()

   
}



//chapter contents scraping
function chapter_contents_scraping(){

    let text = "";
    var text_arrange = {
        before : "",
        middle : "",
        after : "",
    }

    for (const child of children(document.querySelector('div.text-left'))) {

        if (child.nodeType === 1) { //if node type is not normal

            const before = window.getComputedStyle(child, '::before').getPropertyValue('content');//get before node content value

                if (before && before !== 'none') {//check if before

                    text_arrange.before = before.replace(/^['"]/, '').replace(/['"]$/, '');//clean retrived value en save to before object

                }
                const after = window.getComputedStyle(child, '::after').getPropertyValue('content');

                if (after && after !== 'none') {

                    text_arrange.after = after.replace(/^['"]/, '').replace(/['"]$/, '');
                    
                }
        } 
        if (child.nodeType === 3) {//check if its normal div node

            if(child.textContent.search("::after") == -1 || child.textContent.search("::before") == -1){//check if it does not contain [ ::before / ::after will be contained by css in the page that defines the before/after content value ] if not contained, 
                text_arrange.middle = child.textContent;// add to node content text to middle object

               // text.push( text_arrange.before + text_arrange.middle + text_arrange.after)//arrange the text in right order and add sentence to array
                text = text + text_arrange.before + text_arrange.middle + text_arrange.after;
            }
        }
    }


    // console.log(text.toString());
    
    function children(node) {//extract div element child nodes 

        const ret = [];

        for (let i = 0; i < node.childNodes.length; i++) {

            const child = node.childNodes[i];
            ret.push(child, ...children(child));//save to array
            
        }
        // console.log(ret)

        return ret;
    }

   return text.toString();

}