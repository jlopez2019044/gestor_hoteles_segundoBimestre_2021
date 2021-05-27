export class Hotel{
    constructor(
        public _id: String,
        public nombre: String,
        public direccion: String,
        public descripcion: String,
        public imagen: String,
        public popularidad: Number,
        public habitaciones:[{
            no_habitacion: Number,
            descripcion: String,
            precio: Number
        }],
        public idAdminsHotel: String
    ){}
}