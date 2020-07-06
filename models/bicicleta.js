const Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = () => {
    return `id: ${id} | color: ${color}`;
}

Bicicleta.allBicis = [];
Bicicleta.add = (aBici) => {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = (aBiciId) => {
    let aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici
    else
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
}

Bicicleta.removeById = (aBiciId) => {
    for(let i = 0; i < Bicicleta.allBicis.length; i++) {
        if (Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

// var a = new Bicicleta(1, 'rojo', 'urbana', [3.43722, -76.5325]);
// var b = new Bicicleta(2, 'blanca', 'urbana', [3.427033, -76.531690]);

// Bicicleta.add(a);
// Bicicleta.add(b);

module.exports = Bicicleta;