window.onload = function() {
  // subway object with multiple lines

  var subway = {
    nLine: ["Times Square","34th","28th on the N","Union Square","8th on the N"],
    lLine: ["8th","6th","Union Square","3rd","1st"],
    sixLine: ["Grand Central","33rd","28th","23rd","Union Square","Astor Place"]
  };

  // get the <select> elements with id startStation and endStation
  var startList = document.getElementById("startStation");
  var endList = document.getElementById("endStation");

  // function to build the station select lists
  var buildList = function(selectEl){
    // store the drop down list values
    var stations = "";

    //do you append each child element while the loop is running or on completion?
    for (var key in subway) {
      if (subway.hasOwnProperty(key)) {
        //console.log(key + " " + subway[key]);

        for(var val in subway[key]){
          stations = key + ", " + subway[key][val];

          // create new child element of type option
          var listItem = document.createElement("option");

          // assign child element value attribute and content the current line station value
          listItem.setAttribute("value", stations);
          listItem.innerHTML = stations;

          selectEl.appendChild(listItem);
        }
      }
    }
  };

  //append the child element to the parent select elements
  //startList.appendChild(listItem);
  buildList(startList);
  buildList(endList);


}