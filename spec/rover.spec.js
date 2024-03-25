const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe('Rover', function() {

  // Test 7
  it('constructor sets position and default values for mode and generatorWatts', function() {
    let rover = new Rover(98382); 
     // Passes 98382 as the rover's position.
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  // Test 8
  it('response returned by receiveMessage contains the name of the message', function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);
         // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.message).toBe('Test message with one command');
  });

  // Test 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.status.length).toBe(2);
  });

  // Test 10
  it('responds correctly to the status check command', function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.status[0].roverStatus.mode).toBe('NORMAL');
    expect(response.status[0].roverStatus.generatorWatts).toBe(110);
    expect(response.status[0].roverStatus.position).toBe(98382);
  });

  // Test 11 - I have to write the purpose?!!!!!
  it('responds correctly to the mode change command', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.status[0].completed).toBe(true);
    
    expect(rover.mode).toBe('LOW_POWER');
  });

  // Test 12
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 98765)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.status[1].completed).toBe(false);
    expect(rover.position).toBe(98382); // Position should not change in LOW_POWER mode
  });

  // Test 13
  it('responds with the position for the move command', function() {
    let commands = [new Command('MOVE', 98765)];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.status[0].completed).toBe(true);
    expect(rover.position).toBe(98765);
  });
});