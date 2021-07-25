

//select html element containing chapters
function toc_contents_scraping(){

    //table of contents (toc) director module contents
 
    document.getElementById("request_html_container").querySelectorAll("li.wp-manga-chapter.free-chap a").forEach(function (data) {
            //loop through result and save link with its text or title
            chapter_links_container.book_chapters.unshift({
                chapter_link: data.href.trim(),
                chapter_link_text: data.textContent.trim(),
            })
            //get book cover image link
            chapter_links_container.book_cover_image_link = document.getElementById("request_html_container").querySelectorAll("div.tab-before-content img")[0].src //query selectorAll returns an array

            //get book Name and link
            chapter_links_container.book_website_link = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li a")[1].href //book link on website
            chapter_links_container.book_name = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li")[1].textContent.trim() //book name, taken from book link url name

            //get book author
            chapter_links_container.book_author = "<unknown>"
            //get book language 
            chapter_links_container.book_language = "" //change html from server, //insteat of tranferring body dom make it transfer outer <html> or have one transfer outer html and extract language while the outer continue as normal
        })
   
}


//chapter contents scraping
function chapter_contents_scraping(){

    //chapter director module contents

}