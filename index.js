import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
    {
        message: ' What is the title of your project?',
        name: 'title',
        type: 'input',
        default: 'Automatic Readme Generator'
    },
    {
        message: 'What was your motivation?',
        name: 'motivation',
        type: 'input',
        default: 'the motivation for improve developers skills.'
    },
    {
        message: ' Why did you build this project?',
        name: 'whybuild',
        type: 'input',
        default: 'And that was the reason for building this project.'
    },
    {
        message: 'What problem does it solve?',
        name: 'problemSolved',
        type: 'input',
        default: 'and that is the problem that the project solves'
    },
    {
        message: ' What did you learn?',
        name: 'learned',
        type: 'input',
        default: 'knoledge'
    },
    {
        message: 'Enter installation instructions:',
        name: 'installation',
        type: 'input',
        default: 'npm i'
    },
    {
        message: 'Enter usage information:',
        name: 'usage',
        type: 'input',
        default: 'The project work like this and that'
    },
    {
        message: 'List your collaborators, if any (GitHub usernames):',
        name: 'credits',
        type: 'input',
        default: 'Collaborator names Anita'
    },
    {
        message: 'Enter any third-party assets or tutorials followed (if any):',
        name: 'thirdPartyAssets',
        type: 'input',
        default: 'NA'
    },
    {
        message: 'Choose a license for your project:',
        name: 'license',
        type: 'list',
        choices: ['MIT', 'GPLv3', 'Apache 2.0', 'None']
    },
    {
        message: 'Enter your GitHub username:',
        name: 'github',
        type: 'input',
        default: 'https://github.com/Trinigch/ReadmeGenerator.git'
    },
    {
        message: 'Enter your email address:',
        name: 'email',
        type: 'input',
        default: 'trinigch@gmail.com'
    }
];
/*Readme*/
const generateREADME = (data) => {
    const { title, motivation, whyBuild, problemSolved, learned, installation, usage, credits, thirdPartyAssets, license, github, email } = data;
    
    const licenseBadge = license !== 'None' ? `![License](https://img.shields.io/badge/license-${license}-green)` : '';
    const licenseSection = license !== 'None' ? `## License\nThis project is licensed under the ${license} license.` : '';

    return `
                # ${title}

                ## Description
                ${motivation}

                - **Why did you build this project?**: ${whyBuild}
                - **What problem does it solve?**: ${problemSolved}
                - **What did you learn?**: ${learned}

                ## Table of Contents
                - [Installation](#installation)
                - [Usage](#usage)
                - [Credits](#credits)
                - [License](#license)

                ## Installation
                ${installation}

                ## Usage
                ${usage}

                ## Credits
                Collaborators: ${credits ? credits : 'No collaborators'}
                Third-party assets or tutorials followed: ${thirdPartyAssets ? thirdPartyAssets : 'None'}

                ${licenseSection}

                ## Questions
                If you have any questions, feel free to contact me:

                GitHub: [${github}](https://github.com/${github})
                Email: [${email}](mailto:${email})

                `;
                };
    const writeToFile = (data) => {
                    fs.writeFile('README.md', data, (err) => {
                        if (err) {
                            console.error('Error writing to file:', err);
                        } else {
                            console.log('README.md generated successfully!');
                        }
                    });
                };
    inquirer.prompt(questions)
                .then((answers) => {
                    const readmeContent = generateREADME(answers);
                    writeToFile(readmeContent);
                })
                .catch((error) => {
                    console.error('Error during prompt:', error);
                });
