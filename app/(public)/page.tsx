import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { BenefitsSection } from "@/components/marketing/BenefitsSection";
import { SocialProofSection } from "@/components/marketing/SocialProofSection";
import { CtaSection } from "@/components/marketing/CtaSection";
import { FaqSection } from "@/components/marketing/FaqSection";

export const dynamic = 'force-dynamic'

export default async function MarketingHomePage() {
  let learnerCount = 0
  try {
    learnerCount = await prisma.user.count()
  } catch {
    // DB not available during build
  }

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection learnerCount={learnerCount} />
      <BenefitsSection />
      <SocialProofSection learnerCount={learnerCount} />
      <CtaSection />
      <FaqSection />
    </>
  );
}
