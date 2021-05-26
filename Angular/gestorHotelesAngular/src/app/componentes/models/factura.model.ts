export class Factura{
    constructor(
        public _id: String,
        public fecha_llegada: String,
        public fecha_salida: String,
        public idHabitacion: String,
        public idReservacion: String,
        public serviciosHotel: [{}],
        public total: Number
    ){}
}