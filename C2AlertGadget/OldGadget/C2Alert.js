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
    System.Gadget.onUndock = Docked;
    System.Gadget.onDock = Docked;

    var DefaultFeed = "http://www.c2mm.net/C2Alert/RSSFeed.aspx";

    System.Gadget.Settings.write("FeedURL", DefaultFeed);

    GetFeed();

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
	        System.Gadget.Settings.read("MiniC2Alert") = false;
            width = 130; 
		    height = 106;
	    }
	    else
	    {
	        System.Gadget.Settings.read("MiniC2Alert") = true;
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
	}
} //Resize

/*
''' <summary>
''' This function is used to set the visited link color
''' </summary>
''' <param name="link">Visited link</param>
*/
function SetVisited(link)
{
    if (System.Gadget.Settings.read("visited0") == link)
    {
        document.getElementById("cell0").style.color = "#736f6e";
    }

    if (System.Gadget.Settings.read("visited1") == link) 
    {
        document.getElementById("cell1").style.color = "#736f6e";
    }

    if (System.Gadget.Settings.read("visited2") == link) 
    {
        document.getElementById("cell2").style.color = "#736f6e";
    }

    if (System.Gadget.Settings.read("visited3") == link) 
    {
        document.getElementById("cell3").style.color = "#736f6e";
    }

    if (System.Gadget.Settings.read("visited4") == link) 
    {
        document.getElementById("cell4").style.color = "#736f6e";
    }
} //SetVisited

/*
''' <summary>
''' This function is used to reset the visited link color
''' </summary>
*/
function ResetVisited()
{
  document.getElementById("cell0").style.color = "#0000ff";
  document.getElementById("cell1").style.color = "#0000ff";
  document.getElementById("cell2").style.color = "#0000ff";
  document.getElementById("cell3").style.color = "#0000ff";
  document.getElementById("cell4").style.color = "#0000ff";
} //ResetVisited

/*
''' <summary>
''' This function is used to set the visited link color
''' </summary>
''' <param name="link">Visited link</param>
''' <param name="linkIndex">Visited link index</param>
''' <param name="title">Title</param>
''' <param name="publishedList">Published list</param>
*/
function ShowFlyout(link, linkIndex, title, publishedList)
{
    System.Gadget.Settings.write("visited" + linkIndex, link);
    System.Gadget.Settings.write("C2AlertTitle", title);
    
    document.getElementById("cell" + (linkIndex)).style.color = "#736f6e";
    document.getElementById("cell" + (linkIndex)).style.title = link;
                     
	if (System.Gadget.Flyout.show == false)
	{
	    System.Gadget.Settings.write("link", link);
	    System.Gadget.Flyout.file = "C2AlertFlyout.html";
	    System.Gadget.Flyout.show = true;
	}
	else
	{
	    if (System.Gadget.Settings.read("link") == link)
	    {
	        System.Gadget.Settings.write("link", "MyURL");
	        HideFlyout();
	    }
	    else
	    {
	        System.Gadget.Settings.write("link", link);
	        System.Gadget.Flyout.file = "C2AlertFlyout.html";
	        System.Gadget.Flyout.show = true;
	    }
	}
} //ShowFlyout

/*
''' <summary>
''' This function is used to wait the specified number of milliseconds
''' </summary>
''' <param name="msecs">Milliseconds to wait</param>
*/
var wait = function (msecs)
{
    var start = new Date().getTime();
    var cur = start

    while(cur - start < msecs)
    {
        cur = new Date().getTime();
    }
} //wait

/*
''' <summary>
''' This function is used to reset all of the visited links
''' </summary>
*/
function ResetVisitedLinks()
{
    var i;

    System.Gadget.Settings.write("visited4",System.Gadget.Settings.read("visited3"));
    System.Gadget.Settings.write("visited3",System.Gadget.Settings.read("visited2"));
    System.Gadget.Settings.write("visited2",System.Gadget.Settings.read("visited1"));
    System.Gadget.Settings.write("visited1",System.Gadget.Settings.read("visited0"));
    System.Gadget.Settings.write("visited0","new");
} //ResetVisitedLinks

/*
''' <summary>
''' This function is used to change the alert background
''' </summary>
*/
function ChangeBackground(value)
{
    var i =0;

    if (!value) 
    {
        value = 0; 
    }
    
    if (value == 0)
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
	    System.Gadget.background = "url(../Images/SmallImages/box" + backgroundIndex + ".png)";
    }
	else
	{
        System.Gadget.background = "url(../Images/box" + backgroundIndex + ".png)";
    }
} //ChangeBackground

/*
''' <summary>
''' This function is called when the control is docked or undocked
''' </summary>
*/
function Docked() 
{
	Resize();
} //Docked

/*
''' <summary>
''' This function is used to clear all of the link div elements
''' </summary>
*/
function ClearAll() 
{
    document.getElementById("cell0").innertext = "Clear";
    document.getElementById("cell1").innertext = "Clear";
    document.getElementById("cell2").innertext = "Clear";
    document.getElementById("cell3").innertext = "Clear";
    document.getElementById("cell4").innertext = "Clear";
} //ClearAll

/*
''' <summary>
''' This function is used to start up the flyout page
''' </summary>
*/
function StartUpPage() 
{
    //Resize the page
    document.body.style.width = System.Gadget.document.parentWindow.gadgetWidth;
    document.body.style.height = System.Gadget.document.parentWindow.gadgetHeight;
} //StartUpPage

/*
''' <summary>
''' This function is used to hide the flyout window
''' </summary>
*/
function HideFlyout() 
{
    System.Gadget.Flyout.show = false;
} //HideFlyout

/*
''' <summary>
''' This function is used to get the RSS feed data
''' </summary>
*/
function GetFeed() 
{
    try
    {
        ErrorDiv.style.visibility = "hidden";
        LoadingDiv.style.visibility = "visible";
        Content.style.visibility = "hidden";
		
        LoadingDiv.style.visibility = "visible";
        LoadingDiv.title  = "Connecting...";					

        var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');

        xmlDocument.onreadystatechange = function () 
        {
            if (xmlDocument.readyState == 4) 
            {
                LoadingDiv.innerText = "";				
                rssXML = xmlDocument;
                backgroundIndex = 0;
                ParseRSS(backgroundIndex);
                content.style.visibility = "visible";
                LoadingDiv.style.visibility = "hidden";
            }
            else
            {
                LoadingDiv.style.visibility = "visible";
                LoadingDiv.title = "Connecting...";
            }
        };

        xmlDocument.load("http://www.c2mm.net/C2Alert/RSSFeed.aspx");
	}
	catch(e)
	{
	    Content.style.visibility = "hidden";
		LoadingDiv.style.visibility = "hidden";
		ErrorDiv.innerText = " Service not available" ;
		ErrorDiv.style.visibility = "visible";
	}
} //GetFeed

/*
''' <summary>
''' This function is used to parse the rss feed for the data
''' </summary>
''' <param name="backgroundIndex">Background index</param>
*/
function ParseRSS(backgroundIndex) 
{
    if (backgroundIndex == null) 
    {
        backgroundIndex = 0; 
    }
	
    start = backgroundIndex * 5;
	end = (backgroundIndex * 5) + 5;

	rssItems = rssXML.getElementsByTagName("item");
	rssTitle = null; 
    rssAuthors = null;
	rssSummary = null; 
    rssLink = null;
	
	if (end > rssItems.length)
	{
	    end = rssItems.length
	}

	ResetVisited();

	for (i = start; i < end; i++) 
    {
        if (start <= rssItems.length) 
        {
		    rssTitle = rssItems[i].firstChild.text;
		    rssSummary = rssItems[i].getElementsByTagName("description"); 
		    rssSummary = rssSummary[0].text;

		    if (rssItems[i].getElementsByTagName("pubDate")[0]) 
            {
		        rssPubDate = rssItems[i].getElementsByTagName("pubDate")[0].text; 
            }
		                  
		    System.Gadget.Flyout.file = "C2AlertFlyout.html";

		    cell = i - (backgroundIndex * 5);

            if (cell == 0)
            {
                var cellzero = document.getElementById("cell0").innerHTML;

                if (cellzero.indexOf(rssItem) <= 0)
                {
                    ResetVisitedLinks();
                }
            }

            publishedList = rssPubDate;

            var buf = rssTitle.split(" ");

            var miniC2AlertTitle;

//            miniC2AlertTitle = buf[2].substr(0, 3) + "-";
//            miniC2AlertTitle += buf[3].substr(0, buf[3].length - 1) + "-";
//            miniC2AlertTitle += buf[4].substr(2, 3);
	   	           
	   	    var title;
	        title = buf[2].substr(0, 3) + " ";
	        title += buf[3] + " ";
	        title += buf[4];

	        miniC2AlertTitle = title;

	        if (System.Gadget.Settings.read("MiniC2Alert") == true) 
            {  
                document.getElementById("cell" + (cell)).innerHTML = '<div align="center" onclick="ShowFlyout(\'' + rssItem + '\',\'' + cell + '\',\''+ title + '\',\'' + PublishedList +'\');">' + miniC2AlertTitle + '</div>';
            }
            else 
            {
                document.getElementById("cell" + (cell)).innerHTML = '<div align="center" onclick="ShowFlyout(\'' + rssItem + '\',\'' + cell + '\',\'' + title + '\',\'' + PublishedList + '\');">' + title + '</div>';
            }

		    document.getElementById("cell" + (cell)).title = rssTitle + "Click to show/hide";
		    SetVisited(rssItem);
		}
	}
} //ParseRSS

/*
''' <summary>
''' This function is used to load the selected RSS feed item
''' </summary>
*/
function LoadAlert()
{
    var alertLink = System.Gadget.Settings.read("link");
    var titleAlert = System.Gadget.Settings.read("C2AlertTitle");

    try
    {
        document.write('<table border=0 cellspacing=0><tr><td colspan=2><font size="3" face ="Calibiri" color="#006699"><b>&nbsp;C² Alert for ' + titleAlert + '</font></b>&nbsp;&nbsp;<a title ="Go to the alert page" href="' + alertLink + '?gadget=true" ><img src="Images/link.png" border=0/></a></td></tr><tr><td  colspan=2 align=center><hr noshade="true" size="1">' + alertLink + '</td></tr><tr><td><font face ="verdana" size = 1>&nbsp;&nbsp;Date Published: ' + titleComicStrip + '</font></td><td width = 50% align=right><iframe src="http://csharptricks.com/Projects/Gadgets/news.htm" width="100%" Height="20" frameborder="0"></iframe></td></tr></table>');
	}
    catch(e)
    {
        Message (e);
    }
} //LoadAlert

/*
''' <summary>
''' This function is used to show a message if there is an error loading the alerts
''' </summary>
''' <param name="prompt">Error message</param>
*/
function Message(prompt)
{
    var WshShell = new ActiveXObject("WScript.Shell");
    var BtnCode = WshShell.Popup(prompt, 7, "C² Alert", 64);
} //Message