window.onload = function() {
  // subway object with multiple lines
  var subway = {
    nLine: ["Times Square","34th","28th","Union Square","8th"],
    lLine: ["8th","6th","Union Square","3rd","1st"],
    sixLine: ["Grand Central","33rd","28th","23rd","Union Square","Astor Place"]
  };

  // get the <select> elements with id startStation and endStation
  var startList = document.getElementById("startStation");
  var endList = document.getElementById("endStation");

  // function to build the station select lists
  function buildList (selectEl) {
    // store the individual drop down list values
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

  // call to function that populates station select lists
  buildList(startList, subway);
  buildList(endList, subway);

  function routeValidation(start, stop){
    var errMsg = document.getElementById("plan_btn_help");
    if (start === stop) {
      // display error
      if (errMsg != null) {
        errMsg.innerHTML = "The stations where your journey begins and ends should differ.";
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

    // get the change over station by querying the obj instead of hardcoding value
    var changeOver = "Union Square";
    var stopCount = 0;

    // clear route details when plan route is clicked
    document.getElementById("routeInfoStops").innerHTML = "";
    document.getElementById("routeHeader").innerHTML = "";
    document.getElementById("routeInfoMsg").innerHTML = "";

    // validate select stations
    if (routeValidation(startStation, endStation)){

      // check if a line change is needed
      if (startLine === endLine){
        changeOver = "none";

        // determine route direction and adjust array elements if needed
        if (subway[startLine].indexOf(firstStation) > subway[startLine].indexOf(lastStation)) { subway[startLine].reverse(); }

        // loop through each of the stations on the same line
        for(var i = subway[startLine].indexOf(firstStation); i <= subway[startLine].indexOf(lastStation); i++ ){
          stopCount++;
          // display route summary
          displayRoute(subway[startLine][i]);
        }
        displaySummary(startLine, endLine, firstStation, lastStation, stopCount, changeOver);

      } else {
        // determine route direction and adjust array elements if needed
        if (subway[startLine].indexOf(firstStation) > subway[startLine].indexOf(changeOver)) { subway[startLine].reverse(); }

        // loop through each of the stations (array value) on the line until a change over is needed
        for(var i = subway[startLine].indexOf(firstStation); i < subway[startLine].indexOf(changeOver); i++ ){
          stopCount++;
          // display part 1 route summary
          displayRoute(subway[startLine][i]);
        }

        // determine route direction and adjust array elements if needed
        if (subway[endLine].indexOf(changeOver) > subway[endLine].indexOf(lastStation)) { subway[endLine].reverse(); }

        // display second part of journey
        for(var i = subway[endLine].indexOf(changeOver); i <= subway[endLine].indexOf(lastStation); i++ ){
          stopCount++;
          // display part 1 route summary
          displayRoute(subway[endLine][i]);
        }

        // display summary route information
        displaySummary(startLine, endLine, firstStation, lastStation, stopCount, changeOver);

        // display change over


      }
    }
  }

  function displaySummary (startLine, endLine, firstStation, lastStation, stopCount, changeOver) {
    document.getElementById("routeHeader").innerHTML = "Journey Information";
    if (changeOver === "none"){
      document.getElementById("routeInfoMsg").innerHTML = "Your journey on the " + startLine + " line will begin at " + firstStation + " station and end at " + lastStation + " station with " + (stopCount -1) + " stops.";
    } else {
      document.getElementById("routeInfoMsg").innerHTML = "Your journey will begin at " + firstStation + " station and end at " + lastStation + " station, with " + (stopCount -1) + " stops before changing at " + changeOver + " station.";
    }
  }

  function displayRoute(stopName){
    var stopList = document.getElementById("routeInfoStops");

    // create element to display stop list
    var listItem = document.createElement("li");
    listItem.innerHTML = stopName;
    stopList.appendChild(listItem);
  }



  // function literal used to pass argument to a callback function
  document.getElementById("plan_btn").onclick = function(event){
    buildRoute(this.form);
  };

};
