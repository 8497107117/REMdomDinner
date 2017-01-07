const HOST = 'https://remdomdinner.nctu.me';

function addFavoriteList(data, token) {
    return $.ajax({
        url: `${HOST}/favlist/add/`,
        method: 'POST',
        data,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
    })
        .done((data) => {
            return data;
        });
}

function getFavoriteLists(token) {
    return $.ajax({
        url: `${HOST}/favlist/get/`,
        method: 'GET',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
    })
        .done((data) => {
            return data;
        });
}

function getStoreData() {
    return $.ajax({
        url: `${HOST}/stores/list/`,
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

function refreshToken(token) {
    return $.ajax({
        url: `${HOST}/api-token-refresh/`,
        method: 'POST',
        data: { token }
    })
        .done((data) => {
            return data;
        });
}

function register(data) {
    return $.ajax({
        url: `${HOST}/users/create-account/`,
        method: 'POST',
        data
    })
        .done((data) => {
            return data;
        });
}

export default { getFavoriteLists, getStoreData, login, refreshToken, register };
