export interface CalculatorInput {
  name: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
}

export interface BenchmarkZone {
  threshold: number;
  color: 'success' | 'warning' | 'error';
  label: string;
  feedback: string;
}

export interface Metric {
  id: string;
  name: string;
  iconName: string;
  shortDescription: string;
  definition: string;
  whyItMatters: string;
  formula: string;
  formulaPlain: string;
  sampleCalculation: {
    description: string;
    steps: string[];
  };
  calculator: {
    inputs: CalculatorInput[];
    calculateFn: (inputs: Record<string, number>) => number;
    formatResult: (result: number) => string;
    getBenchmark: (result: number) => BenchmarkZone;
  };
  tips: string[];
  commonMistakes: string[];
  hasChart?: boolean;
  chartType?: 'line' | 'bar' | 'gauge';
}

export const TOOLTIPS: Record<string, string> = {
  'COGS': 'Cost of Goods Sold: The direct costs of producing the goods or services you sell',
  'Variable costs': 'Costs that change in proportion to your business activity (e.g., materials, shipping)',
  'Fixed costs': 'Costs that stay the same regardless of business activity (e.g., rent, salaries)',
  'Churn': 'The rate at which customers stop using your product or service',
  'Expansion revenue': 'Additional revenue from existing customers through upgrades or add-ons',
  'Upsell': 'Selling a more expensive version or add-ons to existing customers',
  'Downsell': 'When customers downgrade to a cheaper plan',
  'ARR': 'Annual Recurring Revenue: The yearly value of recurring subscriptions',
  'MRR': 'Monthly Recurring Revenue: The monthly value of recurring subscriptions',
  'CAC Payback Period': 'How long it takes to recover the cost of acquiring a customer',
  'Gross profit': 'Revenue minus the direct costs of producing your product/service',
  'Net profit': 'Total revenue minus all expenses (both direct and indirect)',
  'SaaS': 'Software as a Service: Software delivered online as a subscription',
  'Unit economics': 'The revenue and costs associated with a single unit of your business'
};

export const METRICS: Metric[] = [
  {
    id: 'mrr',
    name: 'Monthly Recurring Revenue (MRR)',
    iconName: 'TrendingUp',
    shortDescription: 'Predictable monthly revenue from subscriptions',
    definition: 'MRR is the predictable revenue your business expects to receive every month from subscriptions. It\'s like a financial heartbeat that shows the health of your recurring revenue stream.',
    whyItMatters: 'Investors and founders track MRR because it provides a clear, consistent measure of business growth. Unlike one-time sales, MRR shows sustainable, predictable revenue that compounds over time. A healthy MRR growth rate (15-20% month-over-month for early-stage startups) signals strong product-market fit.',
    formula: 'MRR = Number of Customers × Average Revenue Per Customer',
    formulaPlain: 'Monthly Recurring Revenue equals the number of paying customers multiplied by the average monthly revenue per customer',
    sampleCalculation: {
      description: 'A SaaS company has 200 customers paying an average of $50/month',
      steps: [
        'Number of customers: 200',
        'Average revenue per customer: $50',
        'MRR = 200 × $50 = $10,000/month'
      ]
    },
    calculator: {
      inputs: [
        { name: 'customers', label: 'Number of Customers', min: 0, max: 10000, step: 1, defaultValue: 200 },
        { name: 'avgRevenue', label: 'Avg Monthly Revenue per Customer', unit: '$', min: 0, max: 1000, step: 1, defaultValue: 50, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.customers * inputs.avgRevenue,
      formatResult: (result) => `$${result.toLocaleString()}`,
      getBenchmark: (result) => {
        if (result >= 100000) return { threshold: 100000, color: 'success', label: 'Excellent', feedback: 'Strong MRR! You\'re at a scale that attracts serious investor attention.' };
        if (result >= 10000) return { threshold: 10000, color: 'success', label: 'Good', feedback: 'Healthy MRR showing solid traction and growth potential.' };
        if (result >= 1000) return { threshold: 1000, color: 'warning', label: 'Early Stage', feedback: 'Promising start - focus on consistent growth and retention.' };
        return { threshold: 0, color: 'error', label: 'Getting Started', feedback: 'Keep building! Focus on acquiring and retaining customers.' };
      }
    },
    tips: [
      'Track MRR growth rate monthly - aim for 15-20% MoM growth in early stages',
      'Break down MRR into New, Expansion, and Churned MRR for deeper insights',
      'Focus on increasing MRR through both new customers and existing customer expansion',
      'SaaS companies should aim for $100K MRR before Series A fundraising',
      'Pay attention to MRR composition - recurring revenue is more valuable than one-time fees'
    ],
    commonMistakes: [
      'Including one-time fees or setup charges in MRR calculations',
      'Not accounting for annual contracts properly (divide by 12 for MRR)',
      'Forgetting to subtract churned MRR when calculating net new MRR',
      'Mixing different billing cycles without normalizing to monthly'
    ],
    hasChart: true,
    chartType: 'line'
  },
  {
    id: 'arr',
    name: 'Annual Recurring Revenue (ARR)',
    iconName: 'DollarSign',
    shortDescription: 'Yearly value of recurring subscriptions',
    definition: 'ARR is the yearly value of your recurring revenue streams, normalized to an annual figure. It\'s MRR multiplied by 12, representing the annual commitment value of your subscription base.',
    whyItMatters: 'ARR is the standard metric for reporting SaaS business size. VCs use ARR milestones ($1M, $10M, $100M) to evaluate company stage and funding rounds. It provides a clearer picture of business scale than MRR and is essential for long-term financial planning.',
    formula: 'ARR = MRR × 12',
    formulaPlain: 'Annual Recurring Revenue equals Monthly Recurring Revenue multiplied by 12',
    sampleCalculation: {
      description: 'If your MRR is $50,000',
      steps: [
        'MRR: $50,000',
        'ARR = $50,000 × 12',
        'ARR = $600,000'
      ]
    },
    calculator: {
      inputs: [
        { name: 'mrr', label: 'Monthly Recurring Revenue (MRR)', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 50000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.mrr * 12,
      formatResult: (result) => `$${result.toLocaleString()}`,
      getBenchmark: (result) => {
        if (result >= 10000000) return { threshold: 10000000, color: 'success', label: 'Scale Stage', feedback: 'Excellent! You\'re at Series B/C scale with strong market position.' };
        if (result >= 1000000) return { threshold: 1000000, color: 'success', label: 'Growth Stage', feedback: 'Great milestone! You\'ve proven product-market fit at scale.' };
        if (result >= 100000) return { threshold: 100000, color: 'warning', label: 'Early Growth', feedback: 'Good progress - focus on scaling sales and marketing efficiently.' };
        return { threshold: 0, color: 'error', label: 'Early Stage', feedback: 'Keep growing! Work towards the $1M ARR milestone for Series A.' };
      }
    },
    tips: [
      '$1M ARR is typically the minimum for Series A fundraising',
      '$10M ARR often indicates readiness for Series B',
      'Track ARR growth rate - best-in-class SaaS companies triple ARR year-over-year',
      'Use ARR for annual planning and investor communications, MRR for operational metrics',
      'Consider ARR per employee as an efficiency metric (aim for $150K-$200K)'
    ],
    commonMistakes: [
      'Confusing ARR with actual revenue collected (ARR is a forward-looking metric)',
      'Including non-recurring revenue in ARR calculations',
      'Not adjusting for known upcoming churn in ARR projections',
      'Mixing annual and monthly contracts without proper normalization'
    ],
    hasChart: true,
    chartType: 'line'
  },
  {
    id: 'burn-rate',
    name: 'Burn Rate',
    iconName: 'Flame',
    shortDescription: 'Monthly cash spend rate',
    definition: 'Burn rate is the amount of cash your company spends each month. It\'s the speed at which you\'re using up your cash reserves, typically expressed as a negative number showing monthly cash outflow.',
    whyItMatters: 'Burn rate determines how long your startup can survive before running out of money. Investors closely monitor burn rate to assess operational efficiency and runway. High burn is acceptable if it drives proportional growth, but unsustainable burn is a red flag.',
    formula: 'Burn Rate = Monthly Expenses - Monthly Revenue',
    formulaPlain: 'Monthly burn rate equals your total monthly expenses minus monthly revenue',
    sampleCalculation: {
      description: 'A startup spends $100K/month with $30K revenue',
      steps: [
        'Monthly expenses: $100,000',
        'Monthly revenue: $30,000',
        'Burn Rate = $100,000 - $30,000 = $70,000/month'
      ]
    },
    calculator: {
      inputs: [
        { name: 'expenses', label: 'Monthly Expenses', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'revenue', label: 'Monthly Revenue', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 30000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.expenses - inputs.revenue,
      formatResult: (result) => `$${result.toLocaleString()}/month`,
      getBenchmark: (result) => {
        const ratio = result / 100000;
        if (ratio <= 0.3) return { threshold: 30000, color: 'success', label: 'Low Burn', feedback: 'Excellent capital efficiency! You\'re managing expenses well.' };
        if (ratio <= 0.7) return { threshold: 70000, color: 'warning', label: 'Moderate Burn', feedback: 'Manageable burn - ensure it\'s driving proportional growth.' };
        return { threshold: 70001, color: 'error', label: 'High Burn', feedback: 'High burn rate - focus on path to profitability or ensure funding runway is sufficient.' };
      }
    },
    tips: [
      'Track gross burn (total spend) and net burn (spend minus revenue) separately',
      'Reduce burn by 25-30% when approaching 6 months of runway remaining',
      'Aim for burn that supports 3x revenue growth year-over-year',
      'Keep burn predictable - avoid large month-to-month variations',
      'Benchmark: Enterprise SaaS should aim for 2-3x burn-to-ARR ratio'
    ],
    commonMistakes: [
      'Not accounting for irregular expenses like annual software licenses',
      'Ignoring upcoming hires or expense increases in burn projections',
      'Confusing cash burn with accounting losses (use actual cash flow)',
      'Not separating one-time expenses from recurring monthly burn'
    ],
    hasChart: true,
    chartType: 'gauge'
  },
  {
    id: 'runway',
    name: 'Runway',
    iconName: 'Plane',
    shortDescription: 'Months of cash remaining',
    definition: 'Runway is the number of months your company can operate before running out of cash, based on your current burn rate and cash balance. It\'s your financial lifeline.',
    whyItMatters: 'Runway determines when you need to raise funding or reach profitability. Investors want to see at least 12-18 months of runway. Running out of runway forces difficult decisions like layoffs or fire sales. Smart founders start fundraising when they have 6+ months remaining.',
    formula: 'Runway = Cash Balance ÷ Monthly Burn Rate',
    formulaPlain: 'Runway in months equals your current cash balance divided by monthly burn rate',
    sampleCalculation: {
      description: 'Company has $500K cash with $50K/month burn',
      steps: [
        'Cash balance: $500,000',
        'Monthly burn rate: $50,000',
        'Runway = $500,000 ÷ $50,000 = 10 months'
      ]
    },
    calculator: {
      inputs: [
        { name: 'cash', label: 'Cash Balance', unit: '$', min: 0, max: 10000000, step: 10000, defaultValue: 500000, prefix: '$' },
        { name: 'burn', label: 'Monthly Burn Rate', unit: '$', min: 1, max: 500000, step: 1000, defaultValue: 50000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.cash / inputs.burn,
      formatResult: (result) => `${result.toFixed(1)} months`,
      getBenchmark: (result) => {
        if (result >= 18) return { threshold: 18, color: 'success', label: 'Healthy', feedback: 'Excellent runway! You have plenty of time to execute and grow.' };
        if (result >= 12) return { threshold: 12, color: 'success', label: 'Good', feedback: 'Solid runway. Consider starting fundraising conversations soon.' };
        if (result >= 6) return { threshold: 6, color: 'warning', label: 'Caution', feedback: 'Start fundraising now! 6 months is the minimum safe runway.' };
        return { threshold: 0, color: 'error', label: 'Critical', feedback: 'Critical! Take immediate action: cut costs, raise emergency funding, or pivot to revenue.' };
      }
    },
    tips: [
      'Maintain 12-18 months runway minimum; start fundraising at 6 months',
      'Build a 13-week cash flow forecast to track runway precisely',
      'Account for seasonal revenue variations in runway calculations',
      'Have a plan to extend runway by 30-40% through cost cuts if needed',
      'Consider runway extension through revenue growth, not just fundraising'
    ],
    commonMistakes: [
      'Not accounting for upcoming large expenses or seasonal variations',
      'Assuming revenue will stay flat when calculating runway',
      'Forgetting about the 3-6 month fundraising timeline',
      'Not having a contingency plan when runway drops below 9 months'
    ],
    hasChart: true,
    chartType: 'gauge'
  },
  {
    id: 'cac',
    name: 'Customer Acquisition Cost (CAC)',
    iconName: 'Target',
    shortDescription: 'Cost to acquire one customer',
    definition: 'CAC is the total cost of acquiring a new customer, including all sales and marketing expenses. It measures how efficiently you can acquire customers and is fundamental to understanding unit economics.',
    whyItMatters: 'CAC determines if your business model is sustainable. If CAC is too high relative to customer lifetime value, your business loses money on each customer. Investors scrutinize CAC because it reveals sales efficiency and scalability potential.',
    formula: 'CAC = (Sales + Marketing Costs) ÷ Number of New Customers',
    formulaPlain: 'Customer Acquisition Cost equals total sales and marketing expenses divided by the number of new customers acquired in that period',
    sampleCalculation: {
      description: 'Company spends $50K on sales/marketing and acquires 100 customers',
      steps: [
        'Sales & Marketing costs: $50,000',
        'New customers acquired: 100',
        'CAC = $50,000 ÷ 100 = $500 per customer'
      ]
    },
    calculator: {
      inputs: [
        { name: 'marketing', label: 'Sales & Marketing Costs', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 50000, prefix: '$' },
        { name: 'customers', label: 'New Customers Acquired', min: 1, max: 10000, step: 1, defaultValue: 100 }
      ],
      calculateFn: (inputs) => inputs.marketing / inputs.customers,
      formatResult: (result) => `$${result.toLocaleString()}`,
      getBenchmark: (result) => {
        if (result <= 200) return { threshold: 200, color: 'success', label: 'Efficient', feedback: 'Excellent CAC! You have efficient acquisition channels.' };
        if (result <= 500) return { threshold: 500, color: 'success', label: 'Good', feedback: 'Healthy CAC. Ensure LTV is at least 3x this number.' };
        if (result <= 1000) return { threshold: 1000, color: 'warning', label: 'High', feedback: 'CAC is elevated. Focus on improving conversion rates and channel efficiency.' };
        return { threshold: 1001, color: 'error', label: 'Very High', feedback: 'CAC is too high. Revisit your acquisition strategy and channel mix.' };
      }
    },
    tips: [
      'Include all sales and marketing costs: salaries, tools, ads, events, content',
      'Calculate CAC by channel to identify most efficient acquisition sources',
      'Aim for CAC payback period under 12 months',
      'Track CAC trend over time - should decrease as you optimize',
      'B2B SaaS CAC is typically $200-$500, Enterprise can be $5K-$50K+'
    ],
    commonMistakes: [
      'Excluding sales team salaries and overhead from CAC calculations',
      'Not accounting for marketing tools, agencies, and software costs',
      'Calculating CAC over too short a period (use at least quarterly data)',
      'Forgetting that CAC naturally increases as you move upmarket or expand'
    ]
  },
  {
    id: 'ltv',
    name: 'Lifetime Value (LTV)',
    iconName: 'Gem',
    shortDescription: 'Total revenue from a customer',
    definition: 'LTV is the total revenue you expect to earn from a customer over their entire relationship with your company. It represents the long-term value of each customer acquisition.',
    whyItMatters: 'LTV determines how much you can afford to spend on customer acquisition. A healthy LTV:CAC ratio (3:1 or higher) indicates sustainable growth. LTV is crucial for understanding true profitability and justifying marketing spend.',
    formula: 'LTV = (Average Revenue Per Customer ÷ Churn Rate)',
    formulaPlain: 'Lifetime Value equals average monthly revenue per customer divided by monthly churn rate',
    sampleCalculation: {
      description: 'Average customer pays $100/month with 5% monthly churn',
      steps: [
        'Average revenue per customer: $100/month',
        'Monthly churn rate: 5% (0.05)',
        'LTV = $100 ÷ 0.05 = $2,000'
      ]
    },
    calculator: {
      inputs: [
        { name: 'avgRevenue', label: 'Avg Monthly Revenue per Customer', unit: '$', min: 0, max: 1000, step: 10, defaultValue: 100, prefix: '$' },
        { name: 'churnRate', label: 'Monthly Churn Rate', unit: '%', min: 0.1, max: 50, step: 0.1, defaultValue: 5, suffix: '%' }
      ],
      calculateFn: (inputs) => inputs.avgRevenue / (inputs.churnRate / 100),
      formatResult: (result) => `$${result.toLocaleString()}`,
      getBenchmark: (result) => {
        if (result >= 5000) return { threshold: 5000, color: 'success', label: 'Excellent', feedback: 'Strong LTV! Your customers are highly valuable.' };
        if (result >= 2000) return { threshold: 2000, color: 'success', label: 'Good', feedback: 'Healthy LTV. Ensure CAC is under $667 for good unit economics.' };
        if (result >= 500) return { threshold: 500, color: 'warning', label: 'Moderate', feedback: 'Decent LTV. Focus on reducing churn and increasing revenue per customer.' };
        return { threshold: 0, color: 'error', label: 'Low', feedback: 'Low LTV is concerning. Work on retention and pricing strategy.' };
      }
    },
    tips: [
      'Increase LTV by reducing churn and expanding existing customer revenue',
      'Calculate LTV separately for different customer segments',
      'Include expansion revenue from upsells in LTV calculations',
      'Track LTV trends cohort-by-cohort to spot improvements',
      'Consider using 3-year LTV for more conservative planning'
    ],
    commonMistakes: [
      'Using overall churn instead of cohort-specific churn rates',
      'Not including expansion revenue from upsells and cross-sells',
      'Calculating LTV on too small a sample size (wait for statistical significance)',
      'Ignoring gross margin when calculating LTV (should use gross profit LTV)'
    ]
  },
  {
    id: 'ltv-cac-ratio',
    name: 'LTV:CAC Ratio',
    iconName: 'Scale',
    shortDescription: 'Unit economics health indicator',
    definition: 'The LTV:CAC ratio compares the lifetime value of a customer to the cost of acquiring them. It\'s the gold standard metric for assessing business model sustainability and unit economics health.',
    whyItMatters: 'This ratio tells you if your business makes financial sense. A 3:1 ratio or higher indicates healthy unit economics where customers generate 3x more value than they cost to acquire. Below 1:1 means you\'re losing money on each customer.',
    formula: 'LTV:CAC Ratio = Customer Lifetime Value ÷ Customer Acquisition Cost',
    formulaPlain: 'LTV to CAC ratio equals lifetime value divided by customer acquisition cost',
    sampleCalculation: {
      description: 'LTV is $3,000 and CAC is $1,000',
      steps: [
        'Customer Lifetime Value: $3,000',
        'Customer Acquisition Cost: $1,000',
        'LTV:CAC = $3,000 ÷ $1,000 = 3:1'
      ]
    },
    calculator: {
      inputs: [
        { name: 'ltv', label: 'Lifetime Value (LTV)', unit: '$', min: 0, max: 50000, step: 100, defaultValue: 3000, prefix: '$' },
        { name: 'cac', label: 'Customer Acquisition Cost (CAC)', unit: '$', min: 1, max: 20000, step: 50, defaultValue: 1000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.ltv / inputs.cac,
      formatResult: (result) => `${result.toFixed(1)}:1`,
      getBenchmark: (result) => {
        if (result >= 3) return { threshold: 3, color: 'success', label: 'Excellent', feedback: 'Excellent! Your unit economics are healthy and sustainable.' };
        if (result >= 1.5) return { threshold: 1.5, color: 'warning', label: 'Acceptable', feedback: 'Acceptable for early stage, but aim for 3:1 or better long-term.' };
        return { threshold: 0, color: 'error', label: 'Poor', feedback: 'Warning: You\'re spending too much to acquire customers relative to their value.' };
      }
    },
    tips: [
      'Target 3:1 or higher for sustainable SaaS businesses',
      'Above 5:1 might indicate under-investment in growth',
      'Calculate ratio using same time period for both LTV and CAC',
      'Track this ratio by customer segment and acquisition channel',
      'Improve ratio by increasing LTV (reduce churn) or decreasing CAC (better conversion)'
    ],
    commonMistakes: [
      'Comparing gross LTV to CAC instead of using profit margins',
      'Not accounting for the time value of money in long payback periods',
      'Using blended CAC instead of channel-specific CAC for decisions',
      'Celebrating a high ratio that comes from under-spending on growth'
    ],
    hasChart: true,
    chartType: 'bar'
  },
  {
    id: 'churn-rate',
    name: 'Churn Rate',
    iconName: 'TrendingDown',
    shortDescription: 'Customer loss percentage',
    definition: 'Churn rate is the percentage of customers who stop using your product or service during a given time period. It\'s the opposite of retention and a critical indicator of product-market fit.',
    whyItMatters: 'High churn kills growth because you\'re constantly replacing lost customers instead of growing. For subscription businesses, reducing churn from 5% to 3% monthly can double your growth rate. Investors view low churn as proof of product value and sticky customers.',
    formula: 'Churn Rate = (Customers Lost ÷ Starting Customers) × 100',
    formulaPlain: 'Monthly churn rate equals customers lost during the month divided by customers at start of month, times 100',
    sampleCalculation: {
      description: 'Started month with 200 customers, lost 10',
      steps: [
        'Customers at start: 200',
        'Customers lost: 10',
        'Churn Rate = (10 ÷ 200) × 100 = 5%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'starting', label: 'Customers at Start of Month', min: 1, max: 100000, step: 1, defaultValue: 200 },
        { name: 'lost', label: 'Customers Lost', min: 0, max: 50000, step: 1, defaultValue: 10 }
      ],
      calculateFn: (inputs) => (inputs.lost / inputs.starting) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result <= 2) return { threshold: 2, color: 'success', label: 'Excellent', feedback: 'Excellent retention! Your customers love your product.' };
        if (result <= 5) return { threshold: 5, color: 'warning', label: 'Acceptable', feedback: 'Acceptable for early-stage, but work on improving retention.' };
        return { threshold: 5.1, color: 'error', label: 'High', feedback: 'High churn - focus on retention before scaling acquisition.' };
      }
    },
    tips: [
      'Aim for under 2% monthly churn for consumer SaaS, under 1% for enterprise',
      'Calculate churn cohort-by-cohort to identify trends',
      'Track both customer churn and revenue churn separately',
      'Focus on the first 90 days - most churn happens early',
      'Negative revenue churn (from expansion) is the holy grail'
    ],
    commonMistakes: [
      'Calculating churn on too small a sample size (leads to high variance)',
      'Not distinguishing between voluntary churn (left) and involuntary (payment failed)',
      'Ignoring logo churn vs revenue churn (losing small customers matters less)',
      'Not investigating why customers churn through exit interviews'
    ],
    hasChart: true,
    chartType: 'line'
  },
  {
    id: 'nrr',
    name: 'Net Revenue Retention (NRR)',
    iconName: 'BarChart3',
    shortDescription: 'Revenue growth from existing customers',
    definition: 'NRR measures the percentage of recurring revenue retained from existing customers, including expansions, upsells, and downgrades. An NRR over 100% means your existing customers are growing in value.',
    whyItMatters: 'NRR is the single best predictor of SaaS success. Companies with 120%+ NRR can grow significantly even without new customer acquisition. It proves product stickiness and expansion potential. Public SaaS companies with high NRR trade at premium valuations.',
    formula: 'NRR = ((Starting MRR + Expansion - Churn - Contraction) ÷ Starting MRR) × 100',
    formulaPlain: 'Net Revenue Retention equals starting recurring revenue plus expansion minus churned and downgraded revenue, divided by starting revenue, times 100',
    sampleCalculation: {
      description: 'Started with $100K MRR, +$30K expansion, -$10K churn',
      steps: [
        'Starting MRR: $100,000',
        'Expansion revenue: +$30,000',
        'Churned revenue: -$10,000',
        'NRR = (($100K + $30K - $10K) ÷ $100K) × 100 = 120%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'starting', label: 'Starting MRR', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'expansion', label: 'Expansion Revenue', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 30000, prefix: '$' },
        { name: 'churn', label: 'Churned Revenue', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 10000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.starting + inputs.expansion - inputs.churn) / inputs.starting) * 100,
      formatResult: (result) => `${result.toFixed(0)}%`,
      getBenchmark: (result) => {
        if (result >= 120) return { threshold: 120, color: 'success', label: 'Excellent', feedback: 'Exceptional! Your product has strong expansion and retention.' };
        if (result >= 100) return { threshold: 100, color: 'success', label: 'Good', feedback: 'Solid NRR. You\'re retaining and growing existing customer revenue.' };
        if (result >= 85) return { threshold: 85, color: 'warning', label: 'Fair', feedback: 'Acceptable but focus on expansion and reducing churn.' };
        return { threshold: 0, color: 'error', label: 'Poor', feedback: 'Low NRR indicates retention and expansion challenges.' };
      }
    },
    tips: [
      'Best-in-class SaaS companies achieve 120%+ NRR',
      'NRR over 100% means you can grow without new customer acquisition',
      'Focus on expansion revenue through upsells, cross-sells, and usage-based pricing',
      'Track NRR monthly and investigate dips immediately',
      'Enterprise SaaS typically has higher NRR than SMB SaaS'
    ],
    commonMistakes: [
      'Including new customer revenue in NRR calculations',
      'Not tracking expansion, contraction, and churn separately',
      'Calculating NRR on too short a time period (use annual cohorts)',
      'Confusing gross retention (without expansion) with net retention'
    ]
  },
  {
    id: 'gross-margin',
    name: 'Gross Margin',
    iconName: 'Banknote',
    shortDescription: 'Profit after direct costs',
    definition: 'Gross margin is the percentage of revenue remaining after subtracting the direct costs of delivering your product or service (COGS). It shows how efficiently you deliver value to customers.',
    whyItMatters: 'Gross margin determines how much money is available for sales, marketing, R&D, and operations. SaaS companies should have 70-90% gross margins. Lower margins limit growth potential and reduce company valuation. Investors use gross margin to assess scalability.',
    formula: 'Gross Margin = ((Revenue - COGS) ÷ Revenue) × 100',
    formulaPlain: 'Gross margin percentage equals revenue minus cost of goods sold, divided by revenue, times 100',
    sampleCalculation: {
      description: 'Revenue is $100K, COGS is $20K',
      steps: [
        'Revenue: $100,000',
        'Cost of Goods Sold: $20,000',
        'Gross Profit = $100K - $20K = $80K',
        'Gross Margin = ($80K ÷ $100K) × 100 = 80%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'revenue', label: 'Total Revenue', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'cogs', label: 'Cost of Goods Sold (COGS)', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 20000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.revenue - inputs.cogs) / inputs.revenue) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result >= 70) return { threshold: 70, color: 'success', label: 'Excellent', feedback: 'Strong gross margin! Typical for healthy SaaS businesses.' };
        if (result >= 50) return { threshold: 50, color: 'warning', label: 'Moderate', feedback: 'Decent margin but work on reducing COGS for better scalability.' };
        return { threshold: 0, color: 'error', label: 'Low', feedback: 'Low margin limits growth. Focus on pricing and cost efficiency.' };
      }
    },
    tips: [
      'SaaS should target 70-90% gross margin',
      'Hardware/marketplace businesses typically have 30-50% margins',
      'Include hosting, support, and delivery costs in COGS',
      'Gross margin should improve as you scale due to efficiency gains',
      'Higher margins allow for more aggressive growth investment'
    ],
    commonMistakes: [
      'Including sales and marketing costs in COGS (they\'re operating expenses)',
      'Not accounting for customer support and success costs',
      'Forgetting to include payment processing fees and hosting costs',
      'Not tracking margin by customer segment or product line'
    ]
  },
  {
    id: 'contribution-margin',
    name: 'Contribution Margin',
    iconName: 'Sliders',
    shortDescription: 'Profit after variable costs',
    definition: 'Contribution margin is revenue minus variable costs - the amount each sale contributes to covering fixed costs and generating profit. It\'s more comprehensive than gross margin as it includes variable operating expenses.',
    whyItMatters: 'Contribution margin shows true unit economics because it includes all variable costs like sales commissions and marketing. It helps determine breakeven points and pricing strategies. Positive contribution margin means each additional customer improves profitability.',
    formula: 'Contribution Margin = ((Revenue - Variable Costs) ÷ Revenue) × 100',
    formulaPlain: 'Contribution margin equals revenue minus all variable costs, divided by revenue, times 100',
    sampleCalculation: {
      description: 'Revenue $100K, COGS $20K, variable sales/marketing $30K',
      steps: [
        'Revenue: $100,000',
        'COGS: $20,000',
        'Variable sales/marketing: $30,000',
        'Total variable costs: $50,000',
        'Contribution Margin = (($100K - $50K) ÷ $100K) × 100 = 50%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'revenue', label: 'Revenue', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'cogs', label: 'Cost of Goods Sold', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 20000, prefix: '$' },
        { name: 'variable', label: 'Variable Sales/Marketing', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 30000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.revenue - inputs.cogs - inputs.variable) / inputs.revenue) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result >= 40) return { threshold: 40, color: 'success', label: 'Strong', feedback: 'Excellent contribution margin! Good unit economics.' };
        if (result >= 20) return { threshold: 20, color: 'warning', label: 'Moderate', feedback: 'Decent margin. Focus on reducing variable costs or increasing prices.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Low', feedback: 'Positive but low. Each sale barely covers variable costs.' };
        return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Negative margin! You lose money on each sale. Urgent action needed.' };
      }
    },
    tips: [
      'Include all variable costs: COGS, commissions, payment fees, delivery',
      'Contribution margin should be at least 30-40% for healthy SaaS',
      'Use contribution margin to set pricing and evaluate customer segments',
      'Higher contribution margin means faster path to profitability',
      'Track by product, channel, and customer type to optimize mix'
    ],
    commonMistakes: [
      'Confusing contribution margin with gross margin (missing variable costs)',
      'Including fixed costs like rent and salaries in the calculation',
      'Not accounting for all sales commissions and variable marketing spend',
      'Forgetting shipping, payment processing, and referral fees'
    ]
  },
  {
    id: 'net-profit-margin',
    name: 'Net Profit Margin',
    iconName: 'DollarSign',
    shortDescription: 'Bottom-line profitability',
    definition: 'Net profit margin is the percentage of revenue that becomes actual profit after all expenses - both variable and fixed. It\'s the ultimate measure of business profitability and efficiency.',
    whyItMatters: 'Net profit margin shows true profitability and sustainability. While startups often run at a loss during growth phase, the path to positive net margins is crucial. Public companies and mature startups are judged heavily on this metric for long-term viability.',
    formula: 'Net Profit Margin = ((Revenue - All Expenses) ÷ Revenue) × 100',
    formulaPlain: 'Net profit margin equals revenue minus all expenses including COGS, operating expenses, and overhead, divided by revenue, times 100',
    sampleCalculation: {
      description: 'Revenue $500K, COGS $100K, operating expenses $350K',
      steps: [
        'Revenue: $500,000',
        'COGS: $100,000',
        'Operating expenses: $350,000',
        'Net Profit = $500K - $100K - $350K = $50K',
        'Net Profit Margin = ($50K ÷ $500K) × 100 = 10%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'revenue', label: 'Total Revenue', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 500000, prefix: '$' },
        { name: 'cogs', label: 'Cost of Goods Sold', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'opex', label: 'Operating Expenses', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 350000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.revenue - inputs.cogs - inputs.opex) / inputs.revenue) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result >= 20) return { threshold: 20, color: 'success', label: 'Excellent', feedback: 'Outstanding profitability! Strong business fundamentals.' };
        if (result >= 10) return { threshold: 10, color: 'success', label: 'Good', feedback: 'Healthy profit margin. You\'re operating efficiently.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Breakeven', feedback: 'Breakeven or slight profit. Good for early-stage companies.' };
        return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Operating at a loss. Acceptable for growth-stage if improving quarterly.' };
      }
    },
    tips: [
      'Early-stage startups often have negative margins while growing',
      'Mature SaaS companies should target 15-25% net profit margins',
      'Track the trend - improving margins signal operational efficiency',
      'Balance profitability with growth - premature profit focus can limit scale',
      'Rule of 40: Growth rate + profit margin should exceed 40%'
    ],
    commonMistakes: [
      'Comparing net margin across different business stages (early vs mature)',
      'Not accounting for one-time expenses or revenue in calculations',
      'Ignoring the cash vs accrual difference (use cash-based for startups)',
      'Focusing only on net margin without considering growth rate'
    ]
  },
  {
    id: 'growth-rate',
    name: 'Growth Rate (MoM)',
    iconName: 'LineChart',
    shortDescription: 'Month-over-month revenue growth',
    definition: 'Month-over-month growth rate measures the percentage increase in revenue (usually MRR) from one month to the next. It\'s the primary metric for tracking business momentum.',
    whyItMatters: 'Growth rate determines your trajectory and fundraising potential. Early-stage startups should aim for 15-20% MoM growth. Sustained high growth rates prove product-market fit and attract investor attention. Declining growth rates signal problems.',
    formula: 'MoM Growth Rate = ((This Month MRR - Last Month MRR) ÷ Last Month MRR) × 100',
    formulaPlain: 'Month-over-month growth rate equals current month revenue minus previous month revenue, divided by previous month revenue, times 100',
    sampleCalculation: {
      description: 'Last month MRR was $50K, this month is $60K',
      steps: [
        'Last month MRR: $50,000',
        'This month MRR: $60,000',
        'Growth = $60K - $50K = $10K',
        'MoM Growth Rate = ($10K ÷ $50K) × 100 = 20%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'lastMonth', label: 'Last Month MRR', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 50000, prefix: '$' },
        { name: 'thisMonth', label: 'This Month MRR', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 60000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.thisMonth - inputs.lastMonth) / inputs.lastMonth) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result >= 15) return { threshold: 15, color: 'success', label: 'Excellent', feedback: 'Outstanding growth! You\'re on a strong trajectory.' };
        if (result >= 10) return { threshold: 10, color: 'success', label: 'Good', feedback: 'Solid growth rate indicating healthy business momentum.' };
        if (result >= 5) return { threshold: 5, color: 'warning', label: 'Moderate', feedback: 'Moderate growth. Look for ways to accelerate.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Slow', feedback: 'Low growth. Investigate and address growth obstacles.' };
        return { threshold: -1, color: 'error', label: 'Declining', feedback: 'Negative growth! Immediate action needed to reverse the trend.' };
      }
    },
    tips: [
      'Early-stage SaaS should aim for 15-20% MoM growth',
      'Growth naturally slows as you scale - 5-10% is good at $10M+ ARR',
      'Track growth by cohort and acquisition channel for deeper insights',
      'Compound monthly growth: 15% MoM = 5x growth annually',
      'Watch for growth vs retention tradeoff - sustainable growth requires both'
    ],
    commonMistakes: [
      'Cherry-picking exceptional months instead of showing consistent trends',
      'Not accounting for seasonality in month-over-month comparisons',
      'Confusing gross growth with net growth (must subtract churn)',
      'Celebrating growth that comes from unsustainable discounting or burn'
    ],
    hasChart: true,
    chartType: 'line'
  },
  {
    id: 'rule-of-40',
    name: 'Rule of 40',
    iconName: 'CircleDot',
    shortDescription: 'Growth + Profitability benchmark',
    definition: 'The Rule of 40 states that a healthy SaaS company\'s growth rate plus profit margin should equal or exceed 40%. It balances the tradeoff between growth and profitability.',
    whyItMatters: 'The Rule of 40 helps evaluate whether a company is balancing growth and profitability appropriately. It\'s widely used by VCs and public market investors to assess SaaS company health. Companies above 40% are considered well-balanced and valuable.',
    formula: 'Rule of 40 = YoY Revenue Growth Rate + Profit Margin',
    formulaPlain: 'Rule of 40 score equals your year-over-year revenue growth percentage plus your profit margin percentage',
    sampleCalculation: {
      description: '50% YoY growth with -10% profit margin',
      steps: [
        'Year-over-year growth rate: 50%',
        'Profit margin: -10%',
        'Rule of 40 = 50% + (-10%) = 40%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'growthRate', label: 'YoY Revenue Growth Rate', unit: '%', min: -50, max: 200, step: 1, defaultValue: 50, suffix: '%' },
        { name: 'profitMargin', label: 'Profit Margin', unit: '%', min: -100, max: 100, step: 1, defaultValue: -10, suffix: '%' }
      ],
      calculateFn: (inputs) => inputs.growthRate + inputs.profitMargin,
      formatResult: (result) => `${result.toFixed(0)}%`,
      getBenchmark: (result) => {
        if (result >= 40) return { threshold: 40, color: 'success', label: 'Excellent', feedback: 'Outstanding! You\'re balancing growth and profitability well.' };
        if (result >= 25) return { threshold: 25, color: 'warning', label: 'Fair', feedback: 'Acceptable but aim for 40%+. Optimize growth or profitability.' };
        return { threshold: 0, color: 'error', label: 'Below Target', feedback: 'Below target. You\'re either growing too slowly or burning too much cash.' };
      }
    },
    tips: [
      'Use this metric when you\'re past product-market fit and scaling',
      'Early-stage companies can be below 40% if hypergrowth justifies losses',
      'Public SaaS companies are heavily judged on Rule of 40 compliance',
      'If growth is slowing, shift focus to profitability to maintain 40%+',
      'Can substitute EBITDA margin for profit margin for more generous calculation'
    ],
    commonMistakes: [
      'Using MoM growth instead of YoY growth in the calculation',
      'Applying this rule to pre-product-market-fit startups (not relevant)',
      'Not adjusting for one-time expenses when calculating profit margin',
      'Comparing companies at vastly different scales (early vs mature)'
    ]
  },
  {
    id: 'unit-economics',
    name: 'Unit Economics',
    iconName: 'Calculator',
    shortDescription: 'Profitability per customer',
    definition: 'Unit economics examines the revenue and costs associated with a single customer or transaction. It determines if your business model is fundamentally profitable at the individual unit level before considering scale.',
    whyItMatters: 'Unit economics reveals whether your business can be profitable. Positive unit economics means each customer eventually generates more than they cost. Negative unit economics can\'t be fixed by scale - you just lose more money faster.',
    formula: 'Unit Economics = (LTV - CAC) ÷ CAC × 100',
    formulaPlain: 'Unit economics return equals lifetime value minus acquisition cost, divided by acquisition cost, times 100',
    sampleCalculation: {
      description: 'LTV is $3,000, CAC is $1,000',
      steps: [
        'Lifetime Value: $3,000',
        'Customer Acquisition Cost: $1,000',
        'Profit per customer = $3,000 - $1,000 = $2,000',
        'Unit Economics = ($2,000 ÷ $1,000) × 100 = 200% return'
      ]
    },
    calculator: {
      inputs: [
        { name: 'ltv', label: 'Lifetime Value (LTV)', unit: '$', min: 0, max: 50000, step: 100, defaultValue: 3000, prefix: '$' },
        { name: 'cac', label: 'Customer Acquisition Cost', unit: '$', min: 1, max: 20000, step: 50, defaultValue: 1000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.ltv - inputs.cac) / inputs.cac) * 100,
      formatResult: (result) => `${result.toFixed(0)}% return`,
      getBenchmark: (result) => {
        if (result >= 200) return { threshold: 200, color: 'success', label: 'Excellent', feedback: 'Excellent unit economics! Each customer is highly profitable.' };
        if (result >= 50) return { threshold: 50, color: 'warning', label: 'Acceptable', feedback: 'Positive but aim for 200%+ return on acquisition investment.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Marginal', feedback: 'Barely profitable per customer. Improve LTV or reduce CAC.' };
        return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Losing money on each customer! This can\'t be fixed with scale.' };
      }
    },
    tips: [
      'Healthy unit economics means you make at least $2 for every $1 spent on CAC',
      'Calculate separately for each customer segment and acquisition channel',
      'Include gross margin in calculations for more accurate unit economics',
      'Track payback period - how long to recover CAC from customer revenue',
      'Positive unit economics is prerequisite for scaling spend profitably'
    ],
    commonMistakes: [
      'Not including all acquisition costs (salaries, tools, overhead)',
      'Using gross revenue instead of gross profit for LTV',
      'Ignoring the time value of money in long payback scenarios',
      'Assuming unit economics will improve with scale without evidence'
    ],
    hasChart: true,
    chartType: 'bar'
  }
];

export function getMetricById(id: string): Metric | undefined {
  return METRICS.find(m => m.id === id);
}
