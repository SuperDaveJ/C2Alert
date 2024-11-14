
var gadgetVer = 1.0;
var page = 0;

var g_sURL;
var g_sHtmlString;
var myWidthVariable ="620px";
var myHeightVariable ="210px";
 System.Gadget.settingsUI = "../Settings.html";
        
function showFlyout(sURL)
{
	if (System.Gadget.Flyout.show == false)
	{
	        
	         myWidthVariable ="620px";
	         myHeightVariable ="210px";
	        
	
	        System.Gadget.Settings.write("sURL", sURL);
	        System.Gadget.Flyout.file = "C2GadgetFlyout.html";
	        System.Gadget.Flyout.show = true;
	}
	else
	{
	        
	         myWidthVariable ="620px";
	         myHeightVariable ="210px";
	        
	        
	        if (System.Gadget.Settings.read("sURL").indexOf('.jpg') >0)
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
	                System.Gadget.Flyout.file = "C2GadgetFlyout.html";
	                System.Gadget.Flyout.show = true;
	            }
	       }
	}
}
function setup() {

	System.Gadget.onUndock = docked;
	System.Gadget.onDock = docked;
	getRSS();
	window.setInterval(getRSS, (30 * 60000));
	System.Gadget.Flyout.file = "C2GadgetFlyout.html";
	var i = (Math.round(100*Math.random()))%7;
	//alert(i);
	System.Gadget.background = "url(../images/C2AlertGadgetBackground" + i + ".png)";
	//this.document.body.background ="url('../images/box5.png')";
}
function changeBG()
{
    var i = (Math.round(100*Math.random()))%7;
    System.Gadget.background = "url(../images/C2AlertGadgetBackground" + i + ".png)";
}
function docked() {
	//styleDocked.disabled = false;
	//var i = Math.round(100*Math.random())

	with (document.body.style) {
		width = 130; 
		height = 200;
	}
}
////////////////////////////////////////////////////////////////////////////////
// XML Functions TO GET THE feed 
////////////////////////////////////////////////////////////////////////////////
function getRSS() {
 try
 {
        error.style.visibility = "hidden";
		loading.style.visibility = "visible";
		
	loading.innerText = "Connecting...";					
	rssObj = new ActiveXObject("Msxml2.XMLHTTP");
	rssObj.open("GET", "http://localhost/C2Alert.Web/Latestnews.aspx", true);
	rssObj.onreadystatechange = function() {
		if (rssObj.readyState === 4) {
			if (rssObj.status === 200) {	
				loading.innerText = "";				
				rssXML = rssObj.responseXML;
				page = 0;
				parseRSS();
				if (chkConn) { clearInterval(chkConn); }
			} else {
				var chkConn;
			    content.style.visibility = "hidden";
		        loading.style.visibility = "hidden";
		        error.innerText = "  Service not    available";
		        error.style.visibility = "visible";
	
				chkConn = setInterval(getRSS, 30 * 60000);
			}
    	} else {
			loading.innerText = "Connecting...";
		}
	}	
	rssObj.send(null);
	}
	catch(e)
	{
	            content.style.visibility = "hidden";
		        loading.style.visibility = "hidden";
		        error.innerText = "  Service not    available";
		        error.style.visibility = "visible";
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

function parseRSS(page) {
	if (!page) { page = 0; }
	start = page * 5;
	end = (page * 5) + 5;
	rssItems = rssXML.getElementsByTagName("item");
	rssTitle = null; rssAuthors = null; rssSummary = null; rssLink = null;
	
	if (end > rssItems.length)
	{
	end = rssItems.length
	}
	for (i=start; i<end; i++) {
		
		if (start > rssItems.length)
	    {
		}
		else
		{
		rssTitle = rssItems[i].firstChild.text;
		rssSummary = rssItems[i].getElementsByTagName("description"); rssSummary = rssSummary[0].text;
		var position_http=rssSummary.indexOf('http');
		var position_gif=rssSummary.indexOf('.gif');
		var position_jpg=rssSummary.indexOf('.jpg');
		var position_img =0;
		System.Gadget.Flyout.file = "C2GadgetFlyout.html";
		
		if (position_gif >0)
		{
		position_img=position_gif-position_http;
		}
		else
		{
		position_img=position_jpg-position_http;
		}
		rssItem= Mid(rssSummary,position_http,position_img + 4);
		
		cell = i - (page * 5);
		document.getElementById("cell" + (cell)).innerHTML = '<div id ="title" align="center" onclick="showFlyout(\'' + rssItem + '\');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,10,25) + '<div class="sub"></div></div>';//'+ cell + '::' + i + '::' + page + '::' + start + '::' + end + '
		document.getElementById("cell" + (cell)).title = "Click to show/hide";
		}
	}
	
}
function hideFlyout()
{
   System.Gadget.Flyout.show = false;
}
function BuildNewsList()
{

    try
        {
        document.write('<img src=' + System.Gadget.Settings.read("sURL") + '>');
	    }
        catch(e)
        {
        }   
}

function startUpPage() {
    //Resize the page
    document.body.style.width = System.Gadget.document.parentWindow.myWidthVariable;
    document.body.style.height = System.Gadget.document.parentWindow.myHeightVariable;
}