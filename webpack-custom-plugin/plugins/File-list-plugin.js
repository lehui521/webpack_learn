
const fs = require("fs")
const path = require("path")

function FileListPlugin(options) {
    this.options = options
    this.filePath = options.filePath
}

function diff(newData, oldData) {
    for (let i in newData) {
        if (!oldData[i]) {
            //判断oldData[i]是否存在,不存在直接赋值
            oldData[i] = newData[i]
        } else {
            //如果oldData[i]存在,判断newData[i]是否为对象
            if (Object.prototype.toString.call(newData[i]) === "[object Object]") {
                diff(newData[i],oldData[i])
            }
        }
    }
}

FileListPlugin.prototype.apply = function (compiler) {
    compiler.hooks.emit.tapPromise("FileListPlugin", async (compilation) => {
        await new Promise(reslove => {
            setTimeout(() => {
                reslove()
            }, 1000)
        })
        let files = fs.readFileSync(path.resolve(__dirname, "./i18n/i18n.json"), 'utf-8')
        const dataJson = JSON.parse(files)

        let i18nArr = fs.readdirSync(path.resolve(__dirname, "./i18n"), 'utf-8')
        i18nArr = i18nArr.filter(item => {
            return item.endsWith(".js")
        })

        const zhData = require(path.resolve(__dirname, "./i18n/" + i18nArr[0]))
        //比较
        diff(dataJson,zhData)
        console.log(this.filePath)


        fs.writeFileSync(path.resolve(__dirname, "./i18n/zh.js"), "module.exports=" + JSON.stringify(zhData,null,4))
        // fs.writeFileSync(path.resolve(__dirname, "./i18n/jp.js"), "module.exports=" + files)

        //写入
        fs.writeFileSync(path.resolve(this.filePath, "zh.js"), "const zh=" + JSON.stringify(zhData,null,4)+"\nexport default zh")
        // const fileListName = this.filename
        // let len = Object.keys(compilation.assets).length
        // content = files
        // // for(let filename in compilation.assets){
        // //     content += `- ${filename}\n`
        // // }
        // compilation.assets[fileListName] = {
        //     source: function () {
        //         return content
        //     },
        //     size: function () {
        //         return content.length
        //     }
        // }
    })
}
module.exports = FileListPlugin