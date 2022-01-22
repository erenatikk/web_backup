const req = require("express/lib/request");
const { append } = require("express/lib/response");
// const http = require("http");
const parse = require('node-html-parser').parse;

function SaveItem() {

	var name = document.forms.ShoppingList.name.value;
	var data = document.forms.ShoppingList.data.value;


	localStorage.setItem(name, data);
	doShowAll();
	Select();

}

function ModifyItem() {
	var name1 = document.forms.ShoppingList.name.value;
	var data1 = document.forms.ShoppingList.data.value;



	if (localStorage.getItem(name1) != null) {

		localStorage.setItem(name1, data1);
		document.forms.ShoppingList.data.value = localStorage.getItem(name1);
	}


	doShowAll();
}

function RemoveItem() {
	var name = document.forms.ShoppingList.name.value;
	document.forms.ShoppingList.data.value = localStorage.removeItem(name);
	doShowAll();

}
function ClearAll() {
	localStorage.clear();
	doShowAll();
}

function doShowAll() {
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Item</th><th>Value</th><th>Price</th></tr>\n";
		var i = 0;

		for (i = 0; i <= localStorage.length - 1; i++) {
			key = localStorage.key(i);
			list += "<tr><td>" + key + "</td>\n<td>"
				+ localStorage.getItem(key) + "</td>\n<td>" + localStorage.getItem(key) + "</td></tr>\n";
		}


		if (list == "<tr><th>Item</th><th>Value</th><th>Price</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}

		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}





function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {

		return true;
	} else {
		return false;
	}
}
function GetSelected() {
	//Reference the Table.
	var grid = document.getElementById("table1");

	//Reference the CheckBoxes in Table.
	var checkBoxes = grid.getElementsByTagName("INPUT");
	var message = "BrandName   Storage     Price\n";
	
	var list = "<tr><td>Item</td><td>Value</td><td>Price</td></tr>\n";
	//Loop through the CheckBoxes.
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			var row = checkBoxes[i].parentNode.parentNode;
			list += "<tr><td>" + row.cells[0].innerHTML + "</td>\n<td>"
			+ row.cells[1].innerHTML+"</td>\n<td>" + row.cells[2].innerHTML+ "</td></tr>\n";
			message+= row.cells[0].innerHTML + row.cells[1].innerHTML + row.cells[2].innerHTML;
		}
	}

	//Display selected Row data in Alert Box.
	alert(message);
}
function Select(){
	var list = "<tr><td>Item</td><td>Value</td><td>Price</td></tr>\n";
	//Loop through the CheckBoxes.
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			var row = checkBoxes[i].parentNode.parentNode;
			list += "<tr><td>" + row.cells[0].innerHTML + "</td>\n<td>"
			+ row.cells[1].innerHTML+"</td>\n<td>" + row.cells[2].innerHTML+ "</td></tr>\n";
			message+= row.cells[0].innerHTML + row.cells[1].innerHTML + row.cells[2].innerHTML;
		}
	}
}

function TableOnload() {
	
	var xhr = new XMLHttpRequest();
xhr.open("POST", "#");
xhr.send(data);
}
