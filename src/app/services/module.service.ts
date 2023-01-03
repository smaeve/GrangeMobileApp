import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Module{
  moduleNo?: string, //interesting: if I remove the ?, it gives me an error in the student: Student ={} code in student-details.page.ts
  moduleName: string,
  credits: string,
  website: string,
  location: string,
  room: string
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  // Reference to modules Observable
  private modules: Observable<Module[]>;
  // Reference to the moduleCollection for Update/Delete Operations
  private moduleCollection: AngularFirestoreCollection<Module>;

  constructor(private afs: AngularFirestore) { 
    // Get a refence to the modules collection
    this.moduleCollection = this.afs.collection<Module>('modules-1');
    // Get a refernce to a snapshot of the module collection data, i.e an observable that
    // provides the actual array of modules when subscribed to (emits the values!)
    this.modules = this.moduleCollection.snapshotChanges().pipe(
      map(modules => {
        return modules.map(module => {
          const data = module.payload.doc.data();
          const moduleNo = module.payload.doc.id;
          return { moduleNo, ...data };
        });
      })
    );
  }

  //gets all modules stored in the database and returned by the observable
  getModules(): Observable<Module[]> {
    return this.modules;
  }
 
  // This moduleNo refers to the id in Firebase, needed to update or delete
  getModule(moduleNo: string): Observable<Module> {
    return this.moduleCollection.doc<Module>(moduleNo).valueChanges().pipe(
      take(1),
      map(module => {
        module.moduleNo = moduleNo;
        return module
      })
    );
  }
 
  addModule(module: Module): Promise<DocumentReference> {
    return this.moduleCollection.add(module);
  }
 
  updateModule(module: Module): Promise<void> {
    return this.moduleCollection.doc(module.moduleNo).update({ moduleName: module.moduleName, credits: module.credits, website: module.website, location: module.location, room: module.room });
  }
 
  deleteModule(moduleNo: string): Promise<void> {
    return this.moduleCollection.doc(moduleNo).delete();
  }
}

