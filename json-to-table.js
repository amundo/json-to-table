export const jsonToTable = (data) => {
  let items;
  for (let key in data) {
      if (key !== 'metadata') {
          items = data[key];
          break;
      }
  }
  let metadata = data.metadata

  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')
  let headerRow = document.createElement('tr')

  table.data = items

  if(metadata.title){
    let caption = document.createElement('caption')
    caption.textContent = data.metadata.title
    table.append(caption)
  }


  let columns = metadata.columns
  if (columns) {
    columns.forEach((column) => {
      let th = document.createElement('th')
      th.textContent = column.label
      headerRow.appendChild(th)
    })
  } else {
    Object.keys(items[0]).forEach((key) => {
      let th = document.createElement('th')
      th.textContent = key
      headerRow.appendChild(th)
    })
  }

  thead.appendChild(headerRow)
  table.appendChild(thead)

  items.forEach((item) => {
    let row = document.createElement('tr')
    if (columns) {
      columns.forEach((column) => {
        let td = document.createElement('td')
        td.dataset[column.key] = column.key
        td.textContent = item[column.key]
        row.appendChild(td)
      })
    } else {
      Object.values(item).forEach((value) => {
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
