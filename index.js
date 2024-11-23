const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

class SVG {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }
    
    render() {
        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shapeElement}${this.textElement}</svg>`;
    }

    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }

    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: (input) => input.length <= 3 || 'Please enter up to three characters only!'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hexadecimal):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hexadecimal):'
    }
];

async function init() {
    try {
        const answers = await inquirer.prompt(questions);
        
        // Create shape instance
        let shape;
        switch(answers.shape) {
            case 'circle':
                shape = new Circle();
                break;
            case 'triangle':
                shape = new Triangle();
                break;
            case 'square':
                shape = new Square();
                break;
        }
        shape.setColor(answers.shapeColor);

        // Create SVG logo
        const svg = new SVG();
        svg.setTextElement(answers.text, answers.textColor);
        svg.setShapeElement(shape);

        // Generate SVG file
        fs.writeFileSync('./examples/logo.svg', svg.render());
        console.log('Generated logo.svg');
        
    } catch (error) {
        console.log(error);
    }
}

init();