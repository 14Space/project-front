const fs = require('fs');
const path = require('path');

const files = ["Computers.tsx", "CPUs.tsx", "GPUs.tsx", "Laptops.tsx", "Motherboards.tsx", "RAM.tsx", "Storage.tsx"];
const dir = "c:/project-front/src/pages";

for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // We want to replace:
  // {isLoading ? (
  //   <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>Загрузка товаров...</div>
  // ) : (
  //   <ProductGrid 
  // with:
  // <ProductGrid isLoading={isLoading}

  content = content.replace(
    /\{isLoading \? \(\s*<div style=\{\{ textAlign: 'center', padding: '50px', color: '#888' \}\}>Загрузка товаров...<\/div>\s*\) : \(\s*<ProductGrid/g,
    "<ProductGrid isLoading={isLoading}"
  );

  // We also need to remove the closing `)}` of the conditional
  // It looks like:
  //           />
  //         )}
  //       </div>
  //     </div>
  //   );

  content = content.replace(
    /\s*\}\)\}\s*<\/div>\s*<\/div>\s*\);\s*\}/g,
    "\n      </div>\n    </div>\n  );\n}"
  );

  fs.writeFileSync(p, content);
  console.log("Updated", file);
}
