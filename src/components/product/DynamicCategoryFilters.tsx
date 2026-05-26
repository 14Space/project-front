import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { api } from '../../api';
import { getBilingualText } from '../../utils/bilingual';
import Checkbox from '../ui/Checkbox';

interface DynamicCategoryFiltersProps {
  categoryName: string;
  selectedFilters: Record<number, string[]>;
  onFilterChange: (filters: Record<number, string[]>) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  hasBorder?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true, hasBorder = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ 
      borderBottom: hasBorder ? '1px solid var(--border-color)' : 'none', 
      paddingTop: '20px',
      paddingBottom: hasBorder ? '20px' : '0'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: 'var(--text-color)',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1.4,
          textAlign: 'left',
          cursor: 'pointer',
          padding: 0
        }}
      >
        {title}
        <div style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'flex' }}>
          <ChevronDown size={18} />
        </div>
      </button>
      {isOpen && <div style={{ marginTop: '20px' }}>{children}</div>}
    </div>
  );
};

export default function DynamicCategoryFilters({
  categoryName,
  selectedFilters,
  onFilterChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange
}: DynamicCategoryFiltersProps) {
  const { t, i18n } = useTranslation();
  const [attributes, setAttributes] = useState<{ id: number; name: string; options: string[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch categories to find the ID
        const cats = await api.get('/Categories');
        const cat = cats.find((c: any) => c.name.toLowerCase() === categoryName.toLowerCase());
        
        if (cat) {
          // 2. Fetch attributes for this category
          const attrs = await api.get(`/Attributes?categoryId=${cat.id}`);
          
          // Filter out old non-bilingual attributes if a bilingual version exists
          const filteredAttrs = attrs.filter((attr: any, _index: number, self: any[]) => {
            if (!attr.name.includes(' / ')) {
              const ruName = attr.name.trim().toLowerCase();
              const hasBilingual = self.some(a => a.id !== attr.id && a.name.includes(' / ') && a.name.split(' / ')[0].trim().toLowerCase() === ruName);
              if (hasBilingual) return false;
            }
            return true;
          });
          
          setAttributes(filteredAttrs);
        }
      } catch (err) {
        console.error('Failed to load attributes', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAttributes();
  }, [categoryName]);

  // Track which subcategory URL value we've already applied, to avoid re-applying on every re-render
  const appliedSubcategoryRef = useRef<string | null>(undefined as any);

  // Sync subcategory URL parameter with the checkbox — only on first attributes load or URL change
  useEffect(() => {
    if (attributes.length === 0) return;

    // If we already applied this exact subcategory value, do nothing
    if (appliedSubcategoryRef.current === subcategory) return;
    appliedSubcategoryRef.current = subcategory;

    // Find the subcategory attribute (if any)
    const subcatAttr = attributes.find(attr => {
      const name = attr.name.toLowerCase();
      return name.includes('подкатегори') || name.includes('subcategory') || name.includes('subcategories');
    });

    if (!subcatAttr) return;

    if (subcategory) {
      // Find the matching option
      const matchingOption = subcatAttr.options?.find(opt => {
        const ruPart = getBilingualText(opt, 'ru').toLowerCase();
        const enPart = getBilingualText(opt, 'en').toLowerCase();
        const searchSubcat = subcategory.toLowerCase();
        
        return ruPart === searchSubcat || 
               enPart === searchSubcat || 
               opt.toLowerCase() === searchSubcat ||
               ruPart.includes(searchSubcat) ||
               enPart.includes(searchSubcat) ||
               searchSubcat.includes(ruPart) ||
               searchSubcat.includes(enPart);
      });

      if (matchingOption) {
        onFilterChange({
          [subcatAttr.id]: [matchingOption]
        });
      }
    } else {
      // subcategory param is absent — start with empty filters
      onFilterChange({});
    }
  }, [subcategory, attributes]);

  const handleOptionToggle = (attrId: number, optionValue: string) => {
    const currentSelected = selectedFilters[attrId] || [];
    const newSelected = currentSelected.includes(optionValue)
      ? currentSelected.filter(v => v !== optionValue)
      : [...currentSelected, optionValue];
      
    onFilterChange({
      ...selectedFilters,
      [attrId]: newSelected
    });
  };

  const isDefaultOpen = (title: string) => {
    const lower = title.toLowerCase();
    return (
      lower.includes('подкатегори') ||
      lower.includes('subcategory') ||
      lower.includes('subcategories') ||
      lower.includes('производител') ||
      lower.includes('бренд') ||
      lower.includes('brand') ||
      lower.includes('brands')
    );
  };

  return (
    <div style={{
      backgroundColor: '#0c0d0d',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      color: 'var(--text-color)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 700, 
        lineHeight: 1,
        paddingBottom: '12px', 
        borderBottom: '1px solid var(--border-color)',
        margin: 0
      }}>{t('filters.title')}</div>

      {/* Цена */}
      <FilterSection title={t('filters.price')} defaultOpen={true}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder={t('filters.from')} 
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value.replace(/\D/g, ''))}
            style={{ 
              width: '100%', 
              backgroundColor: '#1a1a1a', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px', 
              padding: '8px 12px', 
              color: '#fff',
              fontSize: '14px'
            }} 
          />
          <span style={{ color: 'var(--text-secondary)' }}>–</span>
          <input 
            type="text" 
            placeholder={t('filters.to')} 
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value.replace(/\D/g, ''))}
            style={{ 
              width: '100%', 
              backgroundColor: '#1a1a1a', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px', 
              padding: '8px 12px', 
              color: '#fff',
              fontSize: '14px'
            }} 
          />
        </div>
      </FilterSection>

      {isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Загрузка фильтров...</div>
      ) : (
        attributes.map((attr, index) => {
          const titleText = getBilingualText(attr.name, i18n.language);
          return (
            <FilterSection 
              key={attr.id} 
              title={titleText}
              defaultOpen={isDefaultOpen(titleText)}
              hasBorder={index < attributes.length - 1}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {attr.options?.map((option, idx) => (
                  <Checkbox 
                    key={idx}
                    label={getBilingualText(option, i18n.language)}
                    checked={(selectedFilters[attr.id] || []).includes(option)}
                    onChange={() => handleOptionToggle(attr.id, option)}
                  />
                ))}
              </div>
            </FilterSection>
          );
        })
      )}
    </div>
  );
}

