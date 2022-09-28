const Voucher = require("./model");
const Nominal = require("../nominal/model");
const Category = require("../category/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/view_voucher.ejs", {
        voucher,
        alert,
        name: req.session.user.name,
        title: "Voucher Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  viewCreate: async (req, res) => {
    try {
      console.log(config.rootPath);
      console.log(path.resolve(__dirname, "../.."));
      const nominal = await Nominal.find();
      const category = await Category.find();
      res.render("admin/voucher/create.ejs", {
        nominal,
        category,
        name: req.session.user.name,
        title: "Create Voucher Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
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
            const voucher = await Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });
            await voucher.save();
            req.flash("alertMessage", "Create Voucher Success");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", error.message);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = await Voucher({
          name,
          category,
          nominals,
        });
        await voucher.save();
        req.flash("alertMessage", "Create Voucher Success");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.find();
      const category = await Category.find();
      const voucher = await Voucher.findById(id)
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/edit.ejs", {
        voucher,
        nominal,
        category,
        name: req.session.user.name,
        title: "Edit Voucher Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;
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
            const voucher = await Voucher.findById(id);
            console.log(voucher);
            const currentImage = `${config.rootPath}/public/images/${voucher.thumbnail}`;
            console.log(currentImage);
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Voucher.findByIdAndUpdate(id, {
              name,
              category,
              nominals,
              thumbnail: filename,
            });
            req.flash("alertMessage", "Create Voucher Success");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", error.message);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        await Voucher.findByIdAndUpdate(id, {
          name,
          category,
          nominals,
        });
        req.flash("alertMessage", "Create Voucher Success");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id);
      const currentImage = `${config.rootPath}/public/images/${voucher.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      await Voucher.findByIdAndDelete(id);
      req.flash("alertMessage", "Delete Voucher Success");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id);
      let status = voucher.status === "Y" ? "N" : "Y";
      await Voucher.findByIdAndUpdate(id, {
        status,
      });
      req.flash("alertMessage", "Update Status Voucher Success");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
};
