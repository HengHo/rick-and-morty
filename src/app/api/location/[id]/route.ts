import { getLocationById } from '@/lib/services/location'; 
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  try {
    
    const { id } = context.params; 
    
     
      const location = await getLocationById(parseInt(id));

      if (!location) {
        throw new Error('location not found');
      }

      return NextResponse.json({
        status: true,
        data:location,
      }, { status: 200 });
    
  } catch (error: any) {
    console.error("Get locations fail:", error);
    return NextResponse.json({
      status: false,
      error: error.message || 'Unknown error'
    });
  }
};
