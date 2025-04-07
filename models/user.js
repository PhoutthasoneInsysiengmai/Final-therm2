import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, require: true }, // Name (ຕ້ອງກອກ)
        email: { type: String, require: true }, // email (ຕ້ອງກອກ)
        password: { type: String, require: true }, // password (ຕ້ອງກອກ)
        role: { type: String, require: false, default: "user" } // ສິດຂອງຜູ້ໃຊ້ (default ເປັນ "user")
    },
    { timestamps: true } // ເພີ່ມ createdAt ແລະ updatedAt ອັນຕະໂນມັດ
)

const User = mongoose.models.User || mongoose.model("User ", userSchema); // ສ້າງໂມເດວ ຫລື ໃຊ້ໂມເດວທີ່ມີຢູ່ແລ້ວ
export default User;

// ຮູບແບບການເກັບຮັກສາຂໍ້ມູນຜູ້ໃຊ້

// ປະກອບມີຊ່ອງຂໍ້ມູນພື້ນຖານສໍາລັບລະບົບ. ການຢັ້ງຢືນ

// ບົດບາດເລີ່ມຕົ້ນເປັນ "ຜູ້ໃຊ້"