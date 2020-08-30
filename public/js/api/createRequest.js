/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let errorCritical;
    let xhr = new XMLHttpRequest();
    let formData = new FormData();


    function tryRequest() {
        try {
            xhr.open(options.method, options.url);
            xhr.withCredentials = true;
            xhr.responseType = options.responseType; 
            errorCritical = null;
        } catch (e) {
            errorCritical = e;
            options.callback(erorrCritical, xhr.response);
        }
    }


    if (options.method === 'GET') {
        options.url += `?mail=${options.data.mail}&password=${options.data.password}`;
        tryRequest();

    } else {
        
        for (let option in options.data) {
            formData.append(`${option}`, options.data[option]);
        }
        tryRequest();
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
