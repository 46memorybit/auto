const DB = {
key: 'auto-link-data',


async get() {
return JSON.parse(localStorage.getItem(this.key));
},


async set(data) {
localStorage.setItem(this.key, JSON.stringify(data));
}
};
