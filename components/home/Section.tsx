import Link from 'next/link';
import React from 'react';

export type SectionItem = {
    title: string;
    location?: string;
    date: string;
    href?: string;
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
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f1ef] text-[#111211]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" />
                            </svg>
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
