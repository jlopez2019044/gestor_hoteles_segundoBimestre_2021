export class Reservacion{
    constructor(
        public _id: String,
        public idUsuario: String,
        public fecha_llegada: String,
        public fecha_salida: String,
        public idHabitacion: String
    ){}
}