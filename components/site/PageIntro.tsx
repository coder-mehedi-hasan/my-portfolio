import type { ReactNode } from 'react';

export default function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: ReactNode }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="page-description">{description}</p>}</header>;
}
