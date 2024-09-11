interface blogCardProps {
  authorName: String;
  title: String;
  content: String;
  date: String;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  date,
}: blogCardProps) => {
  return (
    <div className="flex justify-center p-2">
      <div className="w-1/2 border-black border-2">
        <div className="flex p-2">
          <div className="flex justify-centre flex-col px-2">
            <Avatar name={authorName} />
          </div>
          <div className="px-2">{authorName} </div>
          {date}
        </div>
        <div className="text-3xl font-serif font-semibold ">{title}</div>
        <div>{content.length > 100 ? content.slice(0, 200) : content}...</div>
        <div>{`Reading time : ${Math.ceil(content.length / 200)} minutes`}</div>
        <div className="bg-slate-400 h-1 w-full"></div>
      </div>
    </div>
  );
};

const Avatar = ({ name }: { name: String }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-300 rounded-full">
      <span className="font-extralight text-gray-600">{name[0]}</span>
    </div>
  );
};
