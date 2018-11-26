//this is the add row button
document.getElementById("addRow").onclick = addRowToPage;

//this function creates a new row with columns in the page builder 
//the user selects the number of columns from a drop down and clicks add row 
function addRowToPage() {
    //get the number of rows there are currently 
    var rowNumber = document.getElementById("pageBuilder-rowNumber").value;
    //increament the row number
    rowNumber++;
    //set the page meta data for the new row number
    document.getElementById("pageBuilder-rowNumber").value = rowNumber;

    //create row div
    var rowDiv = document.createElement('div');
    //make the row div ID value
    var rowDivID = "row"+rowNumber;
    //set the row divs id
    rowDiv.setAttribute("id", rowDivID);
    //set the row divs class as row
    rowDiv.classList.add("row");
    //make the row droppable
    rowDiv.setAttribute("ondrop", "handleDrop(event)");
    //make the row allow drops
    rowDiv.setAttribute("ondragover", "allowDrop(event)");
    //add the row div to the page 
    document.getElementById("pageBuilder").appendChild(rowDiv);

    //this gets the value of requested columns dropdown in the container menu
    var requestedCols = document.getElementById("requestedCols").value;
    //to get the total column number divide 12 by the requested column number
    var totalColumns = 12/requestedCols;

    //create the requested number of columns 
    for(var columnNumber = 1; columnNumber <= totalColumns; columnNumber++){
        //create col div
        var colDiv = document.createElement('div');
        //make the col div ID value
        var colDivID = rowDivID + "_col" + columnNumber;
        //set the col divs id
        colDiv.setAttribute("id", colDivID);
        //make the column draggable 
        colDiv.setAttribute("draggable", "true");
        //make the column droppable
        colDiv.setAttribute("ondrop", "handleDrop(event)");
        //make the column allow drops
        colDiv.setAttribute("ondragover", "allowDrop(event)");
        //set the col divs class as a column 
        colDiv.classList.add("col-" + requestedCols);
        //set the column as selectable 
        colDiv.classList.add("selectable");
        //add the row div to the page 
        document.getElementById(rowDivID).appendChild(colDiv);
    }
    
    //add click event handlers to the new columns to make them selectable 
    addEventListenerToSelectable();

}

