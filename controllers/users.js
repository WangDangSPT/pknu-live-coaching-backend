const {compilecode,lsdir} = require('../helpers/users')

const getdir = async (req,res)=>{
    try{
    const id = req.query.id
    //user data path in linux server
    const path = `/userdata/${id}`
    let output = await lsdir(path)
    res.status(200).json({id: id, data: output})
    }catch(error){
        console.error(error)
        res.status(404).send(error)
    }
}

const compile = async (req,res)=>{
    try{
        const id = req.query.id
        const path = `/userdata/${id}/source.c`
        let output = await compilecode(path)
        res.status(200).json({id: id,lang: 'c',stdout:output})
    }catch(error){
        console.error(error)
        res.status(404).send(error)

    }

}

module.exports = {
    getdir,
    compile
}
