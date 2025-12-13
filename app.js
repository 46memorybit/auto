document.addEventListener('DOMContentLoaded', async () => {
  const memoEl = document.getElementById('memo');
  const baseUrlEl = document.getElementById('baseUrl');
  const autoRedirectEl = document.getElementById('autoRedirect');
  const randomBtn = document.getElementById('randomBtn');

  // データ読み込み
  const data = await db.getAll();
  if (data.memo !== undefined) memoEl.value = data.memo || '';
  if (data.baseUrl !== undefined) baseUrlEl.value = data.baseUrl || '';
  if (data.autoRedirect !== undefined) autoRedirectEl.checked = data.autoRedirect;

  // 入力変更時に保存
  memoEl.addEventListener('input', () => db.set('memo', memoEl.value));
  baseUrlEl.addEventListener('input', () => db.set('baseUrl', baseUrlEl.value));
  autoRedirectEl.addEventListener('change', () => db.set('autoRedirect', autoRedirectEl.checked));

  // ランダム文字列生成（英数字8桁）
  function generateRandomQuery() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  randomBtn.addEventListener('click', async () => {
    const baseUrl = baseUrlEl.value.trim();
    if (!baseUrl) {
      alert('ベースURLを入力してください');
      return;
    }

    const query = generateRandomQuery();
    const fullUrl = baseUrl + query;

    // 新しいタブで開く（自動遷移が有効なら現在のタブ）
    if (autoRedirectEl.checked) {
      location.href = fullUrl;
    } else {
      window.open(fullUrl, '_blank');
    }
  });
});
