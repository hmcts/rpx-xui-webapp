module.exports = function(config, argv) {
    let tags = '@all';
    if (config.defaultTags) {
        tags = config.defaultTags.join(' and ');
    }

    if (argv.tags) {
        if (tags) tags += ' and ';
        tags += argv.tags;
    }

    console.log('Applying tag expression: ', tags);
    return tags;
};
