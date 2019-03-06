import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils = [
        // {
        //     id: 1,
        //     name: 'Machine à laver',
        //     status: 'allumé'
        // },
        // {
        //     id: 2,
        //     name: 'Télévision',
        //     status: 'allumé'
        // },
        // {
        //     id: 3,
        //     name: 'Ordinateur',
        //     status: 'éteint'
        // }
    ];
    
    constructor(private httpClient: HttpClient){}

    emitAppareilsSubject() {
        this.appareilSubject.next(this.appareils.slice());
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            });
        return appareil;
    }

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilsSubject();
    }

    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilsSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilsSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilsSubject();
    }

    addAppareil(name: string, status: string) {
         const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
         appareilObject.name = name;
         appareilObject.status = status;
         appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
         this.appareils.push(appareilObject);
         this.emitAppareilsSubject();

    }

    saveAppareilsToServer(){
        this.httpClient
        .put('https://http-client-demo-bbd18.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
            () => {
                console.log('Enregistrement terminé !');
            },

            (error) => {
                console.log('Erreur de sauvegarde ! ' + error);
            }
        );
    }

    getAppareilsFromServer(){
        this.httpClient
        .get<any[]>('https://http-client-demo-bbd18.firebaseio.com/appareils.json')
        .subscribe(
            (response) => {
                this.appareils = response;
                this.emitAppareilsSubject();
            },

            (error) => {
                console.log('erreur de chargement !' + error);
            }
        );
    }
}


