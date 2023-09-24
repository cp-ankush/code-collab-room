import React from "react";
import Image from "next/image";

export default function EditorLoader() {
  return (
    <div className="bg-black w-full h-full flex justify-center items-center overflow-auto ">
      <div className={`rotate-container`}>
        <Image
          className="rotating-image"
          src="/logo-white.png"
          alt="Code Collab Room Logo"
          width={300}
          height={100}
          priority
        />
      </div>
    </div>
  );
}
