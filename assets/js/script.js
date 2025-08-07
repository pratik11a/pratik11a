// Load all sections
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize components
    const companyComponent = new CompanyComponent();
    await companyComponent.loadTemplate();

    const sections = [
        { id: 'header', path: 'assets/html/header.html' },
        { id: 'profile', path: 'assets/html/profile.html' },
        { id: 'skills', path: 'assets/html/skills.html' },
        { 
            id: 'experience', 
            path: 'assets/html/experience.html',
            postProcess: async (element) => {
                // Initialize experience section with company components
                const container = element.querySelector('#experience-container');
                if (container) {
                    experienceData.forEach(data => {
                        const li = document.createElement('li');
                        li.innerHTML = companyComponent.render(data);
                        container.appendChild(li);
                    });
                }
            }
        },
        { id: 'education', path: 'assets/html/education.html' },
        { id: 'projects', path: 'assets/html/projects.html' }
    ];

    for (const section of sections) {
        try {
            const response = await fetch(section.path);
            const content = await response.text();
            const element = document.getElementById(`${section.id}-placeholder`);
            element.innerHTML = content;

            // Run post-processing if defined
            if (section.postProcess) {
                await section.postProcess(element);
            }
        } catch (error) {
            console.error(`Error loading ${section.id}:`, error);
        }
    }

    // Set up click handlers for job descriptions
    document.addEventListener('click', (e) => {
        const jobTitle = e.target.closest('.job-title');
        if (jobTitle) {
            const isExpanded = jobTitle.getAttribute('aria-expanded') === 'true';
            jobTitle.setAttribute('aria-expanded', !isExpanded);
            jobTitle.classList.toggle('expanded');
            
            const description = document.getElementById(jobTitle.getAttribute('aria-controls'));
            if (description) {
                description.classList.toggle('expanded');
                description.setAttribute('aria-hidden', isExpanded);
            }
        }
    });
});
