const TemplateEngine = require('./TemplateEngine');

const template = 'Hello, my name is <%name%>. I\'m <%age%> years old.';
const data = {
    name: "TestName",
    age: 29
};

const expectedOutput = 'Hello, my name is TestName. I\'m 29 years old.';
const result = TemplateEngine(template, data);

if (result === expectedOutput) {
    console.log("Test passed: Template parser output matches expected output");
} else {
    console.error("Test failed: Template parser output does not match expected output");
}