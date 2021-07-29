
//----------reusables functions
function div_inner_html(html_div_id = "", html_div_value = ""){//inner html
    document.getElementById(html_div_id).innerHTML = html_div_value;
}
function div_input_value(html_input_id = "", html_input_value = ""){//inner html
    document.getElementById(html_input_id).value = html_input_value;
}
function window_open_blank(url){//window open
    window.open(url,"_blank");//new window
}
function div_hide_show(div_id, action="show"){//hide or show div
    if(action != "show"){
        return document.getElementById(div_id).style.display = "none";
    }
    document.getElementById(div_id).style.display = "block";
}
function alert_box_1(alert_text = "!! Are you sure", yes_button = "", no_button = "", alert_type = "confirm" ){//give yes or no alert confirm box//yes or no can be return function or whatever suitable\

    var yep = "";//yes 
    var nope = "";//no

    if(no_button || no_button.trim().length > 0){//if no button is given
        nope = nope + ',' + no_button;
    }
    if(yes_button || yes_button.trim().length > 0){//if no button is given
        yep = yep + ',' + yes_button;
    }

    document.getElementById("alert_box_1_text").innerHTML=alert_text;//add alert box message;
    if(alert_type == "confirm"){ //add yes ;no buttons
        document.getElementById("alert_box_1_buttons").innerHTML = `<button style="width:150px;height: 25px;background-color: #D40000;border: 2px solid #830404;display: inline-block;border-radius: 30px;margin-left: -21px;color:white" onclick='div_hide_show("alert_box_1", "hide")${yep}'>Yep</button><button style="width:150px;height: 25px;background-color: #90C418;border: 2px solid #597D04;display: inline-block;border-radius: 30px;color:white"  onclick='div_hide_show("alert_box_1", "hide")${nope}'>Nope</button>`;//add buttons, with onclick already embedded
    }
    if(alert_type != "confirm"){ //add okay button//simple alert boc
        document.getElementById("alert_box_1_buttons").innerHTML = `<button style="width:150px;height: 25px;background-color: #D40000;border: 2px solid #830404;display: inline-block;border-radius: 30px;margin-left: -21px;color:white" onclick='div_hide_show("alert_box_1", "hide")${yep}'>Alright</button>`;//add buttons, with onclick already embedded
    }
    div_hide_show("alert_box_1");//show alert
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

//=====================================================================

//++++++++++++++ url main help button
function url_main_help_button(){//open help image
    window.open('/imgs/url_main_help.png', '_blank');
}


// ----------------------------------- enter book url contents (menu 1)  -----------------------------------

//++++++++++++++++++++++ book url 

$("#convert_to_epub_main_input").on('keypress',function(event){//set event listner on table of content url input box
    if(event.keyCode == 13){
        
        var table_of_content_url = document.getElementById("convert_to_epub_main_input").value;
        console.log(table_of_content_url)

        if(table_of_content_url.trim().length < 5 ){//give link error if its shorter than 5 characters
            return alert_box_1(alert_text = "Book TOC link is not provided, or link letters are less than 5.", "", "", "alert" );//give alert//simple alert
        }
    
        rectrive_book_webpage(table_of_content_url)//call website content retriever
    }
});

//send website to server to request webpage
function rectrive_book_webpage(book_url){
    console.log(book_url)
    alert_1("show")//show wait alert
    //clean book link/url
    // book_url = book_url.replace("http://","").replace("https://","");
    //request html
    $.get( "/http_get?site="+book_url, function(results, err){

        if(results == "html_error"){//website connection problem/server or book source
            //alert("Error retrieving book contents.")
            alert_box_1(alert_text = "Error retrieving book contents.", "", "", "alert" );//give alert//simple alert
            alert_1("hide")//hide wait alert
            return console.log(results);
        }
        if(results == "module_error"){//module not aailable
            //alert("Error retrieving book contents.")
            alert_box_1(alert_text = "Error retrieving book contents. <br/> We dont have a default <b>Director Module</b> defined for the website link. Select Custom/user created Director Module amongst those available or create one", "", "", "alert" );//give alert//simple alert
            alert_1("hide")//hide wait alert
            //show bookd details viewer menu
            div_hide_show("book_details_viewer_container");//show
            return console.log(results);
        }
        //console.log(results);
        document.getElementById("request_html_container").innerHTML = results.page_dom; 
        dom_chapter_retriever(results)
        alert_1("hide")//hide wait alert
    })
}


//get book chapters
var chapter_links_container = {
    book_chapters : [],
    book_cover_image_link : "",
    book_website_link : "",
    book_name : "",
    book_language : "<unknown>",
    book_author : "<unknown>",
};


function dom_chapter_retriever(dom){ //director module 'guts'


    chapter_links_container = { //clear of old contents
        book_chapters : [],
        book_cover_image_link : "",
        book_website_link : "",
        book_name : "",
        book_language : "<unknown>",
        book_author : "<unknown>",
    };

    // //select html element containing chapters
    // document.getElementById("request_html_container").querySelectorAll("li.wp-manga-chapter.free-chap a").forEach(function(data){
    //     //loop through result and save link with its text or title
    //     chapter_links_container.book_chapters.unshift({
    //         chapter_link : data.href.trim(),
    //         chapter_link_text : data.textContent.trim(),
    //     })
    //     //get book cover image link
    //     chapter_links_container.book_cover_image_link = document.getElementById("request_html_container").querySelectorAll("div.tab-before-content img")[0].src//query selectorAll returns an array
    //     //get book Name and link
    //     chapter_links_container.book_website_link = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li a")[1].href//book link on website
    //     chapter_links_container.book_name = document.getElementById("request_html_container").querySelectorAll("ol.breadcrumb li")[1].textContent.trim()//book name, taken from book link url name
    //     //get book author
    //     chapter_links_container.book_author = "<unknown>";
    //     //get book language 
    //     chapter_links_container.book_language = ""//change html from server, //insteat of tranferring body dom make it transfer outer <html> or have one transfer outer html and extract language while the outer continue as normal
    // })

 $.getScript("./director_module/" + dom.director_module_to_use + ".js",async function(response,status){
        toc_contents_scraping();//call retrieved module function
        porpulate_book_details_on_menu();//call book infor porpulate;//attempted to send function call inside module, to alliviate any possible to be problem during usage//but rather kee module file simple possible
 });
    // console.log(chapter_links_container);
    // porpulate_book_details_on_menu();//show bok detail viewer
}

//+++++++++ book details view
var chapters_tracker_array = [];//tracks chapters added to book viewer menu 
function porpulate_book_details_on_menu(){
    
    chapters_tracker_array = [];//empty book chapers containers
    //book details

    div_input_value("book_name", chapter_links_container.book_name );//book name

    div_input_value("book_author", chapter_links_container.book_author );//book author

    div_input_value("book_language", chapter_links_container.book_language );//book language

    div_input_value("book_save_name", chapter_links_container.book_name  );//book save name

    div_input_value("book_cover_image_link", chapter_links_container.book_cover_image_link );//book image link
    document.getElementById("book_cover_image").src = chapter_links_container.book_cover_image_link ;//book image

    // sating chapters// ending chapter
    var start_chapters = "";
    var ending_chapters = "";
    var chapters_selection = "";

    chapter_links_container.book_chapters.forEach(function (chapter_details, index){

        start_chapters = start_chapters + `<option value="${index}" style="background-color: #0a0a0a;">${chapter_details.chapter_link_text}</option>`;
        if(chapter_links_container.book_chapters.length !== index -1){
            ending_chapters = ending_chapters + `<option value="${index}" style="background-color: #0a0a0a;" >${chapter_details.chapter_link_text}</option>`;
        }
        if(chapter_links_container.book_chapters.length == index +1){
            ending_chapters = ending_chapters + `<option value="${index}" style="background-color: #0a0a0a;" selected >${chapter_details.chapter_link_text}</option>`;
        }
        
        chapters_selection = chapters_selection + `
            <div style="width: 80%;height: 50px;margin:5px auto;">
                <input id="chapter_${index}_inout" type="checkbox" style="width: 20px; height: 100%;margin: 0px 10px;">
                <div style="width: 60%;height: 100%;font-size: 13px;text-align: center;overflow-x: auto;color:white;display: inline-block;vertical-align: top;line-height: 50px;">
                    ${chapter_details.chapter_link_text}
                </div>
                <button style="width: 53px;height: 50%;background-color:black;border:1px solid white;border-radius: 23px;vertical-align: top;color: white;margin-top: 13px;float: right;" onclick="window_open_blank('${chapter_details.chapter_link}')">
                    Open
                </button>
            </div>`;

        chapters_tracker_array.unshift();//save chapters according to how they added to viewer menu

        //show bookd details viewer menu
        div_hide_show("book_details_viewer_container");//show
    });

    //start/end chapters show
    div_inner_html("book_starting_chapter_selection", start_chapters );//start process on chapter
    div_inner_html("book_ending_chapter_selection", ending_chapters );//end process on chapter
    //selected director module

    //chapter selection
    div_inner_html("chapters_selection_container", chapters_selection );
}

// director module view//module for book site scraping
function view_director_module(){
    alert_box_1(`View '<b style="color:#D40000">${ document.getElementById("book_selected_director_module").value}</b>' director module intestines?`, "","");//give alert
}



//++++++++++ book packing to epub





//rectrive_book_webpage("https://a-t.nu/novel/linker/");



