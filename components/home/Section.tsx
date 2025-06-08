import Link from 'next/link';
import React from 'react';

export type SectionItem = {
    title: string;
    location?: string;
    date: string;
};

interface SectionProps {
    title: string;
    items: SectionItem[];
    id: string;
    viewAllBtnPreview: boolean;
    href: string;
    btnText: string
}

const Section: React.FC<SectionProps> = ({ title, items, id, btnText, href, viewAllBtnPreview }) => {
    return (
        <>
            <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5" id={id}>
                {title}
            </h2>
            {items.map((item, index) => (
                <div key={index} className="flex gap-4 bg-slate-50 px-4 py-3 justify-between">
                    <div className="flex items-start gap-4">
                        <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" />
                            </svg>
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-[#0e141b] text-base font-medium leading-normal">{item.title}</p>
                            {item.location && (
                                <p className="text-[#4e7397] text-sm font-normal leading-normal">{item.location}</p>
                            )}
                            <p className="text-[#4e7397] text-sm font-normal leading-normal">{item.date}</p>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center justify-center size-7 text-[#0e141b]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                        </svg>
                    </div>
                </div>
            ))}
            {
                viewAllBtnPreview &&
                <div className="flex px-4 justify-end">
                    <Link href={href} className="flex h-12 min-w-[84px] items-center justify-center rounded-xl bg-[#e7edf3] px-5 text-base font-bold text-[#0e141b] tracking-[0.015em]">
                        <span className="truncate">{btnText}</span>
                    </Link>
                </div>
            }
        </>
    );
};

export default Section;
