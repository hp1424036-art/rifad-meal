export const saveStudentData = (data) => {
  try {
    localStorage.setItem('lpu_student', JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save student data', err);
  }
};

export const getStudentData = () => {
  try {
    const data = localStorage.getItem('lpu_student');
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to parse student data', err);
    return null;
  }
};

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LPUTouchDB', 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveVideo = async (blob) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['videos'], 'readwrite');
      const store = transaction.objectStore('videos');
      const request = store.put(blob, 'scanVideo');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to save video', err);
  }
};

export const getVideo = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['videos'], 'readonly');
      const store = transaction.objectStore('videos');
      const request = store.get('scanVideo');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to get video', err);
    return null;
  }
};

export const clearAllData = async () => {
  localStorage.removeItem('lpu_student');
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['videos'], 'readwrite');
      const store = transaction.objectStore('videos');
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to clear video data', err);
  }
};
