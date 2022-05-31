const {spawn,exec} = require('child_process')
const {readFile} = require('fs')

//spawn child process to read directory
const lsdir = (path)=>{
    return new Promise((resolve,reject)=>{
        exec(`ls ${path}`,(err,stdout,stderr)=>{
            if(err){
                reject(err)
            }
            if(stderr){
                reject(stderr)
            }
            else resolve(stdout)
        })
    })
}
//spawn child process to exec code
function compilecode(path){
    return new Promise((resolve,reject)=>{
        const arg = `cd ${path} && gcc -o output.out source.c && ./output.out`
        let child = spawn(`${arg}`,{
            shell:true
        })
        child.stderr.on('data',data=>{
            reject(data.toString())
        })
        child.stdout.on('data',data=>{
            resolve(data.toString())
        })
    })
}
//reads source.c file 
function readsrc(path){
    return new Promise((resolve,reject)=>{
        readFile(`${path}/source.c`,'utf-8',(err,data)=>{
            if(err){
                reject(err)
                throw err
            }
            resolve(data)
        })       
    })
}
module.exports = {
    compilecode,
    lsdir,
    readsrc
}