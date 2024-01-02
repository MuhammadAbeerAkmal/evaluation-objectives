class EventEmitter {
	constructor() {
	  this.events = {};
	  this.subscriptionCounter = 0;
	}
  
	subscribe(eventName, callback) {
	  if (!this.events[eventName]) {
		this.events[eventName] = [];
	  }
  
	  const subscription = {
		id: this.subscriptionCounter++,
		callback
	  };
  
	  this.events[eventName].push(subscription);
  
	  return {
		unsubscribe: () => {
		  this.events[eventName] = this.events[eventName].filter(sub => sub.id !== subscription.id);
		}
	  };
	}
  
	emit(eventName, args = []) {
	  const eventListeners = this.events[eventName] || [];
	  const results = [];
  
	  for (const subscription of eventListeners) {
		const result = subscription.callback(...args);
		results.push(result);
	  }
  
	  return results;
	}
  }
  
  // Test Example:
  const eventEmitter = new EventEmitter();
  
  const subscription = eventEmitter.subscribe('eventName', (arg1, arg2) => {
	console.log(`Callback: ${arg1}, ${arg2}`);
  });

  // Log Callback: Argument 1, Argument 2
  eventEmitter.emit('eventName', ['Argument 1', 'Argument 2']);
  
  // Unsubscribe here!
  subscription.unsubscribe();
  
  // After unsubscribing, this should not log anything
  eventEmitter.emit('eventName', ['Argument 1', 'Argument 2']);