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

export default { getStoreData };