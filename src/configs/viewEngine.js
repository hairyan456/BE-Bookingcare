import express from "express";

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));  //cho phép ng dùng truy cập các source lưu trong folder 'public'
    app.set("view engine", "ejs");          //nói express biết sẽ code HTML thông qua EJS (view engine)
    app.set("views", "./src/views");  //lưu trữ tất cả file .ejs trong thư mục "views", Express tự động tìm tới thư mục này
}

export default configViewEngine;