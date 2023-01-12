export const jsonToTable = (data) => {
  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')
  let headerRow = document.createElement('tr')
  let caption = document.createElement('caption')
  table.append(caption)
  table.data = data
  caption.textContent = data.metadata.title

  let columns = data.metadata.columns

  if (columns) {
    columns.forEach((column) => {
      let th = document.createElement('th')
      th.textContent = column.label
      headerRow.appendChild(th)
    })
  } else {
    Object.keys(data.events[0]).forEach((key) => {
      let th = document.createElement('th')
      th.textContent = key
      headerRow.appendChild(th)
    })
  }

  thead.appendChild(headerRow)
  table.appendChild(thead)

  data.events.forEach((event) => {
    let row = document.createElement('tr')
    if (columns) {
      columns.forEach((column) => {
        let td = document.createElement('td')
        td.dataset[column.key] = column.key
        td.textContent = event[column.key]
        row.appendChild(td)
      })
    } else {
      Object.values(event).forEach((value) => {
        let td = document.createElement('td')
        td.dataset[column.key] = column.key
        td.textContent = value
        row.appendChild(td)
      })
    }
    tbody.appendChild(row)
  })
  table.appendChild(tbody)
  return table
}
