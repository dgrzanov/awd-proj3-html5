## Obavezne funkcionalnosti
- [x] Igra se prikazuje u Canvas objektu koji pokriva cijeli prozor web preglednika. 
- [x] Pozadina Canvas može biti crne ili bijele boje, ili neke druge boje s dovoljnim kontrastom za bolji prikaz. 
- [x] Canvas mora imati vidljivi rub.
- [x] Igra započinje nakon učitavanja web stranice. 
- [x] Na početku igre generira se određen broj objekata (asteroida) na slučajnim položajima i sa slučajnim vektorima brzina. 
- [x] Svi generirani asteroidi inicijalno se nalaze izvan ekrana (ne vide se) i postepeno ulaze u područje Canvasa koje se prikazuje.
- [x] Novi objekti asteroida, njihov položaj, smjer i brzina gibanja se slučajno generiraju. 
- [ ] Ovi parametri mogu biti konstantni ili je moguće implementirati generiranje sve više objekata što igra traje duže. 
- [ ] Odabrane vrijednosti moraju biti takve da je igru moguće igrati, odnosno da nije preteška.
- [ ] Parametri igre - broj objekata asteroida i učestalost njihovog generiranja su predefinirani (konstantne u programskom kodu). 
- [ ] Objekt koji predstavlja asteroid je pravokutnik različitih nijansi sive boje s 3D sjenom oko ruba. 
- [x] Objekt koji predstavlja igrača je pravokutnik crvene boje s 3D sjenom oko ruba.
- [x] Igrač se na početku igre mora nalaziti točno u sredini Canvasa.
- [x] Igrač upravlja svojim položajem koristeći tipkovnicu (tipke strelice - gore, dolje, lijevo, desno).
- [x] U svakom koraku animacije mora se detektirati kolizija (sudar) svih objekata s objektom igrača.
- [ ] Igra mjeri vrijeme od pokretanja (od 00:00.000; minute:sekunde.milisekunde) do kolizije barem jednog objekta asteroida s objektom igrača. Cilj igre (tj. cilj igrača) je postići što duže vrijeme bez kolizije. Odnosno, "preživjeti" što duže bez udara objekta asteroida u objekt igrača.
- [ ] Igra pamti najbolje (najduže) vrijeme od kad je prvi put pokrenuta. Podatak o najboljem vremenu pohranjuje se u local storage pomoću HTML5 Web Storage API.
- [ ] Za rješenje zadatka dovoljno je izraditi jednu HTML stranicu i jednu JavaScript datoteku. Preporučeno je definirati CSS datoteku, ali nije obavezno.
- [ ] Deklaracije struktura, objekata, funkcija kao i pozivi funkcija moraju biti komentirani i objašnjeni u kodu.

## Opcionalne funkcionalnosti
- [ ] Animirana pozadina s bijelim točkama koje simuliraju zvijezde i kreću se horizontalno ili vertikalno konstantnom brzinom.
- [ ] Parametri igre mogu se konfigurirati kroz web sučelje prije pokretanja igre.
- [ ] Umjesto pravokutnika dozvoljeno je koristiti prikladnu sliku (JPG, PNG) asteroida.
- [ ] Dozvoljeno je koristiti neku sliku (npr. svemirskog broda) umjesto pravokutnika. 
- [ ] Ako objekt koji predstavlja igrača izađe izvan rubova ekrana može se vratiti sa suprotne strane, ali to nije obavezno.
- [ ] Moguće je (nije obavezno) generirati zvuk prilikom kolizije.
