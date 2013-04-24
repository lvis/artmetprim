/*var viewsContent = {};
var defaultPage = "#home";

function sendXMLHttpRequest(pageHref, onloadFunction)
{
	var pageContentReuqest = new XMLHttpRequest();
	pageContentReuqest.open("GET", pageHref, true);
	pageContentReuqest.onload = onloadFunction;
	pageContentReuqest.send();
}

function pushView(pageHref) 
{
	var pageSource = pageHref.replace('#','');
	var pushViewAjaxHandler = function(event)
	{
		viewsContent[pageHref] = event.target.responseText;
		fillView(viewsContent[pageHref]);
		updatePageTitle();	
	};
	
	sendXMLHttpRequest(pageSource, pushViewAjaxHandler);
}

function updatePageTitle()
{
	var pageContent = document.getElementById("content"); 
	
	if (pageContent && pageContent.getElementsByTagName("title"))
	{
		document.title = pageContent.getElementsByTagName("title").item(0).text;
	}
}

function popView()
{
	fillView(viewsContent[window.location.href]);
}

function fillView(content)
{
	var pageContent = document.getElementById("content");
	pageContent.innerHTML = content;
}

function window_popstate(event)
{
	if (viewsContent[window.location.href])
	{
		popView();
	}
	else if (window.location.hash == "")
	{
		pushView(window.location.href + defaultPage);
	}
	else
	{
		pushView(window.location.href);
	}	
}

window.addEventListener("popstate", window_popstate);*/

function content_load(event)
{
	document.title = 'ArtMetPrim - ' + event.target.contentWindow.document.title;
	event.target.setAttribute("height", event.target.contentWindow.document.height);
	event.target.setAttribute("width", event.target.contentWindow.document.width);
}

function document_ready()
{
	document.getElementById('content').addEventListener('load', content_load);
}

function window_popstate(event)
{
	if (window.location.hash == "")
	{
		document.getElementById('content').src = window.location.href + "home";
	}
	else
	{
		document.getElementById('content').src = window.location.href.replace('#','');
	}
}

$(document).ready(document_ready);
window.onpopstate = window_popstate;