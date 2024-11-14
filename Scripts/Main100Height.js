/*
''' <summary>
''' This module is used to contain the main 100% height shared javascript functions for the application
''' </summary>
*/

//Call SetDivHeight when the browser is loaded and resized
onload = SetDivHeight;
onresize = SetDivHeight;

/*
''' <summary>
''' This function is used to adjust the given 100% height controls on the page
''' </summary>
''' <param name="controlHeight">Control height</param>
*/
function SetControlHeight(controlHeight) 
{
    var grid = $get("Expand100GridHidden");

    if (grid != null) 
    {
        var gridId = grid.value;
        if (gridId != null) 
        {
            setTimeout(function () 
            {
                var gridControl = $find(gridId);
                if (gridControl != null) 
                {
                    gridControl.repaint();
                }
            }, 200);
        }
    }
} //SetControlHeight

/*
''' <summary>
''' This function is used to get the window height of the current browser
''' </summary>
''' <returns>Current window height</returns> 
*/
function GetWindowHeight() 
{
    var windowHeight = 0;

    if (typeof (window.innerHeight) === 'number') 
    {
        windowHeight = window.innerHeight;
    }
    else 
    {
        if (document.documentElement && document.documentElement.clientHeight) 
        {
            windowHeight = document.documentElement.clientHeight;
        }
        else 
        {
            if (document.body && document.body.clientHeight) 
            {
                windowHeight = document.body.clientHeight;
            }
        }
    }
    return windowHeight;
} //GetWindowHeight

/*
''' <summary>
''' This function is used to change the 100% div height when the browser is resized and loaded
''' </summary>
*/
function SetDivHeight() 
{
    is100HeightMain = true;

    var windowHeight = GetWindowHeight();
    var mainContentElement = document.getElementById('MainContent');
    var topContentElement = document.getElementById('TopContent');
    var topContentHeight = topContentElement.offsetHeight;
    var gridContentElement = document.getElementById('BottomContent');
    var gridHeight;

    gridHeight = windowHeight - 135 - topContentHeight;
    if (gridHeight < 100) 
    {
        gridHeight = 100;
    }

    gridContentElement.style.height = gridHeight + 'px';

    SetControlHeight(gridHeight);

    mainContentElement.style.height = topContentElement.offsetHeight + gridHeight + 'px';
} //SetDivHeight

/*
''' <summary>
''' This function is called when an AJAX request is starting
''' </summary>
''' <param name="sender">Sender</param>
''' <param name="eventArgs">Event arguments</param>
*/
function OnAjaxRequestStart(sender, eventArgs) 
{
    currentLoadingPanel = $find('MainTopContent_PageLoadingPanel');
    currentUpdatedControl = 'MainContent';

    //show the loading panel over the updated control
    currentLoadingPanel.show(currentUpdatedControl);
} //OnAjaxRequestStart

/*
''' <summary>
''' This function is called when an AJAX request is ending
''' </summary>
''' <param name="sender">Sender</param>
''' <param name="eventArgs">Event arguments</param>
*/
function OnAjaxResponseEnd(sender, eventArgs) 
{
    //hide the loading panel and clean up the global variables
    if (currentLoadingPanel != null) 
    {
        currentLoadingPanel.hide(currentUpdatedControl);
    }

    currentUpdatedControl = null;
    currentLoadingPanel = null;

    var validationDiv = document.getElementById('PageValidationWrapper');

    if (validationDiv != null) 
    {
        validationDiv.focus();
    }
} //OnAjaxResponseEnd