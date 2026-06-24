import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/agent';
import { getProfile } from '@/lib/profiles';
import { CalendarEvent } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, events, targetMonth, targetYear } = body;

    if (!profileId) {
      return NextResponse.json({ error: 'profileId is required' }, { status: 400 });
    }

    const profile = getProfile(profileId);
    if (!profile) {
      return NextResponse.json({ error: `Profile "${profileId}" not found` }, { status: 404 });
    }

    const month = targetMonth ?? new Date().getMonth();
    const year = targetYear ?? new Date().getFullYear();

    // Reconstruct dates from serialized events
    const hydratedEvents: CalendarEvent[] = (events || []).map((e: Record<string, unknown>) => ({
      ...e,
      start: new Date(e.start as string),
      end: new Date(e.end as string),
    }));

    const result = await runAgent(profile, hydratedEvents, month, year);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Agent error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
