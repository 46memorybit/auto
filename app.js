const memoEl = document.getElementById('memo');
const urlEl  = document.getElementById('url');
const autoEl = document.getElementById('auto');
const openBtn = document.getElementById('openBtn');
const randomBtn = document.getElementById('randomBtn');

// 保存データ取得
const state = loadData();

// URLクエリ取得
const params = new URLSearchParams(window.location.search);
const queryUrl = params.get('url');

// ===== 初期化 =====
if (!state.initialized) {
  memoEl.value = '';
  urlEl.value = queryUrl || '';
  autoEl.checked = false;

  saveData({
    memo: memoEl.value,
    url: urlEl.value,
    auto: autoEl.checked,
    initialized: true
  });
} else {
  memoEl.value = state.memo || '';
  urlEl.value = state.url || '';
  autoEl.checked = !!state.auto;
}

// ===== 保存 =====
function persist() {
  saveData({
    memo: memoEl.value,
    url: urlEl.value,
    auto: autoEl.checked,
    initialized: true
  });
}

memoEl.addEventListener('input', persist);
urlEl.addEventListener('input', persist);
autoEl.addEventListener('change', persist);

// ===== URLを開く =====
openBtn.addEventListener('click', () => {
  if (!urlEl.value) return;
  window.location.href = urlEl.value;
});

// ===== 自動遷移 =====
window.addEventListener('load', () => {
  if (autoEl.checked && urlEl.value) {
    setTimeout(() => {
      window.location.href = urlEl.value;
    }, 300);
  }
});

// ===== ランダムクエリ生成（英数字8桁） =====
function generateRandomQuery() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// Android用：ランダムクエリで再読み込み
randomBtn.addEventListener('click', () => {
  const r = generateRandomQuery();
  const base = location.origin + location.pathname;
  location.href = `${base}?r=${r}`;
});

// ===== Service Worker =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
