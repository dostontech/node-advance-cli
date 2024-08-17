
const yargs = require('yargs');
const { prompt } = require('enquirer');

// Define commands
const commands = ['greet', 'list', 'info'];

// Auto-complete function
const autocomplete = async (input) => {
  const suggestions = commands.filter(cmd => cmd.startsWith(input));
  return suggestions;
};

// Create a command-line interface with yargs
yargs
  .scriptName('advanced-cli')
  .usage('$0 <cmd> [args]')
  .command(
    'greet <name>',
    'Greet someone',
    (yargs) => {
      yargs.positional('name', {
        describe: 'Name of the person to greet',
        type: 'string',
      });
    },
    (argv) => {
      console.log(`Hello, ${argv.name}!`);
    }
  )
  .command(
    'list',
    'List all items',
    () => {},
    () => {
      console.log('Listing items...');
    }
  )
  .command(
    'info',
    'Display information',
    () => {},
    () => {
      console.log('Displaying information...');
    }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .completion('autocomplete', {
    description: 'Autocomplete commands',
    async: true,
    options: async (currentValue) => {
      return autocomplete(currentValue);
    }
  })
  .help()
  .argv;
