(async() => {
  const API_URL = 'http://localhost:3000/employees';
  const tableData = document.getElementById('data-table');
  const searchBar = document.getElementById("search");
  const deleteBtn = document.getElementById("btndelete");


  /**
   * TODO:
   * - Add a function to redirect to the form page
   * - Add a function to fetch data
   * - Add a function to filter data by employee's name
   * - Add a function to display table
   * - Add a function to delete data (bonus)
   */
  try {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    }
    const updateTable = (data) => {
      data.forEach(employee => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.position}</td>
          <button id="btndelete" value=${employee.id}>Delete</button>
        `;
        tableData.appendChild(tr);
      });
    }
    
    const data = await fetchData();
    updateTable(data);

    // Tangkap event saat user input di searchbar
    searchBar.addEventListener("keyup", (e) => {
      const input = e.target.value;
      const searchData = data.filter(item => item.name.includes(input));
      tableData.innerHTML = '';
      updateTable(searchData);
    });

    // Tangkap event click Button #delete
    tableData.addEventListener("click", async (e) => {
      e.preventDefault();
      if(e.target.id === "btndelete") {
        try {
          const id = e.target.value;
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
          });
          const data = await response.json();
          alert(`Data ${data.name} berhasil dihapus`);
        } catch (error) {
          console.log(error.message);
          alert(error.message);
        }
      }
    })

  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
})();
