const DB_KEY = 'auto_link_pwa';

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || {};
  } catch {
    return {};
  }
}

function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}
