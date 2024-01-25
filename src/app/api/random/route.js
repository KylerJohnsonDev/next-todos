export const dynamic = "force-dynamic";
export function GET() {
  return Response.json(Math.floor(Math.random() * 100));
}
