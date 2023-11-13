"use server";

import getSupabaseServerClient from "../client";


export async function signUpWithEmailAndPassword(data: {
    email: string;
    password: string;
    confirmPassword: string;
}) {
    const supabase = await getSupabaseServerClient();

    const result = await supabase.auth.signUp({email: data.email, password: data.password});

    return JSON.stringify(result);

}

export async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
}) {
    const supabase = await getSupabaseServerClient();

    const result = await supabase.auth.signInWithPassword({email: data.email, password: data.password});

    return JSON.stringify(result);

}

export async function signOut() {
    const supabase = await getSupabaseServerClient();

    return supabase.auth.signOut();
}


// Currently not working with email login, but works with OAuth...
export async function getUserSession() {
    const supabase = await getSupabaseServerClient();

    return supabase.auth.getSession();
    
}