import { Loading } from 'element-ui';

let loadingCount = 0;
let loading;
//传参局部loading  不传参全屏loading
const startLoading = (id) => {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)',
        target: document.querySelector(id)
    });
};

const endLoading = () => {
    loading.close();
};

export const showLoading = (id) => {
    if (loadingCount === 0) {
        startLoading(id);
    }
    loadingCount += 1;
};

export const hideLoading = (id) => {
    if (loadingCount <= 0) {
        return;
    }
    loadingCount -= 1;
    if (loadingCount === 0) {
        endLoading(id);
    }
};
