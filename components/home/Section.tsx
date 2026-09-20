import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import DynamicFAIcon from '../DynamicFAIcon';

export type SectionItem = {
    title: string;
    location?: string;
    date: string;
    href?: string;
    icon?: string;
    image?: string;
};

interface SectionProps {
    title: string;
    items?: SectionItem[];
    id: string;
    viewAllBtnPreview: boolean;
    href: string;
    btnText: string
}

const Section: React.FC<SectionProps> = ({ title, items, id, btnText, href, viewAllBtnPreview }) => {
    return (
        <section className="scroll-mt-24 px-4 py-8 md:px-0 md:py-10" id={id}>
            <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-[#111211] md:text-[28px]">{title}</h2>
                {viewAllBtnPreview && <Link href={href} className="text-sm font-semibold text-[#66706b] transition hover:text-black">{btnText} <span aria-hidden="true">→</span></Link>}
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#e3e5e2] bg-white">
            {items?.map((item, index) => (
                <Link key={index} href={item.href ?? '#'} className="group flex justify-between gap-4 border-b border-[#e8e9e7] px-5 py-5 transition last:border-b-0 hover:bg-[#f7f7f5] md:px-6">
                    <div className="flex items-start gap-4">
                        <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f1ef] text-[#111211]">
                            {item.image ? (
                                <Image src={item.image} alt="" fill sizes="44px" className="object-cover" />
                            ) : (
                                <DynamicFAIcon icon={item.icon ?? 'fa-solid fa-briefcase'} />
                            )}
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-base font-semibold leading-normal text-[#111211]">{item.title}</p>
                            {item.location && (
                                <p className="text-sm font-normal leading-6 text-[#66706b]">{item.location}</p>
                            )}
                            <p className="text-sm font-normal leading-6 text-[#66706b]">{item.date}</p>
                        </div>
                    </div>
                    <span className="self-center text-xl text-[#9aa09d] transition group-hover:translate-x-1 group-hover:text-black" aria-hidden="true">→</span>
                </Link>
            ))}
            </div>
        </section>
    );
};

export default Section;
