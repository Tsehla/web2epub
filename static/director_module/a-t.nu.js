

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