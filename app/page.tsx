"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [emoji, setEmoji] = useState("");
    const [generatedEmojis, setGeneratedEmojis] = useState<string[]>([]);

    async function handleGenerateEmoji(prompt: string) {
        const response = await fetch('/api/generate-emoji', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate emoji');
        }

        const data = await response.json();
        return data;
    }

    const generateEmoji = async () => {
        console.log('hello the world')
        try {
            const newEmoji = await handleGenerateEmoji(prompt);
            setEmoji(newEmoji);
            setGeneratedEmojis((prev) => [...prev, newEmoji]); // Store generated emojis
        } catch (error) {
            console.error('Error generating emoji:', error);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1>Emoji Maker</h1>
            <main className="flex flex-col gap-8">
                <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <Button onClick={() => generateEmoji()}>Generate Emoji</Button>
                <div className="grid grid-cols-2 gap-4">
                    {generatedEmojis.map((img, index) => (
                        <Card key={index} className="relative">
                            <img src={img} alt={`Generated Emoji ${index}`} className="w-full" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <button className="bg-blue-500 text-white rounded p-2">Download</button>
                                <button className="bg-red-500 text-white rounded p-2 ml-2">Like</button>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
