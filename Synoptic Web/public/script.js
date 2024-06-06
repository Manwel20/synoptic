function submitForm() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, number }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('myForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
