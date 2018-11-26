//this is the combine columns button
document.getElementById("combineColumns").onclick = combineColumns;

//this function combines selected columns after user selects columns and clicks the combine button 
function combineColumns(){
    //group all selected columns
    var colGroups = groupSelectedColumns();
    //combine columns horizontaly
    combineColumnsHorizontal(colGroups);

}//end combine columns function


/**
 * This funtion takes sorted selected columns from user 
 * and combines the groups horizonatly 
 * @param {array} colGroups 
 */
function combineColumnsHorizontal(colGroups){
    console.log(colGroups);
    
    //cycle through the rows 
    for (var rowNumber = 1; rowNumber < colGroups.length; rowNumber++) {
        //this add the column spans of the columns to combine 
        var combineColSpan = 0;
        //cycle thorugh column groups 
         for (var groupNumber = 0; groupNumber < colGroups[rowNumber].length; groupNumber++) {
             var group = colGroups[rowNumber][groupNumber]
            //cycle through columns
            for (var i = 0; i<group.length; i++){
                //get the column number
                var columnNumber = group[i];
                //get the column
                var column = document.getElementById("row" + rowNumber + "_col" + columnNumber);
                //get the column class to retrive the span
                var firstClass = column.classList[0];
                //get the span of this column
                var spanToAdd = 0;
                //check if span is two digits
                if(firstClass.substring(firstClass.length-2,(firstClass.length-3)) === "-"){
                    spanToAdd = parseInt(firstClass.substring(firstClass.length,(firstClass.length-2)));
                }else{
                    spanToAdd = parseInt(firstClass.substring(firstClass.length,(firstClass.length-1)));
                }

                //if this is the last column in the group
                if(( i === (group.length-1) ) ){
                    //build a new column to replace the old ones
                    //build a new element
                    var newCol = document.createElement('div');
                    //set the new elements id to this columns id
                    var columnID = column.getAttribute("id");
                    newCol.setAttribute("id", columnID);
                    //make the column draggable 
                    newCol.setAttribute("draggable", "true");
                    //make the column droppable
                    newCol.setAttribute("ondrop", "handleDrop(event)");
                    //make the column allow drops
                    newCol.setAttribute("ondragover", "allowDrop(event)");
                    //add its col span to combine col span
                    combineColSpan += spanToAdd;
                    //build the new columns class based off the number of columns in this group
                    newCol.classList.add("col-" + combineColSpan);
                    //make the new column selectable 
                    newCol.classList.add("selectable");
                    //make them selected for combine 
                    newCol.classList.add("selected");
                    //replace the old element
                    column.parentNode.replaceChild(newCol, column);
                    //add click event handlers to the new columns to make them selectable 
                    addEventListenerToSelectable();

                }else{
                    //if this is not the last column in the group 
                    //add its col span to combine col span
                    combineColSpan += spanToAdd;
                    //remove it
                    column.parentNode.removeChild(column);
                }

                //check to see if we are going down to one column from two
                if(combineColSpan === 12) {
                    //get the privious group
                    var lastColumnNumber = colGroups[rowNumber][groupNumber-1]
                    if (typeof(lastColumnNumber) === "undefined"){
                        return;
                    }
                    //get the previous column
                    var lastColumn = document.getElementById("row" + rowNumber + "_col" + lastColumnNumber[0]);
                    //remove it
                    lastColumn.parentNode.removeChild(lastColumn);
                }//end check to see if going down to one column

            }//end cycle through columns 
         }//end cycle through column groups 

         //re-number each column in a row that has changed 
         reNumberColumnsByRowNumber(rowNumber);

    }//end cylce through rows 
}//end combine column horizontal function

/**
 * this function gets all columns slected by user and groups them
 * the groups are returned as an array
 * the array format is groups[rowNumber] = group[groupNumber] = [columnNumbers]
 * @returns array
 **/
function groupSelectedColumns(){
    //get all selected collumns
    var selectedColumns = document.getElementsByClassName("selected");
    //make an array to group the selected data by rows
    var colGroups = [];
    //make an array to hold a rows column numbers 
    var colNumbers = [];
    //make a group counter for columns seperated in a row
    var groupNumber = 0;
    //make a flag to beable to tell if we are in a new row 
    var oldRow;
    //this is for groups in rows 
    var rowGroups = [];
    //loop through selected columns
    for (var i = 0; i < selectedColumns.length; i++) {
        //get selected columns ID
        var columnID = selectedColumns[i].getAttribute("id");

        //group column ids into sets that can be combined
        //split the id into row and column numbers
        var idColParts = columnID.split("_col");
        var rowNumber = idColParts[0].replace("row", "");
        var colNumber = idColParts[1];
        //parse the ids into ints for array index
        rowNumber = parseInt(rowNumber);
        colNumber = parseInt(colNumber);

        //check to see if the selected columns get split up
        var lastColumn = colNumbers[colNumbers.length-1];
        var checkColumn = colNumber-1;
        //if the column indexes are sequential they have not split up
        if(checkColumn !== 0 && lastColumn !== checkColumn){
            //if columns get split make a new row group
            groupNumber++;
            //empty column numbers for the next group
            colNumbers = [];
        }

        //if we are on a new row
        if (oldRow !== rowNumber){
            //keep track of the last row to make a new row index
            oldRow = rowNumber;
            //empty out the column number so they dont duplicate
            colNumbers = [];
            //make sure the next rows group numbers start at zero
            groupNumber = 0;
            //empty row groups so this row wont get duplicated 
            rowGroups = [];
        }
        //put the next column number into the column array 
        colNumbers.push(colNumber);
        //add the columns to thier group
        rowGroups[groupNumber] = colNumbers;
        //add the group to its row 
        colGroups[rowNumber] = rowGroups;

    }
    return colGroups;
}//end group columns function