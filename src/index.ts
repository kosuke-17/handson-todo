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
 * @remarks クエリパラメーターを用いたフィルタリングを実装
 *
 * @returns - todo一覧情報
 */
app.get("/api/todos", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);

  // クエリパラメーターが存在しなければ、全てのtodoを返す
  if (!req.query.completed) {
    return res.json(todos);
  }

  // クエリパラメーターはstringのため比較対象はStr型
  const completed = req.query.completed === "true";
  res.json(todos.filter((todo) => todo.completed === completed));
});

app.listen(PORT, () => console.log("サーバー起動"));
