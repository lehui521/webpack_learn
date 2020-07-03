const path = require("path")
function WatcherPlugin(options) {
    this.options = options || {}
}

WatcherPlugin.prototype.apply = function (compiler) {
    compiler.hooks.afterCompile.tapAsync("WatcherPlugin", (compilation, cb) => {
        let filename = path.resolve(__dirname,"src/index.html")
        // console.log(compilation.fileDependencies)
        cb();
    })
    compiler.hooks.watchRun.tapAsync("WatcherPlugin", (compiler, cb) => {
        // console.log('我可是时刻监听着的 🚀🚀🚀')
        // let mtimes = compiler.watchFileSystem.watcher.mtimes;
        // let mtimesKeys = Object.keys(mtimes);
        // if (mtimesKeys.length > 0) {
        //     console.log(`本次一共改动了${mtimesKeys.length}个文件,目录为:`)
        //     console.log(mtimesKeys)
        //     console.log('------------分割线-------------')
        // }
        const fileWatchers = compiler.watchFileSystem.watcher.fileWatchers;
        // console.log(fileWatchers)
        let paths = fileWatchers.map(watcher => watcher.path).filter(path => !/(node_modules)/.test(path))

        if (paths.length > 0) {
            console.log(`本次一共改动了${paths.length}个文件,目录为:`)
            console.log(paths)
            console.log('------------分割线-------------')
        }
        cb()
    })
    compiler.hooks.watchClose.tap('WatcherPlugin', () => {
        console.log('本次监听停止了哟～👋👋👋')
    })
}
module.exports = WatcherPlugin