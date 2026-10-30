import InfoPageLayout from "@/components/layout/InfoPageLayout";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Privacy Policy | Moodzik",
  description:
    "Learn how Moodzik handles information, local music files, and privacy.",
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    paragraphs: [
      "Moodzik is a music discovery and listening interface designed to help you enjoy music and explore your own audio collection.",
      "This policy explains how information may be handled when you use Moodzik. It describes the current local-file experience and highlights that future features, such as accounts or cloud services, may introduce additional data processing.",
    ],
  },
  {
    id: "information",
    title: "2. Information and files",
    paragraphs: [
      "When you select an MP3 file using the local music import feature, Moodzik may read the file's metadata, such as its title, artist, album, duration, and embedded artwork, to display the track in the interface.",
      "In the current browser-based implementation, imported audio and artwork are handled using browser file access and temporary object URLs. They are not automatically uploaded to a Moodzik server by the local import code.",
      "The demo music catalogue may contain links to audio and artwork hosted by third-party services. When your browser requests those resources, those providers may receive technical information such as your IP address and browser request details.",
    ],
  },
  {
    id: "usage",
    title: "3. How information is used",
    paragraphs: [
      "Information processed by the current interface is used to display tracks, show their metadata and artwork, and provide playback controls.",
      "If Moodzik adds accounts, synchronization, analytics, or other server-backed features, the information collected and its purposes will depend on how those features are implemented. This policy should be updated before those features are launched.",
    ],
  },
  {
    id: "storage",
    title: "4. Local storage and retention",
    paragraphs: [
      "Imported tracks currently exist in the active browser session. Their temporary object URLs are released when the page is unmounted, but imported tracks are not designed to survive a page refresh.",
      "The current implementation does not, by itself, establish a permanent server-side music library. Browser settings, caching, and third-party resources may operate separately from Moodzik's application state.",
    ],
  },
  {
    id: "third-parties",
    title: "5. Third-party services",
    paragraphs: [
      "Moodzik may display or request resources hosted by third parties. Their websites and services are governed by their own privacy policies and terms.",
      "This policy does not claim that third-party providers follow Moodzik's practices. Review their policies when you use external services or resources.",
    ],
  },
  {
    id: "security",
    title: "6. Security",
    paragraphs: [
      "No website or application can guarantee absolute security. Avoid importing files from sources you do not trust, keep your browser updated, and use caution when interacting with external links.",
      "If server-side storage or accounts are introduced, appropriate security measures and a more specific explanation of those practices should be documented here.",
    ],
  },
  {
    id: "rights",
    title: "7. Your choices and rights",
    paragraphs: [
      "You can choose which local audio files to select. You can also stop using the application and close the page to end the current session.",
      "Privacy rights vary by jurisdiction. If Moodzik introduces personal-data processing through accounts, analytics, or backend services, this section should identify the applicable contact process and explain how users can exercise relevant rights.",
    ],
  },
  {
    id: "children",
    title: "8. Children's privacy",
    paragraphs: [
      "Moodzik is not specifically designed as a service for children. If the service later introduces accounts or collects personal information, its age requirements and any additional protections should be stated clearly.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to this policy",
    paragraphs: [
      "This policy may be updated as Moodzik develops. The date at the top of this page should be revised whenever a substantive change is made. Continued use after an update may be subject to the revised policy where permitted by applicable law.",
    ],
  },
];

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <InfoPageLayout
      locale={locale}
      eyebrow="Your privacy matters"
      title="Privacy Policy"
      description="A clear overview of how the current Moodzik experience handles local music files, information, and third-party resources."
      updatedAt="October 29, 2026"
    >
      <section
        id="introduction"
        className="rounded-2xl border border-[#1ed760]/20 bg-[#1ed760]/5 p-5 sm:p-6"
      >
        <p className="text-sm leading-7 text-white">
          <strong>Important:</strong> This is a project-ready draft based on
          Moodzik&apos;s current browser-based features. Review it against your
          actual deployment, services, and legal obligations before publishing
          it as a final legal policy.
        </p>
      </section>

      <nav
        aria-label="Privacy policy contents"
        className="rounded-2xl border border-white/10 bg-[#121212] p-5 sm:p-6"
      >
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
          On this page
        </h2>

        <ol className="grid gap-2 sm:grid-cols-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm transition hover:text-[#1ed760]"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 space-y-4"
        >
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {section.title}
          </h2>

          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section className="border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold text-white">
          Questions about privacy?
        </h2>

        <p className="mt-3">
          A public privacy contact address has not yet been configured for
          Moodzik. Add a monitored contact method here before publishing the
          application publicly.
        </p>
      </section>
    </InfoPageLayout>
  );
}
