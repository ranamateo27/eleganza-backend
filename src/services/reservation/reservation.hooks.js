// src/services/reservation/reservation.hooks.js

export const populateUser = async (context) => {
    const { app, method, result } = context;

    // Función para buscar el usuario y añadirlo al objeto de la reserva
    const addUserToReservation = async (reservation) => {
        if (reservation.user_id) {
            try {
                // Obtenemos el usuario usando el servicio 'users'
                // Esto automáticamente usa conexión MySQL
                const user = await app.service('users').get(reservation.user_id);

                // Se agrega la propiedad 'user' en la reserva con la info encontrada
                reservation.user = user;
            } catch (error) {
                console.error(`No se encontró el usuario para la reserva ${reservation.id}`);
            }
        }
        return reservation;
    };

    // Verificamos si es una lista (find) o un objeto único (get, create, patch)
    if (method === 'find') {
        // En Feathers con Knex, los datos suelen venir en result.data por la paginación
        const data = result.data || result;
        await Promise.all(data.map(addUserToReservation));
    } else {
        // Para get, create o patch, procesamos el resultado único
        context.result = await addUserToReservation(result);
    }

    return context;
};