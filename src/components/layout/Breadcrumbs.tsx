import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbsProps {
  items: {
    label: string;
    path?: string;
    active?: boolean;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
      <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>{t('header.home') || 'Главная'}</Link>
      {items.map((item, idx) => (
        <span key={idx} style={{ display: 'flex', gap: '8px' }}>
          <span>/</span>
          {item.active ? (
            <span style={{ color: 'var(--text-color)' }}>{item.label}</span>
          ) : (
            <Link to={item.path || '#'} style={{ color: 'inherit', textDecoration: 'none' }}>{item.label}</Link>
          )}
        </span>
      ))}
    </div>
  );
}
