"use client";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";

export default function About() {


  return (

    <div className="about-container">
      <a href="/"><h1 className="text-2xl font-bold">About For Project</h1></a>
      <hr />
      <div className="about-Detail">
        <p className="mt-4">- ເວັບໄຊ້ນີ້ສ້າງມາເພື່ອ ຄົນທີ່ຢາກເຮັດອາຫານໃຫ້ຄົນທີ່ໂຕເອງຮັກໄດ້ລອງຊິມ</p>
        <p className="mt-4">- ສູດອາຫານທັງຫມົດນຳມາຈາກ Social Media ເຊັ່ນ : "Youtube, TikTok, Facebook ....."</p>
        <p className="mt-4">- ມີຫນ້າລ໋ອກອິນເພື່ອເຂົ້າລະບົບ</p>
        <p className="mt-4">- ຫນ້າHome ປະກອບມີ : "ໂລໂກ້, ມີ Search bar ໄວ້ Search ຫາສູດອາຫານທີ່ຕ້ອງການ ມີປຸ່ມລ໋ອກເອົ້າ ເພື່ອອອກຈາກລະບົບ"</p>
        <p className="mt-4">- ສາມາດເພີ່ມສູດອາຫານ ແກ້ໄຂ້ ລົບ ຂໍ້ມູນໄດ້</p>
        <p className="mt-4">- ສ້າງໂດຍ Mr: Phoutthasone INSYSIENGMAI</p>
        <p className="mt-4">- <FaWhatsappSquare /> 020 96200780</p>
        <p className="mt-4">- <FaFacebook /> Phoutthsone Insysiengmai</p>
        <p className="text">Thanks you</p>



      </div>

    </div>
  );
}
