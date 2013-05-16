var dealerid = 0;
var actHouse = "";
var actRoof = "";
var actRoofName = "";
var actRoofId = "";
var actRoofColor = "";
var actRoofColorName = "";
var actRWS = "";
var actRWSName = "";
var actWall = "";
var actAccess = "";
var actList = "houses";
var housestep = 0;
var roofstep = 0;
var roofcolorstep = 0;
var wallstep = 0;
var rwsstep = 0;
var accessstep = 0;

var allhouse = 0;
var allroof = 0;
var allroofcolor = 0;
var allwall = 0;
var allrws = 0;
var allaccess = 0;

var rwslink = "";
var rooflinks = new Array();
var rooftitle = "";

var fb_share_title = "";
var fb_share_description = "";

var parentdomain;

function getViewportWidth() {

	var viewportwidth = 0;

	// mozilla/netscape/opera/IE7
	if ( typeof window.innerWidth != 'undefined' ) {
		viewportwidth = window.innerWidth;
	}
	// IE6
	else if ( typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		viewportwidth = document.documentElement.clientWidth;
	}
	// regi IE
	else {
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
	}
	
	return viewportwidth;
}

/**-------------------------------------------------------------**/

function getViewportHeight() {

	var viewportheight = 0;

	// mozilla/netscape/opera/IE7
	if ( typeof window.innerWidth != 'undefined' ) {
		viewportheight = window.innerHeight;
	}
	// IE6
	else if ( typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		viewportheight = document.documentElement.clientHeight;
	}
	// regi IE
	else {
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}
	
	return viewportheight;
}

/**-------------------------------------------------------------**/

function showImage( image_path ) {
	var div_width = getViewportWidth();
	var div_height = getViewportHeight();
	alert( 'width: '+getViewportWidth()+'; height: '+getViewportHeight() );
	getImageWidth( image_path );
	var img_container = document.createElement( 'div' );
	img_container.innerHTML = "<h1>Hi there and greetings!</h1>";
	// img_container.setAttribute( "className", "gallery_pic_container" );
	img_container.setAttribute( "style", "width: 100px; height: 100px; position: absolute; top: 100px; left: 100px; display: none;" );
	img_container.setAttribute( "id", "valami" );
	var bodyID = document.getElementById("sitebody");
	// var bodyID = document.getElementsByTagName("body")[0];
	bodyID.appendChild(img_container);
	Effect.Appear('valami');
}

/**-------------------------------------------------------------**/

function getImageWidth( image_path ) {
	var pic_id = "pic_"+Math.round( Math.random() * 10000 );
	alert( "pic_id: "+pic_id );
	var Image = document.createElement( 'img' );
}

/**-------------------------------------------------------------**/

function getImageHeight( id ) {
}

/**-------------------------------------------------------------**/

function feldob(nev) {
    var layer = document.getElementById(nev);
    // layer.style.visibility = "visible";
    layer.style.display = "block";
}

/**-------------------------------------------------------------**/

function ki(nev) {
    var layer = document.getElementById(nev);
    // layer.style.visibility = "hidden";
    layer.style.display = "none";
}

function setColor(id, image, color, alpha) {
	$('#loader').css('display', 'block');
	$.ajax({
		type: "GET",
	    url: "create_image.php",
	    data: "image="+image+"&color="+color+"&alpha="+alpha,
	    success: function(data){
			$('#loader').css('display', 'none');
			$('#'+id).attr('src', data);
	    }
	});
}

function resetHouse() {
	$('#house').attr('src', 'main_images/house1_wall.png');
	$('#roof').attr('src', 'main_images/roof1.png');
	$('#roof_access').attr('src', 'main_images/house1_accesories.png');
	$('#windows').attr('src', 'main_images/windows.png');
}

function showChooser(id) {

	$('#chooser_menu').css('display', 'block');
	
	var innerdivs = document.getElementById('menu_inner').getElementsByTagName('div');
	for(var i = 0; i < innerdivs.length; i++) {
		innerdivs[i].style.display = "none";
	}

	var innerdivs2 = document.getElementById(id).getElementsByTagName('div');
	for(var i = 0; i < innerdivs2.length; i++) {
		innerdivs2[i].style.display = "block";
	}

	$('#'+id).css('display', 'block');
	actList = id;
	
	$('.arrow').css('display', 'block');
	
	var allwidth;
	switch(actList) {
		case "houses":
			step = housestep;
			allwidth = allhouse;
		break;
		case "roof_profiles":
			step = roofstep;
			allwidth = allroof;
		break;
		case "roof_colors":
			step = roofcolorstep;
			allwidth = allroofcolor;
		break;
		case "rws_list":
			step = rwsstep;
			allwidth = allrws;
		break;
		case "wall_list":
			step = wallstep;
			allwidth = allwall;
		break;
		case "access_list":
			step = accessstep;
			allwidth = allaccess;
		break;
	}
	
	console.log('menu opened - '+actList);
	
	$('#'+id).css('width', allwidth);
	
	$('#'+actList).css('left', '0px');
	
	var btnlst = new Array('houses', 'roof_profiles', 'roof_colors', 'rws_list', 'wall_list', 'access_list');
	for (var i = 0; i < btnlst.length; i++) {
		if (btnlst[i] == actList) {
			$('#'+actList+'_left').css('background-image', 'url("images/btn_left_sel.gif")');
			$('#'+actList+'_center').css('background-image', 'url("images/btn_back_sel.gif")');
			$('#'+actList+'_right').css('background-image', 'url("images/btn_right_sel.gif")');
		} else {
			$('#'+btnlst[i]+'_left').css('background-image', 'url("images/btn_left.gif")');
			$('#'+btnlst[i]+'_center').css('background-image', 'url("images/btn_back.gif")');
			$('#'+btnlst[i]+'_right').css('background-image', 'url("images/btn_right.gif")');
		}
	}
	
	$('#arrow_left').attr('src', 'images/arrow_left_disabled.gif');
	
	if (allwidth - Math.abs(parseInt($('#'+actList).css('left'))) < 846) {
		$('#arrow_right').attr('src', 'images/arrow_right_disabled.gif');
	} else {
		$('#arrow_right').attr('src', 'images/arrow_right.gif');
	}
	
	$('.closeBtn').css('display', 'block');
}

function closeChooser() 
{
	console.log('menu closed');
	var innerdivs = document.getElementById('menu_inner').getElementsByTagName('div');
	
	for(var i = 0; i < innerdivs.length; i++) 
	{
		innerdivs[i].style.display = "none";
	}
	$('#chooser_menu').css('display', 'none');
	$('.arrow').css('display', 'none');
	$('.closeBtn').css('display', 'none');
}

function changeHouse(name, pic, id, group) 
{
	actHouse = name;
	console.log('house changed: '+actHouse);
	$('#house_main_div').html('');
	$('#wall_div').html('');
	$('#roof_div').html('');
	$('#rws_div').html('');
	$('#access_div').html('');
	
	var splitpic = pic.split("/");
	loadPic(splitpic[0]+'/'+splitpic[1]+'/', splitpic[2], 'house_main');
	
	$.ajax({
		type: "GET",
		url: "ajax.php",
		data: "gethousedef=1&houseid="+id+"&group="+group,
		success: function(data) 
		{
			eval(data);
			
			if (housedefs[0] == "") 
			{
				$('#wall_div').html('');
			} 
			else 
			{
				loadPic('cache', actHouse+'W'+housedefs[0]+'.png', 'wall');
				//$('#wall_div').html('<img src="../../../apps.ruukki.com/ruukki21/public_html/js/cache/'+actHouse+'W'+housedefs[0]+'.png">');
			}
			if (housedefs[0] == "") 
			{
				$('#roof_div').html('');
			} 
			else 
			{
				loadPic('cache', actHouse+''+housedefs[1]+''+housedefs[2]+'.png', 'roof');
				//$('#roof_div').html('<img src="../../../apps.ruukki.com/ruukki21/public_html/js/cache/'+actHouse+''+housedefs[1]+''+housedefs[2]+'.png">');
			}
			if (housedefs[0] == "") 
			{
				$('#rws_div').html('');
			} 
			else 
			{
				loadPic('cache', actHouse+'rannit'+housedefs[3]+'.png', 'rws');
				//$('#rws_div').html('<img src="../../../apps.ruukki.com/ruukki21/public_html/js/cache/'+actHouse+'rannit'+housedefs[3]+'.png">');
			}
			if (housedefs[0] == "") 
			{
				$('#access_div').html('');
			} 
			else 
			{
				loadPic('cache', actHouse+'Accessories'+housedefs[4]+'.png', 'access');
				//$('#access_div').html('<img src="../../../apps.ruukki.com/ruukki21/public_html/js/cache/'+actHouse+'Accessories'+housedefs[4]+'.png">');
			}
		}
	});
	
	//$('#house_main').attr('src', pic);
}

function changeRoofColor(newcolor, name) {

	//console.log('roof color changed: '+actRoofColorName);

	actRoofColor = newcolor;
	actRoofColorName = name;
	changeRoof(actRoof, actRoofId, newcolor);	
	if (rooflinks[actRoofId] != "") 
	{
		$('#roof_info_title').html(rooftitle+': ');
		/*('+newcolor+')*/
		$('#roof_info').html(actRoofName+', '+name);
		$('#teaser_one_link1 a').attr('href', rooflinks[actRoofId]);
		
		if (dealerid > 0) 
		{
			$('#info_btn').attr('href', rooflinks[actRoofId]);
		}
	}
}

function changeRoof(roof, roofid, color, domain) 
{

	console.log('roof changed: '+actRoof);

	actRoofId = roofid;
	actRoof = roof;
	actRoofColor = color;
	//loadPic('cache', actHouse+roof+actRoofColor+'.png', 'roof');
	if (color == "") {
		$.ajax({
			type: "GET",
			url: "ajax.php",
			data: "getroofcolor=1&roofid="+roofid+"&house="+actHouse+"&roofname="+roof+"&domain="+domain,
			success: function(data) {
				eval(data);
				if (actRoofColor == "") {
					alert("No picture uploaded for this color!");
				} else {
					if (rooflinks[actRoofId] != "") {
						$('#roof_info_title').html(rooftitle+': ');
						/*('+actRoofColor+')*/
						$('#roof_info').html(actRoofName+', '+actRoofColorName);
						$('#teaser_one_link1 a').attr('href', rooflinks[actRoofId]);
						if (dealerid > 0) {
							$('#info_btn').attr('href', rooflinks[actRoofId]);
						}
					} else {
						//$('#roof_title').html('');
						$('#teaser_one_link1 a').attr('href', 'javascript:void(0);');
						if (dealerid > 0) {
							$('#info_btn').attr('href', 'javascript:void(0);');
						}
					}
					loadPic('cache', actHouse+roof+actRoofColor+'.png', 'roof');
				}
				/*$.ajax({
					type: "GET",
					url: "ajax.php",
					data: "file_exists=1&filename=cache/"+actHouse+roof+actRoofColor+'.png',
					success: function(data) {
						if (data == "true") {
							
						} else {
							alert("No picture uploaded for this color!");
						}
					}
				});*/
			}
		});
	} else {
		loadPic('cache', actHouse+roof+actRoofColor+'.png', 'roof');
	}
	//$('#roof').attr('src', 'cache/'+actHouse+roof+actRoofColor+'.png');
}

function changeColor(code, type, name) {
	var filename;
	switch(type){
		case "wall":
			actWall = "W"+code;
			filename = actHouse+"W"+code+".png";
		break;
		case "rws":
			filename = actHouse+"rannit"+code+".png";
			actRWSName = name;
			actRWS = "rannit"+code;
			$('#rws_info').html(actRWSName);
			$('#teaser_one_link2 a').attr('href', rwslink);
		break;
		case "access":
			actAccess = "Accessories"+code;
			filename = actHouse+"Accessories"+code+".png";
		break;
	}
	
	console.log(type+' color changed: '+code);
	
	$.ajax({
		type: "GET",
	    url: "ajax.php",
	    data: "file_exists=1&filename=cache/"+filename,
	    success: function(data) {
			if (data == "true") {
				loadPic('cache', filename, type);
			} else {
				alert("No picture uploaded for this color!");
			}
	    }
	});
	
	//$('#'+type).attr('src', 'cache/'+filename);
}

function loadRoofColors(roofid, domain) 
{
	$('#chooser_loader').css('display', 'block');
	$('#roof_colors').html('');
	console.log("roofid="+roofid+"&domain="+domain+"&house="+actHouse);
	$.ajax({
		type: "GET",
	    url: "ajax.php",
	    data: "roofid="+roofid+"&domain="+domain+"&house="+actHouse,
	    success: function(data) 
		{
			var splitted = data.split("#@#");
			$('#roof_colors').html(splitted[1]);
			eval(splitted[0]);
			$('#chooser_loader').css('display', 'none');
			showChooser('roof_colors');
	    }
	});
}

function loadColors(name, domain) 
{
	$('#chooser_loader').css('display', 'block');
	$.ajax({
		type: "GET",
	    url: "ajax.php",
	    data: "getcolors=1&type="+name+"&domain="+domain+"&house="+actHouse,
	    success: function(data) 
		{
			var splitted = data.split("#@#");
			$('#'+name+'_list').html(splitted[1]);
			eval(splitted[0]);
			$('#chooser_loader').css('display', 'none');
			showChooser(name+'_list');
	    }
	});
}

function loadPic(dir, filename, id) 
{
	$('#cover').css('display', 'block');
	$('#loader').css('display', 'block');

	if (navigator.userAgent.indexOf("MSIE") == -1) 
	{
		$('#'+id+'_div').image(dir+'/'+filename, function()
		{
			$('#cover').css('display', 'none');
			$('#loader').css('display', 'none');
		});
	} else {
		var valami = navigator.userAgent.indexOf("MSIE");
		var fullVersion = navigator.userAgent.substring(valami+5);

		if (parseInt(fullVersion.substr(0, 1)) == 7 || parseInt(fullVersion.substr(0, 1)) == 8) {
			$('#'+id+'_div').image(dir+'/'+filename+'?rand='+Math.random(), function(){
				$('#cover').css('display', 'none');
				$('#loader').css('display', 'none');
			});
		} else {
			$('#'+id+'_div').image(dir+'/'+filename, function(){
				$('#cover').css('display', 'none');
				$('#loader').css('display', 'none');
			});
		}
	}
}

$.fn.image = function(src, f){ 
	return this.each(function() { 
		var i = new Image(); 
		i.src = src; 
		i.onload = f; 
		$(this).html(i);
	});
}

$(document).ready(function() 
{
	parentdomain = "ruukkiroofs.com";
	
	var fullurl = (window.location != window.parent.location) ? document.referrer: document.location;

	if (url) 
	{
		var url = fullurl.split("http://");
		pdomain = url[1].split("/");
		
		if (pdomain[0].indexOf("www.") != -1) 
		{
			pdomain = pdomain[0].split("www.");
			parentdomain = pdomain[1];
		} 
		else 
		{
			parentdomain = pdomain[0];
		}
	}
	
	if (rooflinks[actRoofId] != "") 
	{
		$('#roof_info_title').html(rooftitle+': ');
		/*('+actRoofColor+')*/
		$('#roof_info').append(actRoofName+', '+actRoofColorName);
		$('#teaser_one_link1 a').attr('href', rooflinks[actRoofId]);
		
		if (dealerid > 0) 
		{
			$('#info_btn').attr('href', rooflinks[actRoofId]);
		}
	}
	var rwsarray = actRWS.split("rannit");
	/*('+rwsarray[1]+')*/
	$('#rws_info').append(actRWSName);
	$('#teaser_one_link2 a').attr('href', rwslink);
	
	$("#dealer_video").bind('ended', function()
	{
		$("#dealer_video_container").remove();
	});
	
});

function videostopped() 
{
	$("#dealer_video_container").remove();
}

var t;
var animRunning = false;

function moveList(way) 
{
	var actLeft = $('#'+actList).css('left');
	var step = 846;
	var allwidth;
	switch(actList) 
	{
		case "houses":
			step = housestep;
			allwidth = allhouse;
		break;
		case "roof_profiles":
			step = roofstep;
			allwidth = allroof;
		break;
		case "roof_colors":
			step = roofcolorstep;
			allwidth = allroofcolor;
		break;
		case "rws_list":
			step = rwsstep;
			allwidth = allrws;
		break;
		case "wall_list":
			step = wallstep;
			allwidth = allwall;
		break;
		case "access_list":
			step = accessstep;
			allwidth = allaccess;
		break;
	}
	
	if (!animRunning) 
	{
		if (way == "left" && parseInt(actLeft) < 0) 
		{
			animRunning = true;
			$('#'+actList).animate({left: parseInt(actLeft)+parseInt(step)+"px"}, 
			{
				duration: 1000, 
				easing: 'linear',
				complete: function() 
				{
					animRunning = false;
					
					if (parseInt($('#'+actList).css('left')) >= 0) 
					{
						$('#'+actList).css('left', '0px');
						$('#arrow_left').attr('src', 'images/arrow_left_disabled.gif');
						if (allwidth - Math.abs(parseInt($('#'+actList).css('left'))) > 846) {
							$('#arrow_right').attr('src', 'images/arrow_right.gif');
						}
					}
				}
			});
			//$('#'+actList).css('left', parseInt(actLeft)+parseInt(886)+"px");
		}
		if (way == "right" && (allwidth - Math.abs(parseInt($('#'+actList).css('left'))) > 846)) 
		{
			animRunning = true;
			$('#arrow_left').attr('src', 'images/arrow_left.gif');
			$('#'+actList).animate({left: parseInt(actLeft)-parseInt(step)+"px"}, 
			{
				duration: 1000, 
				easing: 'linear',
				complete: function() 
				{
					animRunning = false;
					if (allwidth - Math.abs(parseInt($('#'+actList).css('left'))) < 846) 
					{
						$('#arrow_right').attr('src', 'images/arrow_right_disabled.gif');
					}
				}
			});
			//$('#'+actList).css('left', parseInt(actLeft)-parseInt(886)+"px");
		}
	}
}

function openCBEmail(url, house, roof, roofcolor, wall, rws, access, height) 
{
	CB_Open('href='+url+'&parentdomain='+encodeURIComponent(parentdomain)+'&house='+house+'&roof='+roof+'&roofname='+encodeURIComponent(actRoofName)+'&roofcolor='+roofcolor+'&roofcolorname='+encodeURIComponent(actRoofColorName)+'&wall='+wall+'&rws='+rws+'&rwscolor='+encodeURIComponent(actRWSName)+'&access='+access+',,width=450,,height='+height);
}

function shareFB(house, roof, roofcolor, wall, rws, access) 
{
	console.log('Dreamhouse Share in Facebook');
	var url = encodeURIComponent('http://apps.ruukki.com/ruukki21/public_html/house_share.php?house='+house+'&roof='+roof+'&roofname='+encodeURIComponent(actRoofName)+'&roofcolor='+roofcolor+'&wall='+wall+'&rws='+rws+'&access='+access+"&v="+Math.random()+"&title="+fb_share_title+"&desc="+fb_share_description+'&pagetext='+fb_share_page_text);
	var title = encodeURIComponent('Ruukki Dreamhouse');
	window.open('http://www.facebook.com/sharer/sharer.php?u='+url, 'FB_share', 'width=400, height=300');
}

function shareFBQuiz() 
{
	var url = encodeURIComponent(document.location);
	window.open('http://www.facebook.com/sharer/sharer.php?u='+url, 'FB_share', 'width=400, height=300');
}

function openCBPrint(url, house, roof, roofcolor, wall, rws, access, height) 
{
	console.log('Dreamhouse Print');
	CB_Open('href='+url+'&house='+house+'&roof='+roof+'&roofname='+encodeURIComponent(actRoofName)+'&roofcolor='+roofcolor+'&roofcolorname='+encodeURIComponent(actRoofColorName)+'&wall='+wall+'&rws='+rws+'&rwscolor='+encodeURIComponent(actRWSName)+'&access='+access+',,width=820,,height='+height);
}