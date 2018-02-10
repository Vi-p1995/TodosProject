var assert = require ('assert');
const request = require('supertest');
const app = require ('../app');

describe ('GET creator/todos',function(){
		it('test success creator/todos',function(done){
				request(app)
				.get('creator/todos')
				.set('accept', 'application/json')
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					done();
			});
		});


});
