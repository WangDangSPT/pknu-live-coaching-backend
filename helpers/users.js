const {spawn,exec} = require('child_process')

//spawn child process to read directory
const lsdir = (path)=>{
    return new Promise((resolve,reject)=>{
        exec(`${path}`,(err,stdout,stderr)=>{
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
        const arg = `cd /userdata/${userid} && gcc -o output.out source.c && output.out`
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
module.exports = {
    compilecode,
    lsdir
}