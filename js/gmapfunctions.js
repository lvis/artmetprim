var dealerList;
var markerCluster;

var styles = [{
    url: '/images/m1.png',
    height: 53,
    width: 52,
    anchor: [0, 0],
    textSize: 10
}, {
    url: '/images/m2.png',
    height: 56,
    width: 55,
    anchor: [0, 0],
    textSize: 11
}, {
    url: '/images/m3.png',
    width: 66,
    height: 65,
    anchor: [0, 0],
    textSize: 12
}];

var infocontentTemplate = '<div class="column">#DATA</div>';

function initMap(mapID, centerLat, centerLong, zoomFactor) {


    jQuery(mapID).gmap3({ action: 'init',
        options: {
            center: [centerLat, centerLong],
            zoom: zoomFactor,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            navigationControl: true,
            scrollwheel: true,
            streetViewControl: true
        }
    }
    );


}

function loadData(mapID, clusterradius, country, dealer, searchterms) {
    jQuery.ajax({
        url: '/Httphandlers/Markerdata.ashx?c=' + country + "&d=" + dealer + "&s=" + searchterms,
        success: function (data) {
            dealerList = data;
            loadMarkers(mapID, clusterradius);
        }
    });
}

function reloadData(mapID, country, dealer, searchterms, pointzero) {
    jQuery.ajax({
        url: '/Httphandlers/Markerdata.ashx?c=' + country + "&d=" + dealer + "&s=" + searchterms,
        success: function (data) {
            dealerList = data;
            markerCluster.clearMarkers();
            jQuery(mapID).gmap3(
            { action: 'clear',
                name: 'marker'
            });
            reloadMarkers(mapID, markerCluster.getGridSize(), pointzero);
        }
    });
}

function loadMarkers(mapID, clusterradius) {
    jQuery(mapID).gmap3(
    { action: 'addMarkers',
        radius: 20,
        markers: dealerList,
        marker: {
            options: {
                icon: new google.maps.MarkerImage('http://maps.gstatic.com/mapfiles/icon_green.png')
            },
            events: {
                click: function (marker, event, data) {
                    var map = jQuery(this).gmap3('get'),
                      infowindow = jQuery(this).gmap3({ action: 'get', name: 'infowindow' });
                    if (infowindow) {
                        infowindow.open(map, marker);
                        infowindow.setContent(infocontentTemplate.replace("#DATA", data));
                    } else {
                        jQuery(this).gmap3(
                        { action: 'addinfowindow',
                            anchor: marker,
                            options:
                            {
                                content: infocontentTemplate.replace("#DATA", data)
                            }
                        });

                        infowindow = jQuery(this).gmap3({ action: 'get', name: 'infowindow' });
                        if (infowindow) {
                            google.maps.event.addListener(infowindow, 'domready', function () {
                                jQuery(".column").parent("div").addClass("infowindow");
                                jQuery(".column").parent("div").parent("div").addClass("infowindow");
                            });

                        }
                    }
                }

            }
        },
        callback: function (markers) {
            var map = jQuery(this).gmap3('get');


            markerCluster = new MarkerClusterer(map, markers, {
                maxZoom: 15,
                gridSize: clusterradius,
                styles: styles
            });

        }

    }
    );

}

function reloadMarkers(mapID, clusterradius, pointzero) {
    jQuery(mapID).gmap3(
    { action: 'addMarkers',
        radius: 20,
        markers: dealerList,
        marker: {
            options: {
                icon: new google.maps.MarkerImage('http://maps.gstatic.com/mapfiles/icon_green.png'),
                title: 'test'
            },
            events: {
                click: function (marker, event, data) {
                    var map = jQuery(this).gmap3('get'),
                      infowindow = jQuery(this).gmap3({ action: 'get', name: 'infowindow' });
                    if (infowindow) {
                        infowindow.open(map, marker);
                        infowindow.setContent(infocontentTemplate.replace("#DATA", data));
                    } else {
                        jQuery(this).gmap3(
                        { action: 'addinfowindow',
                            anchor: marker,
                            options:
                            {
                                content: infocontentTemplate.replace("#DATA", data)
                            }
                        });

                        infowindow = jQuery(this).gmap3({ action: 'get', name: 'infowindow' });
                        if (infowindow) {
                            google.maps.event.addListener(infowindow, 'domready', function () {
                                jQuery(".column").parent("div").addClass("infowindow");
                                jQuery(".column").parent("div").parent("div").addClass("infowindow");
                            });

                        }
                    }
                }

            }
        },
        callback: function (markers) {

            if (markers.length > 0) {

                var map = jQuery(this).gmap3('get');


                markerCluster = new MarkerClusterer(map, markers, {
                    maxZoom: 15,
                    gridSize: clusterradius,
                    styles: styles
                });

                checkVisibleMarkers(mapID, pointzero);

            }
            else {
                OpenDialog("No results", "The search gave no results");
            }
        }

    }
    );

}


function performSearch(mapID, mapcountry, caddress, dealergroup, terms, termschanged) {

    var fulladdress = caddress;

    if (caddress != '') {
        fulladdress = mapcountry + ", " + caddress;
    }


    jQuery(mapID).gmap3({
        action: 'getAddress',
        address: fulladdress,
        callback: function (results) {
            if (!results) {
                OpenDialog("No results", "The search gave no results");
            }
            else {

                var pointzero = results[0].geometry;

                if (termschanged) {
                    reloadData(mapID, mapcountry, dealergroup, terms, pointzero)
                } else {
                    checkVisibleMarkers(mapID, pointzero);

                }
                getDealers(mapcountry, caddress, dealergroup, terms);

            }

        }
    });


}

function existsInMap(marker) {
    return marker.getMap() != null;

}


function checkVisibleMarkers(mapID, pointzero) {

    var map = jQuery(mapID).gmap3('get');

    map.setCenter(pointzero.location);
    map.fitBounds(pointzero.viewport);


    markers = jQuery(mapID).gmap3({
        action: 'get',
        name: 'marker',
        all: true
    });


    var visibleMarkers = false;
    for (var i = 0; i < markers.length; i++) {
        if (map.getBounds().contains(markers[i].getPosition())) {
            visibleMarkers = true;
            break;
        }
    }

    if (!visibleMarkers) {
        if (markers.length > 0) {
            find_closest_marker(mapID, pointzero.location, markers);
        }
    }


}

function getDealers(mapcountry, address, dealergroup, terms) {

    jQuery.ajax({
        type: "POST",
        url: "/layouts/ajax.aspx/GetDealers",
        contentType: "application/json; charset=utf-8",
        data: "{country: '" + mapcountry + "',address: '" + address + "', searchtags:'" + terms + "', dealergroup: '" + dealergroup + "'}",
        dataType: "json",
        success: function (msg) {
            var dealers = (typeof msg.d) == 'string' ? eval('(' + msg.d + ')') : msg.d;
            var newHtml = '';
            var column = 1;
            var plist = jQuery('#dealerlist');

            plist.html("");
            if (dealers != null) {
                if (dealers.length > 0) {

                    jQuery(".print").show();
                    jQuery("#noresults").hide();

                    var row = jQuery("<div />").addClass("dealers");
                    for (var i = 0; i < dealers.length; i++) {

                        var p = jQuery("<div />").addClass("column");
                        p.html(dealers[i].Data);
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

                    //  show all available dealers on the map and fit them in the boundaries
                    //  1.  find our dealers in the DealerList array (we need to have ltd and lng, using dealer id)
                    //  2.  find all available markers for our dealers (using ltd and lng)
                    //  3.  fit our markers on the map

                    var map = jQuery("#map").gmap3('get');
                    var addressMarkers = new Array();
                    var availableDealers = new Array();

                    //  1.  find our dealers in the DealerList array (we need to have ltd and lng, using dealer id)
                    jQuery.each(dealerList, function (i, dealer) {
                        for(var i = 0; i < dealers.length; i++)
                        {
                            if (dealers[i].ID == dealer.tags)
                            {
                                availableDealers.push(dealer);
                            }
                        }
                    });


                    //  2.  find all available markers for our dealers (using ltd and lng)
                    //  all available markers on the map
                    var markers = jQuery("#map").gmap3({
                            action: 'get',
                            name: 'marker',
                            all: true
                    });

                    //  attempt to find markers for our found dealers only
                    jQuery.each(markers, function (i, marker) {
                        var position = marker.getPosition();
                        for(var i = 0; i < availableDealers.length; i++)
                        {
                            var dealer = availableDealers[i];
                            if (roundNumber(parseFloat(dealer.lng), 5) == roundNumber(position.lng(), 5) &&
                                roundNumber(parseFloat(dealer.lat), 5) == roundNumber(position.lat(), 5))
                            {
                                addressMarkers.push(marker);
                            }
                        }
                    });

                    //  3.  fit our markers on the map
                    if (addressMarkers.length > 0) {
                        fitToMarkers(map, addressMarkers);
                    }
                    else {
                        var markers = jQuery("#map").gmap3({
                            action: 'get',
                            name: 'marker',
                            all: true,
                        });

                        find_closest_marker("#map", map.getCenter(), markers);
                    }

                } else {
                    jQuery(".print").hide();
                    jQuery("#noresults").show();
                }

            } else {
                jQuery(".print").hide();
                jQuery("#noresults").show();
            }

        },
        error: AjaxFailed
    });
}

function rad(x) { return x * Math.PI / 180; }

function find_closest_marker(mapID, loc, markers) {
    var lat = loc.lat();
    var lng = loc.lng();
    var R = 6371;
    var distances = [];
    var closest = -1;
    var secondclosest = -1;

    var lat1 = loc.lat();
    var lon1 = loc.lng();


    var pi = Math.PI;

    for (i = 0; i < markers.length; i++) {

        var lat2 = markers[i].position.lat();
        var lon2 = markers[i].position.lng();

        var chLat = lat2 - lat1;
        var chLon = lon2 - lon1;


        var dLat = chLat * (pi / 180);
        var dLon = chLon * (pi / 180);

        var rLat1 = lat1 * (pi / 180);
        var rLat2 = lat2 * (pi / 180);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;


        distances[i] = d;
        if (closest == -1 || d < distances[closest]) {
            secondclosest = closest;
            closest = i;
        }

        if (secondclosest == -1 && d > distances[closest]) {
            secondclosest = i;
        }
    }


    var bounds = new google.maps.LatLngBounds();

    var clatlng = new google.maps.LatLng(lat, lng);
    bounds.extend(clatlng);

    if (closest != -1) {
        var flatlng = new google.maps.LatLng(markers[closest].position.lat(), markers[closest].position.lng());
        //        var slatlng = new google.maps.LatLng(markers[secondclosest].position.lat(), markers[secondclosest].position.lng());
        bounds.extend(flatlng);
        //        bounds.extend(slatlng);
    }

    var map = jQuery(mapID).gmap3('get');
    map.fitBounds(bounds);

}

function fitToMarkers(map, markers) {
    var bounds = new google.maps.LatLngBounds();

    // create bounds from markers
    for (var i = 0; i < markers.length; i++) {
        var latlng = markers[i].getPosition();
        bounds.extend(latlng);
    }

 
     // don't zoom in too far on only one marker
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.03, bounds.getNorthEast().lng() + 0.03);
        var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.03, bounds.getNorthEast().lng() - 0.03);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
    }
   
    map.fitBounds(bounds);
}

function roundNumber(number, decimals) { 
	var newnumber = new Number(number+'').toFixed(parseInt(decimals));
	return parseFloat(newnumber); 
}