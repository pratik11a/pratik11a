// Company component utility
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

// Example usage:
/*
const companyComponent = new CompanyComponent();
const companyData = {
    id: '1',
    title: 'Software Engineer',
    company: 'Equal Experts',
    date: '2024 - Present',
    description: 'Developed and maintained distributed applications...'
};
const html = companyComponent.render(companyData);
*/