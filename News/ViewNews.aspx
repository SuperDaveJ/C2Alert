<%@ Page Title="" Language="C#" MasterPageFile="~/Main100Height.Master" AutoEventWireup="true" CodeBehind="ViewNews.aspx.cs" Inherits="C2Alert.Web.News.ViewNews" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<%@ Register Src="../Controls/ValidationSummary.ascx" TagName="ValidationSummary" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ToolBarContent" runat="server">
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainTopContent" runat="server">
    <telerik:RadAjaxLoadingPanel ID="PageLoadingPanel" runat="server">
    </telerik:RadAjaxLoadingPanel>
    <telerik:RadAjaxManagerProxy ID="AjaxManagerProxy1" runat="server">
        <AjaxSettings>
            <telerik:AjaxSetting AjaxControlID="NewsGrid">
                <UpdatedControls>
                    <telerik:AjaxUpdatedControl ControlID="NewsGrid" LoadingPanelID="PageLoadingPanel" />
                </UpdatedControls>
            </telerik:AjaxSetting>
        </AjaxSettings>
    </telerik:RadAjaxManagerProxy>
    <div class="StandardFormDiv">
        <br />
        <uc1:ValidationSummary ID="PageValidation" runat="server" />
        <asp:Literal ID="Expand100Control" runat="server"></asp:Literal>
        <asp:Literal ID="SelectedNewsIdHidden" runat="server"></asp:Literal> 
        <asp:Literal ID="NewsModifiedHidden" runat="server"></asp:Literal>   
        <telerik:RadButton ID="AddButton" runat="server" onclick="AddButton_Click">
        </telerik:RadButton>
        <telerik:RadButton ID="EditButton" runat="server">
        </telerik:RadButton>
        <telerik:RadButton ID="DeleteButton" runat="server"> 
        </telerik:RadButton>
        <br />
        <br />
        <asp:Literal ID="NewsGridLabel" runat="server"></asp:Literal>
        <br />
        <br />
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="MainBottomContent" runat="server">
    <telerik:RadGrid ID="NewsGrid" OnItemDataBound="NewsGrid_ItemDataBound" OnPageSizeChanged="NewsGrid_PageSizeChanged" PageSize="50" OnNeedDataSource="NewsGrid_NeedDataSource" runat="server">
        <PagerStyle Mode="NextPrevAndNumeric" />
    </telerik:RadGrid>
</asp:Content>