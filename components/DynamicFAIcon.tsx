import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBriefcase, faCode, faDatabase, faGear, faHeartPulse, faLayerGroup, faServer, faStethoscope, faToolbox, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import React from 'react';

const icons: Record<string, IconDefinition> = {
    'fa-solid fa-briefcase': faBriefcase,
    'fa-solid fa-code': faCode,
    'fa-solid fa-database': faDatabase,
    'fa-solid fa-gear': faGear,
    'fa-solid fa-heart-pulse': faHeartPulse,
    'fa-solid fa-layer-group': faLayerGroup,
    'fa-solid fa-server': faServer,
    'fa-solid fa-stethoscope': faStethoscope,
    'fa-solid fa-toolbox': faToolbox,
    'fa-solid fa-window-restore': faWindowRestore,
    'fa-brands fa-react': faReact,
};

interface DynamicFAIconProps extends Omit<React.ComponentProps<typeof FontAwesomeIcon>, 'icon'> {
    icon: string;
}

export default function DynamicFAIcon({ icon, ...props }: DynamicFAIconProps) {
    const iconKey = icon.split(' ').slice(0, 2).join(' ');
    return <FontAwesomeIcon icon={icons[iconKey] ?? faCircle} {...props} />;
}
