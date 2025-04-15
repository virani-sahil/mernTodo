import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            unique: true
        }
    }
)

export default new model("Users", UserSchema)