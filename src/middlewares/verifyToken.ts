import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: any, next: any) => {
  const headers = req.headers.authorization;

  const accessToken = headers ? headers.split(" ")[1] : "";

  try {
    if (!accessToken) {
      throw new Error("Khong co quyen");
    }

    const verify: any = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string
    );

    if (!verify) {
      throw new Error("Invalid token");
    }

    req._id = verify._id;

    next();
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
};
