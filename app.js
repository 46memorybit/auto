importScripts?.();


const memoEl = document.getElementById('memo');
const urlEl = document.getElementById('url');
const autoEl = document.getElementById('auto');


const openBtn = document.getElementById('open');
const randomBtn = document.getElementById('random');


// 初期ロード
memoEl.value = DB.get('memo', '');
urlEl.value = DB.get('url', '');
autoEl.checked = DB.get('auto', false);


// 保存
[memoEl, urlEl, autoEl].forEach(el => {
el.addEventListener('input', save);
el.addEventListener('change', save);
});


function save() {
DB.set('memo', memoEl.value);
DB.set('url', urlEl.value);
DB.set('auto', autoEl.checked);
}


// 開く
openBtn.onclick = () => {
if (!urlEl.value) return;
location.href = urlEl.value;
};


// ランダムクエリ
randomBtn.onclick = () => {
if (!urlEl.value) return;
const q = Math.random().toString(36).slice(2, 10);
}
