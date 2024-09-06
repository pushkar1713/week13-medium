import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { decode, sign, verify } from "hono/jwt";
import { createPost, updatePost } from "@pushkar1713/week13-common";}
export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

postRouter.use("/*", async (c, next) => {
  //get the header
  // verify the header
  // if the header is correct then we need can proceed
  // otherwise we return a 403 status code

  const header = c.req.header("authorization") || "";
  const [bearer, token] = header.split(" ");

  if (!token || bearer !== "Bearer") {
    throw new Error("Invalid or missing authorization header");
  }

  const response = await verify(token, c.env.JWT_SECRET);

  if (response) {
    //@ts-ignore
    c.set("userId", response.id);
    await next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

postRouter.post("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = createPost.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      msg: "invalid types",
    });
  }
  const userId = c.get("userId");

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      author_id: userId,
    },
  });

  return c.json({ id: blog.id });
});

postRouter.get("/bulk", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = await prisma.post.findMany();
  return c.json(blogs);
});

postRouter.get("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return c.json({
      blog,
    });
  } catch {
    c.status(404);
    return c.json({
      msg: "error occured",
    });
  }
});

postRouter.put("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = updatePost.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      msg: "invalid types",
    });
  }

  const updatedBlog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("blog updated");
});
