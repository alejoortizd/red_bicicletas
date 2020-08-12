const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', () => {
    beforeEach(done => {
        const mongoDb = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDb, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(done => {
        Bicicleta.deleteMany({}, (err, success) => {
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            const bici = Bicicleta.createInstance(1, "verde", "urbana", [3.43722, -76.5325]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(3.43722);
            expect(bici.ubicacion[1]).toEqual(-76.5325);
        })
    });

    describe('Bicleta.allBicis', () => {
        it('comienza vacia', done => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0);
                done()
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', done => {
            const aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici, (err, newBici) => {
                if(err) console.log(err);
                Bicicleta.allBicis((err, bicis) => {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
    
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Debe de devolver solo una bici', done => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0);
            })
            const aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici, (err, newBici) => {
                if(err) console.log(err);

                const aBici2 = new Bicicleta({code: 2, color: "roja", modelo: "urbana"});
                Bicicleta.add(aBici2, (err, newBici) => {
                    if(err) console.log(err);
                })
                Bicicleta.findByCode(1, (err, targetBici) => {
                    expect(targetBici.code).toBe(aBici.code);
                    expect(targetBici.color).toBe(aBici.color);
                    expect(targetBici.modelo).toBe(aBici.modelo);
    
                    done();
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('Debe de eliminar solo una bici', done => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0);
            })
            const aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici, (err, newBici) => {
                if(err) console.log(err);

                const aBici2 = new Bicicleta({code: 2, color: "roja", modelo: "urbana"});
                Bicicleta.add(aBici2, (err, newBici) => {
                    if(err) console.log(err);
                })
                Bicicleta.removeByCode(1, (err, targetBici) => {
                    expect(targetBici.code).toBe(undefined);
                    expect(targetBici.color).toBe(undefined);
                    expect(targetBici.modelo).toBe(undefined);
    
                    done();
                });
            });
        });
    });

});
