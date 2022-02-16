//OK! refactorizarlo a un solo if...
const isInformedInput = (input) => {
    if (
        input === undefined ||
        input.trim() === "" ||
        process.argv.length >= 5
    ) {
        console.log("Ingresar dos fechas");
        return false;
    }
    return true;
};

const isValidFormatDate = (date) => {
    const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

    if (!regex.test(date)) {
        return false;
    }

    const parts = date.split("/");
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);
    //ts isNaN
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
};

const isValidDate = (startDate, finishDate) => {
    if (
        startDate.getFullYear() != finishDate.getFullYear() &&
        startDate.getMonth() <= finishDate.getMonth()
    ) {
        console.log(
            "Tus fechas no deben ser de mas de un año, si quieres saber todos los cumpleaños, ingresa desde el 1 de enero hasta el 31 de diciembre"
        );
        return false;
    } else if (
        startDate.getFullYear() != finishDate.getFullYear() ||
        startDate.getMonth() >= finishDate.getMonth() ||
        startDate <= finishDate
    ) {
        return true;
    } else {
        console.log(
            "La primera fecha debe ser menor a la segunda, ingresa una nueva fecha "
        );
        return false;
    }
};

const compararFecha = (fecha1, fecha2, cumple) => {
    mesCumple = parseInt(cumple[1]);
    diaCumple = parseInt(cumple[2]);
    if (
        mesCumple == fecha1.getMonth() + 1 &&
        mesCumple == fecha2.getMonth() + 1
    ) {
        if (diaCumple >= fecha1.getDate() && diaCumple <= fecha2.getDate()) {
            return true;
        }
    } else if (mesCumple === fecha1.getMonth() + 1) {
        if (diaCumple >= fecha1.getDate()) {
            return true;
        }
    } else if (mesCumple === fecha2.getMonth() + 1) {
        if (diaCumple <= fecha2.getDate()) {
            return true;
        }
    } else if (
        mesCumple > fecha1.getMonth() + 1 &&
        mesCumple < fecha2.getMonth() + 1
    ) {
        return true;
    }
    return false;
};

module.exports = {
    isInformedInput: isInformedInput,
    isValidFormatDate: isValidFormatDate,
    isValidDate: isValidDate,
    compararFecha: compararFecha,
};
