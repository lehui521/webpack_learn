function FileListPlugin(options){
    this.options = options
    this.filename = options.filename?options.filename:"fileList.md"
}

FileListPlugin.prototype.apply=function(compiler){
    compiler.hooks.emit.tapPromise("FileListPlugin", async (compilation)=>{
        await new Promise(reslove=>{
            setTimeout(()=>{
                reslove()
            },1000)
        })
        const fileListName = this.filename
        let len = Object.keys(compilation.assets).length
        let content = `# 一共有${len}个文件\n\n`;
        
        for(let filename in compilation.assets){
            content += `- ${filename}\n`
        }
        compilation.assets[fileListName]={
            source:function(){
                return content
            },
            size:function(){
                return content.length
            }
        }
    })
}
module.exports = FileListPlugin