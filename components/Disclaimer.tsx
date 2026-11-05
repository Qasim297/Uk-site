import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

export default function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <aside className="disclaimer" role="note">
      <Info size={18} aria-hidden="true" />
      <p>
        {children ?? (
          <>
            AutoCheck Pro is an independent service and is <strong>not affiliated with the DVLA, DVSA or TfL</strong>.
            Information is provided for guidance only. Always inspect the vehicle and its documents, and confirm
            critical details with official sources before you buy.
          </>
        )}
      </p>
    </aside>
  );
}
