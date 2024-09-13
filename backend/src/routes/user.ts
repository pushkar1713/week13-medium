import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@pushkar1713/week13-common";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      msg: "invalid types",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch {
    c.status(404);
    return c.json({
      msg: "error occured during sign up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      msg: "invalid types",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        msg: "user does not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      return c.json({ error: "Invalid password" }, 401);
    }
    //@ts-ignore
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(jwt);
    return c.json({ jwt });
  } catch {
    c.status(411);
    return c.json({
      msg: "err occurred while sign up",
    });
  }
});
