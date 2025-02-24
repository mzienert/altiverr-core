import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    domain?: string;
    path?: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Handle verification requests
    if (event.resource === '/auth/session/verify') {
        const cookies = event.headers.Cookie || event.headers.cookie;
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                cookiesPresent: !!cookies,
                cookies: cookies ? parseCookies(cookies) : null
            })
        };
    }

    // Existing session management code
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing request body' })
            };
        }

        const { accessToken, idToken } = JSON.parse(event.body);
        console.log('Received tokens:', { 
            accessTokenLength: accessToken?.length,
            idTokenLength: idToken?.length 
        });

        if (!accessToken || !idToken) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required tokens' })
            };
        }

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'  // Added to ensure cookies are sent for all paths
        };

        const cookies = [
            `accessToken=${accessToken}; ${serializeCookieOptions(cookieOptions)}`,
            `idToken=${idToken}; ${serializeCookieOptions(cookieOptions)}`
        ];

        console.log('Setting cookies:', cookies);

        const allowedOrigins = (process.env.ALLOWED_ORIGIN || '').split(',');
        const origin = event.headers.origin || event.headers.Origin;
        const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

        return {
            statusCode: 200,
            headers: {
                'Set-Cookie': cookies.join('; '),
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({ 
                success: true,
                cookiesSet: cookies.length
            })
        };
    } catch (error) {
        console.error('Session management error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

function parseCookies(cookieString: string) {
    return cookieString.split(';')
        .map(cookie => cookie.trim())
        .reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);
}

function serializeCookieOptions(options: CookieOptions): string {
    const parts = [];
    
    if (options.httpOnly) parts.push('HttpOnly');
    if (options.secure) parts.push('Secure');
    if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
    if (options.maxAge) parts.push(`Max-Age=${Math.floor(options.maxAge / 1000)}`);
    if (options.domain) parts.push(`Domain=${options.domain}`);
    if (options.path) parts.push(`Path=${options.path}`);
    
    return parts.join('; ');
} 