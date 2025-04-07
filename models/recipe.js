import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true }, // ຊື່ສູດອາຫານ (ຕ້ອງກອກ)
    ingredients: { type: String, required: true }, // ສ່ວນປະສົມ (ຕ້ອງກອກ)
    instructions: { type: String, required: true }, // ວິທີເຮັດ (ຕ້ອງກອກ)
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ID ຜູ້ໃຊ້ທີ່ສ້າງສູດອາຫານ (ອ້າງອີງຫາ models User)
    imageUrl: { type: String, required: true }, // URL ຮູບພາບອາຫານ (ຕ້ອງກອກ)
  },
  { timestamps: true } // ເພີ່ມ createdAt ແລະ updatedAt ອັນຕະໂນມັດ
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema); // ສ້າງໂມເດວ ຫລື ໃຊ້ໂມເດວທີ່ມີຢູ່ແລ້ວ
export default Recipe;

// ຕົວແບບສໍາລັບການເກັບຮັກສາຂໍ້ມູນສູດ

// ມີສາຂາຕ່າງໆທີ່ຕ້ອງການສໍາລັບສູດ.

// timestamps: true ຈະເພີ່ມ createAt ແລະ updatedAt ໂດຍອັດຕະໂນມັດ.