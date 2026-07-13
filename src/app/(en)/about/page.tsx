import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";

export const metadata = pageMetadata({
  title: "About Gearbox Specialist Malaysia",
  description:
    "Why this site exists: independent, specialist gearbox knowledge for Malaysian drivers — and a direct line to workshops that diagnose before they quote.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <h1 className="font-display mt-8 max-w-4xl text-3xl leading-[0.98] text-fog sm:text-5xl">
            The most misquoted repair in Malaysia<span className="text-red">.</span> We&apos;re
            fixing that.
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="prose">
          <p>
            Every week, Malaysian drivers are quoted five-figure gearbox replacements for
            three-figure faults — because the word &ldquo;transmission&rdquo; scares people, and
            because most workshops would rather swap parts than measure anything. The information
            that protects you from that has always existed. It just lived inside specialist
            workshops, in service bulletins, and in the experience of the people who rebuild these
            units daily.
          </p>
          <p>
            {`${site.name} `}puts that knowledge in the open. Every guide on this site is written
            from the workshop floor&apos;s point of view: what actually fails, what it actually
            costs, which symptoms are urgent and which are folklore. No manufacturer marketing, no
            &ldquo;lifetime fluid&rdquo;, no mystery.
          </p>
          <h2>What we stand behind</h2>
          <p>
            <strong>Diagnosis before quotes.</strong> No repair should be priced before a road
            test, a proper scan and physical evidence. Every workshop we route you to works this
            way — findings in writing, then a decision that&apos;s yours.
          </p>
          <p>
            <strong>Repair over replacement.</strong> Almost every gearbox fault is repairable at
            component level for a fraction of a new unit. The industry&apos;s habit of quoting
            replacements first is a knowledge problem, not an engineering one.
          </p>
          <p>
            <strong>Written warranties.</strong> Months and kilometres, on paper. A workshop&apos;s
            warranty is its honest opinion of its own work.
          </p>
          <h2>How the site works</h2>
          <p>
            The guides are free and independent. When you&apos;re ready to act, we route you to a
            partner specialist workshop near you — that&apos;s the entire model, stated plainly.
            The workshops earn the referral by working diagnosis-first; the day one doesn&apos;t,
            it stops receiving them.
          </p>
        </div>

        <WorkshopCTA
          placement="about"
          heading="Put it to the test"
          body="Book a diagnosis and judge the standard yourself — road test, scan data, written findings, and a quote you can interrogate."
        />
      </div>
    </>
  );
}
