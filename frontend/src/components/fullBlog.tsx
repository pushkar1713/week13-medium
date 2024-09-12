import { Blogs } from "../hooks/hooks";
import { Avatar } from "./blogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold capitalize underline font-serif">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
              Published on 2nd December 2023
            </div>
            <div
              className="pt-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-xl underline py-2">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name} />
              </div>
              <div>
                <div className="text-xl font-bold capitalize">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className=" pt-1 text-slate-500">
                  Your first blog posts won’t be perfect, but you just have to
                  do it. You have to start somewhere — Shane Barker
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
