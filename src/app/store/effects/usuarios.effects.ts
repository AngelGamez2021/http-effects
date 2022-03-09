import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap, Observable } from 'rxjs';
import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Injectable()
//pasamos a instalar los efectos: npm install @ngrx/effects --save
export class usariosEffects {

  constructor(
    private actions$: Actions,
    // esto es un observable que está escuchando las acciones
    private usuarioService: UsuarioService
  ) {}



//   cargarUsuarios$ = createEffect(
//       () => this.actions$.pipe(
          
//         ofType(usuariosActions.cargarUsuarios),      
//       mergeMap(
//         () => this.UsuarioService.getUsers()
//         .pipe(
//             map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }) )
//           )
      
//       )
//     )
//   );





  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      concatMap(() =>
        this.usuarioService.getUsers()
        .pipe(
          map((loadUser) =>
            usuariosActions.cargarUsuariosSuccess({ usuarios: loadUser })),
            catchError ( err => of(usuariosActions.cargarUsuariosError({payload: err})))
          //si sale algun error, se ejecuta esto, y el of nos convierte todo a un observable
          )
        )
      )
  );
  
}
//vamos al list components y hacrmos ver las card nuevamente despues de cear este effects









// ofType(usuariosActions.cargarUsuarios),       //acá estamos escuchando la accion

    //   tap((data) => console.log('efect tap', data)),  // aqui sabriamos que informacion estamos obteniendo de esa accion


  //esto es para unir el observable a la solicitud anterior
        //acá nos vamos a listComponents.ts
        //luego de importar en en el module continuamos acá quitando los tap]]