
var request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true)
request.send();
request.onload = function () {
    var currentIndex = 0;
    var noOfRecords = 10;
    var rows = JSON.parse(this.response);
    prepareTable(rows.slice(0, noOfRecords));
    var totalPages = rows.length / noOfRecords;     
    var pagination = "<a id='prev' href='#'>&laquo;</a>";
    for (var i = 0; i < totalPages; i++) {
        pagination += "<a class='p-2 m-2 bg-info border text-dark rounded-circle' id=" + (i) + " href='#'>" + (i + 1) + "</a>";
    }
    pagination += "<a id='next' href='#' >&raquo;</a> ";
    document.getElementById("pagination").innerHTML = pagination;
    for (var i = 0; i < totalPages; i++) {
        document.getElementById(i).addEventListener('click', x => {
            currentIndex = Number(x.currentTarget.innerText) - 1;
            prepareTable(rows.slice((currentIndex * noOfRecords), (currentIndex * noOfRecords) + noOfRecords));
        })
    }

    document.getElementById('next').addEventListener('click', x => {
        if(currentIndex < totalPages-1){
            currentIndex = currentIndex + 1;
            prepareTable(rows.slice((currentIndex * noOfRecords), (currentIndex * noOfRecords) + noOfRecords));
        }
    })

    document.getElementById('prev').addEventListener('click', x => {
        if(currentIndex > 0){
            currentIndex = currentIndex -1;
            prepareTable(rows.slice((currentIndex * noOfRecords), (currentIndex * noOfRecords) + noOfRecords));
        }
    })
}
function prepareTable(rowData) {
    var html = "<table class='table table-striped table-dark'>";
    for (var i = 0; i < rowData.length; i++) {
        html += "<tr>";
        html += "<td>" + rowData[i].id + "</td>";
        html += "<td>" + rowData[i].name + "</td>";
        html += "<td>" + rowData[i].email + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("box").innerHTML = html;
  }