if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('./service-worker.js');
}


const memo = document.getElementById('memo');
const url = document.getElementById('url');
const auto = document.getElementById('auto');
const openBtn = document.getElementById('open');


loadData();


memo.addEventListener('input', saveData);
url.addEventListener('input', saveData);
auto.addEventListener('change', saveData);


openBtn.addEventListener('click', () => {
if (url.value) location.href = url.value;
});


if (auto.checked && url.value) {
setTimeout(() => {
location.href = url.value;
}, 300);
}
