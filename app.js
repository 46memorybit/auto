window.addEventListener('load', async () => {
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}


const memo = document.getElementById('memo');
const urlInput = document.getElementById('url');
const autoJump = document.getElementById('autoJump');
const randomBtn = document.getElementById('randomBtn');


// 保存データの復元
const saved = await DB.get();
if (saved) {
memo.value = saved.memo || '';
urlInput.value = saved.url || '';
autoJump.checked = saved.autoJump || false;
}


const save = () => {
DB.set({
memo: memo.value,
url: urlInput.value,
autoJump: autoJump.checked
});
};


memo.addEventListener('input', save);
urlInput.addEventListener('input', () => {
save();
if (autoJump.checked && urlInput.value) {
location.href = urlInput.value;
}
});
autoJump.addEventListener('change', save);


randomBtn.addEventListener('click', () => {
if (!urlInput.value) return;
const q = Math.random().toString(36).substring(2, 10);
const sep = urlInput.value.includes('?') ? '&' : '?';
location.href = urlInput.value + sep + q;
});
});
