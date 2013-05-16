function correctHeader(jQueryObj) {
    // remove borders
    jQueryObj.attr("border", "0");
    // add classes to first row & change row td's to th's
    jQueryObj.find('tr:first').addClass("header").find('td').each(function () {
        var element = jQuery(this);
        var innerHtml = element.html();
        var colspan = element.attr("colspan");
        var align = element.attr("align");
        var valign = element.attr("valign");
        var style = element.attr("style");
        var width = element.attr("width");
        var attribs = "";
        var th = "<th"

        if (colspan != null) { attribs = " colspan=\"" + colspan + "\""; }
        if (align != null) { attribs += " align=\"" + align + "\""; }
        if (valign != null) { attribs += " valign=\"" + valign + "\""; }
        if (style != null) { attribs += " style=\"" + style + "\""; }
        if (width != null) { attribs += " width=\"" + width + "\""; }

        th = th + attribs + ">";

        var newHtml = th + innerHtml + '</th>';
        element.replaceWith(newHtml);
    });
}


function getMediaItemData(link) {
    var linkHref = link.attr("href");
    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetMediaItemInfo",
        contentType: "application/json; charset=utf-8",
        data: "{pageUrl:'" + linkHref + "'}",
        dataType: "json",
        success: function (msg) {
            var item = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;
            if (item != "") {
                link.html(link.html() + ' (' + item + ')');
            }
        },
        error: AjaxFailed
    });
}

function ModifyHtml(divId) {

    // modify html in live mode only
    if (live) {
        // modify normal content headings to include spacer class
        jQuery(".text-content > h2, .text-content > h3, .text-content > h4, .large-tab-area .content > h3, .large-tab-area .content > h4").each(function () {
            jQuery(this).addClass('spaced');
        });

        // form modifications
        // run modifications to html on every page
        // replacing all p elements from datatable
        jQuery(divId + ".dataTable td p").each(function () {
            var oldhtml = jQuery(this).html();
            var newhtml = '<br/>' + oldhtml + '<br/>';
            jQuery(this).replaceWith(newhtml);
        });
        // make sure every header column is th, not td
        jQuery(divId + ".dataTable thead td").each(function () {
            var thetxt = jQuery(this).html();
            var thehtml = '<th>' + thetxt + '</th>';
            jQuery(this).replaceWith(thehtml);
        });
        // add class to heading
        jQuery(divId + ".dataTable thead tr").addClass("header");
        // add sort links
        jQuery(divId + '.dataTable thead th').wrapInner('<a class="sort" />');

        // fix erroneous location of ending tbody-tag
        jQuery('.dataTable tbody').each(function () {
            var tbody = jQuery(this);
            var tfoot = tbody.next();
            tbody.replaceWith("<tbody>" + tbody.html() + tfoot.html() + "</tbody>");
            tfoot.remove();
        });

        // move latest update to the end of content
        jQuery('#main').after(jQuery('.latestUpdate').removeClass('hidden'));

        /*
        jQuery('.dataTable thead th:first').before("<th>test</th>");
        var i = 0;
        jQuery('.dataTable tbody tr').each( function() { 
				
        if(jQuery(this).find("td:first").attr("bgColor") != "")
        { 
        i++; 
        }
				
        jQuery(this).find("td:first").before("<td>" + i + "</td>") 

				
        });
        */
        jQuery.fn.dataTableExt.oStdClasses.sWrapper = "table";
        jQuery.fn.dataTableExt.oStdClasses.sPageButtonStaticDisabled = "paginate_button_disabled";


        // force any td to have something in it
        jQuery('td:empty').each(function () {
                  this.innerHTML = '&nbsp;';            
        });



        // get file extension and size to all media library links 
        
        jQuery(divId + "a[href*='~/media']").each(function () {
            var html = jQuery(this).html();
            if (html.toLowerCase().indexOf("<img") === -1) {
                getMediaItemData(jQuery(this));
            }
        });




        jQuery('.two-columns table, .large-tab-area table, .content-area table').each(function () {
            var thisClass = jQuery(this).attr("class");
            // remove left alignment from all tables
            jQuery(this).attr("align", "");


            // modify tables only if they have defined classes in them
            if (typeof (thisClass) != "undefined") {

                // remove possible erroneous thead-element
                jQuery(this).find("thead:empty").remove();

                if (thisClass == "Boxed" || thisClass == "hugin" || thisClass == "table") {
                    jQuery(this).removeClass("table");
                    jQuery(this).removeClass("Boxed");
                    // add attributes to the table
                    jQuery(this).attr("cellspacing", 0);
                    jQuery(this).attr("cellpadding", 0);
                    // wrap table inside some divs
                    jQuery(this).wrap('<div class="rowBoxed"><div class="table"><div class="table1"><div class="table2"><div class="content">');
                    correctHeader(jQuery(this));
                }

                if (thisClass == "Grid" || thisClass == "Lines" || thisClass == "GridWithSubTitle" || thisClass == "LinesWithSubTitle") {
                    var subtitleClass = "subtitle";
                    var normalTrClass = "";
                    // add attributes to the table
                    jQuery(this).attr("cellspacing", 0);
                    jQuery(this).attr("cellpadding", 0);
                    if (thisClass == "GridWithSubTitle" || thisClass == "LinesWithSubTitle") {
                        subtitleClass = "subtitle-grid";
                    }
                    if (thisClass == "GridWithSubTitle" || thisClass == "Grid") {
                        normalTrClass = "grid";
                    }

                    jQuery(this).attr("class", "simple");

                    correctHeader(jQuery(this));

                    if (thisClass == "GridWithSubTitle" || thisClass == "Grid") {
                        jQuery(this)
					            .find('tr')
					            .addClass(normalTrClass)
					            .find('td:not(:last)')
					            .each(function () {
					                jQuery(this).addClass("grid");
					            });
                    }
                    if (thisClass == "GridWithSubTitle" || thisClass == "LinesWithSubTitle") {
                        jQuery(this).find('tr:nth-child(2)').removeClass("grid").addClass(subtitleClass);
                        if (thisClass == "LinesWithSubTitle") {
                            jQuery(this)
					            .find('tr:nth-child(2)')
					            .find('td:not(:last)')
					            .each(function () {
					                jQuery(this).addClass("grid");
					            });
                        }
                    }

                    // give the tr parent element a class of subtitle if td has a colspan added
                    jQuery(this)
					            .find('tr')
					            .find('td')
					            .each(function () {
					               if (jQuery(this).attr('colspan') != "1" && jQuery(this).attr('colspan') != null) {
					                    jQuery(this).parent().removeClass("grid").addClass(subtitleClass);
					               }
					            });
                }
            }
        });


    }

}

// jQuery replacements of html
// media item information retrieved only if editMode = true (set on general.aspx layout)
jQuery(function () {
    // wffm
    // textbox
    jQuery('.form label.scfSingleLineTextLabel').wrap('<p><strong></strong></p>');
    jQuery('.form div.scfSingleLineGeneralPanel').wrap('<p class="text-input"><span></span></p>');
    // textarea
    jQuery('.form label.scfMultipleLineTextLabel').wrap('<p><strong></strong></p>');
    jQuery('.form div.scfMultipleLineGeneralPanel').wrap('<p></p>').removeClass();
    // dropdown
    jQuery('.form label.scfDropListLabel').wrap('<p><strong></strong></p>');
    jQuery('.form div.scfDropListGeneralPanel select').wrap('<p></p>').removeClass();
    jQuery('.form div.scfDropListGeneralPanel').removeClass();
    // radiobutton
    jQuery('.form label.scfRadioButtonListLabel').wrap('<p><strong></strong></p>');
    jQuery('.form div.scfRadioButtonListGeneralPanel table').wrap('<p></p>').removeClass();
    jQuery('.form div.scfRadioButtonListGeneralPanel').removeClass();
    // validators
    jQuery('.form .validator').attr('display', 'none');

    ModifyHtml("");
    
});

