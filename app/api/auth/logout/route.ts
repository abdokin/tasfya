import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response
    const res = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    
    // Delete the authentication cookie
    res.cookies.delete('auth_token');
    
    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}