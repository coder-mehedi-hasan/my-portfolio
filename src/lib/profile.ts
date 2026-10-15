export const profileLinks = {
  github: 'https://github.com/coder-mehedi-hasan',
  linkedin: 'https://www.linkedin.com/in/coder-mehedi-hasan/',
  email: 'mailto:hi@mehedihasan.dev',
  resume: '/resume-mehedi.pdf',
} as const;

export const socialProfiles = [
  {
    label: 'GitHub',
    href: profileLinks.github,
    description: 'Code, open-source work, and experiments',
  },
  {
    label: 'LinkedIn',
    href: profileLinks.linkedin,
    description: 'Experience and professional updates',
  },
] as const;
