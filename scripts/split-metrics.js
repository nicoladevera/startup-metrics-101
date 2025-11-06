import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the original metrics file
const metricsContent = fs.readFileSync(
  path.join(__dirname, '../shared/metrics.ts'),
  'utf-8'
);

// Extract the METRICS array content
const metricsArrayMatch = metricsContent.match(/export const METRICS: Metric\[\] = \[([\s\S]*)\];/);
if (!metricsArrayMatch) {
  console.error('Could not find METRICS array');
  process.exit(1);
}

const metricsArrayContent = metricsArrayMatch[1];

// Split into individual metric objects
// This is a simplified parser that looks for top-level object boundaries
const metrics = [];
let currentMetric = '';
let braceCount = 0;
let inMetric = false;

for (let i = 0; i < metricsArrayContent.length; i++) {
  const char = metricsArrayContent[i];

  if (char === '{' && !inMetric) {
    inMetric = true;
    braceCount = 1;
    currentMetric = '{';
  } else if (inMetric) {
    currentMetric += char;

    if (char === '{') braceCount++;
    if (char === '}') braceCount--;

    if (braceCount === 0) {
      metrics.push(currentMetric.trim());
      currentMetric = '';
      inMetric = false;
    }
  }
}

console.log(`Found ${metrics.length} metrics`);

// Extract ID from each metric
const metricIds = metrics.map(metric => {
  const idMatch = metric.match(/id:\s*['"]([^'"]+)['"]/);
  return idMatch ? idMatch[1] : null;
}).filter(Boolean);

console.log('Metric IDs:', metricIds);

// Create the metrics directory
const metricsDir = path.join(__dirname, '../shared/metrics');
if (!fs.existsSync(metricsDir)) {
  fs.mkdirSync(metricsDir, { recursive: true });
}

// Write each metric to its own file
metrics.forEach((metricContent, index) => {
  const idMatch = metricContent.match(/id:\s*['"]([^'"]+)['"]/);
  if (!idMatch) {
    console.warn(`Could not extract ID for metric ${index}`);
    return;
  }

  const id = idMatch[1];
  const fileName = `${id}.ts`;
  const filePath = path.join(metricsDir, fileName);

  const fileContent = `import type { Metric } from './types';

export const ${id.toUpperCase().replace(/-/g, '_')}_METRIC: Metric = ${metricContent};
`;

  fs.writeFileSync(filePath, fileContent);
  console.log(`✓ Created ${fileName}`);
});

// Create index.ts that exports all metrics
const indexContent = `// Auto-generated index file
export * from './types';
export { TOOLTIPS } from './tooltips';

${metricIds.map(id => `import { ${id.toUpperCase().replace(/-/g, '_')}_METRIC } from './${id}';`).join('\n')}

export const METRICS = [
${metricIds.map(id => `  ${id.toUpperCase().replace(/-/g, '_')}_METRIC`).join(',\n')}
];

export function getMetricById(id: string) {
  return METRICS.find(m => m.id === id);
}
`;

fs.writeFileSync(path.join(metricsDir, 'index.ts'), indexContent);
console.log('✓ Created index.ts');

console.log('\n✅ Successfully split metrics into individual files!');
