import exportTableToExcel from './exportTable.js'

document.getElementById('export-excel-file').addEventListener('click', () => {
  exportTableToExcel(
    'tableData',
    `${new Date().toJSON().slice(0, 10)}_students`,
  )
})

const navButtons = document.querySelectorAll('.nav-buttons')

console.log(navButtons)
