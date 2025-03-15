"use client";

import Image from "next/image";
import Link from "next/link";

import MainButton from "./MainButton";

function MainHeader() {
  return (
    <header className="flex items-center justify-between py-7">
      <Link href={"/"}>
        <Image src={"/momentum-logo.png"} alt="logo" width={210} height={38} />
      </Link>

      <div className="flex items-center gap-10">
        <MainButton variant="outlined" title="თანამშრომლის შექმნა" onClick={() => {}} />
        <MainButton variant="filled" title="შექმენი ახალი დავალება" iconName="add" onClick={() => {}} />
      </div>
    </header>
  );
}

export default MainHeader;
