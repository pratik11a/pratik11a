// Load all sections
document.addEventListener('DOMContentLoaded', async () => {
    const sections = [
        { id: 'header', path: 'assets/html/header.html' },
        { id: 'profile', path: 'assets/html/profile.html' },
        { id: 'skills', path: 'assets/html/skills.html' },
        { id: 'experience', path: 'assets/html/experience.html' },
        { id: 'education', path: 'assets/html/education.html' },
        { id: 'projects', path: 'assets/html/projects.html' }
    ];

    for (const section of sections) {
        try {
            const response = await fetch(section.path);
            const content = await response.text();
            document.getElementById(`${section.id}-placeholder`).innerHTML = content;
        } catch (error) {
            console.error(`Error loading ${section.id}:`, error);
        }
    }

    // Function to set up click handlers for job descriptions
    const setupJobDescriptionHandlers = () => {
        const experienceSection = document.getElementById('experience-placeholder');
        if (!experienceSection) return;

        experienceSection.addEventListener('click', (e) => {
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
    };

    // Wait a short moment for content to be fully loaded and rendered
    setTimeout(setupJobDescriptionHandlers, 100);
});
