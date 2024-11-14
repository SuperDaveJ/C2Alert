<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="C2Alert.Web.Default" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<%@ Register src="Controls/ValidationSummary.ascx" tagname="ValidationSummary" tagprefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ToolBarContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainStandardFormContent" runat="server">
    <div class="CenterDiv" style="width: 720px;">
        <asp:Literal ID="BrowserProblemMessage" runat="server"></asp:Literal>
        <uc1:ValidationSummary ID="PageMessages" runat="server" />
        <img alt="C² Alert" src="Images/CommonImages/Logo.png" />
        <h1>Welcome to the C² Alert system!</h1>
        <br />
        The C² alert system provides timely alerts and notifications of important news throughout the C² organization.
        <br />
        <br />
        If you are authorized to manage alerts, click <a href="News/ViewNews.aspx" class="Link" title="Click here to manage alerts.">here.</a>
        <br />
        <br />
        <br />
        <br />
        <div style="width:720px;height:200px;">
            <div>
                <h2>Follow Us</h2>
            </div>
            <br />
            <br />
            <div style="width:180px;text-align:center;float:left;">
                <a href="PrivateRSSFeed.aspx" class="Link" title="Subscribe to the C² Alert Private RSS feed"><img alt="Subscribe to the C² Alert Private RSS feed" src="Images/Default/RSSFeed.png" /></a>
                <br />
                <a href="PrivateRSSFeed.aspx" class="Link" title="Subscribe to the C² Alert Private RSS feed">Private RSS Feed</a>
            </div>
            <div style="width:180px;text-align:center;float:left;">
                <a href="C2DesktopAlert/C2DesktopAlertSetup.zip" class="Link" title="Download and install the C² Alert desktop application"><img alt="Download and install the C² Alert desktop application" src="Images/Default/DesktopAlert.png" /></a>
                <br />
                <a href="C2DesktopAlert/C2DesktopAlertSetup.zip" class="Link" title="Download and install the C² Alert desktop application">Desktop Application</a>
            </div>
            <!--
            <div style="width:180px;text-align:center;float:left;">
                <a href="C2AlertGadget/C2Alert.gadget" class="Link" title="Download and install the C² Alert windows 7\vista gadget"><img alt="Download and install the C² Alert windows 7\vista gadget" src="Images/Default/DesktopAlertGadget.png" /></a>
                <br />
                <a href="C2AlertGadget/C2Alert.gadget" class="Link" title="Download and install the C² Alert windows 7\vista gadget">Windows 7\Vista Gadget</a>
            </div>
            -->
            <div style="width:180px;text-align:center;float:left;">
                <a href="RSSFeed.aspx" class="Link" title="Subscribe to the C² Alert RSS feed"><img alt="Subscribe to the C² Alert RSS feed" src="Images/Default/RSSFeed.png" /></a>
                <br />
                <a href="RSSFeed.aspx" class="Link" title="Subscribe to the C² Alert RSS feed">Public RSS Feed</a>
            </div>
            <div style="width:180px;text-align:center;float:left;">
                <a href="http://feeds.feedburner.com/C2Alert" class="Link" title="Subscribe to the C² Alert Public RSS FeedBurner feed"><img alt="Subscribe to the C² Alert Public RSS FeedBurner feed" src="Images/Default/FeedBurner.png" /></a>
                <br />
                <a href="http://feeds.feedburner.com/C2Alert" class="Link" title="Subscribe to the C² Alert Public RSS FeedBurner feed">FeedBurner Public RSS Feed</a>
            </div>
        </div>
        <br />
        <br />
        <div style="border: 1px solid #000000;width:630px;text-align: center;margin: 0px auto;">
            <br />
            <div>
                <h3>C² Alert FAQ</h3>
            </div>
            <br />
            <div style="text-align:left;padding-left:5px;padding-right:5px;">
                <span class="PageText">
                    What are feeds and how do I use them?
                </span>
                <br />
                A feed is a regularly updated summary of web content, along with links to full versions of that content. When you subscribe to a given website's feed by using a feed reader, you'll receive a summary of new content from that website. Important: you must use a <a href="http://www.google.com/search?q=feed+readers" class="Link" title="Search for feed readers">feed reader</a> in order to subscribe to website feeds. 
                <br />
                <br />
                <span class="PageText">
                    What is RSS?
                </span>
                <br />
                RSS is a feed format. Right now, C² Alert supports RSS 2.0.
                <br />
                <br />
                <span class="PageText">
                    What are the requirements for the C² Alert desktop application?
                </span>
                <br />
                Operating System: Microsoft Windows XP Professional with Service Pack 3, Windows Vista with Service Pack 1, or Windows 7
                <br />
                <br />
                Other: Microsoft .NET Framework 4.0, Minimum Resolution of 1280x1024
                <br />
                <br />
                <!--

                <span class="PageText">
                    What are the requirements for the C² Alert windows 7\vista gadget?
                </span>
                <br />
                Operating System: Windows Vista, or Windows 7
                <br />
                <br />
                -->
            </div>
        </div>
    </div>
    <br />
    <br />
</asp:Content>
