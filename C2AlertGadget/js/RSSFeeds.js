var L_SI_ERRORMESSAGE	= "Selected settings no longer valid.";
var L_ZFI_ERRORMESSAGE	= "No alerts to display.";

var L_MS_ERRORMESSAGE = "C² Alerts are not available.";
var L_RRFD_ERRORMESSAGE	= "This gadget displays C² Alerts";
var L_MSIE_ERRORMESSAGE	= L_MS_ERRORMESSAGE;
var L_ZF_ERRORMESSAGE	= L_RRFD_ERRORMESSAGE;

var L_FCE_ERRORMESSAGE	= "View Alerts";
var L_FCEHOVER_ERRORMESSAGE = "View Alerts (turns on automatic feed updates)";
var L_LOADING_TEXT	= "Loading";
var L_SHOWNEXT_TEXT	= "Next";
var L_SHOWPREV_TEXT	= "Previous";
var L_NAVTITLE_TEXT	= "Alerts ";
var L_TITLEFORDROP_TEXT = "All Alerts";
var L_ARTICLES_TEXT	= " alerts";
var articleArray	= new Array(10, 20, 40, 100);
var L_ARTICLES_TEXT	= new Array();
L_ARTICLES_TEXT[0]	= "10 alerts";
L_ARTICLES_TEXT[1] = "20 alerts";
L_ARTICLES_TEXT[2] = "40 alerts";
L_ARTICLES_TEXT[3] = "100 alerts";

var g_msFeedManagerProgID	= "Microsoft.FeedsManager";
var g_msFeedManager	= null;
var g_returnFeed	= null;
var g_viewElements	= null;
var g_noFeeds	= true;
var g_downloadErrorFlag	= false;
var g_feedNameLength;
var g_showInBrowser	= "";
var g_currentFeedPath	= "http://www.c2mm.net/C2Alert/RSSFeed.aspx";
var g_currentFeedUrl = "http://www.c2mm.net/C2Alert/RSSFeed.aspx";
var g_totalViewableItems	= "";
var g_feedTitleCharLength	= 36;
var g_stringTitleLength	= 20;
var g_countToView	= 3;
var g_feedTotal	= 0;
var g_currentArrayIndex	= 0;
var g_timerMilliSecs	= 10000;
var g_loadingMilliSecs	= 10000;
var g_lastCalledArrayIndex; 
var g_lastClickedUrl;
var g_feedURL;
var g_feedTitle;
var g_feedForFlyout;
var g_gadgetErrorFlag;
var g_timer;
var g_timerFlag;
var g_drawerTimer;
var g_alphaInTimer;
var g_loadFirstTime;
var g_feedClicked;
var g_feedLocalID;
var g_timerFlyoutFlag;
var g_getFeedTimer;
var g_interGetFeedInterval	= 30000;	//Interval between GetFeed calls (30 seconds)
var g_interGetFeedIntervalOnFirstLoad = 5000; //Interval between GetFeed calls (first load-> 5 seconds)
var g_currentInterGetfeedInterval;
var g_totalFeedCount;
var g_totalFeedItemCount;
var g_totalEmptyFeedCount;
var g_tempReturnFeed	= null;
var g_feedPaths;
var g_feedsCurrentlySelected;
var g_currentFeedData;
var g_feedDownloadTimes;
var g_currentFeedItemIndex;
var fFirstTime;
var fInProgress;
var fNewDataReady;
var fSomethingToDo; //At least one feed was queued for refresh

//var ZERO_TIMESTAMP_MILLISECONDS = new Date(1899,11,30).getTime();	//MSDN documentation for IFeedItem::PubDate (http://msdn.microsoft.com/en-us/library/ms685800(VS.85).aspx)
//									//The interface returns 0 if pubdate is not specified in source and this constant represents the representative date for value 0 as per the above documentation
function LoadSettings()
{
	var tempSettings = new GetRssSettings();
	g_currentFeedPath = tempSettings.rssFeedPath;
	g_currentFeedUrl = tempSettings.rssFeedUrl;
	g_totalViewableItems = tempSettings.rssFeedCount;
	StopPolling();
}
function StartTimer() 
{
    if (g_timerFlag) 
    {
        StopTimer();
        g_timer = SetInterval(SetNextViewItems, g_timerMilliSecs);
    }
}

function StopTimer() 
{
    if (g_timerFlag) 
    {
        clearInterval(g_timer);
    }
}

function StartPolling() 
{
    StopPolling();
    System.Debug.outputString("Start Polling : Pull feeds queued up in bursts"); //DEBUG CODE
    g_getFeedTimer = SetInterval(GetDataForNextFeed, g_currentInterGetFeedInterval);
}

function StopPolling() 
{
    if (g_getFeedTimer !== undefined) 
    {
        System.Debug.outputString("Stop Polling : Stop pull of queued feeds"); //DEBUG CODE
        clearInterval(g_getFeedTimer);
    }
}

function ClearViewElements() 
{
    PositionNumbers.innerText = "";
    for (i = 0; i < 3; i++) 
    {
        if (g_viewElements !== null) 
        {
            g_viewElements.FeedItems[i].innerHTML = "";
            g_viewElements.FeedItems[i].href = "";
            g_viewElements.FeedItems[i].innerText = "";
            g_viewElements.FeedItems[i].setAttribute("name", "");
            g_viewElements.FeedItems[i].setAttribute("localId", "");
        }

        eval("FeedItemName" + i).innerHTML = "";
        eval("FeedItemName" + i).style.backgroundColor = "";
        eval("FeedItemName" + i).innerText = "";
        eval("FeedItemName" + i).setAttribute("title", "");

        eval("FeedItemDate" + i).innerHTML = "";
        eval("FeedItemDate" + i).style.backgroundColor = "";
        eval("FeedItemDate" + i).innerText = "";
        eval("FeedItemDate" + i).setAttribute("title", "");

        eval("FeedItemLink" + i).style.textOverflow = "";
        eval("FeedItemLink" + i).style.overflow = "";
        eval("FeedItemLink" + i).style.whiteSpace = "";
        eval("FeedItemLink" + i).style.width = "0px";
    }
}

function ClearBorder() 
{
    for (var i = 0; i < 3; i++) 
    {
        if (eval("FeedItem" + i) != undefined) 
        {
            eval("FeedItem" + i).style.border = "";
        }
    }
}

function ViewElementsObject() 
{
    this.FeedItems = new Array();
    this.FeedTitleLink = document.getElementById("FeedTitleLink");
    this.FeedTitleCount = document.getElementById("FeedTitleCount");
    for (var i = 0; i < 3; i++) 
    {
        var newElement = document.getElementById("FeedItemLink" + i);
        newElement.onfocusin = newElement.onmouseover;
        newElement.onfocusout = newElement.onmouseout;
        newElement.hideFocus = true;
        this.FeedItems.push(newElement);
    }
}

function SetAltLabels() 
{
    ButtonRightNarrator.alt = ButtonRightNarrator.title = L_SHOWNEXT_TEXT;
    ButtonLeftNarrator.alt = ButtonLeftNarrator.title = L_SHOWPREV_TEXT;
}

function CheckVisibility() 
{
    isVisible = System.Gadget.visible;
    if (!isVisible) 
    {
        StopTimer();
    }
    if (isVisible) 
    {
        StartTimer();
    }
}

function CheckStateLite() 
{
    if (!System.Gadget.docked) 
    {
        g_curLinkWidth = "250px";
        with (document.body.style) 
        {
            height = "232px";
            width = "296px";
        }
        with (FeedBackground.style) 
        {
            height = "232px";
            width = "296px";
        }
        FeedBackground.src = "url(Images/rssBackBlue_undocked.png)";
    }
    else if (System.Gadget.docked) 
    {
        g_curLinkWidth = "113px";
        with (document.body.style) 
        {
            height = "173px";
            width = "130px";
        }
        with (FeedBackground.style) 
        {
            height = "173px";
            width = "130px";
        }
        FeedBackground.src = "url(Images/rssBackBlue_docked.png)";
    }
}

function CheckState() 
{
    if (!System.Gadget.docked) 
    {
        UnDockedState();
    }
    else if (System.Gadget.docked) 
    {
        DockedState();
    }
}

function CheckFlyforTimer() 
{
    if (!System.Gadget.Flyout.show) 
    {
        StartTimer();
    }
}

function ShowSpinner(posTop) 
{
    ClearViewElements();
    ClearBorder();
    ErrorTextLink.innerHTML = "<p style=\"margin:0px;padding-bottom:10px;\">"
							+ "<img border=\"0\" src=\"Images/Loading.gif\" />"
							+ "</p>" + L_LOADING_TEXT;
    ErrorTextLink.className = "textLoad";
    ErrorTextLink.style.cursor = "default";
    ErrorTextLink.title = L_LOADING_TEXT;

    ShowHideUIElementBlocks(false, true, true)

    ErrorTextHldr.style.textAlign = "center";
    ErrorTextHldr.style.top = posTop;
}

function ShowHideUIElementBlocks(bShowNavigationHolder, bShowFeedItemsHolder, bShowErrorMessageHolder) 
{
    if (bShowNavigationHolder !== undefined && bShowNavigationHolder !== null) 
    {
        if (bShowNavigationHolder)
            NavHolder.style.visibility = "visible";
        else
            NavHolder.style.visibility = "hidden";
    }

    if (bShowFeedItemsHolder !== undefined && bShowFeedItemsHolder !== null) 
    {
        if (bShowFeedItemsHolder) 
        {
            FeedItemHldr.style.visibility = "visible";
            FeedItemHldr.style.display = "inline";
        }
        else 
        {
            FeedItemHldr.style.visibility = "hidden";
            FeedItemHldr.style.display = "none";
        }
    }

    if (bShowErrorMessageHolder !== undefined && bShowErrorMessageHolder !== null) 
    {
        if (bShowErrorMessageHolder)
            ErrorTextHldr.style.visibility = "visible";
        else
            ErrorTextHldr.style.visibility = "hidden";
    }
}

function LoadData() 
{
    RefreshRssFeedData();
    CheckState();
    CheckFlyforTimer();
    System.Gadget.onUndock = CheckState;
    System.Gadget.onDock = CheckState;
}

function LoadMain() 
{
    //Set narrator position
    ButtonLeftNarrator.style.left = "2px";
    ButtonRightNarrator.style.right = "2px";

    fFirstTime = true;
    fInProgress = false;
    fNewDataReady = false;
    fSomethingToDo = false;
    g_feedPaths = new Array();
    g_feedsCurrentlySelected = new Array();
    g_currentFeedData = new Array();
    g_feedDownloadTimes = new Array();
    g_currentInterGetFeedInterval = g_interGetFeedIntervalOnFirstLoad;
    g_totalFeedCount = 0;
    g_totalFeedItemCount = 0;
    g_totalEmptyFeedCount = 0;
    g_currentFeedItemIndex = -1;
    g_returnFeed = null;
    ClearViewElements();
    ClearBorder();

    g_gadgetErrorFlag = 0;

    LoadSettings();
    g_viewElements = new ViewElementsObject();
    g_currentArrayIndex = 0;
    SetAltLabels();

    System.Gadget.visibilityChanged = CheckVisibility;
    System.Gadget.Flyout.file = "flyout.html";
    System.Gadget.onShowSettings = LoadSettings;

    CheckStateLite();
    ShowSpinner('35%');

    setTimeout(LoadData, 1000);
    document.body.focus();
}

function DisplayMessage(errorText, bShowSettingsWrench) 
{
    ClearBorder();
    ClearViewElements();
    ShowHideUIElementBlocks(false, false, true);

    StopTimer();
    StopPolling();
    g_timerFlag = false;

    if (bShowSettingsWrench !== undefined && bShowSettingsWrench !== null) 
    {
        if (bShowSettingsWrench) 
        {
            System.Gadget.settingsUI = "settings.html";
            g_gadgetErrorFlag = 0;
        }
        else 
        {
            System.Gadget.settingsUI = "";
            g_gadgetErrorFlag = 2;
        }
    }

    ErrorTextHldr.style.textAlign = "center";
    ErrorTextLink.className = "textView";
    ErrorTextHldr.style.top = "30%";
    if (errorText == L_FCE_ERRORMESSAGE) 
    {
        ErrorTextLink.innerHTML = "<p style=\"margin:0px;padding-bottom:5px;\">"
								+ "<img src=\"Images/rssLogo.gif\" border=\"0\" />"
								+ "</p>" + errorText;
        ErrorTextLink.style.cursor = "pointer";
        ErrorTextLink.title = L_FCEHOVER_ERRORMESSAGE;
        g_gadgetErrorFlag = 1;
    }
    else 
    {
        ErrorTextLink.style.cursor = "default";
        ErrorTextLink.innerHTML = errorText;
        ErrorTextLink.title = "";
    }
}

function LoadMSFeedManager() 
{
    //Make sure we have a handle to the feed manager
    if (g_msFeedManager == null) 
    {
        try 
        {
            g_msFeedManager = new ActiveXObject(g_msFeedManagerProgID);
            if (g_msFeedManager == null) 
            {
                DisplayMessage(L_MS_ERRORMESSAGE, false);
                g_timerFlag = false;
                return null;
            }
        }
        catch (e) 
        {
            DisplayMessage(L_MS_ERRORMESSAGE, false);
            g_timerFlag = false;
        }
    }
}

function RefreshRssFeedData() 
{
    LoadMSFeedManager();
    if (g_loadFirstTime == "defaultGadget" && g_msFeedManager.BackgroundSyncStatus == 0) 
    {
        g_msFeedManager = null;
        DisplayMessage(L_FCE_ERRORMESSAGE, false);
        g_timerFlag = false;
    }
    else 
    {
        g_msFeedManager = null;
        if (fNewDataReady && !fInProgress)	//If all feeds queued up last time have been pulled, point data pointers correctly
        {
            System.Debug.outputString("Data available. Copying new data main array."); //DEBUG CODE
            g_returnFeed = g_tempReturnFeed;
            g_tempReturnFeed = null;
            fNewDataReady = false;
        }

        if (fInProgress)	//If feeds queued up last time are being pulled, return doing nothing
        {
            return;
        }
        else	//Queue up feeds for pulling and then trigger pull of first feed
        {
            System.Debug.outputString("Queue up feeds (that changed at publisher) for pull in this data refresh."); //DEBUG CODE
            LoadMSFeedManager();
            g_feedTotal = 0;
            CountFeeds(g_msFeedManager.RootFolder);

            if (g_feedTotal > 0) 
            {
                fInProgress = true;
                if (!fFirstTime) 
                {
                    g_currentInterGetFeedInterval = g_interGetFeedInterval;
                }

                g_feedPaths = null;
                g_feedsCurrentlySelected = null;
                g_feedPaths = new Array();
                g_feedsCurrentlySelected = new Array();

                g_totalFeedCount = 0;
                g_totalFeedItemCount = 0;
                g_totalEmptyFeedCount = 0;
                g_currentFeedItemIndex = -1;

                if (g_currentFeedPath == "" || g_msFeedManager.ExistsFolder(g_currentFeedPath)) 
                {
                    QueueRssByFolder(g_currentFeedPath);
                    CheckForFeedStoreChanges();
                }
                else 
                {
                    if (g_msFeedManager.ExistsFeed(g_currentFeedPath)) 
                    {
                        QueueRssByFeed(g_currentFeedPath);
                    }
                    else	//Parameter not valid / not present in feed store
                    {
                        DisplayMessage(L_SI_ERRORMESSAGE, true);
                        g_timerFlag = false;
                        g_msFeedManager = null;
                        g_returnFeed = null;
                        return null;
                    }
                }
            }
            else	//Total number of feeds in common store = 0
            {
                DisplayMessage(L_ZF_ERRORMESSAGE, true);
            }
            g_msFeedManager = null;

            if (fSomethingToDo) {
                System.Debug.outputString("One or more changed feeds were queued for refresh."); //DEBUG CODE
                g_timerFlag = true;
                if (fFirstTime) {
                    GetDataForNextFeed(); // this may not return items in which case there is no data to display
                }
                StartPolling();
            }
            else {
                System.Debug.outputString("None of the feeds changed at the publisher since last refresh - No feeds were queued for pull."); //DEBUG CODE
                fInProgress = false;
            }
        }
    }
}












function SetNextViewItems() {
    if (g_timerFlag && g_returnFeed !== null) {
        var headlineCount;
        do {
            headlineCount = g_returnFeed.feedItems.length;
            g_lastCalledArrayIndex = g_currentArrayIndex;
            if (g_totalViewableItems < headlineCount) {
                headlineCount = g_totalViewableItems;
            }
            if (g_currentArrayIndex > g_returnFeed.feedItems.length || g_currentArrayIndex >= headlineCount) {
                g_currentArrayIndex = 0;
                RefreshRssFeedData();
            }

            var countDiff = headlineCount % g_countToView;
            var lastPageItemsArrayIndex;
            if (countDiff == 0) {
                lastPageItemsArrayIndex = headlineCount - g_countToView;
            }
            else {
                lastPageItemsArrayIndex = headlineCount - countDiff;
            }

            if (g_currentArrayIndex < 0 || g_currentArrayIndex >= lastPageItemsArrayIndex) {
                g_currentArrayIndex = lastPageItemsArrayIndex;
                RefreshRssFeedData();
                ShowHideFeedItems(headlineCount, g_countToView);
            }
            else {
                ShowHideFeedItems(g_countToView, g_countToView); // Show all items if not on last page
            }

            if (g_returnFeed == null) {
                return;
            }

        }
        while (headlineCount > g_returnFeed.feedItems.length);

        if (headlineCount == 0) {
            DisplayMessage(L_ZFI_ERRORMESSAGE, true);
            return;
        }

        if (!g_timerFlag)
            return;

        ShowHideUIElementBlocks(true, true, false);

        ClearViewElements();

        System.Gadget.settingsUI = "settings.html";
        for (var i = 0; i < g_countToView; i++) {
            var positionContentArray = new Array();
            positionContentArray[0] = (g_currentArrayIndex + 1) - i;
            positionContentArray[1] = "-";
            positionContentArray[2] = g_currentArrayIndex + 1;
            var pageDir = document.getElementsByTagName("html")[0].dir;
            if (pageDir == "rtl") {
                positionContentArray.reverse();
            }
            var positionContent = positionContentArray[0] + positionContentArray[1] + positionContentArray[2];
            if (g_currentArrayIndex == headlineCount) {
                for (var j = i; j < g_countToView; j++) {
                    if (j < g_countToView) {
                        eval("FeedItem" + j).style.border = "";
                    }
                    g_currentArrayIndex++;
                }
                return;
            }

            eval("FeedItem" + i).style.borderBottom = "dotted 1px #3b4458";
            eval("FeedItemLink" + i).style.textOverflow = "ellipsis";
            eval("FeedItemLink" + i).style.overflow = "hidden";
            eval("FeedItemLink" + i).style.whiteSpace = "nowrap";
            eval("FeedItemLink" + i).style.width = g_curLinkWidth;
            PositionNumbers.innerText = positionContent;
            var countNow = g_returnFeed.feedItems[g_currentArrayIndex].feedItemCount;
            var feedItemName = g_returnFeed.feedItems[g_currentArrayIndex].feedItemName;
            g_viewElements.FeedItems[i].setAttribute("title", feedItemName);
            if (!g_returnFeed.feedItems[g_currentArrayIndex].feedItemIsRead) {
                g_viewElements.FeedItems[i].className = "a.UnReadItem";
            }
            else {
                g_viewElements.FeedItems[i].className = "ReadItem";
            }
            g_viewElements.FeedItems[i].innerText = feedItemName;
            g_viewElements.FeedItems[i].href = CheckHref(g_returnFeed.feedItems[g_currentArrayIndex].feedItemUrl);
            g_viewElements.FeedItems[i].setAttribute("name", g_returnFeed.feedItems[g_currentArrayIndex].feedItemParentPath);
            g_viewElements.FeedItems[i].setAttribute("localId", g_returnFeed.feedItems[g_currentArrayIndex].feedItemID);
            eval("FeedItemName" + i).innerText = g_returnFeed.feedItems[g_currentArrayIndex].feedItemParent;
            eval("FeedItemName" + i).setAttribute("title", g_returnFeed.feedItems[g_currentArrayIndex].feedItemParent);
            eval("FeedItemName" + i).style.textOverflow = "ellipsis";
            eval("FeedItemName" + i).style.overflow = "hidden";
            eval("FeedItemName" + i).style.whiteSpace = "nowrap";
            eval("FeedItemDate" + i).innerText = g_returnFeed.feedItems[g_currentArrayIndex].feedItemDate;
            eval("FeedItemDate" + i).setAttribute("title", g_returnFeed.feedItems[g_currentArrayIndex].feedItemDate);
            eval("FeedItemDate" + i).style.overflow = "hidden";
            g_currentArrayIndex++;
            ClearBack();
        }
    }
}


































function GetItemsForQueuedFeed(currentFeedPathIndex)
{
	var itemsInCurrentFeed = 0;
	System.Debug.outputString("Pulling data. GETFEED: " + g_feedPaths[currentFeedPathIndex].Path); //DEBUG CODE
	var feedToDownload = SafeGetFeed(g_feedPaths[currentFeedPathIndex].Path);
	g_tempReturnFeed = null;
	g_tempReturnFeed = new MakeFeed("","","");

	if (feedToDownload.Items.Count > 0)
	{
		for (var i = 0; i < feedToDownload.Items.Count; i++)
		{
			var currentFeedItem = feedToDownload.Items.item(i);
			var tempFeedTitle = RemoveNewLines(currentFeedItem.Title);
			if (tempFeedTitle != "")
			{
				var tempFeedLink	= currentFeedItem.Link;
				var tempFeedIsRead	= currentFeedItem.IsRead;
				var tempFeedItemID	= currentFeedItem.LocalId;
				var tempFeedItemParent	= feedToDownload.name;
				var tempFeedItemParentPath	= feedToDownload.path;
				var tempFeedItemDate	= currentFeedItem.PubDate;
				if ( ZERO_TIMESTAMP_MILLISECONDS == (new Date(tempFeedItemDate)).getTime() )
				{
					tempFeedItemDate = currentFeedItem.Modified;
				}

				var tempFeedItem	= new FeedItem(
													tempFeedTitle, 
													tempFeedLink, 
													tempFeedIsRead, 
													tempFeedItemID, 
													tempFeedItemParent,
													tempFeedItemParentPath,
													tempFeedItemDate
												);
				g_tempReturnFeed.feedItems.push(tempFeedItem);
			}
		}
		g_totalFeedItemCount = g_totalFeedItemCount + feedToDownload.a.UnReadItemCount;
		itemsInCurrentFeed = feedToDownload.ItemCount;
		g_currentFeedData[g_feedPaths[currentFeedPathIndex].GUID] = g_tempReturnFeed;
	}
	else
	{
		g_totalEmptyFeedCount = g_totalEmptyFeedCount + 1;
	}

	g_feedDownloadTimes[g_feedPaths[currentFeedPathIndex].GUID] = (new Date(feedToDownload.LastWriteTime)).toUTCString();
	feedToDownload = null;
	
	return itemsInCurrentFeed;
}

function AggregateAllItemsToTempArray()
{
	System.Debug.outputString("Data read cycle complete. Copying New data to temporary array."); //DEBUG CODE
	StopPolling();
	fNewDataReady = true; //New data is ready and present in g_tempReturnFeed (to be cleared when data is copied)
	fInProgress = false;
	fSomethingToDo = false;
	g_currentFeedItemIndex = -1;

	//Concatenate all feeditems , then sort and reverse and assign to the original array
	g_tempReturnFeed = null;
	g_tempReturnFeed = new MakeFeed("","","");
	for (var i in g_currentFeedData)
	{
		if ( g_currentFeedData[i] !== undefined && g_currentFeedData[i] !== null )
		{
			g_tempReturnFeed.feedItems = g_tempReturnFeed.feedItems.concat(g_currentFeedData[i].feedItems);
		}
	}
	g_tempReturnFeed.feedItems.sort(SortDates);
	g_tempReturnFeed.feedItems.reverse();
	g_tempReturnFeed.feedCount = '&nbsp;(<b>' + g_totalFeedItemCount + '</b>)&nbsp;';
	g_tempReturnFeed.feedUrl = ''; 

	if ( g_tempReturnFeed.feedItems.length == 0 )
	{
		DisplayMessage(L_ZFI_ERRORMESSAGE, true);
	}
}

function GetDataForNextFeed()
{
	LoadMSFeedManager();
	var itemsInCurrentFeed;
	var currentFeedPathIndex = g_currentFeedItemIndex + 1;
	g_currentFeedItemIndex = g_currentFeedItemIndex + 1;

	if (currentFeedPathIndex >= g_feedPaths.length) // DATA READ IS COMPLETE
	{
		AggregateAllItemsToTempArray();
		return -1; // indicating no data was pulled in this run
	}

	itemsInCurrentFeed = GetItemsForQueuedFeed(currentFeedPathIndex);

	if (fFirstTime && itemsInCurrentFeed > 0)
	{
		System.Debug.outputString("Set first feed data for Viewing and continue to pull other feeds in burst mode"); //DEBUG CODE
		g_tempReturnFeed.feedItems.sort(SortDates);
		g_tempReturnFeed.feedItems.reverse();
		g_returnFeed = g_tempReturnFeed;
		SetNextViewItems();
		fFirstTime = false;
	}
	
	g_msFeedManager = null;
	g_tempReturnFeed = null;
	
	return itemsInCurrentFeed;
}

function FeedItem(_feedItemName, _feedItemUrl, _feedItemIsRead, _feedItemID, _feedItemParent, _feedItemParentPath, _feedItemDate)
{	
	this.feedItemDate	= _feedItemDate;
	this.feedItemName	= _feedItemName;
	this.feedItemUrl	= _feedItemUrl;
	this.feedItemIsRead	= _feedItemIsRead;
	this.feedItemID	= _feedItemID;
	this.feedItemParent	= _feedItemParent;
	this.feedItemParentPath = _feedItemParentPath;
}

function MakeFeed(_feedName, _feedUrl, _feedCount)
{
	this.feedItems	= new Array();
	this.feedName	= _feedName;
	this.feedUrl	= _feedUrl;
	this.feedCount	= _feedCount;
}











function SortDates(a,b)
{
	return(b.feedItemDate < a.feedItemDate) - (a.feedItemDate < b.feedItemDate);
}



function CountFeeds(folderToCheck)
{	
	g_feedTotal = g_feedTotal + folderToCheck.Feeds.Count;
	for(var i = 1;i <= folderToCheck.Subfolders.Count;i++)
	{
	    CountFeeds(folderToCheck.Subfolders.Item(i-1)); 
	}
}

function GetFirstFeed(folderToCheck)
{
	if(folderToCheck.Feeds.Count > 0)
	{
		for(var i = 0;i < folderToCheck.Feeds.Count;i++)
		{
		    if(g_msFeedManager.ExistsFeed(folderToCheck.Feeds.Item(i).path))
		    {
				    g_currentFeedPath = folderToCheck.Feeds.Item(i).path;
				    return null;
		    }
		}
	}
	for(var i = 1;i <= folderToCheck.Subfolders.Count;i++)
	{
	    if(g_currentFeedPath != "")
	    {
			    return null;
	    }
	    GetFirstFeed(folderToCheck.Subfolders.Item(i-1));
	}
}

function SafeGetFeed(Path)
{
	if (Path == null || Path.Length == 0)
	{
		return g_msFeedManager.GetFeed("");
	}
	else
	{
		try
		{
			return g_msFeedManager.GetFeed(Path);
		}
		catch(e)
		{
			return g_msFeedManager.GetFeed("");
		}
	}
}

function RemoveNewLines(stringWithNewlines)
{
	var regEx; 

	regEx = new RegExp ('\r', 'gi') ;
	stringWithNewlines = stringWithNewlines.replace(regEx," ");
	regEx = new RegExp ('\n', 'gi') ;
	stringWithNewlines = stringWithNewlines.replace(regEx," ");
	regEx = new RegExp ('\t', 'gi') ;
	stringWithNewlines = stringWithNewlines.replace(regEx," ");

	while(stringWithNewlines.indexOf("  ")>=0)
	{
		regEx = new RegExp ('  ', 'gi') ;
		stringWithNewlines = stringWithNewlines.replace(regEx," ");
	}
	return stringWithNewlines;
}

function MakeFeedPath(_feedPath, _feedGUID)
{
	this.Path = _feedPath;
	this.GUID = _feedGUID;
}

function QueueRssByFolder(Path)
{
	var folder = g_msFeedManager.GetFolder(Path);

	for(var subfolderIndex=0; subfolderIndex < folder.Subfolders.Count; subfolderIndex++)
	{
		QueueRssByFolder(folder.Subfolders.Item(subfolderIndex).Path);
	}
	
	for (var folderIndex = 0; folderIndex < folder.Feeds.Count; folderIndex++)
	{
		var currentFeed = folder.Feeds.item(folderIndex);
		var currentFeedLastWriteTime = (new Date(currentFeed.LastWriteTime)).toUTCString();
		var currentFeedGUID = currentFeed.LocalId;
		var currentFeedPath = currentFeed.Path;

		if (g_feedDownloadTimes[currentFeedGUID] == undefined || g_feedDownloadTimes[currentFeedGUID] !== currentFeedLastWriteTime)
		{
			var tempFeedPath = new MakeFeedPath(currentFeedPath,currentFeedGUID);
			g_feedPaths.push(tempFeedPath);
			fSomethingToDo = true;
			System.Debug.outputString("Queueing feed: " + currentFeedPath); //DEBUG CODE
		}
		g_feedsCurrentlySelected[currentFeedGUID] = currentFeedPath;	// hash-store the GUID,path key-value pair
		g_totalFeedCount ++;

		tempFeedPath = null;
	}
}

function CheckForFeedStoreChanges()
{
	var bRefreshMainArray = false;
	// Queueing done. Now check if any of the feed's data in feed data container must be removed (ie feed no longer exists in chosen folder)
	for (var tmpFeedGUID in g_currentFeedData)
	{
		if ( g_currentFeedData[tmpFeedGUID] !== null && (g_feedsCurrentlySelected[tmpFeedGUID] == undefined || g_feedsCurrentlySelected[tmpFeedGUID] == null) ) // Data for feed Not already deleted, and feed doesnt exist in folder currently selected
		{
			g_currentFeedData[tmpFeedGUID] = null;
			bRefreshMainArray = true;
		}
	}

	if ( bRefreshMainArray )
	{
		g_returnFeed = null;
		g_returnFeed = new MakeFeed("","","");
		for (var i in g_currentFeedData)
		{
			if ( g_currentFeedData[i] !== undefined && g_currentFeedData[i] !== null )
			{
				g_returnFeed.feedItems=g_returnFeed.feedItems.concat(g_currentFeedData[i].feedItems);
			}
		}
		g_returnFeed.feedItems.sort(SortDates);
		g_returnFeed.feedItems.reverse();
		g_returnFeed.feedCount = '&nbsp;(<b>' + g_totalFeedItemCount + '</b>)&nbsp;';
		g_returnFeed.feedUrl = ''; 

		if ( g_returnFeed.feedItems.length == 0 )
		{
			g_returnFeed = null;
			DisplayMessage(L_ZFI_ERRORMESSAGE, true);
		}
	}

	if ( g_totalFeedCount == 0 )
	{
		DisplayMessage(L_ZF_ERRORMESSAGE, true);
	}
	g_feedsCurrentlySelected = null;
}

function QueueRssByFeed(Path)
{
	var folderPath = Path.substring(0,Path.lastIndexOf("\\"));
	var folder = g_msFeedManager.GetFolder(folderPath);

	for (var folderIndex = 0; folderIndex < folder.Feeds.Count; folderIndex++)
	{
		var currentFeed = folder.Feeds.item(folderIndex);
		if (currentFeed.Path !== Path )
        {
            continue;
        }

		var currentFeedLastWriteTime = (new Date(currentFeed.LastWriteTime)).toUTCString();
		var currentFeedGUID = currentFeed.LocalId;
		var currentFeedPath = currentFeed.Path;
		if ( g_feedDownloadTimes[currentFeedGUID] == undefined || g_feedDownloadTimes[currentFeedGUID] !== currentFeedLastWriteTime )
		{
			var tempFeedPath = new MakeFeedPath(currentFeedPath,currentFeedGUID);
			g_feedPaths.push(tempFeedPath);
			fSomethingToDo = true;
			System.Debug.outputString("Queueing feed: "+currentFeedPath); //DEBUG CODE
		}
		g_totalFeedCount = 1;
		return; // we found the feed we were looking for, no need to query remaining feeds
	}
}

function SetPreviousViewItems()
{
	g_currentArrayIndex = g_currentArrayIndex - (g_countToView * 2);
	SetNextViewItems();
}

function CheckHref(sURL)
{
	var safeURL = "";
	var prefixIndex = sURL.search("http://");
	if(prefixIndex == 0)
	{
		return sURL;
	}
	prefixIndex = sURL.search("https://");
	if(prefixIndex == 0)
	{
		return sURL;
	}
	prefixIndex = sURL.search("ftp://");
	if(prefixIndex == 0)
	{
		return sURL;
	}
	return safeURL;
}



function ShowHideFeedItems(headlineCount, itemsInView)
{
	var countDiff = headlineCount % itemsInView;

	if( countDiff == 0 )
	{
		countDiff = itemsInView;
	}
	for(var i = 0; i < itemsInView; i++)
	{
		if( i < countDiff )
		{
			eval("FeedItem" + i).style.visibility = "visible";
		}
		else
		{
			eval("FeedItem" + i).style.visibility = "hidden";
		}
	}
}









function OnItemClick()
{		
	if(g_gadgetErrorFlag > 0)
	{
		if(g_gadgetErrorFlag == 1)
		{
		    System.Gadget.Settings.write("rssFeedPath", "");
		    ShowSpinner('35%');
		    this.blur();
		    LoadMSFeedManager();
		    DownloadAllFeeds(g_msFeedManager.RootFolder);
		    g_msFeedManager = null;		
		    g_loadFirstTime = "existingGadget";
		    System.Gadget.Settings.write("loadFirstTime", g_loadFirstTime);
		    if(g_downloadErrorFlag)
		    {
		        setTimeout(LoadMain, g_loadingMilliSecs);
		    }
		    else
		    {
		        LoadMain();
		    }
		}
		else if(g_gadgetErrorFlag == 2)
		{
			window.location = 'http://go.microsoft.com/fwlink/?LinkId=69153';
		}
	}
}

function DownloadAllFeeds(folderToAdd)
{ 
	LoadMSFeedManager();
	var currentFolder;
	var currentFeeds;		
	var feedDefault;			
	
	if (folderToAdd.IsRoot)
	{
		currentFeeds = folderToAdd.Feeds;
		for (var feedIndex = 0; feedIndex < currentFeeds.Count; feedIndex++)
		{
			try
			{
				feedDefault = SafeGetFeed(currentFeeds.Item(feedIndex).Path);
			}
			catch(e)
			{
				DisplayMessage(L_MSIE_ERRORMESSAGE, false);
				g_timerFlag = false;
			}
			try
			{
				feedDefault.Download();
			}
			catch(e)
			{
				g_downloadErrorFlag = true;
			}
		}
		DownloadAllFeeds(folderToAdd.SubFolders);
		return;
	}
	for (var folderIndex = 0; folderIndex < folderToAdd.Count; folderIndex++)
	{
		currentFolder = folderToAdd.Item(folderIndex);
		currentFeeds = currentFolder.Feeds;
		for (var feedIndex = 0; feedIndex < currentFeeds.Count; feedIndex++)
		{
			try
			{
				feedDefault = SafeGetFeed(currentFeeds.Item(feedIndex).Path);
			}
			catch(e)
			{
				DisplayMessage(L_MSIE_ERRORMESSAGE, false);
				g_timerFlag = false;
			}
			try
			{
				feedDefault.Download();
			}
			catch(e)
			{
				g_downloadErrorFlag = true;
			}
		}
		if (currentFolder.Subfolders.Count > 0)
		{
			DownloadAllFeeds(currentFolder.Subfolders);
		}
	}
	LoadMSFeedManager();
	if(g_msFeedManager.BackgroundSyncStatus == 0)
	{
		g_msFeedManager.BackgroundSync(1);
	}
	g_msFeedManager = null;
}

function ShowFlyout(feedAll)
{
	g_feedForFlyout = feedAll.name;
	g_feedURL = feedAll.href;
	g_feedTitle = feedAll.innerText;
	g_feedID = feedAll;
	g_feedLocalId = feedAll.localId;
	g_feedID.innerText=g_feedTitle;
	g_timerFlyoutFlag = true;
	MarkAsRead();
	if (event.type == "click")
	{
		if(g_feedURL == g_lastClickedUrl)
		{
			StopTimer();
			System.Gadget.Flyout.show = false;
			g_lastClickedUrl = "";
			g_timerFlyoutFlag = false;
		}	
		if(System.Gadget.Flyout.show)
		{
			AddContentToFlyout();
			g_lastClickedUrl = feedAll.href;
		}
		else
		{
			System.Gadget.Flyout.show = true;
			System.Gadget.Flyout.onShow = function()
			{
				StopTimer();
				AddContentToFlyout();
			}
			System.Gadget.Flyout.onHide = function()
			{
				g_feedClicked = null;
				ClearBack();
				if(g_timerFlyoutFlag)
				{
					StartTimer();
				}
				g_timerFlyoutFlag = true;
			}
			g_lastClickedUrl = feedAll.href;
		}

	}
}

function MarkAsRead()
{
    if (g_returnFeed == null) 
    {
        return;
    }

	for(var i = 0; i < g_returnFeed.feedItems.length; i++)
	{ 
		if(g_returnFeed.feedItems[i].feedItemUrl == g_feedURL)
		{
			g_returnFeed.feedItems[i].feedItemIsRead = true;
			g_viewElements.FeedItems[i%4].className = "ReadItem";
		}
	}
	LoadMSFeedManager();
	try
	{
		var currentFeeds = SafeGetFeed(g_feedForFlyout);
		var currentFeed = currentFeeds.getItem(g_feedLocalId);
		currentFeed.IsRead = true;
	}
	catch(e)
	{
	}
	g_msFeedManager = null;
}

function HideFlyout()
{
    System.Gadget.Flyout.show = false;
}

function AddContentToFlyout()
{
	try
	{
		if(System.Gadget.Flyout.show)
		{
			var flyoutDiv = System.Gadget.Flyout.document;
			LoadMSFeedManager();
			try
			{
				var currentFeeds = SafeGetFeed(g_feedForFlyout);
				var currentFeed = CurrentFeeds.getItem(g_feedLocalId);
				var tempTitle = RemoveNewLines(currentFeed.title);
				flyoutDiv.getElementById("flyoutTitleLink").innerText = tempTitle;
				flyoutDiv.getElementById("flyoutTitleLink").href = CheckHref(g_feedURL);
				flyoutDiv.getElementById("flyoutTitleLink").setAttribute("title", tempTitle);
				flyoutDiv.getElementById("flyoutTitleLink").style.textOverflow = "ellipsis";
				flyoutDiv.getElementById("flyoutTitleLink").style.overflow = "hidden"; 
				flyoutDiv.getElementById("flyoutTitleLink").style.whiteSpace = "nowrap"; 
				flyoutDiv.getElementById("flyoutPubDate").innerText = currentFeeds.Name;
				flyoutDiv.getElementById("flyoutPubDate").href = CheckHref(currentFeeds.URL);
				flyoutDiv.getElementById("flyoutPubDate").setAttribute("title", currentFeeds.Name);
				flyoutDiv.getElementById("flyoutPubDate").style.textOverflow = "ellipsis";
				flyoutDiv.getElementById("flyoutPubDate").style.overflow = "hidden"; 
				flyoutDiv.getElementById("flyoutPubDate").style.whiteSpace = "nowrap"; 
				flyoutDiv.getElementById("readOnlineLink").href = CheckHref(g_feedURL);
				flyoutDiv.getElementById("flyoutMainFeedDescription").innerHTML = currentFeed.Description;
			}
			catch(e)
			{
			}
			g_msFeedManager = null;
		}
	}
	catch(e)
	{
		//catch slow flyout - no div object will be available.
	}
}

function UpdateDivLocation(divFeedNameObject,divFeedDateObject)
{	
	var pageDir = document.getElementsByTagName("html")[0].dir;

	if (pageDir == "rtl")
	{
		divFeedDateObject.style.textAlign = "left";
		divFeedDateObject.style.styleFloat = "left";
		divFeedNameObject.style.textAlign = "right";
		divFeedNameObject.style.styleFloat = "right";
	}
	else
	{
		divFeedDateObject.style.textAlign = "right";
		divFeedDateObject.style.styleFloat = "right";
		divFeedNameObject.style.textAlign = "left";
		divFeedNameObject.style.styleFloat = "left";
	}
}

function DockedState()
{	
	g_curLinkWidth	= "113px";
	g_feedNameLength	= 10;
	if(g_lastCalledArrayIndex)
	{
		g_currentArrayIndex = g_lastCalledArrayIndex;
	}
	else
	{
		g_currentArrayIndex = 0;
	}
	SetNextViewItems();
	with(document.body.style)
	{
		height = "173px";
		width = "130px";
	} 
	with(FeedBackground.style)
	{
		height = "173px";
		width = "130px";
	} 
	FeedBackground.src = "url(images/rssBackBlue_docked.png)";
	//StyleSwitch (name backgroundColor top left height width, fontWeight, fontSize, color, 
	//			paddingTop, paddingBottom, paddingRight, paddingLeft, borderbottom, bordercolor)

	StyleSwitch("FeedItemHldr", false, 4, 4, false, false, false, false, false, false, false, 4, false, false, false);	
	StyleSwitch("NavHolder", false, 147, 25, 20, 75, false, false, false, false, false, false, false, false, false); 
	for (i = 0; i < g_countToView; i++)
	{		
		StyleSwitch(eval("FeedItem" + i), false, false, false, 35, 121, false, 12, '#ffffff', 5, 1, 4, 6, false, false);
		StyleSwitch(eval("FeedItemName" + i), false, false, false, 14, 55, false, 11, '#67788a', 0, 0, 0, 0, false, false);
		StyleSwitch(eval("FeedItemDate" + i), false, false, false, 14, 55, false, 11, '#67788a', 0, 0, 0, 0, false, false);
		eval("FeedItem" + i).style.lineHeight = "13px";
		eval("FeedItem" + i).style.overflow = "hidden";		
		eval("FeedItemName" + i).style.lineHeight = "12px";
		eval("FeedItemDate" + i).style.lineHeight = "12px";

		UpdateDivLocation( eval("FeedItemName" + i) , eval("FeedItemDate" + i) )
    }	
}

function UnDockedState()
{
	g_curLinkWidth	= "250px";
	g_feedNameLength	= 15;
	if(g_lastCalledArrayIndex)
	{
		g_currentArrayIndex = g_lastCalledArrayIndex;
	}
	else
	{
		g_currentArrayIndex = 0;
	}
	SetNextViewItems();
	with(document.body.style)
	{
		height = "232px";
		width = "296px";
	}
	with(FeedBackground.style)
	{
		height = "232px";
		width = "296px";
	} 
	FeedBackground.src = "url(images/rssBackBlue_undocked.png)";
	
	//StyleSwitch (name backgroundColor top left height width, fontWeight, fontSize, 
	//color, paddingTop, paddingBottom, paddingRight, paddingLeft, borderbottom, bordercolor)
 
	StyleSwitch("FeedItemHldr", false, 14, 13, false, false, false, false, false, false, false, 14, false, false, false); 
	StyleSwitch("NavHolder", false, 190, 106, 20, 75, false, false, false, false, false, false, false, false, false);
 
	for (i = 0; i < g_countToView; i++)
	{		
		StyleSwitch(eval("FeedItem" + i), false, false, false, 44, 264, false, 14, '#ffffff', 7, 2, 7, 7, false, false);
		StyleSwitch(eval("FeedItemName" + i), false, false, false, 14, 130, false, 12, '#67788a', 0, 0, 0, 0, false, false);
		StyleSwitch(eval("FeedItemDate" + i), false, false, false, 14, 120, false, 12, '#67788a', 0, 0, 0, 0, false, false);
		eval("FeedItem" + i).style.lineHeight = "14px";
		eval("FeedItem" + i).style.overflow = "hidden";		
		eval("FeedItemName" + i).style.lineHeight = "14px";
		eval("FeedItemDate" + i).style.lineHeight = "14px";

		UpdateDivLocation( eval("FeedItemName" + i) , eval("FeedItemDate" + i) )
    }	
}

function StyleSwitch(divObject, backgroundColorVal, topVal, leftVal, heightVal, widthVal, fontWeightVal, fontSizeVal, fontColor, marginTopVal, marginBottomVal, marginRightVal, marginLeftVal, borderBottomVal, borderColorVal)
{
	with(eval(divObject).style)
	{
		if(topVal)
		{
			top = topVal + "px";
		}
		if(leftVal)
		{
			left = leftVal + "px";
		}
		if(heightVal)
		{
			height = heightVal + "px";
		}		
		if(widthVal)
		{
			width = widthVal + "px";
		}	
		if(fontWeightVal)
		{
			fontWeight = fontWeightVal;
		}
		if(fontSizeVal)
		{
			fontSize = fontSizeVal + "px";
		}		
		if(fontColor)
		{
			color = fontColor;
		}
		if(marginTopVal)
		{
			paddingTop = marginTopVal + "px";
		}
		if(marginBottomVal)
		{
			paddingBottom = marginBottomVal + "px";
		}
		if(marginLeftVal)
		{
			paddingLeft = marginLeftVal+ "px";
		}
		if(marginRightVal)
		{
			paddingRight = marginRightVal+ "px";
		}
		if(borderBottomVal)
		{
			borderBottom = "dotted "+ borderBottomVal + "px";
		}
		if(borderColorVal)
		{
			borderColor = borderColorVal;
		}
		if(backgroundColorVal)
		{
			backgroundColor = backgroundColorVal;
		}
	}
}

function ToggleBack(objToChange, showBack)
{	
	if(objToChange.innerText != g_feedClicked)
	{
		if(!System.Gadget.docked) 
		{
			var backgroundToLoad = "url(images/item_hover_floating.png)";
		} 
		else if (System.Gadget.docked)
		{
			var backgroundToLoad = "url(images/item_hover_docked.png)"; 
		}
		if(showBack)
		{
			eval("objToChange").style.backgroundImage = backgroundToLoad; 
		}
		else
		{
			eval("objToChange").style.backgroundImage = ""; 
		}
	}
}

function SelectBack(objToChange)
{	
	g_feedClicked = objToChange.innerText;
	ClearBack();
} 

function ClearBack()
{	
	for(var i = 0; i < 4; i++)
	{
		if(eval("FeedItem" + i).innerText == g_feedClicked)
		{ 
			SetSelectBack(eval("FeedItem" + i));			
		}
		else
		{
			eval("FeedItem" + i).style.backgroundImage = "";
		}
	} 
}

function SetSelectBack(objToChange)
{
	if(objToChange.innerText == g_feedClicked)
	{
		if(!System.Gadget.docked) 
		{
			var backgroundToLoad = "url(images/rss_headline_glow_floating.png)";
		} 
		else if (System.Gadget.docked)
		{
			var backgroundToLoad = "url(images/rss_headline_glow_docked.png)"; 
		}
		eval("objToChange").style.backgroundImage = backgroundToLoad; 
	}
}

function ToggleButton(objToChange, newSRC)
{		
    eval("objToChange").src = "images/"+newSRC;
}

function MouseWheeNavigate()
{
	if( g_returnFeed == null )
		return;

	var headlineCount = g_returnFeed.feedItems.length;
	if(g_totalViewableItems < headlineCount)
	{
		headlineCount = g_totalViewableItems;
	}
	if(event.wheelDelta < -20)
	{
		SetNextViewItems();
	}
	if(event.wheelDelta > 20)
	{
		SetPreviousViewItems();
	}
}

function KeyNavigate()
{ 
	switch(event.keyCode)
	{

		case 38:
		case 104:
			SetPreviousViewItems();
			break;
		case 40:
		case 98:
			SetNextViewItems();
			break;
		case 32: 
		case 13:
			if(event.srcElement.id == "ButtonLeftNarrator")
			{
				SetPreviousViewItems();
			}
			else if(event.srcElement.id == "ButtonRightNarrator")
			{
				SetNextViewItems();
			}
			break;
		case 27:
			HideFlyout();
			break;
	}
}

function KeyNavigateClose()
{ 
	switch(event.keyCode)
	{
		case 27:
			HideFlyout();
			break;
	}
}

