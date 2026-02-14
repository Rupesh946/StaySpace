'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { logout } = useAuth(); // We might use this if verification fails, but mostly we just set token

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            // Save token
            localStorage.setItem('token', token);

            // Force a hard reload to ensure AuthContext picks up the new token state cleanly
            // or we could assume the redirect will trigger a re-mount if we use window.location
            window.location.href = '/';
        } else if (error) {
            console.error('Google Auth Error:', error);
            router.push('/auth?error=' + error);
        } else {
            router.push('/auth');
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-display italic text-primary">Authenticating...</h2>
                <p className="text-gray-500 mt-2">Please wait while we log you in.</p>
            </div>
        </div>
    );
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
