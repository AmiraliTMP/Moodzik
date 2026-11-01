import InfoPageLayout from "@/components/layout/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Moodzik",
  description:
    "Read Moodzik's privacy policy and learn how local music files, metadata, and personal information are handled.",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      activePage="privacy"
      eyebrow="Privacy policy"
      title="Your privacy matters."
      description="This policy explains how Moodzik handles information when you use our music platform."
      updatedAt="November 1, 2026"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">1. Introduction</h2>

          <p className="leading-8">
            Welcome to Moodzik. We respect your privacy and aim to be
            transparent about how information is handled when you access and use
            our platform.
          </p>

          <p className="mt-4 leading-8">
            This Privacy Policy describes the information that may be processed
            through Moodzik, how local audio files are handled, and what you
            should know about third-party services.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            2. Information we may process
          </h2>

          <p className="mb-4 leading-8">
            Depending on the features available in your version of Moodzik,
            certain technical or usage-related information may be processed.
            This may include:
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-7">
            <li>Browser and device information.</li>
            <li>
              Basic technical information required to load the application.
            </li>
            <li>Music preferences and interactions, where applicable.</li>
            <li>
              Information you voluntarily provide through available features.
            </li>
          </ul>

          <p className="mt-4 leading-8">
            The exact information collected depends on the services and
            integrations enabled in the deployed version of Moodzik.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            3. Local audio files and metadata
          </h2>

          <p className="leading-8">
            Moodzik includes a feature that allows you to import local MP3 files
            and inspect their metadata, including track titles, artist names,
            album information, duration, and embedded artwork.
          </p>

          <p className="mt-4 leading-8">
            In the current implementation, imported audio files are processed
            directly in your browser. The application uses temporary browser
            object URLs to access imported audio and artwork.
          </p>

          <p className="mt-4 leading-8">
            Your imported files are not automatically uploaded to a Moodzik
            server by this feature. Imported tracks are held temporarily in
            application memory and may no longer be available after refreshing
            or closing the page.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            4. How information may be used
          </h2>

          <p className="mb-4 leading-8">
            Information processed through Moodzik may be used for purposes such
            as:
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-7">
            <li>Providing and maintaining application functionality.</li>
            <li>Improving performance and user experience.</li>
            <li>Remembering preferences where supported.</li>
            <li>Identifying technical issues and troubleshooting errors.</li>
            <li>Protecting the platform against misuse.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            5. Browser storage and data retention
          </h2>

          <p className="leading-8">
            Moodzik may use browser storage technologies, such as local storage,
            session storage, or other browser-based mechanisms, if implemented
            by the application.
          </p>

          <p className="mt-4 leading-8">
            Temporary object URLs used for imported audio files and artwork are
            associated with the browser session and are not permanent storage
            solutions.
          </p>

          <p className="mt-4 leading-8">
            The retention of information may also depend on your browser
            settings, enabled integrations, and the hosting services used by the
            deployed application.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            6. Third-party services and external content
          </h2>

          <p className="leading-8">
            Moodzik may display or access content provided by external services,
            including audio hosting platforms, image providers, and other
            third-party resources.
          </p>

          <p className="mt-4 leading-8">
            When your browser requests resources from those services, they may
            receive technical information such as your IP address, browser
            details, and request information according to their own privacy
            policies.
          </p>

          <p className="mt-4 leading-8">
            Moodzik does not control the privacy practices of third-party
            services. We recommend reviewing their policies before using
            external services.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            7. Data security
          </h2>

          <p className="leading-8">
            We aim to use appropriate technical measures to protect information
            handled by Moodzik. However, no internet-based application or
            electronic storage method can be guaranteed to be completely secure.
          </p>

          <p className="mt-4 leading-8">
            You should avoid importing or sharing files containing information
            you do not want exposed to other people or external services.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            8. Your choices and rights
          </h2>

          <p className="leading-8">
            Depending on your location and applicable privacy laws, you may have
            rights concerning your personal information, including the right to
            request access, correction, or deletion of certain data.
          </p>

          <p className="mt-4 leading-8">
            You can also manage browser permissions, clear browser storage, and
            stop using the application at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            9. Children&apos;s privacy
          </h2>

          <p className="leading-8">
            Moodzik is not intentionally designed to collect personal
            information from children. If you believe that a child has provided
            personal information through the platform, please contact us so the
            matter can be reviewed.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            10. Changes to this policy
          </h2>

          <p className="leading-8">
            We may update this Privacy Policy as Moodzik develops or when
            changes to our services, technologies, or legal obligations make
            updates necessary.
          </p>

          <p className="mt-4 leading-8">
            Any updates will be reflected on this page with a revised update
            date.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/3 p-6">
          <h2 className="mb-3 text-lg font-bold text-white">
            Privacy questions?
          </h2>

          <p className="text-sm leading-7">
            If you have questions or concerns about this Privacy Policy, please
            contact the Moodzik team through the official contact channel
            published with the application.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
