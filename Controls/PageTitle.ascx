<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PageTitle.ascx.cs" Inherits="C2Alert.Web.Controls.PageTitle" %>

<div ID="PageTitleDiv">
    <asp:Image ID="PageTitleImage" CssClass="PageTitleImage" runat="server" />
    <div ID="PageTitleTextDiv">
        <asp:Literal ID="PageTitleDisplay" runat="server"></asp:Literal>
    </div>
</div>
