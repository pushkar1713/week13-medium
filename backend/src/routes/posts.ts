import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { decode, sign, verify } from "hono/jwt";

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
  const token = header.split("")[1];
  const response = await verify(token, c.env.JWT_SECRET);

  if (response) {
    //@ts-ignore
    c.set("userId", response.id);
    next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

postRouter.post("/blog", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const userId = c.get("userId");

  const blog = prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      author_id: userId,
    },
  });

  return c.text("blog route");
});

postRouter.get("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const id = c.req.param("id");

  try {
    const blog = prisma.post.findUnique({
      where: {
        id: body.id,
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
  return c.text("this is a put route");
});

postRouter.get("/bulk", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = prisma.post.findMany();
  return c.json({
    blogs,
  });
});
