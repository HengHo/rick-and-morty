import { getEpisodeById } from '@/lib/services/episode'; 
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  try {
    
    const { id } = context.params; 
    
     
      const episode = await getEpisodeById(parseInt(id));

      if (!episode) {
        throw new Error('episode not found');
      }

      return NextResponse.json({
        status: true,
        data:episode,
      }, { status: 200 });
    
  } catch (error: any) {
    console.error("Get episodes fail:", error);
    return NextResponse.json({
      status: false,
      error: error.message || 'Unknown error'
    });
  }
};
