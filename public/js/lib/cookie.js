const cookie = {
    get(key) {
        if (document.cookie) { // 判断有没有cookie数据
            let arr = document.cookie.split('; ');
            for (let i in arr) {
                let item = arr[i].split('='); // 拆分 key value
                if (item[0] === key) return item[1];
            }
            return ''; // 如果遍历结束 都没有返回内容 说明没有该数据 返回空字符串
        }
    },

    set(key, value, day) {
        if (typeof day === 'number') {
            let d = new Date();
            d.setDate(d.getDate() + day);
            document.cookie = `${key}=${value};expires=${d};path=/`;
        } else {
            document.cookie = `${key}=${value};path=/`;
        }
        return this;
    },

    remove(key) {
        this.set(key, '', -1);
    }
}

export default cookie;