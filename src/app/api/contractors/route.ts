import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/contractors
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const contractor = await prisma.cONTRACTORS.create({
      data: {
        last: body.last,
        first: body.first,
        default_rate: body.default_rate,
        hourly_rate: body.hourly_rate,
        user_id: body.user_id,
        address_1: body.address_1,
        address_2: body.address_2,
        city: body.city,
        state: body.state,
        zip: body.zip,
        bus_name: body.bus_name,
        bus_type: body.bus_type,
        bound_to: body.bound_to,
      },
    });

    return NextResponse.json(contractor, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create contractor ${error}` },
      { status: 500 }
    );
  }
}

// GET /api/contractors - List all contractors
export async function GET() {
  try {
    const contractors = await prisma.cONTRACTORS.findMany();
    return NextResponse.json(contractors);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch contractors: ${error}` },
      { status: 500 }
    );
  }
}
