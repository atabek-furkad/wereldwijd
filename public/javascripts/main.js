import exportTableToExcel from './exportTable.js'
// import highlightChosenSection from './navbar.js'

if (document.getElementById('export-student-list')) {
  document
    .getElementById('export-student-list')
    .addEventListener('click', () => {
      exportTableToExcel(
        'student-list-data',
        `${new Date().toJSON().slice(0, 10)}_student_list`,
      )
    })
}

if (document.getElementById('export-presence-list')) {
  document
    .getElementById('export-presence-list')
    .addEventListener('click', () => {
      exportTableToExcel(
        'presence-list-data',
        `${new Date().toJSON().slice(0, 10)}_presence_list`,
      )
    })
}

// export const presentList = []

if (document.getElementById('presenceTable')) {
  document
    .getElementById('presenceTable')
    .addEventListener('click', ({ target }) => {
      console.log('clicked  ?', target.checked)
      if (target.nodeName === 'INPUT') {
        if (target.checked) {
          target.checked = true
        } else {
          target.checked = false
        }
      } else {
        const tr = target.closest('tr')
        console.log(tr)

        if (tr) {
          const checkbox = tr.querySelector("input[type='checkbox']")
          if (checkbox.checked) {
            checkbox.checked = false
          } else {
            checkbox.checked = true
          }
        }
      }
    })
}

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
