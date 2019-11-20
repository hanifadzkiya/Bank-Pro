export function PostWithSOAP(baseURL, type, userData){
    //Create body from username and password
    var formBody = [];
    for (var property in userData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(userData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //Fetch API
    return new Promise((resolve, reject) =>{
        fetch(baseURL+type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            });
    });
}