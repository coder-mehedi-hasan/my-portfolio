
type setting = {
    hero_img?: string;
    hero_title?: string;
    hero_desc?: string;
    header_logo?: string;
    resume_url: string;
}


type Experience = {
    id: number;
    is_home_page: boolean;
    designation: string;
    company_name: string;
    location: string;
    description: string;
    icon: string;
    start_date: string | null;
    end_date: string | null;
    sort_index: number;
    created_at: string;
    updated_at: string;
};

type Project = {
    id: number;
    is_home_page: boolean;
    title: string;
    description: string;
    icon: string;
    date: string | null;
    sort_index: number;
    created_at: string;
    updated_at: string;
};

type Skill = {
    id: number;
    is_home_page: boolean;
    title: string;
    sub_title: string;
    description: string;
    icon: string;
    sort_index: number;
    created_at: string;
    updated_at: string;
};

type PortfolioData = {
    setting: Setting;
    experience: Experience[];
    projects: Project[];
    skills: Skill[];
};
