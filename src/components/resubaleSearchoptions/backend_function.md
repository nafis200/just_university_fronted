

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchTerm = url.searchParams.get("searchTerm") || "";
  const unit = url.searchParams.get("unit") || "all";
  const subject = url.searchParams.get("subject") || "all";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "50");

  const skip = (page - 1) * limit;

  // Build where condition
  const where: any = {};
  if (unit !== "all") where.unit = unit;
  if (subject !== "all") where.subject = subject;
  if (searchTerm) where.gstApplicationId = { contains: searchTerm, mode: "insensitive" };

  const [applications, total] = await prisma.application.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  }).then(async (apps) => [apps, await prisma.application.count({ where })]);

  return NextResponse.json({ applications, total, page, limit });
}
