// get the News article through json request
function getArticle(articleID) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetArticle",
        contentType: "application/json; charset=utf-8",
        data: "{ID:'" + articleID + "'}",
        dataType: "json",
        success: function (msg) {
            var item = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;

            var newHtml = '';
            if (item != null) {
                newHtml += '<div class="hr-green"> </div>';
                newHtml += '<div class="text-row">';
                if (typeof (item.Title) != "undefined") {

                    newHtml += '<h2>' + item.Title + '</h2>';
                }
                if (typeof (item.LeftContent) != "undefined") {

                    newHtml += '<div class="left-block">' + item.LeftContent + '</div>';
                }

                if (typeof (item.RightContent) != "undefined") {

                    newHtml += '<div class="right-block">' + item.RightContent + '</div>';
                }


                newHtml += '</div>';

            }

            var pArticleData = jQuery('.articledata');
            pArticleData.html(newHtml);
            pArticleData.slideDown(null, function () {
                var pArticleContent = jQuery(".articledata > .text-row");

                if (pArticleContent === null && typeof (pArticleContent) == "undefined") {
                    return;
                }

                var iArticleHeight = pArticleContent.height();
                var iWindowHeight = jQuery(window).height();

                var iArticleOffset = pArticleContent.offset().top - jQuery(document).scrollTop();
                var iInvisiblePartHeight = iArticleOffset + iArticleHeight - iWindowHeight;

                if (iInvisiblePartHeight > 0) { // this means article doesn't fit into window
                    var iSlideLength = 0;
                    if (iArticleHeight > iWindowHeight) {   // when article is larger that browser window let's put it on top
                        iSlideLength = jQuery('.articledata').offset().top;
                    }
                    else {
                        iSlideLength = jQuery(document).scrollTop() + iInvisiblePartHeight;
                    }

                    jQuery(document).scrollTop(iSlideLength);
                }
            });


        },
        error: AjaxFailed
    });

}



// get the Profiles through json request
function getProfiles(pageGuid, colorList, comparetxt, errortxt, errortitle, class1, class2) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetProfiles",
        contentType: "application/json; charset=utf-8",
        data: "{pageGuid: '" + pageGuid + "', colorIDs:'" + colorList + "'}",
        dataType: "json",
        success: function (msg) {
            var profiles = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;

            var newHtml = '';

            if (profiles != null) {
                newHtml += '<div class="product-row">';

                var column = 1;

                var plist = jQuery('.productlist');
                plist.html("");

                var row = jQuery("<div />").addClass("product-row");

                for (var i = 0; i < profiles.length; i++) {

                    var newHtml = "";

                    var p = jQuery("<div />").addClass("small-product");
                    newHtml += '<p><a href="..Js/' + profiles[i].Link + '"><img src="..Js/' + profiles[i].Image + '" alt="" /></a></p>';
                    newHtml += '<h3><a href="..Js/' + profiles[i].Link + '">' + profiles[i].Title + '</a></h3>';
                    newHtml += '<p class="productdescription"><a class="producttxtlink" href="..Js/' + profiles[i].Link + '">' + profiles[i].Description + '</a></p>';

                    p.html(newHtml);

                    var p1 = jQuery("<p/>");
                    var cb = jQuery('<input type="checkbox" />').attr("ID", profiles[i].ID).click(function () {
                        saveComparision(this.id, errortxt, errortitle, this, class1, class2);
                    });

                    if (profiles[i].InComparision) {
                        cb.attr("checked", true);
                    }

                    var cbtxt = jQuery("<span/>").html(comparetxt);
                    p1.append(cb, cbtxt);

                    p.append(p1);

                    row.append(p);

                    column++;

                    if (column > 5) {
                        plist.append(row);
                        column = 1;
                        row = jQuery("<div />").addClass("product-row");
                    }


                }

                if (column > 1) {
                    plist.append(row);
                }
                newHtml += '</div>';
            }

            //jQuery('.productlist').html(newHtml);


        },
        error: AjaxFailed
    });
}

// get the Profiles through json request
function getInstallers(zipcode, offerrequesturl, typeID, linktxt) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetInstallers",
        contentType: "application/json; charset=utf-8",
        data: "{zipcode: '" + zipcode + "', typeID:'" + typeID + "'}",
        dataType: "json",
        success: function (msg) {
            var installers = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;

            var newHtml = '';

            var column = 1;

            var plist = jQuery('#dealerlist');
            plist.html("");

            if (installers != null) {
                if (installers.length > 0) {

                    jQuery(".print").show();
                    jQuery("#noresults").hide();
                    

                    var row = jQuery("<div />").addClass("dealers");

                    for (var i = 0; i < installers.length; i++) {

                        var p = jQuery("<div />").addClass("column");

                        p.html('<p><strong>' + installers[i].Name + '</strong><br />' + installers[i].Phone + '<br/><a href="mailto:' + installers[i].Email + '">' + installers[i].Email + '</a></p><p><a href="..Js/' + offerrequesturl + '">' + linktxt + '</a></p>');

                        row.append(p);

                        column++;

                        if (column > 4) {
                            plist.append(row);
                            column = 1;
                            row = jQuery("<div />").addClass("dealers");
                        }


                    }

                    if (column > 1) {
                        plist.append(row);
                    }

                    jQuery("#dealerlisttitle").show();
                } else {
                    jQuery("#dealerlisttitle").show();
                    jQuery(".print").hide();
                    jQuery("#noresults").show();
                }
            } else {
                jQuery("#dealerlisttitle").show();
                jQuery(".print").hide();
                jQuery("#noresults").show();
            }


        },
        error: AjaxFailed
    });
}


function saveComparision(comparisionID, errormsg, errortitle, checkbox, class1, class2) {

    var checked = jQuery(checkbox).is(':checked');

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/AddComparision",
        contentType: "application/json; charset=utf-8",
        data: "{profileID:'" + comparisionID + "', selected: " + checked + "}",
        dataType: "json",
        success: function (msg) {
            var returnvalue = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;
            if (!returnvalue) {
                jQuery(checkbox).attr("checked", false);
                OpenDialog(errortitle, errormsg);
            } else {
                checkComparision(class1, class2);
            }
        },
        error: AjaxFailed
    });



}

function checkComparision(class1, class2) {
    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/CheckComparisions",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var returnvalue = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;
            if (returnvalue) {
                jQuery(class1).hide();
                jQuery(class2).show();
            }
            else {
                jQuery(class2).hide();
                jQuery(class1).show();
            }
        },
        error: AjaxFailed
    });
}

function AjaxFailed(result) {
    alert('AJAX REQUEST FAILED: ' + result.status + ' ' + result.statusText + ' ' + result.d);
}


function renderFlash(swfPath, swfWidth, swfHeight, swfMajorVersion, swfMinorVersion, swfRevision, swfFlashvars, isEditMode, flashInstance, swfBgColor) {
    var hasRequestedVersion = DetectFlashVer(swfMajorVersion, swfMinorVersion, swfRevision);
    console.log("renderflash");
    if (hasRequestedVersion) {
        var runFlash = AC_FL_RunContent(
        "src", swfPath,
        "width", swfWidth,
        "height", swfHeight,
        "menu", "false",
        "align", "middle",
        "id", ("teaserFlash" + flashInstance++),
        "quality", "high",
        "bgcolor", swfBgColor,
        "name", ("teaserFlash" + flashInstance++),
        "allowScriptAccess", "always",
        "wmode", "opaque",
        "type", "application/x-shockwave-flash",
        'codebase', 'http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab',
        "pluginspage", "http://www.adobe.com/go/getflashplayer",
        'FlashVars', swfFlashvars
        );

        var layer = jQuery('#imagecontent' + flashInstance);

        if (isEditMode == '1') {
            layer.show();
        } else {
            layer.hide();
        }
    }
    else {
        var layer = jQuery('#imagecontent' + flashInstance);
        layer.show();
    }
}

function renderConfiguratorFlash(swfPath, swfWidth, swfHeight, swfMajorVersion, swfMinorVersion, swfRevision, swfFlashvars, isEditMode, flashInstance, swfBgColor) {
    var hasRequestedVersion = DetectFlashVer(swfMajorVersion, swfMinorVersion, swfRevision);

    if (hasRequestedVersion) {
        var runFlash = AC_FL_RunContent(
        "src", swfPath,
        "width", swfWidth,
        "height", swfHeight,
        "menu", "false",
        "align", "middle",
        "id", ("teaserFlash" + flashInstance++),
        "quality", "high",
        "bgcolor", swfBgColor,
        "name", ("teaserFlash" + flashInstance++),
        "allowScriptAccess", "always",
        "wmode", "window",
        "type", "application/x-shockwave-flash",
        'codebase', 'http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab',
        "pluginspage", "http://www.adobe.com/go/getflashplayer",
        'FlashVars', swfFlashvars
        );

        var layer = jQuery('#imagecontent' + flashInstance);

        if (isEditMode == '1') {
            layer.show();
        } else {
            layer.hide();
        }
    }
    else {
        var layer = jQuery('#imagecontent' + flashInstance);
        layer.show();
    }
}

function OpenDialog(dialogtitle, dialogcontent) {

    var $dialog = jQuery('<div></div>')
		.html(dialogcontent)
		.dialog({
		    autoOpen: false,
		    title: dialogtitle,
		    modal: true,
		    resizable: false,
		    closeOnEscape: true,
		    buttons: { "OK": function () { $(this).dialog("close") } }
		});

    $dialog.dialog('open');

}

function loadProfilesByColor(pageGuid, color, callback) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetProfiles",
        contentType: "application/json; charset=utf-8",
        data: "{pageGuid: '" + pageGuid + "', colorIDs:'" + color + "'}",
        dataType: "json",
        success: function (msg) {
            var profiles = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;

            var newHtml = '';

            if (profiles != null) {
                newHtml += '<div class="product-row">';

                var column = 1;

                var plist = jQuery('.profile-sort');
                plist.html("");

                var row = jQuery("<div />").addClass("row");

                for (var i = 0; i < profiles.length; i++) {

                    var newHtml = "";

                    var p = jQuery("<div />").addClass("single-profile");
                    newHtml += '<div class="profile-img">';
                    if (profiles[i].Selected) newHtml += '<div class="selected"> </div><script type="text/javascript">filterColors("' + profiles[i].ID + '");</script>';
                    newHtml += '<img src="' + profiles[i].Image + '" width="103" heigth="97" id="' + profiles[i].ID + '" alt="" onclick=filterColors("' + profiles[i].ID + '"); /></div>';
                    newHtml += '<p align="center"><a href="..Js/' + profiles[i].Link + '" target="_blank">' + profiles[i].Title + '</a></p>';

                    p.html(newHtml);
                    row.append(p);

                    column++;

                    if (column > 7) {
                        plist.append(row);
                        column = 1;
                        row = jQuery("<div />").addClass("row");
                    }
                }

                if (column > 1) {
                    plist.append(row);
                }
                newHtml += '</div>';
            }

            if (callback != null)
                callback.call();
        },
        error: AjaxFailed
    });
}

function loadColorsByProfile(profile) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetColorsByProfile",
        contentType: "application/json; charset=utf-8",
        data: "{profile: '" + profile + "'}",
        dataType: "json",
        async: false,
        success: function (msg) {
            var colors = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;

            if (colors != null) {
            	jQuery("#CP_Color ul li").hide();
                for (var i = 0; i < colors.length; i++) {
                	jQuery("#CP_Color ul li span img[ID=" + colors[i] + "]").parent().parent().show();
                }
            }
        },
        error: AjaxFailed
    });
      }

    function loadRWSColors()
    {

    jQuery.ajax({
      	type: "POST",
      	url: "/layouts/ajax.aspx/GetRWSColors",
      	contentType: "application/json; charset=utf-8",
      	dataType: "json",
      	async: false,
      	success: function (msg)
      	{
      		var colors = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;

      		if (colors != null)
      		{
      			jQuery("#ColorPicker ul li").hide();
      			for (var i = 0; i < colors.length; i++)
      			{
      				jQuery("#ColorPicker ul li span img[ID=" + colors[i] + "]").parent().parent().show();
      			}
      		}
      	},
      	error: AjaxFailed
    });
    }

function CalculateEstimation(area) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/CalculateEstimation",
        contentType: "application/json; charset=utf-8",
        data: "{area: '" + area + "'}",
        dataType: "json",
        success: function (msg) {
            var results = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;
            if (results != null) jQuery.each(results, function (index, item) {
                jQuery("#" + item.id).html(item.value);
            });
        },
        error: AjaxFailed
    });
}

function ClearSelectedProfile() {
    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/ClearSelectedProfile",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: AjaxFailed
    });
}

/*  general library */
var RuukkiLib = {};

/*  forms helper methods    */
RuukkiLib.Forms = function() {
}

/*  validation helper class */
RuukkiLib.Validation = function () {
}

/*  filters helper class */
RuukkiLib.Filters = function () {
}

RuukkiLib.Console = function () {
}

/*  ie compatibility */
RuukkiLib.IECompatibility = function () {
    // Add ECMA262-5 Array methods if not supported natively
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf = function (find, i /*opt*/) {
            if (i === undefined) i = 0;
            if (i < 0) i += this.length;
            if (i < 0) i = 0;
            for (var n = this.length; i < n; i++)
                if (i in this && this[i] === find)
                    return i;
            return -1;
        };
    }
    if (!('lastIndexOf' in Array.prototype)) {
        Array.prototype.lastIndexOf = function (find, i /*opt*/) {
            if (i === undefined) i = this.length - 1;
            if (i < 0) i += this.length;
            if (i > this.length - 1) i = this.length - 1;
            for (i++; i-- > 0; ) /* i++ because from-argument is sadly inclusive */
                if (i in this && this[i] === find)
                    return i;
            return -1;
        };
    }
    if (!('forEach' in Array.prototype)) {
        Array.prototype.forEach = function (action, that /*opt*/) {
            for (var i = 0, n = this.length; i < n; i++)
                if (i in this)
                    action.call(that, this[i], i, this);
        };
    }
    if (!('map' in Array.prototype)) {
        Array.prototype.map = function (mapper, that /*opt*/) {
            var other = new Array(this.length);
            for (var i = 0, n = this.length; i < n; i++)
                if (i in this)
                    other[i] = mapper.call(that, this[i], i, this);
            return other;
        };
    }
    if (!('filter' in Array.prototype)) {
        Array.prototype.filter = function (filter, that /*opt*/) {
            var other = [], v;
            for (var i = 0, n = this.length; i < n; i++)
                if (i in this && filter.call(that, v = this[i], i, this))
                    other.push(v);
            return other;
        };
    }
    if (!('some' in Array.prototype)) {
        Array.prototype.some = function (tester, that /*opt*/) {
            for (var i = 0, n = this.length; i < n; i++)
                if (i in this && tester.call(that, this[i], i, this))
                    return true;
            return false;
        };
    }

    /* extension to array */
    if (!Array.prototype.every) {
        Array.prototype.every = function (fun /*, thisp*/) {
            var len = this.length;
            if (typeof fun != "function")
                throw new TypeError();

            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in this &&
          !fun.call(thisp, this[i], i, this))
                    return false;
            }

            return true;
        };
    }
}

/*  prototypes  */
RuukkiLib.Validation.prototype.getSummaryValidationMessage = function (separator) {
    var s = "";
    var isValid = true;
    for (i = 0; i < Page_Validators.length; i++)
        if (!Page_Validators[i].isvalid &&
            typeof (Page_Validators[i].errormessage) == "string") {
            s += (Page_Validators[i].errormessage) + ((i == (Page_Validators.length)) ? "" : separator);
            isValid = false;
        }

    return { message: s,
        isValid: isValid
    };
}

RuukkiLib.Validation.prototype.getSummaryValidationMessage = function (validationGroup, separator) {
    var s = "";
    var isValid = true;
    for (i = 0; i < Page_Validators.length; i++)
        if (Page_Validators[i].validationGroup === validationGroup && !Page_Validators[i].isvalid &&
        typeof (Page_Validators[i].errormessage) == "string") {
            s += (Page_Validators[i].errormessage) + ((i == (Page_Validators.length)) ? "" : separator);
            isValid = false;
        }

    return { message: s,
        isValid: isValid
    };
}

RuukkiLib.Validation.prototype.isValidationGroupValid = function (validationGroup) {
    for (i = 0; i < Page_Validators.length; i++)
        if (Page_Validators[i].validationGroup === validationGroup) {
            if (!Page_Validators[i].isvalid)
                return false;
        }
    return true;
}

RuukkiLib.Validation.prototype.isControlValid = function (controlToValidateID) {
    for (i = 0; i < Page_Validators.length; i++)
        if (Page_Validators[i].controltovalidate === controlToValidateID) {
            if (!Page_Validators[i].isvalid)
                return false;
        }
    return true;
}

RuukkiLib.Validation.prototype.validateGroup = function (validationGroup) {
    Page_ClientValidate(validationGroup);
}

RuukkiLib.Filters.prototype.onlyNumericKeysFilter = function (event) {
    // allow: backspace, delete, tab and escape
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
        // allow: ctrl+a
                (event.keyCode == 65 && event.ctrlKey === true) ||
        // allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    else {
        // ensure that it is a number and stop the keypress
        if (event.altKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}

RuukkiLib.Forms.prototype.executeRequest = function (url, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", url);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

RuukkiLib.Forms.prototype.redirect = function (url) {
    window.location = url;
}

RuukkiLib.Forms.prototype.getCurrentPageURL = function (withoutParameters) {
    var url = document.location.href;

    if (typeof withoutParameters == "undefined")
        withoutParameters = false;

    if (withoutParameters == true) {
        if (url.indexOf("?") > -1) {
            url = url.substr(0, url.indexOf("?"));
        }
    }

    return url;
}

RuukkiLib.Forms.prototype.getCurrentHost = function () {
    if (document.location.port == "") {
        return document.location.protocol + '//' + document.location.hostname;
    } else {
        return document.location.protocol + '//' + document.location.hostname + ':' + document.location.port;
    }
}

RuukkiLib.Console.prototype.log = function(str){
    if (window.console) 
        console.log('[ruukki] ' + str);
}
    
/*  global objects initialization */
RuukkiLib.Validation = new RuukkiLib.Validation();
RuukkiLib.Filters = new RuukkiLib.Filters();
RuukkiLib.Console = new RuukkiLib.Console();
RuukkiLib.Forms = new RuukkiLib.Forms();
RuukkiLib.IECompatibility = new RuukkiLib.IECompatibility();