<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="NewsDetail.aspx.cs" Inherits="C2Alert.Web.News.NewsDetail" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<%@ Register Src="../Controls/ValidationSummary.ascx" TagName="ValidationSummary" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ToolBarContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainStandardFormContent" runat="server">
    <div class="StandardFormDiv">
        <br />
        <uc1:ValidationSummary ID="PageValidation" runat="server" />
        <asp:Literal ID="NewsIdLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="NewsIdText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="NewsTitleLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="NewsTitleText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="NewsDateLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="NewsDateText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="NewsCategoryLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="NewsCategoryText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="NewsLinkLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="NewsLinkText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="SecuredAlertLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="SecuredAlertText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="ActiveAlertLabel" runat="server"></asp:Literal> 
        <asp:Literal ID="ActiveAlertText" runat="server"></asp:Literal>
        <br />
        <br />                      
        <asp:Literal ID="FeedTextLabel" runat="server"></asp:Literal>
        <br /> 
        <asp:Literal ID="FeedTextText" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="AlertTextLabel" runat="server"></asp:Literal>
        <br /> 
        <asp:Literal ID="AlertTextText" runat="server"></asp:Literal>
        <br />
        <br />                        
    </div>
</asp:Content>
