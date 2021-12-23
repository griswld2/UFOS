// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
      }
    );
  });
}

var filters = [];

function updateFilters() {
  let changedElement = d3.select(this);
  let elementValue = changedElement.property("value");
  console.log(elementValue)
  let filterId = changedElement.attr("id");
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }
  filterTable();
}

function filterTable() {
  let filteredData = tableData;
  Object.entries(filters).forEach(([key,value]) =>{
    filteredData = filteredData.filter(row => row[key] === value);
  });
  buildTable(filteredData);
}
  // Attach an event to listen for the form button
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
