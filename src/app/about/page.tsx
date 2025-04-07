"use client";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import Image from "next/image";

export default function About() {


  return (

    <div className="about-container">
      <a href="/"><h1 className="text-2xl font-bold">About For Project</h1></a>
      <hr />
      <div className="about-Detail">
        <p className="mt-4">- ເວັບໄຊ້ນີ້ສ້າງມາເພື່ອ ຄົນທີ່ຢາກເຮັດອາຫານໃຫ້ຄົນທີ່ໂຕເອງຮັກໄດ້ລອງຊິມ</p>
        <p className="mt-4">- ສູດອາຫານທັງຫມົດນຳມາຈາກ Social Media ເຊັ່ນ : "Youtube, TikTok, Facebook, Google....."</p>
        <p className="mt-4">- ມີຫນ້າລ໋ອກອິນເພື່ອເຂົ້າລະບົບ</p>
        <p className="mt-4">- ຫນ້າHome ປະກອບມີ : "ໂລໂກ້, ມີ Search bar ໄວ້ Search ຫາສູດອາຫານທີ່ຕ້ອງການ ມີປຸ່ມລ໋ອກເອົ້າ ເພື່ອອອກຈາກລະບົບ"</p>
        <p className="mt-4">- ສາມາດເພີ່ມສູດອາຫານ ແກ້ໄຂ້ ລົບ ຂໍ້ມູນໄດ້</p>
        <p className="mt-4">- ເຮັດໂດຍກຸ່ມ 2</p>
        <div className="Picture">
          <div>
            <Image className="mt-4" src="/images/pone.jpg" alt="Image" width={200} height={320} />
            <p className="mt-4">Mr: Phoutthasone INSYSIENGMAI</p>
            <p className="mt-4">ຫົວຫນ້າກຸ່ມ</p>
            <p className="mt-4">ຫນ້າທີ່ ຮັບຜິດຊອບທັງຫມົດ</p>
          </div>
          <div>
            <Image className="mt-4" src="/images/care.jpg" alt="Image" width={300} height={300} />
            <p className="mt-4">Mr: Thunwa DALASUK</p>
            <p className="mt-4">ລູກທີມ</p>
            <p className="mt-4">ຫນ້າທີ່ ບໍ່ມີ</p>
          </div>
          <div>
            <Image className="mt-4" src="/images/vee.jpg" alt="Image" width={260} height={300} />
            <p className="mt-4">Mr: Vee VILAPHONE</p>
            <p className="mt-4">ລູກທີມ</p>
            <p className="mt-4">ຫນ້າທີ່ ບໍ່ມີ</p>
          </div>
          <div>
            <Image className="mt-4" src="/images/noungning.jpg" alt="Image" width={220} height={300} />
            <p className="mt-4">Mr: Noungning SOUKSYVILAI</p>
            <p className="mt-4">ລູກທີມ</p>
            <p className="mt-4">ຫນ້າທີ່ ບໍ່ມີ</p>
          </div>
        </div>
        <h2 className="about">Thank you</h2>
      </div>

    </div>
  );
}
