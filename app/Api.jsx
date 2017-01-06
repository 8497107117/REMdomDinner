const HOST = 'https://remdomdinner.nctu.me';

function getStoreData() {
    return $.ajax({
        url: `${HOST}/stores/list`,
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

export default { getStoreData, login, register };
