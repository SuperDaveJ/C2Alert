/*
''' <summary>
''' This module is used to contain the main shared javascript functions for the application
''' </summary>
*/

var gadgetVersion = 1.0;            //Gadget version
var backgroundIndex = 0;            //Background image
var gadgetLink;                     //Gadget link
var gadgetText;                     //Gadget text
var gadgetWidth ="500px";           //Gadget width
var gadgetHeight ="300px";          //Gadget height
var Links = new Array();            //Links
var PublishedList = new Array();    //Published list
var smallVersion = false;           //Small version

System.Gadget.settingsUI = "Settings.html";

/*
''' <summary>
''' This function is used to setup the alert gadget
''' </summary>
*/
function SetupAlert() 
{
    Resize();
    System.Gadget.onUndock = docked;
    System.Gadget.onDock = docked;

    var DefaultFeed = "http://www.c2mm.net/C2Alert/RSSFeed.aspx";

    System.Gadget.Settings.write("FeedURL", DefaultFeed);

    //GetFeed();

    window.setInterval(GetFeed, (1 * 2 * 30 * 60000));
    System.Gadget.Flyout.file = "C2AlertFlyout.html";
} //SetupAlert

/*
''' <summary>
''' This function is used to resize the alert gadget
''' </summary>
*/
function Resize()
{
    with (document.body.style) 
    {
        if (System.Gadget.Settings.read("MiniC2Alert") == true)
	    {
		    width = 130; 
		    height = 106;
	    }
	    else
	    {
		    width = 130; 
		    height = 200;
	    }
    }

    backgroundIndex = 0;

    if (System.Gadget.Settings.read("MiniC2Alert") == true)
    {
	    System.Gadget.background = "url(../Images/SmallImages/box" + backgroundIndex + ".png)";
	    document.getElementById("LoadingDiv").style.top = "73px";
	    document.getElementById("ErrorDiv").style.top = "73px";
        document.getElementById("Content").style.top = "26px";
        document.getElementById("Content").style.height = "46px";
        document.getElementById("Content").style.fontsize = "9px";
	    document.getElementById("RefreshDiv").style.top = "83px";
	}
	else
	{
	    System.Gadget.background = "url(../Images/box" + backgroundIndex + ".png)";
	    document.getElementById("LoadingDiv").style.top = "98px";
	    document.getElementById("ErrorDiv").style.top = "98px";
        document.getElementById("Content").style.top = "51px";
	    document.getElementById("Content").style.height = "111px";
	    document.getElementById("Content").style.fontsize = "10px";
	    document.getElementById("RefreshDiv").style.top = "173px";
	}} //Resize

function SetVisited(sURL)
{

if (System.Gadget.Settings.read("visited0")== sURL)
  document.getElementById("cell0").style.color = "gray";
  
if (System.Gadget.Settings.read("visited1")== sURL)
  document.getElementById("cell1").style.color = "gray";

if (System.Gadget.Settings.read("visited2")== sURL)
  document.getElementById("cell2").style.color = "gray";

if (System.Gadget.Settings.read("visited3")== sURL)
  document.getElementById("cell3").style.color = "gray";

if (System.Gadget.Settings.read("visited4")== sURL)
  document.getElementById("cell4").style.color = "gray";


}
function ReSetVisited()
{

  document.getElementById("cell0").style.color = "#006699";
  document.getElementById("cell1").style.color = "#006699";
  document.getElementById("cell2").style.color = "#006699";
  document.getElementById("cell3").style.color = "#006699";
  document.getElementById("cell4").style.color = "#006699";


}

function showFlyout(sURL, sthis, sTitle, PublishedList)
{

    System.Gadget.Settings.write("visited" + sthis,sURL);
    System.Gadget.Settings.write("dilbertTitle",sTitle);
    
    document.getElementById("cell" + (sthis)).style.color = "gray";
    document.getElementById("cell" + (sthis)).style.title = sURL;
    var d = new Date(PublishedList)
                if (d.getDay()==0)
 	            {
                 gadgetWidth = 580;
                 gadgetHeight = 320;
                }
                else
                {
                 gadgetWidth =580;
                 gadgetHeight = 240;
                 }
                               
	if (System.Gadget.Flyout.show == false)
	{
	        System.Gadget.Settings.write("sURL", sURL);
	        System.Gadget.Flyout.file = "DilbertFlyout.html";
	        System.Gadget.Flyout.show = true;
	}
	else
	{
	      if (d.getDay()==0)
	        {
	            hideFlyout();
	        }
	        else
	        {
	            if (System.Gadget.Settings.read("sURL")==sURL)
	            {
	            System.Gadget.Settings.write("sURL", "myURL");
	            hideFlyout();
	            }
	            else
	            {
	                System.Gadget.Settings.write("sURL", sURL);
	                System.Gadget.Flyout.file = "DilbertFlyout.html";
	                System.Gadget.Flyout.show = true;
	            }
	       }
	}
}

var wait = function (msecs)
{
var start = new Date().getTime();
var cur = start
while(cur - start < msecs)
{
cur = new Date().getTime();
}
}
function resetEverything()
{
var i;

    System.Gadget.Settings.write("visited4",System.Gadget.Settings.read("visited3"));
    System.Gadget.Settings.write("visited3",System.Gadget.Settings.read("visited2"));
    System.Gadget.Settings.write("visited2",System.Gadget.Settings.read("visited1"));
    System.Gadget.Settings.write("visited1",System.Gadget.Settings.read("visited0"));
    System.Gadget.Settings.write("visited0","new");
    
}
function changeBG(value)
{
    //resetEverything(); 
    var i =0;

    if (!value) { value = 0; }
    
    if (value==0)
    {
        i = 1;
        backgroundIndex = i;
	}
    else
    {
        i = 0;
        backgroundIndex = i;   
	}
	
	if (System.Gadget.Settings.read("MiniC2Alert") == true)
	{
	System.Gadget.background = "url(../images/small/box" + backgroundIndex + ".png)";
    }
	else
	{
    System.Gadget.background = "url(../images/box" + backgroundIndex + ".png)";
    }
}
function docked() {
	//styleDocked.disabled = false;
	//var i = Math.round(100*Math.random())

	
	Resize();
	
}


////////////////////////////////////////////////////////////////////////////////
// XML Functions TO GET  feed 
////////////////////////////////////////////////////////////////////////////////
function GetFeed() {
 try
 {
        ErrorDiv.style.visibility = "hidden";
		LoadingDiv.style.visibility = "visible";
		content.style.visibility = "hidden";
		
	LoadingDiv.style.visibility = "visible";
	LoadingDiv.title  = "Connecting...";					
//    var rssObj  = new ActiveXObject("Microsoft.XMLHTTP");

//	var rssFeed = "http://feeds.feedburner.com/VistaDllbert23" + "?random=" + Math.random()*1 ;
//	//Message(rssFeed); 
//	rssObj.open("GET", rssFeed , true);
//	//wait(20); 
//	rssObj.onreadystatechange = function() {
//		if (rssObj.readyState === 4) {
//			if (rssObj.status === 200) {	
//				LoadingDiv.innerText = "";				
//				rssXML = rssObj.responseXML;
//				backgroundIndex = 0;
//				parseRSS();
//				content.style.visibility = "visible";
//				LoadingDiv.style.visibility = "hidden";
//				if (chkConn) { clearInterval(chkConn); }
//			} else {
//				var chkConn;
//			    content.style.visibility = "hidden";
//		        LoadingDiv.style.visibility = "hidden";
//		        ErrorDiv.innerText = " Service not available " +rssObj.status;
//		        ErrorDiv.style.visibility = "visible";
//		 		chkConn = setInterval(GetFeed, 30 * 60000);
//			}
//    	} else {
//    	    LoadingDiv.style.visibility = "visible";
//			LoadingDiv.title = "Connecting...";
//		}
//	}	
//	rssObj.send(null);

var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
	    xmlDocument.onreadystatechange = function () {
		if (xmlDocument.readyState == 4) {
			LoadingDiv.innerText = "";				
				rssXML = xmlDocument;
	        	backgroundIndex = 0;
				parseRSS();
				content.style.visibility = "visible";
				LoadingDiv.style.visibility = "hidden";
		}
		else
		{
    	    LoadingDiv.style.visibility = "visible";
			LoadingDiv.title = "Connecting...";
	 		//chkConn = setInterval(GetFeed, 30 * 60000);
		}
	};
	xmlDocument.load("http://feeds.feedburner.com/vistadilbert23" + "?random=" + Math.random()*1);
	
	}
	catch(e)
	{
	            content.style.visibility = "hidden";
		        LoadingDiv.style.visibility = "hidden";
		        ErrorDiv.innerText = " Service not available" ;
		        ErrorDiv.style.visibility = "visible";

	}
}

function Mid(str, start, len)
        /***
                IN: str - the string we are LEFTing
                    start - our string's starting position (0 based!!)
                    len - how many characters from start we want to get

                RETVAL: The substring from start to start+len
        ***/
        {
                // Make sure start and len are within proper bounds
                if (start < 0 || len < 0) return "";

                var iEnd, iLen = String(str).length;
                if (start + len > iLen)
                        iEnd = iLen;
                else
                        iEnd = start + len;

                return String(str).substring(start,iEnd);
        }

function clearAll()
{
	document.getElementById("cell0").innertext = "Clear";
	document.getElementById("cell1").innertext = "Clear";
	document.getElementById("cell2").innertext = "Clear";
	document.getElementById("cell3").innertext = "Clear";
	document.getElementById("cell4").innertext = "Clear";
}

function parseRSS(backgroundIndex) {
	if (!backgroundIndex) { backgroundIndex = 0; }
	start = backgroundIndex * 5;
	end = (backgroundIndex * 5) + 5;
	rssItems = rssXML.getElementsByTagName("item");
	rssTitle = null; rssAuthors = null; rssSummary = null; rssLink = null;
	
	if (end > rssItems.length)
	{
	end = rssItems.length
	}
	ReSetVisited();
	for (i=start; i<end; i++) {
		
		if (start > rssItems.length)
	    {
		}
		else
		{
		    rssTitle = rssItems[i].firstChild.text;
		    rssSummary = rssItems[i].getElementsByTagName("description"); 
		    rssSummary = rssSummary[0].text;
		    
		    if (rssItems[i].getElementsByTagName("pubDate")[0]) 
		    {rssPubDate = rssItems[i].getElementsByTagName("pubDate")[0].text; }
		                  
		    System.Gadget.Flyout.file = "DilbertFlyout.html";
    		
    		var position_jpg=rssSummary.indexOf('.jpg');
		    
		    var position_http=rssSummary.indexOf('http');
		    var position_gif=rssSummary.indexOf('.gif');
		    var position_img =0;
		        if (position_gif >0)
		        {
		        position_img=position_gif-position_http;
		        }
		        else
		        {
		        position_img=position_jpg-position_http;
		        }
		    
		    rssItem= Mid(rssSummary,position_http,position_img + 4);
    		cell = i - (backgroundIndex * 5);
    		if (cell==0)
    		 {
    		 var cellzero = document.getElementById("cell0").innerHTML;
    		   if (cellzero.indexOf(rssItem)>0)
    		    {
    		    //resetEverything();
    		    }
    		    else
    		    {
    		     resetEverything();
    		    }
    		 }

                  PublishedList = rssPubDate;
		          var buf = rssTitle.split(" ");
                  var MiniC2Alerttitle;
   	               MiniC2Alerttitle = buf[2].substr(0, 3) + "-";
   	               MiniC2Alerttitle += buf[3].substr(0, buf[3].length - 1) + "-";
   	               MiniC2Alerttitle += buf[4].substr(2, 3);
	   	           
	   	              var title;
	                  title = buf[2].substr(0, 4) + " ";
	                  title += buf[3] + " ";
	                  title += buf[4];
	    	       
	   	           
		            if (System.Gadget.Settings.read("MiniC2Alert") ==true) {
   	               //var MiniC2Alerttitle = Mid(rssTitle,10,7) + Mid(rssTitle,19,2)
				    document.getElementById("cell" + (cell)).innerHTML = '<div align="center" onclick="showFlyout(\'' + rssItem + '\',\'' + cell + '\',\''+ title + '\',\'' + PublishedList +'\');">' + MiniC2Alerttitle + '</div>';
	               }
	               else {
	                    document.getElementById("cell" + (cell)).innerHTML = '<div align="center" onclick="showFlyout(\'' + rssItem + '\',\'' + cell + '\',\'' + title + '\',\'' + PublishedList + '\');">' + title + '</div>';
	               }
		    document.getElementById("cell" + (cell)).title = rssTitle + "Click to show/hide";
		    SetVisited(rssItem);
		}
	}
	
}
function hideFlyout()
{
   System.Gadget.Flyout.show = false;
}
function BuildDilbertOfTheDay()
{
 
        var comicStripSrc = System.Gadget.Settings.read("sURL");
        var titleComicStrip= System.Gadget.Settings.read("dilbertTitle");
        try
        {
           document.write('<table border=0 cellspacing=0><tr><td colspan=2><font size="3" face ="Calibiri" color="#006699"><b>&nbsp;Dilbert for ' + titleComicStrip + '</font></b>&nbsp;&nbsp;<a title ="Go to the comic strip backgroundIndex" href="'+ comicStripSrc +'?gadget=true" ><img src="images/link.png" border=0/></a></td></tr><tr><td  colspan=2 align=center><hr noshade="true" size="1"><img border=0 src=' + comicStripSrc + '></td></tr><tr><td><font face ="verdana" size = 1>&nbsp;&nbsp;Date Published: ' + titleComicStrip + '</font></td><td width = 50% align=right><iframe src="http://csharptricks.com/Projects/Gadgets/news.htm" width="100%" Height="20" frameborder="0"></iframe></td></tr></table>');
	    }
        catch(e)
        {
        Message (e);
        }    
        
       
        
}

function startUpPage() {
    //Resize the page
    document.body.style.width = System.Gadget.document.parentWindow.gadgetWidth;
    document.body.style.height = System.Gadget.document.parentWindow.gadgetHeight;
}
function Message(prompt)
{
var WshShell = new ActiveXObject("WScript.Shell");
var BtnCode = WshShell.Popup(prompt, 7, "Innovate With Gadgets!", 64);
}