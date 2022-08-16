import exportTableToExcel from './exportTable.js'
// import highlightChosenSection from './navbar.js'

document.getElementById('export-excel-file').addEventListener('click', () => {
  exportTableToExcel(
    'tableData',
    `${new Date().toJSON().slice(0, 10)}_students`,
  )
})

// const navbarButtons = document.querySelectorAll('.navbar-button')

// navbarButtons.forEach((button) => {
//   console.log(button)
//   button.addEventListener('click', (e) => {
//     // e.preventDefault()
//     navbarButtons.forEach((target) => {
//       target.classList.remove('selected-navbar-option')
//     })
//     button.classList.add('selected-navbar-option')
//   })
// })
