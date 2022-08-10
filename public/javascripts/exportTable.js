// source
// https://www.codexworld.com/export-html-table-data-to-excel-using-javascript/

document.getElementById('export-excel-file').addEventListener('click', () => {
  exportTableToExcel('tblData', `${Date.now()}_students`)
})

function exportTableToExcel(tableID, filename = '') {
  var downloadLink
  var dataType = 'application/vnd.ms-excel'
  var tableSelect = document.getElementById(tableID)
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

  // Specify file name
  filename = filename ? filename + '.xls' : 'excel_data.xls'

  // Create download link element
  downloadLink = document.createElement('a')

  document.body.appendChild(downloadLink)

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType,
    })
    navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML

    // Setting the file name
    downloadLink.download = filename

    //triggering the function
    downloadLink.click()
  }
}
