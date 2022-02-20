import express, { NextFunction, Request, Response } from "express";

const todos = [
  { id: 1, title: "ネーム", completed: false },
  { id: 2, title: "下書き", completed: true },
];

const app = express();
const PORT = process.env.PORT || 4000;

/**
 * ミドルウェアを利用
 */
// postリクエストのリクエストボディを受け付けるため
app.use(express.json());

/**
 * todo一覧情報を返す.
 *
 * @remarks クエリパラメーターを用いたフィルタリングを実装
 *
 * @returns - todo一覧情報
 */
app.get("/api/todos", (req: Request, res: Response, next: NextFunction) => {
  // クエリパラメーターが存在しなければ、全てのtodoを返す
  if (!req.query.completed) {
    return res.json(todos);
  }

  // クエリパラメーターはstringのため比較対象はStr型
  const completed = req.query.completed === "true";
  res.json(todos.filter((todo) => todo.completed === completed));
});

/**
 * todoの追加.
 *
 * @returns - 追加したtodoの内容
 */
let id = 2;
app.post("/api/todos", (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  if (typeof title !== "string" || !title) {
    const err = new Error("タイトルがありません");
    return next(err);
  }

  const todo = { id: (id += 1), title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

/**
 * エラーハンドリングのミドルウェア
 *
 * @returns - ステータスコード
 * @returns - エラーメッセージ
 */
app.use(
  (
    err: { statusCode: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).json({ error: err.message });
  }
);

app.listen(PORT, () => console.log("サーバー起動"));
