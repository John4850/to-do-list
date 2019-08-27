
const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getList() {  
    const url = `${URL}/list`;
    return fetchWithError(url);
}

export function getTasks(id) {  
    const url = `${URL}/list/${id}`;
    return fetchWithError(url);
}

// export function addTask(task) {
//     const url = `${URL}/task`;
//     return fetchWithError(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(task)
//     });
// }

// export function removeTask(id) {
//     const url = `${URL}/list/${id}`;
//     return fetchWithError(url, {
//         method: 'DELETE'
//     });
// }

