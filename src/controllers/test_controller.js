// const Test = require("../models/test_model");

// const uploadImage = async (req, res) => {
//   try {
//     const { filename, path, mimetype } = req.file;
//     const image = await Test.create({
//       images: [
//         {
//           data: req.file.buffer, // Assuming 'buffer' contains image data
//           contentType: mimetype,
//           filename: filename,
//         },
//       ],
//     });
//     res.status(201).json(image);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
