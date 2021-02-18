

function errorMessageForResponseCode(responseCode) {
    let message = "";

    if (responseCode >= 500 && responseCode < 600) {
        message = "Sorry, there is a problem with the service";
    }
    else if (responseCode >= 400 && responseCode < 500) {
        if (responseCode === 401 || responseCode === 403) {
            message = "Sorry, you're not authorised to perform this action";
        } else {
            message = "Sorry, there is a problem with the service";
        }
    }
    return message;
}

module.exports = errorMessageForResponseCode; 
