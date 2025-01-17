function GetRssSettings()
{
    //Read the private rss gadget settings
    this.rssFeedPath = System.Gadget.Settings.read("rssFeedPath");
    this.rssFeedUrl = System.Gadget.Settings.read("rssFeedUrl");
	this.rssFeedCount = System.Gadget.Settings.read("rssFeedCount");
	this.loadFirstTime = System.Gadget.Settings.read("loadFirstTime") || "defaultGadget"; 
		
	if(this.rssFeedCount == "")
	{
		this.rssFeedCount = 100;
	}
}

function SetRssSettings(_feedCount)
{
    //Save the private rss gadget settings
    System.Gadget.Settings.write("rssFeedCount", _feedCount);
    System.Gadget.Settings.write("loadFirstTime", g_loadFirstTime);
}

function Load()
{
	System.Gadget.onSettingsClosing = SettingsClosing;
	LoadSettings();
	TotalSelection.value = g_totalViewableItems;
	document.getElementById('VersionLabel').innerHTML = System.Gadget.version;
}

function SettingsClosing(event)
{
	if(event.closeAction == event.Action.commit)
	{
		SaveSettings();
	}
	else if (event.closeAction == event.Action.cancel)
	{
	}
	event.cancel = false;
}

function SaveSettings()
{
    SetRssSettings(TotalSelection.options(TotalSelection.selectedIndex).value);
}


