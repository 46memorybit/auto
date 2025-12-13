const DB = {
get(key, def) {
const v = localStorage.getItem(key);
return v === null ? def : JSON.parse(v);
},
set(key, val) {
localStorage.setItem(key, JSON.stringify(val));
}
};
