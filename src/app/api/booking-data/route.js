import { NextResponse } from 'next/server';
import { supabase } from '../_supabase'; // path to your client (adjust if needed)

export async function GET() {
  const { data, error } = await supabase.from('bookings').select('*');

  if (error) {
    console.error('[SUPABASE ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }

  return NextResponse.json(data);
}
