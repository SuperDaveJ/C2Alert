<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="NewsAddEdit.aspx.cs" Inherits="C2Alert.Web.News.NewsAddEdit" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<%@ Register Src="../Controls/ValidationSummary.ascx" TagName="ValidationSummary" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ToolBarContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainStandardFormContent" runat="server">
    <div class="StandardFormDiv">
        <br />
        <uc1:validationsummary ID="PageValidation" runat="server" />
        <asp:Literal ID="RequiredFieldMessage" runat="server"></asp:Literal>
        <br />
        <br />
        <asp:Literal ID="NewsIdLabel" runat="server"></asp:Literal>
        <asp:Literal ID="NewsIdText" runat="server"></asp:Literal>
        <asp:label ID="TitleLabel" runat="server" AssociatedControlID="TitleText"></asp:label>
        <br />
        <telerik:RadTextBox ID="TitleText" runat="server"></telerik:RadTextBox>
        <br />
        <br />
        <asp:label ID="DateLabel" runat="server" AssociatedControlID="DateInput"></asp:label>
        <br />
        <telerik:RadDateInput ID="DateInput" runat="server">
        </telerik:RadDateInput>
        <telerik:RadButton ID="GetDateButton" runat="server" onclick="GetDateButton_Click"></telerik:RadButton>
        <br />
        <br />
        <asp:label ID="LinkLabel" runat="server" AssociatedControlID="LinkText"></asp:label>
        <br />
        <telerik:RadTextBox ID="LinkText" runat="server"></telerik:RadTextBox>
        <br />
        <br />
        <asp:label ID="SecuredLabel" runat="server" AssociatedControlID="SecuredDropdown"></asp:label>
        <br /> 
        <telerik:RadComboBox ID="SecuredDropDown" runat="server">
            <Items>
            <telerik:RadComboBoxItem runat="server" Selected="true" Text="Private" ToolTip="Private" Value="True" />
            <telerik:RadComboBoxItem runat="server" Text="Public" ToolTip="Public" Value="False" />
            </Items>
        </telerik:RadComboBox>
        <br />
        <br />
        <asp:label ID="ActiveLabel" runat="server" AssociatedControlID="ActiveDropdown"></asp:label>
        <br /> 
        <telerik:RadComboBox ID="ActiveDropDown" runat="server">
            <Items>
                <telerik:RadComboBoxItem runat="server" Text="Active" ToolTip="Active" Value="True" />
                <telerik:RadComboBoxItem runat="server" Text="Inactive" ToolTip="Inactive" Value="False" />
            </Items>
        </telerik:RadComboBox>
        <br />
        <br />
        <asp:label ID="CategoryLabel" runat="server" AssociatedControlID="CategoryDropdown"></asp:label>
        <br /> 
        <telerik:RadComboBox ID="CategoryDropDown" runat="server">
            <Items>
                <telerik:RadComboBoxItem runat="server" Text="Corporate News" ToolTip="Corporate News" Value="1" />
                <telerik:RadComboBoxItem runat="server" Text="Event" ToolTip="Event" Value="2" />
                <telerik:RadComboBoxItem runat="server" Text="Network News" ToolTip="Network News" Value="3" />
                <telerik:RadComboBoxItem runat="server" Text="Network Outage" ToolTip="Network Outage" Value="4" />
            </Items>
        </telerik:RadComboBox>
        <br />
        <br />
        <asp:label ID="FeedLabel" runat="server" AssociatedControlID="FeedText"></asp:label>
        <br /> 
        <telerik:RadTextBox ID="FeedText" runat="server"></telerik:RadTextBox>
        <br />
        <br />
        <asp:label ID="AlertLabel" runat="server" AssociatedControlID="AlertText"></asp:label> 
        <br />
        <telerik:RadEditor ID="AlertText" runat="server">
        </telerik:RadEditor>
        <br /> 
        <br /> 
        <br />
        <telerik:RadButton ID="UpdateButton" runat="server" onclick="UpdateButton_Click"></telerik:RadButton>
        <telerik:RadButton ID="CancelButton" runat="server" onclick="CancelButton_Click"></telerik:RadButton>
        <br />
        <br />
        <br />
        <br />
    </div>
</asp:Content>