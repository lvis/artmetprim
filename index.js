// var viewsContent =
// {
// };
// var defaultPage = "#home";
//
// function sendXMLHttpRequest(pageHref, onloadFunction)
// {
// var pageContentReuqest = new XMLHttpRequest();
// pageContentReuqest.open("GET", pageHref, true);
// pageContentReuqest.onload = onloadFunction;
// pageContentReuqest.send();
// }
//
// function pushView(pageHref)
// {
// var pageSource = pageHref.replace('#','');
// var pushViewAjaxHandler = function(event)
// {
// viewsContent[pageHref] = event.target.responseText;
// fillView(viewsContent[pageHref]);
// updatePageTitle();
// };
//
// sendXMLHttpRequest(pageSource, pushViewAjaxHandler);
// }
//
// function updatePageTitle()
// {
// var pageContent = document.getElementById("content");
//
// if (pageContent && pageContent.getElementsByTagName("title"))
// {
// document.title =
// pageContent.getElementsByTagName("title").item(0).text;
// }
// }
//
// function popView()
// {
// fillView(viewsContent[window.location.href]);
// }
//
// function fillView(content)
// {
// var pageContent = document.getElementById("content");
// pageContent.innerHTML = content;
// }
//
// function window_popstate(event)
// {
// if (viewsContent[window.location.href])
// {
// popView();
// }
// else if (window.location.hash == "")
// {
// pushView(window.location.href + defaultPage);
// }
// else
// {
// pushView(window.location.href);
// }
// }
//
// window.addEventListener("popstate", window_popstate);

function handle_contentLoad(event)
{
    var iframe = window.document.getElementById("content");
    var iframeDocument = (iframe.contentWindow || iframe.contentDocument);
    if (iframeDocument.document)
    {
        iframeDocument = iframeDocument.document;
    }
    window.document.title = 'ArtMetPrim - ' + iframeDocument.title;
}