const memoEl = document.getElementById('memo');
const urlEl = document.getElementById('url');
const autoEl = document.getElementById('auto');
const openBtn = document.getElementById('openBtn');

const state = loadData();

// 初期復元
memoEl.value = state.memo || '';
urlEl.value = state.url || '';
autoEl.checked = !!state.auto;

// 保存処理
function persist() {
  saveData({
    memo: memoEl.value,
    url: urlEl.value,
    auto: autoEl.checked
  });
}

memoEl.addEventListener('input', persist);
urlEl.addEventListener('input', persist);
autoEl.addEventListener('change', persist);

// URLを開く
openBtn.addEventListener('click', () => {
  if (!urlEl.value) return;
  window.location.href = urlEl.value;
});

// 自動遷移
window.addEventListener('load', () => {
  if (autoEl.checked && urlEl.value) {
    setTimeout(() => {
      window.location.href = urlEl.value;
    }, 300);
  }
});

// Service Worker 登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
