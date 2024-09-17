import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAuth } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs'

const supabase = createClient('your_project_url', 'your_supabase_api_key');

export async function POST(request: Request) {
    const { userId } = getAuth(request); // Get user ID from Clerk

    // Check if user exists in profiles table
    const { data: existingUser, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (fetchError) {
        console.error('Error fetching user:', fetchError);
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }

    // If user does not exist, create a new profile
    if (!existingUser) {
        const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ user_id: userId, credits: 3, tier: 'free' }]);

        if (insertError) {
            console.error('Error creating user:', insertError);
            return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
        }
    }

    return NextResponse.json({ userId });
}