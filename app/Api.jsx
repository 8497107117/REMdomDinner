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

function addStore(data, token) {
    return $.ajax({
        url: `${HOST}/stores/add/`,
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

function deleteStore(id, token) {
    return $.ajax({
        url: `${HOST}/stores/${id}/delete/`,
        method: 'DELETE',
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

function getAreaType() {
    return $.ajax({
        url: `${HOST}/area/`,
        method: 'GET'
    })
        .done((data) => {
            return data;
        });
}

function getStoresData() {
    return $.ajax({
        url: `${HOST}/stores/list/`,
        method: 'GET'
    })
        .done((data) => {
            return data;
        });
}

function getStoresType() {
    return $.ajax({
        url: `${HOST}/storetype/`,
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

function updateStore(data, id, token) {
    return $.ajax({
        url: `${HOST}/stores/${id}/update/`,
        method: 'PATCH',
        data,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
    })
        .done((data) => {
            return data;
        });
}

export default {
    addStore,
    deleteStore,
    getAreaType,
    getFavoriteLists,
    getStoresData,
    getStoresType,
    login,
    refreshToken,
    register,
    updateStore
};
