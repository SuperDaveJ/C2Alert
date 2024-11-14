/*
''' <summary>
''' This module is used to contain the javascript functions for the view news page
''' </summary>
*/

/*
''' <summary>
''' This function is called when a detail link is clicked
''' </summary>
''' <param name="errorLogId">Error log id</param>
*/
function ShowDetailsForm(newsId) 
{
    window.open('NewsDetail.aspx?NewsId=' + newsId, 'C2AlertNewsDetail', 'HEIGHT=768,WIDTH=1024,SCROLLBARS,RESIZABLE');
} //ShowDetailsForm

/*
''' <summary>
''' This function is called when the edit button is clicked
''' </summary>
''' <param name="sender">Sender</param>
''' <param name="eventArgs">Event arguments</param>
*/
function EditButton_Click(sender, eventArgs) 
{
    var grid = $find("ctl00_MainBottomContent_NewsGrid");
    var MasterTable = grid.get_masterTableView();
    
    var selectedRows = MasterTable.get_selectedItems();
    if (selectedRows.length > 0) 
    {
        var row = selectedRows[0];
        var cell = MasterTable.getCellByColumnUniqueName(row, "NewsId")
        var newsId = cell.innerHTML;

        var newsIdHidden = document.getElementById("SelectedNewsIdHidden");

        if (newsIdHidden != null) 
        {
            newsIdHidden.value = newsId;
        }

        var newsModified = $get("NewsModifiedHidden");

        if (newsModified != null) 
        {
            newsModified.value = "edit";
        }

        var pageForm = document.forms['C2AlertForm'];

        if (pageForm != null) 
        {
            pageForm.submit();
        }
    }
    else 
    {
        window.alert("Please select an alert that you wish to edit.");

        var newsModified = $get("NewsModifiedHidden");

        if (newsModified != null) 
        {
            newsModified.value = "";
        }
    }
} //EditButton_Click

/*
''' <summary>
''' This function is called when the delete button is clicked
''' </summary>
''' <param name="sender">Sender</param>
''' <param name="eventArgs">Event arguments</param>
*/
function DeleteButton_Click(sender, eventArgs) 
{
    var grid = $find("ctl00_MainBottomContent_NewsGrid");
    var MasterTable = grid.get_masterTableView();

    var selectedRows = MasterTable.get_selectedItems();
    if (selectedRows.length > 0) 
    {
        var row = selectedRows[0];
        var cell = MasterTable.getCellByColumnUniqueName(row, "NewsId")
        var newsId = cell.innerHTML;

        var newsIdHidden = document.getElementById("SelectedNewsIdHidden");

        if (newsIdHidden != null) 
        {
            newsIdHidden.value = newsId;
        }

        var newsModified = $get("NewsModifiedHidden");

        var pageForm = document.forms['C2AlertForm'];

        if (window.confirm("Are you sure you wish to delete the selected alert?")) 
        {
            if (newsModified != null) 
            {
                newsModified.value = "delete";
            }

            if (pageForm != null) 
            {
                pageForm.submit();
            }
        }
    }
    else 
    {
        window.alert("Please select an alert that you wish to delete.");

        var newsModified = $get("NewsModifiedHidden");

        if (newsModified != null) 
        {
            newsModified.value = "";
        }
    }
} //DeleteButton_Click

/*
''' <summary>
''' This function is called when an AJAX request is starting
''' </summary>
''' <param name="sender">Sender</param>
''' <param name="eventArgs">Event arguments</param>
*/
function ViewNewsOnAjaxRequestStart(sender, eventArgs) 
{

} //ViewNewsOnAjaxRequestStart

/*
''' <summary>
''' This function is called when an AJAX request is ending
''' </summary>
''' <param name="sender">Sender</param>
''' <param name="eventArgs">Event arguments</param>
*/
function ViewNewsOnAjaxResponseEnd(sender, eventArgs) 
{

} //ViewNewsOnAjaxResponseEnd