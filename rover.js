class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
 
  
   receiveMessage(message) {
      let status = [];
  
      for (let command of message.commands) {
        
        if (command.commandType === 'MODE_CHANGE') {
          this.mode = command.value;
          status.push({ completed: true });
        } else if (command.commandType === 'MOVE') {
          if (this.mode === 'LOW_POWER') {
            status.push({ completed: false });
          } else {
            this.position = command.value;
            status.push({ completed: true });
          }
        } else if (command.commandType === 'STATUS_CHECK') {
          status.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position,
            },
          });
        }
      }
  
      return { message: message.name, status };
    }
  }

module.exports = Rover;

