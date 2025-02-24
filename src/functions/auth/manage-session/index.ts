import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    domain?: string;
    path?: string;
}

type APIGatewayProxyResultWithMultiValueHeaders = Omit<APIGatewayProxyResult, 'headers'> & {
    multiValueHeaders?: { [header: string]: string[] };
    headers: { [header: string]: string | number | boolean | string[] };
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultWithMultiValueHeaders> => {
    const allowedOrigins = ['https://www.asaracing.live', 'http://localhost:3000'];
    const origin = event.headers.origin || 'https://www.asaracing.live';
    
    const corsHeaders = {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'https://www.asaracing.live',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization,Cookie'
    };

    // Handle OPTIONS preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }

    // Handle POST request for session creation
    if (event.httpMethod === 'POST') {
        const { accessToken, idToken } = JSON.parse(event.body || '{}');
        
        if (!accessToken || !idToken) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ message: 'Missing required tokens' })
            };
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            multiValueHeaders: {
                'Set-Cookie': [
                    `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None`,
                    `idToken=${idToken}; Path=/; HttpOnly; Secure; SameSite=None`
                ]
            },
            body: JSON.stringify({ success: true })
        };
    }

    // Handle verify request (GET)
    if (event.httpMethod === 'GET') {
        const cookies = event.headers.Cookie || event.headers.cookie;
        console.log('Cookies received:', cookies);
        
        if (!cookies) {
            return {
                statusCode: 401,
                headers: corsHeaders,
                body: JSON.stringify({ message: 'No access token found' })
            };
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ valid: true })
        };
    }

    return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Not found' })
    };
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