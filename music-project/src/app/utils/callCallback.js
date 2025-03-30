export default function callCallback(promise, callback) {
    if (callback) {
        promise
            .then((result) => {
                callback(undefined, result);
                return result;
            })
            .catch((error) => {
                callback(error);
                return error;
            });
    }

    return promise;
}