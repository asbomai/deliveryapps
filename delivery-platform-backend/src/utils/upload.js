const cloudinary = require('./cloudinary');

module.exports = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    folder: 'items',
    resource_type: 'image'
  });
  return res.secure_url;
};
