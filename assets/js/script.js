// Load all sections
document.addEventListener('DOMContentLoaded', async () => {
    const sections = [
        { id: 'header', path: '/assets/html/header.html' },
        { id: 'profile', path: '/assets/html/profile.html' },
        { id: 'skills', path: '/assets/html/skills.html' },
        { id: 'experience', path: '/assets/html/experience.html' },
        { id: 'education', path: '/assets/html/education.html' },
        { id: 'projects', path: '/assets/html/projects.html' }
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
});
