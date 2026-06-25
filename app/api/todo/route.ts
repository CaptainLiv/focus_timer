const fs = require('fs').promises;
export async function GET(request : Request){
    const todos = await fs.readFile("./public/todo.json", "utf8")
    return Response.json(JSON.parse(todos))
}

export async function POST(request: Request){
    const body = await request.json();
    const content = await JSON.stringify(body)
    await fs.writeFile("./public/todo.json", content, "utf8")
    return new Response

}