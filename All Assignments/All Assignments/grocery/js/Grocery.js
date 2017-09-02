(function () {
    "use strict"
    //declare your variable
    var unorderedListGroceries, txtGrocery, buttonAdd, buttonRemove, groceryLITemplate,
        groceryLIPlaceholder, divGroceryList;

    //assign your variables
    unorderedListGroceries = document.querySelector('#unorderedListGroceries');
    txtGrocery = document.querySelector('#textGrocery');
    buttonAdd = document.querySelector('#buttonAdd');
    buttonRemove = document.querySelector('#buttonRemove');
    divGroceryList = document.querySelector('#divGroceryList');

    groceryLIPlaceholder = "{{grocery}}";
    groceryLITemplate = "<li><label><input type='radio' name='grocery' value='" + groceryLIPlaceholder + "'/> " + groceryLIPlaceholder + "</label></li>";


    //Create your functions

    //////////////////////////////Add The Grocery Items///////////////////////////////////////////////////
    function AddGrocery() {
        // debugger; //code will stop here

        var grocery = textGrocery.value.trim();
        var validate = IsValidGrocery(grocery);
        if (validate == "") {
            addGroceryLI(grocery);
        }
        else {
            showErrorMessage(validate);
        }

        txtGrocery.value = "";
        //refresh to add the grocery list div if  item added
        location.reload();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////Validation for Empty and Duplicate/////////////////////////////////////////////////
    function IsValidGrocery(grocery) {
        var retVal = "";
        if (grocery == "") {
            retVal = "Empty Fields are not Allowed";
        }
        else {
            var selector = "input[type=radio][value='" + grocery + "']";
            var potentialRadio = document.querySelector(selector);
            if (potentialRadio) {
                retVal = "Duplicates Items are not allowed";
            }
        }
        return retVal;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////Shows the error Message//////////////////////////////////////////////////////////////
    function showErrorMessage(validate) {

        alert(validate);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////Save to Local Storage//////////////////////////////////////////////////////////
    function saveToStorage() {
        var groceries = [];
        var selector = "#unorderedListGroceries input[type=radio]";
        var radios = document.querySelectorAll(selector);

        for (var i = 0; i < radios.length; i++) {
            groceries.push(radios[i].value);
        }
        window.localStorage.setItem("groceries", JSON.stringify(groceries));
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////Add the items in List////////////////////////////////////////////////////////////////////
    function addGroceryLI(grocery) {
        var newGrocery = groceryLITemplate.replace(groceryLIPlaceholder, grocery).replace(groceryLIPlaceholder, grocery);
        //debugger;
        unorderedListGroceries.innerHTML += newGrocery;
        saveToStorage();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////Remove the grocery Items/////////////////////////////////////////////////////////
    function Remove() {
        //debugger;
        var selector = "#unorderedListGroceries input[type=radio]:Checked";
        var selectedRadio = document.querySelector(selector);
        if (selectedRadio) {
            selectedRadio.parentNode.parentNode.remove();
            saveToStorage();
        }
        else {
            showErrorMessage("Please select some Items to remove!!");
        }
        //refresh to remove the grocery list div if no item available
        location.reload();
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////Initialization and Event Listner///////////////////////////////////////////////////
    function init() {
        //add event listner
        buttonAdd.addEventListener("click", AddGrocery);
        buttonRemove.addEventListener("click", Remove);

        //retreive data from local storage
        var groceries = JSON.parse(window.localStorage.getItem("groceries"));
        //debugger;
        for (var i = 0; i < groceries.length; i++)
            addGroceryLI(groceries[i]);

        //check the grocery list div have items or not
        if (groceries.length > 0) {
            document.getElementById('divGroceryList').style.display = "block";
        }

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    init();

    //add return statements


})();