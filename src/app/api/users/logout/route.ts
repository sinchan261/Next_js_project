import { NextResponse ,NextRequest} from "next/server";
export async function GET() {
  try {
    console.log("hhe")
    const response = NextResponse.json({
      message: "logout successfull",
      success: true,
    });
   // response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
   response.cookies.delete('experiments')
    // console.log(response);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
