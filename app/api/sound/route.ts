const fs = require('fs').promises;

export async function GET(request : Request){

    const files : string[]= await fs.readdir("./public/sounds", { withFileTypes: false });
    return Response.json(files)

}