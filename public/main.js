const update = document.getElementById('update');
const del = document.getElementById('delete');

update.addEventListener('click', function() {
    //PUT request
    fetch('strains', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'date': '2020-12-25',
            'strain': 'Sour Diesel',
            'thoughts': 'good'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
})

del.addEventListener('click', function() {
    //DELETE request
    fetch('strains', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'thoughts': 'good'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
})