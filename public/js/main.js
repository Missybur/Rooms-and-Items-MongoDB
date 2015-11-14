'use strict';

$(document).ready(init);

var newRoom;
var newItem;

var roomInfo = localStorage.roomInfo ? JSON.parse(localStorage.roomInfo) : [];
var itemInfo = localStorage.itemInfo ? JSON.parse(localStorage.itemInfo) : [];

  // updateList();

  function init() {
    $('#add').click(addRoom);
    $('#addItem').click(addItem);
    $("#itemButton").click(addItem);
    // $('#list').on('click', '.remove', removeRoom);
    getRooms();
    getItems();
  }

  function getRooms(){

    $.get("/rooms")
    .done(function(data){
      console.log(data);
      appendRooms(data);
    })

    .fail(function(err){
      console.log(err)
    });
  }

  function getItems(){

    $.get("/items")
    .done(function(data){
      console.log(data);
      appendItems(data);
    })

    .fail(function(err){
      console.log(err)
    });
  }

//   function removeRoom(e) {
//     var $target = $(e.target);
//     var $targetRow = $target.closest('tr');

//     var index = $targetRow.index();
//     roomInfo.splice(index, 1);

//     var messageBoard = $("#messageBoard").val();
//      $.ajax({
//       type: "DELETE",
//       url: "/",
//       data: {string : messageBoard},
//     })

//     updateList();
//   }

  // function editMessagePost(e){

  //   document.getElementById("editor").addEventListener("input", function() {
  //     // alert("Click on the input boxes below to edit content!")
  // }, false);
  // }

function addRoom(event) {
  event.preventDefault();
  var newRoom = $('#input').val();
  $.ajax({
    type: "POST",
    url: "/rooms",
    data: {name : newRoom},
  })

  .done(function(data){
    console.log(data);
    getRooms();
  })
  .fail(function(err){
    console.log(err)
  });

}


function deleteRoom(event) {
  event.preventDefault();
  var newRoom = $('#input').val();
  $.ajax({
  type: "DELETE",
    url: "/rooms",
    data: {name : newRoom},
  })

  .done(function(data){
    console.log(data);
    getRooms();
  })
  .fail(function(err){
    console.log(err)
  });

}

function appendRooms(rooms){
  event.preventDefault();
  var newRow = {}

  for (var i = 0; i < rooms.length; i++){
    var newRow = $("<tr/>");
    $("#list").append(newRow);

  newRow.append($("<td>" + rooms[i].name + "</td>" + "<td>" + "<input id=itemId placeholder=Item>" + "</input>" + "<button id=itemButton>" + "</td>" + "<td id=roomItems>" + "</td>" + "<td>" + "</td>"))
  }

  return newRow
    roomInfo.push(newRow);
}

function appendItems(items){
  var itemRow = {}
  var itemAdded = $("#inputItem").val();

  for (var i = 0; i < items.length; i++){
    var newItem = $("<tr>" + itemAdded + "</tr>");
    $("#roomItems").append(newItem);

  var newnewItem = newItem.append($("<td id=roomItems>" + items[i].name + "</td>" ))
  console.log(newnewItem)
  }

}



