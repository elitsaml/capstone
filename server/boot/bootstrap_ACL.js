module.exports = function (app) {
    var MongoDB = app.dataSources.MongoDB;

    MongoDB.automigrate('Person', function (err) {
        if (err) throw (err);
        var Person = app.models.Person;

        Person.create([
                {
                    firstName: 'Pesho',
                    lastName: 'Rjapata',
                    username: 'admin',
                    email: 'admin@admin.com',
                    password: 'qwe'
                },
                {
                    firstName: 'Elitsa',
                    lastName: 'Mladenova',
                    username: 'eli',
                    email: 'eli@eli.net',
                    password: 'qwe'
                }],
            function (err, users) {
                if (err) throw (err); //return cb(err);
                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                //create the Admin role
                Role.create({
                    name: 'Admin'
                }, function (err, role /* the new role that have been just created */ ) {
                    if (err) throw (err); //cb(err);
                    /* 
                        on the just created role set up the user 
                    */
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    }, function (err, principal) {
                        if (err) throw (err);
                    });
                });
            });

        ///////////////// creating TEST plots
        var Plot = app.models.Plot;
        Plot.create([{
                "registryNumber": 12,
                "sizeInAre": "3",
                "lat1": "47.703374",
                "long1": "8.656638",
                "lat2": "47.703197",
                "long2": "8.656808",
                "comment": "A TEST Plot"
            }],
            function (err, plot) {
                if (err) throw (err); //return cb(err);
                console.log('TEST > Test Plot succesfully created into the DB.')
            });
    });

};