const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');
const formidable = require('formidable');

const pool = mysql.createPool({
	host:'localhost',   
	user:'root',		
	password:'123456',	
	database:'news',	
	port:3306			
})

router.post('/img',function(req,res){
    pool.getConnection(function(err,connection){
        if(err) throw err;
    
    var form = new formidable.IncomingForm();
    //上传文件的位置
    form.uploadDir = 'public';
    form.parse(req,function(err,fields,files){
        if(err) throw err;
        console.log(files)
        for(var i in files){
            var file = files[i];
            var newName = (new Date()).getTime();

            switch(file.type){
                case 'image/jpeg':
                    newName = newName + '.jpg';
                    break;
                case 'image/png':
                    newName = newName + '.png';
                    break;
                case 'image/gif':
                    newName = newName + '.gif';
                    break;
            }
            var newPath = 'public/' + newName;
            fs.renameSync(file.path,newPath);
            console.log(newPath)
            connection.query(`INSERT INTO tuo (img) VALUES ('${newName}')`,function(err,rows){
                if(err) throw err;
                connection.query(`SELECT * FROM tuo`,function(err,rows){
                    if(err) throw err;
                    res.send(rows)
                    connection.release();
                })
            })
        }
    })
})})

router.post('/images',function(req,res){
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`SELECT * FROM tuo`,function(err,rows){
                    if(err) throw err;
                    res.send(rows)
                    connection.release();
                })


        })
})
// router.use('/check',function(req,res){
//     pool.getConnection(function(err,connection){
//         if(err) throw err;
//         connection.query(`SELECT * FROM user WHERE id = ${req.body.id}`,function(err,rows){
//             if(err) throw err;
//             res.send(rows);
//             connection.release();
//         })
//     })
// })

router.post('/delete',function(req,res){
    console.log(req.body.id)
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`DELETE FROM tuo WHERE id = ${req.body.id} `,function(err,rows){
            if(err) throw err;
            res.send(rows);
            connection.release();
        })
    })
})
router.post('/modify',function(req,res){
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`UPDATE tuo SET img='${req.body.src}'' WHERE id = ${req.body.id}`,function(err,rows){
            if(err) throw err;
            res.send(rows);
            connection.release();
        })
    })
})

router.post('/img_il',function(req,res){
    pool.getConnection(function(err,connection){
        if(err) throw err;
    
    var form = new formidable.IncomingForm();
    //上传文件的位置
    form.uploadDir = 'public';
    form.parse(req,function(err,fields,files){
        if(err) throw err;
        console.log(files)
        for(var i in files){
            var file = files[i];
            var newName = (new Date()).getTime();

            switch(file.type){
                case 'image/jpeg':
                    newName = newName + '.jpg';
                    break;
                case 'image/png':
                    newName = newName + '.png';
                    break;
                case 'image/gif':
                    newName = newName + '.gif';
                    break;
            }
            var newPath = 'public/' + newName;
            fs.renameSync(file.path,newPath);
            console.log(newPath)
            connection.query(`INSERT INTO tuo (img) VALUES ('${newName}')`,function(err,rows){
                if(err) throw err;
                connection.query(`SELECT * FROM tuo`,function(err,rows){
                    if(err) throw err;
                    res.send(rows)
                    
                    connection.release();
                })
            })
        }
    })
})})









module.exports = router;