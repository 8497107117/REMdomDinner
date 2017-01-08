const HOST = 'https://remdomdinner.nctu.me';

function addFavoriteList(listname, token) {
    let data = { listname };
    return $.ajax({
        url: `${HOST}/favlistname/add/`,
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

function addStoreToFavoriteList(listname_id, sid, token) {
    let data = { listname_id, sid };
    return $.ajax({
        url: `${HOST}/favlist/add/`,
        method: 'POST',
        data: JSON.stringify(data),
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
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

function deleteFavoriteList(listnameId, token) {
    return $.ajax({
        url: `${HOST}/favlistname/${listnameId}/delete/`,
        method: 'DELETE',
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

function deleteStoreFromFavoriteList(favlistId, token) {
    return $.ajax({
        url: `${HOST}/favlist/${favlistId}/delete/`,
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

function getStoresData(keyword) {
    let config = {
        url: `${HOST}/stores/list/`,
        method: 'GET'
    };
    if (keyword) {
        config.data = { keyword };
    }
    return $.ajax(config)
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
    addFavoriteList,
    addStore,
    addStoreToFavoriteList,
    deleteFavoriteList,
    deleteStore,
    deleteStoreFromFavoriteList,
    getAreaType,
    getFavoriteLists,
    getStoresData,
    getStoresType,
    login,
    refreshToken,
    register,
    updateStore
};
