"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import EditorJS from "@editorjs/editorjs";
import { toast } from "sonner";
import Select, { MultiValue } from "react-select";

import { useEditorContext } from "@/context/EditorContext";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useGetCategory } from "@/hooks/useGetCategory";
import createTools from "@/data/editorTools";
import { defaultBanner } from "@/utils/constants";
import { NewsStatus } from "@/models/newsTypes";
import { Category } from "@/models/categoryTypes";
import { useCreateNews } from "@/hooks/useCreateNews";

const Create = () => {
  const [bannerSrc, setBannerSrc] = useState<string>(defaultBanner);
  const editorRef = useRef<EditorJS | null>(null);
  const { error } = useGetCategory();
  const { uploadImageByFile } = useUploadImage();
  const { blog, setBlog, setTextEditor, categories, editorReady, setEditorReady } = useEditorContext();
  const tools = createTools(uploadImageByFile);

  const { postNews, error: postError, loading: postLoading, message: postMessage, setState } = useCreateNews();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load categories. Please refresh.");
    }
  }, [error]);

  useEffect(() => {
    if (!editorReady && document.getElementById("editorjs")) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: { blocks: blog.content || [] },
        tools: tools,
        placeholder: "Write your news here",
      });

      editorRef.current = editor;
      setTextEditor(editor);
      setEditorReady(true);

      return () => {
        // editor.destroy();
        editorRef.current = null;
        setEditorReady(false);
      };
    }
  }, []);

  const handleBannerUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setBannerSrc(imageUrl);
      setBlog({ ...blog, banner: file });
    };

    reader.readAsDataURL(file);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    setBlog({ ...blog, title: e.target.value, state: NewsStatus.DRAFT });
  };

  const handlePublish = async (draft = false) => {
    if (!blog.banner || blog.banner === null) return toast.error("Please upload a banner.");
    if (!blog.title.trim()) return toast.error("Please enter a title.");
    if (blog.tags.length === 0) return toast.error("Please enter tags.");

    try {
      setState({ error: null, message: null, loading: true });
      const outputData = await editorRef.current?.save().then(async (output) => {
        console.log("Output data:", output);
        return output;
      });
      if (!outputData || outputData.blocks.length === 0) {
        return toast.error("Please enter content.");
      }

      setBlog({
        banner: blog.banner,
        desc: blog.desc,
        tags :blog.tags,
        title: blog.title,
        content: outputData.blocks,
        state: draft ? NewsStatus.DRAFT : NewsStatus.PUBLISHED,
      });

      console.log("Blog data:", blog);
      const response = await postNews(blog);
      console.log("Response:", response);
      toast.success(draft ? "Draft saved!" : "Published successfully!");
    } catch (error) {
      console.error("Saving failed:", error);
      toast.error("Saving failed.");
    }
  };

  const handleTagsChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    setBlog({
      banner: blog.banner,
      content: blog.content,
      title: blog.title,
      desc: blog.desc,
      tags: selectedOptions.map((option) => option.value),
      state: NewsStatus.DRAFT,
    });
  };

  return (
    <div className="h-full overflow-y-auto relative">
      <div className="mx-auto max-w-[990px] w-full">
        {/* Banner Upload */}
        <div className="relative aspect-video bg-white border-4 border-grey hover:bg-opacity-80">
          <label htmlFor="uploadBanner">
            <Image src={bannerSrc} alt="banner" fill style={{ objectFit: "cover" }} className="z-20" />
            <input type="file" id="uploadBanner" accept="image/*" hidden onChange={handleBannerUpload} />
          </label>
        </div>

        {/* Title Input */}
        <textarea
          placeholder="News Title"
          className="font-medium md:text-4xl text-2xl h-20 w-full outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          onChange={handleTitleChange}
        ></textarea>

        {/* Tags Selector */}
        <Select
          isMulti
          name="tags"
          options={(categories ?? []).map((category: Category) => ({
            value: category.name,
            label: category.name,
          }))}
          className="basic-multi-select"
          classNamePrefix="Select Categories"
          onChange={handleTagsChange}
        />

        <hr className="w-full opacity-10 my-5" />

        {/* EditorJS Container */}
        <div id="editorjs" className="font-gelasio h-[500px] overflow-y-auto"></div>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-between">
        <div className="flex gap-5 px-5">
          <button className="bg-transparent border border-black text-black px-5 py-2 rounded-full" onClick={() => handlePublish(true)}>
            Save Draft
          </button>
          <button className="bg-black text-white px-5 py-2 rounded-full" onClick={() => handlePublish(false)}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
