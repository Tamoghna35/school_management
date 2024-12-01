import { DB_CONNECTION } from "./models/index.js";
import { app } from "./app.js";

const PORT = 8080


DB_CONNECTION().then(
    app.listen(PORT, () => {
        console.log(`server runs at port ${PORT}`);
        
    })
).catch(error => {
    console.log(`Causing issue while running the server`);
    
})