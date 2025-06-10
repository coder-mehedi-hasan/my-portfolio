//@ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Import all icons
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';

import React from 'react';

const iconSets: Record<string, Record<string, IconDefinition>> = {
    'fa-solid': solidIcons as Record<string, IconDefinition>,
    'fa-brands': brandIcons as Record<string, IconDefinition>,
    'fa-regular': regularIcons as Record<string, IconDefinition>,
};

function formatIconKey(raw: string): string {
    return 'fa' + raw
        .replace('fa-', '')
        .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
}

function getIconFromString(iconString: string): IconDefinition | null {
    const [prefix, iconName] = iconString.split(' ');
    const iconPack = iconSets[prefix];
    if (!iconPack || !iconName) return null;

    const key = formatIconKey(iconName);
    return iconPack[key] || null;
}

//@ts-ignore
interface DynamicFAIconProps extends React.ComponentProps<typeof FontAwesomeIcon> {
    icon: string; // e.g., "fa-brands fa-react"
}

const DynamicFAIcon: React.FC<DynamicFAIconProps> = ({ icon, ...props }) => {
    let faIcon = getIconFromString(icon);
    if (!faIcon) faIcon = getIconFromString("fa-regular fa-circle fa-lg");
    //@ts-ignore
    return <FontAwesomeIcon icon={faIcon} {...props} />;
};

export default DynamicFAIcon;
