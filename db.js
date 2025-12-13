function saveData() {
localStorage.setItem('memo', memo.value);
localStorage.setItem('url', url.value);
localStorage.setItem('auto', auto.checked);
}


function loadData() {
memo.value = localStorage.getItem('memo') || '';
url.value = localStorage.getItem('url') || '';
auto.checked = localStorage.getItem('auto') === 'true';
}
