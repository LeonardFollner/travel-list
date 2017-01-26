var newList;
var chooseList;

$(document).ready(function () {
  var data = {};
  var allListData = loadListNames();
  var currentListId;
  var currentListData = data;

  var checkedItems = 0;
  var totalItemNumber = 0;

  var table = $("#pack-list");

  newList = function () {
    // enable all items
    $.each(currentListData.lists, function () {
      if (this.enabled) {
        $.each(this.items, function () {
          this.enabled = true;
        });
      }
    });

    currentListId = 0;
    if (allListData !== undefined) {
      currentListId = allListData.length;
    }

    var listName = $("#list-info__name").val();
    var listLocation = $("#list-info__location").val();
    var listStart = $("#list-info__start").val();
    var listEnd = $("#list-info__end").val();

    currentListData.id = currentListId;
    currentListData.name = listName;
    currentListData.location = listLocation;
    currentListData.start = listStart;
    currentListData.end = listEnd;

    var newListMeta = [];
    newListMeta.push(listName);
    newListMeta.push(currentListId);
    if (allListData === undefined) {
      allListData = [];
    }
    allListData.push(newListMeta);
    saveListNames();

    saveCurrentList();
    renderList();

  };

  chooseList = function (elem) {
    currentListId = $(elem).data("id");
    var listCookie = loadList(currentListId);
    // listCookie = [[name, id, location, start, end], [items]]

    currentListData.id = listCookie[0][1];
    currentListData.name = listCookie[0][0];
    currentListData.location = listCookie[0][2];
    currentListData.start = listCookie[0][3];
    currentListData.end = listCookie[0][4];

    $.each(listCookie[1], function () {
      // this = [id, checked, amount, notes]
      var itemId = this[0];

      // enable category
      findListById(itemId.split("_")[0]).enabled = true;

      findItemById(itemId).enabled = true;
      findItemById(itemId).checked = this[1];
      findItemById(itemId).amount = this[2];
      findItemById(itemId).notes = this[3];
    });
    renderList();
  };

  function init() {
    $.ajax({
      url: "data.json",
      dataType: 'json',
      async: false,
      success: function (response) {
        data = response;
        currentListData = response;
      }
    });

    var options = $("#list-info__lists");
    $.each(currentListData.lists, function () {
      var listName = this.name;
      var listId = this.id;
      var listEnabled = this.enabled;

      var listOption = $("<div class='list-info__option'></div>")
        .data("id", listId);
      var listLabel = $("<label>" + listName + "</label>");
      var listOptionInput = $("<input type='checkbox' class='list-info__option__checkbox'>")
        .prop("checked", listEnabled);

      listLabel.append(listOptionInput);
      listOption.append(listLabel);
      options.append(listOption);
    });

    // change enabled lists
    $(".list-info__option__checkbox").on("change", function () {
      var listID = $(this).parent().parent().data("id");
      findListById(listID).enabled = $(this).prop("checked");
    });

    // load previous lists
    if (allListData !== undefined) {
      var listsTable = $("#lists-list");
      $.each(allListData, function () {
        // this = [name, id]
        var listNameRow = $("<tr class='lists-list__list' onclick='chooseList(this);'><td>" + this[0] + "</td></tr>").data("id", this[1]);
        listsTable.append(listNameRow);
      });
    }
  }

  init();

  // generates the package-list for a given data-set
  function generateTable() {
    var theader = $("<thead></thead>");
    var categoryHeaderCell = $("<th>Kategorie</th>");
    var itemHeaderCell = $("<th>Mitnehmen</th>");
    var amountHeaderCell = $("<th>Menge</th>");
    var checkedHeaderCell = $("<th>Eingepackt</th>");
    var notesHeaderCell = $("<th>Notitzen</th>");

    theader.append(categoryHeaderCell);
    theader.append(itemHeaderCell);
    theader.append(amountHeaderCell);
    theader.append(checkedHeaderCell);
    theader.append(notesHeaderCell);

    table.append(theader);

    // appending each category
    $.each(currentListData.lists, function () {
      if (this.enabled) {
        var listName = this.name;
        var items = this.items;

        var tbody = $("<tbody></tbody>")
          .attr("id", "pack-list__" + listName)
          .data("id", this.id);
        table.append(tbody);

        $.each(items, function (index) {
          if (this.enabled) {
            totalItemNumber += 1;

            var row = $("<tr></tr>")
              .data("id", this.id);

            // category header
            if (index === 0) {
              var categoryCell = $("<th class='list__name'>" + listName + "</th>")
                .attr("rowspan", items.length);
              row.append(categoryCell);
            }

            if (this.checked) {
              checkedItems += 1;
            }

            // single item
            var nameCell = $("<td>" + this.name + "</td>");
            var amountInputCell = $("<input type='number' class='item__amount' min='1'>").val(this.amount);
            var amountCell = $("<td></td>");
            amountCell.append(amountInputCell);
            var checkedCell = $("<td></td>");
            var checkedCheckboxCell = $("<input type='checkbox' class='item__checkbox'>")
              .attr("checked", this.checked);
            checkedCell.append(checkedCheckboxCell);
            var notesCell = $("<td></td>");
            var notesInputCell = $("<input type='text' class='item__notes'>").val(this.notes);
            notesCell.append(notesInputCell);
            var deleteCell = $("<td class='item__delete'><i class='fa fa-trash-o' aria-hidden='true'></i></td>");

            // append all cells to the row
            row.append(nameCell);
            row.append(amountCell);
            row.append(checkedCell);
            row.append(notesCell);
            row.append(deleteCell);
            tbody.append(row);
          }
        });
      }
    });
  }

  function findItemById(id) {
    var singleIds = id.split("_");
    var listId = singleIds[0];
    var itemId = singleIds[1];
    return currentListData.lists[listId].items[itemId];
  }

  function findListById(id) {
    return currentListData.lists[id];
  }

  function updateProgressBar() {
    var progress = checkedItems / totalItemNumber;
    var progressString = progress * 100 + "%";
    //TODO: make the colors at ~50% nicer (e.g. find other formula)
    if(progress<0.5) {
      var r = 255;
      var g = Math.floor(progress * 2 * 255);
      var color = "rgb(" + r + ", " + g + ", 0)";
    }

    else{
      var r = Math.floor((1 - progress) * 2 * 255);
      var g = 255;
      var color = "rgb(" + r + ", " + g + ", 0)";

    }

    $("#progress-bar").css("width", progressString)
      .css("background-color", color);
  }

  function renderList() {
    console.log(currentListData);

    $(".list-info").hide();
    $("#lists-list").hide();

    $("#list-name").text(currentListData.name);

    generateTable(currentListData);
    updateProgressBar();

    // delete items
    $(".item__delete").on("click", function () {
      var item = $(this).parent();
      item.hide('slow');
      var itemId = item.data("id");
      findItemById(itemId).enabled = false;
      totalItemNumber -= 1;

      if (findItemById(itemId).checked) {
        checkedItems -= 1;
      }

      updateProgressBar();
      saveCurrentList();
    });

    // check or uncheck items
    $(".item__checkbox").on("change", function () {
      var item = $(this).parent().parent();
      findItemById(item.data("id")).checked = $(this).prop("checked");
      if ($(this).prop("checked")) {
        checkedItems += 1;
      }
      else {
        checkedItems -= 1;
      }
      updateProgressBar();
      saveCurrentList();
    });

    // change item amount
    $(".item__amount").on("change", function () {
      var item = $(this).parent().parent();
      findItemById(item.data("id")).amount = $(this).val();
      saveCurrentList();
    });

    // change item notes
    $(".item__notes").on("change", function () {
      var item = $(this).parent().parent();
      findItemById(item.data("id")).notes = $(this).val();
      saveCurrentList();
    });
  }

  function saveCurrentList() {
    saveToId(currentListId);
  }

  function saveToId(id) {
    var cookie = [];
    var listInfo = [];
    var listData = [];

    listInfo.push(currentListData.name);
    listInfo.push(currentListData.id);
    listInfo.push(currentListData.location);
    listInfo.push(currentListData.start);
    listInfo.push(currentListData.end);

    $.each(currentListData.lists, function () {
      if (this.enabled) {
        $.each(this.items, function () {
          if (this.enabled) {
            var itemCookie = [];
            itemCookie.push(this.id);
            itemCookie.push(this.checked);
            itemCookie.push(this.amount);
            itemCookie.push(this.notes);

            listData.push(itemCookie);
          }
        });
      }
    });

    cookie.push(listInfo);
    cookie.push(listData);

    Cookies.set("list-" + id, cookie);
  }

  function loadList(id) {
    return Cookies.getJSON("list-" + id);
  }

  function saveListNames() {
    Cookies.set("lists", allListData);
  }

  function loadListNames() {
    return Cookies.getJSON("lists");
  }
});

function clearAllCookies() {
  Cookies.remove("lists");
  for (var i = 0; i < 50; i++) {
    Cookies.remove("list-" + i);
  }
}
