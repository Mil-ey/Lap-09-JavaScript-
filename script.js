// Part 2 //
const output= document.getElementById('output');
const fetchButton = document.getElementById('fetchButton');
const xhrButton = document.getElementById('xhrButton');
const postForm = document.getElementById('PostForm');
const putForm = document.getElementById('PutForm');
const deleteForm = document.getElementById('DeleteForm');

function displayMessage(message, isError = false, type = '') {
    let color = isError ? 'red' : 'black';
    if (isError && type === 'network') color = 'orange';
    if (isError && type === 'invalid') color = 'blue';
    output.innerHTML += `<p style="color: ${color};">${message}</p>`;
}


fetchButton.addEventListener('click', () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayMessage(`Title: ${data.title}`);
            displayMessage(`Body: ${data.body}`);
        })
        .catch(error => {
            displayMessage(`Fetch error: ${error.message}`, true);
        });
}

);
xhrButton.addEventListener('click', () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/2';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            displayMessage(`Title: ${data.title}`);
            displayMessage(`Body: ${data.body}`);
        } else {
            displayMessage(`XHR error: ${xhr.statusText}`, true);
        }
    };
    xhr.onerror = function () {
        displayMessage('Network error', true , 'network');
    };
    xhr.send();
});



postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = {
        title: postForm.elements['post-title'].value,
        body: postForm.elements['post-body'].value,
        userId: 1
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayMessage(`Post created with ID: ${data.id}`);
        })
        .catch(error => {
            displayMessage(`POST error: ${error.message}`, true, 'invalid');
        });
}
);

putForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = putForm.elements['put-id'].value;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const data = {
        title: putForm.elements['put-title'].value,
        body: putForm.elements['put-body'].value,
        userId: 1
    };
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            displayMessage(`Post with ID ${id} updated`);
        } else {
            displayMessage(`PUT error: ${xhr.statusText}`, true, 'invalid');
        }
    };
    xhr.onerror = function () {
        displayMessage('Network error', true, 'network');
    };
    xhr.send(JSON.stringify(data));
}
);

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = deleteForm.elements['delete-id'].value;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            displayMessage(`Post with ID ${id} deleted`);
        } else {
            displayMessage(`DELETE error: ${xhr.statusText}`, true, 'invalid');
        }
    };
    xhr.onerror = function () {
        displayMessage('Network error', true, 'network');
    };
    xhr.send();
}
);
  