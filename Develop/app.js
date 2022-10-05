var $presentDay = $("#presentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];

// hour and text properties
 
var presentDate = moment().format("dddd, MMMM Do");
var presentHour = moment().format("H");

// init the to do items
function initializeSchedule(){


//make a for each (time blocks)
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {

      // data hour and todo hour being the same

      hour: thisBlockHr,

      // text open for input :D

      text: "",
    }
    // push items to array

    toDoItems.push(todoObj);
  });

  // after timeblock has been looped save array to local storage (stringify method)

  localStorage.setItem("todos", JSON.stringify(toDoItems));
}


// timeblock colors will be changed based on the time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      // style to present which hour we are in or have passed.
      if (thisBlockHr == presentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < presentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > presentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  
  //assign var text to the timeblock
  //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

 
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// when the document loads
$(document).ready(function(){

  
  // change timeBlocks per time of day 

  setUpTimeBlocks();

  // if statement for nothing written in the locla storage for todos
  if(!localStorage.getItem("todos")){
   
    // init schedule array
    initializeSchedule();
  } 

  //show present date
  $presentDay.text(presentDate);
 
  //show schedule from the local storage :D
  renderSchedule();
  // if a todo button is clicked then save it using saveHandler
  $scheduleArea.on("click", "button", saveHandler);
  
});