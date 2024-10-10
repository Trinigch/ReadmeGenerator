import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
    {
        message: 'What is your name?',
        name: 'name',
        type: 'input',
        default: 'Anonymous'
    },
    {
        message: 'What was your favorite activity today?',
        name: 'activity',
        type: 'list',
        choices: [
            {
                name: '12-ArgV-Stu',
                value: 12
            },
            {
                name: '14-ReadWrite',
                value: 14
            },
            {
                name: '16-Append',
                value: 16
            }
        ]
    },
    {
        message: 'Are you coming to class tomorrow?',
        name: 'attendance',
        type: 'confirm'
    }, 
    {
        message: 'Which activity are you looking forward to tomorrow?',
        name: 'anticipate',
        type: 'number',
        validate: function(thisAnswer, answers) {
            if (typeof thisAnswer === "number") {
                return true
            } else {
                return 'I need to know the number of the activity you\'re looking forward to.'
            }
        },
        when: function(answers) {
            return answers.attendance
        }
    }
];

const writeToAfile = (data, name) => {
    fs.writeFile(`${name}.txt`, data, (err) => {
        err ? console.error(err) : console.info("Written to file.")
    });
}

inquirer.prompt(questions)
.then(({ name, anticipate, attendance, activity }) => {
    const message = `Hi, my name ${name}. 
Today, my favorite activity was ${activity}.
${attendance ? 'I\'ll be in class tomorrow.' : 'I have to miss class tomorrow.'} 
${attendance ? 'I\'m looking forward to activity number ' + anticipate + '.' : ''}`;

    writeToAfile(message, name);
})
.catch(console.error); // using a named function as a callback