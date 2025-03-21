    const mongoose = require("mongoose");
    const bcrypt = require("bcryptjs");

    const UserSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        pic: {
        type: String,
        required: true,
        default:
            "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zNF9mdWxsX2JvZHlfM2RfYXZhdGFyXzNkX3JlbmRlcl9vZl9hX2J1c2luZXNzbV82OGUzZDg5NS0yMGI0LTQ0ODMtYjY2OS0yMWI0ODRlZTZiYzNfMS5wbmc.png",
        },
    },
    { timestamps: true }
    );

    UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // ✅
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
    });

    UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    };
    const USER = mongoose.model("User", UserSchema);
    module.exports = USER;
