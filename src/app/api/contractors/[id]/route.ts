import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/contractors/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contractor = await prisma.cONTRACTORS.findUnique({
      where: { contractor_id: parseInt(params.id) },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: "Contractor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contractor);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to GET contractor [${params.id}]: ${error} ` },
      { status: 500 }
    );
  }
}

// PATCH /api/contractors/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const contractor = await prisma.cONTRACTORS.update({
      where: { contractor_id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json(contractor);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to PATCH contractor [${params.id}]: ${error}` },
      { status: 500 }
    );
  }
}

// DELETE /api/contractors/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cONTRACTORS.delete({
      where: { contractor_id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to DELETE contractor [${params.id}]: ${error}` },
      { status: 500 }
    );
  }
}
