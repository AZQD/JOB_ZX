
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 设置为false表示不压缩代码
            config.optimization.minimize = false;
        }
    },
};
