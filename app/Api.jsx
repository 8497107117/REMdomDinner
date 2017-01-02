const HOST = 'http://140.113.27.54:8001';

function getStoreData() {
    return $.ajax({
        url: `${HOST}/stores/`,
        method: 'GET'
    })
        .done((data) => {
            return data;
        });
}

function login(data) {
    return $.ajax({
        url: `${HOST}/api-token-auth/`,
        method: 'POST',
        data
    })
        .done((data) => {
            return data.token;
        });
}

export default { getStoreData, login };