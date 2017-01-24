var renderList;

$(document).ready(function () {
  var data = {};
  var checkedItems = 0;
  var totalItemNumber = 0;

  var table = $("#pack-list");

  function init() {
    $.ajax({
      url: "data.json",
      dataType: 'json',
      async: false,
      success: function (response) {
        data = response;
      }
    });
    console.log(data);

    $("#list-info__name").val(data.name);
    $("#list-info__location").val(data.location);

    var options = $("#list-info__lists");
    $.each(data.lists, function () {
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
  }

  init();

  // generates the package-list for a given data-set
  function generateTable(list) {
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
    $.each(list.lists, function () {
      if (this.enabled) {
        var listName = this.name;
        var items = this.items;

        totalItemNumber += items.length;

        var tbody = $("<tbody></tbody>")
          .attr("id", "pack-list__" + listName)
          .data("id", this.id);
        table.append(tbody);

        $.each(items, function (index) {
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
          var notesInputCell = $("<input type='text'>").val(this.notes);
          notesCell.append(notesInputCell);
          var deleteCell = $("<td class='item__delete'><i class='fa fa-trash-o' aria-hidden='true'></i></td>");

          // append all cells to the row
          row.append(nameCell);
          row.append(amountCell);
          row.append(checkedCell);
          row.append(notesCell);
          row.append(deleteCell);
          tbody.append(row);
        });
      }
    });
  }

  function findItemById(id) {
    var singleIds = id.split("_");
    var listId = singleIds[0];
    var itemId = singleIds[1];
    return data.lists[listId].items[itemId];
  }

  function findListById(id) {
    return data.lists[id];
  }

  function updateProgressBar() {
    var progress = checkedItems / totalItemNumber;
    var progressString = progress * 100 + "%";
    //TODO: make the colors at ~50% nicer (e.g. find other formula)
    var r = Math.floor((1 - progress) * 255);
    var g = Math.floor(progress * 255);
    var color = "rgb(" + r + ", " + g + ", 0)";
    $("#progress-bar").css("width", progressString)
      .css("background-color", color);
  }

  renderList = function () {
    $(".list-info").hide();
    generateTable(data);
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
    });

    // change item amount
    $(".item__amount").on("change", function () {
      var item = $(this).parent().parent();
      findItemById(item.data("id")).amount = $(this).val();
    });
  };
});
