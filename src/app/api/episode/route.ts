import { getAllEpisode } from "@/lib/services/episode";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // ดึง page และ name จาก query string
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const name = searchParams.get("name") || ""; // เพิ่มการดึงค่า name

    const response = await getAllEpisode(page, name);

    if (!response || !response.results) {
      throw new Error("episodes not found");
    }

    return NextResponse.json(
      {
        status: true,
        data: response.results,
        info: response.info, // ส่ง pagination info กลับมาด้วย
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get episodes fail:", error);
    return NextResponse.json({
      status: false,
      error: error.message || "Unknown error",
    });
  }
};
