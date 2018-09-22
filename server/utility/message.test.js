var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('it should generate correct message oparate', () => {
        var from = 'jeny';
        var text = 'something text here';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
        //store result in variable
        //assert from match
        //assert text match
        //assert createAt is a number
    });
});

describe('generateLocationMessage', () => {
    it('it is correct location', () => {
        var from = 'Hariom';
        var latitude= 15;
        var longitude= 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});