import InfoPageLayout from "@/components/layout/InfoPageLayout";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Terms of Service | Moodzik",
  description:
    "Read the terms and conditions for using the Moodzik music application.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of these terms",
    paragraphs: [
      "These Terms of Service describe the basic conditions for accessing and using Moodzik. By using the application, you agree to comply with applicable laws and these terms.",
      "If you do not agree with these terms, stop using the application.",
    ],
  },
  {
    id: "service",
    title: "2. About the service",
    paragraphs: [
      "Moodzik is a music-focused application interface for exploring a catalogue of tracks, using playback controls, and importing supported local audio files.",
      "Features, availability, and supported formats may change as the project develops. Demo audio, artwork, and metadata may be supplied by third parties and may not be available at all times.",
    ],
  },
  {
    id: "files",
    title: "3. Your local music files",
    paragraphs: [
      "You are responsible for the audio files and other content you choose to import into Moodzik.",
      "Only import files that you are legally entitled to access and use. Importing a file into the player does not transfer ownership of that file or grant you additional rights to distribute, reproduce, or publicly perform it.",
      "Imported tracks in the current implementation are temporary and may disappear when you refresh or leave the page. Do not rely on Moodzik as permanent storage or a backup for your music.",
    ],
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable use",
    paragraphs: [
      "You agree not to use Moodzik in a way that violates applicable laws, infringes another person's intellectual property or other rights, interferes with the service, or attempts to gain unauthorized access to systems or data.",
      "You must not misrepresent your rights to imported content or use the service to distribute unlawful material.",
    ],
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual property",
    paragraphs: [
      "The Moodzik name, original interface design, and original application code may be protected by intellectual-property laws. These terms do not transfer ownership of those materials to you.",
      "Music, album artwork, logos, and other third-party content remain subject to the rights and licences of their respective owners. Their appearance in the interface does not imply endorsement or ownership by Moodzik.",
    ],
  },
  {
    id: "third-party",
    title: "6. Third-party resources",
    paragraphs: [
      "The application may link to or load audio, artwork, or other resources from external services. Moodzik does not control every third-party service and cannot guarantee its availability, accuracy, or policies.",
      "Your use of an external service may be governed by that service's own terms and privacy policy.",
    ],
  },
  {
    id: "availability",
    title: "7. Availability and changes",
    paragraphs: [
      "Moodzik is provided as a developing application. Features may be changed, suspended, or removed as the project evolves.",
      "We aim to keep the application useful, but do not promise uninterrupted access, error-free operation, or permanent availability of demo resources.",
    ],
  },
  {
    id: "disclaimers",
    title: "8. Disclaimers and liability",
    paragraphs: [
      "To the extent permitted by applicable law, Moodzik is provided on an 'as available' basis without guarantees that every feature or third-party resource will work without interruption.",
      "Nothing in these terms excludes or limits a right or liability that cannot lawfully be excluded or limited. Any limitation of liability must be interpreted subject to the mandatory laws that apply to the user and service.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to these terms",
    paragraphs: [
      "These terms may be updated as new features are introduced. The revision date should be updated whenever a substantive change is made.",
      "If a change requires notice or consent under applicable law, that notice or consent must be handled appropriately.",
    ],
  },
];

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <InfoPageLayout
      locale={locale}
      eyebrow="Using Moodzik"
      title="Terms of Service"
      description="The basic rules for using Moodzik, importing music, and accessing third-party content."
      updatedAt="October 29, 2026"
    >
      <section className="rounded-2xl border border-[#1ed760]/20 bg-[#1ed760]/5 p-5 sm:p-6">
        <p className="text-sm leading-7 text-white">
          <strong>Please note:</strong> These terms are a starting draft for the
          current project, not legal advice. Before public release, adapt them
          to your business, jurisdiction, deployment, and actual service
          features.
        </p>
      </section>

      <nav
        aria-label="Terms of service contents"
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
        <h2 className="text-xl font-bold text-white">Contact</h2>

        <p className="mt-3">
          Moodzik has not yet configured a public support or legal contact
          address. Add a monitored contact method before publishing these terms.
        </p>
      </section>
    </InfoPageLayout>
  );
}
