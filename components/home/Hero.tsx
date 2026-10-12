import Image from 'next/image';
import Link from 'next/link';
import { profileLinks } from '@/lib/profile';

export default function Hero({ setting }: { setting: setting }) {
  return (
    <section className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <div className="mb-8 flex items-center gap-4">
        <Image src={setting.hero_img || "/md-mehedi-hasan-portfolio.jpg"} alt="Mehedi Hasan" width={64} height={64} priority className="size-16 rounded-full object-cover grayscale" />
        <div className="text-sm leading-6">
          <p className="font-medium text-[#202220]">Mehedi Hasan</p>
          <p className="text-[#70746f]">Full-stack developer</p>
        </div>
      </div>
      <h1 className="max-w-[760px] text-[40px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#202220] sm:text-[64px]">Thoughtful software.<br />Built for everyday life.</h1>
      <p className="mt-6 max-w-[570px] text-base leading-8 text-[#626660] sm:text-lg">{setting.hero_desc}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm">
        <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#252724] px-5 py-3 font-medium text-white transition-colors hover:bg-[#444741]">Get in touch <span aria-hidden="true">↗</span></Link>
        <a href={profileLinks.github} target="_blank" rel="noreferrer" className="font-medium text-[#626660] underline-offset-4 hover:text-[#202220] hover:underline">GitHub <span aria-hidden="true">↗</span></a>
        <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" className="font-medium text-[#626660] underline-offset-4 hover:text-[#202220] hover:underline">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={profileLinks.resume} target="_blank" rel="noreferrer" className="font-medium text-[#626660] underline-offset-4 hover:text-[#202220] hover:underline">Résumé <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
