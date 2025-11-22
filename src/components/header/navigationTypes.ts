export type Navigation = {
  name: string;
  to: string;
  current: boolean;
  subNavigation?: SubNavigation[];
  description?: string; // Only applies for desktop
  mobileLabel?: string; // Mobile-specific label, shorter and without description
};

export type SubNavigation = {
  name: string;
  to: string;
  description?: string; // Desktop-specific subpage description
};
