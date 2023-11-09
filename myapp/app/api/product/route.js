import db from "@/lib/db";
import Product from "@/models/Product";



export async function GET(req){
    await db.connect()

    try {
        const products = await Product.find({})
        return new Response(JSON.stringify(products), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
        
    }
}

export async function POST(req){
    await db.connect()
    try {
        const body = await req.json()
        const newProduct = await Product.create(body)

        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}