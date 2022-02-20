import express, { NextFunction, Request, Response } from "express";

const todos = [
  { id: 1, title: "ネーム", completed: false },
  { id: 2, title: "下書き", completed: true },
];

const app = express();
const PORT = process.env.PORT || 4000;

/**
 * todo一覧情報を返す.
 *
 * @returns - todo一覧情報
 */
app.get("/api/todos", (req: Request, res: Response, next: NextFunction) => {
  return res.json(todos);
});

app.listen(PORT, () => console.log("サーバー起動"));
