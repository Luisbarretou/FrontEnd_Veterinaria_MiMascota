import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation({
            startsWith: 'Empieza con',
            contains: 'Contiene',
            notContains: 'No contiene',
            endsWith: 'Acaba en',
            equals: 'Igual',
            notEquals: 'No igual',
            noFilter: 'Sin filtro',
            lt: 'Menor que',
            dayNames : ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            dayNamesMin : ["D", "L", "M", "X", "J", "V", "S"],
            monthNames : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],
            monthNamesShort : ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Set", "Oct", "Nov", "Dic"]
        });
    }
}
