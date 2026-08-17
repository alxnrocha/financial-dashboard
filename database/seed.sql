-- Seed data for FinFlow B2B (MySQL 8.4 LTS)

INSERT INTO `accounts` (`id`, `name`, `type`, `bank_name`, `account_number`, `currency`, `balance`, `initial_balance`) VALUES
('acc-1', 'Silicon Valley Bank - Operating', 'checking', 'Silicon Valley Bank', '•••• 4920', 'USD', 2840500.00, 2100000.00),
('acc-2', 'JPMorgan Chase - Treasury & Yield', 'investment', 'JPMorgan Chase', '•••• 8132', 'USD', 1450000.00, 1200000.00),
('acc-3', 'Wise Global Multi-Currency', 'checking', 'Wise Enterprise', '•••• 6674', 'EUR', 529500.00, 400000.00);

INSERT INTO `cost_centers` (`id`, `code`, `name`, `color`, `manager`, `allocated_budget`, `current_spent`) VALUES
('cc-mkt', 'MKT', 'Sales & Marketing', '#3B82F6', 'Sarah Jenkins', 650000.00, 430000.00),
('cc-rd', 'RD', 'Research & Development', '#10B981', 'David Chen', 550000.00, 520000.00),
('cc-ops', 'OPS', 'Operations & Cloud Infra', '#F59E0B', 'Elena Rostova', 350000.00, 310000.00),
('cc-sales', 'SALES', 'Enterprise Direct Sales', '#EF4444', 'Marcus Vance', 400000.00, 380000.00),
('cc-ga', 'GA', 'General & Administrative', '#8B5CF6', 'Rachel Adams', 650000.00, 500000.00);

INSERT INTO `categories` (`id`, `name`, `type`, `code`, `color`, `icon`) VALUES
('cat-sub', 'SaaS Subscriptions', 'revenue', 'REV-01', '#10B981', 'Repeat'),
('cat-ent', 'Enterprise Contracts', 'revenue', 'REV-02', '#059669', 'Briefcase'),
('cat-disc', 'Sales Discounts & Rebates', 'deduction', 'DED-01', '#F87171', 'Percent'),
('cat-tax', 'Tax Deductions', 'deduction', 'DED-02', '#EF4444', 'Receipt'),
('cat-cloud', 'Cloud Infrastructure (AWS/GCP)', 'cogs', 'COGS-01', '#F59E0B', 'Cloud'),
('cat-pay', 'Payroll & Benefits', 'expense', 'OPEX-01', '#6366F1', 'Users'),
('cat-mkt-ads', 'Growth Advertising & Events', 'expense', 'OPEX-02', '#3B82F6', 'Megaphone'),
('cat-soft', 'SaaS Tooling & Licenses', 'expense', 'OPEX-03', '#8B5CF6', 'Cpu'),
('cat-legal', 'Legal & Accounting', 'expense', 'OPEX-04', '#EC4899', 'ShieldCheck');
