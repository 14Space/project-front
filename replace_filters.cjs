const fs = require('fs');
const path = require('path');

const dir = 'c:/CODE/project-front/src/components/product';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Filters.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if missing
  if (!content.includes('useTranslation')) {
    content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from 'react-i18next';");
  }

  // Add const { t } = useTranslation(); inside the component
  const componentMatch = content.match(/export default function \w+Filters\([^)]*\) \{/);
  if (componentMatch && !content.includes('const { t } = useTranslation();')) {
    content = content.replace(componentMatch[0], componentMatch[0] + '\n  const { t } = useTranslation();');
  }

  // Replace texts
  content = content.replace(/>\s*Фильтры\s*</g, '>{t(\'filters.title\')}<');
  content = content.replace(/title="Цена"/g, 'title={t(\'filters.price\')}');
  content = content.replace(/placeholder="от"/g, 'placeholder={t(\'filters.from\')}');
  content = content.replace(/placeholder="до"/g, 'placeholder={t(\'filters.to\')}');
  content = content.replace(/title="Подкатегории"/g, 'title={t(\'filters.subcategories\')}');
  content = content.replace(/title="Производители"/g, 'title={t(\'filters.brands\')}');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done replacing common strings in ' + files.length + ' filter files.');
