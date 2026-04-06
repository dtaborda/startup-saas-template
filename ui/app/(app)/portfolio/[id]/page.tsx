import { PageContainer } from "@/components/layout";
import { CourseDetail } from "@/components/portfolio/course-detail";

interface PortfolioItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function PortfolioItemPage({ params }: PortfolioItemPageProps) {
  const { id } = await params;
  return (
    <PageContainer>
      <CourseDetail courseId={id} />
    </PageContainer>
  );
}
