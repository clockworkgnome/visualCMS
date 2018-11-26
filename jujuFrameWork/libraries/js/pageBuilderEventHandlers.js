//this function adds a click event listener to each selectable class 
function addEventListenerToSelectable() {
    var selectables = document.getElementsByClassName("selectable");

    for (var i = 0; i < selectables.length; i++) {
        selectables[i].addEventListener('click', containerToggleSelected, false);
    }
}
//this is the event handler for the selectable click event 
function containerToggleSelected() {
    var columnID = this.getAttribute("id");
    document.getElementById(columnID).classList.toggle("selected");
    
}

//this event gets data from a column being dragged 
document.addEventListener("dragstart", function( event ) {
    var columnID = event.target.id;
    event.dataTransfer.setData("text/plain", columnID);
}, false);

//this event handles after a column has been dropped on another column or row
const handleDrop = (event) => {
    event.preventDefault();

    //the column being draggedinfo
    var draggedColumnID = event.dataTransfer.getData("text/plain");
    var draggedColumn = document.getElementById(draggedColumnID);

    //the item being dropped on's info
    var itemDroppedOnID =event.target.id;
    var itemDroppedOn = document.getElementById(itemDroppedOnID);

    //the row of the item being dropped on 
    var droppedRowNumber = itemDroppedOnID.split("_")[0].split("row")[1];
    //the row of the item being dragged 
    var draggedRowNumber = draggedColumnID.split("_")[0].split("row")[1];

    //check to see what type of item is being dropped on
    var itemType = itemDroppedOn.classList[0];
    
    if(itemType === "emptyRow"){
    //if this is an empty row 
        itemDroppedOn.innerHTML = "";
        itemDroppedOn.classList.toggle("emptyRow");
        itemDroppedOn.classList.add("row");
        itemDroppedOn.appendChild(draggedColumn);
        //renumber the columns in the dropped item 
        reNumberColumnsByRowNumber(droppedRowNumber);
    }else if(itemType === "row"){
    //if this is a row 
        itemDroppedOn.appendChild(draggedColumn);
        //renumber the columns in the dropped item 
        reNumberColumnsByRowNumber(droppedRowNumber);
    }else if(draggedColumn !== null){
    //if this is a column

        //place the dragged column after the dropped column 
        itemDroppedOn.parentNode.insertBefore(draggedColumn, itemDroppedOn.nextSibling);
        //check to see if the row dragged from is empty if it is convert it to a blank row 
        if(checkIfRowEmpty(draggedRowNumber)){
            convertRowToBlankRow(draggedRowNumber);
        }
        //renumber the columns in the dropped item 
        reNumberColumnsByRowNumber(droppedRowNumber);
    }//end check if column
    
}//end drop handler

//this handler is required to make a column or row droppable 
const allowDrop = (event) => {
    event.preventDefault();
}