function displayInfo(dbEntry) {
    // here "RAC_Info" is used as a parameter therefore as a local variable
    // alert(Object.keys(RAC_Info).length);
    // fill out the boxes with the initial values 
    global.sending_info = false;
    global.getting_info = true;
    var uniqueSDT = dbEntry.SDT_Number;
    idMatch(uniqueSDT, dbEntry, "header-SDRL-num", "SDRL_Number");
    idMatch(uniqueSDT, dbEntry, "header-SDT-num", "SDT_Number");
    if (dbEntry.Is_Final_RAC == true) {
        document.getElementById("pre-or-final-" + uniqueSDT).value = "Final";
        document.getElementById("header-pre-or-final-" + uniqueSDT).value = "Final";
        // TODO provide link for Pre_RAC_For_Final 
        document.getElementById("Pre-for-Final-" + uniqueSDT).value = "";
    } else if (dbEntry.Is_Final_RAC == false) {
        document.getElementById("pre-or-final-" + uniqueSDT).value = "Pre";
        document.getElementById("header-pre-or-final-" + uniqueSDT).value = "Pre"
    }
    idMatch(uniqueSDT, dbEntry, "header-review-status", "Review_Status");
    idMatch(uniqueSDT, dbEntry, "header-change-title", "Change_Title");
    idMatch(uniqueSDT, dbEntry, "header-Effectivity", "First_Occurrence_Effectivity");
    idMatch(uniqueSDT, dbEntry, "header-urgency", "Review_Flow_Day");
    idMatch(uniqueSDT, dbEntry, "Airplane-Model", "Airplane_Model");
    idMatch(uniqueSDT, dbEntry, "Effectivity", "First_Occurrence_Effectivity");
    idMatch(uniqueSDT, dbEntry, "L/N", "Line_Number");
    idMatch(uniqueSDT, dbEntry, "Block", "Effectivity_Block");
    idMatch(uniqueSDT, dbEntry, "Customer", "Customer_Code");
    document.getElementById("LOPA-" + uniqueSDT).innerHTML = dbEntry.LOPA_Number + " REV " + dbEntry.LOPA_Rev;
    document.getElementById("LOPA-" + uniqueSDT).href = dbEntry.LOPA_Link;

    idMatch(uniqueSDT, dbEntry, "Affected-Class", "Affected_Seating_Class");
    idMatch(uniqueSDT, dbEntry, "Affected-Model", "Affected_Part_Model");
    idMatch(uniqueSDT, dbEntry, "Env-Dwg", "Seat_Env_Dwg");
    idMatch(uniqueSDT, dbEntry, "Layout-Dwg", "Seat_Layout_Dwg");
    idMatch(uniqueSDT, dbEntry, "Supplier", "Supplier_Name");

    idMatch(uniqueSDT, dbEntry, "SDRL-num", "SDRL_Number");
    idMatch(uniqueSDT, dbEntry, "SDT-num", "SDT_Number");
    idMatch(uniqueSDT, dbEntry, "Pre-for-Final", "Pre_RAC_For_Final")
    idMatch(uniqueSDT, dbEntry, "change-title", "Change_Title");
    idMatch(uniqueSDT, dbEntry, "change-affects", "Change_Affects");
    idMatch(uniqueSDT, dbEntry, "Brief-DoC", "Brief_DoC");
    idMatch(uniqueSDT, dbEntry, "reason-for-change", "Reason_for_Change")

    idMatch(uniqueSDT, dbEntry, "urgency", "Review_Flow_Day");
    idMatch(uniqueSDT, dbEntry, "ship-date", "Seats_Ship_Date");
    idMatch(uniqueSDT, dbEntry, "on-dock-date", "Seats_On_Dock_Date");
    idMatch(uniqueSDT, dbEntry, "shipping-matrix", "Affects_Shipping_Matrix");
    idMatch(uniqueSDT, dbEntry, "cert-plan", "Cert_Plan_Number");
    // TODO add certplan link 
    if (dbEntry.EASA != "") {
        idMatch(uniqueSDT, dbEntry, "EASA", "EASA");
    }
    if (dbEntry.CAAC != "") {
        idMatch(uniqueSDT, dbEntry, "CAAC", "CAAC");
    }
    idMatch(uniqueSDT, dbEntry, "other-cert", "Other_Cert");
    idMatch(uniqueSDT, dbEntry, "HIC", "Has_HIC");
    if (dbEntry.Has_HIC == true) {
        document.getElementById("HIC-" + uniqueSDT).value = "Yes";
    } else if (dbEntry.Has_HIC == "Check") {
        document.getElementById("HIC-" + uniqueSDT).value = "Check";
    }

    idMatch(uniqueSDT, dbEntry, "HIC-exceptions", "HIC_Exceptions");
    idMatch(uniqueSDT, dbEntry, "mm-proposal", "Proposed_MM_Justification");
    idMatch(uniqueSDT, dbEntry, "IRCSPEED-review-by", "IRCSPEED_Due_Date");
    //TODO establish database to link pre-RAC TR and final-RAC TR
    // idMatch(uniqueSDT, dbEntry, "IRC-TR-number", "IRCSPEED_TR_Number");
    document.getElementById("IRC-TR-number-" + uniqueSDT).innerHTML = dbEntry.IRCSPEED_TR_Number;
    document.getElementById("IRC-TR-number-" + uniqueSDT).href = dbEntry.IRCSPEED_TR_Link;
    //TODO establish function with TR Link 

    idMatch(uniqueSDT, dbEntry, "Pre-RAC-DAE-review-date", "Seat_DAE_Meeting_Date");
    idMatch(uniqueSDT, dbEntry, "joint-review-date", "Stress_Interior_Cert_Meeting_Date");
    idMatch(uniqueSDT, dbEntry, "joint-review-notes", "Joint_Review_Notes");

    idMatch(uniqueSDT, dbEntry, "seats-determination", "Seats_Determination");
    idMatch(uniqueSDT, dbEntry, "stress-determination", "Stress_Determination");
    idMatch(uniqueSDT, dbEntry, "ic-determination", "Interior_Cert_Determination");
    idMatch(uniqueSDT, dbEntry, "flamm-determination", "Flamm_Determination");
    idMatch(uniqueSDT, dbEntry, "electrical-determination", "Electrical_Determination");
    idMatch(uniqueSDT, dbEntry, "overall-determination", "Overall_Determination");
    var reviewSelect = document.getElementById("review-status-" + uniqueSDT);
    var reviewStatusVals = dbEntry.Review_Status;
    if (reviewStatusVals) {
        for (var i = 0; i < reviewSelect.options.length; i++) {
            reviewSelect.options[i].selected = reviewStatusVals.indexOf(reviewSelect.options[i].value) >= 0;
        }
    }
    idMatch(uniqueSDT, dbEntry, "additional-notes", "Additional_Notes");
}



function updateHeader(sentId) {
    var headerId = "header-" + sentId;
    document.getElementById(headerId).textContent = document.getElementById(sentId).value;
}

// function below used with saveInfo 
function getDbEntry(uniqueSDT) {
    for (var entry = 0; entry < dbEntries.length; entry++) {
        if (dbEntries[entry].SDT_Number == uniqueSDT) {
            return entry
        }
    }
}


async function saveInfo(sentId) {
    sending_info = true;
    getting_info = false;
    var uniqueSDT = sentId.replace("save-form-", "");
    var entry = getDbEntry(uniqueSDT);
    var is_pre_or_final = document.getElementById("pre-or-final-" + uniqueSDT).value;
    if (is_pre_or_final == "Pre") {
        dbEntries[entry].Is_Final_RAC = false;
    } else if (is_pre_or_final == "Final") {
        dbEntries[entry].Is_Final_RAC = true;
        // TODO provide link for Pre_RAC_For_Final 
        idMatch(uniqueSDT, dbEntries[entry], "Pre-for-Final", "Pre_RAC_For_Final");
    }

    idMatch(uniqueSDT, dbEntries[entry], "Airplane-Model", "Airplane_Model");
    idMatch(uniqueSDT, dbEntries[entry], "Effectivity", "First_Occurrence_Effectivity");
    idMatch(uniqueSDT, dbEntries[entry], "L/N", "Line_Number");
    idMatch(uniqueSDT, dbEntries[entry], "Block", "Effectivity_Block");
    idMatch(uniqueSDT, dbEntries[entry], "Customer", "Customer_Code");

    idMatch(uniqueSDT, dbEntries[entry], "Affected-Class", "Affected_Seating_Class");
    idMatch(uniqueSDT, dbEntries[entry], "Affected-Model", "Affected_Part_Model");
    idMatch(uniqueSDT, dbEntries[entry], "Env-Dwg", "Seat_Env_Dwg");
    idMatch(uniqueSDT, dbEntries[entry], "Layout-Dwg", "Seat_Layout_Dwg");
    idMatch(uniqueSDT, dbEntries[entry], "Supplier", "Supplier_Name");

    idMatch(uniqueSDT, dbEntries[entry], "SDRL-num", "SDRL_Number");
    // TODO provide link to SDT 
    idMatch(uniqueSDT, dbEntries[entry], "Pre-for-Final", "Pre_RAC_For_Final")
    idMatch(uniqueSDT, dbEntries[entry], "SDT-num", "SDT_Number");
    idMatch(uniqueSDT, dbEntries[entry], "change-title", "Change_Title");
    idMatch(uniqueSDT, dbEntries[entry], "change-affects", "Change_Affects");
    idMatch(uniqueSDT, dbEntries[entry], "Brief-DoC", "Brief_DoC");

    idMatch(uniqueSDT, dbEntries[entry], "primary-reviewer", "Primary_Reviewer");
    idMatch(uniqueSDT, dbEntries[entry], "secondary-reviewer", "Secondary_Reviewer");
    idMatch(uniqueSDT, dbEntries[entry], "verifier", "Verifier");
    idMatch(uniqueSDT, dbEntries[entry], "buyer", "Buyer");
    // TODO add sdt due date to dictionary 
    // idMatch(uniqueSDT, dbEntries[entry], "SDT-due-date",SDT_Due_Date);
    idMatch(uniqueSDT, dbEntries[entry], "urgency", "Review_Flow_Day");
    idMatch(uniqueSDT, dbEntries[entry], "ship-date", "Seats_Ship_Date");
    idMatch(uniqueSDT, dbEntries[entry], "on-dock-date", "Seats_On_Dock_Date");
    idMatch(uniqueSDT, dbEntries[entry], "shipping-matrix", "Affects_Shipping_Matrix");
    idMatch(uniqueSDT, dbEntries[entry], "cert-plan", "Cert_Plan_Number");
    // TODO add certplan link 

    idMatch(uniqueSDT, dbEntries[entry], "EASA", "EASA");
    idMatch(uniqueSDT, dbEntries[entry], "CAAC", "CAAC");
    idMatch(uniqueSDT, dbEntries[entry], "other-cert", "Other_Cert");
    if (document.getElementById("HIC-" + uniqueSDT).value == "Yes") {
        dbEntries[entry].Has_HIC = true;
    } else {
        dbEntries[entry].Has_HIC = false;
    }
    idMatch(uniqueSDT, dbEntries[entry], "HIC-exceptions", "HIC_Exceptions");
    idMatch(uniqueSDT, dbEntries[entry], "mm-proposal", "Proposed_MM_Justification");
    idMatch(uniqueSDT, dbEntries[entry], "IRCSPEED-review-by", "IRCSPEED_Due_Date");
    //TODO establish database to link pre-RAC TR and final-RAC TR

    //TODO establish function with TR Link 

    idMatch(uniqueSDT, dbEntries[entry], "Pre-RAC-DAE-review-date", "Seat_DAE_Meeting_Date");
    idMatch(uniqueSDT, dbEntries[entry], "joint-review-date", "Stress_Interior_Cert_Meeting_Date");
    idMatch(uniqueSDT, dbEntries[entry], "joint-review-notes", "Joint_Review_Notes");

    idMatch(uniqueSDT, dbEntries[entry], "seats-determination", "Seats_Determination");
    idMatch(uniqueSDT, dbEntries[entry], "stress-determination", "Stress_Determination");
    idMatch(uniqueSDT, dbEntries[entry], "ic-determination", "Interior_Cert_Determination");
    idMatch(uniqueSDT, dbEntries[entry], "flamm-determination", "Flamm_Determination");
    idMatch(uniqueSDT, dbEntries[entry], "electrical-determination", "Electrical_Determination");
    idMatch(uniqueSDT, dbEntries[entry], "overall-determination", "Overall_Determination");
    var reviewSelect = document.getElementById("review-status-" + uniqueSDT);
    dbEntries[entry].Review_Status = stringifyMultiselect(reviewSelect);

    idMatch(uniqueSDT, dbEntries[entry], "additional-notes", "Additional_Notes");
    dbEntries[entry].DE_Reviewer_Name = userName;
    dbEntries[entry].DE_Reviewer_Phone = SDT_Users[userName].userPhone;
    var tempval = await pywebview.api.receiveInfo(dbEntries[entry]);
    return tempval

}

function stringifyMultiselect(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value);
        }
    }
    return String(result);
}

function sendInfo(dbEntry) {
    pywebview.api.receiveInfo(dbEntry);
}

async function deleteInfo(sentId) {
    var uniqueSDT = sentId.replace("delete-form-", "");
    await pywebview.api.deleteFromDB(uniqueSDT);
    window.setTimeout(() => {
        document.location.reload();
    }, 200)
}



function idMatch(uniqueSDT, dbEntry, htmlId, key) {
    var fullHtmlId = htmlId + '-' + uniqueSDT;
    var element = document.getElementById(fullHtmlId);
    try {
        if (sending_info) {
            // showOnPage("saving")
            dbEntry[key] = document.getElementById(fullHtmlId).value;
        } else if (getting_info && element !== null) {
            var tempval = dbEntry[key];
            try { // if text has \n to be removed }
                try {
                    empval = dbEntry[key].replace(/\n/g, "");
                } catch (err) {
                    //do nothing 
                }
                if (element.nodeName == "TD") {
                    element.textContent = tempval;
                } else {
                    element.value = tempval;
                }
            } catch (err) {

                showOnPage(err.name + err.message + err.stack)
            }
            //replace all instances of line breaks from the database entry 
        }
    } catch (err) {
        var caller_line = err.stack.split("\n")[4];
        var index = caller_line.indexOf("at ");
        var clean = caller_line.slice(index + 2, caller_line.length);
        showOnPage("error for" + toString(htmlId) + err + ' key: ' + key + ' LN: ' + clean);
    }

}
//******************************* */



//******************************* */









function openForm(buttonid) {
    //opens and closes the popup form depending on what was clicked 
    var openbutton = document.getElementById(buttonid);
    var formid = 'popup-' + buttonid.replace("edit-action-", "");
    var form = document.getElementById(formid);
    if (form.style.display == "block") {
        openbutton.innerHTML = '<i class="material-icons">expand_more</i>'
        form.style.display = "none";
        var uniqueSDT = buttonid.replace("edit-action-", "");
        localStorage.setItem(uniqueSDT, 'false')

    } else {
        form.style.display = "block";
        openbutton.innerHTML = '<i class="material-icons">expand_less</i>'
        var uniqueSDT = buttonid.replace("edit-action-", "");
        localStorage.setItem(uniqueSDT, 'true')
    }


}

function closeForm(buttonid) {
    var formid = 'popup-' + buttonid.replace("close-form-", "");
    document.getElementById(formid).style.display = "none";
    var openbutton = document.getElementById("edit-action-" + buttonid.replace("close-form-", ""));
    openbutton.innerHTML = '<i class="material-icons">expand_more</i>'
    var uniqueSDT = buttonid.replace("close-form-", "");
    localStorage.setItem(uniqueSDT, 'false')
}

function customizeForm(sentId) {
    var uniqueSDT = sentId.replace("pre-or-final-", ""); // since this funciton can be called from within the form
    var preOrFinal = document.getElementById("pre-or-final-" + uniqueSDT).value;
    if (preOrFinal == "Pre") {
        document.getElementById("header-pre-or-final-" + uniqueSDT).textContent = "Pre";
        document.getElementById("Pre-for-Final-span-" + uniqueSDT).style.display = "none";
        document.getElementById("Pre-for-Final-retrieve-span-" + uniqueSDT).style.display = "none";
        // if there already is a TR for the pre-RAC disable the create IRC Package button 
        try {
            var trNum = document.getElementById("IRC-TR-number-" + uniqueSDT).innerHTML;
            if (trNum != "" && trNum != 'null') { // not the most efficient
                document.getElementById("create-IRC-package-span-" + uniqueSDT).style.display = "none";
                document.getElementById("IRCSPEED-review-by-span-" + uniqueSDT).style.display = "none";
            }
        } catch (err) {
            showOnPage(err.name, err.message, err.stack, 'LN: ' + err.lineNumber);
        }
        document.getElementById("update-IRC-package-span-" + uniqueSDT).style.display = "none";
        document.getElementById("pre-determinations-" + uniqueSDT).style.display = "block";
        document.getElementById("final-determinations-" + uniqueSDT).style.display = "none";
        document.getElementById("pre-RAC-DAE-review-span-" + uniqueSDT).style.display = "block";
        document.getElementById("send-to-DAE-span-" + uniqueSDT).style.display = "none";
    } else if (preOrFinal == "Final") {
        document.getElementById("header-pre-or-final-" + uniqueSDT).textContent = "Final";
        document.getElementById("Pre-for-Final-span-" + uniqueSDT).style.display = "block";
        document.getElementById("Pre-for-Final-retrieve-span-" + uniqueSDT).style.display = "block";
        document.getElementById("create-IRC-package-span-" + uniqueSDT).style.display = "none";
        document.getElementById("IRCSPEED-review-by-span-" + uniqueSDT).style.display = "none";
        document.getElementById("update-IRC-package-span-" + uniqueSDT).style.display = "block";
        document.getElementById("send-to-DAE-span-" + uniqueSDT).style.display = "block";
        document.getElementById("pre-determinations-" + uniqueSDT).style.display = "none";
        document.getElementById("final-determinations-" + uniqueSDT).style.display = "block";
        document.getElementById("pre-RAC-DAE-review-span-" + uniqueSDT).style.display = "none";
    }
}

async function createDoC(sentId) {
    //first save the form in the DB
    var uniqueSDT = sentId.replace("create-DoC-", "");
    var tempval = await saveInfo(uniqueSDT);
    //Then call the function to create the DoC 
    if (tempval) {
        tempval = await pywebview.api.createDoC(uniqueSDT);
    }
}


async function generateEmail(sentId) {
    // first save the form in the DB
    var uniqueSDT = sentId.replace("email-flamm-", "");
    await saveInfo(uniqueSDT);
    //Then call the function to create the email
    var subjectline = await pywebview.api.generateEmail(uniqueSDT);

}

async function retrievePreRACData(sentId) {
    var finalRACSDT = sentId.replace("Pre-for-Final-retrieve-", "");
    var preRACSDT = document.getElementById("Pre-for-Final-" + finalRACSDT).value;
    if (preRACSDT != "") {
        try {
            var tempval = await pywebview.api.retrievePreRACData(finalRACSDT, preRACSDT);
            localStorage.setItem(finalRACSDT, 'true')
            localStorage.setItem('scrollposY', window.scrollY);
            localStorage.setItem('scrollposX', window.scrollX);
            // location.reload(true);
            tempval = await document.location.reload(true);


        } catch (err) {
            showOnPage(err.name, err.message, err.stack, 'LN: ' + err.lineNumber);
        }
    } else {
        alert("A pre-RAC SDT# must be specified");
    }

    // setTimeout(function() {
    //     document.getElementById("edit-action-" + finalRACSDT).click();
    //     showOnPage("here");
    // }, 2000);

}

async function displayLogistics(sentId) {
    var uniqueSDT = sentId
    try {
        uniqueSDT = uniqueSDT.replace("detail-logistics-", "");
    } catch (err) {
        //pass
    }
    try {
        uniqueSDT = uniqueSDT.replace("refresh-logistics-", "");
    } catch (err) {
        //pass
    }
    var wait = document.getElementById("logistics-wait-" + uniqueSDT);
    var dots = window.setInterval(function() {

        if (wait.innerHTML.length > 3)
            wait.innerHTML = "";
        else
            wait.innerHTML += ".";
    }, 100);
    //Refactor dots later 
    var table = document.getElementById("logistics-table-" + uniqueSDT);
    table.innerHTML = "";
    var tbody = await pywebview.api.getLogistics(uniqueSDT);
    table.innerHTML = tbody;
    clearInterval(dots);
    wait.innerHTML = "";
    document.getElementById("refresh-logistics-" + uniqueSDT).style.display = "block";
    document.getElementById("close-logistics-details-" + uniqueSDT).style.display = "block";

}

async function sendToDAE(sentId) {
    var uniqueSDT = sentId.replace("send-to-DAE-", "");
    await pywebview.api.emailDAE(uniqueSDT);
    // add functionality to send dB entry to a different table in DB
}

async function queryForDwg(sentId) {
    var button = document.getElementById(sentId);
    button.disabled = true;
    var uniqueSDT = sentId.replace("query-for-Dwg-", "");
    var effectivity = document.querySelector("#Block-" + uniqueSDT).value;
    var seatClass = document.querySelector("#Affected-Class-" + uniqueSDT).value;
    var dwgTable = document.querySelector("#drawings-table-" + uniqueSDT);

    var tbodyInnerHTML = await pywebview.api.queryForDwg(effectivity, seatClass);
    var tbody = document.createElement("tbody");
    tbody.innerHTML = tbodyInnerHTML;
    var rows = tbody.rows;



    try {
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.cells;
            var drawingNumber = cells[0].textContent;

            var menu = document.createElement("div");
            menu.innerHTML = `
            <ul class="menu-options">
                <hr>
                <li class="menu-option" id="env-" >Choose as Env Dwg</li>
                <hr>
                <li class="menu-option" id="layout-" >Choose as Layout Dwg</li>
                <hr>
            </ul>`
            menu.id = 'dwg-menu-' + uniqueSDT;
            menu.classList.add("menu");
            var options = menu.querySelectorAll('li');
            options[0].id += uniqueSDT;
            options[1].id += uniqueSDT;
            options[0].addEventListener("click", e => {
                fillOutDwg('env', drawingNumber, uniqueSDT);
            });
            options[1].addEventListener("click", e => {
                fillOutDwg('layout', drawingNumber, uniqueSDT);
            });

            document.body.append(menu);
            let menuVisible = false;

            const toggleMenu = command => {
                menu.style.display = command === "show" ? "block" : "none";
                menuVisible = !menuVisible;
            };

            const setPosition = ({ top, left }) => {
                menu.style.left = `${left}px`;
                menu.style.top = `${top}px`;
                toggleMenu("show");
            };

            row.addEventListener('click', function(e) {
                let inside = (e.target.closest(menu.top, menu.left));
                if (!inside) {
                    menu.setAttribute('style', 'display:none');
                }
            });
            row.addEventListener("contextmenu", e => {
                e.preventDefault();
                const origin = {
                    left: e.pageX,
                    top: e.pageY
                };
                setPosition(origin);
                return false;
            });
        }
        dwgTable.append(tbody);
    } catch (err) {
        alert(err);
    }
}

function fillOutDwg(dwgType, drawingNumber, uniqueSDT) {
    var envDisp = document.getElementById("Env-Dwg-" + uniqueSDT);
    var layoutDisp = document.getElementById("Layout-Dwg-" + uniqueSDT);
    try {
        if (dwgType == 'env') {
            envDisp.value = drawingNumber;
        } else {
            layoutDisp.value = drawingNumber;
        }
    } catch (err) {
        alert(err);
    }

}

async function browseForNewFile(sentId) {
    // comment line below for debugging 
    var uniqueSDT = sentId.replace("browse-", "")
    var filepath = await pywebview.api.uploadFile();
    if (filepath !== "" && filepath !== null) {
        var dispFilepath = document.getElementById("filepath-" + uniqueSDT)
        dispFilepath.value = filepath
        var wait = document.getElementById("RAC-Form-Processing-Wait-" + uniqueSDT);
        var dots = window.setInterval(function() {

            if (wait.innerHTML.length > 3)
                wait.innerHTML = "";
            else
                wait.innerHTML += ".";
        }, 100);
        var tempval = await pywebview.api.compileRACInfo(filepath, uniqueSDT);
        tempval = document.location.reload(true);
    }
}


//debugging function 
function showOnPage(something) {
    var newpar = document.createElement('p');
    newpar.innerHTML = something;
    document.body.append(newpar);
}

async function getLOPAandLNInfo(sentId) {
    var uniqueSDT = sentId.replace("search-for-airplane-info-button-", "");
    var effectivity = document.getElementById("search-for-airplane-info-" + uniqueSDT);
    var tempval = await pywebview.api.getLOPAandLNInfo(effectivity, uniqueSDT);

    if (tempval) {
        document.location.reload(true);
    }
}

function showSDTComment(sentId) {
    try {

        var uniqueSDT = sentId.replace("generate-SDT-comment-", "");
        var commentContainer = document.getElementById("SDT-comment-container-" + uniqueSDT);
        var commentTextarea = document.getElementById("SDT-comment-textarea-" + uniqueSDT);
        var commentInstruction = document.getElementById("comment-instruction-" + uniqueSDT);
        commentContainer.style.display = "block";
        commentInstruction.style.display = "block";
        var preOrFinal = document.getElementById("pre-or-final-" + uniqueSDT).value;

        if (preOrFinal == 'Pre') {
            commentInstruction.textContent = `Document Comment for Acknowledged RACs [Show Supplier]. \n Note: In the Comments section at the bottom or the RAC form [Do not Show Supplier]\n Include Primary Reviewer's, Verifier's, and Buyer's first and last names`
            commentTextarea.value = `The RAC proposal has been reviewed and preliminarily found acceptable for the aircraft effectivity block(s) listed on the Boeing RAC form only. Do not ship any seat system until the change is officially dispositioned ACCEPTED in the new SDRL by Boeing. Note: Incorporation of change on additional effectivity blocks requires additional RAC submittal and/or coordination with Boeing. Please reference D6-36230 Rev. AJ requirement 07.07.01 for additional details.`
        } else if (preOrFinal == 'Final') {
            commentInstruction.textContent = `Document Comment for Accepted final RACs [Show Supplier]`
            commentTextarea.value = `This RAC was reviewed and ACCEPTED for the aircraft effectivity block(s) listed on the RAC form only. Incorporation of change on additional effectivity blocks requires additional RAC submittal and/or coordination with Boeing. Please reference D6-36230 Rev. AJ requirement 07.07.01 for additional details.`
        } else {
            alert('specify if RAC is Pre or Final')
        }
    } catch (err) {
        showOnPage(err.name, err.message, err.stack, 'LN: ' + err.lineNumber);
    }
}

function copyToClipboard(element) {
    try {
        var commentDiv = element.parentElement;
        var comment = commentDiv.previousElementSibling;
        comment.select();
        document.execCommand("copy");
    } catch (err) {
        showOnPage(err.name, err.message, err.stack, 'LN: ' + err.lineNumber);
    }

}


function collapse(element) {
    try {
        var fieldset = element.parentElement;
        var icon = element.querySelector("i");
        var content = fieldset.querySelector(".fieldset-container");
        if (content.style.display === "block") {
            content.style.display = "none";
            icon.classList.add("fa-chevron-down");
            icon.classList.remove("fa-chevron-up")
        } else {
            content.style.display = "block";
            icon.classList.add("fa-chevron-up");
            icon.classList.remove("fa-chevron-down")
        }

    } catch (err) {
        console.log(err);
    }
}
var legendCollapse = document.querySelectorAll(".legend")
for (i = 0; i < legendCollapse.length; i++) {
    legendCollapse[i].addEventListener("click", function() { collapse(this); }, false);
}