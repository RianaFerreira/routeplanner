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
  function buildList (selectEl) {
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

          //append the child element to the parent select elements
          selectEl.appendChild(listItem);
        }
      }
    }
  }

  function routeValidation(start, stop){
    var errMsg = document.getElementById("plan_btn_help");
    if (start === stop) {
      // display error
      if (errMsg != null) {
        errMsg.innerHTML = "Please select the stations where your journey will begin and end.";
        return false;
      }
    } else {
      // clear existing route information or error message
      if (errMsg != null){
        errMsg.innerHTML = "";
        return true;
      }
    }
  }

  // function to build the route based on selected stations
  function buildRoute (theForm) {
    // get selected stations from form array object, elements accessible by name attribute
    var startStation = theForm["startStation"].value;
    var endStation = theForm["endStation"].value;

    // get the start/end lines and start/end stations
    var startLine = startStation.slice(0, startStation.indexOf(","));
    var endLine = endStation.slice(0, endStation.indexOf(","));
    var firstStation = startStation.slice(startStation.indexOf(",")+2);
    var lastStation = endStation.slice(endStation.indexOf(",")+2);

    // get the change over station
    var changeOver = "Union Square";

    // get the element to display route details
    var routeInfo = document.getElementById("routeInfo_stops");
    routeInfo.innerHTML = "";

    // validate select stations
    if (routeValidation(startStation, endStation)){

      // check if a line change is needed
      if (startLine === endLine){

        // loop through each of the stations on the same line
        for(var i = subway[startLine].indexOf(firstStation); i <= subway[startLine].indexOf(lastStation); i++ ){
          displayRoute(subway[startLine][i]);
        }
      } else {
        // loop through each of the stations (array value) on the line until a change over is needed
        console.log("change line needed");
        //       for (var key in stationObj){
        //   if (stationObj.hasOwnProperty(key) && key === startLine){
        //     for (var val in stationObj[key].indexOf()){

        //     }
        //   }
        // }
      }

    }
    // display summary route information
    // create element to display stop list
    // display change over
  }

  function displayRoute(stopName){
    var stopList = document.getElementById("routeInfo_stops");
    var listItem = document.createElement("li");
    listItem.innerHTML = stopName;
    stopList.appendChild(listItem);
  }

  // call to functions
  buildList(startList, subway);
  buildList(endList, subway);

  // function literal used to pass argument to a callback function
  document.getElementById("plan_btn").onclick = function(event){
    buildRoute(this.form);
  };

};
