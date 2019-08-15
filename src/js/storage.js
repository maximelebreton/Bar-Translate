const storage = {
  states: {
    alreadyNotified: "alreadyNotified",
    hide: "hide",
    snapshot: {}
  },

  setSnapshot: () => {
    storage.local.getAll().then(data => {
      console.info(data), "local storage";
      storage.snapshot = { ...storage.snapshot, ...data };
    });

    storage.sync.getAll().then(data => {
      console.info(data, "sync storage");
      storage.snapshot = { ...storage.snapshot, ...data };
      console.log(storage.snapshot);
    });
  },

  getStoragePreferences: array => {
    return new Promise(function(resolve, reject) {
      chrome.storage.sync.get(array, function(result) {
        console.info(result);
        resolve(result);
      });
    });
  },

  getBarTranslateAlwaysHideTip: () => {
    return new Promise(function(resolve, reject) {
      chrome.storage.local.get("barTranslateAlwaysHideTip", function(result) {
        resolve(result.barTranslateAlwaysHideTip);
      });
    });
  },

  local: {
    get(key) {
      return new Promise(function(resolve, reject) {
        chrome.storage.local.get(key, function(result) {
          resolve(result);
        });
      });
    },

    getAll() {
      return storage.local.get();
    },

    getValue(key) {
      return new Promise(function(resolve, reject) {
        chrome.storage.local.get(key, function(result) {
          resolve(result[key]);
        });
      });
    },

    set(key, value) {
      return new Promise(function(resolve, reject) {
        chrome.storage.local.set({ [key]: value }, function() {
          console.info(key + " is set to " + value);
          resolve();
        });
      });
    }
  },

  sync: {
    get(key) {
      return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(key, function(result) {
          resolve(result);
        });
      });
    },

    getAll() {
      return storage.sync.get();
    },

    getValue(key) {
      return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(key, function(result) {
          resolve(result[key]);
        });
      });
    },

    set(key, value) {
      return new Promise(function(resolve, reject) {
        chrome.storage.sync.set({ [key]: value }, function() {
          console.info(key + " is set to " + value);
          resolve();
        });
      });
    }
  }
};

export default storage;
