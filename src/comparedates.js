const compareDates = (fecha1, fecha2, cumple) => {
    
    const mesFecha1 = fecha1.getMonth() + 1 
    const mesFecha2 = fecha2.getMonth() + 1
    const diaFecha1 = fecha1.getDate()
    const diaFecha2 = fecha2.getDate()
    mesCumple = parseInt(cumple[1]);
    diaCumple = parseInt(cumple[2]);

    if(mesFecha1 < mesFecha2 || (mesFecha1 === mesFecha2 && diaFecha1 <= diaFecha2)){
        if ( mesCumple == mesFecha1 && mesCumple == mesFecha2) {
            if (diaCumple >= diaFecha1 && diaCumple <= diaFecha2) {
                return true;
            }
        } else if (mesCumple === mesFecha1) {
            if (diaCumple >= diaFecha1) {
                return true;
            }
        } else if (mesCumple === mesFecha2) {
            if (diaCumple <= diaFecha2) {
                return true;
            }
        } else if ( mesCumple > mesFecha1 && mesCumple < mesFecha2) {
            return true;
        }
    } else if (mesFecha1 > mesFecha2 || (mesFecha1 === mesFecha2 && diaFecha1 > diaFecha2)){
        if(mesCumple == mesFecha1 && mesCumple == mesFecha2){
            if(diaCumple >= diaFecha1 || diaCumple <= diaFecha2){
                return true
            }
        } 
        else if(mesCumple == mesFecha2 && diaCumple <= diaFecha2){
            return true
        } else if(mesCumple == mesFecha1 && diaCumple >= diaFecha1){
            return true
        } 
        else if(mesCumple > mesFecha1 || mesCumple < mesFecha2){
            return true
        }
        
    } 
};

module.exports = {
    compareDates
}