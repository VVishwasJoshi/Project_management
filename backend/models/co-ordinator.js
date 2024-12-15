const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const {createTokenForUser} = require("../services/authentication")

// for creating token you have to add one more field in schema i.e is ROLE

const coordinatorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    coordinatorId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

coordinatorSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

coordinatorSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("Invalid User");

    const salt = user.salt;
    const hashedPassword = user.password;

    const UserProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== UserProvidedHash)
      throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
  }
);
const Coordinator = model("Coordinator", coordinatorSchema);

module.exports = Coordinator;
