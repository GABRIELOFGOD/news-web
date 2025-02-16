"use client";

import { useEditorContext } from "@/context/EditorContext";
import { defaultBanner } from "@/utils/constants";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import createTools from "@/data/editorTools";
import { useUploadImage } from "@/hooks/useUploadImage";

const Create = () => {
  const [bannerSrc, setBannerSrc] = useState<string>(defaultBanner);
  const { blog, setBlog, setTextEditor } = useEditorContext();
  const { uploadImageByFile } = useUploadImage();
  const tools = createTools(uploadImageByFile);

  const handleBannerUpload = (e: ChangeEvent<HTMLInputElement>) => {
    let newImg = e.target.files ? e.target.files[0] : null;
    if (newImg) {
      let reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setBannerSrc(e.target.result as string);
          setBlog({ ...blog, banner: e.target.result as string });
        }
      };
      reader.readAsDataURL(newImg);
    }
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  }

  useEffect(() => { 
    let editor = new EditorJS({
      holder: "textEditor",
      data: { blocks: [] },
      tools: tools,
      placeholder: "Write your news here",
    });

    console.log(editor);
  }, [tools]);
  
  return (
    <div className="h-full overflow-y-auto relative">
      <div className="mx-auto max-w-[990px] w-full">
        <div className="relative aspect-video bg-white border-4 border-grey hover:bg-opacity-80">
          <label htmlFor="uploadBanner">
            <Image
              src={bannerSrc}
              alt="banner"
              fill
              style={{ objectFit: "cover" }}
              className="z-20"
            />
            <input
              type="file"
              id="uploadBanner"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleBannerUpload}
            />
          </label>
        </div>

        <textarea
          placeholder="News Title"
          className="font-medium md:text-4xl text-2xl h-20 w-full outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
        ></textarea>

        <hr className="w-full opacity-10 my-5" />

        <div id="textEditor" className="font-gelasio" ></div>
      </div>
      <div className="w-full flex justify-between">
        <p className="text-black font-semibold text-xl"></p>
        <div className="flex gap-5">
          <button className="bg-transparent border border-black text-black px-5 py-2 rounded-full">Save Draft</button>
          <button className="bg-black text-white px-5 py-2 rounded-full">Publish</button>
        </div>
      </div>
    </div>
  )
}
export default Create;