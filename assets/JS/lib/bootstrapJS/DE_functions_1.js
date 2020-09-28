var tablerow = `<td class="hidden-delete pl-3 pl-4" id="delete-row"><i class="fa fa-trash-o" aria-hidden="true"></i> </td>
                <td class="SDRL" id="header-SDRL-num" ></td>
                <td class="SDT" id="header-SDT-num"></td>
                <td class="Pre_or_Final" id="header-pre-or-final"> </td>
                <td class="Effectivity" id="header-Effectivity" ></td>
                <td class="Change_Title" id="header-change-title"></td>
                <td class="Urgency_Level" id="header-urgency"></td>
                <td class="Review_Status" id="header-review-status"></td>
                <td type="button" role="button" class="More" id="edit-action" onclick="openForm(this.id)"><i class="fa float-right fa-arrow-right" aria-hidden="true"></i>
                </td>`
var popup = `<form action="/action_page.php" class="form_container">
                <fieldset>
                <legend>RAC Form: </legend>
                <div>
                    <p>If the RAC was submitted by <em>Collins Aerospace</em> you can upload their RAC Form to automatically extract data and populate the form.</p>
                    <div class="input-group input-group-sm mb-3">
                        <input type="text" id="filepath" disabled class="form-control " placeholder="Choose RAC Form File" aria-label="">
                        <div class="input-group-append">
                            <span id="RAC-Form-Processing-Wait" class="wait"></span>
                            <button type="button" class="btn btn-outline-secondary" id="browse">Upload Form</button>
                        </div>
                    </div>
                </div>
                </fieldset>
                <fieldset>
                <legend>Airplane Info: </legend>
                <div>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Search first applicable effectivity's info</span>
                        </div>
                        <input type="text" class="form-control" id="search-for-airplane-info" placeholder="Effectivity">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="search-for-airplane-info-button">Search</button>
                        </div>
                    </div>
                    <hr>
                    <span class="no_wrap">
                        <label for="Airplane-Model">Airplane Model:</label>
                        <input required type="text" id="Airplane-Model" name="Airplane-Model">
                    </span>
                    <span class="no_wrap">
                        <label for="Effectivity">First Occurance Effectivity:</label>
                        <input required type="text" name="Effectivity" id="Effectivity" oninput="updateHeader(this.id)">

                    </span>
                    <span class="no_wrap">
                        <label for="L/N">LN:</label>
                        <input required type="text" id="L/N" name="L/N">
                    </span>
                    <span class="no_wrap">
                        <label for="Block">Effectivity Block:</label>
                        <input required type="text" name="Block" id="Block">
                    </span>
                    <span class="no_wrap">
                        <label for="Customer">Customer:</label>
                        <input required type="text" id="Customer" name="Customer">
                    </span>
                    <span class="no_wrap">
                        <label for="LOPA">LOPA:</label>
                        <a href="" id="LOPA" target="_blank"></a>
                    </span>
                </div>
            </fieldset>
            <fieldset>
                <legend>Seat/Furniture Info:</legend>
                <div>
                    <span class="no_wrap">
                        <label for="Affected-Class">Affected Class:</label>
                        <select id="Affected-Class" name="Affectd-Class">
                            <option value = "Business">Business Class</option>
                            <option value = "Economy">Economy Class</option>
                            <option value = "Tourist">Tourist Class</option>
                            <option value = "First">First Class</option>
                        </select>
                    </span>
                    <span class="no_wrap">
                        <label for="Affected-Model">Affected-Model:</label>
                        <input required type="text"  id="Affected-Model" name="Affected-Model">
                    </span>
                    <span class="no_wrap">
                        <label for="Env-Dwg">Envelope Drawing:</label>
                        <input required type="text"  id="Env-Dwg" name="Env-Dwg">
                    </span>
                    <span class="no_wrap">
                        <label for="Layout-Dwg">Layout Drawing:</label>
                        <input required type="text"  id="Layout-Dwg" name="Layout-Dwg">
                    </span>
                    <span class = "no_wrap">
                        <label for="Supplier">Seat/Furniture Supplier:</label>
                        <input required type="text" id="Supplier" name="Supplier">
                    </span>
                    <div>
                        <label>REDARS Loaded Drawings:</label>
                        <button type = "button" id="query-for-Dwg" onclick="queryForDwg(this.id)">Search Drawings</button>
                        <br>
                        <table id="drawings-table"></table>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Change Info:</legend>
                <span class="no_wrap">
                    <label for="change-title">Change Title:</label>
                    <input required type="text"  class="change-title" id="change-title" oninput="updateHeader(this.id)" maxlength = "25">
                </span>
                <span class="no_wrap">
                    <label for="SDRL-num">SDRL#:</label>
                    <input required type="text"  id="SDRL-num" name="SDRL-num" oninput="updateHeader(this.id)">
                </span>
                <span class="no_wrap">
                    <label for="SDT-num">SDT#:</label>
                    <input required type="text"  id="SDT-num" name="SDT-num" oninput="updateHeader(this.id)">
                </span>
                <span class="no_wrap">
                    <label for="Pre-or-Final">Pre/Final:</label>
                    <select name="Pre_or_Final" id="pre-or-final" onchange = "customizeForm(this.id)">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Pre">Pre-RAC</option>
                        <option value="Final">Final-RAC</option>
                    </select>
                </span>
                <span class="no_wrap" id="Pre-for-Final-span">
                    <label for="Pre-for-Final">Pre-RAC SDT#:</label>
                    <input required type="text"  id="Pre-for-Final" name="Pre-for-Final">
                </span>
                <span class="now_wrap" id="Pre-for-Final-retrieve-span">
                    <label for="Pre-for-Final-retrieve"> Retrieve Pre-RAC Data:</label>
                    <button type = "button" id = "Pre-for-Final-retrieve" onclick="retrievePreRACData(this.id)">Retrieve</button>
                </span>
                <span class="no_wrap">
                    <label for="change-affects">Change Affects:</label>
                    <input required type="text"  id="change-affects" name="change-affects">
                </span>
                <br>
                <label for="Brief-DoC">Brief Description of Change:</label><br>
                <div class ="textarea-container">
                    <textarea required class = "textarea" name="Brief-DoC" id="Brief-DoC" cols="80" rows="2"></textarea>
                    <button type = "button" onclick="copyToClipboard(this)">Copy to Clipboard</button>
                </div>
                <label for="reason-for-change">Reason for Change:</label><br>
                <div class="textarea-container">
                    <textarea required class="textarea" id="reason-for-change" cols="80" rows="2"></textarea>
                    <button type = "button" onclick="copyToClipboard(this)">Copy to Clipboard</button>
                </div>
            </fieldset>
            <fieldset>
                <legend>Logistics:</legend>
                <span class="no_wrap">
                    <label for="urgency">Review Urgency:</label>
                    <input required type="text"  name="urgency" id="urgency" oninput="updateHeader(this.id)">
                </span>
                <span class="no_wrap">
                    <label for="ship-date">Ship Date:</label>
                    <input required type="text"  name="ship-date" id="ship-date">
                </span>
                <span class="no_wrap">
                    <label for="on-dock-date">On Dock Date:</label>
                    <input required type="text"  name="on-dock-date" id="on-dock-date">
                </span>
                <span class="no_wrap">
                    <label for="shipping-matrix">Shipping Matrix Affected:</label>
                    <input required type="text"  name="shipping-matrix" id="shipping-matrix">
                </span>
                <span>
                    <button id="detail-logistics" type = "button" onclick= "displayLogistics(this.id)">Display in Detail</button>
                    <span id="logistics-wait" class="wait"></span>
                    <table id="logistics-table" class="logistics-table"></table>
                    <span class = "no_wrap">
                        <button class="refresh-logistics" id="refresh-logistics" type = "button" onclick= "displayLogistics(this.id)"> Refresh </button>
                        <button class="close-logistics-details" id="close-logistics-details" type = "button" onclick = "document.location.reload(true)"> Close Detail </button>
                    </span>
                </span>
            </fieldset>
            <fieldset>
                <legend>Cert Info:</legend>
                <span class="no_wrap">
                    <label for="cert-plan">CP Number:</label>
                    <input type="text" name="cert-plan" id="cert-plan">
                </span>
                <span class="no_wrap">
                    <label for="FAA">FAA:</label>
                    <input required type="text"  id="FAA" name="FAA" value="YES" disabled>
                </span>
                <span class="no_wrap">
                    <label for="EASA">EASA:</label>
                    <select name="EASA" id="EASA">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="True">Yes</option>
                        <option value="False">N/A</option>
                    </select>
                </span>
                <span class="no_wrap">
                    <label for="CAAC">CAAC:</label>
                    <select name="CAAC" id="CAAC">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="CAAC-Yes">Yes</option>
                        <option value="CAAC-No">N/A</option>
                    </select>
                </span>
                <span class="no_wrap">
                    <label for="other-cert"> Other Cert:</label>
                    <input required type="text"  name="other-cert" id="other-cert">
                </span>
                <span class="no_wrap">
                    <label for="HIC">HIC:</label>
                    <select name="HIC" id="HIC">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Yes">Yes</option>
                        <option value="N/A">N/A</option>
                        <option value="Check">Needs Verification</option>
                    </select>
                </span>
                <span class="no_wrap">
                    <label for="HIC-exceptions">HIC Exceptions:</label>
                    <input type="text" name="HIC-exceptions" id="HIC-exceptions">
                </span>
            </fieldset>
            <fieldset>
                <legend>Review Info/ Actions:</legend>
                <label for="mm-proposal">Proposed M/M Deterimination and Justification:</label><br>
                <div class="textarea-container">
                    <textarea required class = "textarea" name="mm-proposal" id="mm-proposal" cols="80" rows="2"></textarea>
                    <button type="button" onclick="copyToClipboard(this)">Copy to Clipboard</button>
                </div>
                <span class="no_wrap">
                    <label for="create-DoC">Create DoC Form:</label>
                    <button type = "button" id="create-DoC" onclick="createDoC(this.id)">Create DoC</button>
                    <br>
                </span>
                <span class="no_wrap">
                    <label for="email-flamm">Email Flamm DAE:</label>
                    <button type = "button" id="email-flamm" onclick="generateEmail(this.id)" >Generate Email</button>
                    <br>
                </span>
                <span class="no_wrap" id="IRCSPEED-review-by-span">
                    <label for="IRCSPEED-review-by">IRCSPEED Due Date:</label>
                    <input required type="date" name="IRCSPEED-review-by" id="IRCSPEED-review-by">
                </span>
                <span class="no_wrap" id="create-IRC-package-span">
                    <label for="create-IRCSPEED-package">Create IRCSPEED Package:</label>
                    <button type = "button" id="create-IRCSPEED-package" onclick = "createIRCSPEEDPackage(this.id)">Create Package</button>
                    <p >(Choose attachment file when prompted)</p>
                </span>
                <span class="no_wrap" id="update-IRC-package-span" display="none">
                    <label>Update IRCSPEED Package:</label>
                    <span>Use link below </span>
                </span>
                <span class="no_wrap">
                    <label for="IRC-TR-number">IRCSPEED TR#:</label>
                    <a href=""  id="IRC-TR-number" target="_blank" ></a>
                    <br>
                </span>
                <h3>Internal and Joint Reviews:</h3>
                <span class="no_wrap" id="pre-RAC-DAE-review-span">
                    <label for="Pre-RAC-DAE-review-date">Pre-RAC DAE Review:</label>
                    <input required type="date" name="Pre-RAC-DAE-review-date" id="Pre-RAC-DAE-review-date">
                </span>
                <span class="no_wrap">
                    <label for="joint-review-date">Stress and Interior Cert Review:</label>
                    <input  required type="date" name="joint-review-date" id="joint-review-date">
                    <br>
                </span>
                <label for="joint-review-notes">Stress and Interior Cert Review Notes:</label><br>
                <div class="textarea-container">
                    <textarea class="textarea" name="joint-review-notes" id="joint-review-notes" cols="80" rows="2"></textarea>
                    <button type="button" onclick="copyToClipboard(this)">Copy to Clipboard</button>
                </div>
                <span class="no_wrap" id="send-to-DAE-span">
                    <label for="send-to-DAE">Send Final-RAC to DAEs:</label>
                    <button type = "button" id="send-to-DAE" onclick="sendToDAE(this.id)">Send to DAE</button>
                </span>
                <h3 id="pre-determinations"> Preliminary Determinations:</h3>
                <h3 id="final-determinations">Final-RAC Determinations:</h3>
                <span class="no_wrap">
                    <label for="seats-determination">Seats:</label>
                    <select name="seats-determination" id="seats-determination">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="NAC">NAC</option>
                    </select>                    
                </span>
                <span class="no_wrap">
                    <label for="stress-determination">Seats Stress:</label>
                    <select name="stress-determination" id="stress-determination">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="NAC">NAC</option>
                    </select>                    
                </span>
                <span class="no_wrap">
                    <label for="ic-determination">Interior Cert:</label>
                    <select name="ic-determination" id="ic-determination">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="NAC">NAC</option>
                    </select>                    
                </span>
                <span class="no_wrap">
                    <label for="flamm-determination">Flamm:</label>
                    <select name="flamm-determination" id="flamm-determination">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="NAC">NAC</option>
                    </select>                    
                </span>
                <span class="no_wrap">
                    <label for="electrical-determination">Electrical:</label>
                    <select name="electrical-determination" id="electrical-determination">
                        <option disabled selected value>-------- pick one -------- </option>                        
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="NAC">NAC</option>
                        <option value="not-routed">Not Routed</option>
                    </select>                    
                </span>
                <span class="no_wrap">
                    <label for="overall-determination">Overall:</label>
                    <select name="overall-determination" id="overall-determination">
                        <option disabled selected value>-------- pick one --------</option>                        
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                    </select>   
                </span>
                <br>
                <h3>Review Status:</h3>

                <select class="review-status" size="7" name = "review-status[]" id = "review-status" onchange="updateHeader(this.id)" multiple>
                    <option value = "In review by Seat DE">In Review by Seat DE</option>
                    <option value = "In review by Seat DAE">In Review by Seat DAE</option>
                    <option value = "In review by Seat Stress">In Review by Seat Stress</option>
                    <option value = "In review by Seat Flamm">In Review by Seat Flamm</option>
                    <option value = "In review by Seat Electrical">In Review by Seat Electrical</option>
                    <option value = "In review by Interior Cert">In Review by Interior Cert</option>
                    <option value = "Completed">Review Complete</option>
                </select>
                <p> Hold down the Ctrl (windows) or Command (Mac) button to select multiple options</p>
                <h3>Additional notes:</h3>
                <div class = "textarea-container">
                    <textarea class="textarea" id="additional-notes" cols="80" rows="2"></textarea>
                    <button type = "button" onclick = "copyToClipboard(this)">Copy to Clipboard</button>
                </div>
                <h3>SDT Actions:</h3>
                <button type="button" ><a id="go-to-sdt" href="#" target="_blank">Go to SDT</a></button>
                
                <button type="button" id="generate-SDT-comment" onclick="showSDTComment(this.id)">Gen SDT Comment</button>
                <br>
                <p class="no_wrap" id="comment-instruction"></p>
                <div class ="textarea-container SDT-comment" id = "SDT-comment-container">
                    <textarea id="SDT-comment-textarea" class="textarea"></textarea>
                    <button type = "button" id="copy-comment" onclick="copyToClipboard(this)">Copy to Clipboard</button>
                </div>
                <h3>Form Actions:</h3>
                <button type="button" id="save-form" onclick = "saveInfo(this.id)">Save Form</button>
                <button type="button" id="close-form" onclick="closeForm(this.id)">Close Form</button>
                <button type="button" id="delete-form" onclick="deleteInfo(this.id)">Delete Form</button>
            </fieldset>
        </form>`

var global = this;
var sending_info;
var getting_info;
var userName;
var SDTList;
var dbEntries;
var caption = document.getElementById("caption");
// below information could also be placed in DB 
var SDT_Users = {
    Beemnet_A_Workeneh: {
        userNumber: '388459',
        userPhone: '425-306-1801',
    }
}


window.addEventListener("pywebviewready", getDB);
async function getDB() {
    displayUserName();
    try {
        SDTList = await loadDB();
    } catch (err) {
        showOnPage(err);
    }

    for (SDT = 0; SDT < SDTList.length; SDT++) {
        try {
            customizeForm(SDTList[SDT]);
        } catch (err) {
            showOnPage(err)
        }

        // document.querySelectorAll(".table-fix-head").forEach(el =>
        //     el.addEventListener("scroll", tableFixHead)
        // );
    }
}

function tableFixHead(e) {
    alert("scrolling")
    const el = e.target,
        sT = el.scrollTop;
    el.querySelectorAll("thead th").forEach(th =>
        th.style.transform = `translateY(${sT}px)`
    );
}
// window.onload = async function() {
//     var tempval = await displayUserName;
//     // tempval = await loadDB;
//     alert("nlke")
// }
async function displayUserName() {

    userName = await pywebview.api.displayUserName();
    document.getElementById("userName").innerHTML = userName;
}

async function loadDB() {
    dbEntries = await pywebview.api.pullFromDB();
    var sdt_list = [];
    caption.innerHTML = "There are " + dbEntries.length + " entries in the current database table "
    for (var transmittal = 0; transmittal < dbEntries.length; transmittal++) {
        var currentSDT = dbEntries[transmittal].SDT_Number;
        // showOnPage(currentSDT);

        var newtr = document.createElement('tr');
        newtr.innerHTML = tablerow;
        newtr.className = "Transmittal";
        newtr.id = 'tr-' + currentSDT;
        var newtr_elements = newtr.querySelectorAll('td');
        for (var element = 0; element < newtr_elements.length; element++) {
            newtr_elements[element].id = newtr_elements[element].id + '-' + currentSDT;
            // showOnPage(newtr_elements[element].id);
        }
        document.getElementById('Change_Table').appendChild(newtr);

        var newpopupTr = document.createElement('tr');

        var newpopup = document.createElement('td');
        newpopup.colSpan = "8";
        newpopup.innerHTML = popup;
        newpopup.className = "form_popup";
        newpopup.id = 'popup-' + currentSDT;
        var newpopup_elements = newpopup.querySelectorAll('*');
        for (var element = 0; element < newpopup_elements.length; element++) {
            if (newpopup_elements[element].id != "") {
                if (newpopup_elements[element].id == "go-to-sdt") {
                    var SDT_User_Id = SDT_Users[userName.userNumber];
                    var SDT_Url = 'https://csdtprod.web.boeing.com/sdt_sea_prod/cgi-bin/sdt_secondary_screen.cgi?sdtnum=' + currentSDT + '&selected_user=' + SDT_User_Id;
                    newpopup_elements[element].href = SDT_Url;
                }
                newpopup_elements[element].id = newpopup_elements[element].id + '-' + currentSDT;

            }
        }
        newpopupTr.appendChild(newpopup);
        document.getElementById('Change_Table').appendChild(newpopupTr);
        displayInfo(dbEntries[transmittal]);
        sdt_list.push(dbEntries[transmittal].SDT_Number);
        //try reopening forms that may be open 
        try {
            var popupform = localStorage.getItem(currentSDT);
            if (popupform === 'true') {
                document.getElementById('edit-action-' + currentSDT).click();
            }
        } catch (err) {
            showOnPage(err);
        }
        try {
            var scrollposY = localStorage.getItem('scrollposY');
            var scrollposX = localStorage.getItem('scrollposX');
            if (scrollposX && scrollposY) window.scrollTo(scrollposX, scrollposY);
        } catch (err) {
            showOnPage(err);
        }

    }

    return sdt_list
}



async function createIRCSPEEDPackage(sentId) {
    var uniqueSDT = sentId.replace("create-IRCSPEED-package-", "");
    var changeTitle = document.getElementById("change-title-" + uniqueSDT).value;
    if (changeTitle != "") {
        var tempval = await IRCSPEEDPackage(uniqueSDT);
        localStorage.setItem('scrollposY', window.scrollY);
        localStorage.setItem('scrollposX', window.scrollX);
        location.reload(true);
        tempval = await document.location.reload(true);
        localStorage.setItem(uniqueSDT, 'true');
    } else {
        alert("Change Title cannot be empty.")
    }

}

async function IRCSPEEDPackage(uniqueSDT) {
    var tempval = await saveInfo(uniqueSDT);
    // Then call the function to create or update the package
    tempval = await pywebview.api.IRCSPEEDPackage(uniqueSDT);
    return tempval

}

// document.getElementById("start-new").onclick = function() {
//     newRACProcess();
// };

// function newRACProcess() {
//     document.getElementById("process-new-RAC-div").style.display = "block";
//     document.getElementById("start-new").style.backgroundColor = "rgb(30, 72, 134)";
// }

document.getElementById("query-for-sdt").onclick = queryForSDT;

async function queryForSDT() {
    var lookupSDT = document.getElementById("sdt-num-to-query").value;
    if (lookupSDT.length === 9) {
        var exists = await pywebview.api.checkForSDT(lookupSDT);
        // if the SDT exists alert that it already exists 
        if (exists) {
            alert("The SDT already exsists in the database");
        } else {
            var tempval = await pywebview.api.initiateRACInfo(lookupSDT);
            if (tempval) {
                document.location.reload(true);
                tempval = alert("SDT added")
                    // Todo( replace alert with toggling highlight animation)
            }

        }
    } else {
        alert("Enter a proper SDT Number");
    }
}

document.getElementById("sdt-num-to-query").oninput = function() {
    document.getElementById("browse").disabled = true;
    document.getElementById("process-RAC-Form").disabled = true;
}