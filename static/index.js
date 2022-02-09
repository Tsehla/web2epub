//==================== internal navigation
var url_hostname = window.location.hostname;//server hot
var url_query = window.location.search;//site webpage query
var url_port = window.location.port;//site port
if(url_port){//process port
    url_port = ":"+ url_port;
}
var url_protocol = window.location.protocol;//site protocol
if(url_protocol){//process
    url_protocol = url_protocol + "://";
}
var url_pathname = window.location.pathname;//sith pathname
//window.history.pushState("","",url_protocol+url_hostname+url_port+url_pathname+url_query);


(function(){//when page loads auto run
   // console.log("::: "+url_protocol+"//"+url_hostname+url_port+url_pathname+url_query )
    
   if(url_query == "?menu-start"){//if
        div_hide_show("load_screen", "hide"); main_menu_upper_layer_show();div_hide_show('convert_to_epub_menu_container');div_hide_show('process_start_restart_option_button');//do
    }





})()

//simulate old website page navigation
function menu_1(){//start menu menu 1
    window.history.pushState("","","?menu-start");//add link to history
}


//----------reusables functions
//dom editor
function div_inner_html(html_div_id = "", html_div_value = ""){//inner html
    document.getElementById(html_div_id).innerHTML = html_div_value;
}
function div_input_value(html_input_id = "", html_input_value = ""){//inner html
    document.getElementById(html_input_id).value = html_input_value;
}
function div_get_inut_value(html_input_id ){//get html input element value
    document.getElementById(html_input_id ).value
}
function div_get_element_value(html_input_id = ""){//div html text value
    document.getElementById(html_input_id).innerText;
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
//text notification
function text_notification (notification_text = "Hello"){ //

    //change notification text
    div_hide_show("text_notification_container");
    //show notification
    div_inner_html("text_notification", notification_text);
    //set notification hide timer
   setTimeout( function (){div_hide_show("text_notification_container","hide")}, 3000);//hide notification
}
//function page reload
function page_reload(){
    window.open(window.location.href, "_self")
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
var body_toc_book_name = "";//save book table of content url
$("#convert_to_epub_main_input").on('keypress',function(event){//set event listner on table of content url input box
    if(event.keyCode == 13){

        //reset of old contents //when new processing is started without page reload
        check_chapters_checkbox_array = [];//saved links to check chapters
        retrived_chapter_link_text = [];//save retrived and processed chapter text
        chapter_number = 0; //reset

        
        var table_of_content_url = document.getElementById("convert_to_epub_main_input").value;
        // console.log(table_of_content_url)

        if(table_of_content_url.trim().length < 5 ){//give link error if its shorter than 5 characters
            return alert_box_1(alert_text = "Book TOC link is not provided, or link letters are less than 5.", "", "", "alert" );//give alert//simple alert
        }
    
        rectrive_book_webpage(table_of_content_url)//call website content retriever
        body_toc_book_name = table_of_content_url;//save
    }
});

//send website to server to request webpage
function rectrive_book_webpage(book_url){
   // console.log(book_url)
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

var director_script_retrive = ""; //reference retrived director scriptfor specified website
var director_module_link = "";//stores working module link
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
        director_module_link = "./director_module/" + dom.director_module_to_use + ".js"; //save module link for later
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
    var chapters_selection = "";//contains chapter selection html to show

    chapter_links_container.book_chapters.forEach(function (chapter_details, index){

        start_chapters = start_chapters + `<option value="${index}" style="background-color: #0a0a0a;">${chapter_details.chapter_link_text}</option>`;
        if(chapter_links_container.book_chapters.length -1 !== index ){//end before last chapter item
            ending_chapters = ending_chapters + `<option value="${index}" style="background-color: #0a0a0a;" >${chapter_details.chapter_link_text}</option>`;
        }
        if(chapter_links_container.book_chapters.length == index +1){//set last selection as selected
            ending_chapters = ending_chapters + `<option value="${index}" style="background-color: #0a0a0a;" selected >${chapter_details.chapter_link_text}</option>`;
        }
        
        chapters_selection = chapters_selection + `
            <div style="width: 80%;height: 50px;margin:5px auto;">
                <input id="chapter_${index}_inout" type="checkbox" checked name="${index}" style="width: 20px; height: 100%;margin: 0px 10px;">
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
    div_inner_html("selection_total_chaters", chapter_links_container.book_chapters.length );//set chapters total
    //selected director module

    //chapter selection
    div_inner_html("chapters_selection_container", chapters_selection );
}

// director module view//module for book site scraping
function view_director_module(){
    alert_box_1(`View '<b style="color:#D40000">${ document.getElementById("book_selected_director_module").value}</b>' director module intestines?`, "","");//give alert
}

//------------------ multi book option/buttons
//chapters select/unselect all
function chapters_select_unselect_all(action_type){

    //if unselect all
    if(action_type == "uncheck-all"){
        $('#chapters_selection_container input').each(function(){
            $(this).prop('checked', false);
        });
    }

    //if select all 
    if(action_type == "check-all"){
        $('#chapters_selection_container input').each(function(){
            $(this).prop('checked', true);
        });
    }
}

//++++++++++ book packing to epub
var check_chapters_checkbox_array = [];//saved links to check chapters
var retrived_chapter_link_text = [];//save retrived and processed chapter text
function epub_pack(){


    //reset if run withut page reload
    check_chapters_checkbox_array = [];//saved links to check chapters
    retrived_chapter_link_text = [];//save retrived and processed chapter text
    chapter_number = 0; //reset

    //get book selected chapters
    ////   check if quick select option is chosen and use it, if no change then check the second below {CHOOSING BELOW WILL CHECK OR UNCHEK CHAPTERS ON CHAPTER VIEW}
    //// var selected_start_chapters = div_get_inut_value("book_starting_chapter_selection");//get book set start chapter
    //// var selected_ending_chapters = div_get_inut_value("book_ending_chapter_selection");//get book end chapter

      //retrive checked chapters only
    //   var check_chapters_checkbox_array = [];//saved links to check chapters
    //   var retrived_chapter_link_text = [];//save retrived and processed chapter text

    //cover image
    //get wesite domain
    var original_site_domain_url = document.getElementById("book_cover_image_link").value.toLowerCase().replace("http://www", "").replace("https://www","").replace("http://", "").replace("https://","").split("");//remove those//then turn to array

    var cleaned_site_domain_url ="";//final book site domain

    for(a of original_site_domain_url){//loop through url string turned array
            
        if(a == "/" || a == "?"){ //end loop if any of the array characters is any of those
            break;
        }

        cleaned_site_domain_url = cleaned_site_domain_url + a;//connect array loop thingies to form a string which is our domain 
    }

    retrived_chapter_link_text.push({ //add book toc
        title: document.getElementById("book_name").value,
        data: `<div style="width:100%;height:100%;text-align:center">
            <img src="${document.getElementById("book_cover_image_link").value}" style="width:100%;margin-top:20%;margin-left:auto;margin-right:auto">
            <div style="width:100%;height:auto;font-weight:800;margin-top:5px">
            book Table Of Content link : 
            </div>
            <div style="width:100%;height:auto">
            ${body_toc_book_name}
            </div>
            <div style="width:100%;height:auto;font-weight:800;margin-top:5px">
            Author : 
            </div>
            <div style="width:100%;height:auto;">
            ${cleaned_site_domain_url}
            </div>
            <div style="width:100%;height:auto;font-weight:800;margin-top:5px">
            Packed by :
            </div>
            <div style="width:100%;height:auto;">
            ${window.location.protocol + '://' + window.location.hostname}
            </div>
            </div>`
    })

    var checked_book_divs = $('#chapters_selection_container input:checked');//get checked, checkboxex if any

    if(checked_book_divs.length < 1){//check if any checkboxes were checked
            
          return alert_box_1(`Select some chapters to transform to epub.`, "","","alert");//give alert;//if not give err
    }
    
    checked_book_divs.each(function() {//get input check within the div then loop 
        check_chapters_checkbox_array.push(chapter_links_container.book_chapters[Number($(this).attr('name'))]);//get checkbox div node name, turn result to number, retrive chapter link matching position number in array indexes, save link to new array
        // });

        //   console.log(check_chapters_checkbox_array)

        //book advanced option ---------

        //create epub 3 ---------

        //set download request timer. but kinda useless without a proxy ------------

        request_chapter_webpage();//start chapter processing

    })
    //request chapter webage from server
    var chapter_number = 0;//track processed chapters

    function request_chapter_webpage(its_continue){

        if(its_continue && chapter_number > 1){ //if continue button pressed
            chapter_number = chapter_number -1; //start on previus chapter for continue
            retrived_chapter_link_text.pop();//
            text_notification ('Attempting to Continue');
        }
        
        if(its_continue && chapter_number < 1){ //if continue button pressed and no previus chapters where processed
           return;//end request
        }

        //clean alert 2
        div_inner_html("please_wait_2_wait_text", "Please wait ..." );//wait text
        div_inner_html("please_wait_2_chapter_name", check_chapters_checkbox_array[chapter_number].chapter_link_text );//curretn chapter 
        div_inner_html("please_wait_2_chapter_numbers", chapter_number+'/'+check_chapters_checkbox_array.length);//current chapter of total
        document.getElementById("please_wait_2_chapter_progress").style.width = (chapter_number/check_chapters_checkbox_array.length)*100 +"%";//progress bar

        div_hide_show("please_wait_2")//show busy

        var turbo_mode = document.getElementById("page_load_turbo_mode").checked;//turbo mode

        $.get("/http_get?site=" + check_chapters_checkbox_array[chapter_number].chapter_link+"&turbo_mode="+turbo_mode, async function(results, err){

            if(results == "html_error" || err !== "success"){
                div_hide_show("please_wait_2", "hide");//hide busy
                console.log("chapter content request erro : " + err)

                //do retry if allowed
                auto_continue();

                return  alert_box_1(`Error requesting ${check_chapters_checkbox_array[chapter_number].chapter_link_text}, from server .`, "","","alert");//give alert;//if not give err
            }

            //get chapteer book contents
            // console.log(results);
            document.getElementById("request_html_container").innerHTML = results.page_dom;

            //retrieve book chapter text
            $.getScript({ //make request synchronus or blocking 

                url : director_module_link, 

                success : function(response,status){//retrive director module
                    
                    // console.log(chapter_contents_scraping())
                    
                    retrived_chapter_link_text.push({//create chapter object en save to array

                        data:chapter_contents_scraping(), title: check_chapters_checkbox_array[chapter_number].chapter_link_text,

                    })//call book chapter director module scraping function

                    request_epub_create();//call to check


                },

                async:false
            }); //HANDLE ERROR                 // div_hide_show("please_wait_1", "hide");//hide busy
            // //show errer
            // alert_box_1(alert_text = "No chapters could be found using selected 'Director Module on this wensite.'",create_epub(), "", "alert" )
    
        

            //process next chapter
            chapter_number = chapter_number + 1;//increment chapters retrieved tracker

            if(chapter_number != check_chapters_checkbox_array.length ){//check if their are chapters to process
                //if so call function
                request_chapter_webpage();//call
            }

           function request_epub_create(){
                if(chapter_number + 1 == check_chapters_checkbox_array.length  ){ //if array end
                    // console.log(chapter_number + 1 , check_chapters_checkbox_array.length)
                    create_epub()
                }
           }     
        })
    }
    // request_chapter_webpage();//start chapter processing
 

    //request epub of book from server
    function create_epub(){
       
        //update progress
        div_inner_html("please_wait_2_wait_text", "Now, using Vodoo to Create Epub file" );//wait text
       
        //get book details
        var book_name = document.getElementById("book_name").value;//get book name
        var book_author = document.getElementById("book_author").value;//get book author
        var book_language = document.getElementById("book_language").value;//get book language
        var book_save_name = document.getElementById("book_save_name").value;//get book save name
        var book_cover_image_link = document.getElementById("book_cover_image_link").value;//get book cover image url
 

        // console.log(retrived_chapter_link_text.toString())
        $.post("/cook_epub" ,{book_toc_link:body_toc_book_name,book_name:book_name,book_author:book_author,book_language:book_language,book_save_name:book_save_name,book_cover_image_link:book_cover_image_link,book_chapters:retrived_chapter_link_text}, function(results, err){
    
            if(results == "epub_err" || err !== "success"){
                console.log(results,err);
                div_hide_show("please_wait_2", "hide");//hide busy
                //show errer
                // alert_box_1(alert_text = "Problem producing epub, Retry?<br>#Tip try to reduce chapters if error persists.", yes_button = create_epub(), no_button = "", alert_type = "alert" )
                alert_box_1(alert_text = "Problem producing epub, Retry?<br>#Tip try to reduce chapters if error persists.", create_epub(), "",  "alert" )
                
            }
            //give download link
            div_hide_show("please_wait_2", "hide");//hide busy
            //show download link
           // epub_download(results);//start auto download//popup block issue
            //give alert
            alert_box_1(alert_text = "File Ready, re-download?<br>No download, enable popup for this", epub_download(results), "", "confirm" )
            
        });
    }

};

function epub_download(url){//download produced epub
    window.open(url, "_blank")
}


//if program experiences internet connection error//this does not apply to when program hangs
var auto_continue = true;//if auto continue is allowed by user

var auto_continue_retries = 0; //will retry 30 times max

function auto_continue(){

    if(auto_continue == false || auto_continue_retries == 50){ //if fifty retries
        return;// end retries
    }
    setTimeout(request_chapter_webpage(its_continue), 5000); 

    alert_1("hide")//hide wait alert

    auto_continue_retries = auto_continue_retries + 1; //increment auto continue
}



//rectrive_book_webpage("https://a-t.nu/novel/linker/");



