import InfoPageLayout from "@/components/layout/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Moodzik",
  description:
    "Review the terms and conditions governing your access to and use of the Moodzik music platform.",
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      activePage="terms"
      eyebrow="Terms of service"
      title="Simple rules for a better experience."
      description="Please read these terms carefully before accessing or using Moodzik."
      updatedAt="November 1, 2026"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">1. Introduction</h2>

          <p className="leading-8">
            Welcome to Moodzik. These Terms of Service govern your access to and
            use of the Moodzik application, website, and related features.
          </p>

          <p className="mt-4 leading-8">
            By accessing or using Moodzik, you agree to these terms. If you do
            not agree with them, you should stop using the application.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            2. About the service
          </h2>

          <p className="leading-8">
            Moodzik is a music-focused web application designed to provide
            features such as music playback, music discovery, playlists,
            favorites, and local audio file importing.
          </p>

          <p className="mt-4 leading-8">
            Features may change, improve, become temporarily unavailable, or be
            discontinued as the application evolves.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            3. User responsibilities
          </h2>

          <p className="mb-4 leading-8">When using Moodzik, you agree to:</p>

          <ul className="list-disc space-y-3 pl-6 leading-7">
            <li>Use the application for lawful purposes.</li>
            <li>Respect the intellectual property rights of others.</li>
            <li>Not attempt to disrupt or damage the application.</li>
            <li>Not misuse any available features or services.</li>
            <li>Not attempt unauthorized access to systems or data.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            4. Local audio files
          </h2>

          <p className="leading-8">
            Moodzik may allow you to import audio files stored on your device
            for personal playback and metadata inspection.
          </p>

          <p className="mt-4 leading-8">
            You are responsible for ensuring that you have the necessary rights
            or permissions to access, use, and play any files you import.
          </p>

          <p className="mt-4 leading-8">
            Moodzik does not grant you ownership or additional rights over
            imported audio files, their recordings, compositions, artwork, or
            associated metadata.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            5. Intellectual property
          </h2>

          <p className="leading-8">
            Unless otherwise stated, the Moodzik name, branding, application
            design, original interface elements, and original software
            components are protected by applicable intellectual property laws.
          </p>

          <p className="mt-4 leading-8">
            You may not copy, reproduce, distribute, modify, or commercially
            exploit protected parts of the application without appropriate
            permission.
          </p>

          <p className="mt-4 leading-8">
            Third-party music, artwork, logos, and other materials remain the
            property of their respective owners and are subject to their own
            rights and licenses.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            6. Third-party content and services
          </h2>

          <p className="leading-8">
            Moodzik may include links to or display content from third-party
            websites and services. These resources are provided for convenience
            and may be subject to separate terms and policies.
          </p>

          <p className="mt-4 leading-8">
            We are not responsible for the availability, accuracy, or policies
            of external services that are outside our control.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            7. Availability and changes
          </h2>

          <p className="leading-8">
            We aim to keep Moodzik available and functional, but uninterrupted
            access cannot be guaranteed.
          </p>

          <p className="mt-4 leading-8">
            We may update, modify, suspend, or remove features at any time.
            Maintenance, technical issues, hosting problems, or external service
            interruptions may affect availability.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            8. Disclaimer of warranties
          </h2>

          <p className="leading-8">
            Moodzik is provided on an &quot;as is&quot; and &quot;as available&quot; basis, to the
            extent permitted by applicable law.
          </p>

          <p className="mt-4 leading-8">
            We do not guarantee that the application will always be error-free,
            uninterrupted, compatible with every device, or free from technical
            issues.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            9. Limitation of liability
          </h2>

          <p className="leading-8">
            To the extent permitted by applicable law, Moodzik and its
            contributors shall not be liable for indirect, incidental, or
            consequential damages arising from your use of, or inability to use,
            the application.
          </p>

          <p className="mt-4 leading-8">
            Nothing in these terms excludes liability that cannot legally be
            excluded under applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            10. Changes to these terms
          </h2>

          <p className="leading-8">
            We may revise these Terms of Service as the application develops or
            when necessary to reflect operational or legal changes.
          </p>

          <p className="mt-4 leading-8">
            Updated terms will be published on this page with a revised update
            date. Continued use of Moodzik after changes take effect may
            constitute acceptance where permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">11. Contact</h2>

          <p className="leading-8">
            If you have questions about these Terms of Service, please contact
            the Moodzik team through the official contact channel published with
            the application.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/3 p-6">
          <h2 className="mb-3 text-lg font-bold text-white">
            Thank you for using Moodzik.
          </h2>

          <p className="text-sm leading-7">
            We appreciate you being part of the Moodzik experience. Enjoy your
            music and make every moment yours.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
