
//This makes the Side Bar work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

/*This notation section only needed if we use side navigation bar and want collapsible option
//Initialize collapsible (uncomment the lines below if you use the dropdown variation)
var collapsibleElem = document.querySelector('.collapsible');
var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);
*/

//This makes the state,province,park dropdown boxes work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});


//This makes the Modal work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
// add key to open weather


// add key to open weather


//a3ce1170090b51754d348bf99509f9f8857bddbe
