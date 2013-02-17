var cp = require ('child_process'),
	io = require ('socket.io'),
	spawn = cp.spawn,
	io = io.listen (8000),
	filename = 'tail.txt';

io.sockets.on ('connection', function (socket)
{
	console.log ("INFO: Socket connected!");
	
	var child = spawn ('tail', ['-f', filename]);
	child.stdout.on ('data', function (data)
	{
		console.log ( "Data sent" );

		socket.emit ('data', {
			lines: data.toString().split("\n")
		});
	});
	
	child.stderr.on ('data', function (data)
	{
		console.log ('Error: ' + data.toString());
	});

	socket.on ('disconnect', function ()
	{
		child.kill();
	});
});
