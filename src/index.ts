import http from "http";

const todos = [
  { id: 1, title: "ネーム", completed: false },
  { id: 2, title: "下書き", completed: true },
];

const server = http.createServer((req, res) => {
  //リクエストのURLやHTTPメソッドに応じてレスポンスを返す
  if (req.url === "/api/todos") {
    if (req.method === "GET") {
      // 全todoをJSON形式で返す
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(todos));
    }
    // GETメソッド以外のメソッドだったら405
    res.statusCode = 405;
  } else {
    // 条件式のurlでリクエストが来なければNot Found
    res.statusCode = 404;
  }
  res.end();
});

server.listen(3000, () => console.log("サーバー起動中"));
