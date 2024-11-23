const { Circle, Triangle, Square } = require('./shapes.js');

describe('Shape Classes', () => {
    describe('Circle', () => {
        test('should render circle SVG with the given color', () => {
            const shape = new Circle();
            shape.setColor("blue");
            expect(shape.render()).toEqual('<circle cx="150" cy="100" r="80" fill="blue" />');
        });
    });

    describe('Triangle', () => {
        test('should render triangle SVG with the given color', () => {
            const shape = new Triangle();
            shape.setColor("red");
            expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="red" />');
        });
    });

    describe('Square', () => {
        test('should render square SVG with the given color', () => {
            const shape = new Square();
            shape.setColor("green");
            expect(shape.render()).toEqual('<rect x="90" y="40" width="120" height="120" fill="green" />');
        });
    });
});