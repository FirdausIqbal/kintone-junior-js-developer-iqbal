(async() => {
  /**
   * TODO:
   * - Add a function to generate random string (10 digits alphanumeric) for id
   * - Add a function to add new data (submit)
   * - Add a function to redirect to the index page
   */
  const API_URL = 'http://localhost:3000/employees';
  const form = document.getElementById('data-form');
  const name = document.getElementById('name');
  const position = document.getElementById('position');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
      id: Math.random().toString(36).substr(2, 10),
      name: name.value,
      position: position.value
    };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      window.location.href = 'index.html';
    } else {
      console.error('Failed to add data');
      alert('Failed to add data');
    }
  });
})();
