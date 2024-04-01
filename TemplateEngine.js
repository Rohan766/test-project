
function TemplateEngine(template, data) {
    return template.replace(/<%([^%>]+)?%>/g, function(match, key) {
        return data.hasOwnProperty(key.trim()) ? data[key.trim()] : "";
    });
}

var template = 'Hello, my name is <%name%>. I\'m <%age%> years old.';
console.log(TemplateEngine(template, {
    name: "TestName",
    age: 29
}));

module.exports = TemplateEngine;