var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () =>{
    it('it should generate correct message oparate', () => {
        var from = 'jen';
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