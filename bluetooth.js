var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

btSerial.on('found', function(address, name) {
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {
            console.log('connected');

            var feed;
            var string='a';

                   setInterval(function() {

    if(string!=feed){
        feed= string;

     btSerial.write(new Buffer('bFFFFFF'+ feed, 'utf-8'), function(err, bytesWritten) {
                if (err) console.log(err);
            });
 }

     console.log(feed);


}, 8000);

   

            btSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
      //  btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});

btSerial.inquire();