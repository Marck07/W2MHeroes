import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroeService } from './heroe.service';
import { Hero } from '../../models/hero';

const data = [
  { id: 1, name: 'Spiderman', identity: 'Peter Parker', age: 17, city: 'Nueva York', universe: 'Marvel' },
  { id: 2, name: 'Iron Man', identity: 'Tony Stark', age: 41, city: 'Nueva York', universe: 'Marvel' },
  { id: 3, name: 'Batman', identity: 'Bruce Wayne', age: 25, city: 'Gotham', universe: 'DC' },
  { id: 4, name: 'Wolverine', identity: 'James Logan', age: 197, city: 'Alberta', universe: 'Marvel' }
] as Hero[];

describe('HeroeService', () => {
  let service: HeroeService;
  let httpTestingController: HttpTestingController;
  let mockHeroes = data;
  let mockHeroe = mockHeroes[0];
  let mockId = mockHeroe.id;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HeroeService]
    });
    service = TestBed.inject(HeroeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
     httpTestingController.verify();
   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should return heroes', () => {
      spyOn(service, 'handleError').and.callThrough();

      service.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(mockHeroes.length),
        fail
      );

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes);
    });

    it('should turn 404 like friendly error', () => {
      spyOn(service, 'handleError').and.callThrough();

      const msg = 'Deliberate 404';
      service.getHeroes().subscribe(
        heroes => expect(heroes).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne('api/heroes');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(service.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('getHero', () => {

   it('should return a single hero', () => {
     spyOn(service, 'handleError').and.callThrough();

     service.getHero(mockHeroe.id).subscribe(
       response => expect(response).toEqual(mockHeroe),
       fail
     );
     const req = httpTestingController.expectOne(`${'api/heroes'}/${mockHeroe.id}`);
     expect(req.request.method).toEqual('GET');
     // Respond with the mock heroes
     req.flush(mockHeroe);
   });

   it('should fail gracefully on error', () => {
     spyOn(service, 'handleError').and.callThrough();

     service.getHero(mockHeroe.id).subscribe(
       response => expect(response).toBeUndefined(),
       fail
     );
     const req = httpTestingController.expectOne(`${'api/heroes'}/${mockHeroe.id}`);
     expect(req.request.method).toEqual('GET');
     // Respond with the mock heroes
     req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

     expect(service.handleError).toHaveBeenCalledTimes(1);
   });
   });

  describe('addHero', () => {

     it('should add a single Hero', () => {
       spyOn(service, 'handleError').and.callThrough();

       service.addHero(mockHeroe).subscribe(
         response => expect(response).toEqual(mockHeroe),
         fail
       );
       const req = httpTestingController.expectOne(`${'api/heroes'}`);
       expect(req.request.method).toEqual('POST');
       // Respond with the mock heroes
       req.flush(mockHeroe);

     });

     it('should fail gracefully on error', () => {
       spyOn(service, 'handleError').and.callThrough();

       service.addHero(mockHeroe).subscribe(
         response => expect(response).toBeUndefined(),
         fail
       );
       // Receive GET request
       const req = httpTestingController.expectOne(`${'api/heroes'}`);
       expect(req.request.method).toEqual('POST');
       // Respond with the mock heroes
       req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

       expect(service.handleError).toHaveBeenCalledTimes(1);
     });
   });

  describe('updateHero', () => {
     it('should update hero', () => {
       spyOn(service, 'handleError').and.callThrough();

       service.updateHero(mockHeroe).subscribe(
         response => expect(response).toBeUndefined(),
         fail
       );

       // Receive PUT request
       const req = httpTestingController.expectOne('api/heroes');
       expect(req.request.method).toEqual('PUT');
     });

     it('should fail gracefully on error', () => {
       spyOn(service, 'handleError').and.callThrough();

       service.updateHero(mockHeroe).subscribe(
         response => expect(response).toEqual(mockHeroe),
         fail
       );

       const req = httpTestingController.expectOne('api/heroes');
       expect(req.request.method).toEqual('PUT');
       // Respond with the updated hero
       req.flush(mockHeroe);

     });
   });

  describe('deleteHero', () => {

     it('should delete hero using id', () => {
       spyOn(service, 'handleError').and.callThrough();

       service.deleteHero(mockId).subscribe(
        response => mockHeroe.id,
        fail
      );

       const req = httpTestingController.expectOne(`${'api/heroes'}/${mockHeroe.id}`);
       expect(req.request.method).toEqual('DELETE');
       // Respond with the updated hero
       req.flush(mockId);
     });

   });

  describe('searchHero', () => {
       it('should find heroes matching the search criteria', () => {
         const searchTerm = 'man'
         spyOn(service, 'handleError').and.callThrough();

         service.searchHeroes(searchTerm).subscribe(
           response => expect(response).toEqual([mockHeroes[1], mockHeroes[2]]),
           fail
         );

         // Receive PUT request
         const req = httpTestingController.expectOne(`${'api/heroes'}/?name=${searchTerm}`);
         expect(req.request.method).toEqual('GET');
         // Respond with the updated hero
         req.flush([mockHeroes[1], mockHeroes[2]]);

       });

       it('should not find heroes matching the search criteria', () => {
         const searchTerm = 'man'
         spyOn(service, 'handleError').and.callThrough();

         service.searchHeroes(searchTerm).subscribe(
           response => expect(response).toEqual([]),
           fail
         );
         const req = httpTestingController.expectOne(`${'api/heroes'}/?name=${searchTerm}`);
         expect(req.request.method).toEqual('GET');
         // Respond with the updated hero
         req.flush([]);

       });


       it('should return an empty array when passing an empty search string', () => {
         const searchTerm = '';
         spyOn(service, 'handleError').and.callThrough();

         service.searchHeroes(searchTerm).subscribe(
           response => expect(response).toEqual([]),
           fail
         );

         // Receive PUT request
         const req = httpTestingController.expectNone(`${'api/heroes'}/?name=${searchTerm}`);
         expect(service.handleError).not.toHaveBeenCalled();
       });

       it('should fail gracefully on error', () => {
         const searchTerm = 'man';

         service.searchHeroes(searchTerm).subscribe(
           response => expect(response).toEqual([]),
           fail
         );

         const req = httpTestingController.expectOne(`${'api/heroes'}/?name=${searchTerm}`);
         expect(req.request.method).toEqual('GET');
         req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

       });
     });

  describe('handleError', () => {
       it('should handle error gracefully', () => {

         spyOn(service, 'handleError').and.callThrough();

         service.getHero(mockHeroe.id).subscribe(
           response => expect(response).toBeUndefined(),
           fail
         );
         const req = httpTestingController.expectOne(`${'api/heroes'}/${mockHeroe.id}`);
         expect(req.request.method).toEqual('GET');
         // Respond with the mock heroes
         req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

         expect(service.handleError).toHaveBeenCalledTimes(1);
       });
     });
});
