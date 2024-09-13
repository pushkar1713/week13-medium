import { Link } from "react-router-dom";

interface blogCardProps {
  authorName: String;
  title: String;
  content: String;
  date: String;
  id: String;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  date,
}: blogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex justify-center p-2">
        <div className="w-1/2 border border-2 max-h-60 overflow-hidden rounded-lg min-h-52">
          <div className="flex p-2">
            <div className="flex justify-centre flex-col pl-2">
              <Avatar name={authorName} />
            </div>
            <div className="px-2 capitalize">{authorName} </div>
            {date}
          </div>
          <div className="text-2xl font-serif font-medium px-4 capitalize ">
            {title}
          </div>
          <div className="px-4 border-b-2 border-black">{`Reading time : ${Math.ceil(
            content.length / 200
          )} minutes`}</div>
          <div className="px-2">
            {content.length > 100 ? (
              <div
                dangerouslySetInnerHTML={{ __html: content.slice(0, 200) }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: String;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-red-500 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-white uppercase`}
      >
        {name[0]}
      </span>
    </div>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
