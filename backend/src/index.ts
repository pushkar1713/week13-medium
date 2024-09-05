import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/posts";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello anon");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", postRouter);

export default app;
