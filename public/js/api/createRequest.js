/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let errorCritical;
    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    if (options.data === undefined) {
        options.data = {};
    }

    if (options.method === 'GET') {
        
        if (options.data.email && options.data.password) {
            options.url += `?mail=${options.data.email}&password=${options.data.password}`;
        } else if (options.data.id && options.data.name && options.data.email) {
            options.url += `?id=${options.data.id}&name=${options.data.name}&mail=${options.data.email}`;
        } else if (options.data.id && options.data.name) {
            options.url += `?id=${options.data.id}&name=${options.data.name}`;
        } else if (options.data.id) {
            options.url += `?id=${options.data.id}`;
        }

    } else {
        
        for (let option in options.data) {
            formData.append(`${option}`, options.data[option]);
        }
    }

    try {
        xhr.open(options.method, options.url);
        xhr.withCredentials = true;
        xhr.responseType = options.responseType; 
        errorCritical = null;
    } catch (e) {
        errorCritical = e;
        options.callback(erorrCritical, xhr.response);
    }

    xhr.send(formData);
    
    xhr.onloadend = function() {
        if (xhr.status === 200 && xhr.response.success == true) {
            options.callback(errorCritical, xhr.response);
            return true;
        } else {
            options.callback(errorCritical, xhr.response);
            return false;
        }
    }
    
};