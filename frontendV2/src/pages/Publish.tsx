import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface PublishProps {
  onPublish: (title: string, content: string) => void;
  isLoggedIn: boolean;
}

const Publish = ({ onPublish, isLoggedIn }: PublishProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const config = {
    readonly: false,
    placeholder: "Start writing your story...",
    height: 500,
    toolbarButtonSize: "large" as const,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "link",
      "image",
      "|",
      "align",
      "|",
      "undo",
      "redo",
    ],
    style: {
      font: "18px system-ui, sans-serif",
      fontWeight: "300",
    },
  };

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await api.createBlog({
        title: title.trim(),
        content: content.trim(),
      });

      onPublish(title, content);
      toast({
        title: "Blog published!",
        description: "Your blog post has been published successfully.",
      });

      // Navigate to the specific blog post using the returned ID
      navigate(`/blog/${response.id}`);
    } catch (error: any) {
      console.error("Publish error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to publish blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neo-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-neo-cream border-8 border-neo-charcoal p-16">
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl text-neo-charcoal tracking-tighter font-black mb-4">
              PUBLISH
            </h1>
            <div className="w-32 h-2 bg-neo-charcoal"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <Label
                htmlFor="title"
                className="text-3xl text-neo-charcoal tracking-tight font-black block mb-4"
              >
                TITLE
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="YOUR STORY TITLE"
                className="border-4 border-neo-charcoal text-2xl p-6 focus:ring-0 focus:border-neo-sage bg-neo-cream font-light h-20"
              />
            </div>

            <div>
              <Label className="text-3xl text-neo-charcoal tracking-tight font-black block mb-4">
                CONTENT
              </Label>
              <div className="border-8 border-neo-charcoal overflow-hidden">
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                type="submit"
                className="bg-neo-charcoal hover:bg-neo-sage text-neo-cream hover:text-neo-charcoal text-2xl px-16 py-8 border-4 border-neo-charcoal transition-all duration-200 font-black tracking-tight"
                disabled={loading}
              >
                {loading ? "PUBLISHING..." : "PUBLISH"}
              </Button>

              <Button
                type="button"
                onClick={() => navigate("/")}
                className="bg-neo-cream hover:bg-neo-charcoal hover:text-neo-cream text-neo-charcoal text-2xl px-16 py-8 border-4 border-neo-charcoal transition-all duration-200 font-black tracking-tight"
              >
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publish;
