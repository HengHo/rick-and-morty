import { getAllExample } from '@/lib/services/example';
import { NextResponse } from 'next/server';

export const GET = async () => {

  try{
      const reaponse = await getAllExample()
      if(!Array.isArray(reaponse)){
        throw new Error(`example not found`);
      }
      return NextResponse.json({ status: true, data: reaponse }, { status: 200 });
  } catch (error: any){

      console.error("get example fail : ", error);
      return  NextResponse.json({ status: false, error: error.message || 'Unknown error' });
  }

};
