// ================= IMPORT TOOLS ================= //

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

const createTools = (uploadImageByFile: (file: File) => Promise<string>) => {
  const uploadImageByUrl = async (e: any) => {
    let link = new Promise((resolve, reject) => {
      try {
        resolve(e);
      } catch (error) {
          reject(error);
      }
    });

    return link.then(url => {
      return {
        success: 1,
        file: { url }
      }
    });
  }

  const uploadNewsImageByFile = (e: any) => {
    return uploadImageByFile(e).then(url => {
      return {
        success: 1,
        file: { url }
      }
    });
  }

  return {
    embed: Embed,
    list: {
      class: List,
      inlineToolbar: true,
    },
    image: {
      class: Image,
      inlineToolbar: true,
      config: {
        uploader: {
          uploadByUrl: uploadImageByUrl,
          uploadByFile: uploadNewsImageByFile,
        }
      }
    },
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Enter a header",
        levels: [2, 3, 4],
        defaultLevel: 2,
      },
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    marker: Marker,
    inlineCode: InlineCode,
  }
}

export default createTools;