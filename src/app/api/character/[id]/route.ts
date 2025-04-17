import { getCharacterById } from '@/lib/services/character'; 
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  try {
    
    const { id } = context.params; 
    
     
      const character = await getCharacterById(parseInt(id));

      if (!character) {
        throw new Error('Character not found');
      }

      return NextResponse.json({
        status: true,
        data:character,
      }, { status: 200 });
    
  } catch (error: any) {
    console.error("Get characters fail:", error);
    return NextResponse.json({
      status: false,
      error: error.message || 'Unknown error'
    });
  }
};
