
const dotenv = require('dotenv')
const aws = require('aws-sdk')
const {promisify }= require('util')
const crypto = require('crypto')
const randomBytes = promisify(crypto.randomBytes)
dotenv.config()

const region = "eu-west-2"
const bucketName = "prideimages"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

module.exports = {
    generateUploadURL: async(req, res)=>{
        try{
            const rawBytes = await randomBytes(16)
            const imageName= rawBytes.toString('hex')
        
            const params = ({
                Bucket: bucketName,
                Key:imageName,
                Expires:60
            })
            const upLoadURL= await s3.getSignedUrlPromise('putObject', params)
            return upLoadURL
        } catch(err){
            console.log(err);
            res.status(500).json(
                {info:"COULD GET A SECURE URL",
                    message: err.message,
                })
        }
    

        }

}