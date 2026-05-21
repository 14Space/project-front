import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
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
  hasBorder?: boolean;
}

const FilterSection = ({ title, children, hasBorder = true }: FilterSectionProps) => {
  return (
    <div style={{ 
      borderBottom: hasBorder ? '1px solid var(--border-color)' : 'none', 
      paddingTop: '20px',
      paddingBottom: hasBorder ? '20px' : '0'
    }}>
      <div style={{ 
        color: 'var(--text-color)',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '16px'
      }}>
        {title}
      </div>
      <div>{children}</div>
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
          setAttributes(attrs);
        }
      } catch (err) {
        console.error('Failed to load attributes', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAttributes();
  }, [categoryName]);

  // Sync subcategory URL parameter with the checkbox
  useEffect(() => {
    if (attributes.length === 0) return;

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
        return ruPart === searchSubcat || enPart === searchSubcat || opt.toLowerCase() === searchSubcat;
      });

      if (matchingOption) {
        // Only trigger update if it is not already the only selected option
        const currentSelected = selectedFilters[subcatAttr.id] || [];
        if (currentSelected.length !== 1 || currentSelected[0] !== matchingOption) {
          onFilterChange({
            ...selectedFilters,
            [subcatAttr.id]: [matchingOption]
          });
        }
      }
    } else {
      // If subcategory parameter is empty but we have selection in this subcategory attribute, clear it
      const currentSelected = selectedFilters[subcatAttr.id] || [];
      if (currentSelected.length > 0) {
        const nextFilters = { ...selectedFilters };
        delete nextFilters[subcatAttr.id];
        onFilterChange(nextFilters);
      }
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

  return (
    <div className="sidebar" style={{
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      color: 'var(--text-color)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Цена */}
      <FilterSection title={t('filters.price')} hasBorder={true}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-color)', fontSize: '14px' }}>от</span>
          <input 
            type="text" 
            placeholder="" 
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value.replace(/\D/g, ''))}
            style={{ 
              flex: 1,
              minWidth: 0,
              backgroundColor: '#111111', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px', 
              padding: '8px 12px', 
              color: '#fff',
              fontSize: '14px'
            }} 
          />
          <span style={{ color: 'var(--text-secondary)' }}>-</span>
          <span style={{ color: 'var(--text-color)', fontSize: '14px' }}>до</span>
          <input 
            type="text" 
            placeholder="" 
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value.replace(/\D/g, ''))}
            style={{ 
              flex: 1,
              minWidth: 0,
              backgroundColor: '#111111', 
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
        attributes.map((attr, index) => (
          <FilterSection 
            key={attr.id} 
            title={getBilingualText(attr.name, i18n.language)}
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
        ))
      )}
    </div>
  );
}
