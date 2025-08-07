// Experience data
const experienceData = [
    {
        id: '1',
        title: 'Software Engineer',
        company: 'Equal Experts',
        companyUrl: 'https://www.equalexperts.com',
        date: '2024 - Present, 2017-2020',
        description: `Developed and maintained distributed applications using multiple technologies. Major projects are
            digital transformation projects. Migration from monolithic to microservices architecture. Migration to cloud 
            infrastructure. Setting up CI/CD pipelines.`
    },
    {
        id: '2',
        title: 'Software Engineer',
        company: 'Lavego AG',
        companyUrl: 'https://www.lavego.de',
        date: '2020 - 2024',
        description: `Maintained and developed the backend of the application in scala, akka, play framework. Created a new
            microservice for the application which used latest protocol in payment industry ISO 20022.`
    },
    {
        id: '3',
        title: 'Full Stack Developer',
        company: 'Cognizant',
        companyUrl: 'https://www.cognizant.com',
        date: '2014 - 2017',
        description: `I was responsible for developing, documenting, testing, deploying and maintaining the application.`
    },
    {
        id: '4',
        title: 'Graduate Engineer Trainee',
        company: 'John Deere India',
        companyUrl: 'https://www.deere.co.in',
        date: '2010 - 2014',
        description: `I was trained in the basics of software development and computer science. I learned about the basics of
            java, spring, hibernate, sql, html, css, javascript, jquery, bootstrap, etc. I was responsible for fixing minor 
            cosmetic bugs.`
    }
];

// Initialize experience section
async function initializeExperience() {
    const companyComponent = new CompanyComponent();
    await companyComponent.loadTemplate();

    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;

    experienceData.forEach(data => {
        const li = document.createElement('li');
        li.innerHTML = companyComponent.render(data);
        experienceContainer.appendChild(li);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeExperience);