const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;
      console.log(payload);
      if (req.file) {
        let tmp_path = req.file.path;

        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];

        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/images/${filename}`
        );
        const src = fs.createReadStream(tmp_path);
        const dst = fs.createWriteStream(target_path);
        src.pipe(dst);

        src.on("end", async () => {
          try {
            const player = await Player({ ...payload, avatar: filename });
            await player.save();
            delete player._doc.password;

            res.status(201).json({ player });
          } catch (error) {
            if (error && error.name === "ValidationError") {
              console.log(error);
              return res.status(422).json({
                error: 1,
                message: error.mmessage,
                field: error.errors,
              });
            }
            next(error);
          }
        });
      } else {
        let player = await Player(payload);
        await player.save();
        delete player._doc.password;

        res.status(201).json({ player });
      }
    } catch (error) {
      if (error && error.name === "ValidationError") {
        console.log(error);
        return res.status(422).json({
          error: 1,
          message: error.mmessage,
          field: error.errors,
        });
      }
      next(error);
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const playerEmail = await Player.findOne({ email });

      if (playerEmail) {
        const checkPassword = bycrpt.compareSync(
          password,
          playerEmail.password
        );
        if (checkPassword) {
          const token = jwt.sign(
            {
              data: {
                id: playerEmail._id,
                username: playerEmail.username,
                avatar: playerEmail.avatar,
                email: playerEmail.email,
              },
            },
            config.secret
          );
          return res.status(201).json({
            token,
          });
        } else {
          return res.status(400).json({
            message: "password is wrong",
          });
        }
      } else {
        return res.status(400).json({
          message: "email not found",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
