var row = document.querySelector('.row');
var iso;
const accesssKey = ''; //Kas norit išbandyti prašom naudoti nuosavą access key 
pages = 1;
// 
loadImages(pages);
       
//      Duomenų paėmimas iš API

        function loadImages(pages){
            fetch("https://api.unsplash.com/photos?client_id=" + accesssKey + "&page="+ pages)
            .then(res => res.json())
            .then(data => {
                console.log(data);
        
                    for(var i = 0; i < data.length; i++ ) {
                        // Paiimamas iš JSON nuotraukos autoriaus vardas
                        var fElement = document.createElement('h5');
                        fElement.classList.add('name', 'mt-3');


                        // patikrinimas ar duomenys ne tušti
                        if (!data[i].user.first_name){
                            fElement.innerText = 'Autorius nežinomas';
                        }else {
                            fElement.innerText = ('Fotografas: ' + data[i].user.first_name);
                        }


                        // Paiimamas iš JSON nuotraukos apbibūdinimas
                        var pElement = document.createElement('p');
                        pElement.classList.add('title');
                        if (!data[i].alt_description){
                            pElement.innerText = 'apibūdinimo nėra';
                        }else {
                            pElement.innerText = data[i].alt_description;
                        }


                        // Paiimamas iš JSON "patiktukai"
                        var likeElement = document.createElement('p');
                        likeElement.classList.add('likes');
                        
                            if (!data[i].likes){
                                likeElement.innerText = 'Už šią nuotrauką niekas nebalsavo';
                            }else {
                                
                                likeElement.innerText =  data[i].likes;
                        }
    
                        // console.log(data[i].urls.regular);

                        // susikuriame Img
                        var imageElement = document.createElement('img');
                        imageElement.src = data[i].urls.regular;

                        // susikuriame div
                        var divElement = document.createElement('div');
                        divElement.classList.add('col-md-6');
                        divElement.classList.add('grid-item');

                        // prie div prikabiname img, autorių, apibūdinimą ir populiarumą
    
                        divElement.append(imageElement);
                        divElement.append(fElement);
                        divElement.append(pElement);
                        divElement.append(likeElement);
    
                        document.querySelector('.grid').append(divElement);
                    }
                    iso = new Isotope('.grid', {
                        itemSelector: '.grid-item',
                        stagger: 30,
                        getSortData: {
                            name: '.name',
                            title: '.title',
                            number: '.likes parseInt' //perseInt vertimas string į integer
                        },
                        masonry: {
                            columnWidth: '.grid-sizer',
                            gutter: '.grid-gutter-sizer'
                        },
                        sortBy: 'original-order',
                        sortAscending: {
                            name: true,
                            number: true
                        }
                    });
                }
            );

        };


            //                  RIKIAVIMAS
           
            var sortByGroup = document.querySelector('.sort-by-button-group');
                sortByGroup.addEventListener('click', function(event){
                    
                       // Funcijos nutraukimas jei fokusuojamas ne mygtuko elementas
                    if (!matchesSelector(event.target, '.btn')) {
                        return;
                    }

                    var sortValue = event.target.getAttribute('data-sort-value');
                    var sortDirection = event.target.getAttribute('data-sort-direction');
                    var isAscending = (sortDirection == 'asc'); //true, folse

                    iso.arrange({
                        sortBy: sortValue,
                        sortAscending: isAscending
                    });


                    console.log(isAscending);

                    console.log(sortValue);
                    console.log( sortDirection);
                });
        // });
            
//                   INFINETE SCROLL
    window.addEventListener('scroll', function(){
        var pozicija = Math.floor(window.scrollY + window.innerHeight);
        if (pozicija >= document.body.offsetHeight) {
                console.log('psl pabaiga');
                pages++;
                console.log(pages);
                loadImages(pages);
    }});

    // "Lenvgas" grįžimas atgal į viršų 
    var goTop = document.querySelector('#up');
    goTop.addEventListener('click', () => window.scrollTo({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        }));
    
    