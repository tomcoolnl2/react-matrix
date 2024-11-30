import React from 'react';

export enum TextVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface Props {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    variant?: TextVariant;
}

const Heading: React.FC<Props> = ({
    text,
    level,
    variant = TextVariant.PRIMARY,
}) => {
    const Tag: keyof JSX.IntrinsicElements = `h${level}`;
    const color =
        variant === TextVariant.PRIMARY ? 'text-primary' : 'text-secondary';
    return <Tag className={`h ${color}`}>{text}</Tag>;
};

export const H1: React.FC<Omit<Props, 'level'>> = (props) => (
    <Heading {...props} level={1} />
);
export const H2: React.FC<Omit<Props, 'level'>> = (props) => (
    <Heading {...props} level={2} />
);
export const H3: React.FC<Omit<Props, 'level'>> = (props) => (
    <Heading {...props} level={3} />
);
export const H4: React.FC<Omit<Props, 'level'>> = (props) => (
    <Heading {...props} level={4} />
);
export const H5: React.FC<Omit<Props, 'level'>> = (props) => (
    <Heading {...props} level={5} />
);
export const H6: React.FC<Omit<Props, 'level'>> = (props) => (
    <Heading {...props} level={6} />
);
