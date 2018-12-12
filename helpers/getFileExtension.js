const getFileExtension = mime => {
    return mime.substring(mime.lastIndexOf("/")+1)
}

module.exports = getFileExtension;
