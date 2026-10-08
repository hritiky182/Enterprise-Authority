import React from 'react';

interface UserAvatarProps {
  name?: string | undefined;
  nameAr?: string | undefined;
  gender?: 'man' | 'woman' | undefined;
  role?: string | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  className?: string | undefined;
  showBorder?: boolean | undefined;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'User',
  gender,
  role = '',
  size = 'md',
  className = '',
  showBorder = true,
}) => {
  // Infer gender if not explicitly set
  const detectedGender: 'man' | 'woman' = React.useMemo(() => {
    if (gender) return gender;
    const lowerName = (name || '').toLowerCase();
    const femaleNames = ['reem', 'haya', 'noura', 'sara', 'fatima', 'maha', 'mona', 'hind', 'layla', 'ريم', 'هيا', 'نورة', 'سارة', 'فاطمة'];
    if (femaleNames.some((fn) => lowerName.includes(fn))) return 'woman';
    return 'man';
  }, [gender, name]);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[9px]',
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base',
  }[size];

  const borderClass = showBorder ? 'border-2 border-white shadow-xs ring-1 ring-slate-200' : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full shrink-0 select-none overflow-hidden ${sizeClasses} ${borderClass} ${
        detectedGender === 'woman'
          ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 text-emerald-800'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 text-blue-800'
      } ${className}`}
      title={name}
    >
      {detectedGender === 'woman' ? (
        // Woman Face Vector Icon (Clean Stylized Saudi/Professional Profile)
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Background subtle aura */}
          <circle cx="18" cy="18" r="17" fill="#E6F4EA" />
          {/* Hijab / Hair drape */}
          <path
            d="M8 20C8 13.5 12 7.5 18 7.5C24 7.5 28 13.5 28 20C28 26 25 31 23 34H13C11 31 8 26 8 20Z"
            fill="#0F766E"
          />
          {/* Face oval */}
          <path
            d="M13.5 15.5C13.5 12.5 15.5 11 18 11C20.5 11 22.5 12.5 22.5 15.5C22.5 19 20.5 22.5 18 22.5C15.5 22.5 13.5 19 13.5 15.5Z"
            fill="#FDE68A"
          />
          {/* Hijab wrap under chin */}
          <path
            d="M14 20C15 22 17 23 18 23C19 23 21 22 22 20C21.5 23.5 19.5 25 18 25C16.5 25 14.5 23.5 14 20Z"
            fill="#0D9488"
          />
          {/* Shoulders */}
          <path
            d="M7 34C7 29 11 26 18 26C25 26 29 29 29 34"
            fill="#115E59"
          />
        </svg>
      ) : (
        // Man Face Vector Icon (Clean Stylized Saudi/Professional Profile)
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Background subtle aura */}
          <circle cx="18" cy="18" r="17" fill="#E0F2FE" />
          {/* Ghutra / Headdress / Hair contour */}
          <path
            d="M9 19C9 12 12.5 8 18 8C23.5 8 27 12 27 19C27 25 24 30 22 34H14C12 30 9 25 9 19Z"
            fill="#1E293B"
          />
          {/* Face */}
          <ellipse cx="18" cy="18" rx="5.5" ry="6.5" fill="#FED7AA" />
          {/* Features / Beard & mustache accent */}
          <path
            d="M15 19.5C16 20.2 17 20.5 18 20.5C19 20.5 20 20.2 21 19.5C21 22 19.8 23.5 18 23.5C16.2 23.5 15 22 15 19.5Z"
            fill="#334155"
          />
          {/* Headband / Agal contour */}
          <ellipse cx="18" cy="10" rx="6" ry="1.8" stroke="#0F172A" strokeWidth="1.6" fill="none" />
          {/* Shoulders */}
          <path
            d="M8 34C8 28.5 12 26 18 26C24 26 28 28.5 28 34"
            fill="#3B82F6"
          />
        </svg>
      )}
    </div>
  );
};
