var page = require('webpage').create(),
    system = require('system'),
    ss_url = system.args[1],
    ss_filename = system.args[2],
    ss_width = system.args[3],
    ss_height = system.args[4],
    ss_time = Date.now();

// Debug:
console.log('Phantom Args:', system.args.join(' '));

if (system.args.length < 5) {
    console.log('Usage: runner.js <url> <filename>', system.args);
    phantom.exit();
}

page.viewportSize = {
    width: ss_width, height: ss_height
};

page.open(ss_url, function (status) {
    if (status !== 'success') {
        console.error('Failed to load "' + ss_url + '"');
        return phantom.exit();
    }

    page.render(ss_filename);
    ss_time = Date.now() - ss_time;

    console.log('Captured in ' + ss_time + 'ms (' + ss_filename + ')');
    phantom.exit();
});