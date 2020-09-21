/**
 * Renumber columns in the given row after the columns have been changed by some process
 * @param {*} rowNumber 
 */
function reNumberColumnsByRowNumber(rowNumber){
    //get all selectables in this row
    var selectablesByRow = document.getElementById("row"+rowNumber).getElementsByClassName("selectable");
    //this will hold the new id of the column
    var newID = "";
    //for each selectable change its ID attribute
    for (var i = 0; i < selectablesByRow.length; i++) {
        newID = "row"+rowNumber+"_col"+(i+1);
        selectablesByRow[i].setAttribute("id", newID);
    }

}


/**
 * check to see if a given row has columns
 * returns true if it does false if it doesnt
 * @param { check } rowNumber 
 */
function checkIfRowEmpty(rowNumber){
    //this is the row the column got dragged from
    var row = document.getElementById("row"+rowNumber);
    //get all selectables in this row
    var selectablesByRow = row.getElementsByClassName("selectable");
    //check to see if the row has no columns
    if(selectablesByRow.length === 0){
        return true;
    }
    return false;
}

/**
 * converts given row into blank row
 */
function convertRowToBlankRow(rowNumber) {
    //this is the row the column got dragged from
    var row = document.getElementById("row"+rowNumber);
    row.classList.add("emptyRow");
    row.classList.remove("row");
    row.innerHTML = "EMPTY ROW";
    //make the row droppable
    row.setAttribute("ondrop", "handleDrop(event)");
    //make the row allow drops
    row.setAttribute("ondragover", "allowDrop(event)");

}
