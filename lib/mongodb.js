import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // ເຊື່ອມຕໍ່ MongoDB ໂດຍໃຊ້ URI ຈາກ environment variable
        console.log("Connect to monngodb"); // ສະແດງຂໍ້ຄວາມ Connect to monngodb ເມື່ອເຊື່ອມຕໍ່ສຳເລັດ
    } catch (error) {
        console.log("Error", error) // ສະແດງຂໍ້ຄວາມ error  ຖ້າເຊື່ອມຕໍ່ບໍ່ສຳເລັດ
    }
}

// ຟັງຊັ່ນສຳຫລັບເຊື່ອມຕໍ່ກັບ MongoDB ໂດຍໃຊ້ Mongoose

// ໃຊ້ process.env.MONGODB_URI ເພື່ອອ່ານ connection string ຈາກ environment variables

// ມີການຈັດການ error ກໍລະນີ້ເຊື່ອມຕໍ່ບໍ່ສຳເລັດ