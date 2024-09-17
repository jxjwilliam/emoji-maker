import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { Download, Heart } from "lucide-react"

interface Emoji {
    id: string;
    url: string;
    likes: number;
}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
    const { prompt } = await request.json();
    console.log('HI', prompt, process.env.REPLICATE_API_TOKEN);

    try {
        const input = {
            prompt: "A TOK emoji of a man",
            apply_watermark: false
        };
        
        const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { 
            input: {
                "width": 1024,
                "height": 1024,
                "prompt": "A TOK emoji of a man",
                "refine": "no_refiner",
                "scheduler": "K_EULER",
                "lora_scale": 0.6,
                "num_outputs": 1,
                "guidance_scale": 7.5,
                "apply_watermark": false,
                "high_noise_frac": 0.8,
                "negative_prompt": "",
                "prompt_strength": 0.8,
                "num_inference_steps": 50
            } 
        });
        console.log(output)
        return NextResponse.json({message: 'OK'})
        // return NextResponse.json(output);
    } catch (error) {
        console.error('Error generating emoji:', error); // Log the error
        return NextResponse.json({ error: 'Failed to generate emoji' }, { status: 500 });
    }
}