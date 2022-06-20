import aws from "aws-sdk";
import bytes from "bytes";

export default async function uploadUrl(req, res) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.query.file,
      "Content-Type": req.query.fileType,
    },
    Expires: 5 * 60,
    Conditions: [["content-length-range", 0, bytes("2MB", null)]],
  });

  res.status(200).json(post);
}
