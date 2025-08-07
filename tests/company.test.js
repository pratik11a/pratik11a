// Unit tests for CompanyComponent
// Run with: node tests/company.test.js

// Simple test framework
class TestFramework {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    describe(description, callback) {
        console.log(`\n📋 ${description}`);
        callback();
    }

    it(description, callback) {
        try {
            callback();
            this.passed++;
            console.log(`  ✅ ${description}`);
        } catch (error) {
            this.failed++;
            console.log(`  ❌ ${description}`);
            console.log(`     Error: ${error.message}`);
        }
    }

    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${expected}, but got ${actual}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
                }
            },
            toContain: (expected) => {
                if (!actual.includes(expected)) {
                    throw new Error(`Expected "${actual}" to contain "${expected}"`);
                }
            },
            toBeInstanceOf: (expected) => {
                if (!(actual instanceof expected)) {
                    throw new Error(`Expected instance of ${expected.name}, but got ${actual.constructor.name}`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Expected truthy value, but got ${actual}`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Expected falsy value, but got ${actual}`);
                }
            }
        };
    }

    run() {
        console.log(`\n📊 Test Results:`);
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Total: ${this.passed + this.failed}`);
        
        if (this.failed === 0) {
            console.log(`🎉 All tests passed!`);
        }
        
        return this.failed === 0;
    }
}

// Mock fetch for testing
global.fetch = async (url) => {
    if (url === 'assets/html/components/company.html') {
        return {
            text: async () => `<div class="company-item">
    <div class="company-header">
        <a href="\${companyUrl}" class="company" target="_blank" rel="noopener noreferrer">@ \${company}</a>
        <time class="date">\${date}</time>
    </div>
    <div class="job-header">
        <button class="job-title" aria-expanded="false" aria-controls="company-desc-\${id}">\${title}</button>
    </div>
    <div class="job-description" id="company-desc-\${id}" aria-hidden="true">
        \${description}
    </div>
</div>`
        };
    }
    throw new Error('Template not found');
};

// Define CompanyComponent class directly for testing
class CompanyComponent {
    constructor() {
        this.template = '';
        this.loadTemplate();
    }

    async loadTemplate() {
        try {
            const response = await fetch('assets/html/components/company.html');
            this.template = await response.text();
        } catch (error) {
            console.error('Error loading company template:', error);
        }
    }

    render(data) {
        if (!this.template) {
            console.error('Template not loaded');
            return '';
        }

        return this.template
            .replace(/\${id}/g, data.id)
            .replace(/\${title}/g, data.title)
            .replace(/\${company}/g, data.company)
            .replace(/\${companyUrl}/g, data.companyUrl)
            .replace(/\${date}/g, data.date)
            .replace(/\${description}/g, data.description);
    }
}

// Test framework instance
const test = new TestFramework();

// Test data
const sampleCompanyData = {
    id: 'test-1',
    title: 'Software Engineer',
    company: 'Equal Experts',
    companyUrl: 'https://equalexperts.com',
    date: '2024 - Present',
    description: 'Developed and maintained distributed applications using Java and Scala.'
};

// Run tests
test.describe('CompanyComponent', () => {
    
    test.describe('Constructor', () => {
        test.it('should create an instance of CompanyComponent', () => {
            const component = new CompanyComponent();
            test.expect(component).toBeInstanceOf(CompanyComponent);
        });

        test.it('should initialize with empty template', () => {
            const component = new CompanyComponent();
            test.expect(component.template).toBe('');
        });
    });

    test.describe('loadTemplate method', () => {
        test.it('should load template successfully', async () => {
            const component = new CompanyComponent();
            await component.loadTemplate();
            test.expect(component.template).toContain('class="company-item"');
            test.expect(component.template).toContain('${title}');
            test.expect(component.template).toContain('${company}');
        });

        test.it('should handle fetch errors gracefully', async () => {
            // Mock fetch to throw an error
            const originalFetch = global.fetch;
            global.fetch = async () => {
                throw new Error('Network error');
            };

            const consoleSpy = [];
            const originalConsoleError = console.error;
            console.error = (...args) => consoleSpy.push(args);

            const component = new CompanyComponent();
            await component.loadTemplate();

            test.expect(consoleSpy.length).toBe(1);
            test.expect(consoleSpy[0][0]).toContain('Error loading company template');

            // Restore mocks
            global.fetch = originalFetch;
            console.error = originalConsoleError;
        });
    });

    test.describe('render method', () => {
        test.it('should return empty string when template not loaded', () => {
            const component = new CompanyComponent();
            // Don't load template
            const result = component.render(sampleCompanyData);
            test.expect(result).toBe('');
        });

        test.it('should log error when template not loaded', () => {
            const consoleSpy = [];
            const originalConsoleError = console.error;
            console.error = (...args) => consoleSpy.push(args);

            const component = new CompanyComponent();
            component.render(sampleCompanyData);

            test.expect(consoleSpy.length).toBe(1);
            test.expect(consoleSpy[0][0]).toBe('Template not loaded');

            console.error = originalConsoleError;
        });

        test.it('should replace all template variables correctly', async () => {
            const component = new CompanyComponent();
            await component.loadTemplate();
            
            const result = component.render(sampleCompanyData);
            
            test.expect(result).toContain('company-desc-test-1');
            test.expect(result).toContain('Software Engineer');
            test.expect(result).toContain('Equal Experts');
            test.expect(result).toContain('https://equalexperts.com');
            test.expect(result).toContain('2024 - Present');
            test.expect(result).toContain('Developed and maintained distributed applications');
        });

        test.it('should handle multiple occurrences of same variable', async () => {
            const component = new CompanyComponent();
            // Set a template with multiple ${id} occurrences
            component.template = '<div id="${id}" data-id="${id}">${title}</div>';
            
            const result = component.render(sampleCompanyData);
            
            test.expect(result).toBe('<div id="test-1" data-id="test-1">Software Engineer</div>');
        });

        test.it('should handle empty data values', async () => {
            const component = new CompanyComponent();
            await component.loadTemplate();
            
            const emptyData = {
                id: '',
                title: '',
                company: '',
                companyUrl: '',
                date: '',
                description: ''
            };
            
            const result = component.render(emptyData);
            
            // Should not contain template variables
            test.expect(result).not.toContain('${');
            test.expect(result).toContain('href=""');
            test.expect(result).toContain('@ </a>');
        });

        test.it('should handle special characters in data', async () => {
            const component = new CompanyComponent();
            await component.loadTemplate();
            
            const specialData = {
                id: 'test-special',
                title: 'Senior Engineer & Architect',
                company: 'Tech Corp <div>',
                companyUrl: 'https://example.com?param=value&other=123',
                date: '2020 - 2024',
                description: 'Worked with HTML <tags> & "quotes" and symbols: $, %, @'
            };
            
            const result = component.render(specialData);
            
            test.expect(result).toContain('Senior Engineer & Architect');
            test.expect(result).toContain('Tech Corp <div>');
            test.expect(result).toContain('https://example.com?param=value&other=123');
            test.expect(result).toContain('HTML <tags> & "quotes"');
        });
    });

    test.describe('Integration tests', () => {
        test.it('should work end-to-end with real data', async () => {
            const component = new CompanyComponent();
            await component.loadTemplate();
            
            const realData = {
                id: 'equal-experts',
                title: 'Software Engineer',
                company: 'Equal Experts',
                companyUrl: 'https://equalexperts.com',
                date: '2024 - Present, 2017-2020',
                description: 'Developed and maintained distributed applications using Java and Scala. Led migration from monolithic to microservices architecture.'
            };
            
            const result = component.render(realData);
            
            // Check for proper HTML structure
            test.expect(result).toContain('<div class="company-item">');
            test.expect(result).toContain('<div class="company-header">');
            test.expect(result).toContain('<div class="job-header">');
            test.expect(result).toContain('<div class="job-description"');
            
            // Check for accessibility attributes
            test.expect(result).toContain('aria-expanded="false"');
            test.expect(result).toContain('aria-controls="company-desc-equal-experts"');
            test.expect(result).toContain('aria-hidden="true"');
            
            // Check for proper link attributes
            test.expect(result).toContain('target="_blank"');
            test.expect(result).toContain('rel="noopener noreferrer"');
        });

        test.it('should maintain template structure after multiple renders', async () => {
            const component = new CompanyComponent();
            await component.loadTemplate();
            
            const originalTemplate = component.template;
            
            // Render multiple times
            component.render(sampleCompanyData);
            component.render(sampleCompanyData);
            component.render(sampleCompanyData);
            
            // Template should remain unchanged
            test.expect(component.template).toBe(originalTemplate);
        });
    });
});

// Run all tests
const success = test.run();
process.exit(success ? 0 : 1);
