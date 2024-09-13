import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Appbar } from "../components/appbar";
import { Footer } from "../components/footer";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const editor = useRef(null);

  return (
    <div>
      <Appbar />
      <h1 className="flex justify-center font-serif font-bold text-4xl p-5 underline decoration-wavy">
        Start Writing
      </h1>
      <div className="flex justify-center w-full pt-2 h-screen">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-6"
            placeholder="Title"
          />
          {/* <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          /> */}
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-green-500"
          >
            Publish post
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// function TextEditor({
//   onChange,
// }: {
//   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
// }) {
//   return (
//     <div className="mt-2">
//       <div className="w-full mb-4 ">
//         <div className="flex items-center justify-between border">
//           <div className="my-2 bg-white rounded-b-lg w-full">
//             <label className="sr-only">Publish post</label>
//             <textarea
//               onChange={onChange}
//               id="editor"
//               rows={8}
//               className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
//               placeholder="Write an article..."
//               required
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
