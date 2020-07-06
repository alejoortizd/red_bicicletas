const Bicicleta = require('../../models/bicicleta');

beforeEach(() => {Bicicleta.allBicis = []; });

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una Bicicleta', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        
        let a = new Bicicleta(1, 'rojo', 'urbana', [3.43722, -76.5325]);
        Bicicleta.add(a);
        
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('Debe de devolver la Bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        
        let a = new Bicicleta(1, 'rojo', 'urbana', [3.43722, -76.5325]);
        let b = new Bicicleta(2, 'verde', 'montana', [3.43722, -76.5325]);
        Bicicleta.add(a);
        Bicicleta.add(b);

        const targetBici = Bicicleta.findById(1);
        
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
    });
});