var page = require('webpage').create(),
    system = require('system'),
    ss_url = system.args[1],
    ss_filename = system.args[2],
    ss_time = Date.now();

console.log('args', system.args);

if (system.args.length < 3) {
    console.log('Usage: runner.js <url> <filename>', system.args);
    phantom.exit();
}

page.open(ss_url, function (status) {
    if (status !== 'success') {
        throw new Error('Failed to load the address');
    } else {
        console.log('Page loaded...');
    }

    page.render(ss_filename + '.png');
    ss_time = Date.now() - ss_time;
    console.log('Screenshot completed in ' + ss_time + 'ms');
    phantom.exit();
});