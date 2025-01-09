import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

emitter.emit('messageLogged', { id: 1, url: 'http://example.com' });

function greetHandler(name) {
    console.log('Hello World and ' + name);
}

function goodbyeHandler() {
    console.log('Goodbye World');
}

// register event listeners
emitter.on('greet', greetHandler);
emitter.on('goodbye', goodbyeHandler);

//emit events
emitter.emit('greet', "john");
emitter.emit('goodbye');

//error handling
emitter.on('error', (error) => {
    console.log('Error occurred', error);
});

emitter.emit('error', new Error('Something went wrong'));