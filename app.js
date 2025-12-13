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


// 起動時自動遷移
if (autoJump.checked && urlInput.value) {
location.href = urlInput.value;
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
});
