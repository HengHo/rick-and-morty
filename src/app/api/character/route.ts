import { getAllCharacter } from "@/lib/services/character";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const name = searchParams.get("name") || "";
    const status = searchParams.get("status") || "";
    const gender = searchParams.get("gender") || "";

    const response = await getAllCharacter(page, name, status, gender);

    if (!response || !response.results) {
      throw new Error("Characters not found");
    }

    return NextResponse.json(
      {
        status: true,
        data: response.results,
        info: response.info,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get characters fail:", error);
    return NextResponse.json(
      {
        status: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
};
