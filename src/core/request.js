export default obj => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(obj.method || 'GET', obj.url);
    xhr.responseType = obj.responseType || '';

    xhr.onprogress = (e) => {
      obj.onProgress(e);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => {
      reject(xhr.statusText);
    };

    xhr.send(obj.body);
  });
};
