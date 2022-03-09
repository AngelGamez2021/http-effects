import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap, Observable } from 'rxjs';
import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import * as usuarioActions from '../actions/usuario.actions';

@Injectable()
//pasamos a instalar los efectos: npm install @ngrx/effects --save
export class usuarioEffects {

  constructor(
    private actions$: Actions,
    // esto es un observable que está escuchando las acciones
    private usuarioService: UsuarioService
  ) {}



  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      concatMap((action) =>
        this.usuarioService.getUserById(action.id)
        .pipe(
          map((usuario: Usuario) =>
            usuarioActions.cargarUsuarioSuccess({usuario})),
            catchError ( err => of(usuarioActions.cargarUsuarioError({payload: err})))
          //si sale algun error, se ejecuta esto, y el of nos convierte todo a un observable
          )
        )
      )
  );
  
}
//vamos al list components y hacrmos ver las card nuevamente despues de cear este effects


//ir al index y exportar el effects








// ofType(usuariosActions.cargarUsuarios),       //acá estamos escuchando la accion

    //   tap((data) => console.log('efect tap', data)),  // aqui sabriamos que informacion estamos obteniendo de esa accion


  //esto es para unir el observable a la solicitud anterior
        //acá nos vamos a listComponents.ts
        //luego de importar en en el module continuamos acá quitando los tap]]